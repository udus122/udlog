import { TitleProperty } from "@/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";


function extractTitleFromPage(page: PageObjectResponse): string {
  const titleProperty = Object.values(page.properties).find(
    (property) => property.type === "title"
  ) as TitleProperty;
  return titleProperty["title"].reduce((prev, curr) => {
    prev += curr.plain_text
    return prev
  }, '')
}

type Props = {
  page: PageObjectResponse;
};

export const NotionPageTitle: React.FC<Props> = function ({ page }) {
  const title = extractTitleFromPage(page)
  return (
      <h1 className="notion_page_title">{title}</h1>
  );
};
