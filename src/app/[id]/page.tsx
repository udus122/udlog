import { Page } from "@udus/notion-renderer/components";

import { loadPage, loadBlocks } from "@/lib/notion";

export const revalidate = 3600;

export default async ({ params: { id } }: { params: { id: string } }) => {
  const page = await loadPage({ page_id: id });
  const blocks = await loadBlocks({ block_id: id });

  return (
    page &&
    blocks && (
      <Page
        page={page}
        displayProperties={["Published", "Category", "Tags"]}
        blocks={blocks}
      />
    )
  );
};
