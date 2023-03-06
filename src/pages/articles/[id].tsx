import {
  notion,
  getPlainTextFromArrayOfRichText,
  collectBlockList,
  resolveAllChildrenBlock,
} from "@/libs/notion";
import { collectPaginatedAPI, isFullPage } from "@notionhq/client";
import { Render } from "@9gustin/react-notion-render";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import sample_design from "@/sample_design.json"
export const getStaticPaths: GetStaticPaths = async () => {
  // const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID || "";
  // const articles = await collectPaginatedAPI(notion.databases.query, {
  //   database_id: ARTICLE_DB_ID,
  //   sorts: [
  //     {
  //       property: "Published",
  //       direction: "descending",
  //     },
  //   ],
  // });
  return {
    paths: [
      {
        params: {
          id: "0581ec5b0d9d4448bea936fc4eafbd32",
        },
      },
    ],
    fallback: false,
  };
  // return {
  //   paths: articles
  //     .filter((article) => isFullPage(article))
  //     .map((article) => ({
  //       params: {
  //         id: "0581ec5b0d9d4448bea936fc4eafbd32",
  //       },
  //     })),
  //   fallback: false, // can also be true or 'blocking'
  // };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  if (!params || !params.id) {
    return {
      props: {},
    };
  }
  // @ts-ignore
  // const page = await notion.pages.retrieve({page_id: params.id});
  // const page = await notion.pages.retrieve({
  //   page_id: "0581ec5b0d9d4448bea936fc4eafbd32",
  // });
  // const blocks = await collectBlockList({
  //   block_id: page.id,
  // });
  // const resolvedBlocks = await resolveAllChildrenBlock(blocks)

  return {
    props: {
      page: null,
      blocks: sample_design,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks }) => {
  console.log(blocks);
  // TODO: Renderを自前のものに変えていく
  return <Render blocks={blocks} useStyles classNames />;
};

export default Index;
