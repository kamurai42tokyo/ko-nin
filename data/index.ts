import { mathQuestions, mathSubject } from "./math";
import { englishQuestions, englishSubject } from "./english";
import { japaneseQuestions, japaneseSubject } from "./japanese";
import type {
  Difficulty,
  Figure,
  Question,
  Subject,
  SubjectId,
  Unit,
} from "./schema";

export type { Difficulty, Figure, Question, Subject, SubjectId, Unit };

export const subjects: Subject[] = [mathSubject, englishSubject, japaneseSubject];

export const allQuestions: Question[] = [
  ...mathQuestions,
  ...englishQuestions,
  ...japaneseQuestions,
];

const questionById = new Map(allQuestions.map((q) => [q.id, q]));

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getUnit(subjectId: string, unitId: string): Unit | undefined {
  return getSubject(subjectId)?.units.find((u) => u.id === unitId);
}

export function getQuestion(id: string): Question | undefined {
  return questionById.get(id);
}

export function questionsOfSubject(subjectId: string): Question[] {
  return allQuestions.filter((q) => q.subject === subjectId);
}

export function questionsOfUnit(subjectId: string, unitId: string): Question[] {
  return allQuestions.filter((q) => q.subject === subjectId && q.unit === unitId);
}

/** 合格ライン特化モードの母集団：全単元 × basic */
export function basicQuestionsOfSubject(subjectId: string): Question[] {
  return questionsOfSubject(subjectId).filter((q) => q.difficulty === "basic");
}

export const difficultyLabel: Record<Difficulty, string> = {
  basic: "基礎",
  standard: "標準",
  advanced: "発展",
};
