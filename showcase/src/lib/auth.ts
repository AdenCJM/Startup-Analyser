// Single-shared-password auth, fail-closed. Pure node:crypto (no next/headers)
// so this module is safe to import from proxy.ts (Next 16 proxy = Node runtime).
//
// Session cookie = `base64url(payload).base64url(HMAC-SHA256(payload))`.
// If SHOWCASE_PASSWORD or AUTH_SECRET is missing/blank, every check returns
// false (deny-all) — a misconfigured deploy locks everyone out, never opens.

import crypto from "node:crypto";

export const COOKIE_NAME = "session";
const SESSION_TTL_S = 60 * 60 * 24 * 7; // 7 days
const MIN_PASSWORD_LEN = 20;

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v : undefined;
}

export function passwordConfigured(): boolean {
  return Boolean(env("SHOWCASE_PASSWORD") && env("AUTH_SECRET"));
}

/** Throws if misconfigured. Call from the login route to surface a clear error. */
export function assertConfig(): void {
  const pw = env("SHOWCASE_PASSWORD");
  if (!pw) throw new Error("SHOWCASE_PASSWORD is not set");
  if (!env("AUTH_SECRET")) throw new Error("AUTH_SECRET is not set");
  if (pw.length < MIN_PASSWORD_LEN) {
    throw new Error(`SHOWCASE_PASSWORD must be at least ${MIN_PASSWORD_LEN} characters`);
  }
}

function hmac(data: string): Buffer {
  return crypto.createHmac("sha256", env("AUTH_SECRET")!).update(data).digest();
}

export function signToken(ttlS = SESSION_TTL_S): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + ttlS * 1000 })).toString("base64url");
  return `${payload}.${hmac(payload).toString("base64url")}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!passwordConfigured() || !token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  let given: Buffer;
  let expected: Buffer;
  try {
    given = Buffer.from(sig, "base64url");
    expected = hmac(payload);
  } catch {
    return false;
  }
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Constant-time password check (compare digests so length never leaks). */
export function verifyPassword(submitted: string): boolean {
  if (!passwordConfigured()) return false;
  const a = crypto.createHash("sha256").update(submitted ?? "").digest();
  const b = crypto.createHash("sha256").update(env("SHOWCASE_PASSWORD")!).digest();
  return crypto.timingSafeEqual(a, b);
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export const SESSION_MAX_AGE = SESSION_TTL_S;
