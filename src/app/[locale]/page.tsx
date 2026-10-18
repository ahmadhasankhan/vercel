import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "./components/Layout";
import ContactSection from "./components/ContactSection";
import ServicesSection from "./components/ServicesSection";
import AISection from "./components/AISection";
import AskQuestion from "./components/AskQuestion";
import { BOOKING_URL, BRAND, OG_LOCALE, SITE_NAME, alternatesFor, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    // absolute: avoid the "%s | Asistensia" template duplicating the brand name
    title: { absolute: t("title") },
    description: t("description"),
    alternates: alternatesFor(locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale),
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
      images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const a = await getTranslations({ locale, namespace: "About" });
  const tf = await getTranslations({ locale, namespace: "Faq" });
  const faqs = tf.raw("items") as { q: string; a: string }[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-surface-strong transition duration-300"
              >
                {t('bookCall')} <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
              </a>
              <a
                href="#contact"
                className="inline-block border border-white/60 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition duration-300"
              >
                {t('cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 lg:flex items-center">
          <div className="lg:w-1/2 lg:pe-12 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {a("title")}
            </h2>
            <p className="text-muted font-semibold text-xl italic mb-4">
              {a("tagline")}
            </p>

            <p className="text-muted">
              {a("p1")}
            </p>
            <p className="text-muted mb-2">
              {a("p2")}
            </p>

            <p className="text-primary/90 font-semibold text-[18px] pt-5">
              {a("pillarsTitle")}
            </p>
            <ul>
              <li className="text-primary/90 font-normal text-[18px] pt-3 flex items-center">
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="text-secondary h-8 p-2"
                />
                {a("pillar1")}
              </li>
              <li className="text-primary/90 font-normal text-[18px] pt-3 flex items-center">
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="text-secondary h-8 p-2"
                />
                {a("pillar2")}
              </li>
              <li className="text-primary/90 font-normal text-[18px] pt-3 flex items-center">
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="text-secondary p-2 h-8"
                />
                {a("pillar3")}
              </li>
            </ul>
            <p className="text-primary/90 font-normal text-[18px] pt-6">
              {a("closing")}
            </p>

            <div className="flex gap-4 pt-5">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-secondary">50+</p>
                <p className="text-muted text-sm">{a("projects")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-secondary">10+</p>
                <p className="text-muted text-sm">{a("years")}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mb-20">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
              alt={a("imageAlt")}
              width={800}
              height={533}
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* AI solutions */}
      <AISection />

      {/* Services */}
      <ServicesSection />

      {/* FAQ */}
      <AskQuestion />

      {/* Contact */}
      <ContactSection />
    </Layout>
  );
}
