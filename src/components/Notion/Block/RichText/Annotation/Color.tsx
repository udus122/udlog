import * as React from "react";
import { generateBlockColorClass } from "@/libs/notion/utils";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Color: React.FC<
  React.ComponentProps<"span"> & { richTextItem: RichTextItemResponse }
> = ({ richTextItem, children }) => {
  return (
    <span
      className={`${generateBlockColorClass(richTextItem.annotations.color)}`}
    >
      {children}
    </span>
  );
};
