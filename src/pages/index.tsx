import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";

import { extractCoverFromPage, getPage } from "@/libs/notion/pages";
import { isFullPage } from "@notionhq/client";

export const getStaticProps = async () => {
  const page = await getPage("4553dcd168664730aa8723e1cace3d7e");

  return {
    props: {
      page,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ page }) => {
  console.log(page);
  const cover = extractCoverFromPage(page);

  return (
    <>
      <h1 className="text-9xl font-bold">🌀UDlog</h1>
      {cover !== null ? (
        <div style={{ position: "relative", width: "100vw", height: "30vh" }}>
          <Image
            alt="Next.js logo"
            src={cover.url}
            fill
            sizes="60vw 30vh"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
    </>
  );
};

export default Index;
