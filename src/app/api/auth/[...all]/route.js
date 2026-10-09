import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export async function GET(request) {
  await ensureMongoConnection();
  return handlers.GET(request);
}

export async function POST(request) {
  await ensureMongoConnection();
  return handlers.POST(request);
}