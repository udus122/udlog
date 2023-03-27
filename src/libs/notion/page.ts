import { isFullPage } from "@notionhq/client";
import { notion } from "./notion";

import {
  GetPageParameters,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { collectBlockList } from "./block";

/**
 * Page関連
 */

export const retrieveFullPage = async (
  args: GetPageParameters
): Promise<PageObjectResponse | void> => {
  try {
    const pageObject = await notion.pages.retrieve(args);
    if (!isFullPage(pageObject)) {
      throw new Error("PartialPageObjectResponse was retrieved.");
    }
    return pageObject;
  } catch (error) {
    console.error(error);
  }
};

export async function traverseChildPages(
  page: PageObjectResponse
): Promise<PageObjectResponse[]> {
  const pageContents = (await collectBlockList({ block_id: page.id })) ?? [];
  const childPageBlocks = pageContents.filter(
    (block) => block.type === "child_page"
  );
  // 取得した子ページを格納するための配列
  let childPages: PageObjectResponse[] = [];

  // 子ページのブロックを処理する
  for (const block of childPageBlocks) {
    // 子ページブロックの場合は、再帰的に子ページを取得する
    const page = await retrieveFullPage({
      page_id: block.id,
    });
    if (!page) {
      throw new Error("page is void");
    }
    childPages = childPages.concat(page);

  }
  // 取得した子ページを返す
  return childPages;
}
