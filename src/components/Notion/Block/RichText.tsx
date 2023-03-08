import {Fragment} from "react";
import { generateBlockColorClass } from "@/libs/notion/utils";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";


function annotatioRichText(rich_text_item: RichTextItemResponse) {
  const {color, bold, italic, strikethrough, underline, code} = rich_text_item.annotations;

  const richTextTypeClass = `notion_rich_text_${rich_text_item.type}`
  const colorClass = generateBlockColorClass(color)
  let text = <span className={`${richTextTypeClass}, ${colorClass}`}>{rich_text_item.plain_text}</span>;
  if (bold) {
    text = <strong>{text}</strong>;
  }
  if (italic) {
    text = <em>{text}</em>;
  }
  if (strikethrough) {
    text = <del>{text}</del>;
  }
  if (underline) {
    text = <u>{text}</u>;
  }
  if (code) {
    // Remove "`" from text
    text = <code className="notion_inline_code">{text}</code>;
  }
  if (rich_text_item.href) {
    text = (
      <a
        href={rich_text_item.href}
        target="_blank"
        rel="noreferrer"
        className="notion_link"
      >
        {text}
      </a>
    );
  }
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
          <Fragment key={index + rich_text_item.plain_text}>
            {annotatedText}
          </Fragment>
        );
      })}
    </>
  );
};