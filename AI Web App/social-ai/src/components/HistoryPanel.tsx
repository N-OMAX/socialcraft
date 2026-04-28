"use client";

import { GeneratedPost } from "@/types";
import PostCard from "./PostCard";
import clsx from "clsx";

interface HistoryPanelProps {
  posts: GeneratedPost[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

export default function HistoryPanel({ posts, onDelete, onClear }: HistoryPanelProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center mb-4">
          <span className="text-2xl opacity-40">✦</span>
        </div>
        <p className="font-display text-lg text-ink-400 italic">No posts yet</p>
        <p className="font-body text-sm text-ink-300 mt-1">
          Generate your first post to see history here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-body text-sm font-medium text-ink-700">
            {posts.length} post{posts.length !== 1 ? "s" : ""} saved
          </p>
          <p className="font-body text-xs text-ink-400">Stored locally in your browser</p>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-body text-ink-300 hover:text-red-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className={clsx("animate-fade-up")}
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
          >
            <PostCard post={post} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}
