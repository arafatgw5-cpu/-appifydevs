"use client";

import { Star, Quote } from "lucide-react";

import { TESTIMONIALS } from "@/data/testimonials";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section
      className="relative py-20 sm:py-24 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-blue)]">
            Loved by users
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            What People Are Saying
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            A few words from people who made the switch.
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            Demo testimonials — fictional placeholders for the redesign
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
          gap={0.08}
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.id} className="h-full">
              <Card className="flex h-full flex-col gap-4 rounded-2xl border-border bg-card/70 p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < t.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30",
                        )}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-muted-foreground/30" />
                </div>

                <p className="flex-1 text-pretty text-sm leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white shadow-soft"
                    style={{ background: t.accent }}
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
