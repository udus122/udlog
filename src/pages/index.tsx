import Head from "next/head";
import { retrieveFullPage } from "@/libs/notion/page";
import { Top } from "@/layouts/Top";
import { collectBlockList, resolveAllChildrenBlock } from "@/libs/notion/block";
import { defaultMapper } from "@/components/Notion/Block/mapper";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { collectArticles } from "@/libs/blog/fetch-pages";

import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const page_id = "4553dcd168664730aa8723e1cace3d7e";
  const page = (await retrieveFullPage({
    page_id,
  })) as PageObjectResponse;
  const blocks =
    (await collectBlockList({
      block_id: page_id,
    })) ?? [];
  const resolvedBlocks = await resolveAllChildrenBlock(blocks);

  const pages = await collectArticles();

  return {
    props: {
      page,
      blocks: resolvedBlocks,
      pages,
    },
    revalidate: 60 * 60 * 24,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks, pages }) => {
  return (
    <>
      <Head>
        <title>UDlog</title>
      </Head>
      <Top
        page={page}
        blocks={blocks}
        pages={pages}
        customMapper={defaultMapper}
      />
    </>
  );
};

export default Index;
