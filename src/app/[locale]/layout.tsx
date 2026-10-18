import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieConsent from "./components/CookieConsent";
import {
  BRAND,
  CONTACT,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
  absUrl,
  localizedUrl,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    applicationName: SITE_NAME,
    keywords: [
      "Asistensia",
      "Ruby on Rails consulting",
      "Rails upgrade",
      "Rails performance",
      "PHP Laravel consulting",
      "DevOps consulting",
      "API development",
      "Software consulting Netherlands",
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: false, email: false, address: false },
    icons: {
      icon: [
        { url: "/assets/logo/favicon/favicon.svg", type: "image/svg+xml" },
        { url: "/assets/logo/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/logo/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/logo/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      apple: [{ url: "/assets/logo/favicon/apple-touch-icon-180x180.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale),
      siteName: SITE_NAME,
      images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: SITE_NAME }],
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIALS.twitterHandle,
      title: t("title"),
      description: t("description"),
      images: [BRAND.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  // Site-wide structured data: Organization (with logo) + WebSite
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        // Distinct brand spelling — helps Google treat "Asistensia" as an entity, not a typo of "asistencia"
        alternateName: ["Asistensia Consulting", "Asistensia Software Consulting", "asistensia.com"],
        slogan: "The team that lets you build more, while configuring less",
        description:
          "Asistensia is a software consulting company for Ruby on Rails, PHP/Laravel and DevOps, based in Amsterdam.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: absUrl(BRAND.logoPng),
          contentUrl: absUrl(BRAND.logoPng),
          width: 1000,
          height: 313,
          caption: SITE_NAME,
        },
        image: { "@id": `${SITE_URL}/#logo` },
        email: CONTACT.email,
        telephone: CONTACT.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: CONTACT.locality,
          addressCountry: CONTACT.country,
        },
        areaServed: [
          { "@type": "Country", name: "Netherlands" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        knowsAbout: ["Ruby on Rails", "Ruby", "PHP", "Laravel", "DevOps", "CI/CD", "API development", "React", "Next.js"],
        sameAs: [SOCIALS.twitter, SOCIALS.facebook, SOCIALS.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ["Asistensia Consulting", "asistensia.com"],
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-surface`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          {/* GDPR: Google Analytics loads only after the visitor consents */}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
