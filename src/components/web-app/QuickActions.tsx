"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { QUICK_ACTIONS } from "@/data/quickActions";

interface QuickActionsProps {
  /** Optional callback when a quick action is clicked. */
  onAction?: (id: string) => void;
  className?: string;
}

/**
 * Responsive grid (2 cols on mobile, 3 on desktop) of quick action buttons.
 * Each button shows the action's accent-colored icon and a label.
 */
export function QuickActions({ onAction, className }: QuickActionsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3",
        className,
      )}
    >
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction?.(action.id)}
            className={cn(
              "group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: action.accent + "22", color: action.accent }}
              aria-hidden
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {action.label}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                Get started
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
