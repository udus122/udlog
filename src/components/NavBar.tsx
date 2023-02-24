import { Logo } from "./Logo";

export const NavBar: React.FC = () => {
  return (
    <div className="flex items-center w-full h-14">
      <nav className="justify-between p-2">
        <Logo />
      </nav>
    </div>
  );
};
