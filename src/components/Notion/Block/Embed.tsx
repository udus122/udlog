import type { BlockComponent } from "@/types";
import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";

// TODO: ダークモード対応
export const Embed: BlockComponent<EmbedBlockObjectResponse> = ({ block }) => {
  return (
    <div id={block.id} className={clsx("notion_block", "notion_embed")}>
      <iframe src={block.embed.url} />
    </div>
  );
};
