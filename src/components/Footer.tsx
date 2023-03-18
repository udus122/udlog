import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="flex flex-col px-8 py-16 place-items-center stack">
      <p className="">
        <Logo />
      </p>
      <p className="">© 2023 UD</p>
    </footer>
  );
};
