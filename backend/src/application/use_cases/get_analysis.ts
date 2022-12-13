import { Analysis } from "../../models";
import { DBInterface } from "../interfaces";
import { GetAnalysisInterface } from "../interfaces/use_cases";
import { urlValidator } from "../../utils";

export function makeGetAnalysis(
  dbConnection: DBInterface
): GetAnalysisInterface {
  return async function getAnalysis(url: string): Promise<Analysis> {
    // Validate URL
    if (!urlValidator(url)) {
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
