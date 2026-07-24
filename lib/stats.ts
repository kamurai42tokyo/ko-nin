import {
  allQuestions,
  basicQuestionsOfSubject,
  questionsOfSubject,
  questionsOfUnit,
  type Question,
} from "@/data";
import type { Attempt } from "./progress";

export interface Accuracy {
  /** 解答した延べ回数 */
  answered: number;
  correct: number;
  /** 0–100。未解答なら null */
  rate: number | null;
}

function accuracyOf(attempts: Attempt[]): Accuracy {
  const answered = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  return {
    answered,
    correct,
    rate: answered === 0 ? null : Math.round((correct / answered) * 100),
  };
}

export function subjectAccuracy(attempts: Attempt[], subjectId: string): Accuracy {
  return accuracyOf(attempts.filter((a) => a.subject === subjectId));
}

export function unitAccuracy(
  attempts: Attempt[],
  subjectId: string,
  unitId: string,
): Accuracy {
  return accuracyOf(
    attempts.filter((a) => a.subject === subjectId && a.unit === unitId),
  );
}

/**
 * 合格ライン到達度。
 * 「全単元 × 基礎問題」のうち、直近で正解できている問題の割合を返す。
 * 本番の得点率に最も近い指標として扱う。
 */
export function passLineProgress(attempts: Attempt[], subjectId: string) {
  const pool = basicQuestionsOfSubject(subjectId);
  const latest = latestResultMap(attempts);
  const cleared = pool.filter((q) => latest.get(q.id) === true).length;
  return {
    cleared,
    total: pool.length,
    rate: pool.length === 0 ? 0 : Math.round((cleared / pool.length) * 100),
  };
}

/** 問題ごとの「最新の解答が正解だったか」を引けるMap */
export function latestResultMap(attempts: Attempt[]): Map<string, boolean> {
  const map = new Map<string, boolean>();
  for (const a of attempts) map.set(a.questionId, a.correct);
  return map;
}

/**
 * 復習対象：一度解いて、最新の解答が不正解のまま残っている問題。
 * 正解し直せばリストから自動的に外れる。
 */
export function reviewQuestions(attempts: Attempt[], subjectId?: string): Question[] {
  const latest = latestResultMap(attempts);
  const wrongIds = new Set(
    [...latest.entries()].filter(([, ok]) => !ok).map(([id]) => id),
  );
  const pool = subjectId ? questionsOfSubject(subjectId) : allQuestions;
  return pool.filter((q) => wrongIds.has(q.id));
}

/** 単元の進捗表示用：単元内の問題数と、正解済みの問題数 */
export function unitCoverage(
  attempts: Attempt[],
  subjectId: string,
  unitId: string,
) {
  const pool = questionsOfUnit(subjectId, unitId);
  const latest = latestResultMap(attempts);
  const cleared = pool.filter((q) => latest.get(q.id) === true).length;
  return { cleared, total: pool.length };
}

export function totalAnswered(attempts: Attempt[]): number {
  return attempts.length;
}

/** 連続学習日数（今日または昨日を起点に、途切れるまで遡る） */
export function streakDays(attempts: Attempt[]): number {
  if (attempts.length === 0) return 0;
  const days = new Set(
    attempts.map((a) => {
      const d = new Date(a.at);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  );
  const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const cursor = new Date();
  if (!days.has(key(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(key(cursor))) return 0;
  }
  let count = 0;
  while (days.has(key(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}
