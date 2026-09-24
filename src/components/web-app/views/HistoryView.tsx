"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MessageSquare,
  Pencil,
  Pin,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { RECENT_CHATS } from "@/data/chats";
import { getModelById } from "@/data/models";
import type { Conversation, ConversationCategory } from "@/types/chat";
import { useNavigation } from "@/store/navigation";
import { EmptyState } from "@/components/web-app/EmptyState";
import { ModelIcon } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface HistoryViewProps {
  /** Search string from the topbar. */
  search: string;
  /** Search change handler (binds to the topbar input + mobile search). */
  onSearchChange: (value: string) => void;
}

type Filter = "all" | "pinned" | "today" | "yesterday";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
];

const CATEGORY_ORDER: ConversationCategory[] = [
  "Today",
  "Yesterday",
  "Previous 7 Days",
  "Older",
];

export function HistoryView({ search, onSearchChange }: HistoryViewProps) {
  const { setWebAppTab } = useNavigation();
  const [filter, setFilter] = React.useState<Filter>("all");
  const [renamed, setRenamed] = React.useState<Record<string, string>>({});
  const [deleted, setDeleted] = React.useState<Record<string, boolean>>({});
  const [renamingId, setRenamingId] = React.useState<string | null>(null);
  const [renameDraft, setRenameDraft] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(
    () => RECENT_CHATS[0]?.id ?? null,
  );

  const conversations = React.useMemo(() => {
    return RECENT_CHATS.map((c) => ({
      ...c,
      title: renamed[c.id] ?? c.title,
      hidden: !!deleted[c.id],
    }));
  }, [renamed, deleted]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return conversations.filter((c) => {
      if (c.hidden) return false;
      if (filter === "pinned" && !c.pinned) return false;
      if (filter === "today" && c.category !== "Today") return false;
      if (filter === "yesterday" && c.category !== "Yesterday") return false;
      if (q && !(c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))) {
        return false;
      }
      return true;
    });
  }, [conversations, filter, search]);

  const grouped = React.useMemo(() => {
    const map = new Map<ConversationCategory, (typeof filtered)[number][]>();
    for (const c of filtered) {
      const cat = c.category ?? "Older";
      const arr = map.get(cat) ?? [];
      arr.push(c);
      map.set(cat, arr);
    }
    return map;
  }, [filtered]);

  const selected = React.useMemo<Conversation | null>(() => {
    return conversations.find((c) => c.id === selectedId && !c.hidden) ?? null;
  }, [conversations, selectedId]);

  const startRename = (c: Conversation) => {
    setRenamingId(c.id);
    setRenameDraft(c.title);
  };

  const commitRename = () => {
    if (renamingId && renameDraft.trim()) {
      setRenamed((prev) => ({ ...prev, [renamingId]: renameDraft.trim() }));
    }
    setRenamingId(null);
    setRenameDraft("");
  };

  const cancelRename = () => {
    setRenamingId(null);
    setRenameDraft("");
  };

  const handleDelete = (id: string) => {
    setDeleted((prev) => ({ ...prev, [id]: true }));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Mobile search */}
      <div className="border-b border-border p-3 sm:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            className="h-9 pl-8"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border px-4 py-2.5 sm:px-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-[1fr_360px]">
        {/* Conversation list */}
        <div className="min-h-0 overflow-y-auto">
          {filtered.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No conversations found"
              description="Try adjusting your filters or search query."
              className="py-16"
            />
          ) : (
            <div className="px-3 py-3 sm:px-5">
              {CATEGORY_ORDER.map((cat) => {
                const items = grouped.get(cat) ?? [];
                if (items.length === 0) return null;
                return (
                  <section key={cat} className="mb-5">
                    <h2 className="mb-1.5 px-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {cat}
                    </h2>
                    <ul className="flex flex-col gap-1">
                      {items.map((c) => {
                        const model = getModelById(c.modelId);
                        const isRenaming = renamingId === c.id;
                        const isSelected = selectedId === c.id;
                        return (
                          <li key={c.id}>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => setSelectedId(c.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSelectedId(c.id);
                                }
                              }}
                              className={cn(
                                "group flex w-full cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                                isSelected
                                  ? "border-primary/40 bg-primary/5"
                                  : "border-transparent hover:border-border hover:bg-accent/60",
                              )}
                            >
                              <span
                                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
                                aria-hidden
                              >
                                <MessageSquare className="h-4 w-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                {isRenaming ? (
                                  <div
                                    className="flex items-center gap-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Input
                                      value={renameDraft}
                                      onChange={(e) =>
                                        setRenameDraft(e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") commitRename();
                                        if (e.key === "Escape") cancelRename();
                                      }}
                                      autoFocus
                                      className="h-7 px-2 text-sm"
                                      aria-label="Rename conversation"
                                    />
                                    <button
                                      type="button"
                                      aria-label="Save name"
                                      onClick={commitRename}
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-primary hover:bg-accent"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      aria-label="Cancel rename"
                                      onClick={cancelRename}
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    {c.pinned ? (
                                      <Pin
                                        className="h-3 w-3 shrink-0 text-primary"
                                        aria-label="Pinned"
                                      />
                                    ) : null}
                                    <span className="truncate text-sm font-medium text-foreground">
                                      {c.title}
                                    </span>
                                  </div>
                                )}
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                  {c.preview}
                                </p>
                                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                                  {model ? (
                                    <span className="inline-flex items-center gap-1">
                                      <span
                                        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded"
                                        style={{
                                          backgroundColor: model.accent + "22",
                                          color: model.accent,
                                        }}
                                        aria-hidden
                                      >
                                        <ModelIcon iconKey={model.iconKey} size={9} />
                                      </span>
                                      {model.name}
                                    </span>
                                  ) : null}
                                  <span aria-hidden>·</span>
                                  <span>{c.messageCount} msgs</span>
                                  <span aria-hidden>·</span>
                                  <span>{c.updatedAt}</span>
                                </div>
                              </div>
                              {!isRenaming ? (
                                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                                  <button
                                    type="button"
                                    aria-label="Rename conversation"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startRename(c);
                                    }}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    aria-label="Delete conversation"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(c.id);
                                    }}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        {/* Preview pane (desktop only) */}
        <div className="hidden min-h-0 border-l border-border lg:block">
          {selected ? (
            <Card className="m-3 gap-0 overflow-hidden p-0">
              <div className="border-b border-border px-4 py-3">
                <h3 className="truncate text-sm font-semibold text-foreground">
                  {selected.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {selected.updatedAt} · {selected.messageCount} messages
                </p>
              </div>
              <ScrollArea className="h-[calc(100vh-260px)]">
                <div className="space-y-4 p-4">
                  <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-3.5 py-2.5 text-sm text-foreground">
                    {selected.preview}
                  </div>
                  <div className="flex gap-2.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          (getModelById(selected.modelId)?.accent ?? "#888") +
                          "22",
                        color: getModelById(selected.modelId)?.accent ?? "#888",
                      }}
                      aria-hidden
                    >
                      <ModelIcon
                        iconKey={getModelById(selected.modelId)?.iconKey ?? "openai"}
                        size={14}
                      />
                    </span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-3.5 py-2.5 text-sm text-foreground">
                      <p className="leading-relaxed">
                        Sure — I can help with that. Here&apos;s a quick summary
                        of the key points, followed by a few concrete next steps.
                      </p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        (Demo preview content for {getModelById(selected.modelId)?.name}.)
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setWebAppTab("chat")}
                      className="w-full"
                    >
                      Open in chat
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Pick a conversation from the list to preview it here."
              className="py-16"
            />
          )}
        </div>
      </div>

      {/* Slide-down deleted undo indicator (purely visual) */}
      <AnimatePresence>
        {Object.keys(deleted).length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs text-muted-foreground shadow-soft backdrop-blur"
          >
            {Object.keys(deleted).length} conversation
            {Object.keys(deleted).length > 1 ? "s" : ""} removed (demo only)
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
