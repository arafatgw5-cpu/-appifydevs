"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Chrome, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { FEATURES } from "@/data/features";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { useToast } from "@/hooks/use-toast";
import { ExtensionNav } from "@/components/extension/ExtensionNav";
import { PopupScreen } from "@/components/extension/screens/PopupScreen";
import { HistoryScreen } from "@/components/extension/screens/HistoryScreen";
import { ModelsScreen } from "@/components/extension/screens/ModelsScreen";
import { SettingsScreen } from "@/components/extension/screens/SettingsScreen";

const SCREEN_LABELS: Record<string, { title: string; description: string }> = {
  popup: {
    title: "Chat popup",
    description:
      "Your everyday AI side-panel: pick a model, type a prompt and get instant answers without leaving the page you're on.",
  },
  models: {
    title: "Models",
    description:
      "Switch between GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1 and more — searchable and one tap away.",
  },
  history: {
    title: "History",
    description:
      "Recent chats, saved prompts and quick actions, organized and ready to pick back up where you left off.",
  },
  settings: {
    title: "Settings",
    description:
      "Appearance, language, notifications and keyboard shortcuts — all tuned for the compact popup.",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/**
 * Full Chrome extension showcase page. Renders a hero, then a sticky extension
 * frame on the left (with crossfade between screens driven by the navigation
 * store) and a screen selector + features grid on the right.
 */
export function ExtensionExperience() {
  const { extensionTab, setView } = useNavigation();
  const { toast } = useToast();

  const handleAddToChrome = () => {
    toast({
      title: "Demo only",
      description: "EchoGPT for Chrome isn't published yet — this is a concept.",
    });
  };

  const handleViewWebApp = () => {
    setView("app");
  };

  const activeScreen = SCREEN_LABELS[extensionTab] ?? SCREEN_LABELS.popup;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Background: dotted pattern + subtle purple glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[color-mix(in_oklch,var(--primary)_8%,transparent)] to-transparent" />
        <div className="absolute left-1/2 top-[-160px] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--primary)_10%,transparent)] blur-[120px]" />
        <div className="absolute right-[-100px] top-[80px] h-[360px] w-[360px] rounded-full bg-[color-mix(in_oklch,var(--accent-blue)_10%,transparent)] blur-[120px]" />
        <div className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={heroItem} className="flex justify-center">
            <Badge
              variant="secondary"
              className="mb-5 gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80 shadow-soft"
            >
              <Chrome className="h-3.5 w-3.5 text-primary" />
              Chrome Extension · Concept
            </Badge>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            EchoGPT for{" "}
            <span className="text-gradient-primary">Chrome</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Summon your favourite AI models from any tab. A compact, premium
            popup that lives in your browser — chat, switch models, search
            history and stay in flow.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="h-11 rounded-xl px-5 text-sm"
              onClick={handleAddToChrome}
            >
              <Chrome className="h-4 w-4" />
              Add to Chrome
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-xl px-5 text-sm"
              onClick={handleViewWebApp}
            >
              View Web App
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Two-column showcase */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-12">
          {/* LEFT: extension frame (sticky on desktop) */}
          <div className="lg:sticky lg:top-24">
            <Reveal y={20}>
              <ExtensionFrame />
            </Reveal>
          </div>

          {/* RIGHT: screen selector + features */}
          <div className="flex flex-col gap-10">
            {/* Active screen description */}
            <Reveal>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                    {activeScreen.title}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Screen preview
                  </span>
                </div>
                <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Every screen, one tap away
                </h2>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {activeScreen.description}
                </p>
              </div>
            </Reveal>

            {/* Screen selector strip */}
            <Reveal>
              <ExtensionNav variant="strip" />
            </Reveal>

            {/* Features grid */}
            <Reveal>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Built for the browser
                  </h3>
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <StaggerItem
                        key={feature.id}
                        className="h-full"
                      >
                        <div className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg">
                          <span
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                            aria-hidden
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <h4 className="text-sm font-semibold text-foreground">
                            {feature.title}
                          </h4>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </Reveal>

            {/* Back to site */}
            <Reveal>
              <div className="flex flex-col items-start gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Prefer the full experience?
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Open the EchoGPT web app for more space, more models and more power.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-lg"
                    onClick={() => setView("landing")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to site
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 rounded-lg"
                    onClick={handleViewWebApp}
                  >
                    Open Web App
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * The browser-extension frame. A rounded card with a small "titlebar" showing
 * the extension name + "powered by", then the active screen (driven by the
 * navigation store) crossfading via AnimatePresence.
 */
function ExtensionFrame() {
  const { extensionTab } = useNavigation();

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Soft halo behind the frame */}
      <div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_18%,transparent)] via-transparent to-[color-mix(in_oklch,var(--accent-blue)_18%,transparent)] blur-2xl"
        aria-hidden
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-lg">
        {/* Mini titlebar */}
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">
              EchoGPT Extension
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
            Powered by EchoGPT
          </span>
        </div>

        {/* Active screen */}
        <div className="relative h-[560px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={extensionTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {extensionTab === "popup" ? <PopupScreen /> : null}
              {extensionTab === "models" ? <ModelsScreen /> : null}
              {extensionTab === "history" ? <HistoryScreen /> : null}
              {extensionTab === "settings" ? <SettingsScreen /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating "demo" chip */}
      <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/90 px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-soft backdrop-blur">
        Interactive concept · click the screens to switch
      </div>
    </div>
  );
}

export default ExtensionExperience;
