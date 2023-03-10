import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link href={"/"}>
      <span className="text-xl">
        🌀<span className="ml-1">UDlog</span>
      </span>
    </Link>
  );
};
