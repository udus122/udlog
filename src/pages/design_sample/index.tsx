import design_sample from "./design_sample.json";

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { NotionRender } from "@/components/Notion/Render";
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
      blocks: design_sample,
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
    <div
      id="page-id-dummy"
    >
      <NavBar />
      <Header title="UDlog" cover={null} />
      <Main>
        <article>
          <NotionRender blocks={blocks} customMapper={customMapper} />
        </article>
      </Main>
      <Footer />
    </div>
  );
};

export default DesignSample;
