import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "高認クイズ | 高卒認定試験 対策",
  description:
    "高卒認定試験（数学・英語・国語）の対策アプリ。全単元の基礎問題を回して合格ライン40点に最短で到達する。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // 拡大は許可する（アクセシビリティのため maximumScale は設定しない）
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
