"use client";

import { useState } from "react";

import { faqs } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions."
          description="A few direct answers for the things people usually want to know before they sign up."
        />

        <div className="mx-auto mt-12 max-w-2xl space-y-4">
          {faqs.map((faq, index) => {
            const open = index === openIndex;

            return (
              <article
                key={faq.question}
                className="rounded-[16px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 text-left"
                  type="button"
                  onClick={() => setOpenIndex(index)}
                >
                  <span className="text-[16px] font-medium leading-6 tracking-[-0.03em] text-text-primary">
                    {faq.question}
                  </span>
                  <span
                    className={`text-[20px] leading-none text-text-muted transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 text-[16px] leading-7 text-text-secondary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
