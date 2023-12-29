import { fetchDatabase } from "@udus/notion-renderer/libs";
import { Metadata } from "next";

import { client } from "@/client";
import PageList from "@/components/PageList";
import { ARTICLE_DATABASE_ID } from "@/constants";

import { loadArticles } from "./lib";

export const metadata: Metadata = {
  title: "Articles | UDlog",
};

export default async () => {
  const databaseResult = await fetchDatabase(client, {
    database_id: ARTICLE_DATABASE_ID,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;
  const initialPages = await loadArticles();

  return (
    database && (
      <PageList
        database={database}
        initialPages={initialPages}
        loadFn={loadArticles}
        displayProperties={["title", "Tags", "Published"]}
      />
    )
  );
};
