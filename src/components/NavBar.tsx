import { Logo } from "./Logo";

type Props = React.ComponentProps<"nav">;

export const NavBar: React.FC<Props> = ({}) => {
  return (
    <nav>
      <Logo />
    </nav>
  );
};
