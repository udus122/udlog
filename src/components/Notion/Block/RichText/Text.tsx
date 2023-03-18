import * as React from "react";

import type { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

function breakTextRichTextItem(richTextItem: TextRichTextItemResponse) {
  const text_content = richTextItem.text.content
    .split("\\n")
    .reduce((acc: React.ReactNode | string, content: string, i: number) => {
      if (i === 0) {
        return content;
      }
      return (
        <React.Fragment key={`${content}-${i}`}>
          {acc}
          <br />
          {content}
        </React.Fragment>
      );
    }, "");
  return text_content;
}

type Props = React.ComponentProps<"span"> & {
  richTextItem: TextRichTextItemResponse;
};
export const Text: React.FC<Props> = ({ richTextItem }) => {
  const text = breakTextRichTextItem(richTextItem);
  return <span className="notion_rich_text_type_text">{text}</span>;
};
