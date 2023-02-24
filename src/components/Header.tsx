import Image from "next/image";

type Props = {
  title: string;
  cover: { url: string } | null;
};

export const Header: React.FC<Props> = ({ title, cover }) => {
  return (
    <div className="mb-4 w-full">
      <span className="block relative h-72 overflow-hidden opacity-100">
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
    </div>
  );
};
