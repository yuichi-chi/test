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

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

const criticalStyles = `
  html, body {
    margin: 0;
    min-height: 100%;
    background: #faf9f6;
    color: #111111;
    font-family: var(--font-noto-sans-jp), "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
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
      <body className="min-h-full bg-[#faf9f6] font-sans text-[#111111] antialiased">
        {isDev ? <StylesheetLoader /> : null}
        {children}
      </body>
    </html>
  );
}
