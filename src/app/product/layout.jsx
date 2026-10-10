
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongodb";

export default async function ProductLayout({ children }) {
  // Ensure MongoDB is connected before checking authentication
  await ensureMongoConnection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect unauthenticated users to sign in
  if (!session) {
    redirect("/signin?reason=protected");
  }

  return children;
}
