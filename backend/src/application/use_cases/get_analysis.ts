import { Analysis } from "../../models";
import { DBInterface } from "../interfaces";

export function makeGetAnalysis(dbConnection: DBInterface) {
  return async function getAnalysis(id: number): Promise<Analysis> {
    if (id <= 0) {
      throw new Error("Invalid ID");
    }

    const analysis = await dbConnection.getAnalysis(id);

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    return analysis;
  };
}
