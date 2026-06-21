import { metrics, trustedBy } from "@/components/landing/content";

function CardChrome() {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-violet" />
        <div className="h-2.5 w-16 rounded-full bg-surface-secondary" />
      </div>
      <div className="flex items-center gap-2 text-text-muted">
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
        <div className="h-2.5 w-2.5 rounded-full bg-surface-secondary" />
      </div>
    </div>
  );
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[12px] border border-border bg-surface px-4 py-3">
      <p
        className="font-semibold text-text-primary tracking-[-0.04em]"
        style={{ fontSize: "24px", lineHeight: "32px" }}
      >
        {value}
      </p>
      <p className="mt-1 text-[12px] leading-4 text-text-secondary">{label}</p>
    </div>
  );
}

function MockDesktopPreview() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border border-border bg-surface"
      style={{
        boxShadow:
          "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px var(--border) inset",
      }}
    >
      <CardChrome />
      <div className="grid gap-4 p-5">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-[16px] border border-border bg-surface-secondary p-4">
            <div className="h-2.5 w-20 rounded-full bg-border" />
            <div className="mt-4 space-y-3">
              {["Overview", "Resume", "Analysis", "Interview"].map((item) => (
                <div key={item} className="h-8 rounded-[10px] bg-surface" />
              ))}
            </div>
          </aside>
          <div className="grid gap-4">
            <div className="rounded-[16px] border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] leading-4 text-text-muted">
                    Today&apos;s overview
                  </p>
                  <p
                    className="mt-1 font-semibold tracking-[-0.04em] text-text-primary"
                    style={{ fontSize: "20px", lineHeight: "28px" }}
                  >
                    Work faster with a complete application workspace.
                  </p>
                </div>
                <div className="rounded-full bg-violet-light px-3 py-1 text-[12px] leading-4 text-violet-foreground">
                  Live preview
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.slice(0, 4).map((metric) => (
                  <MiniMetric key={metric.label} {...metric} />
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[16px] border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    Performance trend
                  </p>
                  <span className="rounded-full bg-success-light px-2 py-1 text-[12px] leading-4 text-success-foreground">
                    92% match
                  </span>
                </div>
                <div className="mt-4 h-40 rounded-[14px] bg-surface-secondary p-4">
                  <div className="flex h-full items-end gap-2">
                    {[28, 40, 34, 58, 46, 72, 64, 84].map((height, index) => (
                      <div
                        key={`${height}-${index}`}
                        className="flex-1 rounded-t-[999px] bg-violet/70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[16px] border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium leading-5 text-text-primary">
                    ATS score
                  </p>
                  <span className="font-mono text-[12px] text-text-muted">
                    AI summary
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-border bg-surface-secondary">
                    <div className="absolute inset-2 rounded-full border border-border bg-surface" />
                    <div className="relative text-center">
                      <p
                        className="font-semibold text-text-primary tracking-[-0.05em]"
                        style={{ fontSize: "32px", lineHeight: "32px" }}
                      >
                        86
                      </p>
                      <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                        overall
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "Skills", value: "91%" },
                    { label: "Experience", value: "84%" },
                    { label: "Education", value: "88%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-[12px] leading-4">
                        <span className="text-text-secondary">{row.label}</span>
                        <span className="text-text-primary">{row.value}</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: row.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border"
      id="features"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, color-mix(in srgb, var(--gradient-preview-start) 16%, transparent), transparent 28%), radial-gradient(circle at 72% 20%, color-mix(in srgb, var(--gradient-develop-start) 16%, transparent), transparent 28%), radial-gradient(circle at 55% 62%, color-mix(in srgb, var(--gradient-ship-end) 10%, transparent), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 xl:grid-cols-[0.92fr_1.08fr] xl:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
              AI-POWERED JOB APPLICATIONS
            </p>
            <h1
              className="mt-5 font-semibold tracking-[-0.06em] text-text-primary"
              style={{ fontSize: "48px", lineHeight: "48px" }}
            >
              Tailor every application.
              <br />
              Land interviews faster.
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
                Try free
              </a>
              <a
                href="#pricing"
                className="inline-flex h-12 items-center justify-center rounded-[100px] border border-border bg-surface px-5 text-[16px] font-medium leading-6 text-text-primary transition hover:bg-surface-secondary"
              >
                See pricing
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Resume upload", "ATS analysis", "Interview prep"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-[12px] border border-border bg-surface p-4"
                  >
                    <p className="text-[13px] font-medium leading-5 text-text-primary">
                      {item}
                    </p>
                    <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                      Mock data only.
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--gradient-preview-start) 24%, transparent), transparent 52%), radial-gradient(circle at 65% 30%, color-mix(in srgb, var(--gradient-develop-end) 24%, transparent), transparent 46%), radial-gradient(circle at 55% 70%, color-mix(in srgb, var(--gradient-ship-end) 14%, transparent), transparent 48%)",
              }}
            />
            <div className="relative xl:min-h-[640px]">
              <div className="relative z-10 w-full max-w-[660px]">
                <MockDesktopPreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[13px] leading-5 text-text-muted">
            {trustedBy.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
