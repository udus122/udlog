import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Card } from "./Card";

export const Gallery = ({ pages }: { pages: PageObjectResponse[] }) => {
  return (
    <div className="notion_collection notion_collection_gallery">
      {pages.map((page) => (
        <Card key={page.id} page={page} />
      ))}
    </div>
  );
};
