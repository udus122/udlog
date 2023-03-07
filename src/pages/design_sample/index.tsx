import type {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import design_sample from "./design_sample.json"
import { NotionRender } from "@/components/Notion/Render";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      page: null,
      blocks: design_sample,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ blocks }) => {
  console.log(blocks);
  // TODO: Renderを自前のものに変えていく
  return <NotionRender blocks={blocks} />;
};

export default Index;
