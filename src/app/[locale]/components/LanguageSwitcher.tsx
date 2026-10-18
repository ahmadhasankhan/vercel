"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

type Lang = "en" | "nl" | "de" | "fr" | "es" | "it" | "pt" | "tr" | "ar" | "hi";

const LANGS: { code: Lang; label: string; Flag: (p: { className?: string }) => React.JSX.Element }[] = [
  { code: "en", label: "English", Flag: FlagGB },
  { code: "nl", label: "Nederlands", Flag: FlagNL },
  { code: "de", label: "Deutsch", Flag: FlagDE },
  { code: "fr", label: "Français", Flag: FlagFR },
  { code: "es", label: "Español", Flag: FlagES },
  { code: "it", label: "Italiano", Flag: FlagIT },
  { code: "pt", label: "Português", Flag: FlagPT },
  { code: "tr", label: "Türkçe", Flag: FlagTR },
  { code: "ar", label: "العربية", Flag: FlagAE },
  { code: "hi", label: "हिन्दी", Flag: FlagIN },
];

/** Remembers the visitor's manual choice so browser-language detection never overrides it. */
function rememberLocale(locale: Lang) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Lang;
  const t = useTranslations("Nav");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (code: Lang) => {
    setOpen(false);
    rememberLocale(code);
    if (code === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: code });
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t("language")}: ${current.label}`}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-lg border border-primary/15 text-primary hover:bg-surface transition ${
          compact ? "px-2 py-1.5" : "px-3 py-2"
        } ${pending ? "opacity-60" : ""}`}
      >
        <current.Flag className="h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10" />
        {!compact && <span className="text-sm font-semibold uppercase">{current.code}</span>}
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={t("language")}
          className="absolute end-0 z-50 mt-2 w-48 max-h-[70vh] overflow-y-auto rounded-xl bg-white py-1 shadow-xl ring-1 ring-primary/10"
        >
          {LANGS.map(({ code, label, Flag }) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={code === locale}
                lang={code}
                onClick={() => select(code)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface ${
                  code === locale ? "font-semibold text-primary" : "text-muted"
                }`}
              >
                <Flag className="h-4 w-6 flex-none rounded-[2px] shadow-sm ring-1 ring-black/10" />
                <span className="flex-1 text-start">{label}</span>
                {code === locale && (
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-secondary" fill="currentColor">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---- Flags as inline SVG (emoji flags don't render on Windows) ---- */

function FlagGB({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <clipPath id={`s${id}`}><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id={`t${id}`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath={`url(#s${id})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#t${id})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagNL({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="9" height="2" fill="#AE1C28" />
      <rect y="2" width="9" height="2" fill="#FFFFFF" />
      <rect y="4" width="9" height="2" fill="#21468B" />
    </svg>
  );
}

function FlagAE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 6" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="12" height="2" fill="#00732F" />
      <rect y="2" width="12" height="2" fill="#FFFFFF" />
      <rect y="4" width="12" height="2" fill="#000000" />
      <rect width="3" height="6" fill="#FF0000" />
    </svg>
  );
}

function Tri({ colors, vertical = false, className }: { colors: [string, string, string]; vertical?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} aria-hidden="true" preserveAspectRatio="none">
      {colors.map((c, i) =>
        vertical ? <rect key={i} x={i * 3} width="3" height="6" fill={c} /> : <rect key={i} y={i * 2} width="9" height="2" fill={c} />
      )}
    </svg>
  );
}

function FlagDE({ className }: { className?: string }) {
  return <Tri className={className} colors={["#000000", "#DD0000", "#FFCE00"]} />;
}

function FlagFR({ className }: { className?: string }) {
  return <Tri className={className} vertical colors={["#002395", "#FFFFFF", "#ED2939"]} />;
}

function FlagIT({ className }: { className?: string }) {
  return <Tri className={className} vertical colors={["#009246", "#FFFFFF", "#CE2B37"]} />;
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 8" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="12" height="8" fill="#AA151B" />
      <rect y="2" width="12" height="4" fill="#F1BF00" />
    </svg>
  );
}

function FlagPT({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 15 10" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="15" height="10" fill="#FF0000" />
      <rect width="6" height="10" fill="#006600" />
      <circle cx="6" cy="5" r="2.2" fill="#FFCC00" />
      <circle cx="6" cy="5" r="1.4" fill="#FF0000" />
      <rect x="5.3" y="4" width="1.4" height="1.9" rx="0.5" fill="#FFFFFF" />
    </svg>
  );
}

function FlagTR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="10.5" cy="10" r="5" fill="#FFFFFF" />
      <circle cx="11.75" cy="10" r="4" fill="#E30A17" />
      <polygon fill="#FFFFFF" points="16.5,10 19.9,8.9 17.8,11.8 17.8,8.2 19.9,11.1" />
    </svg>
  );
}

function FlagIN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="9" height="2" fill="#FF9933" />
      <rect y="2" width="9" height="2" fill="#FFFFFF" />
      <rect y="4" width="9" height="2" fill="#138808" />
      <circle cx="4.5" cy="3" r="0.8" fill="none" stroke="#000080" strokeWidth="0.18" />
      <circle cx="4.5" cy="3" r="0.15" fill="#000080" />
    </svg>
  );
}
