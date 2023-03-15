import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ArticlePageObjectResponse = PageObjectResponse & {
  properties: {
    "カテゴリ": Extract<PageObjectResponse["properties"][string], { type: "select" }>;
    "🏷️ タグ": Extract<PageObjectResponse["properties"][string], { type: "relation" }>;
    "Created": Extract<PageObjectResponse["properties"][string], { type: "created_time" }>;
    "Status": Extract<PageObjectResponse["properties"][string], { type: "status" }>;
    "Published": Extract<PageObjectResponse["properties"][string], { type: "date" }>;
    "Updated": Extract<PageObjectResponse["properties"][string], { type: "last_edited_time" }>;
    "super:Link": Extract<PageObjectResponse["properties"][string], { type: "url" }>;
    "Featured": Extract<PageObjectResponse["properties"][string], { type: "checkbox" }>;
    "Name": Extract<PageObjectResponse["properties"][string], { type: "title" }>;
  };
};
