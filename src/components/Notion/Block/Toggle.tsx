import { generateBlockColorClass } from "@/libs/notion/utils";
import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: ToggleBlockObjectResponse;
  children?: React.ReactNode;
};

export const Toggle: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.toggle.color);
  return (
    <details className={`${blockType}-container ${blockColor}`}>
      <summary>
        <RichText rich_text={block.toggle.rich_text} />
      </summary>
      {children}
    </details>
  );
};
