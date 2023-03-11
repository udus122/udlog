import type { BlockComponent } from "@/types";
import { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const ColumnList: BlockComponent<ColumnListBlockObjectResponse> = ({
  block,
  children,
}) => {
  return <div className="notion_column_list">{children}</div>;
};
