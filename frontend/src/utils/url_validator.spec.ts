import { describe, expect, test } from "vitest";
import { urlValidator } from "./url_validator";

describe("Utils tests", () => {
  test("urlValidator doesn't validate wrong url", () => {
    expect(urlValidator("wrong url")).toBe(false);
    expect(urlValidator("www.google.com")).toBe(false);
  });

  test("urlValidator validates correct url", () => {
    expect(urlValidator("https://www.google.com")).toBe(true);
  });

  test("urlValidator accepts strings only with the url", () => {
    expect(urlValidator("<script>https://www.google.com")).toBe(false);
  });
});
