"use client";

import * as React from "react";
import { ArrowUp, Brain, Globe, Loader2, Paperclip } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModelSelector } from "@/components/web-app/ModelSelector";

interface ChatInputProps {
  /** Controlled value (optional). When omitted, the component manages its own state. */
  value?: string;
  onChange?: (value: string) => void;
  /** Fired when the user submits (Enter or Send button). */
  onSubmit?: (value: string) => void;
  /** Larger, roomier layout for the home view. */
  size?: "default" | "lg";
  placeholder?: string;
  className?: string;
  /** Autofocus on mount. */
  autoFocus?: boolean;
  /** Disable the composer (e.g. while the AI is responding). */
  disabled?: boolean;
  /** Show a loading spinner on the send button instead of the arrow. */
  loading?: boolean;
}

/**
 * Premium chat composer. Rounded-2xl card with soft shadow; the top half is
 * the textarea and the bottom row carries attach / web search / thinking
 * toggles on the left and a compact ModelSelector + Send button on the right.
 */
export function ChatInput({
  value,
  onChange,
  onSubmit,
  size = "default",
  placeholder = "Ask anything...",
  className,
  autoFocus,
  disabled = false,
  loading = false,
}: ChatInputProps) {
  const [internal, setInternal] = React.useState("");
  const [webSearch, setWebSearch] = React.useState(false);
  const [thinking, setThinking] = React.useState(false);

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
    if (disabled) return;
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

  const canSend = currentValue.trim().length > 0 && !disabled;
  const isLarge = size === "lg";

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-soft transition-shadow focus-within:shadow-soft-lg",
        className,
      )}
    >
      <textarea
        value={currentValue}
        onChange={(e) => handleSetValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        rows={isLarge ? 3 : 2}
        aria-label="Chat message"
        className={cn(
          "block w-full resize-none rounded-t-2xl border-0 bg-transparent px-4 pt-3.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
          isLarge ? "min-h-[88px] text-base" : "min-h-[64px]",
        )}
      />
      <div className="flex items-center justify-between gap-2 px-3 pb-2.5 pt-1.5">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Attach file"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Toggle web search"
                aria-pressed={webSearch}
                onClick={() => setWebSearch((v) => !v)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  webSearch
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>Web search</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Toggle extended thinking"
                aria-pressed={thinking}
                onClick={() => setThinking((v) => !v)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  thinking
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Think</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>Extended thinking</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <ModelSelector variant="compact" ariaLabel="Choose model for next message" />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSend || loading}
                aria-label="Send message"
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  canSend && !loading
                    ? "bg-primary shadow-soft hover:bg-primary/90"
                    : "cursor-not-allowed bg-muted text-muted-foreground",
                )}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>{loading ? "Thinking..." : "Send"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
