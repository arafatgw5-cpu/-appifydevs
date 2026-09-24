"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Plus, Search, Send } from "lucide-react";

import { SITE } from "@/lib/constants";
import { useNavigation } from "@/store/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModelIcon } from "@/components/shared/Logo";
import { AI_MODELS } from "@/data/models";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const trustAvatars = [
  { initials: "MH", accent: "#8b5cf6" },
  { initials: "DO", accent: "#3b82f6" },
  { initials: "SM", accent: "#ec4899" },
  { initials: "AK", accent: "#10b981" },
];

export function Hero() {
  const { setView } = useNavigation();

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[color-mix(in_oklch,var(--primary)_8%,transparent)] to-transparent" />
        <div className="absolute left-1/2 top-[-160px] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--primary)_10%,transparent)] blur-[120px]" />
        <div className="absolute right-[-100px] top-[80px] h-[360px] w-[360px] rounded-full bg-[color-mix(in_oklch,var(--accent-blue)_10%,transparent)] blur-[120px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
        {/* Left column: copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start"
        >
          <motion.div variants={item}>
            <Badge
              variant="secondary"
              className="mb-5 gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80 shadow-soft"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              New: Multi-model sidebar
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Chat with the Best{" "}
            <span className="text-gradient-primary">AI Models</span> in One Place
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            EchoGPT is a premium AI workspace that unifies GPT-4o, Claude 3.5,
            Gemini 1.5 and more — with a clean, fast interface, full history and
            a powerful Chrome extension.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="h-11 rounded-xl px-5 text-sm"
              onClick={() => setView("app")}
            >
              <Sparkles className="h-4 w-4" />
              Try EchoGPT Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-xl px-5 text-sm"
              onClick={() => setView("extension")}
            >
              Install Chrome Extension
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {trustAvatars.map((a) => (
                <span
                  key={a.initials}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-semibold text-white shadow-soft"
                  style={{ background: a.accent }}
                  aria-hidden
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              <span className="font-semibold text-foreground">
                Trusted by {SITE.trustCount} users
              </span>
              <br className="hidden sm:block" /> worldwide
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative"
        >
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  );
}

function ProductMockup() {
  const sidebarModels = AI_MODELS.slice(0, 5);

  return (
    <div className="relative rounded-2xl border border-border bg-card/80 p-2 shadow-soft-lg backdrop-blur-sm">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-soft">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex w-full max-w-sm items-center justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground shadow-soft">
              <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
              app.echogpt.ai/chat
            </div>
          </div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-[180px_1fr] sm:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border bg-muted/30 p-3 sm:block">
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-medium text-foreground/70 shadow-soft">
              <Plus className="h-3.5 w-3.5 text-primary" />
              New chat
            </div>
            <div className="mb-2 flex items-center gap-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Search className="h-3 w-3" /> Models
            </div>
            <ul className="flex flex-col gap-1">
              {sidebarModels.map((m, i) => (
                <li
                  key={m.id}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                    i === 0
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60"
                  }`}
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md text-white"
                    style={{ background: m.accent }}
                  >
                    <ModelIcon iconKey={m.iconKey} size={12} />
                  </span>
                  <span className="truncate">{m.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-3">
              <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground">
                <span className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-[var(--accent-blue)]" />
                alex@echogpt.ai
              </div>
            </div>
          </aside>

          {/* Main chat */}
          <div className="flex min-h-[360px] flex-col">
            {/* Top bar with model selector chip */}
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-soft">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-white"
                  style={{ background: AI_MODELS[0].accent }}
                >
                  <ModelIcon iconKey={AI_MODELS[0].iconKey} size={10} />
                </span>
                {AI_MODELS[0].name}
                <span className="text-muted-foreground">▾</span>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/10 text-primary"
              >
                Live
              </Badge>
            </div>

            {/* Chat body */}
            <div className="flex flex-1 flex-col gap-3 p-4">
              {/* User msg */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-soft">
                  Summarize the Q3 report in three bullets and suggest follow-up
                  questions.
                </div>
              </div>

              {/* Assistant msg */}
              <div className="flex justify-start gap-2">
                <span
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: AI_MODELS[0].accent }}
                >
                  <ModelIcon iconKey={AI_MODELS[0].iconKey} size={14} />
                </span>
                <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-muted/40 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                  <p className="font-medium">Q3 in three bullets:</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted-foreground">
                    <li>Revenue up 18% QoQ, driven by enterprise.</li>
                    <li>Gross margin improved to 74%.</li>
                    <li>Cash runway extended to 22 months.</li>
                  </ul>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-center gap-2 pl-9 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
                </span>
                generating follow-ups…
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-soft">
                <div className="flex-1 text-sm text-muted-foreground">
                  Ask anything, or pick a model…
                </div>
                <button
                  type="button"
                  aria-label="Send"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -right-3 top-20 hidden rounded-xl border border-border bg-background px-3 py-2 shadow-soft-lg sm:flex lg:-right-5"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="leading-tight">
            <div className="font-medium text-foreground">Quick actions</div>
            <div className="text-muted-foreground">Summarize · Write · Code</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
