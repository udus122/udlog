import type { BlockComponent } from "@/types";
import { ColumnBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const Column: BlockComponent<ColumnBlockObjectResponse> = ({
  block,
  children,
}) => {
  return (
    <div id={block.id} className="notion_column">
      {children}
    </div>
  );
};
