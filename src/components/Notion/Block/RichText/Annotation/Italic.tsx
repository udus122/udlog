import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = React.ComponentProps<"em"> & {
  richTextItem: RichTextItemResponse;
};

export const Italic: React.FC<Props> = ({ richTextItem, children }) => {
  return <em className="notion_italic">{children}</em>;
};
