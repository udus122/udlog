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
    <div className="notion_page_title">
      <h1>{title}</h1>
      {/* <hr className="notion_divider"/> */}
    </div>
  );
};
