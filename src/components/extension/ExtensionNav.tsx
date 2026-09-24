"use client";

import * as React from "react";
import { MessageSquare, Sparkles, History, Settings, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation, type ExtensionTab } from "@/store/navigation";

interface NavItem {
  id: ExtensionTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const POPUP_ITEMS: NavItem[] = [
  { id: "popup", label: "Chat", icon: MessageSquare, description: "Active conversation" },
  { id: "models", label: "Models", icon: Sparkles, description: "Switch AI model" },
  { id: "history", label: "History", icon: History, description: "Recent chats" },
];

const STRIP_ITEMS: NavItem[] = [
  { id: "popup", label: "Chat", icon: MessageSquare, description: "Active conversation" },
  { id: "models", label: "Models", icon: Sparkles, description: "Switch AI model" },
  { id: "history", label: "History", icon: History, description: "Recent chats" },
  { id: "settings", label: "Settings", icon: Settings, description: "Appearance, shortcuts" },
];

interface ExtensionNavProps {
  variant?: "popup" | "strip";
  className?: string;
}

/**
 * Tab nav for the extension. Two visual modes:
 * - `popup` (default): pill-style segmented control with Chat / Models / History,
 *   rendered inside the extension popup below the header.
 * - `strip`: larger card-style screen selector used in the showcase page (also
 *   drives `setExtensionTab`). Adds Settings as a 4th option.
 */
export function ExtensionNav({ variant = "popup", className }: ExtensionNavProps) {
  const { extensionTab, setExtensionTab, setView } = useNavigation();
  const items = variant === "strip" ? STRIP_ITEMS : POPUP_ITEMS;
  const isStrip = variant === "strip";

  if (isStrip) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
          className,
        )}
        role="tablist"
        aria-label="Extension screens"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active = extensionTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setExtensionTab(item.id)}
              className={cn(
                "group flex items-start gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "border-primary/40 bg-primary/[0.06] shadow-soft"
                  : "border-border bg-card hover:-translate-y-0.5 hover:shadow-soft",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-accent text-foreground/70 group-hover:text-foreground",
                )}
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-foreground" : "text-foreground",
                  )}
                >
                  {item.label}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
        {/* 5th card — opens the full web app */}
        <button
          type="button"
          onClick={() => setView("app")}
          className="group col-span-2 flex items-start gap-3 rounded-xl border border-dashed border-border bg-background/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.04] hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[var(--accent-blue)] text-white shadow-soft"
            aria-hidden
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-sm font-medium text-foreground">
              Open full Web App
            </span>
            <span className="truncate text-xs text-muted-foreground">
              More space, more models, more power
            </span>
          </span>
        </button>
      </div>
    );
  }

  // Popup variant: segmented pill control
  return (
    <div
      role="tablist"
      aria-label="Extension tabs"
      className={cn(
        "flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = extensionTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setExtensionTab(item.id)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              active
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
