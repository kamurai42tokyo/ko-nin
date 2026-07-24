import type { SubjectId } from "@/data";

/**
 * 科目ごとの配色。
 * TailwindのJITが検出できるよう、必ず完全なクラス名を静的に書く（動的結合は不可）。
 */
export interface SubjectTheme {
  label: string;
  accentText: string;
  accentBg: string;
  softBg: string;
  softBorder: string;
  bar: string;
}

export const subjectTheme: Record<SubjectId, SubjectTheme> = {
  math: {
    label: "数",
    accentText: "text-blue-600 dark:text-blue-400",
    accentBg: "bg-blue-600",
    softBg: "bg-blue-50 dark:bg-blue-950/40",
    softBorder: "border-blue-200 dark:border-blue-900",
    bar: "bg-blue-500",
  },
  english: {
    label: "英",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-600",
    softBg: "bg-emerald-50 dark:bg-emerald-950/40",
    softBorder: "border-emerald-200 dark:border-emerald-900",
    bar: "bg-emerald-500",
  },
  japanese: {
    label: "国",
    accentText: "text-rose-600 dark:text-rose-400",
    accentBg: "bg-rose-600",
    softBg: "bg-rose-50 dark:bg-rose-950/40",
    softBorder: "border-rose-200 dark:border-rose-900",
    bar: "bg-rose-500",
  },
};
