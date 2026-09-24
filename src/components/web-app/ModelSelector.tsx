"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { AI_MODELS, getModelById } from "@/data/models";
import { useChatStore } from "@/store/chat";
import { ModelIcon } from "@/components/shared/Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ModelSelectorProps {
  /** Compact variant for the topbar / chat input footer. */
  variant?: "default" | "compact";
  className?: string;
  /** Optional callback after the active model changes. */
  onSelect?: (id: string) => void;
  /** Optional aria-label for the trigger button. */
  ariaLabel?: string;
}

/**
 * Reusable model picker. Renders a chip-style trigger (icon + name + chevron)
 * that opens a searchable popover of AI_MODELS. The active selection is
 * tracked in the shared `useChatStore`.
 */
export function ModelSelector({
  variant = "default",
  className,
  onSelect,
  ariaLabel,
}: ModelSelectorProps) {
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const activeModel = getModelById(activeModelId) ?? AI_MODELS[0];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AI_MODELS;
    return AI_MODELS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q),
    );
  }, [query]);

  const handleSelect = (id: string) => {
    setActiveModelId(id);
    onSelect?.(id);
    setOpen(false);
    setQuery("");
  };

  const isCompact = variant === "compact";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel ?? `Select model, current ${activeModel.name}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 backdrop-blur-md text-foreground shadow-sm transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-accent/50 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isCompact
              ? "h-8 px-2.5 text-[13px] font-medium"
              : "h-9 px-3 text-sm font-medium",
            className,
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110",
              isCompact ? "h-5 w-5" : "h-6 w-6",
            )}
            style={{ backgroundColor: activeModel.accent + "1A", color: activeModel.accent }}
            aria-hidden
          >
            <ModelIcon iconKey={activeModel.iconKey} size={isCompact ? 12 : 14} />
          </span>
          <span className="truncate">{activeModel.name}</span>
          <ChevronDown
            className={cn(
              "text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:translate-y-0.5 group-hover:text-foreground",
              isCompact ? "h-3.5 w-3.5" : "h-4 w-4",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className={cn(
          "w-72 rounded-2xl border-border/50 bg-background/80 p-0 shadow-lg backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200",
        )}
      >
        <div className="border-b border-border/50 p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models..."
              className="h-8 w-full rounded-lg border border-transparent bg-muted/40 pl-8 pr-3 text-[13px] text-foreground transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/40 focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              aria-label="Search models"
            />
          </div>
        </div>
        <div
          role="listbox"
          aria-label="Available models"
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No models found.
            </div>
          ) : (
            filtered.map((m) => {
              const active = m.id === activeModelId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(m.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all duration-200 ease-out",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-accent/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-300",
                      !active && "group-hover:scale-105"
                    )}
                    style={active ? { backgroundColor: "rgba(255,255,255,0.2)", color: "white" } : { backgroundColor: m.accent + "1A", color: m.accent }}
                    aria-hidden
                  >
                    <ModelIcon iconKey={m.iconKey} size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn(
                      "block truncate text-[13px] font-medium transition-colors",
                      active ? "text-primary-foreground" : "text-foreground group-hover:text-foreground"
                    )}>
                      {m.name}
                    </span>
                    <span className={cn(
                      "block truncate text-[11px] font-medium transition-colors",
                      active ? "text-primary-foreground/70" : "text-muted-foreground/70 group-hover:text-muted-foreground"
                    )}>
                      {m.provider}
                    </span>
                  </span>
                  {active ? (
                    <Check className="h-4 w-4 shrink-0 text-primary-foreground" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
