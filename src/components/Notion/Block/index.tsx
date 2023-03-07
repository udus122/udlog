import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { Code } from "./Code";
import { Heading1 } from "./Heading1";
import { Heading2 } from "./Heading2";
import { Heading3 } from "./Heading3";
import { Paragraph } from "./Paragraph";
import { Table } from "./Table";
import { Image } from "./Image";
import { Video } from "./Video";
import { BulletedListItem } from "./BulletedListItem";
import { NumberedListItem } from "./NumberedListItem";
import { Callout } from "./Callout";
import { Quote } from "./Quote";
import { ToDo } from "./ToDo";
import { Toggle } from "./Toggle";
import { Divider } from "./Divider";
import { ColumnList } from "./ColumnList";
import { Column } from "./Column";

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
      return (
        <NumberedListItem block={block} blocks={blocks}>
          {children}
        </NumberedListItem>
      );
    case "code":
      return <Code block={block} />;
    case "callout":
      return <Callout block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "to_do":
      return <ToDo block={block}>{children}</ToDo>;
    case "toggle":
      return <Toggle block={block}>{children}</Toggle>;
    case "divider":
      return <Divider block={block} />;
    case "column_list":
      return <ColumnList block={block}>{children}</ColumnList>;
    case "column":
      return <Column block={block}>{children}</Column>;
    case "table":
      return <Table block={block} />;
    default:
      console.warn(`Block ${block.type} not supported`);
      return null;
  }
}
