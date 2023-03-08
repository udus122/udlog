export function generateBlockColorClass(notionColor: string): string | undefined {
  if (notionColor.includes("default")) {
    return
  }
  return `color_${notionColor}`;
}
