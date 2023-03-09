import * as React from "react";
import { generateBlockColorClass } from "@/libs/notion/utils";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Color: React.FC<
  React.ComponentProps<"span"> & { rich_text_item: RichTextItemResponse }
> = ({ rich_text_item, children }) => {
  return (
    <span
      className={`${generateBlockColorClass(rich_text_item.annotations.color)}`}
    >
      {children}
    </span>
  );
};
