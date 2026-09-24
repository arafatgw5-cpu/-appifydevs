"use client";

import { create } from "zustand";
import { DEFAULT_MODEL_ID } from "@/data/models";
import type { ChatMessage } from "@/types/chat";

interface ChatState {
  activeModelId: string;
  setActiveModelId: (id: string) => void;

  /** Live conversation messages shared across the web app + extension popup. */
  messages: ChatMessage[];
  /** True while waiting for the AI response. */
  isStreaming: boolean;
  /** Last error message, if any. */
  error: string | null;
  /** Incremented each time a new chat is requested. */
  newChatToken: number;

  /** Send a user message and fetch the AI reply. */
  sendMessage: (text: string) => Promise<void>;
  /** Clear the conversation (keep the active model). */
  clearConversation: () => void;
  /** Request a new chat — clears conversation and bumps the token. */
  newChat: () => void;
  /** Clear any error state. */
  clearError: () => void;
}

function nowTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeModelId: DEFAULT_MODEL_ID,
  setActiveModelId: (id) => set({ activeModelId: id }),

  messages: [],
  isStreaming: false,
  error: null,
  newChatToken: 0,

  sendMessage: async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Don't allow concurrent sends.
    if (get().isStreaming) return;

    const modelId = get().activeModelId;
    const userMsg: ChatMessage = {
      id: uid("u"),
      role: "user",
      content: trimmed,
      createdAt: nowTime(),
    };

    set((s) => ({
      messages: [...s.messages, userMsg],
      isStreaming: true,
      error: null,
    }));

    try {
      // Send only role + content to the backend.
      const payload = [...get().messages].map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload, modelId }),
      });

      if (!res.ok) {
        let errorMsg = "Failed to get a response from the AI service.";
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch {
          // ignore parse errors
        }
        throw new Error(errorMsg);
      }

      const data = (await res.json()) as {
        content: string;
        modelId: string;
        model?: string;
      };

      const assistantMsg: ChatMessage = {
        id: uid("a"),
        role: "assistant",
        content: data.content,
        modelId: data.modelId ?? modelId,
        createdAt: nowTime(),
      };

      set((s) => ({
        messages: [...s.messages, assistantMsg],
        isStreaming: false,
        error: null,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error.";
      // Append a short assistant error note so the user sees feedback inline.
      const errorMsg: ChatMessage = {
        id: uid("e"),
        role: "assistant",
        content: `Sorry, I couldn't get a response just now. ${message}`,
        modelId,
        createdAt: nowTime(),
      };
      set((s) => ({
        messages: [...s.messages, errorMsg],
        isStreaming: false,
        error: message,
      }));
    }
  },

  clearConversation: () => set({ messages: [], error: null }),
  newChat: () =>
    set((s) => ({
      messages: [],
      error: null,
      isStreaming: false,
      newChatToken: s.newChatToken + 1,
    })),
  clearError: () => set({ error: null }),
}));
