import type { BlockComponent } from "@/types";
import { ColumnBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const Column: BlockComponent<ColumnBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion-${block.type}`;
  return <div className={`${blockType}`}>{children}</div>;
};
