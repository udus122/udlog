"use client";

import { RichText } from "@udus/notion-renderer/components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import type { CodeBlock } from "@udus/notion-renderer/types";

export const Code: CodeBlock = ({ block }) => {
  return (
    <div id={block.id} className="notion-block notion-code">
      <div className="notion-code-header">
        <div className="notion-code-langage">{block.code.language}</div>
      </div>
      <SyntaxHighlighter
        language={
          block.code.language === "plain text" ? "text" : block.code.language
        }
        style={a11yDark}
      >
        {block.code.rich_text.map((t) => t.plain_text).join("")}
      </SyntaxHighlighter>
      {block.code.caption && (
        <div className="notion-caption notion-code-caption">
          <RichText richText={block.code.caption} />
        </div>
      )}
    </div>
  );
};
