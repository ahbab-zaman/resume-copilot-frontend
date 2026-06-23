// // AtsPreview — animated score ring + staggered bars
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
    <section className="border-b border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[12px] leading-4 text-text-muted">
            ATS ANALYSIS PREVIEW
          </p>
          <div className="mt-4 rounded-[16px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              {/* Score panel */}
              <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                <p className="font-mono text-[12px] leading-4 text-text-muted">
                  ATS MATCH SCORE
                </p>
                <div className="mt-4 flex items-center gap-6">
                  {/* Animated ring */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <svg width="96" height="96" className="-rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke="var(--border)"
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
                      <span className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-text-primary">
                        {count}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        overall
                      </span>
                    </div>
                  </div>

                  {/* Metric bars */}
                  <div className="space-y-3 flex-1">
                    {[
                      { label: "Skills", value: 91, color: "bg-success" },
                      { label: "Experience", value: 84, color: "bg-accent" },
                      { label: "Education", value: 78, color: "bg-warning" },
                    ].map((item, i) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-[12px] leading-4">
                          <span className="text-text-secondary">
                            {item.label}
                          </span>
                          <span className="text-text-primary">
                            {item.value}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 rounded-full bg-border">
                          <div
                            className={`h-1 rounded-full ${item.color}`}
                            style={{
                              width: animated ? `${item.value}%` : "0%",
                              transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyword chips animate in */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-2">
                    Matched Keywords
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "React",
                      "TypeScript",
                      "REST API",
                      "Node.js",
                      "CI/CD",
                    ].map((kw, i) => (
                      <span
                        key={kw}
                        className="inline-flex rounded-full bg-success-light px-2 py-0.5 text-[11px] font-medium text-success-foreground"
                        style={{
                          opacity: animated ? 1 : 0,
                          transform: animated
                            ? "translateY(0)"
                            : "translateY(4px)",
                          transition: `opacity 0.4s ease ${800 + i * 80}ms, transform 0.4s ease ${800 + i * 80}ms`,
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    INSIGHTS
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Strong alignment with frontend delivery and collaboration.",
                      "Missing keywords are concentrated around testing and scale.",
                      "The strongest wins come from measurable impact statements.",
                    ].map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[14px] leading-6 text-text-secondary"
                        style={{
                          opacity: animated ? 1 : 0,
                          transform: animated
                            ? "translateX(0)"
                            : "translateX(-8px)",
                          transition: `opacity 0.5s ease ${400 + i * 150}ms, transform 0.5s ease ${400 + i * 150}ms`,
                        }}
                      >
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[14px] border border-border bg-surface-secondary p-5">
                  <p className="font-mono text-[12px] leading-4 text-text-muted">
                    MISSING KEYWORDS
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "Testing",
                      "System design",
                      "Performance tuning",
                      "React",
                    ].map((keyword, i) => (
                      <span
                        key={keyword}
                        className="inline-flex rounded-full bg-warning-light px-2 py-0.5 text-[12px] leading-4 text-warning-foreground"
                        style={{
                          opacity: animated ? 1 : 0,
                          transition: `opacity 0.4s ease ${600 + i * 100}ms`,
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
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
