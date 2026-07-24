"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { ProgressBar } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import { basicQuestionsOfSubject, subjects, type SubjectId } from "@/data";
import { useProgress } from "@/lib/progress";
import { useSession } from "@/lib/session";
import { passLineProgress, streakDays, totalAnswered } from "@/lib/stats";
import { useHydrated } from "@/lib/useHydrated";

const PASS_LINE_COUNT = 10;

export default function HomePage() {
  const router = useRouter();
  const attempts = useProgress((s) => s.attempts);
  const start = useSession((s) => s.start);
  const hydrated = useHydrated();
  const stats = hydrated ? attempts : [];

  function startPassLine(subjectId: SubjectId, name: string) {
    start({
      title: `${name}・合格ライン特化`,
      subtitle: "全単元の基礎問題からランダム出題",
      subjectId,
      questions: basicQuestionsOfSubject(subjectId),
      limit: PASS_LINE_COUNT,
    });
    router.push("/quiz");
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)]">
      <header className="pt-6 pb-5">
        <h1 className="text-2xl font-bold tracking-tight">高認クイズ</h1>
        <p className="text-muted mt-1 text-sm">
          全単元の基礎を回して、合格ライン40点に最短で届く。
        </p>
      </header>

      <section className="surface mb-5 flex rounded-2xl px-4 py-3">
        <Stat label="解いた問題" value={`${totalAnswered(stats)}問`} />
        <div className="w-px bg-[var(--border)]" />
        <Stat label="連続学習" value={`${streakDays(stats)}日`} />
      </section>

      <section className="flex flex-col gap-4">
        {subjects.map((subject) => {
          const theme = subjectTheme[subject.id];
          const pass = passLineProgress(stats, subject.id);

          return (
            <article key={subject.id} className="surface rounded-3xl p-4">
              <Link href={`/subject/${subject.id}`} className="flex items-center gap-3">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${theme.accentBg}`}
                >
                  {theme.label}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold">{subject.name}</span>
                  <span className="text-muted block truncate text-xs">
                    {subject.units.length}単元 · {subject.examNote}
                  </span>
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="text-muted shrink-0"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div className="mt-4 mb-1.5 flex items-baseline justify-between text-xs">
                <span className="text-muted">合格ライン到達度</span>
                <span className="font-bold">
                  <span className={`text-base ${theme.accentText}`}>{pass.rate}%</span>
                  <span className="text-muted ml-1 font-normal">
                    ({pass.cleared}/{pass.total}問)
                  </span>
                </span>
              </div>
              <ProgressBar rate={pass.rate} color={theme.bar} />

              <button
                type="button"
                onClick={() => startPassLine(subject.id, subject.name)}
                className={`mt-3.5 min-h-12 w-full rounded-2xl text-sm font-bold text-white active:opacity-80 ${theme.accentBg}`}
              >
                合格ライン特化モード（{PASS_LINE_COUNT}問）
              </button>
            </article>
          );
        })}
      </section>

      <p className="text-muted mb-safe mt-6 px-1 text-xs leading-5">
        収録問題はすべて出題傾向をもとにした書き下ろしです。実際の過去問は文部科学省サイトで公開されています。
      </p>

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
