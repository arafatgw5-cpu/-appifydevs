"use client";

import * as React from "react";
import { MessageSquare, Pin, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/store/chat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const storeConversations = useChatStore(s => s.conversations);
  const deleteConversation = useChatStore(s => s.deleteConversation);
  
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  
  const chats = React.useMemo(() => {
    // Sort logic by updatedAt is already handled in store/db, but we can double check
    const sorted = [...storeConversations].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }, [storeConversations, limit]);

  const content = (
    <ul className="divide-y divide-border/50">
      {chats.map((c) => (
        <li key={c.id}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(c.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(c.id);
              }
            }}
            className="group flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-accent/30 focus-visible:outline-none focus-visible:bg-accent/30"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-105">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                  {c.title}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground/80">
                {new Date(c.updatedAt).toLocaleDateString()}
              </span>
            </span>
            <div className="flex shrink-0 items-center opacity-100 md:opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirmId(c.id);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Delete chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </li>
      ))}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteConfirmId) deleteConversation(deleteConfirmId); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ul>
  );

  if (!asCard) {
    return (
      <div className={className}>
        {showHeader ? (
          <h2 className="mb-2 text-sm font-medium text-foreground">
            Recent chats
          </h2>
        ) : null}
        {content}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-border/80", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-muted/20">
          <h2 className="text-sm font-medium text-foreground">Recent chats</h2>
          <span className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">{chats.length}</span>
        </div>
      ) : null}
      {content}
    </div>
  );
}
