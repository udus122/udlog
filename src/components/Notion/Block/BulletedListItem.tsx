import { generateBlockColorClass } from "@/libs/notion/utils";
import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: BulletedListItemBlockObjectResponse;
  children?: React.ReactNode;
};

export const BulletedListItem: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.bulleted_list_item.color);
  return (
    <ul className="notion_bulleted_list_container">
      <li className={`${blockType} ${blockColor}`}>
        <RichText rich_text={block.bulleted_list_item.rich_text} />
      </li>
      {children}
    </ul>
  );
};
