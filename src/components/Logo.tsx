import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link className="sticky px-4" href={"/"}>
      <span className="text-2xl font-semibold font-inter">🌀UDlog</span>
    </Link>
  );
};
