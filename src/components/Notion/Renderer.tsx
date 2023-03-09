import * as React from "react";
import { Block } from "./Block";
import { defaultMapper } from "./Block/mapper";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponentMapper } from "@/types";

type Props = {
  blocks: BlockObjectResponse[];
  customMapper?: BlockComponentMapper;
};

export const NotionRenderer: React.FC<Props> = function ({
  blocks,
  customMapper = {},
}) {
  const mapper = { ...defaultMapper, ...customMapper };
  return (
    <div className="notion-render-root">
      {blocks.map((block) => {
        return (
          <Block key={block.id} block={block} blocks={blocks} mapper={mapper} />
        );
      })}
    </div>
  );
};