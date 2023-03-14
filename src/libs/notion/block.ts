import { collectPaginatedAPI, isFullBlock } from "@notionhq/client";

import { notion } from "./notion";

import type {
  ListBlockChildrenParameters,
  BlockObjectResponse,
  GetBlockParameters,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Block関連
 */

export async function retrieveBlock(
  args: GetBlockParameters
): Promise<BlockObjectResponse> {
  const res = await notion.blocks.retrieve(args);
  if (!isFullBlock(res)) {
    throw new Error("Retrieved block is p artial.");
  }
  return res;
}

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

export async function resolveChildrenBlock<T extends BlockObjectResponse>(
  block: T
): Promise<T> {
  if (block.type === "synced_block" && block.synced_block.synced_from) {
    const originalBlocks = await collectBlockList({
      block_id: block.synced_block.synced_from.block_id,
    });
    const resolvedBlocks = await resolveAllChildrenBlock(originalBlocks);
    // NOTE: 他のBlockの書式に合わせてここにchildrenを追加する
    // @ts-ignore
    block.synced_block.children = resolvedBlocks;
  }
  // FIXME: blockに必ずblock.typeプロパティが存在することを保証する方法が分からない
  // @ts-ignore
  if (block.has_children && !block[block.type].children) {
    const childrenBlocks = await collectBlockList({
      block_id: block.id,
    });
    // @ts-ignore
    block[block.type].children = await resolveAllChildrenBlock(childrenBlocks);
    return block;
  }
  // childrenを持たない or すでに持っている場合は何もせずにそのまま返す
  return block;
}

export async function resolveAllChildrenBlock(
  blockList: BlockObjectResponse[]
): Promise<BlockObjectResponse[]> {
  return await Promise.all(
    blockList.map(async (block) => {
      return await resolveChildrenBlock(block);
    })
  );
}
