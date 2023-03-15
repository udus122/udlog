import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const NumberedListItem: BlockComponent<
  NumberedListItemBlockObjectResponse
> = ({ block, blocks, children }) => {
  const blockColor = generateBlockColorClass(block.numbered_list_item.color);
  return (
    <li
      id={block.id}
      className={clsx("notion_block", "notion_numbered_list_item", blockColor)}
    >
      <RichText richText={block.numbered_list_item.rich_text} />
      {children}
    </li>
  );
};
