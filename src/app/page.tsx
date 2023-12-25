import { Page } from "@udus/notion-renderer/components";
import { fetchDatabase, fetchPage } from "@udus/notion-renderer/libs";

import { client } from "@/client";

import { loadArticles } from "./actions";
import Top from "./top";

export default async () => {
  const page_id = "4553dcd168664730aa8723e1cace3d7e";
  const database_id = "0c610de6533f47c2a6b3aa38d306ee79";
  const pageResult = await fetchPage(client, {
    page_id,
  });
  const page = pageResult.ok ? pageResult.data : undefined;

  const databaseResult = await fetchDatabase(client, {
    database_id,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;

  const initialPages = await loadArticles();

  return (
    <>
      <header>{page && <Page page={page} />}</header>
      <main>
        {database && <Top database={database} initialPages={initialPages} />}
      </main>
      <footer></footer>
    </>
  );
};
