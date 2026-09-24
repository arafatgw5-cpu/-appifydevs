"use client";

import { motion } from "framer-motion";
import { getModelById } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  /** The id of the model that is "typing". */
  modelId?: string;
  className?: string;
  label?: string;
}

/**
 * A compact typing indicator showing the active model's avatar and an
 * animated dot row. Used while waiting for the AI response.
 */
export function TypingIndicator({
  modelId,
  className,
  label,
}: TypingIndicatorProps) {
  const model = modelId ? getModelById(modelId) : undefined;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
          {label ? (
            <span className="text-[11px] text-muted-foreground">{label}</span>
          ) : null}
        </div>
        <div
          className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-3.5 py-2.5"
          role="status"
          aria-live="polite"
          aria-label={`${model?.name ?? "Assistant"} is typing`}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/70" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/70 [animation-delay:160ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/70 [animation-delay:320ms]" />
        </div>
      </div>
    </motion.div>
  );
}
