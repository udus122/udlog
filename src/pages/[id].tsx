import { collectBlockList, resolveAllChildrenBlock } from "@/libs/notion/block";
import { retrieveFullPage, traverseChildPages } from "@/libs/notion/page";
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
import { collectArticles, collectReferences } from "@/libs/blog/fetch-pages";
import { filterGrayBackgroundBlock } from "@/libs/blog/blog-utils";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await collectArticles();
  const references = await collectReferences();
  const pages = [...articles, ...references];

  const childPages = await Promise.all(
    pages.map(async (page) => {
      const childPage = await traverseChildPages(page);
      return childPage;
    })
  ).then((x) => x.flat());
  const pagesWithChildren = [...pages, ...childPages];

  return {
    paths: pagesWithChildren.map(({ id }) => ({
      params: {
        id,
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
  const blocks =
    (await collectBlockList({
      block_id: params.id as string,
    })) ?? [];

  const resolvedBlocks = await resolveAllChildrenBlock(blocks);
  const filteredBlocks = filterGrayBackgroundBlock(resolvedBlocks);

  return {
    props: {
      page: page,
      blocks: filteredBlocks,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

const customMapper: BlockComponentMapper = {
  togglable: OpenedTogglable,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks }) => {
  return (
    <ArticleLayout page={page} blocks={blocks} customMapper={customMapper} />
  );
};

export default Index;
