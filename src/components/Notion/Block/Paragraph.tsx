import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const Paragraph: BlockComponent<ParagraphBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion_${block.type}`;
  const blockColor = generateBlockColorClass(block.paragraph.color) ?? "";
  return (
    <div id={block.id}>
      <p className={`${blockType} ${blockColor}`}>
        <RichText rich_text={block.paragraph.rich_text} />
      </p>
      <div className={`${blockType}__children`}>{children}</div>
    </div>
  );
};
