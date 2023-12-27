import {
  OpenedHeading1,
  OpenedHeading2,
  OpenedHeading3,
  OpenedToggle,
  Page,
  RenderConfig,
} from "@udus/notion-renderer/components";

import { loadPage, loadBlocks } from "@/lib/notion";

export const revalidate = 3600;

export default async ({ params: { id } }: { params: { id: string } }) => {
  const page = await loadPage({ page_id: id });
  const blocks = await loadBlocks({ block_id: id });

  return (
    page &&
    blocks && (
      <RenderConfig
        blockMapper={{
          heading_1: OpenedHeading1,
          heading_2: OpenedHeading2,
          heading_3: OpenedHeading3,
          toggle: OpenedToggle,
        }}
      >
        <Page
          page={page}
          displayProperties={["Published", "Category", "Tags"]}
          blocks={blocks}
        />
      </RenderConfig>
    )
  );
};
