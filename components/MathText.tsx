import katex from "katex";

/** 行頭に来てはいけない約物。直前の数式とまとめて折り返し禁止にする */
const NO_LINE_START = /^[。、，．）」』】》〉？！]+/;

/**
 * 問題文・選択肢・解説の共通レンダラ。
 * `$...$` で囲まれた部分をKaTeXで数式描画し、それ以外は素のテキストとして扱う。
 * 改行はそのまま反映する（対話文や図表の整形に使うため）。
 */
export function MathText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const segments = children.split(/(\$[^$\n]+\$)/g);
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isMath =
      segment.length > 2 && segment.startsWith("$") && segment.endsWith("$");

    if (!isMath) {
      if (segment) nodes.push(<span key={i}>{segment}</span>);
      continue;
    }

    const html = katex.renderToString(segment.slice(1, -1), {
      throwOnError: false,
      displayMode: false,
      output: "html",
    });

    // 数式の直後に句読点が続く場合、両者の間で改行されると約物が行頭に来てしまう。
    // 句読点だけを数式と同じ nowrap の箱に入れて防ぐ。
    const following = segments[i + 1] ?? "";
    const punctuation = following.match(NO_LINE_START)?.[0] ?? "";
    if (punctuation) segments[i + 1] = following.slice(punctuation.length);

    nodes.push(
      <span key={i} style={{ whiteSpace: "nowrap" }}>
        {/* KaTeXが生成するHTMLのみを挿入する（入力は自前の問題データに限られる） */}
        <span dangerouslySetInnerHTML={{ __html: html }} />
        {punctuation}
      </span>,
    );
  }

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {nodes}
    </span>
  );
}
