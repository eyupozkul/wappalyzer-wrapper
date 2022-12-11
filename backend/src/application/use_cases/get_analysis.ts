import { Analysis } from "../../models";
import { DBInterface } from "../interfaces";
import { GetAnalysisInterface } from "../interfaces/use_cases";

export function makeGetAnalysis(
  dbConnection: DBInterface
): GetAnalysisInterface {
  return async function getAnalysis(url: string): Promise<Analysis> {
    // Validate URL
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (!urlRegex.test(url)) {
      console.log("Invalid URL");
      throw new Error("Invalid URL");
    }

    try {
      const analysis = await dbConnection.getAnalysis(url);
      return analysis;
    } catch (error: unknown) {
      throw error;
    }
  };
}
