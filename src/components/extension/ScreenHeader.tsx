"use client";

import { ArrowLeft, X } from "lucide-react";

import { useNavigation, type ExtensionTab } from "@/store/navigation";

interface ScreenHeaderProps {
  title: string;
  /** Optional small subtitle rendered below the title. */
  subtitle?: string;
  /** Where the back button should go. Defaults to the popup screen. */
  onBack?: () => void;
  /** Override default back target (defaults to "popup"). */
  backTo?: ExtensionTab;
  /** Optional custom right-side action (replaces the default close button). */
  rightSlot?: React.ReactNode;
}

/**
 * Compact header shared by the secondary extension screens (Models /
 * History / Settings). Carries a back button (returns to the chat popup by
 * default), the screen title and a close button (returns to landing).
 */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  backTo = "popup",
  rightSlot,
}: ScreenHeaderProps) {
  const { setExtensionTab, setView } = useNavigation();
  const handleBack = onBack ?? (() => setExtensionTab(backTo));

  return (
    <header className="flex items-center gap-2 border-b border-border bg-card/80 px-3 py-2.5 backdrop-blur-sm">
      <button
        type="button"
        aria-label={`Back to ${backTo}`}
        onClick={handleBack}
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-sm font-semibold text-foreground">
          {title}
        </span>
        {subtitle ? (
          <span className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </div>
      {rightSlot ?? (
        <button
          type="button"
          aria-label="Close extension"
          onClick={() => setView("landing")}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </header>
  );
}
