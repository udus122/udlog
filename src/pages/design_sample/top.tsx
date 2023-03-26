import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { OpenedTogglable } from "@/components/CustomBlock/OpenedTogglable";
import { ArticleLayout } from "@/layouts/Article";

import sample_block_list from "./sample_top_block.json";
import sample_page_info from "./sample_top_page.json";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const getStaticProps: GetStaticProps<{
  page: PageObjectResponse;
  blocks: BlockObjectResponse[];
}> = async () => {
  return {
    props: {
      page: sample_page_info as PageObjectResponse,
      blocks: sample_block_list as BlockObjectResponse[],
    },
  };
};

const customMapper: BlockComponentMapper = {
  togglable: OpenedTogglable,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const DesignSample: NextPage<Props> = ({ page, blocks }) => {
  return (
    <ArticleLayout page={page} blocks={blocks} customMapper={customMapper} />
  );
};

export default DesignSample;
