import { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  block: ColumnListBlockObjectResponse;
  children?: React.ReactNode;
};

export const ColumnList: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  return <div className={`${blockType} `}>{children}</div>;
};
