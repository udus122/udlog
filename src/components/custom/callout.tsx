"use client";

import { Callout as Original } from "@udus/notion-renderer/components";

import type { CalloutBlock } from "@udus/notion-renderer/types";

export const Callout: CalloutBlock = ({ block }) => {
  if (block.callout.color === "gray_background") return null;
  return <Original block={block} />;
};
