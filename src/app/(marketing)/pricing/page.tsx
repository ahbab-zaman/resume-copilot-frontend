import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
            <p className="font-mono text-[12px] leading-4 text-text-muted">
              PRICING
            </p>
            <h1 className="mt-4 text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px] max-[639px]:leading-[40px]">
              Simple, transparent pricing.
            </h1>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-text-secondary">
              The product stays free while the workflow is being built out, so the page
              just makes that clear and keeps the marketing register consistent.
            </p>
          </div>
        </section>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
