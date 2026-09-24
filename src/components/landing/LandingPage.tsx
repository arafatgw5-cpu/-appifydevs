"use client";

import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { AIModels } from "./AIModels";
import { ProductPreview } from "./ProductPreview";
import { WhyChoose } from "./WhyChoose";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <AIModels />
        <ProductPreview />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
