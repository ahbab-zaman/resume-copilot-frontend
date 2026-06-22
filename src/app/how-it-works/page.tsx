import { AtsPreview } from "@/components/landing/AtsPreview";
import { CallToAction } from "@/components/landing/CallToAction";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
            <p className="font-mono text-[12px] leading-4 text-text-muted">
              HOW IT WORKS
            </p>
            <h1 className="mt-4 text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px] max-[639px]:leading-[40px]">
              Three steps, one application kit.
            </h1>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-text-secondary">
              The same visual system from the landing page, laid out as a
              standalone route for visitors who want the workflow explained
              before they sign up.
            </p>
          </div>
        </section>
        <HowItWorks />
        <AtsPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
