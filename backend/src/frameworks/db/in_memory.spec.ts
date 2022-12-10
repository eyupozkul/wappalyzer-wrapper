import { describe, test, expect } from "@jest/globals";
import { Analysis } from "../../models";
import { InMemoryDB } from "./in_memory";

const testDB = new InMemoryDB();

describe("InMemoryDB Tests", () => {
  test("db init", async () => {
    const result = await testDB.init();
    expect(result).toBe(true);
  });

  test("save analysis request", async () => {
    const url = "https://epctex.com";

    const result = await testDB.saveAnalysisRequest(url);
    // first request in the db should have id 1
    expect(result).toBe(1);
  });

  test("get analysis with existing id", async () => {
    const analysis = await testDB.getAnalysis(1);
    expect(analysis).not.toBe(false);
    expect((analysis as Analysis).url).toBe("https://epctex.com");
  });

  test("get analysis with non-existing id", async () => {
    const analysis = await testDB.getAnalysis(2);
    expect(analysis).toBe(false);
  });

  test("update analysis with existing id", async () => {
    const analysis = await testDB.updateAnalysis(1, "completed", 1, ["React"]);
    expect(analysis).not.toBe(false);
    expect((analysis as Analysis).status).toEqual("completed");
    expect((analysis as Analysis).numberOfPages).toEqual(1);
    const usedTechnologies = (analysis as Analysis).usedTechnologies;
    expect(usedTechnologies).toEqual(["React"]);
  });

  test("update analysis with non-existing id", async () => {
    const analysis = await testDB.getAnalysis(2);
    expect(analysis).toBe(false);
  });
});
