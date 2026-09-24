import type { AIModel } from "@/types/model";

/**
 * Centralized AI model registry. Used across the landing page,
 * the web app and the Chrome extension concepts.
 *
 * All descriptions are demo/placeholder copy for the redesign.
 */
export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-5-5",
    name: "GPT 5.5",
    provider: "OpenAI",
    description: "The most advanced model with reasoning, vision and fast responses.",
    capabilities: ["Reasoning", "Vision", "Multimodal", "Fast"],
    iconKey: "openai",
    accent: "#10a37f",
    badge: "Most popular",
    contextWindow: "256K",
  },
  {
    id: "opus-4-8",
    name: "Opus 4.8",
    provider: "Anthropic",
    description: "Extremely capable for complex analysis and nuanced conversational tasks.",
    capabilities: ["Writing", "Reasoning", "Coding", "Long-context"],
    iconKey: "anthropic",
    accent: "#d97757",
    badge: "Great for writing",
    contextWindow: "500K",
  },
  {
    id: "gemini-3-5-flash",
    name: "Gemini 3.5 Flash",
    provider: "Google",
    description: "Extremely fast multimodal model with huge context window.",
    capabilities: ["Long-context", "Vision", "Multimodal", "Fast"],
    iconKey: "gemini",
    accent: "#4285f4",
    contextWindow: "2M",
  },
  {
    id: "composer-2-5",
    name: "Composer 2.5",
    provider: "Cursor",
    description: "Cost-effective model with impressive code generation.",
    capabilities: ["Reasoning", "Coding"],
    iconKey: "composer",
    accent: "#6c6c6c",
    contextWindow: "128K",
  },
  {
    id: "glm-5-2",
    name: "GLM 5.2",
    provider: "Zhipu",
    description: "Cost-effective model with impressive reasoning.",
    capabilities: ["Reasoning", "Coding"],
    iconKey: "glm",
    accent: "#4d6bfe",
    contextWindow: "128K",
  },
];

export const DEFAULT_MODEL_ID = "gpt-5-5";

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}
