// import Image, { type StaticImageData } from "next/image";

// import { featureCards } from "@/components/landing/content";
// import { RevealSection } from "@/components/landing/RevealSection";
// import { SectionHeading } from "@/components/landing/SectionHeading";

// function FeatureIcon({ icon }: { icon: StaticImageData }) {
//   return (
//     <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-border">
//       <Image src={icon} alt="" width={50} height={50} aria-hidden="true" />
//     </div>
//   );
// }

// export function Features() {
//   return (
//     <section className="border-b border-border bg-background">
//       <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//         <RevealSection>
//           <SectionHeading
//             eyebrow="FEATURES"
//             title="Everything you need to apply, faster."
//             description="The workflow stays tight: score the resume, improve the draft, and move into output generation without leaving the product."
//           />
//         </RevealSection>

//         <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {featureCards.map((card) => (
//             <RevealSection key={card.title}>
//               <article className="h-full rounded-lg border border-border bg-surface p-6 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_0_1px_var(--color-border)_inset]">
//                 <FeatureIcon icon={card.icon} />
//                 <h3 className="mt-5 text-[20px] font-semibold leading-7 tracking-[-0.04em] text-text-primary">
//                   {card.title}
//                 </h3>
//                 <p className="mt-3 text-[16px] leading-7 text-text-secondary">
//                   {card.description}
//                 </p>
//               </article>
//             </RevealSection>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

import { featureCards } from "@/components/landing/content";
import { RevealSection } from "@/components/landing/RevealSection";
import { SectionHeading } from "@/components/landing/SectionHeading";

function FeatureCard({
  card,
}: {
  card: {
    title: string;
    description: string;
    icon: StaticImageData;
    href?: string;
    linkLabel?: string;
  };
}) {
  return (
    <article className="flex flex-col">
      {/* Image block with tinted background */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg"
        style={{ background: "var(--color-accent-light)", minHeight: "220px" }}
      >
        <Image
          src={card.icon}
          alt={card.title}
          width={330}
          height={220}
          className="rounded object-contain w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <h3
        className="mt-4 font-semibold leading-snug tracking-tight text-text-primary"
        style={{ fontSize: "22px" }}
      >
        {card.title}
      </h3>
      <p
        className="mt-3 leading-7 text-text-secondary"
        style={{ fontSize: "16px" }}
      >
        {card.description}
      </p>
      {card.linkLabel && (
        <a
          href={card.href ?? "#"}
          className="mt-3 text-accent hover:underline"
          style={{ fontSize: "15px" }}
        >
          {card.linkLabel}
        </a>
      )}
    </article>
  );
}

export function Features() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((i) => (i - 1 + featureCards.length) % featureCards.length);
  const next = () => setCurrent((i) => (i + 1) % featureCards.length);

  return (
    <section
      id="features"
      className="scroll-mt-24 border-b border-border bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <RevealSection>
          <SectionHeading
            eyebrow="FEATURES"
            title="Everything you need to apply, faster."
            description="The workflow stays tight: score the resume, improve the draft, and move into output generation without leaving the product."
          />
        </RevealSection>

        {/* Desktop grid */}
        <div className="mt-12 hidden gap-8 md:grid md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <RevealSection key={card.title}>
              <FeatureCard card={card} />
            </RevealSection>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-10 md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {featureCards.map((card) => (
                <div key={card.title} className="w-full shrink-0 px-1">
                  <FeatureCard card={card} />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition hover:bg-surface-secondary"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {featureCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-2 w-2 rounded-full transition-all"
                  style={{
                    background:
                      i === current
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition hover:bg-surface-secondary"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
