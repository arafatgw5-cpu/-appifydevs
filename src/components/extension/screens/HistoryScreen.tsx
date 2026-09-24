"use client";

import * as React from "react";
import { Bookmark, ChevronRight, FileText, Plus, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScreenHeader } from "@/components/extension/ScreenHeader";
import { ConversationHistory } from "@/components/extension/ConversationHistory";
import { QuickActions } from "@/components/extension/QuickActions";

const SAVED_PROMPTS = [
  { id: "p1", label: "Summarize article", icon: FileText },
  { id: "p2", label: "Reply professionally", icon: Bookmark },
  { id: "p3", label: "Explain code", icon: FileText },
];

/**
 * History screen for the extension. Carries a prominent "New Chat" button at
 * the top, a recent conversations list, a row of saved prompt chips, a compact
 * quick-actions row and a small link to the settings screen at the bottom.
 */
export function HistoryScreen() {
  const { setExtensionTab } = useNavigation();
  const newChat = useChatStore((s) => s.newChat);

  const handleNewChat = () => {
    newChat();
    setExtensionTab("popup");
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="History" subtitle="Recent conversations" />

      <div className="border-b border-border p-3">
        <Button
          type="button"
          size="sm"
          onClick={handleNewChat}
          className="h-9 w-full rounded-lg"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-3">
          {/* Recent conversations */}
          <section className="flex flex-col gap-1.5">
            <h3 className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Chat History
            </h3>
            <div className="rounded-xl border border-border bg-card p-1.5 shadow-soft">
              <ConversationHistory limit={5} onSelect={() => setExtensionTab("popup")} />
            </div>
          </section>

          {/* Saved prompts */}
          <section className="flex flex-col gap-1.5">
            <h3 className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Saved Prompts
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {SAVED_PROMPTS.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setExtensionTab("popup")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    <span className="truncate">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Quick actions */}
          <section className="flex flex-col gap-1.5">
            <h3 className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Actions
            </h3>
            <QuickActions layout="scroll" onSelect={() => setExtensionTab("popup")} />
          </section>

          {/* Settings link */}
          <button
            type="button"
            onClick={() => setExtensionTab("settings")}
            className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          >
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" aria-hidden />
              Settings
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
          </button>
        </div>
      </ScrollArea>
    </div>
  );
}
