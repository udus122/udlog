import { defaultMapper } from "./Block/mapper";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponentMapper } from "@/types";
import { BlockList } from "./BlockList";

type Props = {
  blocks: BlockObjectResponse[];
  customMapper?: BlockComponentMapper;
};

export const NotionBlockRenderer: React.FC<Props> = function ({
  blocks,
  customMapper = {},
}) {
  const mapper = { ...defaultMapper, ...customMapper };
  return (
    <div className="notion_renderer">
      <BlockList blocks={blocks} mapper={mapper} />
    </div>
  );
};
