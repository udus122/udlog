import type { BlockComponent } from "@/types";
import { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const ColumnList: BlockComponent<ColumnListBlockObjectResponse> = ({
  block,
  children,
}) => {
  return <div id={block.id} className="notion_block notion_column_list">{children}</div>;
};
