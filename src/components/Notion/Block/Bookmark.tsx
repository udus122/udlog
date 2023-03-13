import React, { useState, useEffect } from "react";
import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockComponent } from "@/types";

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
}

export const Bookmark: BlockComponent<BookmarkBlockObjectResponse> = ({
  block,
}) => {
  const [metadata, setMetadata] = useState<Metadata>();
  const url = React.useMemo(() => {
    return new URL(block.bookmark.url);
  }, [block.bookmark.url]);

  useEffect(() => {
    try {
      fetch(`/api/url-metadata?url=${url.toString()}`)
        .then((res) => res.json())
        .then((data) => setMetadata(data as Metadata));
    } catch (e) {
      console.log(e);
    }
  }, [url]);
  // TODO: レイアウトシフトが発生するのでスケルトンを導入する
  if (!metadata || !url) return null;

  const { title, description, image } = metadata;

  return (
    <div className="notion_bookmark">
      <a href={url.toString()} target="_blank" rel="noopener noreferrer">
        <div className="notion_bookmark__content">
          <div className="notion_bookmark__title">{title ? title : ""}</div>
          <div className="notion_bookmark__description">
            {description ? description : ""}
          </div>
          <div className="notion_bookmark__link">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${url.hostname}`}
              />
            </div>
            <p>{url.origin}</p>
          </div>
        </div>
        <div className="notion_bookmark__cover">
          {image ? (
            <picture>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={image} loading="lazy" decoding="async" />
            </picture>
          ) : null}
        </div>
      </a>
    </div>
  );
};
