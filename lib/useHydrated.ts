"use client";

import { useEffect, useState } from "react";

/**
 * localStorage由来の値を描画してよいかを返す。
 * 初回レンダリングをサーバー出力と一致させ、hydration mismatch を防ぐ。
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
