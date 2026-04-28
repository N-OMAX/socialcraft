"use client";

import { useEffect, useState } from "react";
import { GeneratedPost } from "@/types";
import { getPosts, savePost, deletePost, clearPosts } from "@/lib/storage";
import GeneratorForm from "@/components/GeneratorForm";
import PostCard from "@/components/PostCard";
import HistoryPanel from "@/components/HistoryPanel";

type Tab = "generate" | "history";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("generate");
  const [latestPost, setLatestPost] = useState<GeneratedPost | null>(null);
  const [history, setHistory] = useState<GeneratedPost[]>([]);
  const [isNewPost, setIsNewPost] = useState(false);

  useEffect(() => {
    setHistory(getPosts());
  }, []);

  const handleGenerate = (post: GeneratedPost) => {
    savePost(post);
    setHistory(getPosts());
    setLatestPost(post);
    setIsNewPost(true);
    setTimeout(() => setIsNewPost(false), 600);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    setHistory(getPosts());
    if (latestPost?.id === id) setLatestPost(null);
  };

  const handleClear = () => {
    clearPosts();
    setHistory([]);
    setLatestPost(null);
  };

  return (
    <div className="min-h-screen">
      {/* Background accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-sage/8 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/15 border border-amber/30 text-amber-700 text-xs font-mono font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            AI-Powered Social Content
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-ink-950 leading-tight mb-3">
            SocialCraft
          </h1>
          <p className="font-body text-ink-400 text-base max-w-md mx-auto leading-relaxed">
            Conjure scroll-stopping captions, hashtags, and image prompts for any platform — in seconds.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="inline-flex p-1 bg-white/60 border border-ink/10 rounded-xl gap-1">
            {(["generate", "history"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-6 py-2 rounded-lg font-body text-sm font-medium capitalize transition-all duration-200
                  ${activeTab === tab
                    ? "bg-ink-950 text-white shadow-sm"
                    : "text-ink-500 hover:text-ink-800 hover:bg-white/60"
                  }
                `}
              >
                {tab}
                {tab === "history" && history.length > 0 && (
                  <span className={`
                    ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-mono
                    ${activeTab === tab ? "bg-white/20 text-white" : "bg-amber/20 text-amber-700"}
                  `}>
                    {history.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div
            className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {/* Form Panel */}
            <div className="rounded-2xl border border-ink/10 bg-white/50 p-6 shadow-sm h-fit">
              <h2 className="font-display text-xl text-ink-900 mb-5">
                Craft your post
              </h2>
              <GeneratorForm onGenerate={handleGenerate} />
            </div>

            {/* Result Panel */}
            <div>
              {latestPost ? (
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-400 font-body mb-3 px-1">
                    Latest generation
                  </p>
                  <PostCard post={latestPost} onDelete={handleDelete} isNew={isNewPost} />

                  {history.length > 1 && (
                    <div className="mt-8">
                      <p className="text-xs uppercase tracking-widest text-ink-400 font-body mb-3 px-1">
                        Previous posts
                      </p>
                      <div className="space-y-3">
                        {history.slice(1, 4).map((post) => (
                          <PostCard key={post.id} post={post} onDelete={handleDelete} />
                        ))}
                        {history.length > 4 && (
                          <button
                            onClick={() => setActiveTab("history")}
                            className="w-full text-center text-xs font-body text-ink-400 hover:text-ink-700 transition-colors py-2"
                          >
                            View all {history.length} posts in History →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-ink/15 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center mb-4">
                    <span className="text-amber-500 text-2xl">✦</span>
                  </div>
                  <p className="font-display text-xl text-ink-300 italic">Your post appears here</p>
                  <p className="font-body text-xs text-ink-300 mt-1.5">
                    Fill in the form and hit Generate
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div
            className="rounded-2xl border border-ink/10 bg-white/50 p-6 shadow-sm animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <h2 className="font-display text-xl text-ink-900 mb-5">Post History</h2>
            <HistoryPanel posts={history} onDelete={handleDelete} onClear={handleClear} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-4 space-y-1">
        <p className="font-body text-xs text-ink-300">
          Developed by <span className="text-ink-500 font-medium">NOMX</span>
          {" · "}Built with Next.js
          {" · "}Powered by Ollama
          {" · "}AI-assisted development using{" "}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-2"
          >
            Claude
          </a>
        </p>
        <p className="font-mono text-xs text-ink-200">
          History saved in browser · Key:{" "}
          <code className="bg-ink-100 px-1.5 py-0.5 rounded text-ink-400">social_ai_posts</code>
          {" · "}localStorage → DevTools → Application
        </p>
      </footer>
    </div>
  );
}
