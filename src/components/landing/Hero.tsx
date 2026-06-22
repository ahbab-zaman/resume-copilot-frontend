function HeroPreview() {
  const bars = [34, 46, 55, 64, 82, 76];

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-violet" />
          <div className="h-2.5 w-24 rounded-full bg-surface-secondary" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
          <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
          <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[210px_1fr]">
        <aside className="rounded-[16px] border border-border bg-surface-secondary p-4">
          <p className="font-mono text-[12px] leading-4 text-text-muted">
            TODAY&apos;S WORKSPACE
          </p>
          <div className="mt-4 space-y-2">
            {["Dashboard", "Resumes", "Copilot", "Applications"].map((item, index) => (
              <div
                key={item}
                className={`rounded-[10px] px-3 py-2 text-[13px] leading-5 ${
                  index === 1
                    ? "bg-surface text-text-primary"
                    : "bg-surface-secondary text-text-secondary"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="rounded-[16px] border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  ATS PREVIEW
                </p>
                <p className="mt-2 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                  Score your resume before you send it.
                </p>
              </div>
              <span className="inline-flex rounded-full bg-success-light px-3 py-1 text-[12px] leading-4 text-success-foreground">
                86% match
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Skills", value: 90 },
                { label: "Experience", value: 84 },
                { label: "Education", value: 78 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[12px] border border-border bg-surface-secondary p-4"
                >
                  <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
                    <span>{item.label}</span>
                    <span className="text-text-primary">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-border">
                    <div
                      className={`h-1 rounded-full ${
                        item.value >= 80
                          ? "bg-success"
                          : item.value >= 50
                            ? "bg-warning"
                            : "bg-error"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {bars.map((height, index) => (
              <div
                key={height}
                className="h-24 rounded-[14px] border border-border bg-surface-secondary p-4"
              >
                <div className="flex h-full items-end gap-2">
                  {[22, 40, 31, 55, 48, 72].map((barHeight, barIndex) => (
                    <div
                      key={`${barIndex}-${height}`}
                      className={`flex-1 rounded-t-full ${
                        index % 2 === 0 ? "bg-violet/70" : "bg-link/70"
                      }`}
                      style={{ height: `${barHeight}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--gradient-preview-start) 16%, transparent), transparent 28%), radial-gradient(circle at 72% 20%, color-mix(in srgb, var(--gradient-develop-start) 16%, transparent), transparent 28%), radial-gradient(circle at 55% 62%, color-mix(in srgb, var(--gradient-ship-end) 10%, transparent), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
              AI-POWERED JOB APPLICATIONS
            </p>
            <h1 className="mt-5 max-w-xl text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px] max-[639px]:leading-[40px]">
              Land your next role, faster.
            </h1>
            <p className="mt-5 max-w-xl text-[18px] leading-7 text-text-secondary">
              Upload a resume, paste a job description, and get a sharper ATS
              score, a better resume draft, a tailored cover letter, and
              interview questions in one focused workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-[100px] bg-accent px-5 text-[16px] font-medium leading-6 text-on-primary transition hover:opacity-90"
              >
                Get Started Free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-[100px] border border-border bg-surface px-5 text-[16px] font-medium leading-6 text-text-primary transition hover:bg-surface-secondary"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--gradient-preview-start) 24%, transparent), transparent 52%), radial-gradient(circle at 65% 30%, color-mix(in srgb, var(--gradient-develop-end) 24%, transparent), transparent 46%), radial-gradient(circle at 55% 70%, color-mix(in srgb, var(--gradient-ship-end) 14%, transparent), transparent 48%)",
              }}
            />
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
