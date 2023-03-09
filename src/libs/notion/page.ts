import { notion } from "./notion";

import type { GetPageParameters } from "@notionhq/client/build/src/api-endpoints";

/**
 * Page関連
 */

export const retrievePage = async (args: GetPageParameters) =>
  await notion.pages.retrieve(args);
