"use client";

import { BulletedListItem as Original } from "@udus/notion-renderer/components";

import type { BulletedListItemBlock } from "@udus/notion-renderer/types";

export const BulletedListItem: BulletedListItemBlock = ({ block }) => {
  if (block.bulleted_list_item.color === "gray_background") return null;
  return <Original block={block} />;
};
