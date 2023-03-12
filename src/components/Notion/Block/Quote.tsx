import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const Quote: BlockComponent<QuoteBlockObjectResponse> = ({ block }) => {
  const blockColor = generateBlockColorClass(block.quote.color);
  return (
    <blockquote id={block.id} className={clsx("notion_block", "notion_quote", blockColor)}>
      <RichText richText={block.quote.rich_text} />
    </blockquote>
  );
};
