import { extractTitleFromPageOrDatabase } from "@/libs/notion/utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { noImageUrl } from "@/constants";
import { format, parseISO } from "date-fns";
import { Icon } from "@/components/Notion/Block/Icon";
import { Cover } from "@/components/Notion/Page/Cover";

export const Card = ({ page }: { page: PageObjectResponse }) => {
  return (
    <div id={page.id} className="notion_collection_card">
      <a
        href={`/articles/${page.id}`}
        className="notion_collection_card__anchor"
      />
      <div className="notion_collection_card__cover">
        <Cover cover={page.cover} alternativeImageUrl={noImageUrl} />
      </div>
      <div className="notion_collection_card__content">
        <div className="notion_property_item notion_property_item__title">
          <Icon icon={page.icon} />
          <span>{extractTitleFromPageOrDatabase(page)}</span>
        </div>
        <div className="notion_property_list">
          {/* NOTE: 最終的にはすべてのプロパティを走査して、propsでフィルターを掛けられるようにしたい。ひとまず、最終更新日を表示する */}
          <div className="notion_property_item">
            <div className="notion_property_item__date">
              {format(parseISO(page.last_edited_time), "yyyy-MM-dd")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
