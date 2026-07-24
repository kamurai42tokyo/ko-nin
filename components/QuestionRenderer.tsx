"use client";

import { MathText } from "@/components/MathText";
import { FigureView } from "@/components/figures/FigureView";
import { MultipleChoice } from "@/components/formats/MultipleChoice";
import type { SessionItem } from "@/lib/session";

/**
 * 出題フォーマットごとのレンダラ振り分け。
 * ordering（語句整序）と passage-set（本文共有）はPhase 2で追加する。
 * ここを分岐点にしておくことで、追加時にコア側の変更が不要になる。
 */
export function QuestionRenderer({
  item,
  onSelect,
}: {
  item: SessionItem;
  onSelect: (displayIndex: number) => void;
}) {
  const { question } = item;

  return (
    <div className="flex flex-col gap-4">
      {/* 本文はページごとスクロールさせる。入れ子スクロールはスマホで操作しづらいため */}
      {question.passage && (
        <div className="surface rounded-2xl px-4 py-3.5">
          <MathText className="block text-[0.95rem] leading-7">
            {question.passage}
          </MathText>
        </div>
      )}

      <div>
        <MathText className="block text-lg leading-8 font-medium">
          {question.stem}
        </MathText>
        {question.figure && <FigureView figure={question.figure} />}
      </div>

      {question.format === "multiple-choice" ? (
        <MultipleChoice item={item} onSelect={onSelect} />
      ) : (
        <p className="text-muted text-sm">
          この出題形式は未対応です（Phase 2で追加予定）。
        </p>
      )}
    </div>
  );
}
