"use client";

import { create } from "zustand";
import { DEFAULT_MODEL_ID } from "@/data/models";
import type { ChatMessage } from "@/types/chat";
import { ChatStorage, ConversationMeta } from "./chatStorage";
import { toast } from "sonner";

interface ChatState {
  activeModelId: string;
  setActiveModelId: (id: string) => void;

  activeConversationId: string | null;
  conversations: ConversationMeta[];
  messages: ChatMessage[];
  
  isStreaming: boolean;
  error: string | null;

  // Initialize store (load conversations list)
  initStore: () => Promise<void>;
  
  // Load a specific conversation
  loadConversation: (id: string) => Promise<void>;
  
  // Start a new chat (lazily creates in DB on first message)
  newChat: () => void;
  
  // Delete a conversation
  deleteConversation: (id: string) => Promise<void>;
  
  // Update title
  renameConversation: (id: string, title: string) => Promise<void>;

  // Clear everything
  clearAllHistory: () => Promise<void>;

  sendMessage: (text: string) => Promise<void>;
  clearError: () => void;
}

function nowTime(): string {
  return new Date().toISOString();
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeModelId: DEFAULT_MODEL_ID,
  setActiveModelId: (id) => set({ activeModelId: id }),

  activeConversationId: null,
  conversations: [],
  messages: [],
  isStreaming: false,
  error: null,

  initStore: async () => {
    try {
      const conversations = await ChatStorage.getConversations();
      set({ conversations });
      if (conversations.length > 0) {
        // Load the most recent conversation automatically
        get().loadConversation(conversations[0].id);
      } else {
        get().newChat();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to initialize chat store", { description: "Could not load conversations from local storage." });
    }
  },

  loadConversation: async (id: string) => {
    set({ isStreaming: true }); // show loading state briefly
    try {
      const messages = await ChatStorage.getMessages(id);
      set({ activeConversationId: id, messages, isStreaming: false, error: null });
    } catch (e) {
      const errMsg = "Failed to load conversation.";
      set({ error: errMsg, isStreaming: false });
      toast.error(errMsg);
    }
  },

  newChat: () => {
    // We just reset the active state. The actual DB creation happens on the first message.
    set({
      activeConversationId: null,
      messages: [],
      error: null,
      isStreaming: false,
    });
  },

  deleteConversation: async (id: string) => {
    try {
      await ChatStorage.deleteConversation(id);
      const conversations = get().conversations.filter(c => c.id !== id);
      
      set({ conversations });
      
      if (get().activeConversationId === id) {
        if (conversations.length > 0) {
          get().loadConversation(conversations[0].id);
        } else {
          get().newChat();
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  renameConversation: async (id: string, title: string) => {
    try {
      const conv = get().conversations.find(c => c.id === id);
      if (conv) {
        const updated = { ...conv, title, updatedAt: new Date().toISOString() };
        await ChatStorage.updateConversationMeta(updated);
        set(s => ({
          conversations: s.conversations.map(c => c.id === id ? updated : c)
        }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  clearAllHistory: async () => {
    try {
      await ChatStorage.clearAll();
      set({ conversations: [] });
      get().newChat();
    } catch (e) {
      console.error(e);
    }
  },

  sendMessage: async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (get().isStreaming) return;

    let { activeConversationId, conversations, messages, activeModelId } = get();
    const isNew = !activeConversationId;

    // 1. If it's a new conversation, set it up
    if (isNew) {
      activeConversationId = uid("c");
      const newMeta: ConversationMeta = {
        id: activeConversationId,
        title: "New Chat", // will be updated below
        createdAt: nowTime(),
        updatedAt: nowTime()
      };
      try {
        await ChatStorage.createConversation(newMeta);
        conversations = [newMeta, ...conversations];
        set({ activeConversationId, conversations });
      } catch (e) {
        const errMsg = "Storage error. Could not create conversation.";
        set({ error: errMsg });
        toast.error(errMsg);
        return;
      }
    }

    // 2. Append User Message
    const userMsg: ChatMessage = {
      id: uid("u"),
      role: "user",
      content: trimmed,
      createdAt: nowTime(),
    };
    
    // Optimistic UI update
    set((s) => ({
      messages: [...s.messages, userMsg],
      isStreaming: true,
      error: null,
    }));

    // Async DB update
    const titleToUpdate = isNew ? trimmed : undefined;
    try {
      await ChatStorage.appendMessage(activeConversationId!, userMsg, titleToUpdate);
      if (titleToUpdate) {
        // Update title in store instantly
        set(s => ({
          conversations: s.conversations.map(c => 
            c.id === activeConversationId 
              ? { ...c, title: titleToUpdate.slice(0, 40) + (titleToUpdate.length > 40 ? '...' : '') } 
              : c
          )
        }));
      }
    } catch (e: any) {
      console.error(e);
      const errMsg = "Warning: Failed to save message to local history. Storage may be full.";
      set({ error: errMsg });
      toast.error(errMsg);
    }

    // 3. Fetch AI Response
    try {
      const payload = get().messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload, modelId: activeModelId }),
      });

      if (!res.ok) {
        let errorMsg = "Failed to get a response from the AI service.";
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch {}
        throw new Error(errorMsg);
      }

      const data = (await res.json()) as {
        content: string;
        modelId: string;
      };

      // 4. Append AI Message
      const assistantMsg: ChatMessage = {
        id: uid("a"),
        role: "assistant",
        content: data.content,
        modelId: data.modelId ?? activeModelId,
        createdAt: nowTime(),
      };

      set((s) => ({
        messages: [...s.messages, assistantMsg],
        isStreaming: false,
      }));

      // Async DB update
      try {
        await ChatStorage.appendMessage(activeConversationId!, assistantMsg);
        // Move to top of conversations list
        set(s => {
          const c = s.conversations.find(c => c.id === activeConversationId);
          if (!c) return s;
          const filtered = s.conversations.filter(c => c.id !== activeConversationId);
          return { conversations: [{ ...c, updatedAt: nowTime() }, ...filtered] };
        });
      } catch (e: any) {
        console.error(e);
        const errMsg = "Warning: Failed to save message to local history. Storage may be full.";
        set({ error: errMsg });
        toast.error(errMsg);
      }

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      const errorMsg: ChatMessage = {
        id: uid("e"),
        role: "assistant",
        content: `Sorry, I couldn't get a response just now. ${message}`,
        modelId: activeModelId,
        createdAt: nowTime(),
      };
      
      set((s) => ({
        messages: [...s.messages, errorMsg],
        isStreaming: false,
        error: message,
      }));
      toast.error("Failed to get response", { description: message });

      try {
        await ChatStorage.appendMessage(activeConversationId!, errorMsg);
      } catch(e) {}
    }
  },

  clearError: () => set({ error: null }),
}));
