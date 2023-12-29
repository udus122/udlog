import { extractTitle } from "@udus/notion-renderer/utils";
import { Feed } from "feed";

import { loadArticles } from "../articles/lib";

export async function GET() {
  const feed = new Feed({
    title: "UDlog",
    description: "Personal blog of UD",
    feedLinks: { rss: "https://blog.udus.dev/feed" },
    id: "https://blog.udus.dev/",
    link: "https://blog.udus.dev/",
    language: "ja",
    copyright: "All rights reserved 2023, UD",
    generator: "UD",
  });

  const articles = await loadArticles();

  articles.items.forEach((page) => {
    feed.addItem({
      title: extractTitle(page)
        .map((text) => text.plain_text)
        .join(""),
      link: `https://blog.udus.dev/${page.id}`,
      date: new Date(page.created_time),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
