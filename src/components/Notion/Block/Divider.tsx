import type { BlockComponentProps } from "@/types";
import { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { clsx } from 'clsx';

type Props = React.ComponentProps<"hr"> &
  BlockComponentProps<DividerBlockObjectResponse>;

export const Divider: React.FC<Props> = ({ className, ...props }) => {
  return <hr className={clsx("notion_divider", className)} {...props} />;
};
