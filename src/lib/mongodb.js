import dns from "node:dns";
import { MongoClient } from "mongodb";

// Force Node.js to use public DNS servers on local environment to resolve MongoDB SRV records
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (err) {
    console.warn("Failed to set custom DNS servers:", err);
  }
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use global variable to preserve connection across HMR reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
  Ensures MongoDB is connected before layout/page checks session
 */
export async function ensureMongoConnection() {
  const connectedClient = await clientPromise;
  return connectedClient;
}

export default clientPromise;