import type { BlockComponent } from "@/types";
import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// TODO: ダークモード対応
export const Embed: BlockComponent<EmbedBlockObjectResponse> = ({
  block,
}) => {
  return (
    <div id={block.id} className="notion_embed">
      <iframe src={block.embed.url} />
    </div>
  );
};
