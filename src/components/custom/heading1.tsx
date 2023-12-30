"use client";

import { OpenedHeading1 as Original } from "@udus/notion-renderer/components";

import type { Heading1Block } from "@udus/notion-renderer/types";

export const Heading1: Heading1Block = ({ block }) => {
  if (block.heading_1.color === "gray_background") return null;
  return <Original block={block} />;
};
