"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { ProgressBar } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import { questionsOfUnit, subjects } from "@/data";
import { useProgress } from "@/lib/progress";
import {
  passLineProgress,
  streakDays,
  subjectAccuracy,
  totalAnswered,
  unitAccuracy,
  unitCoverage,
} from "@/lib/stats";
import { useHydrated } from "@/lib/useHydrated";

export default function StatsPage() {
  const attempts = useProgress((s) => s.attempts);
  const reset = useProgress((s) => s.reset);
  const hydrated = useHydrated();
  const stats = hydrated ? attempts : [];
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)]">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">学習記録</h1>
        <p className="text-muted mt-1 text-sm">
          単元別の到達度。低いところから埋めるのが最短です。
        </p>
      </header>

      <section className="surface mb-6 flex rounded-2xl px-4 py-3">
        <Stat label="のべ解答数" value={`${totalAnswered(stats)}問`} />
        <div className="w-px bg-[var(--border)]" />
        <Stat label="連続学習" value={`${streakDays(stats)}日`} />
      </section>

      <div className="flex flex-col gap-6">
        {subjects.map((subject) => {
          const theme = subjectTheme[subject.id];
          const accuracy = subjectAccuracy(stats, subject.id);
          const pass = passLineProgress(stats, subject.id);

          return (
            <section key={subject.id}>
              <div className="mb-2.5 flex items-center gap-2 px-1">
                <span
                  className={`flex size-6 items-center justify-center rounded-lg text-xs font-bold text-white ${theme.accentBg}`}
                >
                  {theme.label}
                </span>
                <h2 className="flex-1 text-base font-bold">{subject.name}</h2>
                <span className="text-muted text-xs">
                  正答率{" "}
                  <span className="font-bold">
                    {accuracy.rate === null ? "—" : `${accuracy.rate}%`}
                  </span>
                </span>
              </div>

              <div className="surface rounded-2xl px-4 py-3.5">
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-muted">合格ライン到達度</span>
                  <span className={`font-bold ${theme.accentText}`}>
                    {pass.cleared}/{pass.total}問
                  </span>
                </div>
                <ProgressBar rate={pass.rate} color={theme.bar} />

                <ul className="mt-4 flex flex-col gap-3">
                  {subject.units.map((unit) => {
                    const total = questionsOfUnit(subject.id, unit.id).length;
                    const coverage = unitCoverage(stats, subject.id, unit.id);
                    const acc = unitAccuracy(stats, subject.id, unit.id);
                    const rate =
                      total === 0 ? 0 : Math.round((coverage.cleared / total) * 100);

                    return (
                      <li key={unit.id}>
                        <div className="mb-1 flex items-baseline gap-2 text-xs">
                          <span className="flex-1 font-medium">{unit.name}</span>
                          <span className="text-muted tabular-nums">
                            {coverage.cleared}/{total}
                          </span>
                          <span className="text-muted w-10 text-right tabular-nums">
                            {acc.rate === null ? "未着手" : `${acc.rate}%`}
                          </span>
                        </div>
                        <ProgressBar rate={rate} color={theme.bar} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mb-safe mt-8">
        {confirming ? (
          <div className="surface rounded-2xl p-4">
            <p className="text-sm font-bold">学習記録をすべて削除しますか？</p>
            <p className="text-muted mt-1 text-xs">この操作は取り消せません。</p>
            <div className="mt-3 flex gap-2.5">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="min-h-11 flex-1 rounded-xl border border-[var(--border)] text-sm font-bold"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirming(false);
                }}
                className="min-h-11 flex-1 rounded-xl bg-rose-600 text-sm font-bold text-white active:opacity-80"
              >
                削除する
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="text-muted min-h-11 w-full text-xs"
          >
            学習記録をリセット
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 text-center">
      <div className="text-muted text-xs">{label}</div>
      <div className="mt-0.5 text-lg font-bold">{value}</div>
    </div>
  );
}
