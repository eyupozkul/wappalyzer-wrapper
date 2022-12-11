import { DBInterface } from "../interfaces";
import { NewAnalysisInterface } from "../interfaces/use_cases";

export function makeNewAnalysis(
  dbConnection: DBInterface
): NewAnalysisInterface {
  return async function newAnalysis(url: string): Promise<boolean> {
    // Validate URL
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (!urlRegex.test(url)) {
      throw new Error("Invalid URL");
    }

    try {
      // Check if analysis with the same url already exists
      const analysis = await dbConnection.getAnalysis(url);
      // TODO: send analysis to client
      return true;
    } catch (error: unknown) {
      if (!(error instanceof Error)) return false;
      if (error.message !== "Analysis not found") return false;
    }

    const result = await dbConnection.saveAnalysisRequest(url);

    // TODO: Make Wappalyzer Call

    return result;
  };
}
