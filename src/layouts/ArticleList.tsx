import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageCover as NotionPageCover } from "@/components/Cover";
import { NotionPageTitle } from "@/components/Notion/Page/Title";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { Divider as NotionDivider } from "@/components/Notion/Block/Divider";
import { Gallery } from "@/components/Notion/Collection/Gallery";
export const ArticleListLayout = ({
  database,
  articles,
}: {
  database: DatabaseObjectResponse;
  articles: PageObjectResponse[];
}) => {
  return (
    <div id={database.id} className="layout-article-list">
      <NavBar className="sticky top-0 z-30 shadow-xl full-bleed shadow-gray-900" />
      <NotionPageCover page={database} className="full-bleed" />
      <header >
        <NotionPageTitle page={database} className="mt-8" />
        <NotionDivider className="mt-4 mb-8" />
      </header>
      <main >
        <article>
          <Gallery pages={articles} />
        </article>
      </main>
      <Footer className="full-bleed" />
    </div>
  );
};
