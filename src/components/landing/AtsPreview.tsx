export function AtsPreview() {
  return (
    <section className="border-b border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[12px] leading-4 text-text-muted">
            ATS ANALYSIS PREVIEW
          </p>
          <div className="mt-4 rounded-[16px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  ATS MATCH SCORE
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-surface">
                    <div className="text-center">
                      <p className="text-[32px] font-semibold leading-8 tracking-[-0.06em] text-text-primary">
                        86
                      </p>
                      <p className="text-[12px] leading-4 text-text-muted">
                        overall
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[
                      { label: "Skills", value: 91 },
                      { label: "Experience", value: 84 },
                      { label: "Education", value: 78 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-[12px] leading-4">
                          <span className="text-text-secondary">{item.label}</span>
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
              </div>

              <div className="space-y-4">
                <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    INSIGHTS
                  </p>
                  <ul className="mt-4 space-y-3 text-[14px] leading-6 text-text-secondary">
                    <li>Strong alignment with frontend delivery and collaboration.</li>
                    <li>Missing keywords are concentrated around testing and scale.</li>
                    <li>The strongest wins come from measurable impact statements.</li>
                  </ul>
                </div>
                <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    MISSING KEYWORDS
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Testing", "System design", "Performance tuning", "React"].map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex rounded-full bg-warning-light px-2 py-0.5 text-[12px] leading-4 text-warning-foreground"
                        >
                          {keyword}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-6 text-text-muted">
            Real output from an actual analysis.
          </p>
        </div>
      </div>
    </section>
  );
}
