import { isFullPage } from "@notionhq/client";
import type {
  RichTextItemResponse,
  GetPageResponse,
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
