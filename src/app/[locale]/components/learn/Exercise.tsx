import { useTranslations } from "next-intl";

export default function Exercise({ title, children }: { title?: string; children: React.ReactNode }) {
  const t = useTranslations("Learn");
  return (
    <section className="my-8 rounded-2xl border border-secondary/30 bg-white p-6 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
        {t("exerciseLabel")}
      </p>
      {title && <h3 className="mt-1 text-xl font-bold text-primary">{title}</h3>}
      <div className="mt-3 text-primary/90">{children}</div>
    </section>
  );
}
