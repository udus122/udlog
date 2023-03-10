import { Logo } from "./Logo";

type Props = React.ComponentProps<"footer">;

export const Footer: React.FC<Props> = ({ ...props }) => {
  return (
    <footer {...props}>
      <p>
        <Logo />
      </p>
      <p>© 2023 UD</p>
    </footer>
  );
};
