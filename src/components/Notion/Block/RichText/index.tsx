import * as React from "react";

import { Text } from "./Text";
import { RichTextAnnotation } from "./Annotation";
import type {
  EquationRichTextItemResponse,
  MentionRichTextItemResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { InlineEquation } from "./InlineEquation";
import { Mention } from "./Mention";

export const RichText = ({
  richText,
}: {
  richText: RichTextItemResponse[] | undefined;
}) => {
  if (!richText) return null;
  const richTextComponentMapper = {
    text: ({ richTextItem }: { richTextItem: RichTextItemResponse }) => (
      <Text richTextItem={richTextItem as TextRichTextItemResponse} />
    ),
    equation: ({ richTextItem }: { richTextItem: RichTextItemResponse }) => (
      <InlineEquation
        richTextItem={richTextItem as EquationRichTextItemResponse}
      />
    ),
    mention: ({ richTextItem }: { richTextItem: RichTextItemResponse }) => (
      <Mention richTextItem={richTextItem as MentionRichTextItemResponse} />
    ),
  };
  return (
    <>
      {richText.map((richTextItem, index) => {
        if (!richTextItem) return null;
        const RichTextComponent = richTextComponentMapper[richTextItem.type];
        return (
          <RichTextAnnotation
            richTextItem={richTextItem}
            key={`${index}_${richTextItem.plain_text}`}
          >
            <RichTextComponent richTextItem={richTextItem} />
          </RichTextAnnotation>
        );
      })}
    </>
  );
};
