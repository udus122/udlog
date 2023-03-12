import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";
import clsx from "clsx";

// TODO: h3タグの部分を共通化する
// TODO: mapperで差し替えることができるようにする。
export const Heading3: BlockComponent<Heading3BlockObjectResponse> = ({
  block,
  children,
  mapper,
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable;

  const richText = block.heading_3.rich_text;
  const className = clsx(
    "notion_block",
    "notion_heading",
    `notion_${block.type}`
  );
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_3.is_toggleable ? (
        <Togglable
          block={block}
          summary={
            <h3 id={block.id} className={className}>
              <a href={`#${block.id}`}>
                <RichText richText={richText} />
              </a>
            </h3>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h3 id={block.id} className={className}>
          <a href={`#${block.id}`}>
            <RichText richText={richText} />
          </a>
        </h3>
      )}
    </>
  );
};
