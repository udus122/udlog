"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Database } from "@udus/notion-renderer/components";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

import type {
  DatabaseObject,
  PageObject,
} from "@udus/notion-renderer/dist/types";

type PageState = {
  items: PageObject[];
  next_cursor: string | null;
};

export default function PageList({
  database,
  initialPages,
  loadFn,
  displayProperties,
  hideCover = false,
  hideDescription = false,
  hideIcon = false,
  hideTitle = false,
}: {
  database: DatabaseObject;
  initialPages: PageState;
  loadFn: (start_cursor?: string | null) => Promise<PageState>;
  displayProperties?: string[];
  hideCover?: boolean;
  hideDescription?: boolean;
  hideIcon?: boolean;
  hideTitle?: boolean;
}) {
  const [pages, setPages] = useState(initialPages);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Database
        database={database}
        pages={pages.items}
        viewType="gallery"
        hideCover={hideCover}
        hideDescription={hideDescription}
        hideIcon={hideIcon}
        hideTitle={hideTitle}
        displayProperties={displayProperties}
      />
      <div className="flex justify-center py-8">
        {pages.next_cursor !== null && (
          <Button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const nextPages = await loadFn(pages.next_cursor);
                setPages({
                  items: [...pages.items, ...nextPages.items],
                  next_cursor: nextPages.next_cursor,
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
