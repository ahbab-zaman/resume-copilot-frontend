import { featureCards } from "@/components/landing/content";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";

function FeatureIcon({ kind }: { kind: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-secondary text-[18px] text-accent">
      {kind === "score" ? "●" : kind === "resume" ? "▣" : "✦"}
    </div>
  );
}

export function Features() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="FEATURES"
            title="Everything you need to apply, faster."
            description="The workflow stays tight: score the resume, improve the draft, and move into output generation without leaving the product."
          />
        </RevealSection>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <RevealSection key={card.title}>
              <article
                className="h-full rounded-[12px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]"
              >
                <FeatureIcon kind={card.icon} />
                <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-3 text-[16px] leading-7 text-text-secondary">
                  {card.description}
                </p>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
