import { Block } from "./Block";
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponentMapper, BulletedListType, ListWrapperObject, NumberedListType } from "@/types";

// TODO: リファクタリング

const BULLETED_LIST = "bulleted_list"
const NUMBERED_LIST = "numbered_list"

const isBulletedListItem = (
  block: BlockObjectResponse | ListWrapperObject
): block is BulletedListItemBlockObjectResponse =>
  block?.type === "bulleted_list_item";
const isNumberedListItem = (
  block: BlockObjectResponse | ListWrapperObject
): block is NumberedListItemBlockObjectResponse =>
  block?.type === "numbered_list_item";
const isBulletedList = (block: BlockObjectResponse | ListWrapperObject) => {
  return block?.type ? block?.type === BULLETED_LIST : false;
};
const isNumberedList = (block: BlockObjectResponse | ListWrapperObject) => {
  return block?.type ? block?.type === NUMBERED_LIST : false;
};

const wrapitems = (blocks: Array<BlockObjectResponse> | undefined) => {
  if (!blocks) return [];
  return blocks.reduce(
    (
      arr: Array<BlockObjectResponse | ListWrapperObject>,
      block: BlockObjectResponse
    ) => {
      // 今のブロックが非リストの場合は、何もせずにそのまま連結する
      if (!isBulletedListItem(block) && !isNumberedListItem(block)) {
        return arr.concat(block);
      }

      const prevItem = arr[arr.length - 1];
      // BlockがList&prevBlockがBlockと異なる種類のリストラッパーの場合、ListWrapperで包んで返す
      if (isNumberedListItem(block) && !isNumberedList(prevItem)) {
        const listItem: NumberedListType = {
          type: NUMBERED_LIST,
          items: [block],
        };
        return arr.concat(listItem);
      }
      if (isBulletedListItem(block) && !isBulletedList(prevItem)) {
        const listItem: BulletedListType = {
          type: BULLETED_LIST,
          items: [block],
        };
        return arr.concat(listItem);
      }
      // 今のblockがリストアイテム かつ 前のブロックもリストアイテムの場合は、前のリストラッパーのitemsにアイテムを追加する
      prevItem.items.push(block);
      // 今回のアイテムは連結せずに返す(=スキップする)
      return arr;
    },
    []
  );
};

type Props = {
  blocks: BlockObjectResponse[] | undefined;
  mapper: BlockComponentMapper;
};

export const BlockList: React.FC<Props> = function ({ blocks, mapper }) {
  const blockList = wrapitems(blocks);
  return (
    <>
      {blockList &&
        blockList.map((block, i) => {
          return (
            <Block key={i} block={block} blocks={blockList} mapper={mapper} />
          );
        })}
    </>
  );
};
