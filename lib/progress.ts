"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question, SubjectId } from "@/data";

/**
 * 解答履歴。単元別に集計できる粒度で保存しておくことで、
 * Phase 2の苦手分析ダッシュボードやSRSを追加実装だけで載せられるようにする。
 */
export interface Attempt {
  questionId: string;
  subject: SubjectId;
  unit: string;
  correct: boolean;
  /** epoch ms */
  at: number;
}

const MAX_ATTEMPTS = 3000;

interface ProgressState {
  attempts: Attempt[];
  /** localStorageからの復元完了フラグ。SSRとの不一致を避けるために使う */
  hydrated: boolean;
  setHydrated: () => void;
  record: (question: Question, correct: boolean) => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      record: (question, correct) =>
        set((state) => {
          const attempt: Attempt = {
            questionId: question.id,
            subject: question.subject,
            unit: question.unit,
            correct,
            at: Date.now(),
          };
          const attempts = [...state.attempts, attempt];
          return {
            attempts:
              attempts.length > MAX_ATTEMPTS
                ? attempts.slice(attempts.length - MAX_ATTEMPTS)
                : attempts,
          };
        }),
      reset: () => set({ attempts: [] }),
    }),
    {
      name: "ko-nin-progress",
      partialize: (state) => ({ attempts: state.attempts }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);
