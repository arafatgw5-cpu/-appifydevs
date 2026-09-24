export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  modelId?: string;
  createdAt: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  modelId: string;
  updatedAt: string;
  pinned?: boolean;
  category?: ConversationCategory;
  messageCount: number;
}

export type ConversationCategory =
  | "Today"
  | "Yesterday"
  | "Previous 7 Days"
  | "Older";
