import { Page } from "@udus/notion-renderer/components";

import PageList from "@/components/PageList";
import { TOP_PAGE_ID } from "@/constants";
import { loadPage, loadDatabase } from "@/lib/notion";

import { loadArticles } from "./articles/lib";

export default async () => {
  const page = await loadPage({
    page_id: TOP_PAGE_ID,
  });
  const database = await loadDatabase();
  const initialPages = await loadArticles();

  return (
    <div>
      {page && <Page page={page} />}
      {database && (
        <PageList
          database={database}
          initialPages={initialPages}
          loadFn={loadArticles}
          displayProperties={["title", "Published", "Tags"]}
          hideCover
          hideDescription
          hideIcon
          hideTitle
        />
      )}
    </div>
  );
};
