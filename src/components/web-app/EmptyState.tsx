"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  iconAccent?: string;
}

/**
 * Centered empty state used inside the web app views (history, chat, etc.).
 * Renders a large icon in a soft circle, a title, optional description, and
 * an optional CTA. Compliant with dark mode via theme tokens.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  iconAccent,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center px-6 py-16 text-center",
        className,
      )}
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/60 text-muted-foreground shadow-soft"
        style={iconAccent ? { color: iconAccent } : undefined}
        aria-hidden
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
