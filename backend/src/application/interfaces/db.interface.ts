import { Analysis } from "../../models/analysis.model";

export interface DBInterface {
  init(): Promise<boolean>;
  saveAnalysisRequest(url: string): Promise<number>;
  getAnalysis(id: number): Promise<Analysis | false>;
  updateAnalysis(
    id: number,
    newStatus?: "pending" | "in-progress" | "completed",
    numberOfPages?: number,
    usedTechnologies?: string[]
  ): Promise<Analysis | false>;
}
