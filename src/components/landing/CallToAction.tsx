import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="aurora-gradient pointer-events-none absolute inset-x-0 top-0 h-full opacity-35"
      />
      <div className="relative mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface px-6 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]">
          <div className="relative overflow-hidden rounded-[18px] border border-border bg-surface px-6 py-10 text-text-primary shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.08),0_0_0_1px_var(--color-border)_inset] sm:px-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#797a7e] via-surface to-surface-secondary"
            />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <p className="inline-flex rounded-full border border-border bg-surface-secondary px-3 py-1 font-mono text-[12px] leading-4 text-text-secondary">
                READY TO APPLY SMARTER
              </p>
              <h2 className="max-w-2xl text-[32px] font-semibold leading-10 tracking-tighter text-text-primary">
                Ready to apply smarter?
              </h2>
              <p className="max-w-2xl text-[16px] leading-7 text-text-secondary">
                Keep your resume, Copilot analysis, and application tracking in
                one calm workflow, with every output tuned to the same baseline.
              </p>
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-[100px] border border-border bg-accent px-5 text-[16px] font-medium leading-6 text-on-primary transition hover:bg-accent-deep"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
