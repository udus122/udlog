import * as React from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Href: React.FC<
  React.ComponentProps<"a"> & { rich_text_item: RichTextItemResponse }
> = ({ rich_text_item, children }) => {
  return (
    <a
      href={rich_text_item.href ?? ""}
      target="_blank"
      rel="noreferrer"
      className="notion_link"
    >
      {children}
    </a>
  );
};
