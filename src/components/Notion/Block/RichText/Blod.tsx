import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Bold: React.FC<React.ComponentProps<"strong"> & {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <strong className="notion_blod">{children}</strong>
}
