import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { clsx } from "clsx";

import { extractTitleFromPageOrDatabase } from "@/libs/notion/utils";

type Props = React.ComponentProps<"h1"> & {
  page: PageObjectResponse | DatabaseObjectResponse;
};

export const NotionPageTitle: React.FC<Props> = function ({
  page,
  className,
  ...props
}) {
  const title = extractTitleFromPageOrDatabase(page);
  return (
    <h1 className={clsx("notion_page_title", className)} {...props}>
      {title}
    </h1>
  );
};
