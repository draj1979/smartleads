import { Resend } from "resend";

/**
 * Best-effort Resend confirmation email.
 *
 * - No-op if RESEND_API_KEY isn't set (dev / preview environments).
 * - Errors are caught and logged — the waitlist signup itself must not
 *   fail just because the email couldn't be delivered.
 * - FROM address comes from RESEND_FROM. If unset, defaults to Resend's
 *   onboarding sender for testing without a verified domain.
 */
export async function sendConfirmation(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.RESEND_FROM ?? "SmartLeads <onboarding@resend.dev>";
  const founder = process.env.NEXT_PUBLIC_FOUNDER_HANDLE ?? "draj_02";

  const text = [
    "Hey,",
    "",
    "You're on the SmartLeads waitlist. We'll email when the closed beta opens.",
    "",
    "If you're in the first 100 sign-ups, you've locked in founder pricing for life.",
    "",
    "What happens next:",
    "  • Closed beta in late Q3 (you'll get an invite by email)",
    "  • Public launch by end of year",
    "  • Beta access goes out in the order people signed up",
    "",
    `Got questions? Just reply to this email, or DM me on X: @${founder}.`,
    "",
    "— Draj",
  ].join("\n");

  const html = `
<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#F4ECDB; color:#1A3263; margin:0; padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; margin:0 auto; background:#FBF7EE; border:1px solid #D4B587; border-radius:14px;">
      <tr>
        <td style="padding:32px 32px 8px 32px;">
          <div style="font-size:14px; letter-spacing:0.22em; text-transform:uppercase; color:#E8A847;">SmartLeads</div>
          <h1 style="font-family: Georgia, serif; font-weight:400; font-size:28px; line-height:1.2; color:#1A3263; margin:14px 0 8px 0;">You're in.</h1>
          <p style="font-size:15px; line-height:1.6; color:#547792; margin:0 0 20px 0;">
            We'll email when the closed beta opens. If you're in the first 100 sign-ups, you've locked in founder pricing for life.
          </p>
          <div style="border-top:1px solid #DDD0B5; margin:20px 0; padding-top:16px;">
            <p style="font-size:14px; line-height:1.6; color:#1A3263; margin:0 0 8px 0;"><strong>What happens next</strong></p>
            <ul style="font-size:14px; line-height:1.7; color:#547792; padding-left:18px; margin:0;">
              <li>Closed beta in late Q3 — invite by email.</li>
              <li>Public launch by end of year.</li>
              <li>Beta access goes out in sign-up order.</li>
            </ul>
          </div>
          <p style="font-size:14px; line-height:1.6; color:#547792; margin:24px 0 0 0;">
            Questions? Reply to this email or DM me on X: <a href="https://x.com/${founder}" style="color:#1A3263;">@${founder}</a>.
          </p>
          <p style="font-size:14px; color:#547792; margin:24px 0 0 0; font-style:italic;">— Draj</p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: email,
      subject: "You're in — SmartLeads waitlist confirmed",
      text,
      html,
    });
  } catch (err) {
    // Deliberately swallowed. Signup already succeeded; the email is best-effort.
    console.error("[waitlist] Resend send failed:", err);
  }
}
