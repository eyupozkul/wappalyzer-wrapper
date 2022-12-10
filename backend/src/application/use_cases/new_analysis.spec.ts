import { describe, test, expect, beforeAll } from "@jest/globals";
import { InMemoryDB } from "../../frameworks/db";
import { DBInterface } from "../interfaces";
import { makeNewAnalysis } from "./new_analysis";

describe("Use Cases", () => {
  let dbConnection: DBInterface;
  let newAnalysis: (url: string) => Promise<number>;

  beforeAll(async () => {
    dbConnection = new InMemoryDB();
    await dbConnection.init();

    newAnalysis = makeNewAnalysis(dbConnection);
  });

  test("new analysis", async () => {
    const id = await newAnalysis("https://example.com");
    expect(id).toBe(1);
  });

  test("new analysis with invalid URL", async () => {
    await expect(newAnalysis("invalid")).rejects.toThrow("Invalid URL");
  });
});
