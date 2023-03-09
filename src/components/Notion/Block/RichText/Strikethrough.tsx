import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Strikethrough: React.FC<React.ComponentProps<"del">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <del className="notion_strikethrough">{children}</del>
}
