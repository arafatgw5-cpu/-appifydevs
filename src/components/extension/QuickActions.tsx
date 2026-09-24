"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { QUICK_ACTIONS } from "@/data/quickActions";

interface QuickActionsProps {
  className?: string;
  /** Fired when a quick action chip is clicked. */
  onSelect?: (id: string) => void;
  /** Horizontal scroll layout (default) vs. wrapping grid. */
  layout?: "scroll" | "grid";
  /** Limit the number of visible actions (defaults to all). */
  limit?: number;
}

/**
 * Compact quick actions row for the extension popup. Uses the shared
 * QUICK_ACTIONS data. In scroll layout (default) chips overflow horizontally
 * with a faded edge; in grid layout they wrap into a 2-column grid.
 */
export function QuickActions({
  className,
  onSelect,
  layout = "scroll",
  limit,
}: QuickActionsProps) {
  const items = React.useMemo(
    () => (limit ? QUICK_ACTIONS.slice(0, limit) : QUICK_ACTIONS),
    [limit],
  );

  return (
    <div
      className={cn(
        layout === "scroll"
          ? "no-scrollbar -mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5"
          : "grid grid-cols-2 gap-1.5",
        className,
      )}
      role="list"
      aria-label="Quick actions"
    >
      {items.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            type="button"
            role="listitem"
            onClick={() => onSelect?.(action.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              layout === "scroll" ? "whitespace-nowrap" : "w-full",
            )}
          >
            <span
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{
                backgroundColor: action.accent + "22",
                color: action.accent,
              }}
              aria-hidden
            >
              <Icon className="h-3 w-3" />
            </span>
            <span className="truncate">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
