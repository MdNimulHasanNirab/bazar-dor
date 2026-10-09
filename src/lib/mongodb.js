import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/bazardor";

export const mongoClient =
  globalThis.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 60_000,
    connectTimeoutMS: 10_000,
    serverSelectionTimeoutMS: 8_000,
    retryReads: true,
    retryWrites: true,
  });

// Reuse one client and connection pool for the lifetime of a warm Next.js or
// Vercel serverless instance. Creating a client per module/request can leave a
// closed topology behind after a temporary Atlas connection failure.
globalThis.mongoClient = mongoClient;

export const db = mongoClient.db();

/**
 * Ensure a warm serverless instance never reuses a closed MongoDB topology.
 * MongoClient.connect() is idempotent while connected and recreates the
 * topology after a close; the driver also serializes concurrent connects.
 */
export async function ensureMongoConnection() {
  await mongoClient.connect();
}