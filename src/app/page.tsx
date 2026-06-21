import { CallToAction } from "@/components/landing/CallToAction";
import { Faq } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { SocialProof } from "@/components/landing/SocialProof";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
