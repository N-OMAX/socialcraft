"use client";

import { useState } from "react";
import { GeneratedPost, IMAGE_GENERATORS } from "@/types";
import clsx from "clsx";

const PLATFORM_META: Record<
  GeneratedPost["platform"],
  { label: string; color: string; icon: string }
> = {
  instagram: { label: "Instagram", color: "bg-pink-100 text-pink-700",  icon: "◈" },
  twitter:   { label: "Twitter / X", color: "bg-sky-100 text-sky-700",  icon: "𝕏" },
  linkedin:  { label: "LinkedIn",   color: "bg-blue-100 text-blue-700", icon: "in" },
  tiktok:    { label: "TikTok",     color: "bg-zinc-900 text-white",    icon: "♪" },
};

interface PostCardProps {
  post: GeneratedPost;
  onDelete?: (id: string) => void;
  isNew?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-xs font-body font-medium text-ink-400 hover:text-ink transition-colors px-2 py-1 rounded-md hover:bg-ink-100 shrink-0"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

export default function PostCard({ post, onDelete, isNew }: PostCardProps) {
  const meta = PLATFORM_META[post.platform];
  const hashtagString = post.hashtags.map((h) => `#${h}`).join(" ");
  const fullPost = `${post.caption}\n\n${hashtagString}`;

  // image prompt tab state — default to first available generator
  const [activeGenId, setActiveGenId] = useState<string | null>(
    post.imagePrompts?.[0]?.generatorId ?? null
  );

  const activePrompt = post.imagePrompts?.find((p) => p.generatorId === activeGenId);

  return (
    <article
      className={clsx(
        "border border-ink/10 rounded-2xl bg-white/60 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md",
        isNew && "animate-fade-up"
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink/8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={clsx("text-xs font-mono font-medium px-2.5 py-1 rounded-full", meta.color)}>
            {meta.icon} {meta.label}
          </span>
          <span className="text-xs text-ink-400 font-body capitalize">{post.tone}</span>
          {post.model && (
            <span className="text-xs font-mono text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full border border-sage-200">
              {post.model.split(":")[0]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <CopyButton text={fullPost} />
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="text-xs text-ink-300 hover:text-red-400 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
            >×</button>
          )}
        </div>
      </div>

      {/* ── Topic ── */}
      <div className="px-5 pt-4 pb-1">
        <p className="text-xs uppercase tracking-widest text-ink-400 font-body mb-1">Topic</p>
        <p className="font-display text-sm italic text-ink-700">{post.topic}</p>
      </div>

      {/* ── Caption ── */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs uppercase tracking-widest text-ink-400 font-body">Caption</p>
          <CopyButton text={post.caption} />
        </div>
        <p className="font-body text-sm leading-relaxed text-ink-900 whitespace-pre-wrap">
          {post.caption}
        </p>
      </div>

      {/* ── Hashtags ── */}
      <div className="px-5 pt-2 pb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-widest text-ink-400 font-body">Hashtags</p>
          <CopyButton text={hashtagString} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-amber/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Image Prompts ── */}
      {post.imagePrompts && post.imagePrompts.length > 0 && (
        <div className="border-t border-ink/8">
          {/* Generator tab bar */}
          <div className="flex items-center gap-0 overflow-x-auto px-5 pt-3 pb-0 scrollbar-hide">
            <p className="text-xs uppercase tracking-widest text-ink-400 font-body mr-3 shrink-0">
              Image Prompts
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {post.imagePrompts.map((p) => {
                const gen = IMAGE_GENERATORS.find((g) => g.id === p.generatorId);
                if (!gen) return null;
                const isActive = activeGenId === p.generatorId;
                return (
                  <button
                    key={p.generatorId}
                    onClick={() => setActiveGenId(isActive ? null : p.generatorId)}
                    className={clsx(
                      "flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-body font-medium transition-all duration-150 shrink-0",
                      isActive
                        ? `${gen.color} ${gen.textColor} ${gen.borderColor}`
                        : "border-ink/10 bg-white/60 text-ink-400 hover:border-ink/20 hover:text-ink-600"
                    )}
                  >
                    <span>{gen.icon}</span>
                    <span>{gen.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active prompt content */}
          {activeGenId && activePrompt && (() => {
            const gen = IMAGE_GENERATORS.find((g) => g.id === activeGenId);
            if (!gen) return null;
            return (
              <div className="px-5 pt-3 pb-4 animate-fade-in">
                <div className={clsx(
                  "rounded-xl border p-3 flex gap-2",
                  gen.color, gen.borderColor
                )}>
                  <div className="flex-1 min-w-0">
                    <p className={clsx("text-xs font-mono font-medium mb-1.5", gen.textColor)}>
                      {gen.icon} {gen.label}
                    </p>
                    <p className="font-mono text-xs leading-relaxed text-ink-700 break-words">
                      {activePrompt.prompt}
                    </p>
                  </div>
                  <CopyButton text={activePrompt.prompt} />
                </div>
              </div>
            );
          })()}

          {/* Collapsed state hint */}
          {!activeGenId && (
            <p className="px-5 pb-3 pt-2 text-xs text-ink-300 font-body italic">
              Click a generator tab above to see its prompt ↑
            </p>
          )}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="px-5 py-2.5 bg-ink-50/50 border-t border-ink/8">
        <p className="text-xs text-ink-300 font-body">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </article>
  );
}
