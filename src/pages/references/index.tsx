import { getDatabase, getDatabaseContentsAll } from "@/libs/notion/databases";
import Head from "next/head";

import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const REFERENCE_DB_ID = process.env.NOTION_REFERENCE_DATABASE_ID || "";
  const { properties } = await getDatabase(REFERENCE_DB_ID);
  const articles = await getDatabaseContentsAll({
    database_id: REFERENCE_DB_ID,
    page_size: 12,
    sorts: [
      {
        property: "公開日",
        direction: "descending",
      },
    ],
  });

  return {
    props: {
      properties,
      articles,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ properties, articles }) => {
  console.log(properties);
  console.log(articles);
  return (
    <>
      <Head>
        <title>Articles | UDlog</title>
      </Head>
      <h1>記事一覧</h1>
      <h2>properties</h2>
      <h2>articles</h2>
    </>
  );
};

export default Index;
