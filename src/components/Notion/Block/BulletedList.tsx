import clsx from "clsx";
import { BlockList } from "../BlockList";
import { BulletedListItem } from "./BulletedListItem";

import type { BlockComponentMapper, BlockObject, BulletedListType } from "@/types";

export const BulletedList = ({
  block,
  blocks,
  mapper
}: {
  block: BulletedListType;
  blocks: BlockObject;
  mapper: BlockComponentMapper;
}) => {
  return (
    <ul className={clsx("notion_block", "notion_bulleted_list")}>
      {block.items.map((item) => {
        return (
          <BulletedListItem key={item.id} block={item}>
            <BlockList blocks={item[item.type].children} mapper={mapper} />
          </BulletedListItem>
        );
      })}
    </ul>
  );
};
