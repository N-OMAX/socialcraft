# ✦ SocialCraft — AI Social Media Content Generator

Generate scroll-stopping captions, hashtags, and image prompts for Instagram, Twitter/X, LinkedIn, and TikTok — powered by GPT-4o mini.

![SocialCraft](https://img.shields.io/badge/Next.js-14-black?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT4o--mini-412991?style=flat-square) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square)

---

## Features

- **Multi-platform support** — Instagram, Twitter/X, LinkedIn, TikTok (each with platform-aware character limits)
- **4 tone modes** — Professional, Casual, Humorous, Inspirational
- **AI-generated content** — Caption, hashtags (5–10 tags), optional DALL-E image prompt
- **History panel** — Saves last 50 posts in localStorage, persist across sessions
- **One-click copy** — Copy caption, hashtags, or full post instantly
- **Vercel-ready** — Zero-config deployment

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url> social-ai
cd social-ai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Get your API key at [platform.openai.com](https://platform.openai.com/api-keys).

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # POST /api/generate — AI generation endpoint
│   ├── globals.css             # Global styles + Google Fonts
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Main page with tabs (Generate / History)
├── components/
│   ├── GeneratorForm.tsx       # Topic input + platform/tone/toggle controls
│   ├── PostCard.tsx            # Generated post display card with copy buttons
│   └── HistoryPanel.tsx        # History list with delete/clear controls
├── lib/
│   ├── openai.ts               # OpenAI client + prompt builder
│   └── storage.ts              # localStorage CRUD helpers
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy

```bash
npm install -g vercel
vercel
```

**Set environment variable in Vercel dashboard:**

```
OPENAI_API_KEY = sk-your-key-here
```

Settings → Environment Variables → Add `OPENAI_API_KEY` for Production.

---

## Customization

### Change AI model
In `src/lib/openai.ts`, edit the `model` field:
```ts
model: "gpt-4o",  // More powerful but slower/pricier
```

### Add more platforms
In `src/components/GeneratorForm.tsx`, add to the `PLATFORMS` array.
Update `buildPrompt()` in `src/lib/openai.ts` with platform-specific guidance.

### Adjust history limit
In `src/lib/storage.ts`:
```ts
const updated = [post, ...posts].slice(0, 100); // Change 50 → 100
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| AI | OpenAI GPT-4o mini |
| Fonts | Playfair Display + DM Sans + JetBrains Mono |
| Storage | Browser localStorage |
| Deployment | Vercel |

---

## License

MIT — use freely, attribution appreciated.
