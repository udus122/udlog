import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { NotionPageCover } from "@/components/Notion/Page/Cover";
import { NotionPageTitle } from "@/components/Notion/Page/Title";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { Divider as NotionDivider } from "@/components/Notion/Block/Divider";
import Link from "next/link";
import { getPlainTextFromArrayOfRichText } from "@/libs/notion/utils";
import { noImageUrl } from "@/constants";

export const ArticleListLayout = ({
  database,
  articles,
}: {
  database: DatabaseObjectResponse;
  articles: PageObjectResponse[];
}) => {
  return (
    <div id={database.id} className="layout-article">
      <NavBar className="sticky top-0 z-30 shadow-xl full-bleed shadow-gray-900" />
      <NotionPageCover page={database} className="full-bleed" />
      <header>
        <NotionPageTitle page={database} className="mt-8" />
        <NotionDivider className="mt-4 mb-8" />
      </header>
      <main>
        <article>
          {articles.map((article) => {
            const coverImageUrl =
              article.cover?.type === "file"
                ? article.cover.file.url
                : article.cover?.external?.url;
            return (
              <div key={article.id}>
                <Link href={`/articles/${article.id}`}>
                  {getPlainTextFromArrayOfRichText(
                    article.properties.Name.title
                  )}
                  <span>
                    <img
                      width={150}
                      height={150}
                      src={coverImageUrl ? coverImageUrl : noImageUrl}
                      style={{ objectFit: "cover", aspectRatio: "16/9" }}
                    />
                  </span>
                </Link>
              </div>
            );
          })}
        </article>
      </main>
      <Footer className="full-bleed" />
    </div>
  );
};
