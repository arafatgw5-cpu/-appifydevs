"use client";

import {
  Clock,
  Zap,
  Trophy,
  ShieldCheck,
  Sparkles,
  Infinity as InfinityIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const benefits = [
  {
    id: "save-time",
    title: "Save Time",
    description:
      "Stop switching tabs. Every model and conversation lives in a single, fast workspace.",
    icon: Clock,
    accent: "from-primary/15 to-primary/5 text-primary",
    number: "01",
  },
  {
    id: "productivity",
    title: "Boost Productivity",
    description:
      "Quick actions, keyboard-first shortcuts and a tidy history keep you in flow.",
    icon: Zap,
    accent:
      "from-[color-mix(in_oklch,var(--accent-blue)_15%,transparent)] to-transparent text-[var(--accent-blue)]",
    number: "02",
  },
  {
    id: "results",
    title: "Better Results",
    description:
      "Pick the best model for the task — reasoning, writing, vision or long context.",
    icon: Trophy,
    accent: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
    number: "03",
  },
  {
    id: "private",
    title: "Fully Private",
    description:
      "Your history is yours. Local-first storage, with no training on your prompts.",
    icon: ShieldCheck,
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    number: "04",
  },
  {
    id: "ui",
    title: "Simple & Clean UI",
    description:
      "A premium, distraction-free interface that gets out of your way.",
    icon: Sparkles,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-400",
    number: "05",
  },
  {
    id: "limitless",
    title: "Limitless Possibilities",
    description:
      "Compose workflows across models, attachments and the Chrome extension.",
    icon: InfinityIcon,
    accent: "from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-400",
    number: "06",
  },
];

export function WhyChoose() {
  return (
    <section
      className="relative py-12"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Why EchoGPT
          </span>
          <h2
            id="why-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Built to Make You Faster, Every Day
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Six reasons teams and individuals switch to EchoGPT and never look
            back.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.id} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-105",
                        b.accent,
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-semibold tracking-tight text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/50">
                      {b.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
