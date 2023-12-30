"use client";

import { Quote as Original } from "@udus/notion-renderer/components";

import type { QuoteBlock } from "@udus/notion-renderer/types";

export const Quote: QuoteBlock = ({ block }) => {
  if (block.quote.color === "gray_background") return null;
  return <Original block={block} />;
};
