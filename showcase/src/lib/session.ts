// Belt-and-braces session check for server components: proxy auth is
// "optimistic" per Next docs, so pages re-verify the session here too.
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "./auth";

export async function hasValidSession(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE_NAME)?.value);
}
