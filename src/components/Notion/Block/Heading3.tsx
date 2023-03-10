import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";
import clsx from "clsx";

export const Heading3: BlockComponent<Heading3BlockObjectResponse> = ({
  block,
  children,
  mapper,
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable;

  const richText = block.heading_3.rich_text;
  const className = clsx("notion_heading", `notion_${block.type}`);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_3.is_toggleable ? (
        <Togglable
          block={block}
          summary={
            <h3 className={className}>
              <RichText rich_text={richText} />
            </h3>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h3 id={block.id} className={className}>
          <RichText rich_text={richText} />
        </h3>
      )}
    </>
  );
};
