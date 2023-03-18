import { Block } from "./Block";
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type {
  BlockComponentMapper,
  BlockListComponentProps,
  BulletedListType,
  ListWrapperObject,
  NumberedListType,
} from "@/types";

// TODO: リファクタリング

const BULLETED_LIST = "bulleted_list";
const NUMBERED_LIST = "numbered_list";

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

      if (isBulletedListItem(block) && !isBulletedList(prevItem)) {
        // 1番目のバレットリストアイテムの処理
        const listItem: BulletedListType = {
          type: BULLETED_LIST,
          items: [block],
        };
        return arr.concat(listItem);
      }
      if (isNumberedListItem(block) && !isNumberedList(prevItem)) {
        // 1番目のナンバーリストアイテムの処理
        const listItem: NumberedListType = {
          type: NUMBERED_LIST,
          items: [block],
        };
        return arr.concat(listItem);
      }
      // 2番目以降のリストアイテムの処理

      // 今のblockがリストアイテム かつ 前のブロックもリストアイテムの場合は、前のリストラッパーのitemsにアイテムを追加する
      // @ts-ignore
      prevItem.items.push(block);
      // 今回のアイテムは連結せずに返す(=スキップする)
      return arr;
    },
    []
  );
};
export const ListWrapper: React.FC<BlockListComponentProps> = function ({
  blocks,
  mapper,
}) {
  const blockList = wrapitems(blocks);
  return (
    <>
      {blockList &&
        blockList.map((block, i) => {
          return (
            // @ts-ignore
            <Block key={i} block={block} blocks={blockList} mapper={mapper} />
          );
        })}
    </>
  );
};
