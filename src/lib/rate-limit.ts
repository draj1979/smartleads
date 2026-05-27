/**
 * In-memory per-IP rate limiter.
 *
 * Limitations to be aware of (and noted in the README):
 *   - State is per serverless function instance. Vercel can spin up multiple
 *     instances, so the practical limit is window × instances, not window.
 *   - State is lost on cold start.
 *
 * Good enough to deflect the obvious form-spamming case for a launch page.
 * For real protection at scale: swap to Upstash Redis or a similar shared
 * store. The interface here is intentionally narrow so that swap is a
 * one-file change.
 */

type Bucket = { count: number; resetAt: number };

const BUCKETS = new Map<string, Bucket>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 5;

/** Returns true if the request is allowed, false if rate-limited. */
export function allow(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = BUCKETS.get(ip);

  if (!existing || existing.resetAt < now) {
    BUCKETS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= MAX_PER_WINDOW) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true };
}

/** Read the client IP from common proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
