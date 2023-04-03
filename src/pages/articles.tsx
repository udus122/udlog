import Head from "next/head";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { ArticleListLayout } from "@/layouts/ArticleList";
import { collectArticles, retrieveArticleDB } from "@/libs/blog/fetch-pages";

import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const database = await retrieveArticleDB();
  const pages = await collectArticles();

  return {
    props: {
      database,
      pages: pages.filter((page) => !page.archived),
    },
    revalidate: 60 * 60, // 1時間
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
