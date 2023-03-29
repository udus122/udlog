export const noImageUrl = "/no_image_240_180.png" as const satisfies string;

export const ARTICLE_DB_FILTER = {
  and: [{ property: "Status", status: { equals: "公開" } }],
};

export const REFERENCE_DB_FILTER = {
  and: [
    {
      or: [
        { property: "進捗/評価", status: { equals: "★" } },
        { property: "進捗/評価", status: { equals: "★★" } },
        { property: "進捗/評価", status: { equals: "★★★" } },
        { property: "進捗/評価", status: { equals: "★★★★" } },
        { property: "進捗/評価", status: { equals: "★★★★★" } },
      ],
    },
  ],
};
