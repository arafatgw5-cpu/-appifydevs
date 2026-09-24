"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { AI_MODELS } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScreenHeader } from "@/components/extension/ScreenHeader";

/**
 * Models screen for the extension. A search input at the top and a scrollable
 * list of AI_MODELS, each with an icon, name + provider, a couple of
 * capability badges and a check mark for the selected model.
 */
export function ModelsScreen() {
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);
  const { setExtensionTab } = useNavigation();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AI_MODELS;
    return AI_MODELS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.capabilities.some((c) => c.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Models" subtitle="Pick an AI model" />

      <div className="border-b border-border px-3 py-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models..."
            aria-label="Search models"
            className="h-8 w-full rounded-lg border border-border bg-card pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div
          role="radiogroup"
          aria-label="Available models"
          className="flex flex-col gap-1.5 p-3"
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No models found.
            </div>
          ) : (
            filtered.map((m) => {
              const active = m.id === activeModelId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setActiveModelId(m.id);
                    // Return to the chat popup so the user can use the new model.
                    setExtensionTab("popup");
                  }}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    active
                      ? "border-primary/40 bg-primary/[0.05] shadow-soft"
                      : "border-border bg-card hover:-translate-y-px hover:bg-accent/50",
                  )}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: m.accent + "22",
                      color: m.accent,
                    }}
                    aria-hidden
                  >
                    <ModelIcon iconKey={m.iconKey} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium text-foreground">
                        {m.name}
                      </span>
                      {m.badge ? (
                        <Badge
                          variant="secondary"
                          className="rounded-full bg-primary/10 px-1.5 py-0 text-[10px] font-medium text-primary"
                        >
                          {m.badge}
                        </Badge>
                      ) : null}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="truncate">{m.provider}</span>
                      {m.contextWindow ? (
                        <>
                          <span aria-hidden>·</span>
                          <span className="shrink-0 tabular-nums">
                            {m.contextWindow} ctx
                          </span>
                        </>
                      ) : null}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-1">
                      {m.capabilities.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-transparent group-hover:border-foreground/30",
                    )}
                    aria-hidden
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
