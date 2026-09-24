"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { getModelById } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtensionHeader } from "@/components/extension/ExtensionHeader";
import { ExtensionNav } from "@/components/extension/ExtensionNav";
import { ExtensionModelSelector } from "@/components/extension/ExtensionModelSelector";
import { PromptInput } from "@/components/extension/PromptInput";
import { QuickActions } from "@/components/extension/QuickActions";

/**
 * The main extension popup screen. Carries the header + 3-tab nav at the top,
 * then the chat content: a compact model selector chip, a scrollable area
 * with the live conversation (backed by the shared chat store + /api/chat),
 * a quick-actions row and the prompt input.
 */
export function PopupScreen() {
  const { setExtensionTab } = useNavigation();
  const activeModelId = useChatStore((s) => s.activeModelId);
  const messages = useChatStore((s) => s.messages);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const activeModel = getModelById(activeModelId);

  const [prompt, setPrompt] = React.useState("");

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, isStreaming]);

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    setPrompt("");
    void sendMessage(value);
  };

  const handleQuickAction = (id: string) => {
    const starters: Record<string, string> = {
      summarize: "Summarize the following article in 5 bullets:\n\n",
      email: "Write a professional email about:\n\n",
      image: "Describe a vivid image of:\n\n",
      code: "Help me refactor this code:\n\n```ts\n\n```",
      translate: "Translate the following text:\n\n",
      more: "",
    };
    const next = starters[id] ?? "";
    setPrompt(next);
    setExtensionTab("popup");
  };

  return (
    <div className="flex h-full flex-col">
      <ExtensionHeader label="Chat" />

      <div className="border-b border-border px-3 py-2">
        <ExtensionNav variant="popup" />
      </div>

      {/* Model selector chip row */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <ExtensionModelSelector ariaLabel="Choose model for this chat" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Powered by EchoGPT
        </span>
      </div>

      <div className="mx-3 h-px bg-border" aria-hidden />

      {/* Chat scroll area */}
      <div ref={scrollRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 p-3">
          {messages.length === 0 && !isStreaming ? (
            <div className="px-2 py-6 text-center text-xs text-muted-foreground">
              Ask anything — EchoGPT will reply here.
            </div>
          ) : null}

          {messages.map((m) => {
            if (m.role === "user") {
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground shadow-soft">
                    {m.content.length > 400
                      ? `${m.content.slice(0, 400)}…`
                      : m.content}
                  </div>
                </div>
              );
            }
            const model = getModelById(m.modelId ?? activeModelId);
            return (
              <div key={m.id} className="flex items-start gap-2">
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: model ? model.accent + "22" : "var(--accent)",
                    color: model ? model.accent : "var(--foreground)",
                  }}
                  aria-hidden
                >
                  {model ? (
                    <ModelIcon iconKey={model.iconKey} size={14} />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">
                      {model?.name ?? "Assistant"}
                    </span>
                    {model ? (
                      <span className="text-[10px] text-muted-foreground">
                        · {model.provider}
                      </span>
                    ) : null}
                    <span className="ml-auto text-[10px] tabular-nums text-muted-foreground">
                      {m.createdAt}
                    </span>
                  </div>
                  <div className="max-w-[92%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-border bg-muted/40 px-3 py-2 text-sm leading-relaxed text-foreground">
                    {m.content.length > 600
                      ? `${m.content.slice(0, 600)}…`
                      : m.content}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isStreaming ? (
            <div className="flex items-center gap-2 pl-9 pt-0.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
              </span>
              <span>{activeModel?.name ?? "Assistant"} is typing…</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom composer area */}
      <div className="flex flex-col gap-2 border-t border-border p-3">
        <QuickActions
          layout="scroll"
          limit={5}
          onSelect={handleQuickAction}
        />
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          disabled={isStreaming}
          loading={isStreaming}
          placeholder="Ask anything..."
          className={cn("shadow-soft")}
        />
      </div>
    </div>
  );
}
