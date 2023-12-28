"use server";

import {
  fetchBlockList,
  fetchDatabase,
  fetchPage,
} from "@udus/notion-renderer/libs";
import { cache } from "react";

import { client } from "@/client";
import { ARTICLE_DATABASE_ID } from "@/constants";

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

export const loadDatabase = cache(async () => {
  const databaseResult = await fetchDatabase(client, {
    database_id: ARTICLE_DATABASE_ID,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;
  return database;
});
