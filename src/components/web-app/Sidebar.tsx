"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Home,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/data/models";
import { useNavigation, type WebAppTab } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { Logo, ModelIcon } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  /** Mobile only: whether the drawer is open. */
  open: boolean;
  /** Mobile only: close handler. */
  onClose: () => void;
}

interface NavItem {
  id: WebAppTab;
  label: string;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "history", label: "History", icon: Clock },
  { id: "models", label: "Models", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { webAppTab, setWebAppTab, setView } = useNavigation();
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);
  const newChat = useChatStore((s) => s.newChat);

  const goToTab = (tab: WebAppTab) => {
    setWebAppTab(tab);
    onClose();
  };

  const handleNewChat = () => {
    newChat();
    setWebAppTab("home");
    onClose();
  };

  const handleLogoClick = () => {
    setView("landing");
    onClose();
  };

  const handleBackToSite = () => {
    setView("landing");
    onClose();
  };

  const handleModelPick = (id: string) => {
    setActiveModelId(id);
    setWebAppTab("chat");
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {open ? (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-sidebar text-sidebar-foreground shadow-soft-lg lg:hidden"
            role="navigation"
            aria-label="Primary navigation"
          >
            <SidebarContent
              webAppTab={webAppTab}
              goToTab={goToTab}
              handleNewChat={handleNewChat}
              handleLogoClick={handleLogoClick}
              handleBackToSite={handleBackToSite}
              handleModelPick={handleModelPick}
              activeModelId={activeModelId}
              onClose={onClose}
              mobile
            />
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <aside
        className="hidden w-[260px] shrink-0 border-r border-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col"
        role="navigation"
        aria-label="Primary navigation"
      >
        <SidebarContent
          webAppTab={webAppTab}
          goToTab={goToTab}
          handleNewChat={handleNewChat}
          handleLogoClick={handleLogoClick}
          handleBackToSite={handleBackToSite}
          handleModelPick={handleModelPick}
          activeModelId={activeModelId}
        />
      </aside>
    </>
  );
}

interface SidebarContentProps {
  webAppTab: WebAppTab;
  goToTab: (tab: WebAppTab) => void;
  handleNewChat: () => void;
  handleLogoClick: () => void;
  handleBackToSite: () => void;
  handleModelPick: (id: string) => void;
  activeModelId: string;
  onClose?: () => void;
  mobile?: boolean;
}

function SidebarContent({
  webAppTab,
  goToTab,
  handleNewChat,
  handleLogoClick,
  handleBackToSite,
  handleModelPick,
  activeModelId,
  onClose,
  mobile,
}: SidebarContentProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      {/* Header / logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Logo size="sm" onClick={handleLogoClick} />
        {mobile ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {/* New chat */}
      <div className="px-3 pb-3">
        <Button
          className="w-full justify-start gap-2"
          onClick={handleNewChat}
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Nav items */}
      <nav className="px-2" aria-label="Main">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = webAppTab === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goToTab(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Models quick list */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col px-2 pb-2">
        <div className="px-2.5 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Models
        </div>
        <ul className="flex flex-col gap-0.5 overflow-y-auto">
          {AI_MODELS.map((m) => {
            const active = m.id === activeModelId;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => handleModelPick(m.id)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                  )}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: m.accent + "22", color: m.accent }}
                    aria-hidden
                  >
                    <ModelIcon iconKey={m.iconKey} size={12} />
                  </span>
                  <span className="truncate">{m.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToSite}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </button>
          <ThemeToggle compact />
        </div>
      </div>
    </div>
  );
}
