import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  cover: { url: string } | null;
};

export const Header: React.FC<Props> = ({ title, cover }) => {
  return (
    <div className="mb-4 w-full">
      <span className="relative block h-72 overflow-hidden bg-gray-800 opacity-100">
        {cover !== null ? (
          <Image
            alt="Next.js logo"
            src={cover.url}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </span>
      <h1 className="my-5 min-h-[3rem] bg-gray-800 p-0.5 px-24 font-inter text-4xl font-bold text-white">
        {title}
      </h1>
    </div>
  );
};
