/**
 * 出題データの共通スキーマ。
 *
 * 三科目でUIは大きく異なるが、データ構造は1つに保つ。
 * 描画の差異は `format` によるレンダラ分岐で吸収する。
 */

export type SubjectId = "math" | "english" | "japanese";

/**
 * basic    … 全単元でこれだけ取れれば合格ライン(40点)に乗る層
 * standard … 得点の上積み
 * advanced … 余力向け（本番では飛ばしてよい層）
 */
export type Difficulty = "basic" | "standard" | "advanced";

/**
 * multiple-choice … 三科目共通の基本形（Phase 1で実装）
 * ordering        … 英語の語句整序（Phase 2）
 * passage-set     … 本文を複数設問で共有する形式（Phase 2）
 */
export type QuestionFormat = "multiple-choice" | "ordering" | "passage-set";

/**
 * 図版の指定。
 *
 * 高認の図は出題パターンが限られているため、画像ファイルを1枚ずつ用意するのではなく
 * 「パラメータを渡すとSVGを描くコンポーネント」に寄せている。
 * - データがテキストのまま保てる（差分が読める・数値替えで量産できる）
 * - ダークモードに自動追従し、拡大しても劣化しない
 * どうしても定型に収まらない図は kind: "custom" でSVGを直接書ける。
 */
export type Figure =
  /** 2辺とその間の角から三角形を作図する（正弦定理・余弦定理・面積） */
  | {
      kind: "triangle";
      /** 辺a＝BC の長さ */
      a: number;
      /** 辺b＝CA の長さ */
      b: number;
      /** 頂点Cの角度（度） */
      angleC: number;
      labels?: { a?: string; b?: string; c?: string; angleC?: string };
    }
  /** $y=ax^2+bx+c$ のグラフ */
  | {
      kind: "parabola";
      a: number;
      b: number;
      c: number;
      /** 頂点に印と座標を表示する */
      markVertex?: boolean;
      caption?: string;
    }
  /** 箱ひげ図 */
  | {
      kind: "boxplot";
      min: number;
      q1: number;
      median: number;
      q3: number;
      max: number;
      caption?: string;
    }
  /** 定型に収まらない図の逃げ道。SVGの中身（<svg>タグの内側）を渡す */
  | { kind: "custom"; viewBox: string; body: string };

export interface Question {
  id: string;
  subject: SubjectId;
  /** UnitId。単元別の到達度集計はこのキーで行う */
  unit: string;
  format: QuestionFormat;
  difficulty: Difficulty;
  /** 自己完結型の本文。長文を複数問で共有する形式はPhase 2で passageId に移行する */
  passage?: string;
  passageId?: string;
  /** 問題文。`$...$` で囲んだ部分はLaTeXとして数式描画される */
  stem: string;
  /** 問題文に添える図 */
  figure?: Figure;
  choices: string[];
  answerIndex: number;
  explanation: string;
  /** 解説に添える図。問題用とは別の図を出せる（解答後に初めて見せたい図など） */
  explanationFigure?: Figure;
  tags?: string[];
}

export interface Unit {
  id: string;
  name: string;
  /** 単元の位置づけを一行で。学習の優先順位づけに使う */
  hint: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  /** 本番での出題構成メモ */
  examNote: string;
  units: Unit[];
}
