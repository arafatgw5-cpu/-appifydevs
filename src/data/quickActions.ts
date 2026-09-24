import {
  FileText,
  Mail,
  ImagePlus,
  Code2,
  Languages,
  LayoutGrid,
} from "lucide-react";
import type { QuickAction } from "@/types/common";

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "summarize", label: "Summarize Text", icon: FileText, accent: "#8b5cf6" },
  { id: "email", label: "Write an Email", icon: Mail, accent: "#3b82f6" },
  { id: "image", label: "Generate Image", icon: ImagePlus, accent: "#ec4899" },
  { id: "code", label: "Code Assistant", icon: Code2, accent: "#10b981" },
  { id: "translate", label: "Translate", icon: Languages, accent: "#f59e0b" },
  { id: "more", label: "More Tools", icon: LayoutGrid, accent: "#64748b" },
];
