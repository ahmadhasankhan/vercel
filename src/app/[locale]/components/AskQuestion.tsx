"use client"

import { useState } from "react";
import { faqs } from "../data/faqs";

export default function AskQuestion () {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index : number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full bg-surface pb-16 md:pb-20">
      <h2 id="faq-heading" className="text-primary text-[36px] font-bold text-center md:pt-8 pt-2">Frequently Asked Questions</h2>
       <p className="text-muted text-center text-xl pt-3 p-2 md:p-0">Team with a strong tech experience who always gets your work done.</p>
       
       <div className="pt-8 md:pt-16 md:ml-44 md:mr-44">
        {faqs.map((faq, index) =>(
          <div
            key={faq.id}
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
              {faq.question}
              </h3>
              <button
                type="button"
                aria-expanded={activeIndex === index}
                aria-label={activeIndex === index ? "Collapse answer" : "Expand answer"}
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
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

