import { generateBlockColorClass } from "@/libs/notion/utils";
import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./RichText";

type Props = React.ComponentProps<"main"> & {
  block: Heading2BlockObjectResponse;
  children?: React.ReactNode;
};

export const Heading2: React.FC<Props> = ({ block, children }) => {
  const blockType = `notion-${block.type}`;
  const blockColor = generateBlockColorClass(block.heading_2.color);
  return (
    <>
      {/* @ts-ignore Notion SDK types are incorrect */}
      {block.heading_2.is_toggleable ? (
        <details id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <summary>
            <h2>
              <RichText rich_text={block.heading_2.rich_text} />
            </h2>
          </summary>
          <div className={`notion-toggle__children`}>{children}</div>
        </details>
      ) : (
        <h2 id={block.id} className={`heading ${blockType} ${blockColor}`}>
          <RichText rich_text={block.heading_2.rich_text} />
        </h2>
      )}
    </>
  );
};
