"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { QUICK_ACTIONS } from "@/data/quickActions";

interface QuickActionsProps {
  /** Optional callback when a quick action is clicked. */
  onAction?: (id: string) => void;
  className?: string;
}

export function QuickActions({ onAction, className }: QuickActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5 sm:gap-3",
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
              "group flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3.5 py-2 text-sm font-medium transition-all hover:border-border hover:bg-accent/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <Icon 
              className="h-3.5 w-3.5 transition-colors" 
              style={{ color: action.accent }}
            />
            <span className="text-foreground/90 group-hover:text-foreground">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
