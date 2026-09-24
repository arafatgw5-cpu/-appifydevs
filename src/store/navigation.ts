"use client";

import { create } from "zustand";

export type AppView = "landing" | "app" | "extension";

export type WebAppTab =
  | "home"
  | "chat"
  | "history"
  | "models"
  | "settings";

export type ExtensionTab =
  | "popup"
  | "history"
  | "models"
  | "settings";

interface NavigationState {
  view: AppView;
  webAppTab: WebAppTab;
  extensionTab: ExtensionTab;
  // Landing scroll target (for in-page anchors)
  landingSection: string | null;

  setView: (view: AppView) => void;
  setWebAppTab: (tab: WebAppTab) => void;
  setExtensionTab: (tab: ExtensionTab) => void;
  goToLandingSection: (section: string) => void;
}

export const useNavigation = create<NavigationState>((set, get) => ({
  view: "landing",
  webAppTab: "home",
  extensionTab: "popup",
  landingSection: null,

  setView: (view) => {
    set({ view });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },

  setWebAppTab: (webAppTab) => {
    set({ view: "app", webAppTab });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },

  setExtensionTab: (extensionTab) => {
    set({ view: "extension", extensionTab });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },

  goToLandingSection: (section) => {
    set({ view: "landing", landingSection: section });
    if (typeof window !== "undefined") {
      // Slight delay to ensure the landing page is mounted
      requestAnimationFrame(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  },
}));
