"use client";

import * as React from "react";
import { MessageSquare, Pin } from "lucide-react";

import { cn } from "@/lib/utils";
import { RECENT_CHATS } from "@/data/chats";
import { getModelById } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";

interface ConversationHistoryProps {
  className?: string;
  /** Limit the number of conversations shown. */
  limit?: number;
  /** Fired when a conversation is clicked. */
  onSelect?: (id: string) => void;
  /** Show the section header above the list (default true). */
  showHeader?: boolean;
}

/**
 * Compact conversation list for the extension popup / history screen.
 * Each row shows a model icon, title, preview (optional) and a right-aligned
 * timestamp. Pinned conversations float to the top with a small pin icon.
 */
export function ConversationHistory({
  className,
  limit = 5,
  onSelect,
  showHeader = false,
}: ConversationHistoryProps) {
  const items = React.useMemo(() => {
    const pinned = RECENT_CHATS.filter((c) => c.pinned);
    const rest = RECENT_CHATS.filter((c) => !c.pinned);
    return [...pinned, ...rest].slice(0, limit);
  }, [limit]);

  return (
    <div className={cn("flex flex-col", className)}>
      {showHeader ? (
        <div className="px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Chat History
        </div>
      ) : null}
      <ul role="list" className="flex flex-col gap-0.5">
        {items.map((c) => {
          const model = getModelById(c.modelId);
          return (
            <li key={c.id} role="listitem">
              <button
                type="button"
                onClick={() => onSelect?.(c.id)}
                className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: model
                      ? model.accent + "22"
                      : "var(--accent)",
                    color: model ? model.accent : "var(--foreground)",
                  }}
                  aria-hidden
                >
                  {model ? (
                    <ModelIcon iconKey={model.iconKey} size={14} />
                  ) : (
                    <MessageSquare className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1">
                    {c.pinned ? (
                      <Pin className="h-3 w-3 shrink-0 text-primary" aria-hidden />
                    ) : null}
                    <span className="truncate text-sm font-medium text-foreground">
                      {c.title}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {c.preview}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                  {c.updatedAt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
