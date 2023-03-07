import { generateBlockColorClass } from "@/libs/notion/utils";
import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: CalloutBlockObjectResponse;
};

export const Callout: React.FC<Props> = ({ block }) => {
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
