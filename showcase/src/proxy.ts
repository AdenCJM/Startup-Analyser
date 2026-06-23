// Next.js 16 Proxy (formerly middleware) — the network auth gate.
// Runs on the Node.js runtime, so node:crypto via @/lib/auth works here.
// Every non-allowlisted route requires a valid session cookie.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

function withHeaders(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export function proxy(request: NextRequest): NextResponse {
  if (verifyToken(request.cookies.get(COOKIE_NAME)?.value)) {
    return withHeaders(NextResponse.next());
  }

  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    return withHeaders(
      NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `next=${encodeURIComponent(pathname + search)}`;
  return withHeaders(NextResponse.redirect(url));
}

export const config = {
  // Protect everything except the login flow, static assets, and metadata
  // routes. `_next/data` and Server Functions are still proxied (Next forces
  // it) so there is no unauthenticated data path.
  matcher: [
    "/((?!api/login|api/logout|login|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
