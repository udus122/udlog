import { getNotionIdfromUrl } from "./id";

describe("urlからnotonのIDを取得する関数のテスト", () => {
  test("ワークスペース内の他のページへのリンク", () => {
    expect(getNotionIdfromUrl("/0581ec5b0d9d4448bea936fc4eafbd32")).toBe(
      "0581ec5b0d9d4448bea936fc4eafbd32"
    );
    expect(getNotionIdfromUrl("")).toBeNull();
  });
  test("notion.soから始まるページリンク", () => {
    expect(
      getNotionIdfromUrl(
        "https://www.notion.so/udusd/0581ec5b0d9d4448bea936fc4eafbd32?pvs=4"
      )
    ).toBe("0581ec5b0d9d4448bea936fc4eafbd32");
  });
});
