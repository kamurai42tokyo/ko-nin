import type { Question, Subject } from "./schema";

export const englishSubject: Subject = {
  id: "english",
  name: "英語",
  examNote: "リスニングなし・筆記のみ。図表読み取りと対話文が取りやすい。",
  units: [
    { id: "stress", name: "強勢・アクセント", hint: "知っていれば一瞬。最初に固める" },
    { id: "dialogue", name: "対話文", hint: "場面をイメージすれば文法知識は不要" },
    { id: "vocab", name: "語彙・語法", hint: "前置詞と時制。頻出パターンは限られる" },
    { id: "chart", name: "図表読み取り", hint: "本文を全部読まなくてよい。最も確実な得点源" },
    { id: "reading", name: "読解", hint: "設問を先に読んでから本文を探す" },
  ],
};

export const englishQuestions: Question[] = [
  // ── 強勢・アクセント ───────────────────────────────
  {
    id: "english-stress-1",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の語で最も強く発音する部分はどれか。\nim - por - tant",
    choices: ["im", "por", "tant"],
    answerIndex: 1,
    explanation:
      "important は im-POR-tant と第2音節を強く読む。-ant / -ent で終わる3音節語は、真ん中にアクセントが来ることが多い。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-2",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の語で最も強く発音する部分はどれか。\nnec - es - sar - y",
    choices: ["nec", "es", "sar", "y"],
    answerIndex: 0,
    explanation:
      "necessary は NEC-es-sar-y と第1音節を強く読む。-ary で終わる語は先頭にアクセントが来ることが多い（library, ordinary なども同じ）。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-3",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の語で最も強く発音する部分はどれか。\nvol - un - teer",
    choices: ["vol", "un", "teer"],
    answerIndex: 2,
    explanation:
      "volunteer は vol-un-TEER と最後を強く読む。-eer / -ee / -ese で終わる語は語尾にアクセントが来る（engineer, Japanese なども同じ）。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-4",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "次の語で最も強く発音する部分はどれか。\nde - vel - op",
    choices: ["de", "vel", "op"],
    answerIndex: 1,
    explanation:
      "develop は de-VEL-op と第2音節を強く読む。de- や re- のような接頭辞そのものは弱く読まれるのが原則。",
    tags: ["アクセント"],
  },

  // ── 対話文 ─────────────────────────────────────────
  {
    id: "english-dialogue-1",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: 'A: Could you pass me the salt?\nB: (    )',
    choices: [
      "Sure, here you are.",
      "No, I'm not hungry.",
      "It's on Monday.",
      "I like cooking, too.",
    ],
    answerIndex: 0,
    explanation:
      "Could you 〜? は依頼の表現。応じるときは Sure. / Of course. などで受け、物を手渡すときは Here you are. と言う。",
    tags: ["依頼"],
  },
  {
    id: "english-dialogue-2",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "A: How long does it take to get to the station?\nB: (    )",
    choices: [
      "About ten minutes on foot.",
      "It's about two kilometers away.",
      "Yes, I go there every day.",
      "By bus, usually.",
    ],
    answerIndex: 0,
    explanation:
      "How long 〜? は「どのくらいの時間」を尋ねる表現なので、時間で答える。距離を答えるのは How far 〜?、手段を答えるのは How 〜? への応答。",
    tags: ["疑問詞"],
  },
  {
    id: "english-dialogue-3",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "A: I'm sorry I'm late.\nB: (    )",
    choices: [
      "That's all right. We've just started.",
      "You're welcome.",
      "Congratulations!",
      "Here you are.",
    ],
    answerIndex: 0,
    explanation:
      "謝罪に対する応答は That's all right. / No problem. / Don't worry. など。You're welcome. は Thank you. への応答なので混同しやすい。",
    tags: ["謝罪"],
  },
  {
    id: "english-dialogue-4",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "A: Would you like something to drink?\nB: (    )",
    choices: [
      "Yes, please. Orange juice, thank you.",
      "Yes, I drank it yesterday.",
      "No, I don't like you.",
      "It was delicious.",
    ],
    answerIndex: 0,
    explanation:
      "Would you like 〜? は「〜はいかがですか」という申し出。受けるときは Yes, please.、断るときは No, thank you. が定型。",
    tags: ["申し出"],
  },
  {
    id: "english-dialogue-5",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "A: What do you think of this movie?\nB: (    )",
    choices: [
      "It was more exciting than I expected.",
      "I watched it at the theater.",
      "Yes, I think so.",
      "About two hours long.",
    ],
    answerIndex: 0,
    explanation:
      "What do you think of 〜? は感想を尋ねる表現なので、評価を答える。Yes / No では答えられない疑問文である点がポイント。",
    tags: ["感想"],
  },

  // ── 語彙・語法 ─────────────────────────────────────
  {
    id: "english-vocab-1",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "He is looking (    ) his lost key.",
    choices: ["for", "at", "after", "up"],
    answerIndex: 0,
    explanation:
      "look for 〜「〜を探す」。look at は「〜を見る」、look after は「〜の世話をする」、look up は「（辞書などで）調べる」。",
    tags: ["熟語"],
  },
  {
    id: "english-vocab-2",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "I have been studying English (    ) three years.",
    choices: ["for", "since", "during", "in"],
    answerIndex: 0,
    explanation:
      "期間の長さには for、起点には since を使う。since なら since 2020 のように「いつから」を示す語が続く。",
    tags: ["前置詞"],
  },
  {
    id: "english-vocab-3",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "If it (    ) tomorrow, we will stay home.",
    choices: ["rains", "will rain", "rained", "is raining"],
    answerIndex: 0,
    explanation:
      "時や条件を表す副詞節（if / when など）の中では、未来のことでも現在形で表す。主節の will はそのままでよい。",
    tags: ["時制"],
  },
  {
    id: "english-vocab-4",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "This book is (    ) interesting than that one.",
    choices: ["more", "much", "most", "very"],
    answerIndex: 0,
    explanation:
      "than があるので比較級。interesting のように長い形容詞は more をつけて比較級を作る。最上級なら the most interesting。",
    tags: ["比較"],
  },
  {
    id: "english-vocab-5",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "The letter (    ) by my brother yesterday.",
    choices: ["was written", "wrote", "is written", "has written"],
    answerIndex: 0,
    explanation:
      "手紙は「書かれる」側なので受動態〈be動詞＋過去分詞〉。yesterday があるので過去形の was を使う。",
    tags: ["受動態"],
  },
  {
    id: "english-vocab-6",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "She asked me (    ) I could help her.",
    choices: ["if", "that", "what", "which"],
    answerIndex: 0,
    explanation:
      "「〜かどうか」を表すのは if または whether。that は「〜ということ」で意味が通らない。ask 人 if 〜 の形で覚える。",
    tags: ["接続詞"],
  },

  // ── 図表読み取り ───────────────────────────────────
  {
    id: "english-chart-1",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "GREEN CITY LIBRARY\n\nOpen\n  Mon, Wed–Fri   9:00 a.m. – 8:00 p.m.\n  Sat & Sun      9:00 a.m. – 5:00 p.m.\n\nClosed\n  Every Tuesday\n  December 29 – January 3\n\nBorrowing\n  Up to 5 books for 2 weeks\n  Please bring your library card.",
    stem: "How many books can you borrow at one time?",
    choices: ["Five.", "Two.", "Nine.", "Three."],
    answerIndex: 0,
    explanation:
      "Borrowing の欄に Up to 5 books とある。up to 〜 は「最大〜まで」。2 weeks は貸出期間なので混同しないこと。",
    tags: ["案内文"],
  },
  {
    id: "english-chart-2",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "GREEN CITY LIBRARY\n\nOpen\n  Mon, Wed–Fri   9:00 a.m. – 8:00 p.m.\n  Sat & Sun      9:00 a.m. – 5:00 p.m.\n\nClosed\n  Every Tuesday\n  December 29 – January 3\n\nBorrowing\n  Up to 5 books for 2 weeks\n  Please bring your library card.",
    stem: "What time does the library close on Saturday?",
    choices: ["At 5:00 p.m.", "At 8:00 p.m.", "At 9:00 a.m.", "It is closed on Saturday."],
    answerIndex: 0,
    explanation:
      "Sat & Sun の行に 9:00 a.m. – 5:00 p.m. とある。平日の 8:00 p.m. と取り違えやすいので、曜日の行を必ず確認する。",
    tags: ["案内文"],
  },
  {
    id: "english-chart-3",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "GREEN CITY LIBRARY\n\nOpen\n  Mon, Wed–Fri   9:00 a.m. – 8:00 p.m.\n  Sat & Sun      9:00 a.m. – 5:00 p.m.\n\nClosed\n  Every Tuesday\n  December 29 – January 3\n\nBorrowing\n  Up to 5 books for 2 weeks\n  Please bring your library card.",
    stem: "Which is true about the library?",
    choices: [
      "It is closed every Tuesday.",
      "It is open on New Year's Day.",
      "You can borrow books without a card.",
      "It opens at 8:00 a.m. on weekdays.",
    ],
    answerIndex: 0,
    explanation:
      "Closed の欄に Every Tuesday とある。12月29日〜1月3日も休みなので元日は開いていない。カードは Please bring 〜 とあり必要。開館は 9:00 a.m.。",
    tags: ["内容一致"],
  },

  // ── 読解 ───────────────────────────────────────────
  {
    id: "english-reading-1",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "Ken started running every morning last spring. At first he could run for only ten minutes, and he often wanted to give up. But he decided to run a little longer each week. Six months later, he was able to run for an hour without stopping. Now Ken says that the most important thing is not speed but continuing.",
    stem: "How long could Ken run at first?",
    choices: ["For ten minutes.", "For an hour.", "For six months.", "For a week."],
    answerIndex: 0,
    explanation:
      "第2文に At first he could run for only ten minutes とある。at first「最初は」がキーワード。an hour は6か月後の話。",
    tags: ["内容把握"],
  },
  {
    id: "english-reading-2",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "Ken started running every morning last spring. At first he could run for only ten minutes, and he often wanted to give up. But he decided to run a little longer each week. Six months later, he was able to run for an hour without stopping. Now Ken says that the most important thing is not speed but continuing.",
    stem: "What does Ken think is the most important thing?",
    choices: [
      "Continuing to run.",
      "Running fast.",
      "Running with friends.",
      "Running in the evening.",
    ],
    answerIndex: 0,
    explanation:
      "最終文の not speed but continuing がそのまま答え。not A but B「AではなくB」の形は設問の根拠になりやすいので押さえる。",
    tags: ["主題"],
  },
  {
    id: "english-reading-3",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "Ken started running every morning last spring. At first he could run for only ten minutes, and he often wanted to give up. But he decided to run a little longer each week. Six months later, he was able to run for an hour without stopping. Now Ken says that the most important thing is not speed but continuing.",
    stem: "Which is true about Ken?",
    choices: [
      "He increased his running time little by little.",
      "He gave up running last spring.",
      "He has run for an hour since the first day.",
      "He runs every evening after work.",
    ],
    answerIndex: 0,
    explanation:
      "run a little longer each week「毎週少しずつ長く走る」が言い換えられている。wanted to give up は「やめたくなった」であり、実際にやめてはいない点に注意。",
    tags: ["内容一致"],
  },

  // ── 強勢・アクセント（追加） ───────────────────────
  {
    id: "english-stress-5",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の語で最も強く発音する部分はどれか。\npho - to - graph",
    choices: ["pho", "to", "graph"],
    answerIndex: 0,
    explanation:
      "photograph は PHO-to-graph と第1音節を強く読む。ただし photographer は pho-TOG-ra-pher と位置が変わる。語尾で変化する例として押さえておく。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-6",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "次の語で最も強く発音する部分はどれか。\nun - der - stand",
    choices: ["un", "der", "stand"],
    answerIndex: 2,
    explanation:
      "understand は un-der-STAND と最後の -stand を強く読む。同じ形の understand / recommend など、動詞の後半にアクセントが来る語がある。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-7",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "次の語で最も強く発音する部分はどれか。\ne - con - o - my",
    choices: ["e", "con", "o", "my"],
    answerIndex: 1,
    explanation:
      "economy は e-CON-o-my と第2音節を強く読む。派生語 economic は ec-o-NOM-ic とアクセントが移動するので、セットで覚えると混同しない。",
    tags: ["アクセント"],
  },
  {
    id: "english-stress-8",
    subject: "english",
    unit: "stress",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "次の語で最も強く発音する部分はどれか。\nmu - si - cian",
    choices: ["mu", "si", "cian"],
    answerIndex: 1,
    explanation:
      "musician は mu-SI-cian と第2音節を強く読む。-tion / -cian / -sion で終わる語は、その直前の音節にアクセントが来る（attention, decision なども同じ）。",
    tags: ["アクセント"],
  },

  // ── 対話文（追加） ─────────────────────────────────
  {
    id: "english-dialogue-6",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "（店で）\nA: May I help you?\nB: (    )",
    choices: [
      "Yes, I'm looking for a jacket.",
      "No, you may not.",
      "Here you are.",
      "It's very kind of you to come.",
    ],
    answerIndex: 0,
    explanation:
      "May I help you? は店員の「いらっしゃいませ／お手伝いしましょうか」。客は探しているものを伝えるのが自然。断るなら No, thank you. I'm just looking. と言う。",
    tags: ["店での会話"],
  },
  {
    id: "english-dialogue-7",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "A: How about going to the movies this weekend?\nB: (    )",
    choices: [
      "Sounds good. What shall we see?",
      "Yes, I went there last week.",
      "You're welcome.",
      "It's ten o'clock.",
    ],
    answerIndex: 0,
    explanation:
      "How about 〜ing? は「〜しませんか」という提案。応じるときは Sounds good. / That's a good idea. などで受け、話を先に進める。",
    tags: ["提案"],
  },
  {
    id: "english-dialogue-8",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "A: Thank you very much for your help.\nB: (    )",
    choices: [
      "You're welcome.",
      "That's all right, I'm late.",
      "No, thank you.",
      "Yes, please.",
    ],
    answerIndex: 0,
    explanation:
      "感謝への応答は You're welcome. / My pleasure. / No problem. が定型。That's all right. は謝罪への応答なので場面が違う。",
    tags: ["感謝"],
  },
  {
    id: "english-dialogue-9",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "A: You look tired. Why don't you take a rest?\nB: (    )",
    choices: [
      "Thanks, I think I will.",
      "Because I am busy.",
      "No, I don't have a rest.",
      "Yes, you look tired too.",
    ],
    answerIndex: 0,
    explanation:
      "Why don't you 〜? は「〜したらどう？」という提案・助言。理由を聞いているのではないので Because 〜 では答えない。受け入れるなら Thanks, I think I will. が自然。",
    tags: ["提案"],
  },
  {
    id: "english-dialogue-10",
    subject: "english",
    unit: "dialogue",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "A: Do you mind if I open the window?\nB: (    ) Please go ahead.",
    choices: [
      "Not at all.",
      "Yes, of course.",
      "That's too bad.",
      "You're welcome.",
    ],
    answerIndex: 0,
    explanation:
      "Do you mind if 〜? は直訳すると「〜したら気にしますか」。許可するときは「気にしません」＝ Not at all. / Of course not. と否定で答える。Yes と答えると「困る」の意味になり、直後の Please go ahead. と矛盾する。",
    tags: ["許可"],
  },

  // ── 語彙・語法（追加） ─────────────────────────────
  {
    id: "english-vocab-7",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "She is interested (    ) Japanese history.",
    choices: ["in", "on", "at", "to"],
    answerIndex: 0,
    explanation:
      "be interested in 〜「〜に興味がある」。前置詞は in で固定。感情を表す形容詞と前置詞の組み合わせは丸ごと覚える。",
    tags: ["前置詞"],
  },
  {
    id: "english-vocab-8",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "I have never (    ) to Kyoto.",
    choices: ["been", "gone", "went", "being"],
    answerIndex: 0,
    explanation:
      "have been to 〜「〜へ行ったことがある」（経験）。have gone to 〜 は「行ってしまって今ここにいない」の意味になるので、自分が話している場面では been を使う。",
    tags: ["現在完了"],
  },
  {
    id: "english-vocab-9",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "This is the book (    ) I bought yesterday.",
    choices: ["which", "who", "where", "what"],
    answerIndex: 0,
    explanation:
      "先行詞が the book（もの）で、後ろが「私が買った」と目的語が欠けている文なので、目的格の関係代名詞 which（または that）が入る。人なら who、場所なら where。",
    tags: ["関係代名詞"],
  },
  {
    id: "english-vocab-10",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "basic",
    stem: "He is as (    ) as his father.",
    choices: ["tall", "taller", "tallest", "more tall"],
    answerIndex: 0,
    explanation:
      "as 〜 as … 「…と同じくらい〜」の間には、形容詞は必ず原級（もとの形）を置く。比較級 taller は入らない。",
    tags: ["比較"],
  },
  {
    id: "english-vocab-11",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "If I (    ) you, I would study harder.",
    choices: ["were", "am", "will be", "have been"],
    answerIndex: 0,
    explanation:
      "現実に反する仮定を表す仮定法過去。If節では be動詞は主語に関係なく were を使うのが原則。主節が would 〜 になっているのがヒント。",
    tags: ["仮定法"],
  },
  {
    id: "english-vocab-12",
    subject: "english",
    unit: "vocab",
    format: "multiple-choice",
    difficulty: "standard",
    stem: "The boy (    ) over there is my brother.",
    choices: ["running", "run", "ran", "runs"],
    answerIndex: 0,
    explanation:
      "「向こうで走っている少年」と名詞を後ろから修飾する現在分詞。the boy who is running を1語にした形。動詞の原形や過去形は名詞を修飾できない。",
    tags: ["分詞"],
  },

  // ── 図表読み取り（追加：イベント案内） ─────────────
  {
    id: "english-chart-4",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "SUMMER MUSIC FESTIVAL\n\nDate    Saturday, August 3\nTime    2:00 p.m. – 8:00 p.m.\nPlace   Riverside Park\n\nTickets\n  Adults      2,000 yen\n  Students    1,000 yen\n  Children under 6   Free\n\n* Bring your own drink. Food trucks available.\n* The event will be canceled if it rains.",
    stem: "How much is a ticket for a student?",
    choices: ["1,000 yen.", "2,000 yen.", "Free.", "3,000 yen."],
    answerIndex: 0,
    explanation:
      "Tickets の欄に Students 1,000 yen とある。Adults の 2,000 yen と取り違えないよう、行を正確に読む。",
    tags: ["案内文"],
  },
  {
    id: "english-chart-5",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "SUMMER MUSIC FESTIVAL\n\nDate    Saturday, August 3\nTime    2:00 p.m. – 8:00 p.m.\nPlace   Riverside Park\n\nTickets\n  Adults      2,000 yen\n  Students    1,000 yen\n  Children under 6   Free\n\n* Bring your own drink. Food trucks available.\n* The event will be canceled if it rains.",
    stem: "What time does the festival start?",
    choices: ["At 2:00 p.m.", "At 8:00 p.m.", "At 6:00 p.m.", "At 3:00 p.m."],
    answerIndex: 0,
    explanation:
      "Time の欄は 2:00 p.m. – 8:00 p.m.。前の時刻が開始、後ろが終了。8:00 p.m. は終了時刻。",
    tags: ["案内文"],
  },
  {
    id: "english-chart-6",
    subject: "english",
    unit: "chart",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "SUMMER MUSIC FESTIVAL\n\nDate    Saturday, August 3\nTime    2:00 p.m. – 8:00 p.m.\nPlace   Riverside Park\n\nTickets\n  Adults      2,000 yen\n  Students    1,000 yen\n  Children under 6   Free\n\n* Bring your own drink. Food trucks available.\n* The event will be canceled if it rains.",
    stem: "Which is true about the festival?",
    choices: [
      "It will be canceled in case of rain.",
      "Drinks are sold at the entrance.",
      "Children of all ages must pay 1,000 yen.",
      "It is held on Sunday.",
    ],
    answerIndex: 0,
    explanation:
      "最後の注意書きに canceled if it rains とある。飲み物は各自持参（Bring your own drink）、6歳未満は無料、開催は土曜日なので他は誤り。",
    tags: ["内容一致"],
  },

  // ── 読解（追加） ───────────────────────────────────
  {
    id: "english-reading-4",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "Emma loves plants. Last year she started growing tomatoes on her balcony. She read many books and watered them every day. In summer she got more than fifty tomatoes. She gave some to her neighbors, and they were very happy. Now Emma wants to grow other vegetables, too.",
    stem: "What did Emma start growing last year?",
    choices: ["Tomatoes.", "Flowers.", "Other vegetables.", "Books."],
    answerIndex: 0,
    explanation:
      "第2文に started growing tomatoes とある。other vegetables は「これから育てたいもの」で、今後の話。",
    tags: ["内容把握"],
  },
  {
    id: "english-reading-5",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "basic",
    passage:
      "Emma loves plants. Last year she started growing tomatoes on her balcony. She read many books and watered them every day. In summer she got more than fifty tomatoes. She gave some to her neighbors, and they were very happy. Now Emma wants to grow other vegetables, too.",
    stem: "Why were the neighbors happy?",
    choices: [
      "Because Emma gave them some tomatoes.",
      "Because they read many books.",
      "Because they grew fifty tomatoes.",
      "Because Emma cleaned the balcony.",
    ],
    answerIndex: 0,
    explanation:
      "She gave some to her neighbors, and they were very happy. の流れから、トマトをもらったことが理由。gave some の some は前文の tomatoes を指す。",
    tags: ["理由"],
  },
  {
    id: "english-reading-6",
    subject: "english",
    unit: "reading",
    format: "multiple-choice",
    difficulty: "standard",
    passage:
      "Emma loves plants. Last year she started growing tomatoes on her balcony. She read many books and watered them every day. In summer she got more than fifty tomatoes. She gave some to her neighbors, and they were very happy. Now Emma wants to grow other vegetables, too.",
    stem: "Which is true about Emma?",
    choices: [
      "She took care of the tomatoes every day.",
      "She sold her tomatoes at a shop.",
      "She grew tomatoes in a large field.",
      "She stopped growing plants this year.",
    ],
    answerIndex: 0,
    explanation:
      "watered them every day「毎日水をやった」が言い換えられている。売った・畑で育てた・やめた、はいずれも本文にない。balcony（ベランダ）で育てている点にも注意。",
    tags: ["内容一致"],
  },
];
