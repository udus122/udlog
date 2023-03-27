import Head from "next/head";
import type { InferGetStaticPropsType, NextPage } from "next";
import { collectQueryDatabase, retrieveDatabase } from "@/libs/notion/database";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { ArticleListLayout } from "@/layouts/ArticleList";

export const getStaticProps = async () => {
  const REFERENCE_DATABASE_ID = process.env.NOTION_REFERENCE_DATABASE_ID ?? "";
  const database = await retrieveDatabase({
    database_id: REFERENCE_DATABASE_ID,
  });
  const pages = await collectQueryDatabase({
    database_id: REFERENCE_DATABASE_ID,
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
