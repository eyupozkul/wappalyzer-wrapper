import { InMemoryDB } from "./frameworks/db";
import { SocketIO } from "./frameworks/api/websocket";
import { makeGetAnalysis, makeNewAnalysis } from "./application/use_cases";

async function main() {
  // create and init db
  const db = new InMemoryDB();
  await db.init();

  // Create use case functions
  const newAnalysis = makeNewAnalysis(db);
  const getAnalysis = makeGetAnalysis(db);

  const server = new SocketIO(newAnalysis, getAnalysis);
  server.registerEvents();
}

console.log("Starting app...");
main()
  .then(() => {
    console.log("App started");
  })
  .catch((err) => {
    console.error("Error starting app", err);
  });
