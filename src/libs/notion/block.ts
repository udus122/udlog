import { collectPaginatedAPI, isFullBlock } from "@notionhq/client";

import { notion } from "./notion";

import type {
  ListBlockChildrenParameters,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
