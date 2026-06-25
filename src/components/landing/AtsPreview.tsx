"use client";
import { useEffect, useState } from "react";

export function AtsPreview() {
  const [animated, setAnimated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
      let current = 0;
      const target = 86;
      const step = 1200 / target;
      const counter = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= target) clearInterval(counter);
      }, step);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? 86 / 100 : 0) * circumference;

  return (
    <section
      id="ats-preview"
      className="scroll-mt-24 border-b border-border bg-surface-secondary"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left — heading + context ── */}
          <div>
            <p
              className="font-mono text-[12px] uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              ATS Analysis
            </p>
            <h2
              className="mt-3 font-bold leading-tight tracking-tight text-text-primary"
              style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
            >
              Know exactly how your resume performs.
            </h2>
            <p
              className="mt-4 text-[16px] leading-7"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Paste a job description and get an instant ATS score, matched
              keywords, missing terms, and actionable insights — before you ever
              hit submit.
            </p>

            {/* Stat row */}
            <div
              className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border p-5"
              style={{ background: "var(--color-surface)" }}
            >
              {[
                { value: "86%", label: "Avg ATS score" },
                { value: "3×", label: "More interviews" },
                { value: "2 min", label: "Analysis time" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-[26px] font-bold leading-none tracking-tight"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[13px] leading-5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Insight list */}
            <ul className="mt-8 space-y-3">
              {[
                "Strong alignment with frontend delivery and collaboration.",
                "Missing keywords are concentrated around testing and scale.",
                "The strongest wins come from measurable impact statements.",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                  style={{
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateX(0)" : "translateX(-8px)",
                    transition: `opacity 0.5s ease ${400 + i * 150}ms, transform 0.5s ease ${400 + i * 150}ms`,
                  }}
                >
                  <div
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="text-[15px] leading-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — score card ── */}
          <div
            className="rounded-2xl border border-border p-6 shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.08)]"
            style={{ background: "var(--color-surface)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                ATS Match Score
              </p>
              <span
                className="rounded-full px-3 py-1 text-[12px] font-semibold"
                style={{
                  background: "var(--color-success-light)",
                  color: "var(--color-success-foreground)",
                }}
              >
                Good Match
              </span>
            </div>

            {/* Score ring + bars */}
            <div
              className="flex items-center gap-6 rounded-xl p-4"
              style={{ background: "var(--color-surface-secondary)" }}
            >
              {/* Ring */}
              <div className="relative shrink-0 flex items-center justify-center">
                <svg width="96" height="96" className="-rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                      transition:
                        "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span
                    className="text-[26px] font-semibold leading-none tracking-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {count}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    overall
                  </span>
                </div>
              </div>

              {/* Bars */}
              <div className="flex-1 space-y-3">
                {[
                  { label: "Skills", value: 91, color: "var(--color-success)" },
                  {
                    label: "Experience",
                    value: 84,
                    color: "var(--color-accent)",
                  },
                  {
                    label: "Education",
                    value: 78,
                    color: "var(--color-warning)",
                  },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[12px]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-[12px] font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {item.value}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "var(--color-border)" }}
                    >
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: animated ? `${item.value}%` : "0%",
                          background: item.color,
                          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched keywords */}
            <div
              className="mt-4 rounded-xl p-4"
              style={{ background: "var(--color-surface-secondary)" }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Matched Keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["React", "TypeScript", "REST API", "Node.js", "CI/CD"].map(
                  (kw, i) => (
                    <span
                      key={kw}
                      className="inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium"
                      style={{
                        background: "var(--color-success-light)",
                        color: "var(--color-success-foreground)",
                        opacity: animated ? 1 : 0,
                        transform: animated
                          ? "translateY(0)"
                          : "translateY(4px)",
                        transition: `opacity 0.4s ease ${800 + i * 80}ms, transform 0.4s ease ${800 + i * 80}ms`,
                      }}
                    >
                      ✓ {kw}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Missing keywords */}
            <div
              className="mt-4 rounded-xl p-4"
              style={{ background: "var(--color-surface-secondary)" }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Missing Keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Testing",
                  "System design",
                  "Performance tuning",
                  "React",
                ].map((kw, i) => (
                  <span
                    key={kw}
                    className="inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium"
                    style={{
                      background: "var(--color-warning-light)",
                      color: "var(--color-warning-foreground)",
                      opacity: animated ? 1 : 0,
                      transition: `opacity 0.4s ease ${600 + i * 100}ms`,
                    }}
                  >
                    ✕ {kw}
                  </span>
                ))}
              </div>
            </div>

            <p
              className="mt-4 text-[13px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              Real output from an actual analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
