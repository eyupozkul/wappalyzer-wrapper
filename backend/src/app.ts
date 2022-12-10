import { InMemoryDB } from "./frameworks/db";

async function main() {
  // create and init db
  const db = new InMemoryDB();
  await db.init();
}

console.log("Starting app...");
main()
  .then(() => {
    console.log("App started");
  })
  .catch((err) => {
    console.error("Error starting app", err);
  });
