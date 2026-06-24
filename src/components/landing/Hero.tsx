"use client";

function HeroPreview() {
  return (
    <>
      {/* ── DESKTOP: original fan layout ── */}
      <div className="hidden xl:flex relative h-[500px] w-full select-none overflow-visible items-center justify-center">
        <div
          className="absolute w-[300px] h-[420px] rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md border border-border bg-surface shadow-md"
          style={{ transform: "translateX(-80px) rotate(-10deg)", zIndex: 1 }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  Sarah Chen
                </p>
                <p className="text-[9px] text-text-muted">UX Researcher</p>
              </div>
            </div>
            <div className="h-px bg-border mb-3" />
            <p className="text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Experience
            </p>
            <div className="space-y-2">
              {[
                "Google · UX Lead · 2020–Now",
                "Meta · Researcher · 2018–20",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-lg bg-surface-secondary px-2 py-1.5"
                >
                  <p className="text-[8px] text-text-secondary">{t}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {["Figma", "Research", "Prototyping"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-success">79%</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="absolute w-[300px] h-[420px] rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md border border-border bg-surface shadow-md"
          style={{ transform: "translateX(-27px) rotate(-4deg)", zIndex: 2 }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  James Park
                </p>
                <p className="text-[9px] text-text-muted">Frontend Engineer</p>
              </div>
            </div>
            <div className="h-px bg-border mb-3" />
            <p className="text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Experience
            </p>
            <div className="space-y-2">
              {[
                "Stripe · SWE II · 2021–Now",
                "Vercel · Frontend · 2019–21",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-lg bg-surface-secondary px-2 py-1.5"
                >
                  <p className="text-[8px] text-text-secondary">{t}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {["React", "TypeScript", "Node.js"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-success">83%</span>
            </div>
          </div>
        </div>

        {/* Card 3 — front/top card */}
        <div
          className="absolute w-[300px] h-[420px] rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md border border-border bg-surface shadow-xl"
          style={{ transform: "translateX(27px) rotate(4deg)", zIndex: 3 }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full border-2 border-surface shadow-md overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 pt-10">
            <div className="text-center mb-2">
              <p className="text-[11px] font-semibold text-text-primary">
                Nick Tang
              </p>
              <p className="text-[9px] text-text-muted">Product Designer</p>
            </div>
            <div className="h-px bg-border mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-widest text-accent mb-1">
                  Profile
                </p>
                <p className="text-[8px] leading-[1.5] text-text-secondary">
                  5 years building SaaS products. Expert in Figma & design
                  systems.
                </p>
                <div className="mt-2 space-y-1">
                  {["Figma", "React", "Research"].map((s) => (
                    <div key={s} className="flex items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-accent/50" />
                      <span className="text-[8px] text-text-secondary">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-widest text-accent mb-1">
                  Experience
                </p>
                <div className="space-y-1.5">
                  <div>
                    <p className="text-[8px] font-medium text-text-primary">
                      Stripe
                    </p>
                    <p className="text-[7px] text-text-muted">
                      Designer · 2021–Now
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-medium text-text-primary">
                      Notion
                    </p>
                    <p className="text-[7px] text-text-muted">UX · 2019–2021</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS SCORE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-12 rounded-full bg-border">
                  <div className="h-1 w-[86%] rounded-full bg-success" />
                </div>
                <span className="text-[10px] font-bold text-success">86%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div
          className="absolute w-[300px] h-[420px] rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md border border-border bg-surface shadow-md"
          style={{ transform: "translateX(80px) rotate(10deg)", zIndex: 2 }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=25"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  Priya Mehta
                </p>
                <p className="text-[9px] text-text-muted">Product Manager</p>
              </div>
            </div>
            <div className="h-px bg-border mb-3" />
            <p className="text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Experience
            </p>
            <div className="space-y-2">
              {["Airbnb · PM · 2022–Now", "Uber · APM · 2020–22"].map((t) => (
                <div
                  key={t}
                  className="rounded-lg bg-surface-secondary px-2 py-1.5"
                >
                  <p className="text-[8px] text-text-secondary">{t}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[8px] font-semibold uppercase tracking-widest text-accent mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {["Strategy", "Roadmap", "Agile"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-warning">71%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked bundle layout ── */}
      <div className="xl:hidden relative h-[300px] w-full flex items-center justify-center select-none">
        {/* Card 1 — bottom of stack */}
        <div
          className="absolute w-[200px] h-[260px] rounded-2xl border border-border bg-surface shadow-md"
          style={{ transform: "translateX(-24px) rotate(-8deg)", zIndex: 1 }}
        >
          <div className="p-3 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  Sarah Chen
                </p>
                <p className="text-[9px] text-text-muted">UX Researcher</p>
              </div>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex flex-wrap gap-1 mt-2">
              {["Figma", "Research", "Prototyping"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-success">79%</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="absolute w-[200px] h-[260px] rounded-2xl border border-border bg-surface shadow-md"
          style={{ transform: "translateX(-8px) rotate(-3deg)", zIndex: 2 }}
        >
          <div className="p-3 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  James Park
                </p>
                <p className="text-[9px] text-text-muted">Frontend Engineer</p>
              </div>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex flex-wrap gap-1 mt-2">
              {["React", "TypeScript", "Node.js"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-success">83%</span>
            </div>
          </div>
        </div>

        {/* Card 3 — front/top card */}
        <div
          className="absolute w-[200px] h-[260px] rounded-2xl border border-border bg-surface shadow-lg"
          style={{ transform: "translateX(8px) rotate(3deg)", zIndex: 3 }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full border-2 border-surface shadow-md overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-3 pt-8">
            <div className="text-center mb-2">
              <p className="text-[10px] font-semibold text-text-primary">
                Nick Tang
              </p>
              <p className="text-[9px] text-text-muted">Product Designer</p>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex flex-wrap gap-1 mt-2">
              {["Figma", "React", "Research"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-success">86%</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div
          className="absolute w-[200px] h-[260px] rounded-2xl border border-border bg-surface shadow-md"
          style={{ transform: "translateX(24px) rotate(8deg)", zIndex: 2 }}
        >
          <div className="p-3 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-surface shadow-sm shrink-0">
                <img
                  src="https://i.pravatar.cc/150?img=25"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">
                  Priya Mehta
                </p>
                <p className="text-[9px] text-text-muted">Product Manager</p>
              </div>
            </div>
            <div className="h-px bg-border mb-2" />
            <div className="flex flex-wrap gap-1 mt-2">
              {["Strategy", "Roadmap", "Agile"].map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent-light px-1.5 py-0.5 text-[8px] text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-surface-secondary px-2 py-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                <span className="text-[8px] text-text-muted font-mono">
                  ATS
                </span>
              </div>
              <span className="text-[10px] font-bold text-warning">71%</span>
            </div>
          </div>
        </div>
      </div>
    </>
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
        className="aurora-gradient pointer-events-none absolute inset-x-0 top-0 h-[70%]"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 xl:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              AI-POWERED JOB APPLICATIONS
            </p>
            <h1 className="mt-5 text-[48px] font-semibold leading-[1.1] tracking-[-0.06em] text-text-primary max-sm:text-[36px]">
              Land your next role, faster.
            </h1>
            <p className="mt-5 text-[18px] leading-7 text-text-secondary">
              Upload a resume, paste a job description, and get a sharper ATS
              score, a better resume draft, a tailored cover letter, and
              interview questions in one focused workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-pill bg-accent px-6 text-[16px] font-medium leading-6 text-on-primary transition hover:opacity-90"
              >
                Get Started Free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-pill border border-border bg-surface px-6 text-[16px] font-medium leading-6 text-text-primary transition hover:bg-surface-secondary"
              >
                See How It Works
              </a>
            </div>

            {/* Stat row */}
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "500+", label: "Resumes analyzed" },
                { value: "3 min", label: "Average turnaround" },
                { value: "86%", label: "Avg ATS score" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold leading-5 text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-[12px] leading-4 text-text-muted">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative flex items-center justify-center overflow-hidden xl:overflow-visible pt-8 xl:pl-8 w-full">
            <div
              aria-hidden="true"
              className="aurora-gradient absolute -inset-10 -z-10 rounded-[40px]"
            />

            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
