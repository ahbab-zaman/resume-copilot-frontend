import Link from "next/link";

export function CallToAction() {
  return (
    <section className="bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-border bg-accent px-6 py-10 text-on-primary sm:px-8 lg:px-10"
        style={{
          boxShadow:
            "0 2px 2px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--gradient-preview-start) 28%, transparent), transparent 42%), radial-gradient(circle at 78% 30%, color-mix(in srgb, var(--gradient-develop-end) 18%, transparent), transparent 32%)",
        }}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-[12px] leading-4 text-white/70">
              READY TO TRANSFORM
            </p>
            <h2
              className="mt-3 font-semibold tracking-[-0.05em]"
              style={{ fontSize: "32px", lineHeight: "40px" }}
            >
              Ready to transform your workflow?
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-6 text-white/75">
              Keep the same polished structure from the reference while the
              product logic is still mocked out.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-[100px] bg-violet px-5 text-[14px] font-medium leading-5 text-on-primary transition hover:opacity-90"
            >
              Start free trial
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-[100px] border border-on-primary/15 bg-on-primary/10 px-5 text-[14px] font-medium leading-5 text-on-primary transition hover:bg-on-primary/15"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
