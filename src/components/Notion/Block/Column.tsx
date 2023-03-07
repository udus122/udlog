import { ColumnBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  block: ColumnBlockObjectResponse;
  children?: React.ReactNode;
};

export const Column: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  return <div className={`${blockType}`}>{children}</div>;
};
