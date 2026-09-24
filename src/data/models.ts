import type { AIModel } from "@/types/model";

/**
 * Centralized AI model registry. Used across the landing page,
 * the web app and the Chrome extension concepts.
 *
 * All descriptions are demo/placeholder copy for the redesign.
 */
export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description:
      "Flagship multimodal model with strong reasoning, vision and fast responses.",
    capabilities: ["Reasoning", "Vision", "Multimodal", "Fast"],
    iconKey: "openai",
    accent: "#10a37f",
    badge: "Most popular",
    contextWindow: "128K",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5",
    provider: "Anthropic",
    description:
      "Excellent at long-form writing, analysis and nuanced conversational tasks.",
    capabilities: ["Writing", "Reasoning", "Coding", "Long-context"],
    iconKey: "anthropic",
    accent: "#d97757",
    badge: "Great for writing",
    contextWindow: "200K",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5",
    provider: "Google",
    description:
      "Massive context window for documents, codebases and multimodal inputs.",
    capabilities: ["Long-context", "Vision", "Multimodal", "Fast"],
    iconKey: "google",
    accent: "#4285f4",
    contextWindow: "1M",
  },
  {
    id: "llama-3-1-70b",
    name: "Llama 3.1",
    provider: "Meta",
    description:
      "Open-weights model with strong general performance and great value.",
    capabilities: ["Reasoning", "Coding", "Fast"],
    iconKey: "meta",
    accent: "#0866ff",
    contextWindow: "128K",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek",
    provider: "DeepSeek",
    description:
      "Cost-effective model with impressive reasoning and code generation.",
    capabilities: ["Reasoning", "Coding"],
    iconKey: "deepseek",
    accent: "#4d6bfe",
    contextWindow: "64K",
  },
  {
    id: "mistral-large",
    name: "Mistral",
    provider: "Mistral AI",
    description:
      "European frontier model focused on speed, precision and multilingual tasks.",
    capabilities: ["Fast", "Writing", "Reasoning"],
    iconKey: "mistral",
    accent: "#ff7000",
    contextWindow: "128K",
  },
];

export const DEFAULT_MODEL_ID = "gpt-4o";

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}
