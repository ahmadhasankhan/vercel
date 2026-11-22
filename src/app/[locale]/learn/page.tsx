import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../components/Layout";
import AccountBar from "../components/learn/AccountBar";
import { Link } from "@/i18n/routing";
import { getAllCourses } from "@/lib/courses";
import { BRAND, OG_LOCALE, SITE_NAME, alternatesFor, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Learn" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/learn"),
    openGraph: {
      title: `${t("metaTitle")} | ${SITE_NAME}`,
      description: t("metaDescription"),
      url: localizedUrl(locale, "/learn"),
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
  };
}

export default async function LearnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Learn" });
  const courses = getAllCourses();

  return (
    <Layout>
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6"><AccountBar /></div>
          {locale !== "en" && <p className="mb-6 inline-block rounded-lg bg-white px-4 py-2 text-sm text-muted">{t("englishOnly")}</p>}
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => {
              const free = c.lessons.filter((l) => l.free).length;
              return (
                <li key={c.slug} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-primary/10">
                  <span className="self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{t("freeLessons", { count: free })}</span>
                  <h2 lang="en" className="mt-4 text-2xl font-bold text-primary">{c.title}</h2>
                  <p lang="en" className="mt-2 flex-1 text-muted">{c.description}</p>
                  <p className="mt-4 text-sm text-muted">{t("lessonsCount", { count: c.lessons.length })} · <span lang="en">{c.level}</span></p>
                  <Link href={`/learn/${c.slug}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-secondary">
                    {t("startCourse")} <span aria-hidden="true" className="inline-block rtl:rotate-180">&rarr;</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
