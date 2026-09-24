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

interface ExtensionModelSelectorProps {
  className?: string;
  /** Optional callback after the active model changes. */
  onSelect?: (id: string) => void;
  /** Optional aria-label for the trigger button. */
  ariaLabel?: string;
}

/**
 * Compact model picker tuned for the ~360px Chrome extension popup. Renders
 * a small chip-style trigger (icon + name + chevron) that opens a searchable
 * popover of AI_MODELS. The active selection is tracked in `useChatStore`.
 */
export function ExtensionModelSelector({
  className,
  onSelect,
  ariaLabel,
}: ExtensionModelSelectorProps) {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel ?? `Select model, current ${activeModel.name}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "group inline-flex h-7 max-w-full items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            className,
          )}
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: activeModel.accent + "22",
              color: activeModel.accent,
            }}
            aria-hidden
          >
            <ModelIcon iconKey={activeModel.iconKey} size={11} />
          </span>
          <span className="truncate">{activeModel.name}</span>
          <ChevronDown
            className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5"
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-72 rounded-xl border-border p-0 shadow-soft-lg"
      >
        <div className="border-b border-border p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models..."
              aria-label="Search models"
              className="h-8 w-full rounded-md border border-transparent bg-transparent pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
        </div>
        <div
          role="listbox"
          aria-label="Available models"
          className="max-h-72 overflow-y-auto p-1"
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
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/60",
                  )}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: m.accent + "22",
                      color: m.accent,
                    }}
                    aria-hidden
                  >
                    <ModelIcon iconKey={m.iconKey} size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {m.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {m.provider}
                    </span>
                  </span>
                  {active ? (
                    <Check className="h-4 w-4 shrink-0 text-primary" />
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
