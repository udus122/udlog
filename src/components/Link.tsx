import NextLink from "next/link";

import type { LinkComponent } from "@udus/notion-renderer/types";

export const Link: LinkComponent = ({ prefix = "", link, children = null }) => (
  <NextLink href={`${prefix}${link}`} className="notion-internal-link">
    {children}
  </NextLink>
);
