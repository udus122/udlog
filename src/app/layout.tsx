import type { Metadata } from "next";
import "./globals.css";
import "@udus/notion-renderer/styles/globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Notion Renderer Example",
  description: "Example app by @udus/notion-renderer and create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="notion-root notion-dark dark">{children}</body>
    </html>
  );
}
