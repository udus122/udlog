import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const BulletedListItem: BlockComponent<
  BulletedListItemBlockObjectResponse
> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.bulleted_list_item.color) ?? "";
  return (
    <ul className="notion_bulleted_list_container">
      <li className={`${blockType} ${blockColor}`}>
        <RichText rich_text={block.bulleted_list_item.rich_text} />
      </li>
      {children}
    </ul>
  );
};
