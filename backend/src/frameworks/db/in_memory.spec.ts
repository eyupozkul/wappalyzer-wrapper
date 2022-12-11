import { describe, test, expect, beforeAll } from "@jest/globals";
import { Analysis } from "../../models";
import { InMemoryDB } from "./in_memory";

const testDB = new InMemoryDB();

describe("InMemoryDB Tests", () => {
  let url: string;

  beforeAll(() => {
    url = "https://epctex.com";
  });

  test("db init", async () => {
    const result = await testDB.init();
    expect(result).toBe(true);
  });

  test("save analysis request", async () => {
    const result = await testDB.saveAnalysisRequest(url);
    expect(result).toBe(true);
  });

  test("get analysis with existing url", async () => {
    const analysis = await testDB.getAnalysis(url);
    expect(analysis.url).toBe("https://epctex.com");
  });

  test("get analysis with non-existing url", async () => {
    await expect(
      testDB.getAnalysis("https://non-existing-url.com")
    ).rejects.toThrow("Analysis not found");
  });

  test("update analysis with existing id", async () => {
    const analysis = await testDB.updateAnalysis(url, "completed", 1, [
      "React",
    ]);
    expect(analysis.status).toEqual("completed");
    expect(analysis.numberOfPages).toEqual(1);
    const usedTechnologies = analysis.usedTechnologies;
    expect(usedTechnologies).toEqual(["React"]);
  });

  test("update analysis with non-existing id", async () => {
    await expect(
      testDB.getAnalysis("https://non-existing-url.com")
    ).rejects.toThrow("Analysis not found");
  });
});
