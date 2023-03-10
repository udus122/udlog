import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";
import clsx from "clsx";

export const Heading2: BlockComponent<Heading2BlockObjectResponse> = ({
  block,
  children,
  mapper,
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable;

  const richText = block.heading_2.rich_text;
  const className = clsx("notion_heading", `notion_${block.type}`);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_2.is_toggleable ? (
        <Togglable
          block={block}
          summary={
            <h2 className={className}>
              <RichText rich_text={richText} />
            </h2>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h2 id={block.id} className={className}>
          <RichText rich_text={richText} />
        </h2>
      )}
    </>
  );
};
