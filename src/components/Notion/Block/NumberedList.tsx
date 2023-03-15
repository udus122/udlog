import clsx from "clsx";
import { BlockList } from "../BlockList";
import { NumberedListItem } from "./NumberedListItem";

import type { BlockComponentMapper, BlockObject, NumberedListType } from "@/types";

export const NumberedList = ({
  block,
  blocks,
  mapper
}: {
  block: NumberedListType;
  blocks: BlockObject;
  mapper: BlockComponentMapper;
}) => {
  return (
    <ul className={clsx("notion_block", "notion_numbered_list")}>
      {block.items.map((item) => {
        return (
          <NumberedListItem key={item.id} block={item}>
            <BlockList blocks={item[item.type].children} mapper={mapper} />
          </NumberedListItem>
        );
      })}
    </ul>
  );
};
