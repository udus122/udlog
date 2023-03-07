import * as React from "react";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Block } from "./Block";

type Props = {
  blocks: BlockObjectResponse[];
};

export const NotionRender: React.FC<Props> = function ({ blocks }) {
  return (
    <div className="notion-render-root">
      {blocks.map((block) => {
        return (
            <Block key={block.id} block={block} blocks={blocks} />
        );
      })}
    </div>
  );
};
