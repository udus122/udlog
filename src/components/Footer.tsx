import { Logo } from "./Logo";

type Props = React.ComponentProps<"footer">;

export const Footer: React.FC<Props> = ({ className = "" }) => {
  return (
    <footer
      className={`flex flex-col items-center bg-zinc-900 py-16 px-9 ${className}`}
    >
      <div className="my-5">
        <Logo />
      </div>
      <p className="my-5">© 2023 UD</p>
    </footer>
  );
};
