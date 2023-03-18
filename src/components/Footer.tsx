import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="flex flex-col px-8 py-16 stack full-bleed place-items-center bg-zinc-900">
      <p className="">
        <Logo />
      </p>
      <p className="">© 2023 UD</p>
    </footer>
  );
};
