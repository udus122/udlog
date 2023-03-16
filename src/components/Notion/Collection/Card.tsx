import { extractTitleFromPageOrDatabase } from "@/libs/notion/utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { noImageUrl } from "@/constants";
import { format, parseISO } from "date-fns";
import { Icon } from "@/components/Notion/Block/Icon";

export const Card = ({ page }: { page: PageObjectResponse }) => {
  const coverImageUrl =
    page.cover?.type === "file"
      ? page.cover.file.url
      : page.cover?.external?.url;

  return (
    <div id={page.id} className="notion_collection_card">
      <a
        href={`/articles/${page.id}`}
        className="notion_collection_card__anchor"
      >
        <div className="notion_collection_card__cover">
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={coverImageUrl ? coverImageUrl : noImageUrl} />
        </div>
        <div className="notion_collection_card__content">
          <div className="notion_property notion_property__title">
            <Icon icon={page.icon} />
            <span>{extractTitleFromPageOrDatabase(page)}</span>
          </div>
          <div className="notion_property notion_property_list">
            {/* NOTE: 最終的にはすべてのプロパティを走査して、propsでフィルターを掛けられるようにしたい。ひとまず、最終更新日を表示する */}
            <div>最終更新日</div>
            <div className="notion_property notion_property__date">
              {format(parseISO(page.last_edited_time), "yyyy-MM-dd")}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
