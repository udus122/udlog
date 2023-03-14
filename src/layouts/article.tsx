import { NotionBlockRenderer } from "@/components/Notion/Renderer";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { NotionPageCover } from "@/components/Notion/Page/Cover";
import { NotionPageTitle } from "@/components/Notion/Page/Title";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { BlockComponentMapper } from "@/types";
import { Divider as NotionDivider } from "@/components/Notion/Block/Divider";

export const ArticleLayout = ({
  page,
  blocks,
  customMapper,
}: {
  page: PageObjectResponse;
  blocks: BlockObjectResponse[];
  customMapper?: BlockComponentMapper;
}) => {
  return (
    <div id={page.id} className="layout-article">
      <NavBar className="sticky top-0 z-30 shadow-xl full-bleed shadow-gray-900" />
      <NotionPageCover page={page} className="full-bleed" />
      <header>
        <NotionPageTitle page={page} className="mt-8" />
        <NotionDivider className="mt-4 mb-8" />
      </header>
      <main>
        <article>
          <NotionBlockRenderer blocks={blocks} customMapper={customMapper} />
        </article>
      </main>
      <Footer className="full-bleed" />
    </div>
  );
};
