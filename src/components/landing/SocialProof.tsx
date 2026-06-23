"use client";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { useEffect, useRef } from "react";

const allTestimonials = [
  {
    name: "Aisha Patel",
    title: "Software Engineer · Hired at Stripe",
    quote:
      "I went from 2% callback rate to 40% in two weeks. The ATS score told me exactly what was missing.",
  },
  {
    name: "Marcus Webb",
    title: "Product Manager · Hired at Notion",
    quote:
      "The cover letter generator saved me hours per application. Each one felt genuinely tailored.",
  },
  {
    name: "Priya Mehta",
    title: "UX Designer · Hired at Figma",
    quote:
      "Interview prep was the feature I didn't know I needed. Walked in confident for the first time.",
  },
  {
    name: "Daniel Osei",
    title: "Data Analyst · Hired at Airbnb",
    quote:
      "Seeing my resume scored against a real job description changed how I write bullet points entirely.",
  },
  {
    name: "Sophie Liang",
    title: "Frontend Engineer · Hired at Vercel",
    quote:
      "Three months of searching ended in two weeks after I started optimizing with this tool.",
  },
  {
    name: "Ravi Kumar",
    title: "Backend Engineer · Hired at Cloudflare",
    quote:
      "The missing keywords panel alone was worth it. I had no idea how badly my resume was underselling me.",
  },
  {
    name: "Emma Thornton",
    title: "Marketing Manager · Hired at Linear",
    quote:
      "I used to spend 45 minutes tweaking my resume per application. Now it takes 5 minutes.",
  },
  {
    name: "James Okafor",
    title: "DevOps Engineer · Hired at Render",
    quote:
      "Clean, fast, and honest feedback. No fluff — just what the ATS actually cares about.",
  },
  {
    name: "Fatima Al-Hassan",
    title: "Product Designer · Hired at Loom",
    quote:
      "The optimized resume draft felt like my voice but sharper. I barely had to edit anything.",
  },
  {
    name: "Carlos Rivera",
    title: "Full Stack Developer · Hired at Railway",
    quote:
      "Went from ghosted to three offers. The keyword alignment made a bigger difference than I expected.",
  },
  {
    name: "Yuki Tanaka",
    title: "ML Engineer · Hired at Hugging Face",
    quote:
      "I appreciate that it tells you the score before and after optimizing. The improvement was real.",
  },
  {
    name: "Natalie Brooks",
    title: "Operations Lead · Hired at Retool",
    quote:
      "The interview questions were perfectly calibrated to the role. I got asked two of them verbatim.",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof allTestimonials)[0];
}) {
  return (
    <article className="w-[320px] shrink-0 rounded-[16px] border border-border bg-surface p-5 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--border)_inset]">
      <p className="text-[15px] leading-7 text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-[12px] font-medium text-text-primary">
          {testimonial.name.slice(0, 1)}
        </div>
        <div>
          <p className="text-[14px] font-medium leading-5 text-text-primary">
            {testimonial.name}
          </p>
          <p className="text-[12px] leading-4 text-text-muted">
            {testimonial.title}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: typeof allTestimonials;
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="border-b border-border bg-background overflow-hidden">
      <style>{`
       
      `}</style>

      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="Built to feel calm when the search is not."
            description="Short, specific feedback keeps the page believable without relying on live customer data."
          />
        </RevealSection>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mt-4 space-y-4 pb-16">
        <MarqueeRow
          items={allTestimonials.slice(0, 6)}
          direction="left"
          speed={45}
        />
        {/* Row 2 — scrolls right */}
        <MarqueeRow
          items={allTestimonials.slice(6, 12)}
          direction="right"
          speed={38}
        />
      </div>
    </section>
  );
}
