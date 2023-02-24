import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <div className="flex h-14 w-full items-center bg-gray-800 text-white">
      <nav className="p-2 justify-between">
        <Link className="sticky px-4" href={"/articles"}>
          <span className="text-2xl font-semibold font-inter">🌀UDlog</span>
        </Link>
      </nav>
    </div>
  );
};
