import { Page } from "@udus/notion-renderer/components";

import { getBlocks, getPage } from "./lib";

export const revalidate = 3600;

export default async ({ params: { id } }: { params: { id: string } }) => {
  const page = await getPage(id);
  const blocks = await getBlocks(id);

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
