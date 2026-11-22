"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginForm({ next, error }: { next: string; error?: boolean }) {
  const t = useTranslations("Learn");
  const locale = useLocale();
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(error ? "error" : "idle");

  if (!supabase) return <p className="rounded-lg bg-surface px-4 py-3 text-muted">{t("notConfigured")}</p>;

  // next comes without locale prefix (/learn/rails/…); add it back for non-default locales
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/learn";
  const target = locale === "en" ? safeNext : `/${locale}${safeNext}`;
  const redirectTo = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(target)}`;

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    setState(error ? "error" : "sent");
  };

  const github = () => supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo } });

  if (state === "sent") {
    return <p role="status" className="rounded-xl bg-emerald-50 px-5 py-4 font-semibold text-emerald-800">{t("checkEmail")}</p>;
  }

  return (
    <div className="space-y-5">
      <form onSubmit={sendLink} className="space-y-3">
        <label htmlFor="learn-email" className="block text-sm font-medium text-primary">{t("emailLabel")}</label>
        <input
          id="learn-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-primary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
        />
        <button type="submit" disabled={state === "sending"} className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-secondary disabled:opacity-60">
          {state === "sending" ? t("sending") : t("sendLink")}
        </button>
      </form>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-primary/10" />{t("orContinue")}<span className="h-px flex-1 bg-primary/10" />
      </div>
      <button type="button" onClick={github} className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 px-5 py-3 font-semibold text-primary hover:bg-surface">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .5z" /></svg>
        {t("github")}
      </button>
      {state === "error" && <p role="alert" className="text-sm text-red-600">{t("loginError")}</p>}
    </div>
  );
}
