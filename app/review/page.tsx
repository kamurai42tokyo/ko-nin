"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { MathText } from "@/components/MathText";
import { PrimaryButton } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import { getSubject, getUnit } from "@/data";
import { useProgress } from "@/lib/progress";
import { useSession } from "@/lib/session";
import { reviewQuestions } from "@/lib/stats";
import { useHydrated } from "@/lib/useHydrated";

export default function ReviewPage() {
  const router = useRouter();
  const attempts = useProgress((s) => s.attempts);
  const start = useSession((s) => s.start);
  const hydrated = useHydrated();

  const questions = hydrated ? reviewQuestions(attempts) : [];

  function startReview() {
    start({
      title: "間違い直し",
      subtitle: `${questions.length}問`,
      subjectId: null,
      questions,
    });
    router.push("/quiz");
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)]">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">復習</h1>
        <p className="text-muted mt-1 text-sm">
          最後に解いたとき間違えた問題です。正解し直すと自動的にこの一覧から外れます。
        </p>
      </header>

      {!hydrated ? null : questions.length === 0 ? (
        <div className="surface mt-4 rounded-3xl px-5 py-10 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-3 text-sm font-bold">復習する問題はありません</p>
          <p className="text-muted mt-1 text-xs leading-5">
            間違えた問題はここに溜まります。
            <br />
            まずは合格ライン特化モードを一周してみてください。
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-2 flex flex-col gap-2.5">
            {questions.map((q) => {
              const theme = subjectTheme[q.subject];
              return (
                <li key={q.id} className="surface rounded-2xl px-4 py-3.5">
                  <div className="mb-1.5 flex items-center gap-2 text-[0.7rem]">
                    <span
                      className={`flex size-5 items-center justify-center rounded-md font-bold text-white ${theme.accentBg}`}
                    >
                      {theme.label}
                    </span>
                    <span className="text-muted">
                      {getSubject(q.subject)?.name} ·{" "}
                      {getUnit(q.subject, q.unit)?.name}
                    </span>
                  </div>
                  <MathText className="line-clamp-2 block text-sm leading-6">
                    {q.stem}
                  </MathText>
                </li>
              );
            })}
          </ul>

          <div className="mb-safe sticky bottom-20 mt-5">
            <PrimaryButton onClick={startReview}>
              {questions.length}問をまとめて解き直す
            </PrimaryButton>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
