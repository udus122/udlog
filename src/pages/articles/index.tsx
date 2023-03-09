import { isFullPage } from "@notionhq/client";
import {
  getPlainTextFromArrayOfRichText,
  retrieveDatabase,
  collectQueryDatabase,
} from "@/libs/notion/notion";

import Head from "next/head";

import type { InferGetStaticPropsType, NextPage } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NotionNavBar } from "@/components/NavBar";
import Link from "next/link";
import Image from "next/image";

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
  console.log(articles);

  const title = getPlainTextFromArrayOfRichText(database.title);
  const cover = database.cover.external;

  return (
    <>
      <Head>
        <title>{title} | UDlog</title>
      </Head>
      <div>
        <NotionNavBar />
        {/* <Header title={title} cover={cover} /> */}
        <main>
          <article>
            <div>
              {articles.map((article) => {
                if (!isFullPage(article)) {
                  return null;
                }
                return (
                  <div key={article.id}>
                    <span>
                      {/* <Image alt="Next.js logo" src={cover.url} fill /> */}
                    </span>
                    <Link href={`/articles/${article.id}`}>
                      {getPlainTextFromArrayOfRichText(
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
