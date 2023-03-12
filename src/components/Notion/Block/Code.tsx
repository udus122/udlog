import React from "react";
import { RichText } from "./RichText";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";

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
  const blockType = `notion-${block.type}`;
  return (
    <div id={block.id} className={`${blockType}`}>
      <SyntaxHighlight
        text={block.code.rich_text[0].plain_text}
        language={block.code.language}
      />
      {block.code.caption && (
        <span className="notion-caption">
          <RichText richText={block.code.caption} />
        </span>
      )}
    </div>
  );
};
