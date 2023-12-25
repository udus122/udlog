"use client";
import { Database } from "@udus/notion-renderer/components";
import { useState } from "react";

import type {
  DatabaseObject,
  PageObject,
} from "@udus/notion-renderer/dist/types";

export default function Top({
  database,
  initialPages,
}: {
  database: DatabaseObject;
  initialPages: PageObject[];
}) {
  const [pages, setPages] = useState(initialPages);
  return (
    <Database
      database={database}
      pages={pages}
      hideCover
      hideDescription
      hideIcon
      hideTitle
      viewType="gallery"
      displayProperties={["title", "Published"]}
    />
  );
}
