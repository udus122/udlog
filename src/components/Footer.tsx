import { Logo } from "./Logo";

type Props = React.ComponentProps<"footer">;

export const Footer: React.FC<Props> = ({}) => {
  return (
    <footer>
      <div>
        <Logo />
      </div>
      <p>© 2023 UD</p>
    </footer>
  );
};
