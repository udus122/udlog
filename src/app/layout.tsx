import Link from "next/link";

import "./globals.css";
import "@udus/notion-renderer/styles/globals.css";
import "katex/dist/katex.min.css";

import { Logo } from "@/components/Logo";
import { RssIcon } from "@/components/RssIcon";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UDlog",
  description: "Personal Blog by UD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen notion-root notion-dark dark">
        <header className="sticky top-0 z-10 bg-inherit">
          <nav className="flex items-center p-4">
            <Logo />
            <div className="flex gap-4 ml-auto dark:text-gray-300">
              <Link href="/articles">Articles</Link>
              <Link href="/references">References</Link>
              <a href="/feed">
                <RssIcon />
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer>
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="dark:text-gray-300">
              <Logo />
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
