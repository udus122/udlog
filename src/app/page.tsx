import { Page } from "@udus/notion-renderer/components";
import {
  fetchDatabase,
  fetchDatabaseItems,
  fetchPage,
} from "@udus/notion-renderer/libs";

import { memoClient } from "@/client";

import Top from "./top";

export default async function Home() {
  const page_id = "4553dcd168664730aa8723e1cace3d7e";
  const database_id = "0c610de6533f47c2a6b3aa38d306ee79";
  const pageResult = await fetchPage(memoClient, {
    page_id,
  });
  const page = pageResult.ok ? pageResult.data : undefined;

  const databaseResult = await fetchDatabase(memoClient, {
    database_id,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;

  const queryResult = await fetchDatabaseItems(memoClient, {
    database_id,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "公開",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: 10,
  });
  const pages = queryResult.ok ? queryResult.data.results : undefined;

  return (
    page && (
      <>
        <header>
          <Page page={page} />
        </header>
        <main>
          {database && pages && (
            <Top database={database} initialPages={pages} />
          )}
        </main>
      </>
    )
  );
}
