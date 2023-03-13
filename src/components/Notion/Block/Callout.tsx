import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const Callout: BlockComponent<CalloutBlockObjectResponse> = ({
  block, children
}) => {
  const blockType = "notion_callout";
  const blockColor = generateBlockColorClass(block.callout.color) ?? "";
  return (
    <div id={block.id} className={clsx("notion_block", blockType, blockColor)}>
      <div className={clsx(`${blockType}__icon`)}>
      <span className={clsx("notion_icon")}>
        {block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : ""}
      </span>
      </div>
      <div className={clsx(`${blockType}__content`)}>
      <span >
        <RichText richText={block.callout.rich_text} />
      </span>
      {children}
      </div>
    </div>
  );
};
