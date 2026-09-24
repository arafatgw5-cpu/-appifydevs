"use client";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import type { ModelIconKey } from "@/types/model";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  sm: { box: "h-7 w-7", text: "text-base", glyph: "h-4 w-4" },
  md: { box: "h-9 w-9", text: "text-lg", glyph: "h-5 w-5" },
  lg: { box: "h-11 w-11", text: "text-2xl", glyph: "h-6 w-6" },
};

export function Logo({
  className,
  size = "md",
  showWordmark = true,
  onClick,
}: LogoProps) {
  const s = sizeMap[size];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg",
        className,
      )}
      aria-label={`${SITE.name} home`}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--accent-blue)] text-white shadow-soft transition-transform group-hover:scale-105",
          s.box,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(s.glyph)}
          aria-hidden="true"
        >
          <path
            d="M5 4v14a2 2 0 0 0 2 2h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 8.5h6.5M9 12h4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className={cn("font-semibold tracking-tight", s.text)}>
          Echo<span className="text-primary">GPT</span>
        </span>
      )}
    </button>
  );
}

interface ModelIconProps {
  iconKey: ModelIconKey;
  size?: number;
  className?: string;
}

/**
 * Brand-agnostic monogram icons for each model provider.
 * These are simplified abstract glyphs rather than real brand logos.
 */
export function ModelIcon({ iconKey, size = 24, className }: ModelIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };

  switch (iconKey) {
    case "openai":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 4v8l-7 4-7-4V7l7-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "anthropic":
      return (
        <svg {...common}>
          <path
            d="M7 5l5 14M17 5l-5 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M9.5 9h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "google":
      return (
        <svg {...common}>
          <path
            d="M12 4a8 8 0 1 0 6.5 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 12h7v-1a7 7 0 0 0-7-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "meta":
      return (
        <svg {...common}>
          <path
            d="M4 8c2-3 5-3 7 0 2 3 5 3 7 0M4 16c2-3 5-3 7 0 2 3 5 3 7 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "deepseek":
      return (
        <svg {...common}>
          <path
            d="M5 12h6l3-4 4 8-4 4H8l-3-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mistral":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="4" height="4" fill="currentColor" />
          <rect x="10" y="5" width="4" height="4" fill="currentColor" opacity="0.7" />
          <rect x="16" y="5" width="4" height="4" fill="currentColor" opacity="0.5" />
          <rect x="7" y="11" width="4" height="4" fill="currentColor" opacity="0.85" />
          <rect x="13" y="11" width="4" height="4" fill="currentColor" opacity="0.6" />
          <rect x="10" y="17" width="4" height="4" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case "groq":
      return (
        <svg {...common}>
          <path
            d="M13 4L4 14h6l-1 6 9-10h-6l1-6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}
