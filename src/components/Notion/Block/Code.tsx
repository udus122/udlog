import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const Code = ({
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