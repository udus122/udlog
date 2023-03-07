import { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = { block: DividerBlockObjectResponse };

export const Divider: React.FC<Props> = ({ block }) => {
  const blockType = `notion-${block.type}`;
  return <hr className={`${blockType}`} />;
};
