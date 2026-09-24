import type { Conversation, ChatMessage } from "@/types/chat";

export const RECENT_CHATS: Conversation[] = [
  {
    id: "c1",
    title: "Web Development Best Practices",
    preview: "What are the most important principles for scalable React apps?",
    modelId: "gpt-5-5",
    updatedAt: "2m ago",
    pinned: true,
    category: "Today",
    messageCount: 12,
  },
  {
    id: "c2",
    title: "Create a study plan",
    preview: "Build me a 4-week plan to learn TypeScript deeply.",
    modelId: "opus-4-8",
    updatedAt: "18m ago",
    category: "Today",
    messageCount: 8,
  },
  {
    id: "c3",
    title: "Summarize this article",
    preview: "Summarize the key points of this article in 5 bullets.",
    modelId: "gemini-3-5-flash",
    updatedAt: "1h ago",
    category: "Today",
    messageCount: 4,
  },
  {
    id: "c4",
    title: "Business Idea Suggestions",
    preview: "Suggest 10 validated SaaS ideas for solo founders in 2025.",
    modelId: "gpt-5-5",
    updatedAt: "Yesterday",
    category: "Yesterday",
    messageCount: 22,
  },
  {
    id: "c5",
    title: "Refactor a Python script",
    preview: "Help me refactor this data pipeline to be cleaner.",
    modelId: "composer-2-5",
    updatedAt: "Yesterday",
    category: "Yesterday",
    messageCount: 16,
  },
  {
    id: "c6",
    title: "Design a marketing landing page",
    preview: "Suggest a hero section copy and layout ideas.",
    modelId: "opus-4-8",
    updatedAt: "3 days ago",
    category: "Previous 7 Days",
    messageCount: 9,
  },
  {
    id: "c7",
    title: "Translate marketing copy",
    preview: "Translate these taglines into French and Spanish.",
    modelId: "glm-5-2",
    updatedAt: "5 days ago",
    category: "Previous 7 Days",
    messageCount: 6,
  },
  {
    id: "c8",
    title: "Long-form blog outline",
    preview: "Create an outline for a 2000-word article on AI ergonomics.",
    modelId: "gemini-3-5-flash",
    updatedAt: "2 weeks ago",
    category: "Older",
    messageCount: 14,
  },
];

export const DEMO_CONVERSATION: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content:
      "What are the most important principles for building a scalable React application in 2025?",
    createdAt: "10:24",
  },
  {
    id: "m2",
    role: "assistant",
    modelId: "gpt-5-5",
    createdAt: "10:24",
    content:
      "Here are five principles that consistently matter most for scalable React apps:\n\n1. **Component boundaries** — keep components small, single-purpose and composable. If a component does more than one thing, split it.\n\n2. **Server-first architecture** — push data loading and rendering to the server where possible. Use Suspense and streaming to keep UIs responsive.\n\n3. **State discipline** — keep local UI state in components, server state in a query cache, and global state minimal. Most apps don't need a global store.\n\n4. **Type safety** — strict TypeScript across the codebase. Treat types as documentation that the compiler enforces.\n\n5. **Performance budgets** — measure TTI and bundle size on every PR. A budget that isn't measured will quietly regress.",
  },
  {
    id: "m3",
    role: "user",
    content: "Can you give me a small code example for the state discipline point?",
    createdAt: "10:26",
  },
  {
    id: "m4",
    role: "assistant",
    modelId: "gpt-5-5",
    createdAt: "10:26",
    content:
      "Sure — here's a tiny pattern that keeps UI, server and global state clearly separated:\n\n```tsx\n// UI state lives in the component\nconst [isOpen, setIsOpen] = useState(false);\n\n// Server state lives in a query cache\nconst { data } = useQuery({\n  queryKey: ['user', userId],\n  queryFn: () => fetchUser(userId),\n});\n\n// Global state stays tiny and intentional\nconst theme = useThemeStore((s) => s.theme);\n```\n\nThis separation makes each piece easy to test, easy to reason about, and easy to replace.",
  },
];
