import { DBInterface } from "../interfaces";
import { NewAnalysisInterface } from "../interfaces/use_cases";

export function makeNewAnalysis(
  dbConnection: DBInterface,
  wappalyzer: any
): NewAnalysisInterface {
  return async function newAnalysis(url: string): Promise<boolean> {
    // Validate URL
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (!urlRegex.test(url)) {
      throw new Error("Invalid URL");
    }

    console.time("analysis");
    try {
      // Check if analysis with the same url already exists
      await dbConnection.getAnalysis(url);
      return true;
    } catch (error: unknown) {
      if (!(error instanceof Error)) return false;
      if (error.message !== "Analysis not found") return false;
    }

    const result = await dbConnection.saveAnalysisRequest(url);

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

    console.timeEnd("analysis");

    return result;
  };
}
