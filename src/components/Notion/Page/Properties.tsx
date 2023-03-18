import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  page: PageObjectResponse;
};

export const NotionPageProperties: React.FC<Props> = function ({ page }) {
  return <div className="notion_page_properties"></div>;
};
