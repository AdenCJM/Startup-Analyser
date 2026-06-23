import { NextResponse } from "next/server";
import {
  verifyPassword,
  signToken,
  cookieOptions,
  passwordConfigured,
  SESSION_MAX_AGE,
  COOKIE_NAME,
} from "@/lib/auth";
import { rateLimit } from "@/lib/ratelimit";

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] || "unknown").trim();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: Request) {
  // Fail closed: a misconfigured deploy can never be logged into.
  if (!passwordConfigured()) {
    return NextResponse.json(
      { error: "The showcase is not configured. Set SHOWCASE_PASSWORD and AUTH_SECRET." },
      { status: 500 },
    );
  }

  const ip = clientIp(request);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    /* empty body */
  }

  if (!verifyPassword(password)) {
    await sleep(400); // blunt brute force regardless of limiter state
    console.warn(`[auth] failed login ip=${ip} ts=${new Date().toISOString()}`);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, signToken(), cookieOptions(SESSION_MAX_AGE));
  return res;
}
