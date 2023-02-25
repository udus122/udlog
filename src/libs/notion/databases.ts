import { collectPaginatedAPI } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "./client";

/**
 * Databaseの情報のみを取得
 * @param database_id DatabaseのID
 */
export const getDatabase = (database_id: string) =>
  notion.databases.retrieve({ database_id });

/**
 * Databaseの中身を取得
 * @param params QueryDatabaseParameters
 */
export const getDatabaseContents = (params: QueryDatabaseParameters) =>
  notion.databases.query(params);

/**
 * Databaseの中身をすべて取得
 * @param params QueryDatabaseParameters
 */
export const getDatabaseContentsAll = async (
  params: QueryDatabaseParameters
) => {
  return collectPaginatedAPI(getDatabaseContents, params)
};

/* DBの作成と編集はSDKには存在しない（APIはある） */
/* https://developers.notion.com/reference/database */
