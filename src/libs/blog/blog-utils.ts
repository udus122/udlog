import { addDashesToUUID, extractNotionIdfromUrl } from "@/libs/notion/id";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function pageIdToBlogUrl(
  id: string,
  prefix: string | undefined = undefined
): string {
  if (!prefix) {
    return `/${id}`;
  }
  return `/${prefix}/${id}`;
}

export function parseLinkUrl(url: string) {
  const notionId = extractNotionIdfromUrl(url);
  if (notionId) {
    const pageId = addDashesToUUID(notionId);
    const blogUrl = pageIdToBlogUrl(pageId ?? "");
    return blogUrl;
  }
  return url;
}

function blockFilterFn(block: BlockObjectResponse) {
  // @ts-ignore
  return block[block.type].color !== "gray_background";
}

export function filterGrayBackgroundBlock(blockList: BlockObjectResponse[]) {
  return blockList.filter(blockFilterFn).map((block) => {
    // @ts-ignore
    if (Array.isArray(block[block.type].children)) {
      // @ts-ignore
      block[block.type].children =
        // @ts-ignore
        block[block.type].children.filter(blockFilterFn);
    }
    return block;
  });
}
