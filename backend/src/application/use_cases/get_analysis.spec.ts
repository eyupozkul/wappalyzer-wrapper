import { describe, test, expect, beforeAll } from "@jest/globals";
import { makeGetAnalysis, makeNewAnalysis } from ".";
import { InMemoryDB } from "../../frameworks/db";
import { WappalyzerMock } from "../../mocks";
import { DBInterface } from "../interfaces";
import {
  GetAnalysisInterface,
  NewAnalysisInterface,
} from "../interfaces/use_cases";

describe("Use Cases", () => {
  let dbConnection: DBInterface;
  let getAnalysis: GetAnalysisInterface;
  let newAnalysis: NewAnalysisInterface;
  let wappalyzerMock: WappalyzerMock;

  beforeAll(async () => {
    dbConnection = new InMemoryDB();
    wappalyzerMock = new WappalyzerMock();
    await dbConnection.init();

    newAnalysis = makeNewAnalysis(dbConnection, wappalyzerMock);
    getAnalysis = makeGetAnalysis(dbConnection);
  });

  test("get analysis", async () => {
    // first analysis, id is 1
    await newAnalysis("https://example.com");

    const analysis = await getAnalysis("https://example.com");

    expect(analysis.url).toBe("https://example.com");
  });

  test("get analysis with invalid url", async () => {
    await expect(getAnalysis("invalid-url")).rejects.toThrow("Invalid URL");
  });

  test("get analysis with non-existent url", async () => {
    await expect(getAnalysis("https://non-existing-url.com")).rejects.toThrow(
      "Analysis not found"
    );
  });
});
