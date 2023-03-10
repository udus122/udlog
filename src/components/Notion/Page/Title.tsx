import { TitleProperty } from "@/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { clsx } from "clsx";

function extractTitleFromPage(page: PageObjectResponse): string {
  const titleProperty = Object.values(page.properties).find(
    (property) => property.type === "title"
  ) as TitleProperty;
  return titleProperty["title"].reduce((prev, curr) => {
    prev += curr.plain_text;
    return prev;
  }, "");
}

type Props = React.ComponentProps<"h1"> & {
  page: PageObjectResponse;
};

export const NotionPageTitle: React.FC<Props> = function ({
  page,
  className,
  ...props
}) {
  const title = extractTitleFromPage(page);
  return (
    <h1 className={clsx("notion_page_title", className)} {...props}>
      {title}
    </h1>
  );
};
