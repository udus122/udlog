import type {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  QuoteBlockObjectResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
  TemplateBlockObjectResponse,
  SyncedBlockBlockObjectResponse,
  ChildPageBlockObjectResponse,
  ChildDatabaseBlockObjectResponse,
  EquationBlockObjectResponse,
  CodeBlockObjectResponse,
  CalloutBlockObjectResponse,
  DividerBlockObjectResponse,
  BreadcrumbBlockObjectResponse,
  TableOfContentsBlockObjectResponse,
  ColumnListBlockObjectResponse,
  ColumnBlockObjectResponse,
  LinkToPageBlockObjectResponse,
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
  EmbedBlockObjectResponse,
  BookmarkBlockObjectResponse,
  ImageBlockObjectResponse,
  VideoBlockObjectResponse,
  PdfBlockObjectResponse,
  FileBlockObjectResponse,
  AudioBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
  UnsupportedBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type BlockComponentProps<T extends BlockObjectResponse> = {
  block: T;
  blocks?: BlockObjectResponse[];
  children?: React.ReactNode;
  mapper?: BlockComponentMapper;
};

export type BlockComponent<T extends BlockObjectResponse> = React.FC<
  BlockComponentProps<T>
>;

import type { TogglableProps } from "@/components/Notion/Block/Togglable";

export type BlockComponentMapper = {
  audio?: BlockComponent<AudioBlockObjectResponse>;
  bookmark?: BlockComponent<BookmarkBlockObjectResponse>;
  breadcrumb?: BlockComponent<BreadcrumbBlockObjectResponse>;
  bulleted_list_item?: BlockComponent<BulletedListItemBlockObjectResponse>;
  callout?: BlockComponent<CalloutBlockObjectResponse>;
  child_database?: BlockComponent<ChildDatabaseBlockObjectResponse>;
  child_page?: BlockComponent<ChildPageBlockObjectResponse>;
  column?: BlockComponent<ColumnBlockObjectResponse>;
  code?: BlockComponent<CodeBlockObjectResponse>;
  column_list?: BlockComponent<ColumnListBlockObjectResponse>;
  divider?: BlockComponent<DividerBlockObjectResponse>;
  embed?: BlockComponent<EmbedBlockObjectResponse>;
  equation?: BlockComponent<EquationBlockObjectResponse>;
  file?: BlockComponent<FileBlockObjectResponse>;
  heading_1?: BlockComponent<Heading1BlockObjectResponse>;
  heading_2?: BlockComponent<Heading2BlockObjectResponse>;
  heading_3?: BlockComponent<Heading3BlockObjectResponse>;
  image?: BlockComponent<ImageBlockObjectResponse>;
  link_preview?: BlockComponent<LinkPreviewBlockObjectResponse>;
  link_to_page?: BlockComponent<LinkToPageBlockObjectResponse>;
  numbered_list_item?: BlockComponent<NumberedListItemBlockObjectResponse>;
  paragraph?: BlockComponent<ParagraphBlockObjectResponse>;
  pdf?: BlockComponent<PdfBlockObjectResponse>;
  quote?: BlockComponent<QuoteBlockObjectResponse>;
  synced_block?: BlockComponent<SyncedBlockBlockObjectResponse>;
  table?: BlockComponent<TableBlockObjectResponse>;
  table_of_contents?: BlockComponent<TableOfContentsBlockObjectResponse>;
  table_row?: BlockComponent<TableRowBlockObjectResponse>;
  template?: BlockComponent<TemplateBlockObjectResponse>;
  to_do?: BlockComponent<ToDoBlockObjectResponse>;
  toggle?: BlockComponent<ToggleBlockObjectResponse>;
  unsupported?: BlockComponent<UnsupportedBlockObjectResponse>;
  video?: BlockComponent<VideoBlockObjectResponse>;
  togglable?: React.FC<TogglableProps>;
};

// @notionhq/client/build/src/api-endpoints.d.ts L235~L239
export type TitleProperty = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
};

type ValueOf<T> = T[keyof T];
