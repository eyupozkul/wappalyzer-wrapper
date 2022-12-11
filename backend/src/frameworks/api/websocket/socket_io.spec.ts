import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import {
  DBInterface,
  WebsocketInterface,
} from "../../../application/interfaces";
import {
  GetAnalysisInterface,
  NewAnalysisInterface,
} from "../../../application/interfaces/use_cases";
import {
  makeGetAnalysis,
  makeNewAnalysis,
} from "../../../application/use_cases";
import { InMemoryDB } from "../../db";
import { SocketIO } from "./socket_io";
import Client from "socket.io-client";
import { SERVER_PORT } from "../../../config";

describe("Socket.io tests", () => {
  let serverSocket: WebsocketInterface;
  let clientSocket: any;
  let dbConnection: DBInterface;

  let newAnalysis: NewAnalysisInterface;
  let getAnalysis: GetAnalysisInterface;

  beforeAll(async () => {
    dbConnection = new InMemoryDB();
    await dbConnection.init();
    newAnalysis = makeNewAnalysis(dbConnection);
    getAnalysis = makeGetAnalysis(dbConnection);

    serverSocket = new SocketIO(newAnalysis, getAnalysis);
    serverSocket.registerEvents();
    clientSocket = Client("http://localhost:" + SERVER_PORT);
  });

  afterAll(() => {
    clientSocket.close();
    serverSocket.close();
  });

  test("client can request new analysis", (done) => {
    const requestedUrl = "https://www.google.com";
    clientSocket.on("analysisCompleted", (url: string) => {
      expect(url).toBe(requestedUrl);
      done();
    });
    clientSocket.emit("analysisRequest", requestedUrl);
  });

  test("client can request analysed website", (done) => {
    const requestedUrl = "https://www.google.com";
    clientSocket.on("analysisCompleted", (url: string) => {
      // request the complete analysis
      clientSocket.on("analysis", (analysis: any) => {
        expect(analysis.url).toBe(requestedUrl);
        done();
      });

      clientSocket.emit("getAnalysis", requestedUrl);
    });

    clientSocket.emit("analysisRequest", requestedUrl);
  });
});
