import {
  OpenedHeading1,
  OpenedHeading2,
  OpenedHeading3,
  OpenedToggle,
  Page,
  RenderConfig,
} from "@udus/notion-renderer/components";
import { extractTitle } from "@udus/notion-renderer/utils";
import { Metadata } from "next";

import { loadPage, loadBlocks } from "@/lib/notion";

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const page = await loadPage({ page_id: id });

  if (!page) {
    return { title: "UDlog" };
  }

  return {
    title: `${extractTitle(page)
      .map((text) => text.plain_text)
      .join("")} | UDlog`,
  };
}

export default async ({ params: { id } }: Props) => {
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
