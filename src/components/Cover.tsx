import { noImageUrl } from "@/constants";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { clsx } from "clsx";
import { Cover } from "./Notion/Page/Cover";

type Props = React.ComponentProps<"div"> & {
  page: PageObjectResponse | DatabaseObjectResponse;
};

export const PageCover: React.FC<Props> = function ({
  page,
  className,
  ...props
}) {
  return (
    <div className={clsx("notion_page_cover", className)} {...props}>
      <Cover cover={page.cover} alternativeImageUrl={noImageUrl} />
    </div>
  );
};
