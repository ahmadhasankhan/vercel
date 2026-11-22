"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { CAREERS_ALLOW_UPLOAD, CAREERS_FORM_ENDPOINT, CONTACT } from "@/lib/site";

/* Values sent to Formspree stay in English so every application email reads the same. */
const FIELD_VALUES = ["Ruby on Rails / Backend", "Frontend (React / Next.js)", "DevOps & Cloud", "AI / Machine Learning", "Other"];
const LEVEL_VALUES = ["Student", "Recent graduate", "Career switcher", "Junior developer (0-2 years)"];
const DURATION_VALUES = ["1 month", "3 months", "6 months", "Not sure yet"];
const BUDGET_VALUES = ["Up to EUR 100/month", "EUR 100-250/month", "EUR 250-500/month", "EUR 500-1,000/month", "More than EUR 1,000/month", "Wants to discuss"];
const MAX_FILE = 10 * 1024 * 1024;

type Status = "idle" | "sending" | "success" | "error";

const input =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-primary shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";
const label = "block text-sm font-medium text-primary";

export default function CareerForm() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [fileError, setFileError] = useState("");

  const tracks = t.raw("tracks") as { title: string }[];
  const fieldLabels = [...tracks.map((x) => x.title), t("fieldOther")];
  const levels = t.raw("levels") as string[];
  const durations = t.raw("durations") as string[];
  const budgets = t.raw("budgets") as string[];

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > MAX_FILE) {
      setFileError(t("fileTooLarge"));
      e.target.value = "";
    } else setFileError("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CAREERS_FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      e.currentTarget?.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-primary/10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-primary">{t("successTitle")}</h3>
        <p className="mt-2 text-muted">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={CAREERS_FORM_ENDPOINT}
      method="POST"
      encType={CAREERS_ALLOW_UPLOAD ? "multipart/form-data" : undefined}
      className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 sm:grid-cols-2 sm:p-8"
    >
      <input type="hidden" name="_subject" value="New internship application – asistensia.com" />
      <input type="hidden" name="form" value="internship-application" />
      <input type="hidden" name="site_language" value={locale} />
      {/* spam honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="c-name" className={label}>{t("name")} *</label>
        <input id="c-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="c-email" className={label}>{t("email")} *</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="c-phone" className={label}>{t("phone")}</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={input} />
      </div>
      <div>
        <label htmlFor="c-country" className={label}>{t("country")} *</label>
        <input id="c-country" name="country" required autoComplete="country-name" className={input} />
      </div>

      <div>
        <label htmlFor="c-field" className={label}>{t("field")} *</label>
        <select id="c-field" name="field" required defaultValue="" className={input}>
          <option value="" disabled>{t("selectPlaceholder")}</option>
          {FIELD_VALUES.map((v, i) => <option key={v} value={v}>{fieldLabels[i]}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="c-level" className={label}>{t("level")} *</label>
        <select id="c-level" name="level" required defaultValue="" className={input}>
          <option value="" disabled>{t("selectPlaceholder")}</option>
          {LEVEL_VALUES.map((v, i) => <option key={v} value={v}>{levels[i]}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="c-budget" className={label}>{t("budget")} *</label>
        <select id="c-budget" name="budget" required defaultValue="" className={input}>
          <option value="" disabled>{t("selectPlaceholder")}</option>
          {BUDGET_VALUES.map((v, i) => <option key={v} value={v}>{budgets[i]}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="c-duration" className={label}>{t("duration")}</label>
        <select id="c-duration" name="duration" defaultValue="" className={input}>
          <option value="" disabled>{t("selectPlaceholder")}</option>
          {DURATION_VALUES.map((v, i) => <option key={v} value={v}>{durations[i]}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="c-start" className={label}>{t("start")}</label>
        <input id="c-start" name="start_date" type="date" className={input} />
      </div>
      <div>
        <label htmlFor="c-links" className={label}>{t("links")}</label>
        <input id="c-links" name="links" type="url" placeholder="https://" dir="ltr" className={input} />
      </div>

      {CAREERS_ALLOW_UPLOAD ? (
        <>
      <div className="sm:col-span-2">
        <label htmlFor="c-cv" className={label}>{t("cv")} *</label>
        <input
          id="c-cv"
          name="cv"
          type="file"
          required
          accept="application/pdf,.pdf"
          onChange={onFile}
          className="mt-1 block w-full text-sm text-muted file:me-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-secondary"
        />
        {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
      </div>
        </>
      ) : (
        <>
      <div className="sm:col-span-2">
        <label htmlFor="c-cv-link" className={label}>{t("cvLink")} *</label>
        <input id="c-cv-link" name="cv_link" type="url" required placeholder="https://" dir="ltr" className={input} />
        <p className="mt-1 text-xs text-muted">{t("cvLinkHint")}</p>
      </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="c-motivation" className={label}>{t("motivation")} *</label>
        <textarea id="c-motivation" name="motivation" rows={5} required className={input} />
      </div>

      <label className="sm:col-span-2 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 accent-[#3059A6]" />
        <span>
          {t("consent")}{" "}
          <Link href="/privacy" className="underline hover:text-secondary">{t("privacyLink")}</Link>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("error", { email: CONTACT.email })}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
