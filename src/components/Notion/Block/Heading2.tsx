import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";
import clsx from "clsx";

// TODO: h2タグの部分を共通化する
// TODO: mapperで差し替えることができるようにする。
export const Heading2: BlockComponent<Heading2BlockObjectResponse> = ({
  block,
  children,
  mapper,
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable;

  const richText = block.heading_2.rich_text;
  const className = clsx(
    "notion_block",
    "notion_heading",
    `notion_${block.type}`
  );
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_2.is_toggleable ? (
        <Togglable
          block={block}
          summary={
            <h2 id={block.id} className={className}>
              <a href={`#${block.id}`}>
                <RichText richText={richText} />
              </a>
            </h2>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h2 id={block.id} className={className}>
          <a href={`#${block.id}`}>
            <RichText richText={richText} />
          </a>
        </h2>
      )}
    </>
  );
};
