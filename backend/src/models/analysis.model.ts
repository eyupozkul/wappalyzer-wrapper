export class Analysis {
  id: number;
  url: string;
  status: "pending" | "in-progress" | "completed";
  numberOfPages: number;
  usedTechnologies: string[];
}
