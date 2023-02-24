import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";

import { extractCoverFromPage, getPage } from "@/libs/notion/pages";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";

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
      <NavBar />
      <Header title="UDlog" cover={cover} />
      <Footer /> 
  );
};

export default Index;
