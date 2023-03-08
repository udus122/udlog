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
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type BlockComponentProps = {
  block: BlockObjectResponse;
  blocks?: BlockObjectResponse[]
  children?: React.ReactNode;
};

type BlockComponent = React.FC<BlockComponentProps>

export type BlockComponentMapper = {
  "bookmark"?: BlockComponent;
  "breadcrumb"?: BlockComponent;
  "bulleted_list_item"?: BlockComponent;
  "callout"?: BlockComponent;
  "child_database"?: BlockComponent;
  "child_page"?: BlockComponent;
  "column"?: BlockComponent;
  "column_list"?: BlockComponent;
  "divider"?: BlockComponent;
  "embed"?: BlockComponent;
  "equation"?: BlockComponent;
  "file"?: BlockComponent;
  "heading_1"?: BlockComponent;
  "heading_2"?: BlockComponent;
  "heading_3"?: BlockComponent;
  "image"?: BlockComponent;
  "link_preview"?: BlockComponent;
  "link_to_page"?: BlockComponent;
  "numbered_list_item"?: BlockComponent;
  "paragraph"?: BlockComponent;
  "pdf"?: BlockComponent;
  "quote"?: BlockComponent;
  "synced_block"?: BlockComponent;
  "table"?: BlockComponent;
  "table_of_contents"?: BlockComponent;
  "table_row"?: BlockComponent;
  "template"?: BlockComponent;
  "to_do"?: BlockComponent;
  "toggle"?: BlockComponent;
  "unsupported"?: BlockComponent;
  "video"?: BlockComponent;
};

export const defaultMapper = {
  heading_1: Heading1,
  heading_2: Heading2,
  heading_3: Heading3,
  paragraph: Paragraph,
  image: Image,
  video: Video,
  bulleted_list_item: BulletedListItem,
  numbered_list_item: NumberedListItem,
  code: Code,
  callout: Callout,
  quote: Quote,
  to_do: ToDo,
  toggle: Toggle,
  divider: Divider,
  column: Column,
  column_list: ColumnList,
  table: Table,
};
