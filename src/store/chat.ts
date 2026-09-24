"use client";

import { create } from "zustand";
import { DEFAULT_MODEL_ID } from "@/data/models";

interface ChatState {
  activeModelId: string;
  setActiveModelId: (id: string) => void;
  /**
   * Incremented every time the user requests a new chat. Views that own a
   * composer (e.g. HomeView) can watch this value via useEffect to reset
   * their input when the user clicks "New Chat" from the sidebar.
   */
  newChatToken: number;
  newChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeModelId: DEFAULT_MODEL_ID,
  setActiveModelId: (id) => set({ activeModelId: id }),
  newChatToken: 0,
  newChat: () =>
    set((state) => ({ newChatToken: state.newChatToken + 1 })),
}));
