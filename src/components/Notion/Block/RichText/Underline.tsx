import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Underline: React.FC<React.ComponentProps<"u">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <u className="notion_underline">{children}</u>
}
