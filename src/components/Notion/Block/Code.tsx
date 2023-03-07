import React from "react";
import {
  BlockObjectResponse,
  CodeBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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

type Props = {
  block: CodeBlockObjectResponse;
};

export const Code: React.FC<Props> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  return (
    <div className={`${blockType}`}>
      <SyntaxHighlight
        text={block.code.rich_text[0].plain_text}
        language={block.code.language}
      />
      {block.code.caption && (
        <span className="notion-caption">
          <RichText rich_text={block.code.caption} />
        </span>
      )}
    </div>
  );
};
