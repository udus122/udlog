import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable } from "./Togglable";

export const Heading1: BlockComponent<Heading1BlockObjectResponse> = ({
  block,
  children,
}) => {
  const richText = block.heading_1.rich_text;
  const blockType = `notion_${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_1.color);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_1.is_toggleable ? (
        <Togglable
          id={block.id}
          className={`heading ${blockType} ${blockColor}`}
          summary={
            <h1 className="inline-block">
              <RichText rich_text={richText} />
            </h1>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h1 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={richText} />
        </h1>
      )}
    </>
  );
};
