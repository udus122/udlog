import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { Code } from "./Code";
import { Heading1 } from "./Heading1";
import { Heading2 } from "./Heading2";
import { Heading3 } from "./Heading3";
import { Paragraph } from "./Paragraph";
import { RichText } from "./RichText";
import { Table } from "./Table";
import { Image } from "./Image";
import { Video } from "./Video";
import { BulletedListItem } from "./BulletedListItem";

export function Block({
  block,
  blocks,
}: {
  block: BlockObjectResponse;
  blocks: BlockObjectResponse[];
}) {
  let children: React.ReactNode[] | undefined;
  // Table blocks are handled a bit differently. See Table.tsx
  if (block.has_children && block.type !== "table") {
    // @ts-ignore Notion types are incorrect
    const childBlocks = block[block.type].children;
    children = childBlocks?.map((child: BlockObjectResponse) => {
      if (child) {
        return <Block block={child} key={child.id} blocks={blocks} />;
      } else {
        return null;
      }
    });
  }
  switch (block.type) {
    case "heading_1":
      return <Heading1 block={block}>{children}</Heading1>;
    case "heading_2":
      return <Heading2 block={block}>{children}</Heading2>;
    case "heading_3":
      return <Heading3 block={block}>{children}</Heading3>;
    case "paragraph":
      return <Paragraph block={block}>{children}</Paragraph>;
    case "image":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image block={block} />;
    case "video":
      return <Video block={block} />;
    case "bulleted_list_item":
      return <BulletedListItem block={block}>{children}</BulletedListItem>;
    case "numbered_list_item":
      const itemPosition = blocks?.findIndex(
        (blocksBlock) => block.id === blocksBlock.id
      );
      // Count backwards to find the number of numbered_list_item blocks before hitting a non-numbered_list_item block
      // Notions API does not give any information about the position of the block in the list so we need to calculate it
      let listNumber = 0;
      for (let i = itemPosition; i >= 0; i--) {
        let blocksBlock = blocks[i] as BlockObjectResponse;
        if (blocksBlock.type === "numbered_list_item") {
          listNumber++;
        } else {
          break;
        }
      }
      return (
        <ol start={listNumber} className="notion_numbered_list_container">
          <li className={`notion_${block.type}`}>
            <RichText rich_text={block.numbered_list_item.rich_text} />
          </li>
          {children}
        </ol>
      );
    case "code":
      return (
        <div className={`notion_${block.type}`}>
          <Code
            text={block.code.rich_text[0].plain_text}
            language={"javascript"}
          />
          {block.code.caption && (
            <span className="notion_caption">
              <RichText rich_text={block.code.caption} />
            </span>
          )}
        </div>
      );
    case "callout":
      return (
        <div className={`notion_${block.type}`}>
          <div className="notion_callout_emoji">
            {block.callout.icon?.type === "emoji"
              ? block.callout.icon.emoji
              : ""}
          </div>
          <div className="notion_callout_text">
            <RichText rich_text={block.callout.rich_text} />
          </div>
        </div>
      );
    case "column_list":
      return <div className={`notion_${block.type}`}>{children}</div>;
    case "column":
      return <div className={`notion_${block.type}`}>{children}</div>;
    case "quote":
      return (
        <blockquote className={`notion_${block.type}`}>
          <RichText rich_text={block.quote.rich_text} />
        </blockquote>
      );
    case "divider":
      return <hr className="notion_divider" />;
    case "to_do":
      return (
        <div className={`notion_${block.type}_container`}>
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className={`notion_${block.type}`}
          />
          <RichText rich_text={block.to_do.rich_text} />
        </div>
      );
    case "toggle":
      return (
        <details className={`notion_${block.type}_container`}>
          <summary>
            <RichText rich_text={block.toggle.rich_text} />
          </summary>
          {children}
        </details>
      );
    case "table":
      return <Table block={block} />;

    default:
      return <div>Block {block.type} not supported</div>;
  }
}
