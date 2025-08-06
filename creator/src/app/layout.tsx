import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/app/Header";
import { Footer } from "@/components/app/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kompe - TikTokコンテストプラットフォーム",
    template: "%s | Kompe",
  },
  description:
    "ブランドが開催するTikTokコンテストに参加して賞金をゲット！Kompeはクリエイターとブランドをつなぐコンテストプラットフォームです。",
  keywords: [
    "TikTok",
    "コンテスト",
    "賞金",
    "クリエイター",
    "動画",
    "投稿",
    "UGC",
  ],
  authors: [{ name: "Kompe" }],
  creator: "Kompe",
  publisher: "Kompe",
  metadataBase: new URL("https://kompe.jp"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://kompe.jp",
    title: "Kompe - TikTokコンテストプラットフォーム",
    description: "ブランドが開催するTikTokコンテストに参加して賞金をゲット！",
    siteName: "Kompe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kompe - TikTokコンテストプラットフォーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompe - TikTokコンテストプラットフォーム",
    description: "ブランドが開催するTikTokコンテストに参加して賞金をゲット！",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#25f4ee" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
