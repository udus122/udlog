import { fetchBlockList, fetchPage } from "@udus/notion-renderer/libs";
import { cache } from "react";

import { withCache } from "@/cache";
import { client } from "@/client";

export const getBlocks = cache(async (args: string) => {
  const result = await withCache((args: Parameters<typeof fetchBlockList>[1]) =>
    fetchBlockList(client, args)
  )({ block_id: args });
  return result.ok ? result.data : undefined;
});

export const getPage = cache(async (args: string) => {
  const result = await withCache((args: Parameters<typeof fetchPage>[1]) =>
    fetchPage(client, args)
  )({ page_id: args });
  return result.ok ? result.data : undefined;
});
