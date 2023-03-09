import sample_block_list from "./sample_block_list.json";
import sample_page_info from "./sample_page_info.json";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { NotionBlockRenderer } from "@/components/Notion/Renderer";
import { OpenedToggle } from "@/components/CustomBlock/OpenedToggle";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Footer } from "@/components/Footer";
import { NotionPageHeader } from "@/components/Notion/PageHeader";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      page: sample_page_info,
      blocks: sample_block_list,
    },
  };
};

const customMapper: BlockComponentMapper = {
  toggle: OpenedToggle,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const DesignSample: NextPage<Props> = ({ page, blocks }) => {
  return (
    <div id="page-id-dummy">
      <NavBar />
      <NotionPageHeader page={page} />
      <Main>
        <article>
          <NotionBlockRenderer blocks={blocks} customMapper={customMapper} />
        </article>
      </Main>
      <Footer />
    </div>
  );
};

export default DesignSample;
