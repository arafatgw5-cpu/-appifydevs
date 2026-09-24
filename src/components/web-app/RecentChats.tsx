"use client";

import * as React from "react";
import { MessageSquare, Pin } from "lucide-react";

import { cn } from "@/lib/utils";
import { RECENT_CHATS } from "@/data/chats";
import { Card } from "@/components/ui/card";

interface RecentChatsProps {
  /** Limit the number of chats shown (default: all). */
  limit?: number;
  /** Click handler for a conversation. */
  onSelect?: (id: string) => void;
  className?: string;
  /** Show the section header. */
  showHeader?: boolean;
  /** Wrap in a Card container. */
  asCard?: boolean;
}

export function RecentChats({
  limit,
  onSelect,
  className,
  showHeader = true,
  asCard = true,
}: RecentChatsProps) {
  const chats = React.useMemo(() => {
    const sorted = [...RECENT_CHATS].sort((a, b) => {
      // Pinned first
      if (!!b.pinned !== !!a.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      return 0;
    });
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }, [limit]);

  const content = (
    <ul className="divide-y divide-border">
      {chats.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => onSelect?.(c.id)}
            className="group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                {c.pinned ? (
                  <Pin className="h-3 w-3 shrink-0 text-primary" aria-label="Pinned" />
                ) : null}
                <span className="truncate text-sm font-medium text-foreground">
                  {c.title}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {c.preview}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {c.updatedAt}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  if (!asCard) {
    return (
      <div className={className}>
        {showHeader ? (
          <h2 className="mb-2 text-sm font-semibold text-foreground">
            Recent chats
          </h2>
        ) : null}
        {content}
      </div>
    );
  }

  return (
    <Card className={cn("gap-0 overflow-hidden p-0", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Recent chats</h2>
          <span className="text-xs text-muted-foreground">{chats.length}</span>
        </div>
      ) : null}
      {content}
    </Card>
  );
}
