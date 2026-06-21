import { testimonials, trustedBy } from "@/components/landing/content";

export function SocialProof() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[20px] border border-border bg-surface-secondary p-6">
            <p className="font-mono text-[12px] leading-4 text-text-muted">
              SOCIAL PROOF
            </p>
            <h2
              className="mt-3 font-semibold tracking-[-0.04em] text-text-primary"
              style={{ fontSize: "32px", lineHeight: "40px" }}
            >
              Loved by productive teams.
            </h2>
            <p className="mt-3 text-[16px] leading-6 text-text-secondary">
              Mock testimonials capture the tone of the final product page
              without relying on live customer data.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustedBy.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className={`rounded-full px-3 py-1 text-[12px] leading-4 ${
                    index === 1
                      ? "bg-accent text-on-primary"
                      : "bg-surface text-text-secondary"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[16px] border border-border bg-surface p-5"
                style={{
                  boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
                }}
              >
                <p className="text-[14px] leading-6 text-text-secondary">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-[14px] font-semibold text-text-primary">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
