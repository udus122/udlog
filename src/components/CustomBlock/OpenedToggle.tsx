import { generateBlockColorClass } from "@/libs/notion/utils";
import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "@/components/Notion/Block/RichText";
import type { BlockComponent } from "@/types";

export const OpenedToggle: BlockComponent<ToggleBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.toggle.color) ?? "";
  return (
    <details className={`${blockType}-container ${blockColor}`} open>
      <summary>
        <RichText rich_text={block.toggle.rich_text} />
      </summary>
      {children}
    </details>
  );
};
