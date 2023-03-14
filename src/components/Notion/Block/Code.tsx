import React from "react";
import { RichText } from "./RichText";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";
import clsx from "clsx";

const SyntaxHighlight = ({
  text,
  language,
}: {
  text: string;
  language: string;
}) => {
  return (
    <SyntaxHighlighter language={language} style={monokai}>
      {text}
    </SyntaxHighlighter>
  );
};

export const Code: BlockComponent<CodeBlockObjectResponse> = ({ block }) => {
  const blockType = "notion_code";
  const text = block.code.rich_text.map((txt) => txt.plain_text).join('')
  const language = block.code.language
  return (
    <div id={block.id} className={clsx("notion_block", blockType)}>
      <SyntaxHighlight
        text={text}
        language={language}
      />
      {block.code.caption && (
        <span className="notion_caption">
          <RichText richText={block.code.caption} />
        </span>
      )}
    </div>
  );
};
