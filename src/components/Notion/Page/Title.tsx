import { getPlainTextFromRichText } from "@/libs/notion/utils";
import { TitleProperty } from "@/types";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { clsx } from "clsx";

function extractTitle(
  page: PageObjectResponse | DatabaseObjectResponse
): string {
  // DatabaseObject
  if ("title" in page) {
    return getPlainTextFromRichText(page.title);
  }
  // PageObject
  const titleProperty = Object.values(page.properties).find(
    (property): property is TitleProperty => property.type === "title"
  );
  if (titleProperty?.title) {
    return getPlainTextFromRichText(titleProperty?.title);
  }
  throw new Error("Title is not found.");
}

type Props = React.ComponentProps<"h1"> & {
  page: PageObjectResponse | DatabaseObjectResponse;
};

export const NotionPageTitle: React.FC<Props> = function ({
  page,
  className,
  ...props
}) {
  const title = extractTitle(page);
  return (
    <h1 className={clsx("notion_page_title", className)} {...props}>
      {title}
    </h1>
  );
};
