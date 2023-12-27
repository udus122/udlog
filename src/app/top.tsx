"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Database } from "@udus/notion-renderer/components";
import { useState, useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();

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
        displayProperties={["title", "Published", "Tags"]}
      />
      <div className="flex justify-center py-8">
        {articlesLoad.next_cursor !== null && (
          <Button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const nextArticles = await loadArticles(
                  articlesLoad.next_cursor
                );
                setArticlesLoad({
                  items: [...articlesLoad.items, ...nextArticles.items],
                  next_cursor: nextArticles.next_cursor,
                });
              })
            }
          >
            {isPending ? (
              <>
                <ReloadIcon className="w-4 h-4 animate-spin" /> Loading...
              </>
            ) : (
              "Load more"
            )}
          </Button>
        )}
      </div>
    </>
  );
}
