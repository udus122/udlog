import type { InferGetStaticPropsType, NextPage } from "next";

import { extractCoverFromPage, getPage } from "@/libs/notion/notion";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";
import Head from "next/head";

export const getStaticProps = async () => {
  const page = await getPage("4553dcd168664730aa8723e1cace3d7e");

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
  const cover = extractCoverFromPage(page);

  return (
    <>
      <Head>
        <title>UDlog</title>
      </Head>
      <div>
        <NavBar />
        <Header title="UDlog" cover={cover} />
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default Index;
