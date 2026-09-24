"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation, type WebAppTab } from "@/store/navigation";
import { ModelSelector } from "@/components/web-app/ModelSelector";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  /** Mobile menu open handler. */
  onOpenSidebar: () => void;
  /** Optional search value (only used on history view). */
  search?: string;
  /** Optional search change handler. */
  onSearchChange?: (value: string) => void;
  className?: string;
}

const TAB_TITLES: Record<WebAppTab, string> = {
  home: "Home",
  chat: "Chat",
  history: "History",
  models: "Models",
  settings: "Settings",
};

export function Topbar({
  onOpenSidebar,
  search,
  onSearchChange,
  className,
}: TopbarProps) {
  const { webAppTab } = useNavigation();
  const showSearch = webAppTab === "history";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-xl sm:px-4",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={onOpenSidebar}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/60 text-foreground transition-colors hover:bg-accent lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <h1 className="truncate text-base font-semibold text-foreground">
        {TAB_TITLES[webAppTab]}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        {showSearch && onSearchChange ? (
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search conversations"
              aria-label="Search conversations"
              className="h-8 w-56 pl-8 text-sm md:w-64"
            />
          </div>
        ) : null}
        <ModelSelector variant="compact" ariaLabel="Active model" />
      </div>
    </header>
  );
}
