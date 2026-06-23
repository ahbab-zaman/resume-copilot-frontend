"use client";

function HeroPreview() {
  return (
    <div className="relative h-[560px] w-full select-none overflow-visible">
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: rotate(-18deg) translateY(0px); }
          50% { transform: rotate(-18deg) translateY(-12px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: rotate(-8deg) translateY(0px); }
          50% { transform: rotate(-8deg) translateY(-14px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: rotate(4deg) translateY(0px); }
          50% { transform: rotate(4deg) translateY(-10px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: rotate(16deg) translateY(0px); }
          50% { transform: rotate(16deg) translateY(-13px); }
        }
        .card-1 { animation: float-1 4.2s ease-in-out infinite; }
        .card-2 { animation: float-2 3.8s ease-in-out infinite 0.4s; }
        .card-3 { animation: float-3 4.6s ease-in-out infinite 0.8s; }
        .card-4 { animation: float-4 4.0s ease-in-out infinite 1.2s; }
      `}</style>

      {/* Fan origin — all cards spread from bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0">
        {/* Card 1 — far left */}
        <div
          className="card-1 absolute w-[260px] h-[360px] rounded-2xl border border-border bg-surface shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)]"
          style={{
            bottom: "120px",
            left: "-340px",
            transformOrigin: "bottom center",
          }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-3">
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

        {/* Card 2 — left of center */}
        <div
          className="card-2 absolute w-[260px] h-[360px] rounded-2xl border border-border bg-surface shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)]"
          style={{
            bottom: "120px",
            left: "-170px",
            transformOrigin: "bottom center",
          }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-3">
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

        {/* Card 3 — right of center (front card, no rotation overlap) */}
        <div
          className="card-2 absolute w-[260px] h-[360px] rounded-2xl border border-border bg-surface shadow-[0_20px_48px_-8px_rgba(0,0,0,0.22)]"
          style={{
            bottom: "120px",
            left: "-10px",
            transformOrigin: "bottom center",
            zIndex: 10,
          }}
        >
          {/* Avatar top center */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full border-2 border-surface shadow-md overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 pt-9">
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

        {/* Card 4 — far right */}
        <div
          className="card-4 absolute w-[260px] h-[360px] rounded-2xl border border-border bg-surface shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)]"
          style={{
            bottom: "120px",
            left: "150px",
            transformOrigin: "bottom center",
          }}
        >
          <div className="p-4 pt-5">
            <div className="flex items-center gap-2 mb-3">
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
        className="aurora-gradient pointer-events-none absolute inset-x-0 top-0 h-[70%]"
      />
      <div className="relative mx-auto max-w-350 px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 xl:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[12px] leading-4 text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              AI-POWERED JOB APPLICATIONS
            </p>
            <h1 className="mt-5 text-[48px] font-semibold leading-[1.1] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px]">
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
          <div className="relative flex items-center justify-center pl-8 pt-8 overflow-visible">
            <div
              aria-hidden="true"
              className="aurora-gradient absolute -inset-10 -z-10 rounded-[40px]"
            />
            {/* <Image
              src={banner}
              alt="Resume builder dashboard"
              className="w-full max-w-[680px] drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
              }}
            /> */}
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
