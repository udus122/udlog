import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const InlineCode: React.FC<
  React.ComponentProps<"code"> & { richTextItem: RichTextItemResponse }
> = ({ children }) => {
  return <code className="notion_inline_code">{children}</code>;
};
