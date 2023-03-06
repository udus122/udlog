import {
  Client,
  collectPaginatedAPI,
  isFullBlock,
  isFullPage,
} from "@notionhq/client";
import type {
  ListBlockChildrenParameters,
  RichTextItemResponse,
  GetDatabaseParameters,
  BlockObjectResponse,
  GetPageResponse,
  GetDatabaseResponse,
  QueryDatabaseResponse,
  QueryDatabaseParameters,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
// import type { ResolvedBlockObjectResponse } from "@/types";

export const notion = new Client({
  auth: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN,
});

/**
 * Block関連
 */

export async function collectBlockList(
  args: ListBlockChildrenParameters
): Promise<BlockObjectResponse[]> {
  const blockList = await collectPaginatedAPI(
    notion.blocks.children.list,
    args
  );
  const fullBlockList = blockList.filter(isFullBlock);
  return fullBlockList;
}

export async function resolveAllChildrenBlock(
  blockList: BlockObjectResponse[]
): Promise<BlockObjectResponse[]> {
  return await Promise.all(
    blockList.map(async (block) => {
      // FIXME: blockに必ずblock.typeプロパティが存在することを保証する方法が分からない
      // @ts-ignore
      if (block.has_children && !block[block.type].children) {
        const childrenBlocks = await collectBlockList({
          block_id: block.id,
        });
        // FIXME: blockに必ずblock.typeプロパティが存在することを保証する方法が分からない
        // @ts-ignore
        block[block.type].children = await resolveAllChildrenBlock(
          childrenBlocks
        );
        return block;
      }
      return block;
    })
  );
}

/**
 * Page関連
 */

export const getPage = async (page_id: string) =>
  await notion.pages.retrieve({ page_id });

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
  return fullPageList
}

/**
 * その他
 */

export function getPlainTextFromArrayOfRichText(
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
