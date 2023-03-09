import sample_block_list from "./sample_block_list.json";

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { NotionRenderer } from "@/components/Notion/Renderer";
import { OpenedToggle } from "@/components/CustomBlock/OpenedToggle";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Footer } from "@/components/Footer";
import styles from "@/styles/layout/article.module.css"

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      page: null,
      blocks: sample_block_list,
    },
  };
};

const customMapper: BlockComponentMapper = {
  toggle: OpenedToggle,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const DesignSample: NextPage<Props> = ({ blocks }) => {
  console.log(blocks);
  return (
    <div id="page-id-dummy">
      <NavBar />
      <Header title="UDlog" cover={null} />
      <Main>
        <article>
          <NotionRenderer blocks={blocks} customMapper={customMapper} />
        </article>
      </Main>
      <Footer />
    </div>
  );
};

export default DesignSample;
