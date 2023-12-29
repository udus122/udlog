import { fetchDatabase } from "@udus/notion-renderer/libs";
import { Metadata } from "next";

import { client } from "@/client";
import PageList from "@/components/PageList";
import { REFERENCE_DATABASE_ID } from "@/constants";

import { loadReferences } from "./lib";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "References | UDlog",
};

export default async () => {
  const databaseResult = await fetchDatabase(client, {
    database_id: REFERENCE_DATABASE_ID,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;
  const initialPages = await loadReferences();

  return (
    <div className="reference">
      {database && (
        <PageList
          database={database}
          initialPages={initialPages}
          loadFn={loadReferences}
          displayProperties={["title", "Authors"]}
        />
      )}
    </div>
  );
};
