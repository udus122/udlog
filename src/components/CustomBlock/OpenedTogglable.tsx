import { Togglable } from "@/components/Notion/Block/Togglable";
import type { TogglableProps } from "@/types";

export const OpenedTogglable: React.FC<TogglableProps> = (props) => {
  return <Togglable open {...props} />;
};
