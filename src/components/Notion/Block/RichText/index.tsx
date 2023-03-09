import * as React from "react";

import { generateBlockColorClass } from "@/libs/notion/utils";

import { Bold } from "./Blod";
import { Italic } from "./Italic";
import { Strikethrough } from "./Strikethrough";
import { Underline } from "./Underline";
import { InlineCode } from "./InlineCode";
import { Href } from "./Href";
import { Color } from "./Color";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

const defaultAnnotationMapper = {
  color: Color,
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  underline: Underline,
  code: InlineCode,
  href: Href,
};

function annotateRichText(
  rich_text_item: RichTextItemResponse,
  customAnnotationMapper = {}
) {
  const annotationFlags = {
    color: generateBlockColorClass(rich_text_item.annotations.color)
      ? true
      : false,
    bold: rich_text_item.annotations.bold,
    italic: rich_text_item.annotations.italic,
    strikethrough: rich_text_item.annotations.strikethrough,
    underline: rich_text_item.annotations.underline,
    code: rich_text_item.annotations.code,
    href: rich_text_item.href ? true : false,
  };

  const annotationMapper = {
    ...defaultAnnotationMapper,
    ...customAnnotationMapper,
  };

  let text = (
    <span className="notion_plain_text">{rich_text_item.plain_text}</span>
  );
  Object.entries(annotationFlags).forEach(([AnnotationType, isAnnotate]) => {
    if (isAnnotate) {
      // @ts-ignore Get the component for the current annotation type from the mapper.
      const Annotation = annotationMapper[AnnotationType];
      // NOTE: be aware of the error "Element implicitly has an 'any' type because expression of type ...".
      text = <Annotation rich_text_item={rich_text_item}>{text}</Annotation>;
    }
  });
  return text;
}

export const RichText = ({
  rich_text,
}: {
  rich_text: RichTextItemResponse[];
}) => {
  return (
    <>
      {rich_text.map((rich_text_item, index) => {
        if (!rich_text_item) return null;

        const annotatedText = annotateRichText(rich_text_item);
        return (
          <span
            className={`notion_rich_text_type_${rich_text_item.type}`}
            key={index + rich_text_item.plain_text}
          >
            {annotatedText}
          </span>
        );
      })}
    </>
  );
};
