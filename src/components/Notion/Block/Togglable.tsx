import { generateBlockColorClass } from "@/libs/notion/utils";
import { BlockComponentProps } from "@/types";
import { Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse, ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";

export type TogglableProps = React.ComponentProps<"details"> & {
  summary: React.ReactNode;
} & BlockComponentProps<
    | ToggleBlockObjectResponse
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
  >;

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
    <details id={block.id} className={clsx("notion_block", "notion_toggle", blockColor)} {...props}>
      <summary className="notion_toggle__summary">{summary}</summary>
      <div className="notion_toggle__content">
      {children}
      </div>
    </details>
  );
};
