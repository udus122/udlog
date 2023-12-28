import { fetchDatabase } from "@udus/notion-renderer/libs";

import { client } from "@/client";
import PageList from "@/components/PageList";
import { REFERENCE_DATABASE_ID } from "@/constants";

import { loadReferences } from "./lib";
import styles from "./page.module.css";

export default async () => {
  const databaseResult = await fetchDatabase(client, {
    database_id: REFERENCE_DATABASE_ID,
  });
  const database = databaseResult.ok ? databaseResult.data : undefined;
  const initialPages = await loadReferences();

  return (
    <div className={styles.references}>
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
