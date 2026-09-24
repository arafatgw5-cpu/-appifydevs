"use client";

import { FEATURES } from "@/data/features";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const iconTints: Record<string, string> = {
  "multiple-models": "bg-violet-500/10 text-violet-500",
  "smart-chat": "bg-blue-500/10 text-blue-500",
  "chat-history": "bg-emerald-500/10 text-emerald-500",
  "quick-actions": "bg-amber-500/10 text-amber-500",
  "cross-platform": "bg-rose-500/10 text-rose-500",
  customizable: "bg-indigo-500/10 text-indigo-500",
};

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-12 py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <Reveal className="mx-auto max-w-2xl text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest">Capabilities</span>
        </div>
        <h2
          id="features-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6"
        >
          Everything you need.<br />
          <span className="text-violet-600 dark:text-violet-500">Nothing you don't.</span>
        </h2>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          A focused set of powerful features designed to make your AI interactions faster, smarter, and more beautiful.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <StaggerItem key={feature.id} className="h-full">
              <div
                className="group relative h-full rounded-3xl p-px overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-600/10 hover:-translate-y-1 bg-stone-200 dark:bg-white/10"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-white dark:bg-[#15131F] rounded-[23px] p-8 flex flex-col items-start z-10">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                      iconTints[feature.id] ?? "bg-stone-100 text-stone-900 dark:bg-[#1C1A27] dark:text-white"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-stone-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
