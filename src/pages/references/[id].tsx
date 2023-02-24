import { getChildrenAllInBlock } from "@/libs/notion/blocks";
import { getDatabaseContents } from "@/libs/notion/databases";
import { Render } from "@9gustin/react-notion-render";

import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const { results } = await getDatabaseContents({
    database_id: process.env.NOTION_REFERENCE_DATABASE_ID || "",
    page_size: 5,
  });
  const blocks = await getChildrenAllInBlock(results[0].id);

  return {
    props: {
      blocks,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ blocks }) => {
  return (
    <>
      <Render blocks={blocks} />
    </>
  );
};

export default Index;
