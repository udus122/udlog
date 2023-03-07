import { generateBlockColorClass } from "@/libs/notion/utils";
import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: QuoteBlockObjectResponse;
};

export const Quote: React.FC<Props> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.quote.color);
  return (
    <blockquote className={`${blockType} ${blockColor}`}>
      <RichText rich_text={block.quote.rich_text} />
    </blockquote>
  );
};
