import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent, HeadingBlockObjectResponse } from "@/types";
import { TableOfContentsBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const TableOfContentsItem = ({
  heading,
}: {
  heading: HeadingBlockObjectResponse;
}) => {
  return (
    <div
      className={clsx(
        "notion_table_of_contents_item",
        `notion_table_of_contents_item__${heading.type}`
      )}
    >
      <a href={`#${heading.id}`}>
        <RichText richText={heading[heading.type].rich_text} />
      </a>
    </div>
  );
};

export const TableOfContents: BlockComponent<
  TableOfContentsBlockObjectResponse
> = ({ block, blocks, children }) => {
  const blockColor = generateBlockColorClass(block.table_of_contents.color);
  const headings = blocks?.filter((bl) =>
    bl.type.startsWith("heading")
  ) as Array<HeadingBlockObjectResponse>;
  return (
    <div
      id={block.id}
      className={clsx("notion_block", "notion_table_of_contents", blockColor)}
    >
      {headings &&
        headings?.map((heading) => {
          return <TableOfContentsItem heading={heading} key={heading.id} />;
        })}
    </div>
  );
};
