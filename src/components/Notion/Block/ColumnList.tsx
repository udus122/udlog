import type { BlockComponent } from "@/types";
import { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const ColumnList: BlockComponent<ColumnListBlockObjectResponse> = ({
  block,
  children,
}) => {
  const blockType = `notion-${block.type}`;
  return <div className={`${blockType} `}>{children}</div>;
};
