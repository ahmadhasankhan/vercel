"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GA_ID } from "@/lib/site";

/**
 * GDPR cookie consent.
 * - Nothing non-essential runs until the visitor opts in (Google Analytics is not even loaded).
 * - Google Consent Mode v2 signals are kept in sync for Analytics / Ads.
 * - Choice is stored for 12 months; reopen anytime via <CookieSettingsButton />.
 */

export const CONSENT_KEY = "asistensia_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 365;
export const OPEN_EVENT = "asistensia:open-cookie-settings";

type Consent = { v: number; analytics: boolean; marketing: boolean; ts: number };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.v !== CONSENT_VERSION) return null;
    if (Date.now() - c.ts > MAX_AGE_DAYS * 864e5) return null; // ask again after 12 months
    return c;
  } catch {
    return null;
  }
}

function gtagSafe(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag(...args);
}

function consentSignals(c: Pick<Consent, "analytics" | "marketing">) {
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  };
}

function clearAnalyticsCookies() {
  const host = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (/^(_ga|_gid|_gat|_gcl)/.test(name)) {
      for (const domain of ["", `; domain=.${host}`, `; domain=${host}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  });
}

export default function CookieConsent() {
  const t = useTranslations("Cookies");
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setAnalytics(c?.analytics ?? false);
    setMarketing(c?.marketing ?? false);
    setOpen(!c);
    setReady(true);

    const reopen = () => {
      const cur = readConsent();
      setAnalytics(cur?.analytics ?? false);
      setMarketing(cur?.marketing ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    const c: Consent = { v: CONSENT_VERSION, ...next, ts: Date.now() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch { /* storage blocked */ }
    if (window.gtag) gtagSafe("consent", "update", consentSignals(c));
    if (!c.analytics) clearAnalyticsCookies();
    setConsent(c);
    setOpen(false);
    setDetails(false);
  }, []);

  const loadGa = !!consent?.analytics;

  return (
    <>
      {loadGa && (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',${JSON.stringify(consentSignals(consent!))});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}

      {ready && open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-label={t("dialogLabel")}
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-white text-primary shadow-2xl ring-1 ring-primary/10 p-6">
            <h2 id="cookie-title" className="text-lg font-semibold">{t("title")}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {t("text")}{" "}
              <Link href="/privacy" className="underline hover:text-secondary">{t("privacyLink")}</Link>
            </p>

            {details && (
              <div className="mt-5 divide-y divide-primary/10 rounded-xl border border-primary/10">
                <Row title={t("necessary")} desc={t("necessaryDesc")}>
                  <span className="text-xs font-semibold text-muted whitespace-nowrap">{t("alwaysOn")}</span>
                </Row>
                <Row title={t("analytics")} desc={t("analyticsDesc")}>
                  <Toggle checked={analytics} onChange={setAnalytics} label={t("analytics")} />
                </Row>
                <Row title={t("marketing")} desc={t("marketingDesc")}>
                  <Toggle checked={marketing} onChange={setMarketing} label={t("marketing")} />
                </Row>
              </div>
            )}

            {/* Reject is as prominent as Accept (required by EU regulators) */}
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              {details ? (
                <button type="button" onClick={() => save({ analytics, marketing })}
                  className="rounded-lg border border-primary/20 px-5 py-2.5 font-semibold hover:bg-surface">
                  {t("save")}
                </button>
              ) : (
                <button type="button" onClick={() => setDetails(true)}
                  className="rounded-lg px-5 py-2.5 font-semibold text-secondary hover:bg-surface">
                  {t("customize")}
                </button>
              )}
              <button type="button" onClick={() => save({ analytics: false, marketing: false })}
                className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-secondary">
                {t("rejectAll")}
              </button>
              <button type="button" onClick={() => save({ analytics: true, marketing: true })}
                className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-secondary">
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-sm text-muted mt-1">{desc}</p>
      </div>
      <div className="pt-0.5">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors ${checked ? "bg-secondary" : "bg-primary/20"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5 rtl:-translate-x-0.5"}`} />
    </button>
  );
}

/** Footer link that reopens the cookie settings. */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
