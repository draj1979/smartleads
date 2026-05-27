import { ImageResponse } from "next/og";
import { CONTENT } from "@/lib/content";

export const alt = `${CONTENT.brand.name} — ${CONTENT.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG image generated at request time (cached by Next.js).
 *
 * Uses Satori-compatible inline styles. System serif is used to keep this
 * self-contained — to polish further, fetch the Instrument Serif TTF from
 * fonts.gstatic.com and pass it via the `fonts` option below.
 */
export default async function OG() {
  const headline = CONTENT.hero.headlines[CONTENT.hero.headlineIdx];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#194138",
          color: "#FAE7CB",
          padding: 80,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle gold wash */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(255,201,77,0.35), transparent)",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: "#FFC94D",
              color: "#194138",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 36,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 32,
              letterSpacing: "-0.01em",
            }}
          >
            SmartLeads
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            fontSize: 76,
            lineHeight: 1.04,
            letterSpacing: "-0.018em",
            color: "#FAE7CB",
            maxWidth: 1040,
          }}
        >
          {headline}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            color: "#FFC94D",
            fontStyle: "italic",
            letterSpacing: "-0.005em",
          }}
        >
          {CONTENT.brand.tagline}
        </div>
      </div>
    ),
    size
  );
}
