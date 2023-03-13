import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { BlockComponentMapper } from "@/types";

export function Block({
  block,
  blocks,
  mapper,
}: {
  block: BlockObjectResponse;
  blocks: BlockObjectResponse[];
  mapper: BlockComponentMapper;
}) {
  // @ts-ignore Get the component for the current block type from the mapper.
  const Component = mapper[block.type];
  // NOTE: be aware of the error "Element implicitly has an 'any' type because expression of type ...".

  if (!Component) {
    // console.warn(`${block.type} is not supported`);
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {block.type} is not supported block
      </div>
    );
  }
  // If the block does not have children, do not process recursively.
  if (!block.has_children) {
    return <Component block={block} blocks={blocks} mapper={mapper} />;
  }
  // Table blocks processes its child elements internally in Table.tsx.
  if (block.has_children && block.type === "table") {
    return <Component block={block} blocks={blocks} mapper={mapper} />;
    // For all other block types with children, process them recursively
  } else {
    return (
      <Component block={block} blocks={blocks} mapper={mapper}>
        {/* @ts-ignore Notion types are incorrect */}
        {block[block.type].children?.map((child: BlockObjectResponse) => {
          return (
            child && (
              <Block
                key={child.id}
                block={child}
                blocks={blocks}
                mapper={mapper}
              />
            )
          );
        })}
      </Component>
    );
  }
}
