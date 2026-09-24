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

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {greeting}, Arafat!{" "}
            <span aria-hidden className="inline-block">
              👋
            </span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            How can I help you today?
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
            onSubmit={() => {
              if (value.trim()) setWebAppTab("chat");
            }}
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
          <QuickActions onAction={() => setWebAppTab("chat")} />
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
