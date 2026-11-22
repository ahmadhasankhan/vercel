import { useTranslations } from "next-intl";

const STYLES = {
  tip: { box: "border-emerald-500 bg-emerald-50", label: "text-emerald-800", icon: "M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" },
  info: { box: "border-secondary bg-surface", label: "text-secondary", icon: "M12 16v-4M12 8h.01M12 22a10 10 0 100-20 10 10 0 000 20z" },
  warning: { box: "border-amber-500 bg-amber-50", label: "text-amber-800", icon: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" },
} as const;

export default function Callout({ type = "info", children }: { type?: keyof typeof STYLES; children: React.ReactNode }) {
  const t = useTranslations("Learn");
  const s = STYLES[type] ?? STYLES.info;
  return (
    <aside className={`my-6 rounded-xl border-s-4 px-5 py-4 ${s.box}`}>
      <p className={`mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${s.label}`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
        {t(type)}
      </p>
      <div className="text-primary/90 [&>p]:my-1">{children}</div>
    </aside>
  );
}
