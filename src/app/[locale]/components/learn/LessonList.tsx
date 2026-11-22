"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useProgress } from "./useProgress";

type L = { slug: string; title: string; free: boolean; available: boolean; order: number; duration?: number };

/** Curriculum list with live progress (used on the course page and the lesson sidebar). */
export default function LessonList({ course, lessons, current, compact = false }: { course: string; lessons: L[]; current?: string; compact?: boolean }) {
  const t = useTranslations("Learn");
  const { user, completed } = useProgress(course);
  const total = lessons.filter((l) => l.available).length;
  const done = lessons.filter((l) => completed.has(l.slug)).length;

  return (
    <div>
      {user && total > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted">{t("progress", { done, total: lessons.length })}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-strong">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} />
          </div>
        </div>
      )}
      <ol className={compact ? "space-y-1" : "divide-y divide-primary/10 rounded-2xl bg-white ring-1 ring-primary/10"}>
        {lessons.map((l) => {
          const isDone = completed.has(l.slug);
          const isCurrent = l.slug === current;
          const badge = !l.available ? t("comingSoon") : l.free ? t("free") : t("premium");
          const inner = (
            <>
              <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold ${
                isDone ? "bg-emerald-500 text-white" : isCurrent ? "bg-secondary text-white" : "bg-surface-strong text-primary"
              }`}>
                {isDone ? "✓" : l.order}
              </span>
              <span className="flex-1">
                <span className={`block ${compact ? "text-sm" : "font-semibold"} ${l.available ? "text-primary" : "text-muted"}`}>{l.title}</span>
                {!compact && l.duration && <span className="text-sm text-muted">{t("minutes", { count: l.duration })}</span>}
              </span>
              {!compact && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  !l.available ? "bg-surface-strong text-muted" : l.free ? "bg-emerald-100 text-emerald-800" : "bg-primary text-white"
                }`}>{badge}</span>
              )}
            </>
          );
          const cls = `flex items-center gap-3 ${compact ? "rounded-lg px-2 py-2" : "px-5 py-4"} ${isCurrent ? "bg-surface" : ""}`;
          return (
            <li key={l.slug}>
              {l.available ? (
                <Link href={`/learn/${course}/${l.slug}`} className={`${cls} hover:bg-surface`} aria-current={isCurrent ? "page" : undefined}>{inner}</Link>
              ) : (
                <div className={`${cls} cursor-default`}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
