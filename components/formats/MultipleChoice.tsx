"use client";

import { MathText } from "@/components/MathText";
import { correctDisplayIndex, type SessionItem } from "@/lib/session";

const MARKS = ["①", "②", "③", "④", "⑤"];

export function MultipleChoice({
  item,
  onSelect,
}: {
  item: SessionItem;
  onSelect: (displayIndex: number) => void;
}) {
  const answerIndex = correctDisplayIndex(item);

  return (
    <ul className="flex flex-col gap-2.5">
      {item.order.map((originalIndex, displayIndex) => {
        const selected = item.selected === displayIndex;
        const isAnswer = displayIndex === answerIndex;

        let tone = "surface";
        let mark = "text-muted";
        if (item.revealed && isAnswer) {
          tone =
            "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-600";
          mark = "text-emerald-600 dark:text-emerald-400";
        } else if (item.revealed && selected) {
          tone = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 dark:border-rose-600";
          mark = "text-rose-600 dark:text-rose-400";
        } else if (item.revealed) {
          tone = "surface opacity-55";
        } else if (selected) {
          tone = "bg-slate-900 dark:bg-slate-100 border-slate-900 dark:border-slate-100";
        }

        const textTone =
          !item.revealed && selected ? "text-white dark:text-slate-900" : "";
        const markTone =
          !item.revealed && selected ? "text-white/70 dark:text-slate-900/60" : mark;

        return (
          <li key={displayIndex}>
            <button
              type="button"
              onClick={() => onSelect(displayIndex)}
              disabled={item.revealed}
              aria-pressed={selected}
              className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors active:scale-[0.995] disabled:cursor-default ${tone} ${textTone}`}
            >
              <span className={`shrink-0 text-lg leading-6 ${markTone}`}>
                {MARKS[displayIndex] ?? displayIndex + 1}
              </span>
              <MathText className="flex-1 text-base leading-6">
                {item.question.choices[originalIndex]}
              </MathText>
              {item.revealed && isAnswer && (
                <span className="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  正解
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
