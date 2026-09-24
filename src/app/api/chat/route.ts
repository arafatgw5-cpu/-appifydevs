import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { AI_MODELS, getModelById } from "@/data/models";

export const runtime = "nodejs";
// The chat endpoint may take a few seconds for longer responses.
export const maxDuration = 60;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: IncomingMessage[];
  modelId?: string;
  webSearch?: boolean;
  thinking?: boolean;
}

/**
 * Builds a system prompt that gives the assistant the EchoGPT persona and
 * reflects the user's currently selected model. This makes the model selector
 * feel meaningful even though the underlying SDK uses a single model.
 */
function buildSystemPrompt(modelId?: string): string {
  const base =
    "You are EchoGPT, a helpful, concise and friendly AI assistant inside the EchoGPT workspace. " +
    "Answer clearly, use Markdown formatting when helpful (headings, bold, bullet points, and fenced code blocks for code), " +
    "and keep responses focused. If the user asks about the EchoGPT product itself, you may briefly describe it as a unified workspace for chatting with multiple AI models.";

  if (!modelId) return base;

  const model = getModelById(modelId);
  if (!model) return base;

  const traits: Record<string, string> = {
    "gpt-4o":
      "You are currently acting as GPT-4o by OpenAI — versatile, balanced and fast. Be direct and well-structured.",
    "claude-3-5-sonnet":
      "You are currently acting as Claude 3.5 by Anthropic — thoughtful, nuanced and excellent at long-form writing and analysis. Favor clear, well-reasoned prose.",
    "gemini-1-5-pro":
      "You are currently acting as Gemini 1.5 by Google — capable with very large context and multimodal inputs. Be comprehensive and organized.",
    "llama-3-1-70b":
      "You are currently acting as Llama 3.1 by Meta — open, practical and great value. Be straightforward and useful.",
    "deepseek-v3":
      "You are currently acting as DeepSeek — strong at reasoning and code. Be precise and favor working code examples.",
    "mistral-large":
      "You are currently acting as Mistral by Mistral AI — fast, multilingual and precise. Be efficient with words.",
  };

  const trait = traits[modelId] ?? `You are currently acting as ${model.name} by ${model.provider}.`;
  return `${base}\n\n${trait}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { messages, modelId, thinking } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty." },
        { status: 400 },
      );
    }

    // Validate and sanitize the incoming conversation.
    const sanitized: IncomingMessage[] = messages
      .filter((m) => typeof m?.content === "string" && m.content.trim().length > 0)
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.slice(0, 16000), // guard against oversized payloads
      }));

    if (sanitized.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided." },
        { status: 400 },
      );
    }

    // Keep the conversation window reasonable (last 20 turns).
    const trimmed = sanitized.slice(-20);

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: buildSystemPrompt(modelId) },
        ...trimmed,
      ],
      stream: false,
      thinking: { type: thinking ? "enabled" : "disabled" },
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        { error: "The model returned an empty response. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      content: reply,
      modelId: modelId ?? "gpt-4o",
      model: getModelById(modelId ?? "gpt-4o")?.name ?? "EchoGPT",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error from the AI service.";
    console.error("[/api/chat] error:", message);
    return NextResponse.json(
      { error: "Failed to get a response from the AI service. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/chat",
    method: "POST",
    models: AI_MODELS.map((m) => ({ id: m.id, name: m.name, provider: m.provider })),
  });
}
