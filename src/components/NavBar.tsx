import { Logo } from "./Logo";
import { clsx } from "clsx";

type Props = React.ComponentProps<"nav">;

export const NavBar: React.FC<Props> = ({ className, ...props }) => {
  return (
    <nav
      className={clsx(
        "flex h-[var(--navbar-height)] items-center bg-default p-6",
        "notion_navbar",
        className
      )}
      {...props}
    >
      <Logo />
    </nav>
  );
};
