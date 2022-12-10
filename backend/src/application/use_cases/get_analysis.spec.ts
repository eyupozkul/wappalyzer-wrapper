import { describe, test, expect, beforeAll } from "@jest/globals";
import { makeGetAnalysis, makeNewAnalysis } from ".";
import { InMemoryDB } from "../../frameworks/db";
import { Analysis } from "../../models";
import { DBInterface } from "../interfaces";

describe("Use Cases", () => {
  let dbConnection: DBInterface;
  let getAnalysis: (id: number) => Promise<Analysis>;
  let newAnalysis: (url: string) => Promise<number>;

  beforeAll(async () => {
    dbConnection = new InMemoryDB();
    await dbConnection.init();

    newAnalysis = makeNewAnalysis(dbConnection);
    getAnalysis = makeGetAnalysis(dbConnection);
  });

  test("get analysis", async () => {
    // first analysis, id is 1
    await newAnalysis("https://example.com");

    const analysis = await getAnalysis(1);

    expect(analysis.id).toBe(1);
    expect(analysis.url).toBe("https://example.com");
  });

  test("get analysis with invalid id", async () => {
    await expect(getAnalysis(-2)).rejects.toThrow("Invalid ID");
  });

  test("get analysis with non-existent id", async () => {
    await expect(getAnalysis(2)).rejects.toThrow("Analysis not found");
  });
});
