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
    className,
    "aria-hidden": true as const,
  };

  const cdnIcons: Partial<Record<ModelIconKey, string>> = {
    openai: "https://cdn.21st.dev/assets/mirror/b9/b93fa7942be639a1dae60194ff12141145d7d9fd59581582d6ff23335755f19c.svg",
    anthropic: "https://cdn.21st.dev/assets/mirror/5d/5de1221c77cc91e748066fd642ad0eee1c1fa65328814f5178166f901e599709.svg",
    gemini: "https://cdn.21st.dev/assets/mirror/cd/cda2df6631d5fa227de3fa04ed78cf354f910ba92a9f086e7455655c10ad9d09.svg",
    composer: "https://cdn.21st.dev/assets/mirror/7d/7dc00bc09f225fcda46cbc9c6b669c69c025a231877d6c17baa6a003f04f02b2.svg",
    glm: "https://cdn.21st.dev/assets/mirror/b2/b2a6c0ff63efd8a555edf8a174ea6fcfeca120ac1595a2d461ca11d3ae89276c.svg"
  };

  if (cdnIcons[iconKey]) {
    return (
      <img
        src={cdnIcons[iconKey]}
        alt={iconKey}
        width={size}
        height={size}
        className={cn("object-contain", iconKey === "openai" ? "dark:invert" : "", className)}
      />
    );
  }

  // Fallback generic SVG
  return (
    <svg viewBox="0 0 24 24" fill="none" {...common}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
