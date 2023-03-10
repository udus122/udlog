import type { BlockComponent } from "@/types";
import { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

export const Video: BlockComponent<VideoBlockObjectResponse> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const videoUrl: string =
    block.video.type == "external"
      ? block.video.external.url
      : block.video.file.url;
  if (videoUrl) {
    return (
      <div id={block.id} className={`${blockType}_container`}>
        <div className="frame">
        <video controls src={videoUrl} className={`${blockType}`} />
        <span className="notion-caption">
          {block.video.caption && <RichText richText={block.video.caption} />}
        </span>
        </div>
      </div>
    );
  } else {
    return <div className={`${blockType}`}>Video URL not found</div>;
  }
};
