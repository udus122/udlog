import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponentProps } from "@/types";
import { RichText } from "./RichText";
import { Togglable as DefaultTogglable } from "./Togglable";

type Props = React.ComponentProps<"details"> &
  BlockComponentProps<ToggleBlockObjectResponse>;

export const Toggle: React.FC<Props> = ({
  block,
  blocks,
  children,
  mapper,
  ...props
}) => {
  const Togglable = mapper?.togglable ?? DefaultTogglable
  return (
    <Togglable
      block={block}
      summary={<RichText richText={block.toggle.rich_text} />}
      {...props}
    >
      {children}
    </Togglable>
  );
};
