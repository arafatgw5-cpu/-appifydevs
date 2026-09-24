"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MessageSquare,
  Boxes,
  History,
  Plus,
  Search,
  Send,
  Sparkles,
  Pin,
} from "lucide-react";

import { PRODUCT_PREVIEW_SCREENS } from "@/lib/constants";
import { AI_MODELS } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { Reveal } from "@/components/shared/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ScreenId = (typeof PRODUCT_PREVIEW_SCREENS)[number]["id"];

const ease = [0.22, 1, 0.36, 1] as const;

const thumbnailMeta: Record<
  ScreenId,
  { icon: React.ElementType; label: string }
> = {
  home: { icon: Home, label: "Home" },
  chat: { icon: MessageSquare, label: "Chat" },
  models: { icon: Boxes, label: "Models" },
  history: { icon: History, label: "History" },
};

export function ProductPreview() {
  const [active, setActive] = React.useState<ScreenId>("home");

  return (
    <section
      id="product"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
      aria-labelledby="product-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Product tour
          </span>
          <h2
            id="product-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            One Workspace, Every Workflow
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Explore the redesigned EchoGPT interface across its core views —
            home, chat, models and history.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.05}>
          {/* Browser frame */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/70 shadow-soft-lg">
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
                  app.echogpt.ai/{active === "home" ? "" : active}
                </div>
              </div>
            </div>

            {/* Stage */}
            <div className="relative min-h-[440px] bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease }}
                  className="absolute inset-0"
                >
                  {active === "home" && <HomeScreen />}
                  {active === "chat" && <ChatScreen />}
                  {active === "models" && <ModelsScreen />}
                  {active === "history" && <HistoryScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PRODUCT_PREVIEW_SCREENS.map((screen) => {
              const meta = thumbnailMeta[screen.id];
              const Icon = meta.icon;
              const isActive = active === screen.id;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setActive(screen.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary shadow-soft"
                      : "border-border bg-background text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {screen.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Screens (simplified HTML/CSS mockups) ---------- */

function MiniSidebar({ active: activeTab = "home" }: { active?: string }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "models", label: "Models", icon: Boxes },
    { id: "history", label: "History", icon: History },
  ];
  return (
    <aside className="hidden w-[180px] shrink-0 flex-col gap-1 border-r border-border bg-muted/30 p-3 sm:flex">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-medium text-foreground/70 shadow-soft">
        <Plus className="h-3.5 w-3.5 text-primary" />
        New chat
      </div>
      <nav className="flex flex-col gap-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === activeTab;
          return (
            <div
              key={t.id}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function HomeScreen() {
  const quickActions = [
    { label: "Summarize", accent: "#8b5cf6" },
    { label: "Write", accent: "#3b82f6" },
    { label: "Translate", accent: "#10b981" },
    { label: "Code", accent: "#ec4899" },
    { label: "Brainstorm", accent: "#f59e0b" },
    { label: "Analyze", accent: "#0ea5e9" },
  ];
  return (
    <div className="flex h-full min-h-[440px]">
      <MiniSidebar active="home" />
      <div className="flex-1 overflow-hidden p-6">
        <div className="mb-5">
          <div className="text-xs font-medium text-muted-foreground">
            Welcome back,
          </div>
          <div className="text-xl font-semibold text-foreground">
            How can I help today?
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickActions.map((qa) => (
            <div
              key={qa.label}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-sm font-medium text-foreground shadow-soft"
            >
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white"
                style={{ background: qa.accent }}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              {qa.label}
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent
          </div>
          <div className="flex flex-col gap-2">
            {[
              "Q3 summary & follow-ups",
              "Blog post draft — v3",
              "React component refactor",
            ].map((t, i) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground/80 shadow-soft"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <MessageSquare className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{t}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {i === 0 ? "Today" : i === 1 ? "Yesterday" : "2d ago"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex h-full min-h-[440px]">
      <MiniSidebar active="chat" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-soft">
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-white"
              style={{ background: AI_MODELS[1].accent }}
            >
              <ModelIcon iconKey={AI_MODELS[1].iconKey} size={10} />
            </span>
            {AI_MODELS[1].name}
            <span className="text-muted-foreground">▾</span>
          </div>
          <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary">
            Reasoning
          </Badge>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-soft">
              Draft a launch tweet for the EchoGPT redesign — keep it punchy.
            </div>
          </div>
          <div className="flex justify-start gap-2">
            <span
              className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: AI_MODELS[1].accent }}
            >
              <ModelIcon iconKey={AI_MODELS[1].iconKey} size={14} />
            </span>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-muted/40 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
              <p className="font-medium">Here&apos;s a punchy take:</p>
              <p className="mt-1 text-muted-foreground">
                &ldquo;All your AI models, one clean workspace. EchoGPT just got
                a redesign — faster, sharper, more you. 🚀&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-soft">
            <div className="flex-1 text-sm text-muted-foreground">
              Reply to EchoGPT…
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
  );
}

function ModelsScreen() {
  return (
    <div className="flex h-full min-h-[440px]">
      <MiniSidebar active="models" />
      <div className="flex-1 overflow-hidden p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Model library</div>
            <div className="text-xl font-semibold text-foreground">
              Choose your model
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground shadow-soft sm:flex">
            <Search className="h-3.5 w-3.5" />
            Search…
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_MODELS.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-border bg-card p-3 shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white"
                  style={{ background: m.accent }}
                >
                  <ModelIcon iconKey={m.iconKey} size={16} />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {m.name}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {m.provider}
                  </div>
                </div>
                {m.contextWindow ? (
                  <span className="ml-auto text-[10px] font-medium text-muted-foreground">
                    {m.contextWindow} ctx
                  </span>
                ) : null}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {m.capabilities.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] text-foreground/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryScreen() {
  const groups = [
    {
      label: "Today",
      items: [
        { t: "Q3 summary & follow-ups", p: "Claude 3.5", pinned: true },
        { t: "Blog post draft — v3", p: "GPT-4o" },
      ],
    },
    {
      label: "Yesterday",
      items: [
        { t: "React component refactor", p: "GPT-4o" },
        { t: "Translation pass — IT→EN", p: "Mistral" },
      ],
    },
    {
      label: "Last 7 days",
      items: [
        { t: "Onboarding email sequence", p: "Claude 3.5" },
        { t: "Deep-dive on RAG patterns", p: "Gemini 1.5" },
      ],
    },
  ];

  return (
    <div className="flex h-full min-h-[440px]">
      <MiniSidebar active="history" />
      <div className="flex-1 overflow-hidden p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">History</div>
            <div className="text-xl font-semibold text-foreground">
              All conversations
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground shadow-soft sm:flex">
            <Search className="h-3.5 w-3.5" />
            Search history…
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {g.items.map((it) => (
                  <div
                    key={it.t}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm shadow-soft"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </span>
                    <span className="truncate text-foreground/80">{it.t}</span>
                    {it.pinned ? (
                      <Pin className="h-3 w-3 text-primary" />
                    ) : null}
                    <span className="ml-auto rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {it.p}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
