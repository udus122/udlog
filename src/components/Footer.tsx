import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="stack full-bleed flex flex-col place-items-center bg-zinc-900 px-8 py-16">
      <p className="">
        <Logo />
      </p>
      <p className="">© 2023 UD</p>
    </footer>
  );
};
