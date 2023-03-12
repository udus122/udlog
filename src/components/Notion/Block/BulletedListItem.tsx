import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const BulletedListItem: BlockComponent<
  BulletedListItemBlockObjectResponse
> = ({ block, children }) => {
  const blockColor = generateBlockColorClass(block.bulleted_list_item.color);
  return (
    <ul id={block.id} className={clsx("notion_block", "notion_bulleted_list", blockColor)}>
      <li className="notion_bulleted_list_item">
        <RichText richText={block.bulleted_list_item.rich_text} />
      </li>
      {children}
    </ul>
  );
};
