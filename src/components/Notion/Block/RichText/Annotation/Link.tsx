import { parselinkUrl } from "@/libs/blog";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const Link: React.FC<
  React.ComponentProps<"a"> & { richTextItem: RichTextItemResponse }
> = ({ richTextItem, children }) => (
  <a
    href={parselinkUrl(richTextItem.href ?? "")}
    target="_blank"
    rel="noreferrer"
    className="notion_link"
  >
    {children}
  </a>
);
