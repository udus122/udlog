import Image from "next/image";

type Props = React.ComponentProps<"header"> & {
  title: string;
  cover: { url: string } | null;
};

export const Header: React.FC<Props> = ({ title, cover }) => {
  return (
    <header>
      <span>
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
      <h1>{title}</h1>
    </header>
  );
};
