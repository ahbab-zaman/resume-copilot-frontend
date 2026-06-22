import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--gradient-preview-start) 16%, transparent), transparent 28%), radial-gradient(circle at 72% 20%, color-mix(in srgb, var(--gradient-develop-start) 16%, transparent), transparent 28%), radial-gradient(circle at 55% 62%, color-mix(in srgb, var(--gradient-ship-end) 10%, transparent), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[24px] border border-border bg-surface px-6 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
          <div className="relative overflow-hidden rounded-[18px] border border-border bg-accent px-6 py-10 text-on-primary shadow-[0_2px_2px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.06)_inset] sm:px-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--gradient-preview-start) 18%, transparent), transparent 30%), radial-gradient(circle at 80% 30%, color-mix(in srgb, var(--gradient-develop-end) 12%, transparent), transparent 28%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <p className="font-mono text-[12px] leading-4 text-white/70">
                READY TO APPLY SMARTER
              </p>
              <h2 className="max-w-2xl text-[32px] font-semibold leading-10 tracking-[-0.05em] text-on-primary">
                Ready to apply smarter?
              </h2>
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-[100px] border border-white/15 bg-surface px-5 text-[16px] font-medium leading-6 text-text-primary transition hover:bg-surface-secondary"
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
