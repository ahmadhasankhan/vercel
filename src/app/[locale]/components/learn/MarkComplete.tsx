"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useProgress } from "./useProgress";

export default function MarkComplete({ course, lesson }: { course: string; lesson: string }) {
  const t = useTranslations("Learn");
  const { enabled, user, completed, loading, setDone } = useProgress(course);
  if (enabled && loading) return null;

  if (!enabled || !user) {
    return (
      <Link href={`/learn/login?next=/learn/${course}/${lesson}`} className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-5 py-2.5 font-semibold text-primary hover:bg-surface">
        {t("signInToTrack")}
      </Link>
    );
  }

  const done = completed.has(lesson);
  return (
    <button
      type="button"
      onClick={() => setDone(lesson, !done)}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition ${
        done ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-primary text-white hover:bg-secondary"
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
      {done ? t("completed") : t("markComplete")}
    </button>
  );
}
