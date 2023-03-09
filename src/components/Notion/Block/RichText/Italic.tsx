import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Italic: React.FC<
  React.ComponentProps<"em"> & { rich_text_item: RichTextItemResponse }
> = ({ rich_text_item, children }) => {
  return <em className="notion_italic">{children}</em>;
};
