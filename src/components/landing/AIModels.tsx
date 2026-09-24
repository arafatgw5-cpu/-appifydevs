"use client";

import { AI_MODELS } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AIModels() {
  return (
    <section
      id="models"
      className="relative scroll-mt-24 border-y border-border bg-muted/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="models-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-blue)]">
            AI Models
          </span>
          <h2
            id="models-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            All the Best Models, Always Up to Date
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Switch providers mid-conversation. Each model brings its own
            strengths — pick the right one for the job without juggling tabs.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {AI_MODELS.map((model) => (
            <StaggerItem key={model.id} className="h-full">
              <Card
                className={cn(
                  "group h-full gap-4 rounded-2xl border-border bg-card/70 p-6 shadow-soft transition-all duration-300",
                  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft-lg",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft transition-transform duration-300 group-hover:scale-105"
                      style={{ background: model.accent }}
                    >
                      <ModelIcon iconKey={model.iconKey} size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold leading-tight text-foreground">
                        {model.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {model.provider}
                      </p>
                    </div>
                  </div>
                  {model.badge ? (
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-primary/10 text-primary"
                    >
                      {model.badge}
                    </Badge>
                  ) : null}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {model.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {model.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-foreground/70"
                    >
                      {cap}
                    </span>
                  ))}
                  {model.contextWindow ? (
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                      {model.contextWindow} ctx
                    </span>
                  ) : null}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
