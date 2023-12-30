"use client";

import { OpenedHeading2 as Original } from "@udus/notion-renderer/components";

import type { Heading2Block } from "@udus/notion-renderer/types";

export const Heading2: Heading2Block = ({ block }) => {
  if (block.heading_2.color === "gray_background") return null;
  return <Original block={block} />;
};
