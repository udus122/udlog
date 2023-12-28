"use server";

import { fetchDatabaseItems } from "@udus/notion-renderer/libs";
import { cache } from "react";

import { client } from "@/client";
import { ARTICLE_DATABASE_ID } from "@/constants";

export const loadArticles = cache(
  async (start_cursor: string | null = null) => {
    const { ok, data } = await fetchDatabaseItems(client, {
      database_id: ARTICLE_DATABASE_ID,
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
