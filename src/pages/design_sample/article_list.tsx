import Head from "next/head";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { ArticleListLayout } from "@/layouts/ArticleList";

import type { InferGetStaticPropsType, NextPage } from "next";
import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ArticlePageObjectResponse } from "@/types/udlog";

import sample_page_list from "@/mocks/sample_page_list.json";
import sample_database from "@/mocks/sample_database.json";

export const getStaticProps = async () => {
  return {
    props: {
      database: sample_database as DatabaseObjectResponse,
      pages: sample_page_list as ArticlePageObjectResponse[],
    },
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
