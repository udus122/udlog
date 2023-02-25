import { notion } from "@/libs/notion/client";
import { collectPaginatedAPI, isFullPage } from "@notionhq/client";
import { getPlainTextFromArrayOfRichText } from "@/libs/utils/index";
import Head from "next/head";

import type { InferGetStaticPropsType, NextPage } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import Image from "next/image";

export const getStaticProps = async () => {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID || "";
  const database = await notion.databases.retrieve({
    database_id: ARTICLE_DB_ID,
  });
  const articles = await collectPaginatedAPI(notion.databases.query, {
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

  // @ts-ignore
  const title = getPlainTextFromArrayOfRichText(database.title);
  // @ts-ignore
  const cover = database.cover.external;

  return (
    <>
      <Head>
        <title>{title} | UDlog</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen text-white bg-gray-800">
        <NavBar />
        <Header title={title} cover={cover} />
        <main className="flex-grow px-24 pb-24">
          <article>
            <div className="grid gap-4 auto-rows-fr grid-cols-fluid">
              {articles.map((article) => {
                if (!isFullPage(article)) {
                  return null;
                }
                return (
                  <div
                    key={article.id}
                    className="h-48 min-h-[12rem] text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                  >
                    <span className="relative block h-32">
                      <Image alt="Next.js logo" src={cover.url} fill />
                    </span>
                    <Link href={`/articles/${article.id}`}>{getPlainTextFromArrayOfRichText(
                        // @ts-ignore
                        article.properties.Name.title
                      )}</Link>
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
