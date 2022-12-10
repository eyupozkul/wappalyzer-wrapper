import { DBInterface } from "../../interfaces";
import { Analysis } from "../../models";

export class InMemoryDB implements DBInterface {
  memory: { [key: number]: Analysis } = {};

  init(): Promise<boolean> {
    this.memory = {};
    return new Promise((resolve) => resolve(true));
  }

  saveAnalysisRequest(url: string): Promise<number> {
    const newId = Object.keys(this.memory).length + 1;
    const newAnalysis: Analysis = {
      id: newId,
      url,
      status: "pending",
      numberOfPages: 0,
      usedTechnologies: [],
    };

    this.memory[newId] = newAnalysis;

    return new Promise((resolve) => resolve(newId));
  }

  getAnalysis(id: number): Promise<Analysis | false> {
    if (this.memory[id] === undefined) {
      return new Promise((resolve) => resolve(false));
    }

    return new Promise((resolve) => resolve(this.memory[id]));
  }

  updateAnalysis(
    id: number,
    newStatus?: "pending" | "in-progress" | "completed" | undefined,
    newNumberOfPages?: number | undefined,
    newUsedTechnologies?: string[] | undefined
  ): Promise<Analysis | false> {
    if (this.memory[id] === undefined) {
      return new Promise((resolve) => resolve(false));
    }

    const analysis = this.memory[id];
    analysis.status = newStatus || analysis.status;
    analysis.numberOfPages = newNumberOfPages || analysis.numberOfPages;
    analysis.usedTechnologies =
      newUsedTechnologies || analysis.usedTechnologies;

    this.memory[id] = analysis;
    return new Promise((resolve) => resolve(analysis));
  }
}
