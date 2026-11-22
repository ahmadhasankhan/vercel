// Central SEO / brand configuration — single source of truth for URLs, logo and locales.
export const SITE_URL = "https://asistensia.com";
export const SITE_NAME = "Asistensia";

export const LOCALES = ["en", "nl", "de", "fr", "es", "it", "pt", "tr", "ar", "hi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  nl: "nl_NL",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  pt: "pt_PT",
  tr: "tr_TR",
  hi: "hi_IN",
  ar: "ar_SA",
};

export const BRAND = {
  logoSvg: "/assets/logo/svg/asistensia-logo-primary.svg",
  logoSvgWhite: "/assets/logo/svg/asistensia-logo-white.svg",
  // Raster logo for schema.org (Google requires a crawlable raster/svg URL, min 112x112)
  logoPng: "/assets/logo/png/asistensia-logo-primary-1000px-transparent.png",
  iconPng: "/assets/logo/png/asistensia-icon-primary-512px-transparent.png",
  ogImage: "/assets/logo/og-image-1200x630.png",
  // Intrinsic aspect ratio of the horizontal logo SVG (754 x 236)
  logoWidth: 754,
  logoHeight: 236,
};

export const SOCIALS = {
  twitter: "https://x.com/TheAsistensia",
  twitterHandle: "@TheAsistensia",
  facebook: "https://www.facebook.com/asistensiacom",
  linkedin: "https://www.linkedin.com/company/asistensia/",
};

/**
 * Google Tag Manager container — loaded on every visit with Google Consent Mode v2.
 * Configure Google Analytics 4 (G-8W8PKL59B2) *inside* GTM as a "Google tag".
 */
export const GTM_ID = "GTM-KZ8LP4J2";

/** GA4 measurement ID (configured inside GTM — not loaded separately, to avoid double counting). */
export const GA_ID = "G-8W8PKL59B2";

/** Direct scheduling link (Calendly) for the free 30-minute consultation. */
export const BOOKING_URL = "https://calendly.com/asistensia/30min";

export const CONTACT = {
  telephone: "+31619333008",
  email: "contact@asistensia.com",
  locality: "Amsterdam",
  country: "NL",
};

export const absUrl = (p = "/") =>
  p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;

/** URL for a path in a locale, matching next-intl `localePrefix: 'as-needed'`. */
export function localizedUrl(locale: string, path = "") {
  const clean = path && path !== "/" ? (path.startsWith("/") ? path : `/${path}`) : "";
  return locale === DEFAULT_LOCALE ? `${SITE_URL}${clean}` || SITE_URL : `${SITE_URL}/${locale}${clean}`;
}

/** Canonical + hreflang alternates for a path. */
export function alternatesFor(locale: string, path = "") {
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => (languages[l] = localizedUrl(l, path)));
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return { canonical: localizedUrl(locale, path), languages };
}

/** localStorage key holding the visitor's cookie choice (shared by banner + GTM loader). */
export const CONSENT_KEY = "asistensia_consent";

/**
 * Formspree endpoint for internship applications (file upload needs a paid Formspree plan).
 * Tip: create a separate Formspree form for applications and paste its ID here.
 */
export const CAREERS_FORM_ENDPOINT = "https://formspree.io/f/xovwgvnv";

/**
 * CV as a file upload (true) or as a link to Google Drive/Dropbox/OneDrive (false).
 * Formspree only accepts files on paid plans with uploads enabled for the form —
 * otherwise it answers "File Uploads Not Permitted". Flip to true after upgrading.
 */
export const CAREERS_ALLOW_UPLOAD = false;
