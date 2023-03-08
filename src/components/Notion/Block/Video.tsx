import { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: VideoBlockObjectResponse;
};

export const Video: React.FC<Props> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const videoUrl: string =
    block.video.type == "external"
      ? block.video.external.url
      : block.video.file.url;
  if (videoUrl) {
    return (
      <div className={`${blockType}-container`}>
        <video controls src={videoUrl} className={`${blockType}`} />
        <span className="notion-caption">
          {block.video.caption && <RichText rich_text={block.video.caption} />}
        </span>
      </div>
    );
  } else {
    return <div className={`${blockType}`}>Video URL not found</div>;
  }
};
