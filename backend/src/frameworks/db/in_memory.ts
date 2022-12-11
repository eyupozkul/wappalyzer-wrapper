import { DBInterface } from "../../application/interfaces";
import { Analysis } from "../../models";

export class InMemoryDB implements DBInterface {
  // url -> analysis
  memory: { [key: string]: Analysis };

  init(): Promise<boolean> {
    this.memory = {};
    return new Promise((resolve) => resolve(true));
  }

  async saveAnalysisRequest(url: string): Promise<boolean> {
    const newAnalysis: Analysis = {
      url,
      status: "pending",
      numberOfPages: 0,
      usedTechnologies: [],
    };

    this.memory[url] = newAnalysis;

    return true;
  }

  async getAnalysis(url: string): Promise<Analysis> {
    if (this.memory[url] === undefined) {
      throw new Error("Analysis not found");
    }

    return this.memory[url];
  }

  async updateAnalysis(
    url: string,
    newStatus?: "pending" | "in-progress" | "completed" | undefined,
    newNumberOfPages?: number | undefined,
    newUsedTechnologies?: string[] | undefined
  ): Promise<Analysis> {
    if (this.memory[url] === undefined) {
      throw new Error("Analysis not found");
    }

    const analysis = this.memory[url];
    analysis.status = newStatus || analysis.status;
    analysis.numberOfPages = newNumberOfPages || analysis.numberOfPages;
    analysis.usedTechnologies =
      newUsedTechnologies || analysis.usedTechnologies;

    this.memory[url] = analysis;
    return analysis;
  }
}
