import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type Props = {
  cover: PageObjectResponse["cover"] | DatabaseObjectResponse["cover"];
  alternativeImageUrl: string;
};

export const Cover: React.FC<Props> = function ({
  cover,
  alternativeImageUrl,
}) {
  if (cover?.type === "external") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={"notion_cover"}
        src={cover?.external.url ?? alternativeImageUrl}
        alt="notion cover"
      />
    );
  } else if (cover?.type === "file") {
    console.warn("icon type 'file' is not yet supported.");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={"notion_cover"}
        src={alternativeImageUrl}
        alt="notion cover"
      />
    );
  } else {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={"notion_cover"}
        src={alternativeImageUrl}
        alt="notion cover"
      />
    );
  }
};
