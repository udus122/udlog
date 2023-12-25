"use client";
import { Database } from "@udus/notion-renderer/components";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { loadArticles } from "@/lib/notion";

import type {
  DatabaseObject,
  PageObject,
} from "@udus/notion-renderer/dist/types";

export default function Top({
  database,
  initialPages,
}: {
  database: DatabaseObject;
  initialPages: {
    items: PageObject[];
    next_cursor: string | null;
  };
}) {
  const [articlesLoad, setArticlesLoad] = useState(initialPages);

  return (
    <>
      <Database
        database={database}
        pages={articlesLoad.items}
        hideCover
        hideDescription
        hideIcon
        hideTitle
        viewType="gallery"
        displayProperties={["title", "Published"]}
      />
      <div className="flex justify-center py-8">
        <Button
          className="bg-gray-200 text-gray-950"
          onClick={async () => {
            const nextArticles = await loadArticles(articlesLoad.next_cursor);

            setArticlesLoad({
              items: [...articlesLoad.items, ...nextArticles.items],
              next_cursor: nextArticles.next_cursor,
            });
          }}
        >
          Load more
        </Button>
      </div>
    </>
  );
}
