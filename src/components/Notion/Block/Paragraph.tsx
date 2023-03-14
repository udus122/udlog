import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import { clsx } from "clsx";

export const Paragraph: BlockComponent<ParagraphBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = "notion_paragraph";
  const blockColor = generateBlockColorClass(block.paragraph.color);
  return (
    <div id={block.id} className={clsx("notion_block", blockType, blockColor)}>
      <p>
        <RichText richText={block.paragraph.rich_text} />
      </p>
      <div className={`${blockType}__children`}>{children}</div>
    </div>
  );
};
