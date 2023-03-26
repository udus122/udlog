import Head from "next/head";
import { retrieveFullPage } from "@/libs/notion/page";
import { Top } from "@/layouts/Top";
import { collectBlockList, resolveAllChildrenBlock } from "@/libs/notion/block";

import type { InferGetStaticPropsType, NextPage } from "next";
import { collectQueryDatabase } from "@/libs/notion/database";
import { defaultMapper } from "@/components/Notion/Block/mapper";

export const getStaticProps = async () => {
  const page_id = "4553dcd168664730aa8723e1cace3d7e";
  const page = await retrieveFullPage({
    page_id,
  });
  const blocks =
    (await collectBlockList({
      block_id: page_id,
    })) ?? [];
  const resolvedBlocks = await resolveAllChildrenBlock(blocks);
  const ARTICLE_DB_ID = process.env.NOTION_ARTICLE_DATABASE_ID ?? "";

  const articles = await collectQueryDatabase({
    database_id: ARTICLE_DB_ID,
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: 10,
  });

  return {
    props: {
      page,
      blocks: resolvedBlocks,
      articles
    },
    revalidate: 60 * 60 * 24,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page, blocks, articles }) => {
  return (
    <>
      <Head>
        <title>UDlog</title>
      </Head>
      <Top
        page={page}
        blocks={blocks}
        articles={articles}
        customMapper={defaultMapper}
      />
    </>
  );
};

export default Index;
