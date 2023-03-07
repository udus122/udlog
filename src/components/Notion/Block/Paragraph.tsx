import { generateBlockColorClass } from "@/libs/notion/utils";
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = React.ComponentProps<"main"> & {
  block: ParagraphBlockObjectResponse;
  children?: React.ReactNode;
};

export const Paragraph: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.paragraph.color);
  return (
    <div id={block.id}>
      <p className={`${blockType} ${blockColor}`}>
        <RichText rich_text={block.paragraph.rich_text} />
      </p>
      <div className={`${blockType}__children pl-4`}>{children}</div>
    </div>
  );
};
