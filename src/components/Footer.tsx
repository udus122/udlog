import { Logo } from "./Logo";

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="flex flex-col py-16 align bg-zinc-900 px-9">
      <div className="flex self-center my-5">
        <Logo />
      </div>
      <p className="self-center my-5">© 2023 UD</p>
    </footer>
  );
};
