"use client";

import { OpenedToggle } from "@udus/notion-renderer/components";

import type { ToggleBlock } from "@udus/notion-renderer/types";

export const Toggle: ToggleBlock = ({ block }) => {
  if (block.toggle.color === "gray_background") return null;
  return <OpenedToggle block={block} />;
};
