import { generateBlockColorClass } from "@/libs/notion/utils";
import type { BlockComponent } from "@/types";
import { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { RichText } from "./RichText";

export const ToDo: BlockComponent<ToDoBlockObjectResponse> = ({
  block,
  children,
}) => {
  const isChecked = block.to_do.checked;
  const blockColor = generateBlockColorClass(block.to_do.color);
  return (
    <div
      id={block.id}
      className={clsx("notion_block", "notion_to_do", blockColor)}
    >
      <div className="notion_to_do__content">
        <div className="notion_to_do__icon">
          {isChecked ? <CheckedBox /> : <CheckBox />}
        </div>
        <div className={clsx("notion_to_do__title", isChecked && "checked")}>
          <RichText richText={block.to_do.rich_text} />
        </div>
      </div>
      <div className="notion_to_do__children">{children}</div>
    </div>
  );
};

const CheckBox = () => (
  <div className="notion_checkbox">
    <svg viewBox="0 0 16 16">
      <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
    </svg>
  </div>
);

const CheckedBox = () => (
  <div className="notion_checkbox checked">
    <svg viewBox="0 0 14 14">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
    </svg>
  </div>
);
