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
import { BlockComponentMapper } from "@/types";
import { BlockEquation } from "./Equation";
import { Bookmark } from "./Bookmark";
import { Embed } from "./Embed";
import { SyncedBlock } from "./SyncedBlock";
import { TableOfContents } from "./TableOfContents";
import { BulletedList } from "./BulletedList";
import { NumberedList } from "./NumberedList";
import { ListWrapper } from "../ListWrapper";

export const defaultMapper: BlockComponentMapper = {
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
  equation: BlockEquation,
  bookmark: Bookmark,
  embed: Embed,
  synced_block: SyncedBlock,
  table_of_contents: TableOfContents,
  table: Table,
  bulleted_list: BulletedList,
  numbered_list: NumberedList,
  list_wrapper: ListWrapper,
};
