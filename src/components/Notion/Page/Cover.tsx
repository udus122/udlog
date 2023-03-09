import { noImageUrl } from "@/constants";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

type Props = {
  page: PageObjectResponse;
};

export const NotionPageCover: React.FC<Props> = function ({ page }) {
  const coverImageUrl =
    page.cover?.type === "file"
      ? page.cover.file.url
      : page.cover?.external?.url;
  return (
    <div className="notion_page_cover" style={{position: "relative", overflow: "hidden", display: "flex", aspectRatio: "16/9", width: "50em"}}>
      <Image
        className="notion_page_cover_image"
        src={coverImageUrl ?? noImageUrl}
        alt="page cover image"
        fill
        style={{objectFit: 'cover'}}
      />
    </div>
  );
};
