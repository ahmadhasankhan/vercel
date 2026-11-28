import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../../../components/Layout";
import CodeBlock from "../../../components/CodeBlock";
import Callout from "../../../components/learn/Callout";
import Exercise from "../../../components/learn/Exercise";
import Quiz from "../../../components/learn/Quiz";
import MarkComplete from "../../../components/learn/MarkComplete";
import LessonList from "../../../components/learn/LessonList";
import AccountBar from "../../../components/learn/AccountBar";
import { Link } from "@/i18n/routing";
import { getCourse, getCourseSlugs, readLesson } from "@/lib/courses";
import { getCourseAccess } from "@/lib/supabase/server";
import { BOOKING_URL, LEARN_ENABLED, LOCALES, SITE_NAME, englishOnlyAlternates, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string; course: string; lesson: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  if (!LEARN_ENABLED) return [];
  return LOCALES.flatMap((locale) =>
    getCourseSlugs().flatMap((course) =>
      (getCourse(course)?.lessons ?? []).map((l) => ({ locale, course, lesson: l.slug }))
    )
  );
}

const prettyCode: PrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: { block: "plaintext", inline: "plaintext" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, course: c, lesson: l } = await params;
  const course = getCourse(c);
  const info = course?.lessons.find((x) => x.slug === l);
  if (!course || !info) return {};
  const indexable = info.available && info.free; // only free, published lessons are indexed
  return {
    title: `${info.title} – ${course.title}`,
    description: info.description,
    alternates: englishOnlyAlternates(`/learn/${c}/${l}`), // lessons are English-only
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: { title: info.title, description: info.description, url: localizedUrl("en", `/learn/${c}/${l}`), siteName: SITE_NAME, type: "article" },
  };
}

export default async function LessonPage({ params }: Props) {
  if (!LEARN_ENABLED) notFound();
  const { locale, course: courseSlug, lesson: lessonSlug } = await params;
  setRequestLocale(locale);
  const course = getCourse(courseSlug);
  const idx = course?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
  if (!course || idx < 0) notFound();
  const info = course.lessons[idx];
  const prev = course.lessons.slice(0, idx).reverse().find((l) => l.available);
  const next = course.lessons.slice(idx + 1).find((l) => l.available);
  const t = await getTranslations({ locale, namespace: "Learn" });

  // Premium lessons are checked on the server so their content is never sent to visitors without access.
  let state: "ok" | "soon" | "signin" | "locked" = "ok";
  if (!info.available) state = "soon";
  else if (!info.free) {
    const { user, enrolled } = await getCourseAccess(courseSlug);
    state = enrolled ? "ok" : user ? "locked" : "signin";
  }
  const lesson = state === "ok" ? readLesson(courseSlug, lessonSlug) : null;

  return (
    <Layout>
      <div className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-4 ring-1 ring-primary/10">
              <Link href={`/learn/${courseSlug}`} lang="en" className="block px-2 pb-3 font-bold text-primary hover:text-secondary">{course.title}</Link>
              <LessonList course={courseSlug} lessons={course.lessons} current={lessonSlug} compact />
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Link href={`/learn/${courseSlug}`} className="text-sm text-muted hover:text-secondary">&larr; {t("backToCourse")}</Link>
              <AccountBar />
            </div>

            <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {t("lesson", { n: info.order })}{info.duration ? ` · ${t("minutes", { count: info.duration })}` : ""}
              </p>
              <h1 lang="en" className="mt-2 text-3xl font-bold text-primary md:text-4xl">{info.title}</h1>
              {locale !== "en" && <p className="mt-4 inline-block rounded-lg bg-surface px-3 py-1.5 text-sm text-muted">{t("englishOnly")}</p>}

              {state === "ok" && lesson && (
                <div lang="en" dir="ltr" className="post-body lesson-body mt-8 text-[17px] leading-relaxed text-primary/90">
                  <MDXRemote
                    source={lesson.content}
                    components={{ pre: CodeBlock, Callout, Exercise, Quiz }}
                    options={{
                      // Lessons are our own trusted content: allow JS expressions so
                      // components like <Quiz options={[...]} answer={1} /> receive their props.
                      blockJS: false,
                      mdxOptions: { rehypePlugins: [[rehypePrettyCode, prettyCode]] },
                    }}
                  />
                </div>
              )}

              {state !== "ok" && (
                <div className="mt-8 rounded-2xl bg-surface p-8 text-center">
                  <h2 className="text-2xl font-bold text-primary">
                    {state === "soon" ? t("comingSoonTitle") : t("lockedTitle")}
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-muted">
                    {state === "soon" ? t("comingSoonText") : t("lockedText")}
                  </p>
                  {state !== "soon" && (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      {state === "signin" && (
                        <Link href={`/learn/login?next=/learn/${courseSlug}/${lessonSlug}`} className="rounded-lg border border-primary/20 bg-white px-5 py-3 font-semibold text-primary hover:bg-surface-strong">{t("signIn")}</Link>
                      )}
                      <Link href="/careers#formats" className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-secondary">{t("getAccess")}</Link>
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg px-5 py-3 font-semibold text-secondary hover:underline">{t("bookCall")}</a>
                    </div>
                  )}
                </div>
              )}

              {state === "ok" && (
                <div className="mt-10 border-t border-primary/10 pt-6">
                  <MarkComplete course={courseSlug} lesson={lessonSlug} />
                </div>
              )}
            </article>

            <nav className="mt-6 flex flex-wrap justify-between gap-4" aria-label={t("curriculum")}>
              {prev ? (
                <Link href={`/learn/${courseSlug}/${prev.slug}`} className="rounded-xl bg-white px-5 py-4 ring-1 ring-primary/10 hover:ring-secondary">
                  <span className="block text-xs uppercase tracking-wide text-muted">{t("prev")}</span>
                  <span lang="en" className="font-semibold text-primary">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/learn/${courseSlug}/${next.slug}`} className="ms-auto rounded-xl bg-white px-5 py-4 text-end ring-1 ring-primary/10 hover:ring-secondary">
                  <span className="block text-xs uppercase tracking-wide text-muted">{t("next")}</span>
                  <span lang="en" className="font-semibold text-primary">{next.title}</span>
                </Link>
              )}
            </nav>
          </main>
        </div>
      </div>
    </Layout>
  );
}
