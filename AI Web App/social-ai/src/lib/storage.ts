import { GeneratedPost } from "@/types";

export const STORAGE_KEY = "social_ai_posts";

/** Migrate old posts that used imagePrompt (string) to imagePrompts (array) */
function migrate(post: GeneratedPost & { imagePrompt?: string }): GeneratedPost {
  if (!post.imagePrompts && post.imagePrompt) {
    return { ...post, imagePrompts: [{ generatorId: "legacy", prompt: post.imagePrompt }] };
  }
  if (!post.imagePrompts) {
    return { ...post, imagePrompts: [] };
  }
  return post;
}

export function getPosts(): GeneratedPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const posts = raw ? JSON.parse(raw) : [];
    return posts.map(migrate);
  } catch {
    return [];
  }
}

export function savePost(post: GeneratedPost): void {
  if (typeof window === "undefined") return;
  const posts = getPosts();
  const updated = [post, ...posts].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deletePost(id: string): void {
  if (typeof window === "undefined") return;
  const posts = getPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function clearPosts(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
