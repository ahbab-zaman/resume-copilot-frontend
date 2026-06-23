"use client";
import { howItWorksSteps } from "@/components/landing/content";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { useEffect, useState } from "react";

function StepOneVisual({ animated }: { animated: boolean }) {
  return (
    <div className="mt-5 rounded-[10px] border border-border bg-surface-secondary p-3">
      <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted mb-2">
        Resume uploaded
      </p>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-light">
          <svg
            className="h-3 w-3 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-text-primary truncate">
            my_resume_2024.pdf
          </p>
          <p className="text-[9px] text-text-muted">245 KB · Ready</p>
        </div>
        <div
          className="h-2 w-2 rounded-full bg-success"
          style={{
            opacity: animated ? 1 : 0,
            transition: "opacity 0.4s ease 0.6s",
          }}
        />
      </div>
      <div className="mt-2 space-y-1.5">
        {[
          { label: "Parsing text", done: true },
          { label: "Extracting skills", done: true },
          { label: "Ready for analysis", done: true },
        ].map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
            style={{
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(-6px)",
              transition: `opacity 0.4s ease ${0.3 + i * 0.15}s, transform 0.4s ease ${0.3 + i * 0.15}s`,
            }}
          >
            <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-success-light">
              <svg
                className="h-2 w-2 text-success"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-[9px] text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepTwoVisual({ animated }: { animated: boolean }) {
  const score = 86;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? score / 100 : 0) * circumference;

  return (
    <div className="mt-5 rounded-[10px] border border-border bg-surface-secondary p-3">
      <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted mb-2">
        ATS analysis
      </p>
      <div className="flex items-center gap-3">
        <div className="relative shrink-0 flex items-center justify-center">
          <svg width="52" height="52" className="-rotate-90">
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
            />
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="var(--success)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s",
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[13px] font-semibold leading-none text-text-primary">
              {animated ? score : 0}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[
            { label: "Skills", value: 91, color: "bg-success" },
            { label: "Experience", value: 84, color: "bg-accent" },
            { label: "Education", value: 78, color: "bg-warning" },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[9px] text-text-secondary">
                  {item.label}
                </span>
                <span className="text-[9px] text-text-primary">
                  {item.value}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-border">
                <div
                  className={`h-1 rounded-full ${item.color}`}
                  style={{
                    width: animated ? `${item.value}%` : "0%",
                    transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${0.4 + i * 0.15}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {["React", "TypeScript", "Node.js"].map((kw, i) => (
          <span
            key={kw}
            className="rounded-full bg-warning-light px-1.5 py-0.5 text-[8px] font-medium text-warning-foreground"
            style={{
              opacity: animated ? 1 : 0,
              transition: `opacity 0.4s ease ${0.8 + i * 0.1}s`,
            }}
          >
            missing: {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepThreeVisual({ animated }: { animated: boolean }) {
  const outputs = [
    {
      label: "Optimized Resume",
      icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z",
      color: "bg-accent-light",
      text: "text-accent",
      status: "Ready",
    },
    {
      label: "Cover Letter",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "bg-success-light",
      text: "text-success-foreground",
      status: "Ready",
    },
    {
      label: "Interview Prep",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      color: "bg-teal-light",
      text: "text-teal-foreground",
      status: "6 Qs",
    },
  ];

  return (
    <div className="mt-5 rounded-[10px] border border-border bg-surface-secondary p-3">
      <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted mb-2">
        Generated outputs
      </p>
      <div className="space-y-1.5">
        {outputs.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2"
            style={{
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 0.4s ease ${0.2 + i * 0.2}s, transform 0.4s ease ${0.2 + i * 0.2}s`,
            }}
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${item.color}`}
            >
              <svg
                className={`h-3 w-3 ${item.text}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={item.icon} />
              </svg>
            </div>
            <span className="flex-1 text-[10px] text-text-secondary">
              {item.label}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium ${item.color} ${item.text}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const visuals = [
    <StepOneVisual key="1" animated={animated} />,
    <StepTwoVisual key="2" animated={animated} />,
    <StepThreeVisual key="3" animated={animated} />,
  ];

  return (
    <section
      id="how-it-works"
      className="border-b border-border bg-surface-secondary"
    >
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .step-card {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 2px 2px rgba(0,0,0,0.04), 0 16px 32px -8px rgba(0,0,0,0.10), 0 0 0 1px var(--border) inset;
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Three steps, one application kit."
            description="The layout keeps the sequence obvious: upload, compare, and generate the output you need next."
          />
        </RevealSection>

        {/* Step connector line */}
        <div className="relative mt-12">
          <div className="absolute top-[28px] left-0 right-0 hidden lg:block">
            <div className="mx-auto flex items-center px-8">
              <div className="flex-1" />
              <div className="relative flex-[2] mx-4">
                <div className="h-px bg-border" />
                <div
                  className="absolute inset-y-0 left-0 h-px bg-accent"
                  style={{
                    width: animated ? "100%" : "0%",
                    transition: "width 1.5s cubic-bezier(0.4,0,0.2,1) 0.2s",
                  }}
                />
              </div>
              <div className="flex-1" />
              <div className="relative flex-[2] mx-4">
                <div className="h-px bg-border" />
                <div
                  className="absolute inset-y-0 left-0 h-px bg-accent"
                  style={{
                    width: animated ? "100%" : "0%",
                    transition: "width 1.5s cubic-bezier(0.4,0,0.2,1) 0.8s",
                  }}
                />
              </div>
              <div className="flex-1" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <RevealSection key={step.number}>
                <article className="step-card rounded-[12px] border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
                  {/* Step number + dot indicator */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-secondary">
                        <span className="text-[13px] font-semibold text-accent">
                          {step.number}
                        </span>
                        <div
                          className="pulse-dot absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent"
                          style={{ animationDelay: `${index * 0.4}s` }}
                        />
                      </div>
                      <div className="h-px flex-1 w-8 bg-border" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Step {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-text-secondary">
                    {step.description}
                  </p>

                  {/* Per-step mini visual */}
                  {visuals[index]}
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
