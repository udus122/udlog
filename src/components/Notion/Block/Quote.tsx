import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const Quote: BlockComponent<QuoteBlockObjectResponse> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.quote.color);
  return (
    <blockquote className={`${blockType} ${blockColor}`}>
      <RichText rich_text={block.quote.rich_text} />
    </blockquote>
  );
};
