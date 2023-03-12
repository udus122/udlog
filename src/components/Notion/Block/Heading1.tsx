import { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";
import clsx from "clsx";

// TODO: h1タグの部分を共通化する
// TODO: mapperで差し替えることができるようにする。
export const Heading1: BlockComponent<Heading1BlockObjectResponse> = ({
  block,
  children,
  mapper,
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable;

  const richText = block.heading_1.rich_text;
  const className = clsx(
    "notion_block",
    "notion_heading",
    `notion_${block.type}`
  );
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_1.is_toggleable ? (
        <Togglable
          block={block}
          summary={
            <h1 id={block.id} className={className}>
              <a href={`#${block.id}`}>
                <RichText richText={richText} />
              </a>
            </h1>
          }
        >
          {children}
        </Togglable>
      ) : (
        <h1 id={block.id} className={className}>
          <a href={`#${block.id}`}>
            <RichText richText={richText} />
          </a>
        </h1>
      )}
    </>
  );
};
