"use client";

import { NumberedListItem as Original } from "@udus/notion-renderer/components";

import type { NumberedListItemBlock } from "@udus/notion-renderer/types";

export const NumberedListItem: NumberedListItemBlock = ({ block }) => {
  if (block.numbered_list_item.color === "gray_background") return null;
  return <Original block={block} />;
};
