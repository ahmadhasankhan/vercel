import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faLaptopCode,
  faCodePullRequest,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import CareerForm from "./CareerForm";
import { BRAND, OG_LOCALE, SITE_NAME, alternatesFor, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale, "/careers"),
    openGraph: {
      title: `${t("metaTitle")} | ${SITE_NAME}`,
      description: t("metaDescription"),
      url: localizedUrl(locale, "/careers"),
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
  };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Careers" });
  const benefits = t.raw("benefits") as { title: string; text: string }[];
  const tracks = t.raw("tracks") as { title: string; text: string }[];
  const steps = t.raw("steps") as { title: string; text: string }[];
  const benefitIcons = [faUserTie, faLaptopCode, faCodePullRequest, faAward];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">{t("subtitle")}</p>
          <a href="#apply" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-semibold text-primary hover:bg-surface-strong">
            {t("applyNow")} <span aria-hidden="true" className="inline-block rtl:rotate-180">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary">{t("benefitsTitle")}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <li key={b.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                  <FontAwesomeIcon icon={benefitIcons[i % benefitIcons.length]} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{b.title}</h3>
                <p className="mt-1 text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tracks */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary">{t("tracksTitle")}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((tr) => (
              <li key={tr.title} className="rounded-2xl border border-primary/10 p-6">
                <h3 className="text-lg font-semibold text-primary">{tr.title}</h3>
                <p className="mt-2 text-muted">{tr.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary">{t("stepsTitle")}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold text-white">{i + 1}</span>
                <p className="mt-4 text-lg font-semibold text-primary">{s.title}</p>
                <p className="mt-1 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-xl border-s-4 border-secondary bg-white px-5 py-4 text-muted">{t("programNote")}</p>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary">{t("formTitle")}</h2>
          <p className="mt-2 text-muted">{t("formSubtitle")}</p>
          <div className="mt-8">
            <CareerForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
