import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Strikethrough: React.FC<React.ComponentProps<"del">& {richTextItem: RichTextItemResponse}> = ({richTextItem, children}) => {
  return <del className="notion_strikethrough">{children}</del>
}
