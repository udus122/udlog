import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { BlockComponentMapper, defaultMapper } from "./mapper";

export function Block({
  block,
  blocks,
  customMapper = {},
}: {
  block: BlockObjectResponse;
  blocks: BlockObjectResponse[];
  customMapper?: BlockComponentMapper;
}) {
  const mapper = { ...defaultMapper, ...customMapper };
  const Component = mapper[block.type];

  let children: React.ReactNode[] | undefined;
  // Table blocks are handled a bit differently. See Table.tsx
  if (block.has_children && block.type !== "table") {
    // @ts-ignore Notion types are incorrect
    children = block[block.type].children?.map((child: BlockObjectResponse) => {
      return child && <Block block={child} key={child.id} blocks={blocks} />;
    });
  }

  return Component ? (
    <Component block={block} blocks={blocks}>
      {children}
    </Component>
  ) : null;
}
