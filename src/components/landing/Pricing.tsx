import Link from "next/link";

import { pricingPlans } from "@/components/landing/content";

export function Pricing() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[16px] border p-8 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset] ${
                plan.featured
                  ? "border-accent bg-accent text-on-primary"
                  : "border-border bg-surface text-text-primary"
              }`}
            >
              {plan.featured ? (
                <div className="inline-flex rounded-full bg-surface px-3 py-1 text-[12px] leading-4 text-text-primary">
                  Most popular
                </div>
              ) : (
                <div className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-[12px] leading-4 text-text-secondary">
                  Free tier
                </div>
              )}
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold leading-7 tracking-[-0.04em]">
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-[14px] leading-6 ${
                      plan.featured ? "text-on-primary/80" : "text-text-secondary"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
                <p className="text-[32px] font-semibold leading-8 tracking-[-0.05em]">
                  {plan.price}
                </p>
              </div>
              <Link
                href="/register"
                className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-[100px] text-[16px] font-medium leading-6 transition ${
                  plan.featured
                    ? "bg-surface text-text-primary hover:bg-surface-secondary"
                    : "border border-border bg-surface text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Get started
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-[14px] leading-5 ${
                      plan.featured ? "text-on-primary/80" : "text-text-secondary"
                    }`}
                  >
                    <span
                      className={`mt-1 h-2 w-2 rounded-full ${
                        plan.featured ? "bg-on-primary" : "bg-success"
                      }`}
                    />
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
