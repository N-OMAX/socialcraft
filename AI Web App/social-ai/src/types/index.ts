export interface GeneratedPost {
  id: string;
  topic: string;
  platform: "instagram" | "twitter" | "linkedin" | "tiktok";
  tone: "professional" | "casual" | "humorous" | "inspirational";
  model: string;
  caption: string;
  hashtags: string[];
  imagePrompts: ImagePromptResult[];
  createdAt: string;
}

export interface ImagePromptResult {
  generatorId: string;
  prompt: string;
}

export interface GenerateRequest {
  topic: string;
  platform: GeneratedPost["platform"];
  tone: GeneratedPost["tone"];
  model: string;
  imageGenerators: string[]; // selected generator IDs
}

export interface GenerateResponse {
  success: boolean;
  data?: GeneratedPost;
  error?: string;
}

export interface OllamaModel {
  name: string;
  label: string;
  size: string;
  tag: string;
}

export const OLLAMA_MODELS: OllamaModel[] = [
  { name: "qwen2.5-coder:14b",    label: "Qwen2.5 Coder",    size: "14B", tag: "qwen2.5-coder:14b" },
  { name: "qwen2.5-coder:7b",     label: "Qwen2.5 Coder",    size: "7B",  tag: "qwen2.5-coder:7b" },
  { name: "llama3",               label: "Llama 3",           size: "8B",  tag: "llama3" },
  { name: "deepseek-coder-v2:16b",label: "DeepSeek Coder V2", size: "16B", tag: "deepseek-coder-v2:16b" },
];

export interface ImageGenerator {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;         // Tailwind bg class
  textColor: string;     // Tailwind text class
  borderColor: string;   // Tailwind border class
  promptStyle: string;   // injected into the AI prompt
}

export const IMAGE_GENERATORS: ImageGenerator[] = [
  {
    id: "midjourney",
    label: "Midjourney",
    shortLabel: "MJ",
    icon: "◭",
    color: "bg-violet-100",
    textColor: "text-violet-700",
    borderColor: "border-violet-200",
    promptStyle: `Write a Midjourney prompt. Use Midjourney's syntax: describe the scene vividly, then append style parameters at the end like "--ar 4:5 --style raw --stylize 750 --v 6.1". Use double colons (::) for concept weighting where useful. Be highly descriptive about lighting, camera lens, mood, color palette, and artistic references. Example format: "cinematic portrait of a barista in golden hour light, steam rising from espresso cup, film grain, shot on Leica M10 --ar 4:5 --style raw --stylize 750 --v 6.1"`,
  },
  {
    id: "chatgpt",
    label: "ChatGPT / DALL-E 3",
    shortLabel: "DALL-E",
    icon: "⬡",
    color: "bg-emerald-100",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    promptStyle: `Write a DALL-E 3 prompt. DALL-E 3 understands natural language well, so write in clear descriptive sentences. Specify: the main subject, art style (photograph, illustration, painting, etc.), lighting conditions, color mood, and composition. Avoid banned content. Be specific about aspect ratio needs (e.g. "vertical portrait format for Instagram"). Example: "A professional photograph of a cozy coffee shop interior at golden hour, warm amber lighting, shallow depth of field, steam rising from a latte art cup on a wooden table, shot on a 35mm lens, Instagram portrait format."`,
  },
  {
    id: "stablediffusion",
    label: "Stable Diffusion",
    shortLabel: "SD",
    icon: "◈",
    color: "bg-orange-100",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    promptStyle: `Write a Stable Diffusion prompt. Use the classic SD comma-separated tag style. Start with the most important subject tags, then add style tags, then quality boosters. Include: subject description, art style, artist references (e.g. "by Greg Rutkowski"), lighting, camera settings, and quality tags. End with negative prompt suggestion in brackets like [negative: blurry, deformed, watermark, text]. Example: "barista pouring latte art, coffee shop, cinematic lighting, bokeh background, by Annie Leibovitz, 8k uhd, photorealistic, Canon EOS R5 [negative: blurry, ugly, watermark]"`,
  },
  {
    id: "flux",
    label: "Flux (BFL)",
    shortLabel: "Flux",
    icon: "⚡",
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
    promptStyle: `Write a Flux prompt (Black Forest Labs). Flux excels at photorealism and responds well to natural language like DALL-E but also benefits from specific technical details like Midjourney. Describe: subject, environment, lighting (be very specific — "soft diffused overcast light" vs "harsh midday sun"), lens/camera specs if photographic, color grading style, and mood. Flux handles long detailed prompts well. Example: "Ultra-realistic photo of a specialty coffee barista wearing an apron, carefully pouring steamed milk into a ceramic cup creating a tulip latte art pattern, warm cafe interior, shot with Sony A7R V 85mm f/1.4, soft window light from the left, muted earth tones, editorial photography style."`,
  },
  {
    id: "ideogram",
    label: "Ideogram",
    shortLabel: "Ideogram",
    icon: "Ⅱ",
    color: "bg-pink-100",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
    promptStyle: `Write an Ideogram prompt. Ideogram is exceptional at text rendering within images and graphic design. Leverage this: include any text that should appear in the image (in quotes), specify the design style (poster, social media graphic, logo, etc.), color palette, typography style. Also works great for photorealism. Example: "A modern Instagram post design with the text "Morning Ritual" in bold sans-serif at the top, photo of steaming coffee cup on marble surface, minimalist aesthetic, warm beige and brown color palette, clean layout."`,
  },
  {
    id: "firefly",
    label: "Adobe Firefly",
    shortLabel: "Firefly",
    icon: "✦",
    color: "bg-red-100",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    promptStyle: `Write an Adobe Firefly prompt. Firefly is optimized for commercial/stock photography style results and is great for brand-safe content. Describe in natural language, focusing on: the commercial/editorial use case, professional photography style, brand-appropriate mood, and specific visual style references (stock photo, lifestyle photo, product shot, etc.). Firefly respects aspect ratio keywords like "landscape" or "square". Example: "Professional lifestyle photography of a woman enjoying her morning coffee at a bright modern kitchen, natural window light, clean minimal aesthetic, authentic candid moment, suitable for wellness brand marketing, square format."`,
  },
];


