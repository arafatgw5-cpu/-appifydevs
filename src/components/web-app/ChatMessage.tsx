"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Copy, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { getModelById } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatMessageProps {
  message: ChatMessageType;
  /** Optional class on the outer wrapper. */
  className?: string;
}

/**
 * Lightweight inline markdown-ish renderer. Supports:
 *  - fenced ``` code blocks
 *  - inline `code`
 *  - **bold** inline
 *  - newlines as line breaks
 *
 * Anything beyond that falls back to plain text — kept dependency-free on
 * purpose to avoid pulling a heavy markdown library into the web app shell.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on `code` and **bold** while preserving the delimiters.
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    }
    lastIndex = match.index + token.length;
    i += 1;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function renderContent(content: string): React.ReactNode {
  const segments = content.split(/```/);
  return segments.map((seg, idx) => {
    // Even idx -> normal text; odd idx -> code block
    if (idx % 2 === 1) {
      // Trim leading newline only (keep internal formatting)
      const code = seg.replace(/^\n/, "");
      return (
        <pre
          key={`code-${idx}`}
          className="my-3 overflow-x-auto rounded-xl border border-border bg-muted/70 p-3.5 font-mono text-[0.82rem] leading-relaxed text-foreground"
        >
          <code>{code}</code>
        </pre>
      );
    }
    // Normal text: render line by line, inline-aware
    const lines = seg.split("\n");
    return (
      <React.Fragment key={`text-${idx}`}>
        {lines.map((line, lIdx) => {
          if (line.trim() === "") {
            return <div key={`empty-${idx}-${lIdx}`} className="h-2.5" aria-hidden />;
          }
          return (
            <p
              key={`line-${idx}-${lIdx}`}
              className="leading-relaxed text-foreground/95"
            >
              {renderInline(line, `l-${idx}-${lIdx}`)}
            </p>
          );
        })}
      </React.Fragment>
    );
  });
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === "user";
  const model = message.modelId ? getModelById(message.modelId) : undefined;
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(message.content);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard might be unavailable; ignore silently.
    }
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn("flex justify-end", className)}
      >
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-2.5 text-sm text-foreground shadow-soft sm:max-w-[75%]">
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="mt-1.5 text-right text-[11px] text-muted-foreground">
            {message.createdAt}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex w-full gap-3", className)}
    >
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border"
        style={
          model
            ? { backgroundColor: model.accent + "22", color: model.accent }
            : undefined
        }
        aria-hidden
      >
        {model ? (
          <ModelIcon iconKey={model.iconKey} size={16} />
        ) : (
          <span className="text-xs font-semibold text-muted-foreground">AI</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {model?.name ?? "Assistant"}
          </span>
          {model ? (
            <span className="text-[11px] text-muted-foreground">
              {model.provider}
            </span>
          ) : null}
          <span className="ml-auto text-[11px] text-muted-foreground">
            {message.createdAt}
          </span>
        </div>
        <div className="text-sm">{renderContent(message.content)}</div>

        {/* Action row */}
        <div className="mt-2.5 flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy message"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Regenerate response"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Regenerate</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Good response"
                aria-pressed={feedback === "up"}
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  feedback === "up"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Good response</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Bad response"
                aria-pressed={feedback === "down"}
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  feedback === "down"
                    ? "bg-destructive/10 text-destructive"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Bad response</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
}
