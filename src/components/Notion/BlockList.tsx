import type { BlockListComponentProps } from "@/types";

export const BlockList: React.FC<BlockListComponentProps> = function ({
  blocks,
  mapper,
}) {
  const Component = mapper.list_wrapper;
  // @ts-ignore
  return <Component blocks={blocks} mapper={mapper} />;
};
