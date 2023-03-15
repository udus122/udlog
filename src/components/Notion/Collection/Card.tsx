import { extractlastEditedTimeFromPage, extractTitleFromPageOrDatabase } from "@/libs/notion/utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { noImageUrl } from "@/constants";
import { format } from 'date-fns'

export const Card = ({ article }: { article: PageObjectResponse }) => {

  const coverImageUrl =
    article.cover?.type === "file"
      ? article.cover.file.url
      : article.cover?.external?.url;

  const lastEditedTime = extractlastEditedTimeFromPage(article)

  return (
    <div id={article.id} className="notion_collection_card">
      <a
        href={`/articles/${article.id}`}
        className="notion_collection_card__anchor"
      >
        <div className="notion_collection_card__cover">
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={coverImageUrl ? coverImageUrl : noImageUrl} />
        </div>
        <div className="notion_collection_card__content">
          <div className="notion_property notion_property__title">
            {extractTitleFromPageOrDatabase(article)}
          </div>
          <div className="notion_property notion_property_list">
            {/* NOTE: 最終的にはすべてのプロパティを走査して、propsでフィルターを掛けられるようにしたい。ひとまず、最終更新日を表示する */}
            <div>最終更新日</div>
            <div className="notion_property notion_property__date">{format(lastEditedTime, 'yyyy-MM-dd')}</div>
          </div>
        </div>
      </a>
    </div>
  );
};
