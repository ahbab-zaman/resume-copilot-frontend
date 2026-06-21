import { featureCards, metrics } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Features() {
  return (
    <>
      <section id="how-it-works" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Everything you need to stay productive."
            description="A single, polished workspace covers the whole application flow from first upload to interview prep."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[12px] border border-border bg-surface p-6"
                style={{
                  boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex rounded-full bg-violet-light px-2 py-0.5 text-[12px] leading-4 text-violet-foreground">
                      Feature 0{index + 1}
                    </div>
                    <h3 className="mt-4 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                      {card.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-border bg-surface-secondary px-3 py-1 text-[12px] leading-4 text-text-secondary">
                    {card.accent}
                  </div>
                </div>
                <p className="mt-4 max-w-md text-[14px] leading-6 text-text-secondary">
                  {card.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[12px] border border-border bg-surface-secondary p-4">
                    <div className="h-2.5 w-16 rounded-full bg-border" />
                    <div className="mt-4 h-20 rounded-[10px] bg-surface" />
                  </div>
                  <div className="rounded-[12px] border border-border bg-surface-secondary p-4">
                    <div className="h-2.5 w-20 rounded-full bg-border" />
                    <div className="mt-4 h-20 rounded-[10px] bg-surface" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="grid gap-4 rounded-[20px] border border-border bg-surface p-5 md:grid-cols-4"
            style={{
              boxShadow:
                "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
              backgroundImage:
                "linear-gradient(90deg, color-mix(in srgb, var(--success-light) 12%, transparent), color-mix(in srgb, var(--link-bg-soft) 12%, transparent), color-mix(in srgb, var(--violet-light) 12%, transparent), color-mix(in srgb, var(--warning-light) 12%, transparent))",
            }}
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center md:text-left">
                <p
                  className="font-semibold tracking-[-0.05em] text-text-primary"
                  style={{ fontSize: "32px", lineHeight: "32px" }}
                >
                  {metric.value}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-text-secondary">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
