"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MathText } from "@/components/MathText";
import { FigureView } from "@/components/figures/FigureView";
import { PrimaryButton } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import {
  isCorrect,
  useSession,
  type QuizSession,
  type SessionItem,
} from "@/lib/session";

/** 高卒認定試験の合格基準（各科目100点満点でおおむね40点） */
const PASS_LINE = 40;

export function QuizResult({ session }: { session: QuizSession }) {
  const router = useRouter();
  const start = useSession((s) => s.start);
  const clear = useSession((s) => s.clear);

  const total = session.items.length;
  const correctItems = session.items.filter(isCorrect);
  const wrongItems = session.items.filter((i) => !isCorrect(i));
  const rate = total === 0 ? 0 : Math.round((correctItems.length / total) * 100);
  const passed = rate >= PASS_LINE;
  const theme = session.subjectId ? subjectTheme[session.subjectId] : null;

  function retryAll() {
    start({
      title: session.title,
      subtitle: session.subtitle,
      subjectId: session.subjectId,
      questions: session.items.map((i) => i.question),
    });
  }

  function retryWrong() {
    start({
      title: `${session.title}・間違い直し`,
      subtitle: `${wrongItems.length}問`,
      subjectId: session.subjectId,
      questions: wrongItems.map((i) => i.question),
    });
  }

  function goHome() {
    clear();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)] pb-10">
      <section className="surface mt-6 rounded-3xl px-5 py-7 text-center">
        <p className="text-muted text-xs">{session.title}</p>
        <p
          className={`mt-2 text-5xl font-bold tabular-nums ${theme?.accentText ?? ""}`}
        >
          {rate}
          <span className="text-muted ml-0.5 text-2xl">%</span>
        </p>
        <p className="text-muted mt-1 text-sm">
          {total}問中 {correctItems.length}問正解
        </p>

        <div
          className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${
            passed
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
          }`}
        >
          {passed
            ? `合格ライン（${PASS_LINE}点）を超えています`
            : `合格ラインまであと ${PASS_LINE - rate}ポイント`}
        </div>
      </section>

      {wrongItems.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2.5 px-1 text-sm font-bold">
            間違えた問題（{wrongItems.length}問）
          </h2>
          <ul className="flex flex-col gap-2.5">
            {wrongItems.map((item) => (
              <WrongItem key={item.question.id} item={item} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-7 flex flex-col gap-2.5">
        {wrongItems.length > 0 && (
          <PrimaryButton onClick={retryWrong}>
            間違えた{wrongItems.length}問だけ解き直す
          </PrimaryButton>
        )}
        <button
          type="button"
          onClick={retryAll}
          className="surface min-h-13 w-full rounded-2xl px-5 py-3.5 text-base font-bold active:opacity-80"
        >
          同じ範囲をもう一度
        </button>
        <button
          type="button"
          onClick={goHome}
          className="text-muted min-h-12 w-full text-sm font-bold"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}

function WrongItem({ item }: { item: SessionItem }) {
  const [open, setOpen] = useState(false);
  const answer = item.question.choices[item.question.answerIndex];

  return (
    <li className="surface overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
      >
        <MathText className="line-clamp-2 flex-1 text-sm leading-6">
          {item.question.stem}
        </MathText>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`text-muted mt-1 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="border-t border-[var(--border)] px-4 py-3.5">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            正解
          </p>
          <MathText className="mt-1 block text-sm leading-6">{answer}</MathText>
          <p className="text-muted mt-3 text-xs font-bold">解説</p>
          <MathText className="mt-1 block text-sm leading-7">
            {item.question.explanation}
          </MathText>
          {item.question.explanationFigure && (
            <FigureView figure={item.question.explanationFigure} />
          )}
        </div>
      )}
    </li>
  );
}
