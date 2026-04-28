import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialCraft — AI Content Generator",
  description: "Generate scroll-stopping social media captions, hashtags, and image prompts with AI.",
  openGraph: {
    title: "SocialCraft — AI Content Generator",
    description: "Generate scroll-stopping social media posts in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
