import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import type { BlockComponent } from "@/types";
import { noImageUrl } from "@/constants";
import clsx from "clsx";

export const Image: BlockComponent<ImageBlockObjectResponse> = ({ block }) => {
  const imageUrl =
    block.image.type == "external"
      ? block.image.external.url
      : block.image.file.url;
  return (
    <div id={block.id} className={clsx("notion_block", "notion_image")}>
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img src={imageUrl ?? noImageUrl} />
      <span className="notion_caption">
        {block.image.caption && <RichText richText={block.image.caption} />}
      </span>
    </div>
  );
};
