import { RichText } from "./RichText";

import type { BlockComponent } from "@/types";
import type { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";

export const Video: BlockComponent<VideoBlockObjectResponse> = ({ block }) => {
  const blockType = "notion_video";
  const videoUrl: string =
    block.video.type == "external"
      ? block.video.external.url
      : block.video.file.url;
  if (videoUrl) {
    return (
      <div id={block.id} className={clsx(blockType)}>
        <iframe src={videoUrl} />
        <span className="notion_caption">
          {block.video.caption && <RichText richText={block.video.caption} />}
        </span>
      </div>
    );
  } else {
    return <div className={clsx(blockType)}>Video URL not found</div>;
  }
};
