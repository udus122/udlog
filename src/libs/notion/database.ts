import { collectPaginatedAPI, isFullPage } from "@notionhq/client";
import { notion } from "./notion";

import type {
  GetDatabaseParameters,
  GetDatabaseResponse,
  QueryDatabaseParameters,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Database関連
 */

export async function retrieveDatabase(
  args: GetDatabaseParameters
): Promise<GetDatabaseResponse> {
  return await notion.databases.retrieve(args);
}

export async function collectQueryDatabase(
  args: QueryDatabaseParameters
): Promise<PageObjectResponse[]> {
  const pageList = await collectPaginatedAPI(notion.databases.query, args);
  const fullPageList = pageList.filter(isFullPage);
  return fullPageList;
}
