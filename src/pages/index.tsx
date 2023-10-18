import Head from "next/head";

import { Blocks } from "@udus/notion-components/components";
import { fetchBlockComponents } from "@udus/notion-components/libs";
import "@udus/notion-components/styles/globals.css";
import type { InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps = async () => {
  const page_id = "4553dcd168664730aa8723e1cace3d7e";
  const blocks = await fetchBlockComponents(page_id);

  return {
    props: {
      blocks,
    },
    revalidate: 60 * 60, // 1時間
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ blocks }) => {
  return (
    <>
      <Head>
        <title>UDlog</title>
      </Head>
      <Blocks blocks={blocks} />
    </>
  );
};

export default Index;
