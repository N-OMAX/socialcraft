import OpenAI from "openai";
import { ImageGenerator } from "@/types";

// Ollama exposes an OpenAI-compatible API at localhost:11434
export const openai = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
  apiKey: "ollama",
});

export function buildPrompt(
  topic: string,
  platform: string,
  tone: string,
  generators: ImageGenerator[]
): string {
  const platformGuide: Record<string, string> = {
    instagram: "Instagram (max 2200 chars, visual-first, storytelling, emojis welcome)",
    twitter: "Twitter/X (max 240 chars, punchy, conversational, no filler)",
    linkedin: "LinkedIn (professional, thought-leadership, up to 3000 chars)",
    tiktok: "TikTok (trendy, Gen-Z friendly, hook-driven, short, energetic)",
  };

  const toneGuide: Record<string, string> = {
    professional: "authoritative, polished, credible",
    casual: "friendly, relaxed, approachable",
    humorous: "witty, playful, entertaining",
    inspirational: "motivating, uplifting, empowering",
  };

  const hasGenerators = generators.length > 0;

  // Build the imagePrompts field definition dynamically
  const imagePromptsField = hasGenerators
    ? generators.map((g) => `{"generatorId":"${g.id}","prompt":"<prompt for ${g.label} here>"}`).join(",")
    : "";

  const imagePromptsInstructions = hasGenerators
    ? generators
        .map(
          (g, i) =>
            `imagePrompts[${i}] (generatorId="${g.id}", ${g.label}): ${g.promptStyle}`
        )
        .join("\n\n")
    : "";

  return `You are an expert social media content strategist and AI image prompt engineer.

TASK: Generate a social media post${hasGenerators ? " and AI image prompts" : ""}.
Topic: "${topic}"
Platform: ${platformGuide[platform] || platform}
Tone: ${toneGuide[tone] || tone}

CRITICAL INSTRUCTIONS:
- Respond with ONLY a raw JSON object. No text before or after.
- No markdown, no code fences, no backticks.
- Start your response with { and end with }

Required JSON structure:
{"caption":"your caption here","hashtags":["tag1","tag2","tag3","tag4","tag5"]${hasGenerators ? `,"imagePrompts":[${imagePromptsField}]` : `,"imagePrompts":[]`}}

FIELD RULES:

caption:
- Platform-appropriate length and style.
- Twitter/X: max 240 chars, no padding.
- Instagram: storytelling, emoji ok.
- LinkedIn: professional insight or story.
- TikTok: short punchy hook.
- Tone: ${toneGuide[tone] || tone}.

hashtags:
- Array of 5-10 strings WITHOUT the # symbol.
- Mix high-volume and niche tags relevant to the topic.

${hasGenerators ? `imagePrompts:
Each entry MUST have exactly these two keys: "generatorId" (string) and "prompt" (string).
Write a unique, optimized prompt for EACH generator below. Each prompt should perfectly visualize the post's vibe.

${imagePromptsInstructions}` : `imagePrompts: Return an empty array [].`}

Remember: raw JSON only, nothing else.`;
}
