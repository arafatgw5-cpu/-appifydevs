"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { DEMO_CONVERSATION } from "@/data/chats";
import { getModelById } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtensionHeader } from "@/components/extension/ExtensionHeader";
import { ExtensionNav } from "@/components/extension/ExtensionNav";
import { ExtensionModelSelector } from "@/components/extension/ExtensionModelSelector";
import { PromptInput } from "@/components/extension/PromptInput";
import { QuickActions } from "@/components/extension/QuickActions";

const SAMPLE_MESSAGES = DEMO_CONVERSATION.slice(0, 2);

/**
 * The main extension popup screen. Carries the header + 3-tab nav at the top,
 * then the chat content: a compact model selector chip, a scrollable area
 * with a couple of demo messages, a quick-actions row and the prompt input.
 *
 * Note: the Models / History tabs in the nav drive `setExtensionTab`, which
 * causes the parent frame to switch to ModelsScreen / HistoryScreen. The chat
 * tab itself renders here.
 */
export function PopupScreen() {
  const { setExtensionTab } = useNavigation();
  const activeModelId = useChatStore((s) => s.activeModelId);
  const activeModel = getModelById(activeModelId);

  const [messages, setMessages] = React.useState(SAMPLE_MESSAGES);
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (value: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: value,
        createdAt: "now",
      },
    ]);
    // Demo only — keep the conversation compact by trimming older messages.
    setMessages((prev) => prev.slice(-4));
  };

  const handleQuickAction = (id: string) => {
    const starters: Record<string, string> = {
      summarize: "Summarize the following article in 5 bullets:\n\n",
      email: "Write a professional email about:\n\n",
      image: "Generate an image of:\n\n",
      code: "Help me refactor this code:\n\n```ts\n\n```",
      translate: "Translate the following text:\n\n",
      more: "",
    };
    setPrompt(starters[id] ?? "");
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
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3 p-3">
          {messages.map((m) => {
            if (m.role === "user") {
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground shadow-soft">
                    {m.content.length > 220
                      ? `${m.content.slice(0, 220)}…`
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
                  <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-muted/40 px-3 py-2 text-sm leading-relaxed text-foreground">
                    {m.content.length > 280
                      ? `${m.content.slice(0, 280)}…`
                      : m.content}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          <div className="flex items-center gap-2 pl-9 pt-0.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
            </span>
            <span>{activeModel?.name ?? "Assistant"} is ready</span>
          </div>
        </div>
      </ScrollArea>

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
          placeholder="Ask anything..."
          className={cn("shadow-soft")}
        />
      </div>
    </div>
  );
}
