import Link from "next/link";

import { pricingPlans } from "@/components/landing/content";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-background">
      <div className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="PRICING"
          title="Simple, transparent pricing."
          description="The layout matches the reference, but the data stays mock-only until the pricing flow is actually implemented."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[16px] border p-6 ${
                plan.featured
                  ? "border-accent bg-surface"
                  : "border-border bg-surface"
              }`}
              style={{
                boxShadow: plan.featured
                  ? "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset"
                  : "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
              }}
            >
              {plan.featured ? (
                <div className="inline-flex rounded-full bg-accent px-3 py-1 text-[12px] leading-4 text-on-primary">
                  Most popular
                </div>
              ) : null}
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                    {plan.description}
                  </p>
                </div>
                <p
                  className="font-semibold tracking-tighter text-text-primary"
                  style={{ fontSize: "32px", lineHeight: "32px" }}
                >
                  {plan.price}
                </p>
              </div>
              <Link
                href="/register"
                className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg text-[14px] font-medium leading-5 transition ${
                  plan.featured
                    ? "bg-accent text-on-primary hover:opacity-90"
                    : "border border-border bg-surface text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Get started
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[14px] leading-5 text-text-secondary"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
