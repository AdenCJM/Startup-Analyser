// In-memory per-IP rate limiter for the login route. Caveat: serverless cold
// starts reset this and it isn't shared across instances/regions, so it's a
// brute-force speed bump, not a wall. Upstash @upstash/ratelimit is the drop-in
// upgrade if needed. Paired with a strong-password requirement, this is
// adequate for an invite-only site.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

export function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  if (b.count > MAX_ATTEMPTS) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
