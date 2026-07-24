import type { Question, Subject } from "./schema";

export const japaneseSubject: Subject = {
  id: "japanese",
  name: "国語",
  examNote: "現代文の配点が最も高い。古文・漢文には注釈が多く付く。",
  units: [
    { id: "modern", name: "現代文", hint: "配点が最大。ここだけで合格点に届く" },
    { id: "knowledge", name: "国語常識", hint: "漢字・敬語・慣用句。暗記がそのまま点になる" },
    { id: "classical", name: "古文", hint: "頻出古語と仮名遣いだけで設問の半分は取れる" },
    { id: "kanbun", name: "漢文", hint: "返り点と句形のパターンは10個程度しかない" },
  ],
};

export const japaneseQuestions: Question[] = [
  // ── 現代文 ─────────────────────────────────────────
  {
    id: "japanese-modern-1",
    subject: "japanese",
    unit: "modern",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "言葉は、単に情報を伝えるための道具ではない。私たちは言葉を使って考え、言葉によって世界を切り分けている。たとえば、虹の色を七色と数える文化もあれば、三色や五色と数える文化もある。虹そのものが変わるわけではない。変わるのは、それを見る側が持つ〈A〉言葉の網の目である。つまり、私たちが「見ている」と思っているものの多くは、実は言葉を通して「読んでいる」ものなのだ。",
    stem: "傍線部〈A〉「言葉の網の目」とはどういうことか。",
    choices: [
      "世界を区切って捉えるための、言葉が持つ枠組み",
      "情報を正確に相手へ伝えるための文法規則",
      "文化ごとに異なる、虹の色の見え方そのもの",
      "言葉を覚えるほど細かくなっていく記憶の仕組み",
    ],
    answerIndex: 0,
    explanation:
      "直前に「言葉によって世界を切り分けている」とあり、網の目は「区切り方」の比喩。虹そのものは変わらず、区切る枠組みだけが違うという文脈から判断する。",
    tags: ["傍線部説明"],
  },
  {
    id: "japanese-modern-2",
    subject: "japanese",
    unit: "modern",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "言葉は、単に情報を伝えるための道具ではない。私たちは言葉を使って考え、言葉によって世界を切り分けている。たとえば、虹の色を七色と数える文化もあれば、三色や五色と数える文化もある。虹そのものが変わるわけではない。変わるのは、それを見る側が持つ〈A〉言葉の網の目である。つまり、私たちが「見ている」と思っているものの多くは、実は言葉を通して「読んでいる」ものなのだ。",
    stem: "筆者が虹の例を挙げているのはなぜか。",
    choices: [
      "同じ対象でも、言葉によって捉え方が変わることを示すため",
      "自然現象を正確に観察することの難しさを伝えるため",
      "日本文化の色彩感覚が優れていることを説明するため",
      "科学的な事実と文化的な伝承の違いを整理するため",
    ],
    answerIndex: 0,
    explanation:
      "「虹そのものが変わるわけではない。変わるのは……言葉の網の目」という対比が例の主眼。対象は同一でも捉え方が異なる、という主張の裏づけとして挙げられている。",
    tags: ["理由説明"],
  },
  {
    id: "japanese-modern-3",
    subject: "japanese",
    unit: "modern",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "言葉は、単に情報を伝えるための道具ではない。私たちは言葉を使って考え、言葉によって世界を切り分けている。たとえば、虹の色を七色と数える文化もあれば、三色や五色と数える文化もある。虹そのものが変わるわけではない。変わるのは、それを見る側が持つ〈A〉言葉の網の目である。つまり、私たちが「見ている」と思っているものの多くは、実は言葉を通して「読んでいる」ものなのだ。",
    stem: "この文章における筆者の主張として最も適当なものはどれか。",
    choices: [
      "言葉は世界の捉え方そのものを形づくっている",
      "言葉は情報伝達の道具として今後さらに重要になる",
      "文化が違えば正しい言葉の使い方も変わってくる",
      "見ることよりも読むことを大切にすべきである",
    ],
    answerIndex: 0,
    explanation:
      "冒頭で「道具ではない」と一般論を否定し、最終文の「つまり」以降で主張をまとめている。論理的文章では「つまり」「このように」の後ろが結論になりやすい。",
    tags: ["主旨"],
  },
  {
    id: "japanese-modern-4",
    subject: "japanese",
    unit: "modern",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の文の空欄に入る接続語として最も適当なものはどれか。\n\n「彼は誰よりも練習を重ねた。（　　）、本番では結果を出せなかった。」",
    choices: ["しかし", "だから", "つまり", "さらに"],
    answerIndex: 0,
    explanation:
      "前後が「努力した」→「結果が出なかった」と逆の内容になっているので逆接。「だから」は順接、「つまり」は言い換え、「さらに」は添加で、いずれも文脈に合わない。",
    tags: ["接続語"],
  },

  // ── 国語常識 ───────────────────────────────────────
  {
    id: "japanese-knowledge-1",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "「彼の発言が物議を醸した」の「醸」の読みとして正しいものはどれか。",
    choices: ["かも", "さわ", "きざ", "うなが"],
    answerIndex: 0,
    explanation:
      "「物議を醸す（ぶつぎをかもす）」で「議論を引き起こす」の意味。「醸成」「醸造」の「醸」で、もとは酒などを「醸（かも）す」から来ている。",
    tags: ["漢字の読み"],
  },
  {
    id: "japanese-knowledge-2",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "「気が置けない」の意味として正しいものはどれか。",
    choices: [
      "遠慮する必要がなく、打ち解けられる",
      "油断ができず、警戒が必要である",
      "気配りが足りず、落ち着かない",
      "興味が持てず、退屈である",
    ],
    answerIndex: 0,
    explanation:
      "「気を置く＝遠慮する」の否定形なので「遠慮がいらない」。「油断できない」という誤用が非常に多く、その誤りが選択肢に必ず並ぶ定番問題。",
    tags: ["慣用句"],
  },
  {
    id: "japanese-knowledge-3",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "敬語の使い方として正しいものはどれか。",
    choices: [
      "先生が資料をご覧になりました。",
      "先生が資料を拝見しました。",
      "お客様が申されたとおりです。",
      "部長は今、席におりません。（社内で部長本人に向かって）",
    ],
    answerIndex: 0,
    explanation:
      "「ご覧になる」は尊敬語で、目上の動作に使えて正しい。「拝見する」は謙譲語なので先生の動作には使えない。「申す」も謙譲語。「おる」は謙譲語で本人に向けては使わない。",
    tags: ["敬語"],
  },
  {
    id: "japanese-knowledge-4",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "四字熟語「一朝一夕」の意味として正しいものはどれか。",
    choices: [
      "わずかな時間、短い期間",
      "朝から晩まで働き続けること",
      "毎日欠かさず続けること",
      "一度きりの貴重な機会",
    ],
    answerIndex: 0,
    explanation:
      "「一朝一夕にはできない」の形で使われることが多く、「ひと朝ひと晩程度の短い時間」の意味。「一期一会」（一度きりの機会）と混同しやすい。",
    tags: ["四字熟語"],
  },
  {
    id: "japanese-knowledge-5",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "「静かだ」の品詞として正しいものはどれか。",
    choices: ["形容動詞", "形容詞", "動詞", "副詞"],
    answerIndex: 0,
    explanation:
      "言い切りが「〜だ」で終わり、「静かな場所」のように活用するので形容動詞。形容詞は「美しい」のように言い切りが「〜い」で終わる。",
    tags: ["文法"],
  },
  {
    id: "japanese-knowledge-6",
    subject: "japanese",
    unit: "knowledge",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "「矛盾」の意味として正しいものはどれか。",
    choices: [
      "二つの物事のつじつまが合わないこと",
      "他人の意見に強く反対すること",
      "多くの物事が入り混じっていること",
      "解決の見通しが立たないこと",
    ],
    answerIndex: 0,
    explanation:
      "どんな盾も突き通す矛と、どんな矛も防ぐ盾を売った故事に由来する。前後で言っていることが食い違う状態を指す。",
    tags: ["語句の意味"],
  },

  // ── 古文 ───────────────────────────────────────────
  {
    id: "japanese-classical-1",
    subject: "japanese",
    unit: "classical",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "歴史的仮名遣い「けふ」を現代仮名遣いに直すとどうなるか。",
    choices: ["きょう", "けう", "きゅう", "こう"],
    answerIndex: 0,
    explanation:
      "「けふ」→「けう」→「きょう」と変換する。「〜au」は「〜ô」、「〜eu」は「〜yô」になるルール。「今日」の意味。",
    tags: ["仮名遣い"],
  },
  {
    id: "japanese-classical-2",
    subject: "japanese",
    unit: "classical",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "古語「あはれなり」の意味として最も適当なものはどれか。",
    choices: [
      "しみじみと心を打たれる",
      "気の毒でみじめだ",
      "こっけいでおもしろい",
      "おそろしくて不気味だ",
    ],
    answerIndex: 0,
    explanation:
      "「あはれ」は感動の中心を表す語で、しみじみとした情感を指す。現代語の「哀れ（かわいそう）」とは意味が異なる点が頻出。",
    tags: ["古語"],
  },
  {
    id: "japanese-classical-3",
    subject: "japanese",
    unit: "classical",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "古語「をかし」の意味として最も適当なものはどれか。",
    choices: ["趣がある", "こっけいだ", "変だ", "気の毒だ"],
    answerIndex: 0,
    explanation:
      "「をかし」は明るく知的な感動で「趣がある・興味深い」。しみじみとした情感の「あはれなり」と対になる語として覚える。現代語の「おかしい」とは別物。",
    tags: ["古語"],
  },
  {
    id: "japanese-classical-4",
    subject: "japanese",
    unit: "classical",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "今は昔、竹取の翁といふ者ありけり。野山にまじりて竹を取りつつ、よろづのことに使ひけり。\n\n〔注〕翁＝おじいさん／まじりて＝分け入って",
    stem: "傍線部「よろづのこと」の意味として最も適当なものはどれか。",
    choices: ["さまざまなこと", "たいせつなこと", "むだなこと", "夜のできごと"],
    answerIndex: 0,
    explanation:
      "「よろづ（万）」は「多くの・すべての」の意味。「よろづのこと」で「いろいろなこと」。竹を取ってさまざまな用途に使っていた、という文脈と合う。",
    tags: ["古語"],
  },
  {
    id: "japanese-classical-5",
    subject: "japanese",
    unit: "classical",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "今は昔、竹取の翁といふ者ありけり。野山にまじりて竹を取りつつ、よろづのことに使ひけり。\n\n〔注〕翁＝おじいさん／まじりて＝分け入って",
    stem: "「ありけり」の「けり」が表す意味として最も適当なものはどれか。",
    choices: ["過去（〜た）", "打消（〜ない）", "推量（〜だろう）", "希望（〜たい）"],
    answerIndex: 0,
    explanation:
      "「けり」は過去の助動詞で、特に人から伝え聞いた過去（伝聞過去）を表す。物語の冒頭「今は昔……ありけり」は定型表現。和歌の中では詠嘆になることもある。",
    tags: ["助動詞"],
  },

  // ── 漢文 ───────────────────────────────────────────
  {
    id: "japanese-kanbun-1",
    subject: "japanese",
    unit: "kanbun",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "返り点「レ点」の働きとして正しいものはどれか。",
    choices: [
      "すぐ下の一字から、すぐ上の一字に返って読む",
      "二字以上へだてて上に返って読む",
      "文の最後まで読んでから先頭に戻る",
      "その字を読まずに飛ばす",
    ],
    answerIndex: 0,
    explanation:
      "レ点は下の一字を先に読み、その直上へ返る記号。二字以上へだてる場合は一・二点を使う。",
    tags: ["返り点"],
  },
  {
    id: "japanese-kanbun-2",
    subject: "japanese",
    unit: "kanbun",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "「不 レ 知」の書き下し文として正しいものはどれか。",
    choices: ["知らず", "知らざる", "知るなかれ", "知らんや"],
    answerIndex: 0,
    explanation:
      "レ点により「知」を先に読み、「不」へ返る。「不」は助動詞なのでひらがなで書き、打消「ず」となって「知らず」。",
    tags: ["書き下し文"],
  },
  {
    id: "japanese-kanbun-3",
    subject: "japanese",
    unit: "kanbun",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "句形「豈 〜 乎（あに〜や）」が表す意味として正しいものはどれか。",
    choices: [
      "反語（〜だろうか、いや〜ない）",
      "疑問（〜だろうか）",
      "禁止（〜してはならない）",
      "使役（〜させる）",
    ],
    answerIndex: 0,
    explanation:
      "「豈」は反語を表す代表的な字。形は疑問文だが、実際は強い否定を主張している。反語は漢文で最も出題されやすい句形。",
    tags: ["句形"],
  },
  {
    id: "japanese-kanbun-4",
    subject: "japanese",
    unit: "kanbun",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "「使 A B」の形が表す意味として正しいものはどれか。",
    choices: [
      "使役（AにBさせる）",
      "受身（AがBされる）",
      "比較（AはBより優れる)",
      "仮定（もしAならばB）",
    ],
    answerIndex: 0,
    explanation:
      "「使」「令」「遣」は使役を表し、「AをしてBしむ」と読む。受身は「見」「被」「為〜所」の形をとる。",
    tags: ["句形"],
  },
  {
    id: "japanese-kanbun-5",
    subject: "japanese",
    unit: "kanbun",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "「学びて時に之を習ふ、亦説ばしからずや」の「亦〜ずや」が表す意味として正しいものはどれか。",
    choices: [
      "詠嘆（なんと〜ではないか）",
      "打消（決して〜ない）",
      "命令（必ず〜せよ）",
      "条件（もし〜ならば）",
    ],
    answerIndex: 0,
    explanation:
      "「不亦〜乎」は詠嘆を表す定型句で「なんと〜ではないか」と訳す。『論語』冒頭の一節で、形は否定疑問だが意味は強い肯定。",
    tags: ["句形"],
  },
];
