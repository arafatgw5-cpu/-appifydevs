"use client";

import { FEATURES } from "@/data/features";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconTints: Record<string, string> = {
  "multiple-models": "bg-primary/10 text-primary",
  "smart-chat": "bg-[color-mix(in_oklch,var(--accent-blue)_12%,transparent)] text-[var(--accent-blue)]",
  "chat-history": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "quick-actions": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "cross-platform": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  customizable: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Features
          </span>
          <h2
            id="features-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Everything You Need in One Place
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            A focused set of capabilities that make every conversation faster,
            cleaner and more powerful — across web and browser.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.id} className="h-full">
                <Card
                  className={cn(
                    "group h-full gap-4 rounded-2xl border-border bg-card/70 p-6 shadow-soft transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-soft-lg",
                  )}
                >
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                      iconTints[feature.id] ?? "bg-primary/10 text-primary",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
