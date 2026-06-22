import { howItWorksSteps } from "@/components/landing/content";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Three steps, one application kit."
            description="The layout keeps the sequence obvious: upload, compare, and generate the output you need next."
          />
        </RevealSection>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <RevealSection key={step.number}>
              <article className="rounded-[12px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[32px] font-semibold leading-8 tracking-[-0.06em] text-accent">
                    {step.number}
                  </p>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-[16px] leading-7 text-text-secondary">
                  {step.description}
                </p>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
