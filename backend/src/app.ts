import { InMemoryDB } from "./frameworks/db";
import { SocketIO } from "./frameworks/api/websocket";
import { makeGetAnalysis, makeNewAnalysis } from "./application/use_cases";
const Wappalyzer = require("wappalyzer");

async function main() {
  // create and init db
  const db = new InMemoryDB();
  await db.init();

  // Create Wappalyzer instance
  const options = {
    debug: false,
    delay: 500,
    headers: {},
    maxWait: 10000,
    recursive: true,
    probe: true,
    userAgent: "Wappalyzer",
    noScripts: false,
    noRedirect: false,
  };

  let wappalyzer: any;
  try {
    wappalyzer = new Wappalyzer(options);
    await wappalyzer.init();
  } catch (_) {
    console.log("Error initializing Wappalyzer");
    process.exit(1);
  }

  // Create use case functions
  const newAnalysis = makeNewAnalysis(db, wappalyzer);
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
