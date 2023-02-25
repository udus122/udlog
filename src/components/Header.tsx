import Image from "next/image";

type Props = React.ComponentProps<"header"> & {
  title: string;
  cover: { url: string } | null;
};

export const Header: React.FC<Props> = ({ title, cover, className }) => {
  return (
    <header className={`mb-4 w-full ${className}`}>
      <span className="relative block overflow-hidden opacity-100 h-72">
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
      <h1 className="my-5 min-h-[3rem] p-0.5 px-24 font-inter text-4xl font-bold">
        {title}
      </h1>
    </header>
  );
};
