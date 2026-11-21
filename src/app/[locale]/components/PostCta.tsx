import { useTranslations } from "next-intl";
import { BOOKING_URL, CONTACT } from "@/lib/site";

/** Picks a topic for the CTA headline from the post's tags (tech names stay untranslated). */
export function topicFromTags(tags: string[] = []): string | undefined {
  const t = tags.map((x) => x.toLowerCase());
  if (t.some((x) => ["rails", "ruby", "rails8", "ruby4"].includes(x))) return "Ruby on Rails";
  if (t.some((x) => ["laravel", "php"].includes(x))) return "Laravel";
  if (t.some((x) => ["devops", "ci-cd", "sre", "kubernetes"].includes(x))) return "DevOps";
  if (t.some((x) => ["fastapi", "python"].includes(x))) return "FastAPI";
  if (t.some((x) => ["react", "nextjs", "next.js"].includes(x))) return "React";
  return undefined;
}

export default function PostCta({ topic }: { topic?: string }) {
  const t = useTranslations("PostCta");

  return (
    <aside
      aria-labelledby="post-cta-title"
      className="not-prose relative mx-5 md:mx-30 my-16 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-white shadow-xl sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 90% 0%, rgba(48,89,166,.6), transparent 50%)" }}
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{t("eyebrow")}</p>
          <h2 id="post-cta-title" className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
            {topic ? t("title", { topic }) : t("titleGeneric")}
          </h2>
          <p className="mt-3 text-white/80 leading-relaxed">{t("text")}</p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end md:text-end">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-surface-strong transition duration-300"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            {t("button")}
          </a>
          <p className="text-sm text-white/70">{t("note")}</p>
          <a href={`mailto:${CONTACT.email}`} className="text-sm text-white/80 underline underline-offset-4 hover:text-white">
            {t("email")}
          </a>
        </div>
      </div>
    </aside>
  );
}
