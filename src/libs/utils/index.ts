import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export function getPlainTextFromArrayOfRichText(
  RichTextItemResponseArray: Array<RichTextItemResponse>
): string {
  return RichTextItemResponseArray.reduce((prev, curr) => {
    prev += curr.plain_text;
    return prev;
  }, "");
}
