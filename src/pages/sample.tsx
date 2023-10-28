import { BlockRenderer } from "@udus/notion-components/components";
import { fetchBlockList } from "@udus/notion-components/libs";

import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const page_id = "2712e341754a41aea9ce4c0bb4b18c52";
  const blocks = await fetchBlockList(page_id);

  return {
    props: {
      blocks,
    },
    revalidate: 60 * 60, // 1時間
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ blocks }) => {
  return <BlockRenderer blocks={blocks} theme="dark" />;
};

export default Index;
