import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="flex flex-col px-8 py-16 stack place-items-center bg-zinc-900">
      <p className="">
        <Logo />
      </p>
      <p className="">© 2023 UD</p>
    </div>
  );
};
