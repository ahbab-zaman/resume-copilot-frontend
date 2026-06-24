"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import video from "@/assets/video.gif";

const steps = [
  {
    eyebrow: "AI Resume Builder",
    title: "Let artificial intelligence write your resume.",
    description:
      "Are you struggling to find the right words for your resume? Our AI resume builder can find them in no time! It's powered by Gemini's 2.5 Flash, the world's most powerful language model, and it can automatically produce text indistinguishable from human writers. Say goodbye to writer's block. Generate the first draft of your resume in seconds.",
    linkLabel: "Learn more about the AI resume builder.",
    href: "/en/ai-resume-writer/",
    ctaLabel: "Optimize your Resume",
    ctaHref: "/resumes",
    checks: [
      "Powered by Gemini 2.5 Flash",
      "Generated in seconds",
      "Produces human-like text",
      "Nobody's gonna know",
    ],
    reverse: false,
  }
];

function CheckIcon() {
  return (
    <svg
      style={{
        width: "14px",
        height: "14px",
        flexShrink: 0,
        color: "var(--color-accent)",
      }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function StepVisual() {
  return (
    <div
      className="flex items-center justify-center rounded-xl overflow-hidden"
      style={{ background: "var(--color-surface-secondary)" }}
    >
      <Image
        src={video}
        alt=""
        className="w-full h-auto rounded-xl"
        unoptimized
      />
    </div>
  );
}

type HowItWorksProps = {
  isAuthenticated: boolean;
};

export function HowItWorks({ isAuthenticated }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="border-b border-border bg-background">
      <div className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="TAKE A CLOSER LOOK"
            title="More than a resume builder."
            description="Every tool you need, from first draft to final submission."
          />
        </RevealSection>

        <div className="mt-16 space-y-20">
          {steps.map((step) => (
            <RevealSection key={step.eyebrow}>
              <div
                className={`grid items-center gap-10 md:grid-cols-2 ${
                  step.reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual */}
                <div>
                  <StepVisual />
                </div>

                {/* Text */}
                <div>
                  <p
                    className="text-[13px] font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {step.eyebrow}
                  </p>
                  <h2
                    className="mt-2 font-semibold leading-tight tracking-tight text-text-primary"
                    style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
                  >
                    {step.title}
                  </h2>
                  <p className="mt-4 text-[16px] leading-7 text-text-secondary">
                    {step.description}{" "}
                    <Link
                      href={step.href}
                      className="hover:underline"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {step.linkLabel}
                    </Link>
                  </p>

                  <hr className="my-5 border-border" />

                  <ul
                    className="grid gap-x-6 gap-y-2"
                    style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                  >
                    {step.checks.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckIcon />
                        <span className="text-[14px] text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={isAuthenticated ? step.ctaHref : "/login"}
                    className="mt-8 inline-flex h-12 items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white transition hover:opacity-90 cursor-pointer"
                    style={{ background: "var(--color-accent)" }}
                  >
                    {step.ctaLabel}
                  </Link>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
