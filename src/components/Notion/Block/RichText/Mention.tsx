import { MentionRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Mention = ({
  richTextItem,
}: {
  richTextItem: MentionRichTextItemResponse;
}) => (
  <span className="notion_rich_text_type_mention">
    {richTextItem.plain_text}
  </span>
);
