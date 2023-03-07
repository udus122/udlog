import type {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import design_sample from "./design_sample.json"
import { Render } from '@9gustin/react-notion-render'
import '@9gustin/react-notion-render/dist/index.css'

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
  // ListItemの子要素が無視されている
  return <Render blocks={blocks} useStyles />;
};

export default Index;
