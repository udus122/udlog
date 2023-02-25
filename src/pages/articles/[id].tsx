import { notion } from "@/libs/notion/client";
import { getPlainTextFromArrayOfRichText } from "@/libs/utils";
import { collectPaginatedAPI, isFullPage } from "@notionhq/client";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID || "";
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
    paths: articles
      .filter((article) => isFullPage(article))
      .map((article) => ({
        params: {
          id: article.id,
        },
      })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  if (!params || !params.id) {
    return {
      props: {},
    };
  }
  console.log(params)
  // @ts-ignore
  const page = await notion.pages.retrieve({page_id: params.id});
  // @ts-ignore
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: page.id,
  });
  return {
    props: {
      page,
      blocks,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks }) => {
  console.log(page)
  console.log(blocks)
  return (
    <>
      <h1>{JSON.stringify(page)}</h1>
      <hr />
      {/* @ts-ignore */}
      <div>{blocks.map(block => {
        return (
          <>
          <p className="p-2" key={block.id}>{JSON.stringify(block[block.type])}</p>
          </>
        )
      })}</div>
    </>
  );
};

export default Index;
