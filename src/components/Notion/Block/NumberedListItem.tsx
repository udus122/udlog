import { generateBlockColorClass } from "@/libs/notion/utils";
import { BlockObjectResponse, NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = {
  block: NumberedListItemBlockObjectResponse;
  blocks: BlockObjectResponse[]
  children?: React.ReactNode;
};

export const NumberedListItem: React.FC<Props> = ({ block, blocks, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.numbered_list_item.color);
  const itemPosition = blocks?.findIndex(
    (blocksBlock) => block.id === blocksBlock.id
  );
  // Count backwards to find the number of numbered_list_item blocks before hitting a non-numbered_list_item block
  // Notions API does not give any information about the position of the block in the list so we need to calculate it
  let listNumber = 0;
  for (let i = itemPosition; i >= 0; i--) {
    let blocksBlock = blocks[i];
    if (blocksBlock.type === "numbered_list_item") {
      listNumber++;
    } else {
      break;
    }
  }
  return (
    <ol start={listNumber} className={`${blockType}_container ${blockColor}`}>
      <li className={`${blockType}`}>
        <RichText rich_text={block.numbered_list_item.rich_text} />
      </li>
      {children}
    </ol>
  );
};
