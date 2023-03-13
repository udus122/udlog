import ReactEmbed from "react-embed";
import type { BlockComponent } from "@/types";
import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// TODO: ダークモード対応
export const Embed: BlockComponent<EmbedBlockObjectResponse> = ({
  block,
  isDark = true,
}) => {
  return (
    <div className="notion_embed">
      <ReactEmbed isDark url={block.embed.url} />
    </div>
  );
};
