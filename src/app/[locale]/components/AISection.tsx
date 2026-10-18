import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faRobot,
  faComments,
  faFileLines,
  faMicrochip,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { BOOKING_URL } from "@/lib/site";

const ICONS = [faWandMagicSparkles, faRobot, faComments, faFileLines, faMicrochip, faShieldHalved];

type Item = { title: string; description: string };
type Step = { title: string; text: string };

export default function AISection() {
  const t = useTranslations("AI");
  const items = t.raw("items") as Item[];
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="relative overflow-hidden bg-primary text-white py-20"
    >
      {/* soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(48,89,166,.55), transparent 45%), radial-gradient(circle at 0% 100%, rgba(48,89,166,.35), transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/70">
            <span className="h-0.5 w-6 bg-white/50" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h2 id="ai-heading" className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed">{t("subtitle")}</p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/15 hover:bg-white/[0.1] transition duration-300"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-secondary shadow-sm">
                <FontAwesomeIcon icon={ICONS[i % ICONS.length]} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-white/75 leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold">{t("stepsTitle")}</h3>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-white/15 p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold">
                  {i + 1}
                </span>
                <p className="mt-4 text-lg font-semibold">{step.title}</p>
                <p className="mt-1 text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 font-semibold text-primary hover:bg-surface-strong transition duration-300"
          >
            {t("cta")} <span aria-hidden="true" className="inline-block rtl:rotate-180">&rarr;</span>
          </a>
          <p className="text-white/70">{t("ctaNote")}</p>
        </div>
      </div>
    </section>
  );
}
