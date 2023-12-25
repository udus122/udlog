"use server";

import { fetchDatabaseItems } from "@udus/notion-renderer/libs";

import { client } from "@/client";

const ARTICLES_DATABASE_ID = "0c610de6533f47c2a6b3aa38d306ee79";

export const loadArticles = async (start_cursor: string | null = null) => {
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
};
