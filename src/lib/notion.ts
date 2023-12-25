"use server";

import {
  fetchBlockList,
  fetchDatabaseItems,
  fetchPage,
} from "@udus/notion-renderer/libs";
import { cache } from "react";

import { client } from "@/client";

const ARTICLES_DATABASE_ID = "0c610de6533f47c2a6b3aa38d306ee79";

export const loadBlocks = cache(
  async (args: Parameters<typeof fetchBlockList>[1]) => {
    const result = await fetchBlockList(client, args);
    return result.ok ? result.data : undefined;
  }
);

export const loadPage = cache(async (args: Parameters<typeof fetchPage>[1]) => {
  const result = await fetchPage(client, args);
  return result.ok ? result.data : undefined;
});

export const loadArticles = cache(
  async (start_cursor: string | null = null) => {
    const { ok, data } = await fetchDatabaseItems(client, {
      database_id: ARTICLES_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: "公開",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Published",
          direction: "descending",
        },
      ],
      page_size: 25,
      start_cursor: start_cursor ?? undefined,
    });

    if (!ok) {
      throw data;
    }

    return {
      items: data.results,
      next_cursor: data.next_cursor,
    };
  }
);
