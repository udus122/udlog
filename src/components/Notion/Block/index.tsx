import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import type { BlockComponentMapper, ListWrapperObject } from "@/types";
import { BlockList } from "../BlockList";

export function Block({
  block,
  blocks,
  mapper,
}: {
  block: BlockObjectResponse | ListWrapperObject;
  blocks: BlockObjectResponse[];
  mapper: BlockComponentMapper;
}) {
  // @ts-ignore Get the component for the current block type from the mapper.
  const Component = mapper[block.type];
  // NOTE: be aware of the error "Element implicitly has an 'any' type because expression of type ...".

  // If the block is not supported, nothing is rendered.
  if (!Component) {
    console.warn(`${block.type} is not supported`);
    return null;
  }
  if (!block?.has_children) {
    // If the block does not have children, do not process recursively.
    return <Component block={block} blocks={blocks} mapper={mapper} />;
  } else {
    // For all other block types with children, process them recursively
    return (
      <Component block={block} blocks={blocks} mapper={mapper}>
        {/* @ts-ignore Notion types are incorrect */}
        <BlockList blocks={block[block.type].children} mapper={mapper} />
      </Component>
    );
  }
}
