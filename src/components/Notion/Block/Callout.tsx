import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const Callout: BlockComponent<CalloutBlockObjectResponse> = ({
  block,
}) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.callout.color);
  return (
    <div className={`${blockType} ${blockColor}`}>
      <span className={`${blockType}-emoji`}>
        {block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : ""}
      </span>
      <span className="notion-callout-text">
        <RichText rich_text={block.callout.rich_text} />
      </span>
    </div>
  );
};
