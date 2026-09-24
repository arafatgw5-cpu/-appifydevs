import { NextRequest, NextResponse } from "next/server";

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
    "gpt-5-5":
      "You are currently acting as GPT-5.5 by OpenAI — the most advanced multimodal model. Be highly capable and direct.",
    "opus-4-8":
      "You are currently acting as Opus 4.8 by Anthropic — incredibly thoughtful and nuanced. Favor clear, extremely well-reasoned prose.",
    "gemini-3-5-flash":
      "You are currently acting as Gemini 3.5 Flash by Google — extremely fast with a massive context window. Be comprehensive and organized.",
    "composer-2-5":
      "You are currently acting as Composer 2.5 — strong at reasoning and code generation. Focus on clear, maintainable code solutions.",
    "glm-5-2":
      "You are currently acting as GLM 5.2 by Zhipu — highly cost-effective and strong at reasoning. Be straightforward and useful.",
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set." }, { status: 500 });
    }

    const systemPrompt = buildSystemPrompt(modelId);

    const geminiContents = trimmed.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemPrompt },
          },
          contents: geminiContents,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to get a response from the AI service." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        { error: "The model returned an empty response. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      content: reply,
      modelId: modelId ?? "gpt-5-5",
      model: getModelById(modelId ?? "gpt-5-5")?.name ?? "EchoGPT",
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
