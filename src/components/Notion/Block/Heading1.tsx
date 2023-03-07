import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: Heading1BlockObjectResponse;
  children?: React.ReactNode;
};

export const Heading1: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_1.color);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_1.is_toggleable ? (
        <details id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <summary>
            <h1>
              <RichText rich_text={block.heading_1.rich_text} />
            </h1>
          </summary>
          <div className={`notion-toggle__children`}>{children}</div>
        </details>
      ) : (
        <h1 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={block.heading_1.rich_text} />
        </h1>
      )}
    </>
  );
};
