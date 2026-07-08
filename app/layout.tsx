import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { StylesheetLoader } from "@/components/StylesheetLoader";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const siteUrl = siteConfig.metadata.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.metadata.title,
    template: `%s | ${siteConfig.metadata.title}`,
  },
  description: siteConfig.metadata.description,
  authors: [{ name: siteConfig.metadata.author }],
  creator: siteConfig.metadata.author,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: `${siteConfig.metadata.author} Portfolio`,
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const criticalStyles = `
  :root {
    color-scheme: light;
    --bg: #faf9f6;
    --fg: #111111;
  }
  html, body {
    margin: 0;
    min-height: 100%;
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-noto-sans-jp), "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <head>
        {isDev ? (
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" data-app-css="true" />
        ) : null}
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
      </head>
      <body className="min-h-full font-sans antialiased" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        {isDev ? <StylesheetLoader /> : null}
        {children}
      </body>
    </html>
  );
}
