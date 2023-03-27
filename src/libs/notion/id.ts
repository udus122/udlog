export const extractNotionIdfromUrl = (url: string): string | null => {
  // Notionのページ/データベースURLのパターン
  const regexes = [
    // private link
    /(?:https?:\/\/)?(?:www\.)?notion\.so\/(?:[a-zA-Z]+\/)?.*?([0-9a-f]{32})\/?/,
    // public link
    /(?:https?:\/\/)?[a-zA-Z]+\.?notion\.site\/.*?([0-9a-f]{32})\/?/,
    // internal link or pure id
    /^\/?([a-f0-9]{32})\/?$/,
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

export function addDashesToUUID(uuid: string): string | null {
  if (!/^[0-9a-f]{32}$/.test(uuid)) {
    return null;
  }

  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}
