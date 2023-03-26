export const getNotionIdfromUrl = (url: string): string | null => {
  // NotionのページのURLのパターン
  const regexes = [
    /(?:https?:\/\/)?(?:www\.)?notion\.so\/(?:[a-zA-Z]+)\/.*?([0-9a-f]{32})/,
    /^\/([a-f0-9]{32})$/,
  ];
  for (const regex of regexes) {
    // URLからNotionページのIDを抽出する
    const match = url.match(regex);
    if (match) {
      // IDを返す
      return match[1];
    } else {
      // IDが見つからなかった場合はnullを返す
      continue
    }
  }
  return null;
};
