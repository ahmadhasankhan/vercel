"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type State = "idle" | "sending" | "done" | "invalid" | "error";

export default function NewsletterForm() {
  const f = useTranslations("Footer");
  const locale = useLocale();
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website"), locale }),
      });
      if (res.ok) {
        setState("done");
        form.reset();
      } else {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setState(j.error === "invalid_email" ? "invalid" : "error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p role="status" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
        {f("subscribed")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">{f("emailLabel")}</label>
      <div className="flex">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={f("emailPlaceholder")}
          dir="ltr"
          className="min-w-0 flex-1 rounded-s-lg border border-gray-300 bg-white px-3 py-2 text-primary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-e-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-secondary disabled:opacity-60"
        >
          {state === "sending" ? f("subscribing") : f("subscribe")}
        </button>
      </div>
      {/* honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <p className="mt-2 text-xs text-muted">
        {f("consentNote")}{" "}
        <Link href="/privacy" className="underline hover:text-secondary">{f("privacy")}</Link>
      </p>
      {(state === "invalid" || state === "error") && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {state === "invalid" ? f("invalidEmail") : f("subscribeError")}
        </p>
      )}
    </form>
  );
}
