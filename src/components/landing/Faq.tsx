"use client";

import { useState } from "react";
import { faqs } from "@/components/landing/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-24">
          {/* Left — title + cta */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4">
              <svg
                style={{
                  width: "14px",
                  height: "14px",
                  color: "var(--color-text-muted)",
                  flexShrink: 0,
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
              </svg>
              <span
                className="text-[12px] font-medium uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                FAQ
              </span>
            </div>

            <h2
              className="font-bold leading-tight tracking-tight text-text-primary"
              style={{ fontSize: "clamp(28px, 4vw, 38px)" }}
            >
              Everything You Need to Know
            </h2>

            <p
              className="mt-4 text-[15px] leading-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Still have a question? Reach our customer service.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex h-11 w-fit items-center justify-center rounded-lg px-6 text-[14px] font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--color-accent)" }}
            >
              Contact us
            </a>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-border">
            {faqs.map((faq, index) => {
              const open = index === openIndex;

              return (
                <article key={faq.question}>
                  <button
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                  >
                    <span
                      className="text-[16px] font-medium leading-6 text-text-primary"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {faq.question}
                    </span>

                    {/* + / − icon */}
                    <span
                      className="shrink-0 flex items-center justify-center rounded-full border"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                        fontSize: "18px",
                        lineHeight: 1,
                      }}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-emphasized"
                    style={{
                      gridTemplateRows: open ? "1fr" : "0fr",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="pb-5 text-[15px] leading-7"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
