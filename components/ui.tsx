"use client";

import Link from "next/link";

/** 画面上部のバー。戻る導線を常に左に置く */
export function AppHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/90 px-4 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-2 py-3">
        {backHref && (
          <Link
            href={backHref}
            aria-label="戻る"
            className="text-muted -ml-2 flex size-10 shrink-0 items-center justify-center rounded-full"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold">{title}</h1>
          {subtitle && <p className="text-muted truncate text-xs">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

/** 到達度バー。rateがnullなら未着手として空のバーを描く */
export function ProgressBar({
  rate,
  color = "bg-blue-500",
  className = "",
}: {
  rate: number | null;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)] ${className}`}
      role="progressbar"
      aria-valuenow={rate ?? 0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${color}`}
        style={{ width: `${rate ?? 0}%` }}
      />
    </div>
  );
}

/** 主要導線のボタン。タップ領域は最低48pxを確保する */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-13 w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-bold text-white transition-opacity active:opacity-80 disabled:opacity-35 dark:bg-slate-100 dark:text-slate-900 ${className}`}
    >
      {children}
    </button>
  );
}
