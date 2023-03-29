import { addDashesToUUID, extractNotionIdfromUrl } from "@/libs/notion/id";

export function pageIdToBlogUrl(
  id: string,
  prefix: string | undefined = undefined
): string {
  if (!prefix) {
    return `/${id}`;
  }
  return `/${prefix}/${id}`;
}

export function parseLinkUrl(url: string) {
  const notionId = extractNotionIdfromUrl(url);
  if (notionId) {
    const pageId = addDashesToUUID(notionId);
    const blogUrl = pageIdToBlogUrl(pageId ?? "");
    return blogUrl;
  }
  return url;
}

