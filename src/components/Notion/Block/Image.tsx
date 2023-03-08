import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import NextImage from "next/image";
import type { BlockComponent } from "@/types";

export const Image: BlockComponent<ImageBlockObjectResponse> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const imageUrl: string =
    block.image.type == "external"
      ? block.image.external.url
      : block.image.file.url;
  return (
    <div className="${blockType}-container">
      <NextImage
        src={imageUrl || "/fallback.png"}
        alt={"Notion page image"} //TODO: Update this alt text
        width={700}
        height={700}
        className={`${blockType}`}
      />
      <span className="notion-caption">
        {block.image.caption && <RichText rich_text={block.image.caption} />}
      </span>
    </div>
  );
};
