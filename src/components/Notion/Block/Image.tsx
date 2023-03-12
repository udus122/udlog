import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import NextImage from "next/image";
import type { BlockComponent } from "@/types";
import { noImageUrl } from "@/constants";

export const Image: BlockComponent<ImageBlockObjectResponse> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  const imageUrl: string =
    block.image.type == "external"
      ? block.image.external.url
      : block.image.file.url;
  const caption = block.image.caption.reduce((prev, curr) => {
    prev += curr.plain_text;
    return prev;
  }, "");
  return (
    <div id={block.id} className={`${blockType}_container`} style={{ position: "relative" }}>
      <picture className="frame">
        <NextImage
          src={imageUrl ?? noImageUrl}
          alt={caption}
          fill
          className={`${blockType}`}
          style={{ objectFit: "cover" }}
        />
      </picture>
      <span className="notion_caption">
        {block.image.caption && <RichText richText={block.image.caption} />}
      </span>
    </div>
  );
};
