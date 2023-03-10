import { noImageUrl } from "@/constants";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { clsx } from "clsx";

type Props = React.ComponentProps<"div"> & {
  page: PageObjectResponse;
};

export const NotionPageCover: React.FC<Props> = function ({
  page,
  className,
  ...props
}) {
  const coverImageUrl =
    page.cover?.type === "file"
      ? page.cover.file.url
      : page.cover?.external?.url;
  return (
    <div className={clsx("notion_page_cover", className)} {...props}>
      <Image
        className={"notion_page_cover_image"}
        src={coverImageUrl ?? noImageUrl}
        alt="page cover image"
        fill
      />
    </div>
  );
};
