import { Analysis } from "../../models";

export interface WebsocketEventInterface {
  // client -> server
  analysisRequest: (url: string) => number;
  getAnalysis: (id: number) => Analysis;

  // server -> client
  analysisCompleted: () => number;
}

export interface WebsocketInterface {
  registerEvents(): void;
}
