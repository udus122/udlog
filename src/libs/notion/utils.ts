export function generateBlockColorClass(color: string): string {
  return color.includes("background")
    ? `bg-${color.split("_")[0]}`
    : `color-${color}`;
}
