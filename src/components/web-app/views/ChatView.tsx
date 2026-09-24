"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { DEMO_CONVERSATION } from "@/data/chats";
import { useChatStore } from "@/store/chat";
import { ChatInput } from "@/components/web-app/ChatInput";
import { ChatMessage } from "@/components/web-app/ChatMessage";

export function ChatView() {
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);
  const [messages, setMessages] = React.useState(DEMO_CONVERSATION);
  const [draft, setDraft] = React.useState("");

  // Seed the active model from the last assistant message (so the model
  // selector reflects the conversation's actual model on first render).
  React.useEffect(() => {
    const lastAssistant = [...DEMO_CONVERSATION]
      .reverse()
      .find((m) => m.role === "assistant" && m.modelId);
    if (lastAssistant?.modelId) {
      setActiveModelId(lastAssistant.modelId);
    }
  }, [setActiveModelId]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSubmit = (text: string) => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${prev.length + 1}`,
        role: "user",
        content: text,
        createdAt: now,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 overflow-y-auto"
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6",
          )}
        >
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pb-2 text-center text-[11px] text-muted-foreground"
          >
            EchoGPT can make mistakes. Verify important information.
          </motion.div>
        </div>
      </div>
      <div className="shrink-0 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={handleSubmit}
            placeholder="Reply to EchoGPT..."
          />
        </div>
      </div>
    </div>
  );
}
