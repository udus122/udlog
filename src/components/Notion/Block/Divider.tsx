import type { BlockComponentProps } from "@/types";
import { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { clsx } from "clsx";

type Props = React.ComponentProps<"hr"> &
  Partial<BlockComponentProps<DividerBlockObjectResponse>>;

export const Divider: React.FC<Props> = ({
  className,
  block,
  blocks,
  mapper,
  ...props
}) => {
  return <hr className={clsx("notion_divider", className)} {...props} />;
};
