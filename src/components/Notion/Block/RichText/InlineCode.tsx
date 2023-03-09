import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const InlineCode: React.FC<React.ComponentProps<"code">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <code className="notion_inline_code">{children}</code>
}