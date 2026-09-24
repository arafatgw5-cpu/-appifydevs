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
    <Card className={cn("gap-0 overflow-hidden p-0", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Popular models</h2>
          <span className="text-xs text-muted-foreground">{models.length}</span>
        </div>
      ) : null}
      <ul className="divide-y divide-border">
        {models.map((m) => {
          const active = m.id === activeModelId;
          return (
            <li key={m.id} className="flex items-center gap-3 px-3.5 py-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: m.accent + "22", color: m.accent }}
                aria-hidden
              >
                <ModelIcon iconKey={m.iconKey} size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {m.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · {m.provider}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
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
                className="h-7 shrink-0 px-2.5 text-xs"
              >
                {active ? "Selected" : "Use"}
              </Button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
