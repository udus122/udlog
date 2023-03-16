import { NotionIcon } from "@/types";

export const Icon = ({ icon }: { icon: NotionIcon }) => {
  if (icon?.type === "emoji") {
    return <span className="notion_icon">{icon.emoji}</span>;
  } else if (icon?.type === "external") {
    return (
      <span className="notion_icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.external.url} alt="notion icon" />
      </span>
    );
  } else if (icon?.type === "file") {
    console.warn("icon type 'file' is not yet supported.");
    return null;
  } else {
    return null
  }
};
