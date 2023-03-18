import { collectBlockList, resolveAllChildrenBlock } from "@/libs/notion/block";
import { retrieveFullPage } from "@/libs/notion/page";
import { collectQueryDatabase } from "@/libs/notion/database";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ArticleLayout } from "@/layouts/Article";
import { OpenedTogglable } from "@/components/CustomBlock/OpenedTogglable";
import { BlockComponentMapper } from "@/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";
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
    paths: articles.map((article) => ({
      params: {
        id: article.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return {
      props: {},
    };
  }
  if (typeof params.id !== "string") {
    throw new TypeError("parms.id must be String.");
  }
  const page = await retrieveFullPage({ page_id: params.id });
  const blocks = await collectBlockList({
    block_id: params.id as string,
  });
  const resolvedBlocks = await resolveAllChildrenBlock(blocks);

  return {
    props: {
      page: page,
      blocks: resolvedBlocks,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

const customMapper: BlockComponentMapper = {
  togglable: OpenedTogglable,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks }) => {
  console.log(blocks);
  return (
    <ArticleLayout page={page} blocks={blocks} customMapper={customMapper} />
  );
};

export default Index;
