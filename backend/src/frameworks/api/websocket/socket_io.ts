import { Server } from "socket.io";
import {
  WebsocketInterface,
  WebsocketEventInterface,
} from "../../../application/interfaces";
import { SERVER_PORT } from "../../../config";
import { Analysis } from "../../../models";

export class SocketIO implements WebsocketInterface {
  io: Server;
  newAnalysis: (url: string) => Promise<number>;
  getAnalysis: (id: number) => Promise<Analysis>;

  constructor(
    newAnalysis: (url: string) => Promise<number>,
    getAnalysis: (id: number) => Promise<Analysis>
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
