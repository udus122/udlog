import { extractNotionIdfromUrl } from "./id";

describe("urlからnotonのIDを取得する関数のテスト", () => {
  test("ワークスペース内の他のページへのリンク", () => {
    expect(extractNotionIdfromUrl("/0581ec5b0d9d4448bea936fc4eafbd32")).toBe(
      "0581ec5b0d9d4448bea936fc4eafbd32"
    );
    expect(extractNotionIdfromUrl("")).toBeNull();
  });
  test("notion.soから始まるページリンク", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/udusd/0581ec5b0d9d4448bea936fc4eafbd32?pvs=4"
      )
    ).toBe("0581ec5b0d9d4448bea936fc4eafbd32");
  });
  test("VIEW ID付きのデータベース", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/udusd/0c610de6533f47c2a6b3aa38d306ee79?v=b027e07cf2b74ddab9446c1b34c0a573&pvs=4"
      )
    ).toBe("0c610de6533f47c2a6b3aa38d306ee79");
  });
  test("ページの内部URL", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/neverproductive/To-Do-Board-Jordan-Parker-Notion-Template-e82139ad35944673ada4db3734313409"
      )
    ).toBe("e82139ad35944673ada4db3734313409");
  });
  test("メンションのリンクに入ってくるworkspace名なしのURL", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/61b88b0c2fe5489fb3e6d186b11e16e5"
      )
    ).toBe("61b88b0c2fe5489fb3e6d186b11e16e5");
  });
  test("ページのパブリックURL", () => {
    expect(
      extractNotionIdfromUrl(
        "https://udusd.notion.site/UDlog-4553dcd168664730aa8723e1cace3d7e"
      )
    ).toBe("4553dcd168664730aa8723e1cace3d7e");
  });
  test("データベースのパブリックURL", () => {
    expect(
      extractNotionIdfromUrl(
        "https://udusd.notion.site/0c610de6533f47c2a6b3aa38d306ee79?v=2a11a32eec2a435bae64bc09c01754a5"
      )
    ).toBe("0c610de6533f47c2a6b3aa38d306ee79");
  });
  test("inline view", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/udusd/b29bef2a54cb4fcc97f92c6b961496a0?v=4ff6120dd5db46c29a5d86ccb6fc006b&pvs=4"
      )
    ).toBe("b29bef2a54cb4fcc97f92c6b961496a0");
  });
  test("ブロックへのリンクからページID", () => {
    expect(
      extractNotionIdfromUrl(
        "https://www.notion.so/udusd/UDlog-4553dcd168664730aa8723e1cace3d7e?pvs=4#b6a54061739c40088a3c88c5ac4a48b6"
      )
    ).toBe("4553dcd168664730aa8723e1cace3d7e");
  });
  test("32桁のIDが渡されたらそのまま帰す", () => {
    expect(extractNotionIdfromUrl("0581ec5b0d9d4448bea936fc4eafbd32")).toBe(
      "0581ec5b0d9d4448bea936fc4eafbd32"
    );
    expect(extractNotionIdfromUrl("")).toBeNull();
  });
});

import { addDashesToUUID } from "./id";

describe("addDashesToUUID", () => {
  test("正しい形式のUUID文字列を受け取った場合、ハイフンが追加された文字列を返す", () => {
    const uuid = "0123456789abcdef0123456789abcdef";
    const result = addDashesToUUID(uuid);
    expect(result).toBe("01234567-89ab-cdef-0123-456789abcdef");
  });

  test("不正な形式のUUID文字列を受け取った場合、nullを返す", () => {
    const uuid = "invalid-uuid-string";
    const result = addDashesToUUID(uuid);
    expect(result).toBeNull();
  });
});
