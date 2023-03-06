// import type {
//   BlockObjectResponse,
//   ParagraphBlockObjectResponse,
//   Heading1BlockObjectResponse,
//   Heading2BlockObjectResponse,
//   Heading3BlockObjectResponse,
//   BulletedListItemBlockObjectResponse,
//   NumberedListItemBlockObjectResponse,
//   QuoteBlockObjectResponse,
//   ToDoBlockObjectResponse,
//   ToggleBlockObjectResponse,
//   TemplateBlockObjectResponse,
//   SyncedBlockBlockObjectResponse,
//   ChildPageBlockObjectResponse,
//   ChildDatabaseBlockObjectResponse,
//   EquationBlockObjectResponse,
//   CodeBlockObjectResponse,
//   CalloutBlockObjectResponse,
//   DividerBlockObjectResponse,
//   BreadcrumbBlockObjectResponse,
//   TableOfContentsBlockObjectResponse,
//   ColumnListBlockObjectResponse,
//   ColumnBlockObjectResponse,
//   LinkToPageBlockObjectResponse,
//   TableBlockObjectResponse,
//   TableRowBlockObjectResponse,
//   EmbedBlockObjectResponse,
//   BookmarkBlockObjectResponse,
//   ImageBlockObjectResponse,
//   VideoBlockObjectResponse,
//   PdfBlockObjectResponse,
//   FileBlockObjectResponse,
//   AudioBlockObjectResponse,
//   LinkPreviewBlockObjectResponse,
//   UnsupportedBlockObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// // type UnionWithNewProperty<T, P> = T extends object
// //   ? {
// //       [K in keyof T]: T[K] & P;
// //     }
// //   : never;

// // export type ResolvedBlockObjectResponse = UnionWithNewProperty<
// //   BlockObjectResponse,
// //   { children?: BlockObjectResponse[] }
// // >;

// // 愚直に1つずつchildrenプロパティを追加していくパターン。上記で上手くいかない場合に使うために残しておく
// export type ResolvedBlockObjectResponse = ResolvedParagraphBlockObjectResponse | ResolvedHeading1BlockObjectResponse | ResolvedHeading2BlockObjectResponse | ResolvedHeading3BlockObjectResponse | ResolvedBulletedListItemBlockObjectResponse | ResolvedNumberedListItemBlockObjectResponse | ResolvedQuoteBlockObjectResponse | ResolvedToDoBlockObjectResponse | ResolvedToggleBlockObjectResponse | ResolvedTemplateBlockObjectResponse | ResolvedSyncedBlockBlockObjectResponse | ResolvedChildPageBlockObjectResponse | ResolvedChildDatabaseBlockObjectResponse | ResolvedEquationBlockObjectResponse | ResolvedCodeBlockObjectResponse | ResolvedCalloutBlockObjectResponse | ResolvedDividerBlockObjectResponse | ResolvedBreadcrumbBlockObjectResponse | ResolvedTableOfContentsBlockObjectResponse | ResolvedColumnListBlockObjectResponse | ResolvedColumnBlockObjectResponse | ResolvedLinkToPageBlockObjectResponse | ResolvedTableBlockObjectResponse | ResolvedTableRowBlockObjectResponse | ResolvedEmbedBlockObjectResponse | ResolvedBookmarkBlockObjectResponse | ResolvedImageBlockObjectResponse | ResolvedVideoBlockObjectResponse | ResolvedPdfBlockObjectResponse | ResolvedFileBlockObjectResponse | ResolvedAudioBlockObjectResponse | ResolvedLinkPreviewBlockObjectResponse | ResolvedUnsupportedBlockObjectResponse;

// export type ResolvedParagraphBlockObjectResponse =
//   ParagraphBlockObjectResponse & {
//     children?: BlockObjectResponse[];
//   };
// export type ResolvedHeading1BlockObjectResponse =
//   Heading1BlockObjectResponse & {
//     children?: BlockObjectResponse[];
//   };
// export type ResolvedHeading2BlockObjectResponse =
//   Heading2BlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedHeading3BlockObjectResponse =
//   Heading3BlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedBulletedListItemBlockObjectResponse =
//   BulletedListItemBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedNumberedListItemBlockObjectResponse =
//   NumberedListItemBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedQuoteBlockObjectResponse = QuoteBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedToDoBlockObjectResponse = ToDoBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedToggleBlockObjectResponse = ToggleBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedTemplateBlockObjectResponse =
//   TemplateBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedSyncedBlockBlockObjectResponse =
//   SyncedBlockBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedChildPageBlockObjectResponse =
//   ChildPageBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedChildDatabaseBlockObjectResponse =
//   ChildDatabaseBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedEquationBlockObjectResponse =
//   EquationBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedCodeBlockObjectResponse = CodeBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedCalloutBlockObjectResponse = CalloutBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedDividerBlockObjectResponse = DividerBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedBreadcrumbBlockObjectResponse =
//   BreadcrumbBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedTableOfContentsBlockObjectResponse =
//   TableOfContentsBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedColumnListBlockObjectResponse =
//   ColumnListBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedColumnBlockObjectResponse = ColumnBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedLinkToPageBlockObjectResponse =
//   LinkToPageBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedTableBlockObjectResponse = TableBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedTableRowBlockObjectResponse =
//   TableRowBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedEmbedBlockObjectResponse = EmbedBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedBookmarkBlockObjectResponse =
//   BookmarkBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedImageBlockObjectResponse = ImageBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedVideoBlockObjectResponse = VideoBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedPdfBlockObjectResponse = PdfBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedFileBlockObjectResponse = FileBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedAudioBlockObjectResponse = AudioBlockObjectResponse & {
//   children?: BlockObjectResponse[];
// };
// export type ResolvedLinkPreviewBlockObjectResponse =
//   LinkPreviewBlockObjectResponse & { children?: BlockObjectResponse[] };
// export type ResolvedUnsupportedBlockObjectResponse =
//   UnsupportedBlockObjectResponse & { children?: BlockObjectResponse[] };
