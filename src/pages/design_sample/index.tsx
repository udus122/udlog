import sample_block_list from "./sample_block_list.json";
import sample_page_info from "./sample_page_info.json";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { NotionBlockRenderer } from "@/components/Notion/Renderer";
import { OpenedToggle } from "@/components/CustomBlock/OpenedToggle";
import { NotionNavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { NotionPageHeader } from "@/components/Notion/PageHeader";
import { NotionPageCover } from "@/components/Notion/Page/Cover";

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
    <div id={page.id} className="notion_page">
      <nav>
        <NotionNavBar />
      </nav>
      <header style={{display: "contents"}}>
        <NotionPageCover page={page} />
        <NotionPageHeader page={page} />
      </header>
      <main>
        <article>
          <NotionBlockRenderer blocks={blocks} customMapper={customMapper} />
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default DesignSample;
