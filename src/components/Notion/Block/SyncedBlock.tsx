import type { BlockComponent } from "@/types";
import { SyncedBlockBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";

export const SyncedBlock: BlockComponent<SyncedBlockBlockObjectResponse> = ({
  block,
  blocks,
  children,
}) => {
  const isOriginal = block.synced_block.synced_from === null;
  return (
    <div
      className={clsx(
        "notion_synced_block",
        isOriginal ? "original" : "duplicate"
      )}
    >
      {children}
    </div>
  );
};
