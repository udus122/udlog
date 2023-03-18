import type { InferGetStaticPropsType, NextPage } from "next";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

import Head from "next/head";
import { retrieveFullPage } from "@/libs/notion/page";

export const getStaticProps = async () => {
  const page = await retrieveFullPage({
    page_id: "4553dcd168664730aa8723e1cace3d7e",
  });

  return {
    props: {
      page,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page }) => {
  console.log(page);

  return (
    <>
      <Head>
        <title>UDlog</title>
      </Head>
      <div>
        <NavBar />
        <Footer />
      </div>
    </>
  );
};

export default Index;
