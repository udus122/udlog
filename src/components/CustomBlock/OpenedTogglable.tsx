import { Togglable } from "../Notion/Block/Togglable";
import type {TogglableProps} from '@/components/Notion/Block/Togglable'

export const OpenedTogglable: React.FC<TogglableProps> = (props) => {
  return <Togglable open {...props} />;
};
