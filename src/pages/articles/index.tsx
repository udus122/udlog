import { isFullPage } from "@notionhq/client";

import Head from "next/head";
import { noImageUrl } from "@/constants";
import type { InferGetStaticPropsType, NextPage } from "next";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import { collectQueryDatabase, retrieveDatabase } from "@/libs/notion/database";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { PageCover as NotionPageCover } from "@/components/Cover";

export const getStaticProps = async () => {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";
  const database = await retrieveDatabase({
    database_id: ARTICLE_DB_ID,
  });
  const articles = await collectQueryDatabase({
    database_id: ARTICLE_DB_ID,
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });

  return {
    props: {
      database,
      articles,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ database, articles }) => {
  console.log(database);
  console.log(articles);
  const title = getPlainTextFromRichText(database.title);

  return (
    <>
      <Head>
        <title>{title} | UDlog</title>
      </Head>
      <div>
        <NavBar />
        <NotionPageCover page={database} className="full-bleed" />
        <main>
          <article>
            <div>
              {articles.map((article) => {
                if (!isFullPage(article)) {
                  return null;
                }
                const coverImageUrl =
                  article.cover?.type === "file"
                    ? article.cover.file.url
                    : article.cover?.external?.url;
                return (
                  <div key={article.id}>
                    <span>
                      <img
                        width={150}
                        height={150}
                        src={coverImageUrl ? coverImageUrl : noImageUrl}
                        style={{ objectFit: "cover", aspectRatio: "16/9" }}
                      />
                    </span>
                    <Link href={`/articles/${article.id}`}>
                      {getPlainTextFromRichText(
                        article.properties.Name.title
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
