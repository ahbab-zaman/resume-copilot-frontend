import { faqs } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Faq() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions."
          description="Use these mocked answers as placeholders until the content strategy is finalized."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className={`rounded-[16px] border p-5 ${
                index === 1 ? "border-border bg-surface-secondary" : "border-border bg-surface"
              }`}
              style={{
                boxShadow:
                  "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[16px] font-medium leading-6 text-text-primary">
                    {faq.question}
                  </p>
                  {index === 1 ? (
                    <p className="mt-3 max-w-3xl text-[14px] leading-6 text-text-secondary">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
                <span className="text-[20px] leading-none text-text-muted">
                  {index === 1 ? "−" : "+"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
