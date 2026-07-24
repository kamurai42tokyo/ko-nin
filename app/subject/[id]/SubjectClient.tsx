"use client";

import { notFound, useRouter } from "next/navigation";
import { AppHeader, ProgressBar } from "@/components/ui";
import { subjectTheme } from "@/components/theme";
import {
  basicQuestionsOfSubject,
  getSubject,
  questionsOfUnit,
  type SubjectId,
} from "@/data";
import { useProgress } from "@/lib/progress";
import { useSession } from "@/lib/session";
import { passLineProgress, unitCoverage } from "@/lib/stats";
import { useHydrated } from "@/lib/useHydrated";

const PASS_LINE_COUNT = 10;

export function SubjectClient({ id }: { id: string }) {
  const router = useRouter();
  const attempts = useProgress((s) => s.attempts);
  const start = useSession((s) => s.start);
  const hydrated = useHydrated();
  const stats = hydrated ? attempts : [];

  const subject = getSubject(id);
  if (!subject) notFound();

  const theme = subjectTheme[subject.id as SubjectId];
  const pass = passLineProgress(stats, subject.id);

  function startPassLine() {
    start({
      title: `${subject!.name}・合格ライン特化`,
      subtitle: "全単元の基礎問題からランダム出題",
      subjectId: subject!.id,
      questions: basicQuestionsOfSubject(subject!.id),
      limit: PASS_LINE_COUNT,
    });
    router.push("/quiz");
  }

  function startUnit(unitId: string, unitName: string) {
    start({
      title: unitName,
      subtitle: `${subject!.name}・単元別演習`,
      subjectId: subject!.id,
      questions: questionsOfUnit(subject!.id, unitId),
    });
    router.push("/quiz");
  }

  return (
    <div>
      <AppHeader title={subject.name} subtitle={subject.examNote} backHref="/" />

      <div className="mx-auto max-w-md px-4 pb-10">
        <section
          className={`mt-4 rounded-3xl border p-4 ${theme.softBg} ${theme.softBorder}`}
        >
          <h2 className="text-base font-bold">合格ライン特化モード</h2>
          <p className="text-muted mt-1 text-xs leading-5">
            全単元の基礎問題だけを横断で出題します。単元を捨てるほど必要な正答率は上がるため、まずはここを一周するのが最短ルートです。
          </p>

          <div className="mt-3 mb-1.5 flex items-baseline justify-between text-xs">
            <span className="text-muted">到達度</span>
            <span className={`text-base font-bold ${theme.accentText}`}>
              {pass.rate}%
              <span className="text-muted ml-1 text-xs font-normal">
                ({pass.cleared}/{pass.total}問)
              </span>
            </span>
          </div>
          <ProgressBar rate={pass.rate} color={theme.bar} />

          <button
            type="button"
            onClick={startPassLine}
            className={`mt-3.5 min-h-12 w-full rounded-2xl text-sm font-bold text-white active:opacity-80 ${theme.accentBg}`}
          >
            基礎{PASS_LINE_COUNT}問をはじめる
          </button>
        </section>

        <h2 className="mt-7 mb-2.5 px-1 text-sm font-bold">単元別演習</h2>
        <ul className="flex flex-col gap-2.5">
          {subject.units.map((unit) => {
            const total = questionsOfUnit(subject.id, unit.id).length;
            const coverage = unitCoverage(stats, subject.id, unit.id);
            const rate = total === 0 ? 0 : Math.round((coverage.cleared / total) * 100);

            return (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => startUnit(unit.id, unit.name)}
                  className="surface w-full rounded-2xl px-4 py-3.5 text-left active:opacity-80"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-base font-bold">{unit.name}</span>
                    <span className="text-muted text-xs">
                      {coverage.cleared}/{total}問クリア
                    </span>
                  </div>
                  <p className="text-muted mt-0.5 mb-2.5 text-xs leading-5">
                    {unit.hint}
                  </p>
                  <ProgressBar rate={rate} color={theme.bar} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
