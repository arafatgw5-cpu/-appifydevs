"use client";

import * as React from "react";
import { ArrowUp, Globe } from "lucide-react";

import { cn } from "@/lib/utils";

interface PromptInputProps {
  /** Controlled value (optional). When omitted, the component manages its own state. */
  value?: string;
  onChange?: (value: string) => void;
  /** Fired when the user submits (Enter or Send button). */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Autofocus on mount. */
  autoFocus?: boolean;
}

/**
 * Compact chat composer tuned for the extension popup. A bordered textarea on
 * top with a bottom row carrying the web search toggle on the left and the
 * send button on the right. Enter sends, Shift+Enter adds a newline.
 */
export function PromptInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  className,
  autoFocus,
}: PromptInputProps) {
  const [internal, setInternal] = React.useState("");
  const [webSearch, setWebSearch] = React.useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleSetValue = (next: string) => {
    if (isControlled) {
      onChange?.(next);
    } else {
      setInternal(next);
    }
  };

  const handleSubmit = () => {
    const trimmed = currentValue.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    if (!isControlled) setInternal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = currentValue.trim().length > 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-shadow focus-within:border-ring/50 focus-within:shadow-soft-lg",
        className,
      )}
    >
      <textarea
        value={currentValue}
        onChange={(e) => handleSetValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={2}
        aria-label="Chat message"
        className="block w-full resize-none rounded-t-xl border-0 bg-transparent px-3 pt-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
      />
      <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-1">
        <button
          type="button"
          aria-label="Toggle web search"
          aria-pressed={webSearch}
          onClick={() => setWebSearch((v) => !v)}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            webSearch
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Search</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            canSend
              ? "bg-primary shadow-soft hover:bg-primary/90"
              : "cursor-not-allowed bg-muted text-muted-foreground",
          )}
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
