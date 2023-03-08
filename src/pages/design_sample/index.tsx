import type {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import design_sample from "./design_sample.json"
import { NotionRender } from "@/components/Notion/Render";
import { BlockComponentMapper } from "@/components/Notion/Block/mapper";
import { OpenedToggle } from "@/components/CustomBlock/OpenedToggle";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      page: null,
      blocks: design_sample,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

const customMapper: BlockComponentMapper = {
  "toggle": OpenedToggle
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ blocks }) => {
  console.log(blocks);
  return <NotionRender blocks={blocks} customMapper={customMapper} />;
};

export default Index;
