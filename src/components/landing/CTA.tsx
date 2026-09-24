"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Puzzle } from "lucide-react";

import { useNavigation } from "@/store/navigation";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

export function CTA() {
  const { setView } = useNavigation();

  return (
    <section
      className="relative py-12"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 px-6 py-12 shadow-soft-lg sm:px-12 lg:px-20">
            {/* Subtle gradient mesh */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-[-180px] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--primary)_12%,transparent)] blur-[120px]" />
              <div className="absolute right-[-80px] bottom-[-160px] h-[360px] w-[360px] rounded-full bg-[color-mix(in_oklch,var(--accent-blue)_14%,transparent)] blur-[120px]" />
              <div className="absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
            </div>

            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80 shadow-soft">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Start in seconds
                </span>
                <h2
                  id="cta-heading"
                  className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  Experience the Future of AI Today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  Join {`100,000+`} people using EchoGPT to chat with the best AI
                  models in one beautiful workspace — free to start, no credit
                  card required.
                </p>
              </motion.div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 rounded-xl px-5 text-sm"
                  onClick={() => setView("app")}
                >
                  <Sparkles className="h-4 w-4" />
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-5 text-sm"
                  onClick={() => setView("extension")}
                >
                  <Puzzle className="h-4 w-4" />
                  Install Extension
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
