import Head from "next/head";
import type { InferGetStaticPropsType, NextPage } from "next";
import {
  collectQueryDatabase,
  retrieveFullDatabase,
} from "@/libs/notion/database";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { ArticleListLayout } from "@/layouts/ArticleList";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getStaticProps = async () => {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";
  const database = (await retrieveFullDatabase({
    database_id: ARTICLE_DB_ID,
  })) as DatabaseObjectResponse;
  const pages = await collectQueryDatabase({
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
      pages: pages.filter((page) => !page.archived),
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ database, pages }) => {
  const title = getPlainTextFromRichText(database.title);

  return (
    <>
      <Head>
        <title>{title} | UDlog</title>
      </Head>
      <ArticleListLayout database={database} pages={pages} />
    </>
  );
};

export default Index;
