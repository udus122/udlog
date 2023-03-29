import { ARTICLE_DB_FILTER, REFERENCE_DB_FILTER } from "@/constants";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { collectQueryDatabase, retrieveFullDatabase } from "../notion/database";

export async function retrieveArticleDB() {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";
  return await retrieveFullDatabase({
    database_id: ARTICLE_DB_ID,
  }) as DatabaseObjectResponse
}

export async function collectArticles() {
  // TODO: 将来的に開発環境と本番環境で処理を切り替える
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";
  return await collectQueryDatabase({
    database_id: ARTICLE_DB_ID,
    filter: ARTICLE_DB_FILTER,
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: 10,
  });
}

export async function retrieveReferenceDB() {
  const REFERENCE_DATABASE_ID = process.env.NOTION_REFERENCE_DATABASE_ID ?? "";
  return await retrieveFullDatabase({
    database_id: REFERENCE_DATABASE_ID,
  }) as DatabaseObjectResponse
}

export async function collectReferences() {
  // TODO: 将来的に開発環境と本番環境で処理を切り替える
  const REFERENCE_DATABASE_ID = process.env.NOTION_REFERENCE_DATABASE_ID ?? "";
  return await collectQueryDatabase({
    database_id: REFERENCE_DATABASE_ID,
    filter: REFERENCE_DB_FILTER,
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });
}
