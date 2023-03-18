import { isFullPage } from "@notionhq/client";
import type {
  RichTextItemResponse,
  GetPageResponse,
  PageObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * その他
 */

export function getPlainTextFromRichText(
  RichTextItemResponseArray: Array<RichTextItemResponse>
): string {
  return RichTextItemResponseArray.reduce((prev, curr) => {
    prev += curr.plain_text;
    return prev;
  }, "");
}

export function extractTitleFromPageOrDatabase(
  page: PageObjectResponse | DatabaseObjectResponse
): string {
  // DatabaseObject
  if ("title" in page) {
    return getPlainTextFromRichText(page.title);
  }
  // PageObject
  const titleProperty = Object.values(page.properties).find(
    (
      property
    ): property is Extract<
      PageObjectResponse["properties"][string],
      { type: "title" }
    > => property.type === "title"
  );
  if (titleProperty?.title) {
    return getPlainTextFromRichText(titleProperty?.title);
  }
  throw new Error("title is not found.");
}

export function extractlastEditedTimeFromPage(page: PageObjectResponse): Date {
  const lastEditedTimeProperty = Object.values(page.properties).find(
    (
      property
    ): property is Extract<
      PageObjectResponse["properties"][string],
      { type: "last_edited_time" }
    > => property.type === "last_edited_time"
  );
  if (lastEditedTimeProperty?.last_edited_time) {
    return new Date(lastEditedTimeProperty?.last_edited_time);
  }
  throw new Error("last_edited_time is not found.");
}

export const extractCoverFromPage = (page: GetPageResponse) => {
  if (!isFullPage(page)) {
    console.log(`page ${page.id} is Partial.`);
    return null;
  }
  if (page.cover === null) {
    return null;
  }
  if (page.cover.type === "external") {
    return page.cover.external;
  }
  if (page.cover.type === "file") {
    return page.cover.file;
  }
  return null;
};

export function generateBlockColorClass(notionColor: string): string {
  return `color_${notionColor}`;
}
