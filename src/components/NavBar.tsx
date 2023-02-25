import { Logo } from "./Logo";

type Props = React.ComponentProps<"nav">

export const NavBar: React.FC<Props> = ({className}) => {
  return (
    <nav className={`flex items-center w-full h-14 ${className}`}>
      <div className="justify-between p-2">
        <Logo />
      </div>
    </nav>
  );
};
