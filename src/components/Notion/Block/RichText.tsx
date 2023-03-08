import * as React from "react";
import { generateBlockColorClass } from "@/libs/notion/utils";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

const Bold: React.FC<React.ComponentProps<"strong"> & {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <strong className="notion_blod">{children}</strong>
}
const Italic: React.FC<React.ComponentProps<"em">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <em className="notion_italic">{children}</em>
}
const Strikethrough: React.FC<React.ComponentProps<"del">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <del className="notion_strikethrough">{children}</del>
}
const Underline: React.FC<React.ComponentProps<"u">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <u className="notion_underline">{children}</u>
}
const InlineCode: React.FC<React.ComponentProps<"code">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <code className="notion_inline_code">{children}</code>
}
const InlineLink: React.FC<React.ComponentProps<"a">& {rich_text_item: RichTextItemResponse}> = ({rich_text_item,children}) => {
  return <a
  href={rich_text_item.href ?? ''}
  target="_blank"
  rel="noreferrer"
  className="notion_link"
>{children}</a>
}
const Color: React.FC<React.ComponentProps<"span"> & {rich_text_item: RichTextItemResponse}> = ({rich_text_item, children}) => {
  return <span className={`${generateBlockColorClass(rich_text_item.annotations.color)}`}>{children}</span>
}

const defaultAnnotationMapper = {
  color: Color,
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  underline: Underline,
  code: InlineCode,
  link: InlineLink
}

function annotatioRichText(rich_text_item: RichTextItemResponse, customAnnotationMapper = {}) {
  const annotationFlags = {
    color: generateBlockColorClass(rich_text_item.annotations.color) ? true : false,
    bold: rich_text_item.annotations.bold,
    italic: rich_text_item.annotations.italic,
    strikethrough: rich_text_item.annotations.strikethrough,
    underline: rich_text_item.annotations.underline,
    code: rich_text_item.annotations.code,
    link: rich_text_item.href ? true: false
  }

  const annotationMapper = {
    ...defaultAnnotationMapper,
    ...customAnnotationMapper
  }

  // FIXME: classType spanを一番外側に持っていきたい。今は一番内側
  let text = <span className={`notion_rich_text_${rich_text_item.type}`}>{rich_text_item.plain_text}</span>;
  Object.entries(annotationFlags).forEach(([AnnotationType, isAnnotate]) => {
    if (isAnnotate) {
      // @ts-ignore Get the component for the current annotation type from the mapper.
      const Annotation = annotationMapper[AnnotationType]
      // NOTE: be aware of the error "Element implicitly has an 'any' type because expression of type ...".
      text = <Annotation rich_text_item={rich_text_item}>{text}</Annotation>
    }
  })
  return text
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
        
        const annotatedText = annotatioRichText(rich_text_item)
        return (
          <React.Fragment key={index + rich_text_item.plain_text}>
            {annotatedText}
          </React.Fragment>
        );
      })}
    </>
  );
};