"use client";

import { Paragraph as Original } from "@udus/notion-renderer/components";

import type { ParagraphBlock } from "@udus/notion-renderer/types";

export const Paragraph: ParagraphBlock = ({ block }) => {
  if (block.paragraph.color === "gray_background") return null;
  return <Original block={block} />;
};
