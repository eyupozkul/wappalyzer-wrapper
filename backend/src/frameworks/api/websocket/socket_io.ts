import { Server } from "socket.io";
import {
  WebsocketInterface,
  WebsocketEventInterface,
} from "../../../application/interfaces";
import {
  GetAnalysisInterface,
  NewAnalysisInterface,
} from "../../../application/interfaces/use_cases";
import { SERVER_PORT } from "../../../config";

export class SocketIO implements WebsocketInterface {
  io: Server;
  newAnalysis: NewAnalysisInterface;
  getAnalysis: GetAnalysisInterface;

  constructor(
    newAnalysis: NewAnalysisInterface,
    getAnalysis: GetAnalysisInterface
  ) {
    this.newAnalysis = newAnalysis;
    this.getAnalysis = getAnalysis;
  }

  registerEvents(): void {
    this.io = new Server<WebsocketEventInterface>(SERVER_PORT, {
      cors: { origin: "*" },
    });
    this.io.on("connection", (socket) => {
      socket.on("analysisRequest", async (url) => {
        try {
          const status = await this.newAnalysis(url);
          if (status) {
            // Send analysisCompleted event to every client
            this.io.emit("analysisCompleted", url);
          }
        } catch (_) {}
      });

      socket.on("getAnalysis", async (url) => {
        try {
          const analysis = await this.getAnalysis(url);
          socket.emit("analysis", analysis);
        } catch (_: unknown) {}
      });
    });
  }

  close(): void {
    this.io.close();
  }
}
