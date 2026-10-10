
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

// Connect to MongoDB
const client = await clientPromise;
const db = client.db("bazar-dor");

// Initialize Better Auth
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Google and GitHub authentication
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  // Authentication security
  secret: process.env.BETTER_AUTH_SECRET,

  // Use the configured URL, with a local fallback
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",
});
