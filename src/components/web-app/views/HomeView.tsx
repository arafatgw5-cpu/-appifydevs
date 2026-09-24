"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { ChatInput } from "@/components/web-app/ChatInput";
import { QuickActions } from "@/components/web-app/QuickActions";
import { RecentChats } from "@/components/web-app/RecentChats";
import { PopularModels } from "@/components/web-app/PopularModels";

export function HomeView() {
  const { setWebAppTab } = useNavigation();
  const newChatToken = useChatStore((s) => s.newChatToken);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const [value, setValue] = React.useState("");

  // Reset the composer when the user requests a new chat from the sidebar.
  React.useEffect(() => {
    if (newChatToken > 0) setValue("");
  }, [newChatToken]);

  const greeting = React.useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    // Fire-and-forget: the store manages the streaming state and the
    // conversation appears live in the chat view.
    void sendMessage(text);
    setWebAppTab("chat");
  };

  const handleQuickAction = (id: string) => {
    const starters: Record<string, string> = {
      summarize: "Summarize the following article in 5 concise bullet points:\n\n",
      email: "Write a professional, friendly email about:\n\n",
      image: "Describe a vivid image I could generate of:\n\n",
      code: "Help me refactor and improve this code:\n\n```ts\n\n```",
      translate: "Translate the following text into French and Spanish:\n\n",
      more: "",
    };
    const prompt = starters[id] ?? "";
    setValue(prompt);
    if (prompt.trim()) {
      handleSubmit(prompt);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {greeting}, Arafat{" "}
            <span aria-hidden className="inline-block opacity-80">
              👋
            </span>
          </h1>
          <p className="mt-2.5 text-[15px] text-muted-foreground/80">
            What would you like to work on today?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <ChatInput
            value={value}
            onChange={setValue}
            onSubmit={handleSubmit}
            disabled={isStreaming}
            loading={isStreaming}
            size="lg"
            autoFocus
            placeholder="Ask anything..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <QuickActions onAction={handleQuickAction} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]"
        >
          <RecentChats limit={5} onSelect={() => setWebAppTab("history")} />
          <PopularModels limit={5} onUse={() => setWebAppTab("chat")} />
        </motion.div>
      </div>
    </div>
  );
}
