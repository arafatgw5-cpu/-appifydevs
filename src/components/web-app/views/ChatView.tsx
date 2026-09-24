"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/web-app/ChatInput";
import { ChatMessage } from "@/components/web-app/ChatMessage";
import { TypingIndicator } from "@/components/web-app/TypingIndicator";

export function ChatView() {
  const { setWebAppTab } = useNavigation();
  const messages = useChatStore((s) => s.messages);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const activeModelId = useChatStore((s) => s.activeModelId);
  const sendMessage = useChatStore((s) => s.sendMessage);

  const [draft, setDraft] = React.useState("");

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, isStreaming]);

  const handleSubmit = (text: string) => {
    setDraft("");
    void sendMessage(text);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 overflow-y-auto"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
          {isEmpty ? (
            <EmptyChat onPick={(prompt) => {
              setDraft(prompt);
              setWebAppTab("home");
            }} />
          ) : (
            <>
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              <AnimatePresence>
                {isStreaming ? (
                  <TypingIndicator
                    key="typing"
                    modelId={activeModelId}
                    label="is typing..."
                  />
                ) : null}
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pb-2 text-center text-[11px] text-muted-foreground"
              >
                EchoGPT can make mistakes. Verify important information.
              </motion.div>
            </>
          )}
        </div>
      </div>
      <div className="shrink-0 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={handleSubmit}
            disabled={isStreaming}
            loading={isStreaming}
            placeholder="Reply to EchoGPT..."
          />
        </div>
      </div>
    </div>
  );
}

function EmptyChat({ onPick }: { onPick: (prompt: string) => void }) {
  const starters = [
    "Explain how to build a scalable React app in 2025",
    "Write a short product description for an AI note-taking app",
    "Give me 5 validated SaaS ideas for solo founders",
    "Summarize the key benefits of server-side rendering",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-10 max-w-xl text-center"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
        What would you like to explore?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Ask anything, or start with one of these prompts.
      </p>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {starters.map((s) => (
          <Button
            key={s}
            type="button"
            variant="outline"
            onClick={() => onPick(s)}
            className="h-auto justify-start whitespace-normal rounded-xl border-border bg-card px-4 py-3 text-left text-sm font-normal text-foreground/90 hover:bg-accent hover:text-foreground"
          >
            {s}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
