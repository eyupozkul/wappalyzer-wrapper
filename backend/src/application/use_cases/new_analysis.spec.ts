import { describe, test, expect, beforeAll } from "@jest/globals";
import { InMemoryDB } from "../../frameworks/db";
import { WappalyzerMock } from "../../mocks";
import { DBInterface } from "../interfaces";
import { NewAnalysisInterface } from "../interfaces/use_cases";
import { makeNewAnalysis } from "./new_analysis";

describe("Use Cases", () => {
  let dbConnection: DBInterface;
  let newAnalysis: NewAnalysisInterface;
  let wappalyzerMock: WappalyzerMock;

  beforeAll(async () => {
    dbConnection = new InMemoryDB();
    wappalyzerMock = new WappalyzerMock();
    await dbConnection.init();

    newAnalysis = makeNewAnalysis(dbConnection, wappalyzerMock);
  });

  test("new analysis", async () => {
    const result = await newAnalysis("https://example.com");
    expect(result).toBe(true);
  });

  test("new analysis with existing URL", async () => {
    const result = await newAnalysis("https://example.com");
    expect(result).toBe(true);
  });

  test("new analysis with invalid URL", async () => {
    await expect(newAnalysis("invalid")).rejects.toThrow("Invalid URL");
  });
});
