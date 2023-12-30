"use client";

import type { ColorAnnotationItem } from "@udus/notion-renderer/types";

export const Color: ColorAnnotationItem = ({ richTextItem, children }) => {
  if (richTextItem.annotations.color === "gray_background") return null;

  return (
    <span className={`notion-color-${richTextItem.annotations.color}`}>
      {children}
    </span>
  );
};
