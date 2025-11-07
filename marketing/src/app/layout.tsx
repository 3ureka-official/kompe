import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kompe - TikTokで稼ぐ、新しいカタチ",
  description:
    "フォロワー数に関係なく、TikTokの動画コンテストで賞金を獲得。企業コンテストに参加して今すぐ収益化を始めよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.className} antialiased`}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
