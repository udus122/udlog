import type { InferGetStaticPropsType, NextPage } from "next";

// export const getStaticProps = async () => {
//   const page = await getPage("4553dcd168664730aa8723e1cace3d7e");

//   return {
//     props: {
//       page,
//     },
// revalidate: 60 * 60, // 1時間
//   };
// };

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage = () => {
  return <h1>this is about page!</h1>;
};

export default Index;
