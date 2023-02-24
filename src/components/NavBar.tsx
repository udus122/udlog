import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <div className="flex h-14 w-full items-center bg-gray-800 text-white">
      <nav className="justify-between p-2">
        <Link className="sticky px-4" href={"/articles"}>
          <span className="font-inter text-2xl font-semibold">🌀UDlog</span>
        </Link>
      </nav>
    </div>
  );
};
