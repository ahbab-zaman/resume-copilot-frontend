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
        </section>
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
