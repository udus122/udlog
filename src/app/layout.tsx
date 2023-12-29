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
      <body className="notion-root notion-dark dark">
        <header className="sticky top-0 bg-inherit z-10">
          <nav className="flex items-center p-4">
            <Logo />
            <div className="flex gap-4 ml-auto dark:text-gray-300">
              <Link href="/articles">Articles</Link>
              <Link href="/references">References</Link>
              <Link href="/feed">
                <RssIcon />
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <div className="flex flex-col py-16 items-center gap-4">
            <p className="dark:text-gray-300">
              <Logo />
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
