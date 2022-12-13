import { describe, test, expect } from "vitest";
import * as config from "./index";

describe("Config tests", () => {
  test("BACKEND_HOST exists with correct type", () => {
    expect(config).toHaveProperty("BACKEND_HOST");
    expect(config.BACKEND_HOST).toBeTypeOf("string");
  });

  test("BACKEND_PORT exists with correct type", () => {
    expect(config).toHaveProperty("BACKEND_PORT");
    expect(config.BACKEND_PORT).toBeTypeOf("number");
  });
});
