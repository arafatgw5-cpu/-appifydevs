"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/data/models";
import { useChatStore } from "@/store/chat";
import { useNavigation } from "@/store/navigation";
import { ModelIcon } from "@/components/shared/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ModelsView() {
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);
  const { setWebAppTab } = useNavigation();

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Models
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the model that best fits the task. Switch any time — your
          active model is shared across the app.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_MODELS.map((m, i) => {
          const active = m.id === activeModelId;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card
                className={cn(
                  "flex h-full flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft-lg",
                  active && "border-primary/50 ring-1 ring-primary/30",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: m.accent + "22",
                      color: m.accent,
                    }}
                    aria-hidden
                  >
                    <ModelIcon iconKey={m.iconKey} size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-base font-semibold text-foreground">
                        {m.name}
                      </h2>
                      {m.badge ? (
                        <Badge variant="secondary" className="shrink-0">
                          {m.badge}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {m.provider}
                      {m.contextWindow ? ` · ${m.contextWindow} context` : ""}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{m.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {m.capabilities.map((cap) => (
                    <Badge
                      key={cap}
                      variant="outline"
                      className="bg-muted/40 text-xs font-normal text-muted-foreground"
                    >
                      {cap}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto pt-1">
                  {active ? (
                    <div className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-medium text-primary">
                      <Check className="h-4 w-4" />
                      Currently selected
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setActiveModelId(m.id);
                        setWebAppTab("chat");
                      }}
                    >
                      Select
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
