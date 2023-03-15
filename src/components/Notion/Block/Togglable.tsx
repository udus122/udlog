import { generateBlockColorClass } from "@/libs/notion/utils";
import { TogglableProps } from "@/types";
import clsx from "clsx";

export const Togglable: React.FC<TogglableProps> = ({
  block,
  className,
  children,
  summary,
  ...props
}) => {
  // @ts-ignore
  const blockColor = generateBlockColorClass(block[block.type].color);
  return (
    <details
      id={block.id}
      className={clsx("notion_block", "notion_toggle", blockColor)}
      {...props}
    >
      <summary className="notion_toggle__summary">{summary}</summary>
      <div className="notion_toggle__content">{children}</div>
    </details>
  );
};
