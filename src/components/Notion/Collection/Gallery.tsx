import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Card } from "./Card";

export const Gallery = ({ articles }: { articles: PageObjectResponse[] }) => {
  return (
    <div className="notion_collection notion_collection_gallery">
      {articles.map((article) => (
        <Card key={article.id} article={article} />
      ))}
    </div>
  );
};
