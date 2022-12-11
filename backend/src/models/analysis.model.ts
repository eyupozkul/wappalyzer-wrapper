export class Analysis {
  url: string;
  status: "pending" | "in-progress" | "completed";
  numberOfPages: number;
  usedTechnologies: string[];
}
