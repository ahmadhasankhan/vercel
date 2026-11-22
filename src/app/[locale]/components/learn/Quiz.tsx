"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = { question: string; options: string[]; answer: number; explanation?: string };

export default function Quiz({ question, options, answer, explanation }: Props) {
  const t = useTranslations("Learn");
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = checked && picked === answer;

  return (
    <section className="my-8 rounded-2xl bg-surface p-6 ring-1 ring-primary/10">
      <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{t("quizLabel")}</p>
      <p className="mt-1 text-lg font-semibold text-primary">{question}</p>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={question}>
        {options.map((opt, i) => {
          const state =
            checked && i === answer ? "border-emerald-500 bg-emerald-50" :
            checked && i === picked ? "border-red-400 bg-red-50" :
            picked === i ? "border-secondary bg-white" : "border-primary/15 bg-white hover:border-secondary/60";
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={picked === i}
              onClick={() => { setPicked(i); setChecked(false); }}
              className={`rounded-lg border-2 px-4 py-3 text-start text-primary transition ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={picked === null}
          onClick={() => setChecked(true)}
          className="rounded-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-secondary disabled:opacity-50"
        >
          {t("quizCheck")}
        </button>
        {checked && (
          <p role="status" className={`font-semibold ${correct ? "text-emerald-700" : "text-red-600"}`}>
            {correct ? t("quizCorrect") : t("quizWrong")}
          </p>
        )}
      </div>
      {correct && explanation && <p className="mt-3 text-muted">{explanation}</p>}
    </section>
  );
}
