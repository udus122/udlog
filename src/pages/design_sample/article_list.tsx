import { isFullPage } from "@notionhq/client";

import Head from "next/head";
import { noImageUrl } from "@/constants";
import type { InferGetStaticPropsType, NextPage } from "next";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import { getPlainTextFromArrayOfRichText } from "@/libs/notion/utils";
import { NotionPageCover } from "@/components/Notion/Page/Cover";

import sample_page_list from './sample_page_list.json'
import sample_database from "./sample_database.json";
import { DatabaseObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getStaticProps = async () => {
  return {
    props: {
      database: sample_database as DatabaseObjectResponse,
      articles: sample_page_list as PageObjectResponse[],
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ database, articles }) => {
  const title = getPlainTextFromArrayOfRichText(database.title);

  return (
    <>
      <Head>
        <title>{title} | UDlog</title>
      </Head>
      <div>
        <NavBar />
        <NotionPageCover page={database} className="full-bleed" />
        <main>
          <article>
            <div>
              {articles.map((article) => {
                if (!isFullPage(article)) {
                  return null;
                }
                const coverImageUrl =
                  article.cover?.type === "file"
                    ? article.cover.file.url
                    : article.cover?.external?.url;
                return (
                  <div key={article.id}>
                    <span>
                      <img
                        width={150}
                        height={150}
                        src={coverImageUrl ? coverImageUrl : noImageUrl}
                        style={{ objectFit: "cover", aspectRatio: "16/9" }}
                      />
                    </span>
                    <Link href={`/articles/${article.id}`}>
                      {getPlainTextFromArrayOfRichText(
                        article.properties.Name.title
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
