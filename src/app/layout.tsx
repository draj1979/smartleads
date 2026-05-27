import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CONTENT } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartleads.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CONTENT.brand.name} — ${CONTENT.brand.tagline}`,
    template: `%s · ${CONTENT.brand.name}`,
  },
  description: CONTENT.brand.description,
  keywords: [
    "reddit lead generation",
    "buying intent",
    "solopreneur",
    "AI sales agent",
    "warm leads",
    "indie hackers",
    "freelance leads",
  ],
  authors: [{ name: CONTENT.brand.name }],
  openGraph: {
    title: `${CONTENT.brand.name} — ${CONTENT.brand.tagline}`,
    description: CONTENT.brand.description,
    type: "website",
    siteName: CONTENT.brand.name,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${CONTENT.brand.founderHandle}`,
    site: `@${CONTENT.brand.founderHandle}`,
    title: `${CONTENT.brand.name} — ${CONTENT.brand.tagline}`,
    description: CONTENT.brand.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
