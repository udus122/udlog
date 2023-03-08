import type { BlockComponent } from "@/types";
import { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const Divider: BlockComponent<DividerBlockObjectResponse> = ({
  block,
}) => {
  const blockType = `notion-${block.type}`;
  return <hr className={`${blockType}`} />;
};
