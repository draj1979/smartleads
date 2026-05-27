import { NextResponse } from "next/server";
import { appendWaitlist, readWaitlist } from "@/lib/waitlist";
import { allow, clientIp } from "@/lib/rate-limit";
import { sendConfirmation } from "@/lib/send-confirmation";

export const runtime = "nodejs"; // fs + resend SDK need Node, not Edge

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = new Set(["hero", "final"]);

type Body = {
  email?: unknown;
  bot_field?: unknown;
  source?: unknown;
};

export async function POST(req: Request) {
  // ── 1. Rate limit by IP ────────────────────────────────────────────
  const ip = clientIp(req);
  const gate = allow(ip);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      {
        status: 429,
        headers: gate.retryAfterSec
          ? { "Retry-After": String(gate.retryAfterSec) }
          : undefined,
      }
    );
  }

  // ── 2. Parse body ──────────────────────────────────────────────────
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ── 3. Honeypot ────────────────────────────────────────────────────
  // Pretend success so the bot moves on, but don't persist anything.
  if (typeof body.bot_field === "string" && body.bot_field.length > 0) {
    return NextResponse.json({ ok: true, dropped: "honeypot" });
  }

  // ── 4. Validate email ──────────────────────────────────────────────
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // ── 5. Validate source ─────────────────────────────────────────────
  const source =
    typeof body.source === "string" && VALID_SOURCES.has(body.source)
      ? body.source
      : "hero";

  // ── 6. Dedup ──────────────────────────────────────────────────────
  const existing = await readWaitlist();
  const already = existing.some((e) => e.email === email);
  if (already) {
    return NextResponse.json({ ok: true, already: true });
  }

  // ── 7. Persist ────────────────────────────────────────────────────
  await appendWaitlist({
    email,
    timestamp: new Date().toISOString(),
    source,
  });

  // ── 8. Best-effort confirmation email (no-op if RESEND_API_KEY missing) ─
  // Awaited so any silent log is captured, but errors don't fail the signup.
  await sendConfirmation(email);

  return NextResponse.json({ ok: true });
}
