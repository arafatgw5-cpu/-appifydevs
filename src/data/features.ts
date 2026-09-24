import {
  Boxes,
  MessagesSquare,
  History,
  Zap,
  MonitorSmartphone,
  SlidersHorizontal,
} from "lucide-react";
import type { FeatureItem } from "@/types/common";

export const FEATURES: FeatureItem[] = [
  {
    id: "multiple-models",
    title: "Multiple AI Models",
    description:
      "Switch between GPT-4o, Claude 3.5, Gemini, Llama and more in a single click.",
    icon: Boxes,
  },
  {
    id: "smart-chat",
    title: "Smart Chat Interface",
    description:
      "A clean, fast workspace with attachments, web search and reasoning modes.",
    icon: MessagesSquare,
  },
  {
    id: "chat-history",
    title: "Chat History",
    description:
      "Everything is saved, searchable and organized so you never lose context.",
    icon: History,
  },
  {
    id: "quick-actions",
    title: "Quick Actions",
    description:
      "Summarize, write, translate or code with one-tap starting points.",
    icon: Zap,
  },
  {
    id: "cross-platform",
    title: "Cross-Platform",
    description:
      "Web app and Chrome extension keep your workflow synced everywhere.",
    icon: MonitorSmartphone,
  },
  {
    id: "customizable",
    title: "Customizable",
    description:
      "Personalize themes, shortcuts and default models to match your style.",
    icon: SlidersHorizontal,
  },
];
