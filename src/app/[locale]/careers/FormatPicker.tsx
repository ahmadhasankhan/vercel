"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LEARN_ENABLED } from "@/lib/site";

/** English values sent with the application (keep in sync with CareerForm). */
export const FORMAT_VALUES = ["Online self-study", "Project-based bundle", "Mentor-based"] as const;
export const SELECT_FORMAT_EVENT = "careers:select-format";

type Format = { title: string; tag: string; text: string; features: string[] };

export default function FormatPicker() {
  const t = useTranslations("Careers");
  const tl = useTranslations("Learn");
  const formats = t.raw("formats") as Format[];

  const choose = (i: number) => {
    window.dispatchEvent(new CustomEvent(SELECT_FORMAT_EVENT, { detail: FORMAT_VALUES[i] }));
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className="mt-10 grid gap-6 lg:grid-cols-3">
      {formats.map((f, i) => {
        const featured = i === 2; // mentor-based
        return (
          <li
            key={f.title}
            className={`relative flex flex-col rounded-2xl p-7 ${
              featured ? "bg-primary text-white shadow-xl ring-2 ring-secondary" : "bg-white text-primary shadow-sm ring-1 ring-primary/10"
            }`}
          >
            <span
              className={`self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                featured ? "bg-white/15 text-white" : "bg-surface-strong text-secondary"
              }`}
            >
              {f.tag}
            </span>
            <h3 className="mt-4 text-2xl font-bold">{f.title}</h3>
            <p className={`mt-2 ${featured ? "text-white/80" : "text-muted"}`}>{f.text}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {f.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <svg viewBox="0 0 20 20" className={`mt-0.5 h-5 w-5 flex-none ${featured ? "text-white" : "text-secondary"}`} fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <span className={featured ? "text-white/90" : "text-primary/90"}>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => choose(i)}
              className={`mt-8 w-full rounded-lg px-5 py-3 font-semibold transition ${
                featured ? "bg-white text-primary hover:bg-surface-strong" : "bg-primary text-white hover:bg-secondary"
              }`}
            >
              {t("selectFormat")}
            </button>
            {i === 0 && LEARN_ENABLED && (
              <Link href="/learn" className="mt-3 text-center text-sm font-semibold text-secondary hover:underline">
                {tl("startFree")} &rarr;
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
