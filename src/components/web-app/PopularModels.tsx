"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/data/models";
import { useChatStore } from "@/store/chat";
import { ModelIcon } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PopularModelsProps {
  /** Limit the number of models shown (default: 5). */
  limit?: number;
  /** Called when the user clicks "Use". */
  onUse?: (id: string) => void;
  className?: string;
  /** Show the section header. */
  showHeader?: boolean;
}

export function PopularModels({
  limit = 5,
  onUse,
  className,
  showHeader = true,
}: PopularModelsProps) {
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);

  const models = React.useMemo(() => AI_MODELS.slice(0, limit), [limit]);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-border/80", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-muted/20">
          <h2 className="text-sm font-medium text-foreground">Popular models</h2>
          <span className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">{models.length}</span>
        </div>
      ) : null}
      <ul className="divide-y divide-border/50">
        {models.map((m) => {
          const active = m.id === activeModelId;
          return (
            <li key={m.id} className="group flex items-center gap-3 px-3.5 py-3 transition-colors duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-accent/30">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-105"
                style={{ backgroundColor: m.accent + "22", color: m.accent }}
                aria-hidden
              >
                <ModelIcon iconKey={m.iconKey} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                    {m.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground/70">
                    · {m.provider}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground/80 mt-0.5">
                  {m.description}
                </p>
              </div>
              <Button
                size="sm"
                variant={active ? "secondary" : "outline"}
                disabled={active}
                onClick={() => {
                  setActiveModelId(m.id);
                  onUse?.(m.id);
                }}
                className={cn(
                  "h-7 shrink-0 px-3 text-xs rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                  active ? "bg-primary text-primary-foreground opacity-100" : "opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 focus-visible:opacity-100 focus-visible:scale-100"
                )}
              >
                {active ? "Active" : "Use"}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
