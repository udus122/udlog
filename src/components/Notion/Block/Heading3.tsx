import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: Heading3BlockObjectResponse;
  children?: React.ReactNode;
};

export const Heading3: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_3.color);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_3.is_toggleable ? (
        <details id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <summary>
            <h3 className="inline-block">
              <RichText rich_text={block.heading_3.rich_text} />
            </h3>
          </summary>
          <div className={`notion-toggle__children`}>{children}</div>
        </details>
      ) : (
        <h3 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={block.heading_3.rich_text} />
        </h3>
      )}
    </>
  );
};
