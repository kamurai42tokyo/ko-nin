"use client";

import { create } from "zustand";
import type { Question, SubjectId } from "@/data";

export interface SessionItem {
  question: Question;
  /** 表示順 → 元の選択肢インデックス。正解位置が偏らないよう毎回シャッフルする */
  order: number[];
  /** ユーザーが選んだ「表示上の」インデックス */
  selected: number | null;
  /** 答え合わせ済みか */
  revealed: boolean;
}

export interface QuizSession {
  title: string;
  subtitle: string;
  subjectId: SubjectId | null;
  items: SessionItem[];
  index: number;
  finished: boolean;
}

interface SessionState {
  session: QuizSession | null;
  start: (config: {
    title: string;
    subtitle: string;
    subjectId: SubjectId | null;
    questions: Question[];
    limit?: number;
  }) => void;
  select: (displayIndex: number) => void;
  reveal: () => void;
  next: () => void;
  clear: () => void;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function toItem(question: Question): SessionItem {
  return {
    question,
    order: shuffle(question.choices.map((_, i) => i)),
    selected: null,
    revealed: false,
  };
}

export function isCorrect(item: SessionItem): boolean {
  if (item.selected === null) return false;
  return item.order[item.selected] === item.question.answerIndex;
}

/** 表示上のどの位置が正解かを返す（答え合わせ表示用） */
export function correctDisplayIndex(item: SessionItem): number {
  return item.order.indexOf(item.question.answerIndex);
}

export const useSession = create<SessionState>((set) => ({
  session: null,
  start: ({ title, subtitle, subjectId, questions, limit }) => {
    const picked = shuffle(questions).slice(0, limit ?? questions.length);
    set({
      session: {
        title,
        subtitle,
        subjectId,
        items: picked.map(toItem),
        index: 0,
        finished: false,
      },
    });
  },
  select: (displayIndex) =>
    set((state) => {
      const s = state.session;
      if (!s) return state;
      const items = [...s.items];
      const current = items[s.index];
      if (current.revealed) return state;
      items[s.index] = { ...current, selected: displayIndex };
      return { session: { ...s, items } };
    }),
  reveal: () =>
    set((state) => {
      const s = state.session;
      if (!s) return state;
      const items = [...s.items];
      const current = items[s.index];
      if (current.selected === null || current.revealed) return state;
      items[s.index] = { ...current, revealed: true };
      return { session: { ...s, items } };
    }),
  next: () =>
    set((state) => {
      const s = state.session;
      if (!s) return state;
      if (s.index >= s.items.length - 1) {
        return { session: { ...s, finished: true } };
      }
      return { session: { ...s, index: s.index + 1 } };
    }),
  clear: () => set({ session: null }),
}));
