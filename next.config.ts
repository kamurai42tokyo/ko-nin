import type { NextConfig } from "next";

/**
 * GitHub Pages（静的ホスティング）向けの設定。
 * - output: "export" … Node.jsサーバーなしで動く純粋な静的HTMLに書き出す
 * - basePath        … ユーザーページ直下のサブパス /ko-nin で配信するため
 *
 * basePath はローカル開発（http://localhost:3000/）を邪魔しないよう、
 * 本番ビルド時だけ有効にする。
 */
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/ko-nin";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoBasePath : undefined,
  // GitHub Pagesは /foo → /foo/index.html を返すため、末尾スラッシュ方式にそろえる
  trailingSlash: true,
  // 静的書き出しではNext.jsの画像最適化サーバーが使えないので無効化する
  images: { unoptimized: true },
};

export default nextConfig;
