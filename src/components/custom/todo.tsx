"use client";

import { ToDo as Original } from "@udus/notion-renderer/components";

import type { ToDoBlock } from "@udus/notion-renderer/types";

export const ToDo: ToDoBlock = ({ block }) => {
  if (block.to_do.color === "gray_background") return null;
  return <Original block={block} />;
};
