import { Logo } from "./Logo";
import { clsx } from "clsx";
import Link from "next/link";

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
      <div className="flex gap-4 p-6 ml-auto">
        <Link href="/about">About</Link>
        <Link href="/articles">記事</Link>
        <Link href="/references">文献</Link>
      </div>
    </nav>
  );
};
