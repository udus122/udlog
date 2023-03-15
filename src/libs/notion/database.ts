import {
  collectPaginatedAPI,
  isFullDatabase,
  isFullPage,
} from "@notionhq/client";
import { notion } from "./notion";

import type {
  GetDatabaseParameters,
  QueryDatabaseParameters,
  PageObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Database関連
 */

export async function retrieveDatabase(
  args: GetDatabaseParameters
): Promise<DatabaseObjectResponse> {
  const response = await notion.databases.retrieve(args);
  if (!isFullDatabase(response)) {
    throw new Error("Retrieved database is partial.");
  }
  return response;
}

export async function collectQueryDatabase(
  args: QueryDatabaseParameters
): Promise<PageObjectResponse[]> {
  const pageList = await collectPaginatedAPI(notion.databases.query, args);
  const fullPageList = pageList.filter(isFullPage);
  return fullPageList;
}
