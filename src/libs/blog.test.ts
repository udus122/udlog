import { parselinkUrl, pageIdToBlogUrl } from "@/libs/blog";

describe("pageIdToBlogUrl", () => {
  test("prefixなし", () => {
    expect(pageIdToBlogUrl("0581ec5b-0d9d-4448-bea9-36fc4eafbd32")).toBe(
      "/0581ec5b-0d9d-4448-bea9-36fc4eafbd32"
    );
  });
  test("blog prefix", () => {
    expect(pageIdToBlogUrl("0581ec5b-0d9d-4448-bea9-36fc4eafbd32", "blog")).toBe(
      "/blog/0581ec5b-0d9d-4448-bea9-36fc4eafbd32"
    );
  });
});

describe("parselinkUrl", () => {
  test("NotionページのURLを渡すと、ブログのURLに変換されるべき", () => {
    const notionUrl =
      "https://www.notion.so/udusd/0581ec5b0d9d4448bea936fc4eafbd32?pvs=4";
    const expected = "/0581ec5b-0d9d-4448-bea9-36fc4eafbd32";
    expect(parselinkUrl(notionUrl)).toBe(expected);
  });

  test("空の文字列を渡すと、空文字が返されるべき", () => {
    const emptyUrl = "";
    const expected = emptyUrl;
    expect(parselinkUrl(emptyUrl)).toBe(expected);
  });

  test("NotionページID以外のURLを渡すと、元のURLが返されるべき", () => {
    const nonNotionUrl = "https://example.com";
    const expected = nonNotionUrl;
    expect(parselinkUrl(nonNotionUrl)).toBe(expected);
  });
});
