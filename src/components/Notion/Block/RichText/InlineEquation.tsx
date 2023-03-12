import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import type { EquationRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const InlineEquation = ({
  richTextItem,
}: {
  richTextItem: EquationRichTextItemResponse;
}) => (
  <span className="notion_rich_text_type_equation">
    <InlineMath math={richTextItem.equation.expression} />
  </span>
);
