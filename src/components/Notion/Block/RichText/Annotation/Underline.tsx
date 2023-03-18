import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Underline: React.FC<
  React.ComponentProps<"u"> & { richTextItem: RichTextItemResponse }
> = ({ richTextItem, children }) => {
  return <u className="notion_underline">{children}</u>;
};
