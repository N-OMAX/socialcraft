"use client";

import { useState } from "react";
import { GenerateRequest, GeneratedPost, OLLAMA_MODELS, IMAGE_GENERATORS } from "@/types";
import clsx from "clsx";

const PLATFORMS: { value: GenerateRequest["platform"]; label: string; icon: string }[] = [
  { value: "instagram", label: "Instagram", icon: "◈" },
  { value: "twitter",   label: "Twitter / X", icon: "𝕏" },
  { value: "linkedin",  label: "LinkedIn", icon: "in" },
  { value: "tiktok",    label: "TikTok", icon: "♪" },
];

const TONES: { value: GenerateRequest["tone"]; label: string; desc: string }[] = [
  { value: "professional",  label: "Professional",  desc: "Authoritative & polished" },
  { value: "casual",        label: "Casual",        desc: "Friendly & relaxed" },
  { value: "humorous",      label: "Humorous",      desc: "Witty & entertaining" },
  { value: "inspirational", label: "Inspirational", desc: "Motivating & uplifting" },
];

interface GeneratorFormProps {
  onGenerate: (post: GeneratedPost) => void;
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [topic, setTopic]             = useState("");
  const [platform, setPlatform]       = useState<GenerateRequest["platform"]>("instagram");
  const [tone, setTone]               = useState<GenerateRequest["tone"]>("casual");
  const [model, setModel]             = useState(OLLAMA_MODELS[0].tag);
  const [selectedGens, setSelectedGens] = useState<string[]>(["midjourney", "chatgpt"]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const toggleGen = (id: string) => {
    setSelectedGens((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!topic.trim()) { setError("Please enter a topic."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform,
          tone,
          model,
          imageGenerators: selectedGens,
        }),
      });
      const json = await res.json();
      if (!json.success || !json.data) {
        setError(json.error || "Something went wrong.");
      } else {
        onGenerate(json.data);
        setTopic("");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  const selectedModel = OLLAMA_MODELS.find((m) => m.tag === model)!;

  return (
    <div className="space-y-5">

      {/* LLM Model */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <label className="text-xs uppercase tracking-widest text-ink-400 font-body">LLM Model</label>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage-100 border border-sage-200 text-sage-800 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            Ollama local
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {OLLAMA_MODELS.map((m) => (
            <button
              key={m.tag}
              onClick={() => setModel(m.tag)}
              className={clsx(
                "text-left px-3 py-2 rounded-xl border transition-all duration-150",
                model === m.tag
                  ? "border-sage bg-sage-100/70"
                  : "border-ink/10 bg-white/50 hover:border-ink/20 hover:bg-white"
              )}
            >
              <p className={clsx("text-xs font-body font-semibold leading-tight", model === m.tag ? "text-sage-800" : "text-ink-700")}>
                {m.label}
              </p>
              <p className="text-xs font-mono text-ink-400 mt-0.5">{m.size}</p>
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs font-mono text-ink-300 truncate">→ {selectedModel.tag}</p>
      </div>

      <div className="border-t border-ink/8" />

      {/* Image Generator Picker */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs uppercase tracking-widest text-ink-400 font-body">
            Image Generators
          </label>
          <span className="text-xs font-body text-ink-300">
            {selectedGens.length === 0 ? "none selected" : `${selectedGens.length} selected`}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {IMAGE_GENERATORS.map((g) => {
            const active = selectedGens.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGen(g.id)}
                className={clsx(
                  "relative flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-body font-medium transition-all duration-150",
                  active
                    ? `${g.color} ${g.textColor} ${g.borderColor} border`
                    : "border-ink/10 bg-white/50 text-ink-400 hover:border-ink/20 hover:bg-white hover:text-ink-600"
                )}
              >
                {active && (
                  <span className="absolute top-1 right-1.5 text-[9px] font-mono opacity-60">✓</span>
                )}
                <span className="text-sm">{g.icon}</span>
                <span className="text-center leading-tight">{g.shortLabel}</span>
              </button>
            );
          })}
        </div>
        {selectedGens.length === 0 && (
          <p className="mt-1.5 text-xs font-body text-ink-300 italic">
            Select at least one to get image prompts
          </p>
        )}
      </div>

      <div className="border-t border-ink/8" />

      {/* Topic */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-ink-400 font-body mb-2">
          What&apos;s your topic?
        </label>
        <div className="relative">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g. Morning coffee ritual, sustainable fashion tips, AI startup launch..."
            rows={3}
            className={clsx(
              "w-full font-body text-sm text-ink-900 bg-white/70 border rounded-xl px-4 py-3 resize-none",
              "placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber/60",
              "transition-all duration-200",
              error ? "border-red-300" : "border-ink/15"
            )}
          />
          <span className="absolute bottom-3 right-3 text-xs text-ink-300 font-mono">⌘↵</span>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 font-body animate-fade-in">{error}</p>}
      </div>

      {/* Platform */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-ink-400 font-body mb-2.5">Platform</label>
        <div className="grid grid-cols-4 gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPlatform(p.value)}
              className={clsx(
                "flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-body font-medium transition-all duration-150",
                platform === p.value
                  ? "border-amber bg-amber/10 text-amber-600"
                  : "border-ink/10 bg-white/50 text-ink-500 hover:border-ink/25 hover:bg-white"
              )}
            >
              <span className="text-base">{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-ink-400 font-body mb-2.5">Tone</label>
        <div className="grid grid-cols-2 gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={clsx(
                "text-left px-3.5 py-2.5 rounded-xl border transition-all duration-150",
                tone === t.value
                  ? "border-amber bg-amber/10"
                  : "border-ink/10 bg-white/50 hover:border-ink/20 hover:bg-white"
              )}
            >
              <p className={clsx("text-xs font-body font-semibold", tone === t.value ? "text-amber-700" : "text-ink-700")}>{t.label}</p>
              <p className="text-xs font-body text-ink-400 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !topic.trim()}
        className={clsx(
          "w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2",
          loading || !topic.trim()
            ? "bg-ink-200 text-ink-400 cursor-not-allowed"
            : "bg-ink-950 text-white hover:bg-ink-800 active:scale-[0.98] shadow-md hover:shadow-lg"
        )}
      >
        {loading ? (
          <>
            <LoadingDots />
            <span>Running {selectedModel.label} {selectedModel.size}…</span>
          </>
        ) : (
          <><span>✦</span><span>Generate Post</span></>
        )}
      </button>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-ink-400 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </span>
  );
}
