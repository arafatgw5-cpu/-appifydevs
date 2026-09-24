"use client";

import { Settings, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { Logo } from "@/components/shared/Logo";

interface ExtensionHeaderProps {
  className?: string;
  /** Small label rendered next to the logo (e.g. "Chat"). */
  label?: string;
  /** Render a settings gear icon (default true). */
  showSettings?: boolean;
  /** Render a close icon (default true). */
  showClose?: boolean;
}

/**
 * Header for the extension popup. Shows the EchoGPT logo + an optional label
 * on the left and a settings gear + close icon on the right. The logo returns
 * to the landing page, the gear opens the settings screen, and the close icon
 * closes the popup (returns to the landing view in this demo).
 */
export function ExtensionHeader({
  className,
  label = "Chat",
  showSettings = true,
  showClose = true,
}: ExtensionHeaderProps) {
  const { setView, setExtensionTab, extensionTab } = useNavigation();

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-2 border-b border-border bg-card/80 px-3 py-2.5 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <Logo
          size="sm"
          showWordmark={false}
          onClick={() => setView("landing")}
        />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            Echo<span className="text-primary">GPT</span>
          </span>
          {label ? (
            <span className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        {showSettings ? (
          <button
            type="button"
            aria-label="Open settings"
            aria-pressed={extensionTab === "settings"}
            onClick={() => setExtensionTab("settings")}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              extensionTab === "settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
          </button>
        ) : null}
        {showClose ? (
          <button
            type="button"
            aria-label="Close extension"
            onClick={() => setView("landing")}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </header>
  );
}
