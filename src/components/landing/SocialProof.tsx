import { testimonials } from "@/components/landing/content";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function SocialProof() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="Built to feel calm when the search is not."
            description="Short, specific feedback keeps the page believable without relying on live customer data."
          />
        </RevealSection>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealSection key={testimonial.name}>
              <article className="h-full rounded-[16px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
                <p className="text-[16px] leading-7 text-text-secondary">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-[12px] font-medium text-text-primary">
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium leading-5 text-text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-[12px] leading-4 text-text-muted">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
