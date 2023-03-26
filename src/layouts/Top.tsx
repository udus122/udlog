import { NotionBlockRenderer } from "@/components/Notion/Renderer";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageCover as NotionPageCover } from "@/components/Cover";
import { NotionPageTitle } from "@/components/Notion/Page/Title";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { BlockComponentMapper } from "@/types";
import { Divider as NotionDivider } from "@/components/Notion/Block/Divider";
import { Gallery } from "@/components/Notion/Collection/Gallery";

export const Top = ({
  page,
  blocks,
  articles,
  customMapper,
}: {
  page: PageObjectResponse;
  blocks: BlockObjectResponse[];
  articles: PageObjectResponse[];
  customMapper: BlockComponentMapper;
}) => {
  return (
    <div id={page.id} className="layout-article-list">
      <NavBar className="sticky top-0 z-30 shadow-xl full-bleed shadow-gray-900" />
      <NotionPageCover page={page} className="full-bleed" />
      <header>
        <NotionPageTitle page={page} className="mt-8" />
        <NotionDivider className="mt-4 mb-8" />
      </header>
      <main>
        <article className="lg:gap-x-8 lg:grid lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="notion_heading_2">記事一覧</h2>
            <Gallery pages={articles} />
          </div>
          <div className="lg:col-span-1">
            <NotionBlockRenderer blocks={blocks} customMapper={customMapper} />
          </div>
        </article>
      </main>
      <footer className="mt-8 full-bleed ">
        <Footer />
      </footer>
    </div>
  );
};
