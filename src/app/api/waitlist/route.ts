import { NextResponse } from "next/server";
import { appendWaitlist, readWaitlist } from "@/lib/waitlist";

/**
 * Minimal POST handler for the waitlist forms.
 *
 * Hardened in the dedicated API task — additions there will include:
 *   - Optional Resend confirmation when RESEND_API_KEY is set
 *   - Per-IP rate limiting
 *   - Structured logging
 *
 * This pass intentionally keeps the surface tiny so we can review form UX.
 */

export const runtime = "nodejs"; // fs needs Node, not Edge

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = new Set(["hero", "final"]);

type Body = {
  email?: unknown;
  bot_field?: unknown;
  source?: unknown;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot. If a bot filled the hidden field, pretend everything went fine
  // (200 + ok=true) but don't actually persist anything.
  if (typeof body.bot_field === "string" && body.bot_field.length > 0) {
    return NextResponse.json({ ok: true, dropped: "honeypot" });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const source =
    typeof body.source === "string" && VALID_SOURCES.has(body.source) ? body.source : "hero";

  const existing = await readWaitlist();
  const already = existing.some((e) => e.email === email);
  if (already) {
    return NextResponse.json({ ok: true, already: true });
  }

  await appendWaitlist({
    email,
    timestamp: new Date().toISOString(),
    source,
  });

  return NextResponse.json({ ok: true });
}
