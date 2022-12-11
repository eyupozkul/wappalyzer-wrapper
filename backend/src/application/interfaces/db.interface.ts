import { Analysis } from "../../models/analysis.model";

export interface DBInterface {
  init(): Promise<boolean>;
  saveAnalysisRequest(url: string): Promise<boolean>; // success or failure
  getAnalysis(url: string): Promise<Analysis>; // analysis or false
  updateAnalysis(
    url: string,
    newStatus?: "pending" | "in-progress" | "completed",
    numberOfPages?: number,
    usedTechnologies?: string[]
  ): Promise<Analysis>;
}
