import Head from "next/head";
import type { InferGetStaticPropsType, NextPage } from "next";
import { collectQueryDatabase, retrieveDatabase } from "@/libs/notion/database";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { ArticleListLayout } from "@/layouts/ArticleList";

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
      articles: articles.filter((page) => !page.archived),
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
      <ArticleListLayout database={database} articles={articles} />
    </>
  );
};

export default Index;
