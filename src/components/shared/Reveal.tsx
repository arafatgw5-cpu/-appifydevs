"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper. Animates children into view on first
 * intersection. Includes a fallback so content is never permanently hidden
 * even if IntersectionObserver does not fire (e.g. full-page screenshots,
 * some headless contexts). Respects reduced-motion via global CSS overrides.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const [fallback, setFallback] = React.useState(false);

  React.useEffect(() => {
    // Safety fallback: ensure content is visible after 1.6s even if the
    // IntersectionObserver has not fired (avoids permanently hidden content).
    const t = setTimeout(() => setFallback(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const visible = inView || fallback;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: StaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [fallback, setFallback] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const visible = inView || fallback;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 14,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
