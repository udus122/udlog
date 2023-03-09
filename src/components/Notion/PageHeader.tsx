import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPageCover } from "./Page/Cover";
import { NotionPageTitle } from "./Page/Title";
// import { NotionPageProperties } from "./Page/Properties";

type Props = {
  page: PageObjectResponse;
};

export const NotionPageHeader: React.FC<Props> = function ({ page }) {
  return (
    <header className="notion_page_header">
      <NotionPageCover page={page} />
      <NotionPageTitle page={page} />
      {/* <NotionPageProperties page={page} /> */}
    </header>
  );
};
