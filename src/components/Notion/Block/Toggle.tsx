import { generateBlockColorClass } from "@/libs/notion/utils";
import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable } from "./Togglable";

export const Toggle: BlockComponent<ToggleBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.toggle.color) ?? "";
  return (
    <Togglable
      className={`${blockType}-container ${blockColor}`}
      summary={<RichText rich_text={block.toggle.rich_text} />}
    >
      {children}
    </Togglable>
  );
};
