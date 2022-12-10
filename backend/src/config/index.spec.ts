import { describe, expect, test } from "@jest/globals";

const config = require("./index");

describe("Config", () => {
  test("should contain SERVER_PORT", () => {
    expect(config.SERVER_PORT).toBeDefined();
  });
  test("SERVER_PORT is a number and greater than 1000", () => {
    expect(config.SERVER_PORT).toBeGreaterThan(1000);
  });
});
