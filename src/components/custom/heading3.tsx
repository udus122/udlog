"use client";

import { OpenedHeading3 as Original } from "@udus/notion-renderer/components";

import type { Heading3Block } from "@udus/notion-renderer/types";

export const Heading3: Heading3Block = ({ block }) => {
  if (block.heading_3.color === "gray_background") return null;
  return <Original block={block} />;
};
