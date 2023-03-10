import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { BlockComponentMapper } from "@/types";

import { OpenedToggle } from "@/components/CustomBlock/OpenedToggle";
import { ArticleLayout } from "@/layouts/article";

import sample_block_list from "./sample_block_list.json";
import sample_page_info from "./sample_page_info.json";
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
  toggle: OpenedToggle,
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const DesignSample: NextPage<Props> = ({ page, blocks }) => {
  return (
    <ArticleLayout page={page} blocks={blocks} customMapper={customMapper} />
  );
};

export default DesignSample;
