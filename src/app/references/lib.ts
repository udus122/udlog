"use server";

import { fetchDatabaseItems } from "@udus/notion-renderer/libs";
import { cache } from "react";

import { client } from "@/client";
import { REFERENCE_DATABASE_ID } from "@/constants";

export const loadReferences = cache(
  async (start_cursor: string | null = null) => {
    const { ok, data } = await fetchDatabaseItems(client, {
      database_id: REFERENCE_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Type",
            select: { equals: "Book" },
          },
        ],
      },
      page_size: 50,
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
