export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: ModelCapability[];
  iconKey: ModelIconKey;
  accent: string;
  badge?: string;
  contextWindow?: string;
}

export type ModelCapability =
  | "Reasoning"
  | "Coding"
  | "Writing"
  | "Multimodal"
  | "Fast"
  | "Vision"
  | "Long-context";

export type ModelIconKey =
  | "openai"
  | "anthropic"
  | "google"
  | "meta"
  | "deepseek"
  | "mistral"
  | "groq";
