"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionRenderer } from "@/components/QuestionRenderer";
import { MathText } from "@/components/MathText";
import { FigureView } from "@/components/figures/FigureView";
import { PrimaryButton, ProgressBar } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import { difficultyLabel } from "@/data";
import { useProgress } from "@/lib/progress";
import { correctDisplayIndex, isCorrect, useSession } from "@/lib/session";
import { QuizResult } from "./QuizResult";

export default function QuizPage() {
  const router = useRouter();
  const session = useSession((s) => s.session);
  const select = useSession((s) => s.select);
  const reveal = useSession((s) => s.reveal);
  const next = useSession((s) => s.next);
  const record = useProgress((s) => s.record);

  if (!session) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-muted text-sm">
          出題中のセッションがありません。
          <br />
          ホームから科目を選んでください。
        </p>
        <Link
          href="/"
          className="min-h-12 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white dark:bg-slate-100 dark:text-slate-900"
        >
          ホームへ
        </Link>
      </div>
    );
  }

  if (session.finished) {
    return <QuizResult session={session} />;
  }

  const item = session.items[session.index];
  const theme = session.subjectId ? subjectTheme[session.subjectId] : null;
  const correct = isCorrect(item);

  function handleReveal() {
    reveal();
    record(item.question, correct);
  }

  const isLast = session.index === session.items.length - 1;

  return (
    <div className="min-h-dvh">
      {/* ── 上部：進捗と中断 ─────────────────────── */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/95 px-4 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-3 py-2.5">
          <button
            type="button"
            onClick={() => router.push("/")}
            aria-label="中断してホームへ"
            className="text-muted -ml-2 flex size-10 shrink-0 items-center justify-center rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold">{session.title}</p>
            <ProgressBar
              className="mt-1.5"
              rate={((session.index + 1) / session.items.length) * 100}
              color={theme?.bar ?? "bg-slate-500"}
            />
          </div>
          <span className="text-muted shrink-0 text-xs tabular-nums">
            {session.index + 1}/{session.items.length}
          </span>
        </div>
      </header>

      {/* ── 出題本体 ─────────────────────────────── */}
      <main className="mx-auto max-w-md px-4 pt-4 pb-44">
        <div className="text-muted mb-3 flex items-center gap-2 text-[0.7rem]">
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
            {difficultyLabel[item.question.difficulty]}
          </span>
          <span>{session.subtitle}</span>
        </div>

        <QuestionRenderer item={item} onSelect={select} />

        {item.revealed && (
          <section
            className={`mt-5 rounded-2xl border p-4 ${
              correct
                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                : "border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40"
            }`}
          >
            <p
              className={`text-sm font-bold ${
                correct
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-rose-700 dark:text-rose-400"
              }`}
            >
              {correct
                ? "正解"
                : `不正解（正解は ${correctDisplayIndex(item) + 1} 番）`}
            </p>
            <MathText className="mt-2 block text-[0.9rem] leading-7">
              {item.question.explanation}
            </MathText>
            {item.question.explanationFigure && (
              <FigureView figure={item.question.explanationFigure} />
            )}
          </section>
        )}
      </main>

      {/* ── 下部：主要アクション（親指の届く位置に固定） ─── */}
      <div className="pb-safe fixed inset-x-0 bottom-0 border-t border-[var(--border)] bg-[var(--surface)]/95 px-4 pt-3 backdrop-blur">
        <div className="mx-auto max-w-md">
          {item.revealed ? (
            <PrimaryButton onClick={next}>
              {isLast ? "結果を見る" : "次の問題へ"}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleReveal} disabled={item.selected === null}>
              {item.selected === null ? "選択肢を選んでください" : "解答する"}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
