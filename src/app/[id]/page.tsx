import { Page, RenderConfig } from "@udus/notion-renderer/components";
import { extractTitle } from "@udus/notion-renderer/utils";
import { Metadata } from "next";

import { BulletedListItem } from "@/components/custom/bulltedListItem";
import { Callout } from "@/components/custom/callout";
import { Color } from "@/components/custom/color";
import { Heading1 } from "@/components/custom/heading1";
import { Heading2 } from "@/components/custom/heading2";
import { Heading3 } from "@/components/custom/heading3";
import { NumberedListItem } from "@/components/custom/numberedListItem";
import { Paragraph } from "@/components/custom/paragraph";
import { Quote } from "@/components/custom/quote";
import { ToDo } from "@/components/custom/todo";
import { Toggle } from "@/components/custom/toggle";
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
          bulleted_list_item: BulletedListItem,
          callout: Callout,
          heading_1: Heading1,
          heading_2: Heading2,
          heading_3: Heading3,
          numbered_list_item: NumberedListItem,
          paragraph: Paragraph,
          quote: Quote,
          to_do: ToDo,
          toggle: Toggle,
        }}
        annotationMapper={{ color: Color }}
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
