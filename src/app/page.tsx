import { AtsPreview } from "@/components/landing/AtsPreview";
import { CallToAction } from "@/components/landing/CallToAction";
import { Faq } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks isAuthenticated={Boolean(session)} />
        <Features />
        <AtsPreview />
        <SocialProof />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
