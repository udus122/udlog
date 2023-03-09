import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import { Togglable } from "./Togglable";
import type { BlockComponent } from "@/types";

export const Heading3: BlockComponent<Heading3BlockObjectResponse> = ({
  block,
  children,
}) => {
  const richText = block.heading_3.rich_text;
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_3.color) ?? "";
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_3.is_toggleable ? (
        <Togglable
          id={block.id}
          className={`heading ${blockType} ${blockColor}`}
          summary={
            <h3 className="inline-block">
              <RichText rich_text={richText} />
            </h3>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h3 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={richText} />
        </h3>
      )}
    </>
  );
};
