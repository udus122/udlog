import { Logo } from "./Logo";

type Props = React.ComponentProps<"nav">;

export const NavBar: React.FC<Props> = ({ className = "" }) => {
  return (
    <nav className={`flex h-14 items-center justify-between p-2 ${className}`}>
      <Logo />
    </nav>
  );
};
