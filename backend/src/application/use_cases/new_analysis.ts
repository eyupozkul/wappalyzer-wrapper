import { DBInterface } from "../interfaces";
import { NewAnalysisInterface } from "../interfaces/use_cases";
import { urlValidator } from "../../utils";

export function makeNewAnalysis(
  dbConnection: DBInterface,
  wappalyzer: any
): NewAnalysisInterface {
  return async function newAnalysis(url: string): Promise<boolean> {
    // Validate URL
    if (!urlValidator(url)) {
      throw new Error("Invalid URL");
    }

    try {
      // Check if analysis with the same url already exists
      const analysis = await dbConnection.getAnalysis(url);
      if (analysis.status === "completed") {
        // Send analysisCompleted event to clients
        return true;
      } else if (analysis.status === "pending") {
        // Same analysis has already been requested, return false indicating that the analysis was not created
        return false;
      }
    } catch (error: unknown) {
      // We don't know what went wrong, return false indicating that the analysis was not created
      if (!(error instanceof Error)) return false;
      if (error.message !== "Analysis not found") return false;
    }

    const result = await dbConnection.saveAnalysisRequest(url);
    if (!result) return false;

    try {
      const site = await wappalyzer.open(url, {});
      const results = await site.analyze();
      const numberOfPages = Object.keys(results.urls).length;
      const technologies = Array<string>();
      results.technologies.forEach((tech: any) => {
        technologies.push(tech.name);
      });

      await dbConnection.updateAnalysis(
        url,
        "completed",
        numberOfPages,
        technologies
      );
    } catch (_) {
      await dbConnection.updateAnalysis(url, "completed", 0, []);
    }

    // Analysis successfully created, send analysisCompleted event to clients
    return true;
  };
}
