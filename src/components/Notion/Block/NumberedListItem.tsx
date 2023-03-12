import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const NumberedListItem: BlockComponent<
  NumberedListItemBlockObjectResponse
> = ({ block, blocks, children }) => {
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
  console.log(JSON.stringify(block.numbered_list_item.rich_text.map((el) => el.plain_text)))
  console.log(listNumber);
  return (
    <ol id={block.id} start={listNumber} className={clsx("notion_block", "notion_numbered_list",blockColor)}>
      <li className="notion_numbered_list_item">
        <RichText richText={block.numbered_list_item.rich_text} />
      </li>
      {children}
    </ol>
  );
};
