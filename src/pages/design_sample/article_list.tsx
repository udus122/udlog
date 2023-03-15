import { isFullPage } from "@notionhq/client";

import Head from "next/head";
import { noImageUrl } from "@/constants";
import type { InferGetStaticPropsType, NextPage } from "next";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { NotionPageCover } from "@/components/Notion/Page/Cover";

import sample_page_list from "./sample_page_list.json";
import sample_database from "./sample_database.json";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ArticleListLayout } from "@/layouts/ArticleList";

export const getStaticProps = async () => {
  return {
    props: {
      database: sample_database as DatabaseObjectResponse,
      articles: sample_page_list as PageObjectResponse[],
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ database, articles }) => {
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
