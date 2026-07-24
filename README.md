# 高認クイズ

高等学校卒業程度認定試験（高卒認定試験）の**数学・英語・国語**に対応したクイズアプリ。
スマートフォンでの操作を前提に設計している。

## ▶ アプリを開く

### **https://kamurai42tokyo.github.io/ko-nin/**

スマホ・PCどちらのブラウザからでもそのまま使えます（インストール不要）。
スマホでは「ホーム画面に追加」すると全画面でアプリのように起動できます。

<a href="https://kamurai42tokyo.github.io/ko-nin/">
  <img alt="アプリを開く" src="https://img.shields.io/badge/%E2%96%B6_%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E9%96%8B%E3%81%8F-2563eb?style=for-the-badge">
</a>

## 設計方針

合格基準が「各科目100点満点でおおむね40点」であることに最適化している。

- **単元は捨てない。** 1単元を捨てると満点が80点になり、必要正答率が40%→50%に上がる。捨てるべきは単元ではなく各単元内の発展問題。
- **難易度で出題を制御する。** `difficulty` を出題フィルタの主軸に据え、「全単元 × 基礎」だけを回す合格ライン特化モードを主導線にしている。
- **本番での捨て問判断は別問題。** これは時間配分の技術なので、Phase 3の模試モードで扱う。

## 収録問題について

**すべて出題傾向をもとにした書き下ろし**であり、過去問の転載は行っていない。
過去問には第三者の著作物（評論・小説・英語長文）が含まれ、二次配布ができないため。

## 技術構成

| 領域 | 採用 |
|---|---|
| フレームワーク | Next.js 16（App Router）+ TypeScript |
| スタイル | Tailwind CSS v4 |
| 数式 | KaTeX（`$...$` 記法で問題データに直接記述） |
| 状態管理 | Zustand（学習履歴は localStorage に永続化） |
| 問題データ | TypeScriptファイル（`data/*.ts`） |

## ディレクトリ構成

```
app/
  page.tsx                  ホーム（科目一覧・合格ライン到達度）
  subject/[id]/page.tsx     単元一覧・モード選択
  quiz/page.tsx             演習画面（セッションはZustandが保持）
  quiz/QuizResult.tsx       結果・間違い直し
  review/page.tsx           復習（最新解答が不正解の問題）
  stats/page.tsx            学習記録（単元別到達度）
components/
  QuestionRenderer.tsx      format別レンダラの振り分け点
  formats/MultipleChoice.tsx
  MathText.tsx              KaTeX描画＋日本語の禁則処理
data/
  schema.ts                 Question型（拡張の中心）
  math.ts / english.ts / japanese.ts
lib/
  session.ts                出題セッション（選択肢シャッフル含む）
  progress.ts               解答履歴の永続化
  stats.ts                  到達度・復習対象の集計（純関数）
```

## 図版について

図は画像ファイルではなく、**パラメータからSVGを描くコンポーネント**として持っている（[`components/figures/FigureView.tsx`](components/figures/FigureView.tsx)）。高認の図は出題パターンが限られているため、この方が数値替えで量産でき、ダークモードにも自動追従する。

| `kind` | 用途 | 指定する値 |
|---|---|---|
| `triangle` | 正弦定理・余弦定理・面積 | 2辺とその間の角（`a`, `b`, `angleC`）から自動作図 |
| `parabola` | 二次関数のグラフ | `a`, `b`, `c`。`markVertex` で頂点座標を表示 |
| `boxplot` | 箱ひげ図 | `min`, `q1`, `median`, `q3`, `max` |
| `custom` | 定型に収まらない図 | `viewBox` とSVGの中身を直接指定 |

問題文用の `figure` と、解答後に見せる `explanationFigure` を別々に指定できる。

```ts
figure: { kind: "triangle", a: 3, b: 5, angleC: 60,
          labels: { a: "3", b: "5", c: "c = ?", angleC: "60°" } },
explanationFigure: { kind: "parabola", a: 1, b: -4, c: 1, markVertex: true },
```

## 開発

```bash
npm run dev     # http://localhost:3000
npm run build
```

## 問題の追加方法

`data/{科目}.ts` の配列に `Question` を追加するだけでよい。単元別集計・復習・到達度には自動で反映される。

```ts
{
  id: "math-numbers-6",
  subject: "math",
  unit: "numbers",        // Subject.units の id と一致させる
  format: "multiple-choice",
  difficulty: "basic",    // basic は合格ライン特化モードの母集団になる
  stem: "$(x+1)^2$ を展開せよ。",
  choices: ["$x^2+2x+1$", "..."],
  answerIndex: 0,         // 表示時にシャッフルされるので位置は問わない
  explanation: "……",
}
```

## 今後の予定

- **Phase 2** … 語句整序（`ordering`）、本文共有型の長文（`passage-set`）、SRSによる自動出題
- **Phase 3** … 模試モード（本番形式・50分計測・捨て問判断の訓練）、縦書き表示オプション
