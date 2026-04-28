# SocialCraft

AI-powered social media content generator using local language models via Ollama.

Generates platform-specific captions, hashtags, and image prompts optimized for 6 different image generators - fully offline, no API key required.

---

## Features

- Local LLM selection directly in the UI (Qwen2.5 Coder 14B/7B, Llama 3, DeepSeek Coder V2)
- Platform support: Instagram, Twitter/X, LinkedIn, TikTok
- Tone options: Professional, Casual, Humorous, Inspirational
- Image prompts tailored for: Midjourney, DALL-E 3, Stable Diffusion, Flux, Ideogram, Adobe Firefly
- Post history saved locally in the browser (localStorage)
- No API key, no cloud, no data leaves your machine

---

## Requirements

- Node.js 18 or higher
- Ollama installed: https://ollama.com
- Git

---

## Setup

**1. Start Ollama and pull a model**

```bash
ollama serve
```

Pull one or more supported models:

```bash
ollama pull qwen2.5-coder:14b
ollama pull qwen2.5-coder:7b
ollama pull llama3
ollama pull deepseek-coder-v2:16b
```

**2. Clone the repository or extract the archive**

Via Git:

```bash
git clone https://github.com/NOMX/socialcraft.git
cd socialcraft
```

Via archive (social-ai-final.tar.gz) on Windows:

```powershell
# IMPORTANT: The project path must not contain special characters (!, &, spaces ideally)
# Wrong:  C:\!! Projects\socialcraft
# Correct: C:\Projects\socialcraft

cd C:\Projects
tar -xzf social-ai-final.tar.gz
cd social-ai
```

Via archive on macOS / Linux:

```bash
cd ~/Projects
tar -xzf social-ai-final.tar.gz
cd social-ai
```

**3. Install dependencies**

```bash
npm install
```

**4. Environment variables (optional)**

```bash
cp .env.example .env.local
```

The default configuration works without any changes:

```
# Only change this if Ollama runs on a different port
OLLAMA_BASE_URL=http://localhost:11434/v1
```

**5. Start the application**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

If the app shows a connection error, make sure Ollama is running:

```bash
ollama serve
```

---

## Deleting the post history

Post history is stored in your browser. To clear it:

- Use the "Clear all" button in the History tab inside the app, or
- Open browser DevTools (F12) -> Application -> Local Storage -> localhost:3000 -> delete the key `social_ai_posts`

---

## Known Limitations

- On Windows, Webpack does not allow special characters (!, &, etc.) in the project path
- Solution: place the project in a clean path such as C:\Projects\socialcraft

---

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Ollama (local LLM inference via OpenAI-compatible API)
- localStorage (post history)

---

## Author

Developed by [NOMX](https://github.com/NOMX)

---

## AI Support Disclaimer

This project was built with the assistance of [Claude (Anthropic)](https://claude.ai) as a development tool. Claude was used as a technical assistant for code generation, architecture decisions, and documentation. All conceptual decisions and overall responsibility remain with the developer. Claude is a tool, not the author of this project.
