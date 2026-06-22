import { Faq } from "@/components/landing/Faq";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
            <p className="font-mono text-[12px] leading-4 text-text-muted">FAQ</p>
            <h1 className="mt-4 text-[48px] font-semibold leading-[48px] tracking-[-0.06em] text-text-primary max-[639px]:text-[36px] max-[639px]:leading-[40px]">
              Questions, answered clearly.
            </h1>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-text-secondary">
              The product stays focused, so the answers do too. This page keeps
              the same calm marketing treatment as the landing page.
            </p>
          </div>
        </section>
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
