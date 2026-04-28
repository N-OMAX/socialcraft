import { NextRequest, NextResponse } from "next/server";
import { openai, buildPrompt } from "@/lib/openai";
import { GenerateRequest, GeneratedPost, GenerateResponse, OLLAMA_MODELS, IMAGE_GENERATORS } from "@/types";
import { randomUUID } from "crypto";

const ALLOWED_MODELS = new Set(OLLAMA_MODELS.map((m) => m.tag));

/** Strip think-tags, markdown fences, and find the outermost JSON object */
function extractJSON(raw: string): string {
  let text = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return text;
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { topic, platform, tone, model, imageGenerators = [] } = body;

    if (!topic || topic.trim().length < 2) {
      return NextResponse.json<GenerateResponse>(
        { success: false, error: "Topic must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!model || !ALLOWED_MODELS.has(model)) {
      return NextResponse.json<GenerateResponse>(
        { success: false, error: `Unknown model "${model}".` },
        { status: 400 }
      );
    }

    // Resolve selected generator configs (filter to valid IDs)
    const validGeneratorIds = new Set(IMAGE_GENERATORS.map((g) => g.id));
    const selectedGenerators = IMAGE_GENERATORS.filter((g) =>
      imageGenerators.includes(g.id) && validGeneratorIds.has(g.id)
    );

    const prompt = buildPrompt(topic, platform, tone, selectedGenerators);

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85,
        max_tokens: 2000,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isConnRefused = msg.includes("ECONNREFUSED") || msg.includes("fetch failed");
      return NextResponse.json<GenerateResponse>(
        {
          success: false,
          error: isConnRefused
            ? "Cannot connect to Ollama. Make sure it's running: `ollama serve`"
            : `Ollama error: ${msg}`,
        },
        { status: 502 }
      );
    }

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const cleaned = extractJSON(raw);

    let parsed: { caption: string; hashtags: string[]; imagePrompts: Array<{ generatorId: string; prompt: string }> };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse model response:\n", raw);
      return NextResponse.json<GenerateResponse>(
        { success: false, error: `Model returned invalid JSON. Raw output:\n${raw.slice(0, 400)}` },
        { status: 500 }
      );
    }

    // Validate and sanitize imagePrompts array
    const imagePrompts = Array.isArray(parsed.imagePrompts)
      ? parsed.imagePrompts
          .filter((p) => p && typeof p.generatorId === "string" && typeof p.prompt === "string")
          .filter((p) => selectedGenerators.some((g) => g.id === p.generatorId))
      : [];

    const post: GeneratedPost = {
      id: randomUUID(),
      topic: topic.trim(),
      platform,
      tone,
      model,
      caption: parsed.caption || "",
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
      imagePrompts,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json<GenerateResponse>({ success: true, data: post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred.";
    console.error("Generate API error:", message);
    return NextResponse.json<GenerateResponse>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
