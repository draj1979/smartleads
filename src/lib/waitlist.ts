import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Local-file waitlist store. Good for dev + the prototype phase on Vercel
 * (preview deploys lose state — that's intentional for now). The dedicated
 * API task will swap this to a real backing store when we get there.
 */

export type WaitlistSource = "hero" | "final" | string;

export type WaitlistEntry = {
  email: string;
  timestamp: string;
  source: WaitlistSource;
};

const FILE = path.join(process.cwd(), "data", "waitlist.json");

const DEFAULT_OFFSET = 200;

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

export async function appendWaitlist(entry: WaitlistEntry): Promise<void> {
  const list = await readWaitlist();
  list.push(entry);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

/**
 * Believable displayed count. Real entries plus a public offset so the page
 * doesn't read "1 solopreneur on the waitlist" on launch day.
 */
export async function getWaitlistCount(): Promise<number> {
  const parsedOffset = Number(process.env.NEXT_PUBLIC_WAITLIST_OFFSET);
  const offset = Number.isFinite(parsedOffset) ? parsedOffset : DEFAULT_OFFSET;
  const list = await readWaitlist();
  return list.length + offset;
}
