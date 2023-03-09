import { isFullPage } from "@notionhq/client";
import { notion } from "./notion";

import {
  GetPageParameters,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Page関連
 */

export const retrieveFullPage = async (
  args: GetPageParameters
): Promise<PageObjectResponse> => {
  const pageObject = await notion.pages.retrieve(args);
  if (!isFullPage(pageObject)) {
    throw new Error("PartialPageObjectResponse was retrieved.");
  }
  return pageObject;
};
