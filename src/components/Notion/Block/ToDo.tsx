import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const ToDo: BlockComponent<ToDoBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.to_do.color) ?? '';
  return (
    // TODO: BulletedListやNumberedListのようにネストさせる
    <div className={`${blockType}_container ${blockColor}`}>
      <input
        type="checkbox"
        checked={block.to_do.checked}
        readOnly
        className={`${blockType}`}
      />
      <RichText rich_text={block.to_do.rich_text} />
      {children}
    </div>
  );
};
