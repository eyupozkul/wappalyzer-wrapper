import { Analysis } from "../../models";

export interface WebsocketEventInterface {
  // client -> server
  analysisRequest: (url: string) => boolean;
  getAnalysis: (url: string) => Analysis;

  // server -> client
  analysisCompleted: () => string;
}

export interface WebsocketInterface {
  registerEvents(): void;
}
