import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../../components/Layout";
import AccountBar from "../../components/learn/AccountBar";
import LessonList from "../../components/learn/LessonList";
import { Link } from "@/i18n/routing";
import { getCourse, getCourseSlugs } from "@/lib/courses";
import { LEARN_ENABLED, LOCALES, SITE_NAME, SITE_URL, alternatesFor, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string; course: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  if (!LEARN_ENABLED) return [];
  return LOCALES.flatMap((locale) => getCourseSlugs().map((course) => ({ locale, course })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, course: slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    alternates: alternatesFor(locale, `/learn/${slug}`),
    openGraph: { title: course.title, description: course.description, url: localizedUrl(locale, `/learn/${slug}`), siteName: SITE_NAME, type: "website" },
  };
}

export default async function CoursePage({ params }: Props) {
  if (!LEARN_ENABLED) notFound();
  const { locale, course: slug } = await params;
  setRequestLocale(locale);
  const course = getCourse(slug);
  if (!course) notFound();
  const t = await getTranslations({ locale, namespace: "Learn" });
  const first = course.lessons.find((l) => l.available);

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    inLanguage: "en",
    url: localizedUrl(locale, `/learn/${slug}`),
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, sameAs: SITE_URL },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT6H" },
    offers: { "@type": "Offer", category: "Partially free", price: 0, priceCurrency: "EUR" },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="text-sm text-white/70 hover:text-white">&larr; {t("allCourses")}</Link>
          <h1 lang="en" className="mt-4 text-3xl font-bold md:text-5xl">{course.title}</h1>
          <p lang="en" className="mt-4 max-w-3xl text-lg text-white/80">{course.description}</p>
          <p className="mt-4 text-sm text-white/70">{t("lessonsCount", { count: course.lessons.length })} · <span lang="en">{course.level}</span></p>
          {first && (
            <Link href={`/learn/${slug}/${first.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-surface-strong">
              {t("startCourse")} <span aria-hidden="true" className="inline-block rtl:rotate-180">&rarr;</span>
            </Link>
          )}
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AccountBar />
          {locale !== "en" && <p className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm text-muted">{t("englishOnly")}</p>}
          {course.outcomes.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white p-7 ring-1 ring-primary/10">
              <h2 className="text-xl font-bold text-primary">{t("outcomesTitle")}</h2>
              <ul lang="en" className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-primary/90">
                    <span aria-hidden="true" className="mt-0.5 text-emerald-600">✓</span>{o}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2 className="mt-10 mb-4 text-2xl font-bold text-primary">{t("curriculum")}</h2>
          <LessonList course={slug} lessons={course.lessons} />
        </div>
      </section>
    </Layout>
  );
}
