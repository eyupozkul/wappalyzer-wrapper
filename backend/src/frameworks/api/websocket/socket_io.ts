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
    this.io = new Server<WebsocketEventInterface>(SERVER_PORT, {});
    this.io.on("connection", (socket) => {
      socket.on("analysisRequest", async (url) => {
        const id = await this.newAnalysis(url);
        socket.emit("analysisCompleted", id);
      });

      socket.on("getAnalysis", (id) => {
        const analysis = this.getAnalysis(id);
        socket.emit("analysis", analysis);
      });
    });
  }
}
