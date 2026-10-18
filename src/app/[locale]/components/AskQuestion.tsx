"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AskQuestion () {

  const t = useTranslations("Faq");
  const faqs = t.raw("items") as { q: string; a: string }[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index : number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full bg-surface pb-16 md:pb-20">
      <h2 id="faq-heading" className="text-primary text-[36px] font-bold text-center md:pt-8 pt-2">{t("title")}</h2>
       <p className="text-muted text-center text-xl pt-3 p-2 md:p-0">{t("subtitle")}</p>
       
       <div className="pt-8 md:pt-16 md:mx-44">
        {faqs.map((faq, index) =>(
          <div
            key={index}
            className="border-b-gray-600 rounded-lg shadow-sm"
          >
            {/* Question Section */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 
              className={`text-lg font-normal text-[20px] text-primary transition-colors ${
                 activeIndex === index ? "text-secondary" : "text-primary"
              }`}
              >
              {faq.q}
              </h3>
              <button
                type="button"
                aria-expanded={activeIndex === index}
                aria-label={activeIndex === index ? t("collapse") : t("expand")}
                className={`text-3xl text-primary transition-transform duration-200 ${
                   activeIndex === index ? "text-secondary" : "text-primary"
                }`}
              >
               {activeIndex === index ? "-" : "+"}
              </button>
            </div>

            {/* Answer Section */}
            {/* Always rendered (hidden when collapsed) so crawlers can read every answer */}
            <div
              hidden={activeIndex !== index}
              className="p-4 text-muted border-t border-gray-300 text-[18px]"
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

