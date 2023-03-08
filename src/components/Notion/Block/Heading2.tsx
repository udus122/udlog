import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import { Togglable } from "./Togglable";
import type { BlockComponent } from "@/types";

export const Heading2: BlockComponent<Heading2BlockObjectResponse> = ({ block, children }) => {
  const richText = block.heading_2.rich_text
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_2.color);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_2.is_toggleable ? (
        <Togglable
        id={block.id}
        className={`heading ${blockType} ${blockColor}`}
        summary={
          <h2 className="inline-block">
            <RichText rich_text={richText} />
          </h2>
        }
      >
        {children}
      </Togglable>
      ) : (
        <h2 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={richText} />
        </h2>
      )}
    </>
  );
};
