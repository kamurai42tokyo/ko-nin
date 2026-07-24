import type { Figure } from "@/data";

/**
 * 図版の描画。kind ごとにSVGを組み立てる。
 * すべて currentColor で描くため、ライト／ダークどちらでも自動的に読める色になる。
 */
export function FigureView({ figure }: { figure: Figure }) {
  return (
    <div className="surface my-3 rounded-2xl px-3 py-3 text-slate-700 dark:text-slate-200">
      {figure.kind === "triangle" && <Triangle figure={figure} />}
      {figure.kind === "parabola" && <Parabola figure={figure} />}
      {figure.kind === "boxplot" && <BoxPlot figure={figure} />}
      {figure.kind === "custom" && (
        <Svg viewBox={figure.viewBox}>
          <g dangerouslySetInnerHTML={{ __html: figure.body }} />
        </Svg>
      )}
    </div>
  );
}

function Svg({
  viewBox,
  children,
  maxHeight = 260,
}: {
  viewBox: string;
  children: React.ReactNode;
  maxHeight?: number;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      className="mx-auto block h-auto w-full"
      style={{ maxHeight }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const LABEL = {
  fill: "currentColor",
  fontSize: 13,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
};

// ── 三角形 ─────────────────────────────────────────
// 2辺とその間の角から頂点座標を決めるので、データ側は測った値をそのまま書けばよい。

function Triangle({
  figure,
}: {
  figure: Extract<Figure, { kind: "triangle" }>;
}) {
  const { a, b, angleC, labels = {} } = figure;
  const rad = (angleC * Math.PI) / 180;

  // Cを原点、Bをx軸上に置き、Aを角Cの方向へ。SVGはy軸が下向きなので符号を反転する。
  const scale = 150 / Math.max(a, b);
  const C = { x: 0, y: 0 };
  const B = { x: a * scale, y: 0 };
  const A = { x: b * Math.cos(rad) * scale, y: -b * Math.sin(rad) * scale };

  const centroid = {
    x: (A.x + B.x + C.x) / 3,
    y: (A.y + B.y + C.y) / 3,
  };
  /** 重心と反対側へラベルを逃がす */
  const outward = (p: { x: number; y: number }, d = 16) => {
    const dx = p.x - centroid.x;
    const dy = p.y - centroid.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / len) * d, y: p.y + (dy / len) * d };
  };
  const mid = (p: { x: number; y: number }, q: { x: number; y: number }) => ({
    x: (p.x + q.x) / 2,
    y: (p.y + q.y) / 2,
  });

  const points = [A, B, C];
  const pad = 34;
  const minX = Math.min(...points.map((p) => p.x)) - pad;
  const maxX = Math.max(...points.map((p) => p.x)) + pad;
  const minY = Math.min(...points.map((p) => p.y)) - pad;
  const maxY = Math.max(...points.map((p) => p.y)) + pad;

  // 角Cの円弧
  const r = 26;
  const arcStart = { x: C.x + r, y: C.y };
  const arcEnd = { x: C.x + r * Math.cos(rad), y: C.y - r * Math.sin(rad) };
  const bisector = rad / 2;
  const angleLabelPos = {
    x: C.x + r * 1.7 * Math.cos(bisector),
    y: C.y - r * 1.7 * Math.sin(bisector),
  };

  const labelA = outward(mid(B, C), 18);
  const labelB = outward(mid(C, A), 18);
  const labelC = outward(mid(A, B), 18);

  return (
    <Svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} maxHeight={220}>
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        stroke="currentColor"
        strokeWidth={1.6}
        className="fill-current opacity-[0.06]"
      />
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 0 ${arcEnd.x} ${arcEnd.y}`}
        stroke="currentColor"
        strokeWidth={1.2}
        opacity={0.7}
      />

      {/* 頂点名 */}
      <text {...LABEL} fontWeight="bold" {...outward(A, 15)}>
        A
      </text>
      <text {...LABEL} fontWeight="bold" {...outward(B, 15)}>
        B
      </text>
      <text {...LABEL} fontWeight="bold" {...outward(C, 15)}>
        C
      </text>

      {/* 辺の長さ */}
      {labels.a && (
        <text {...LABEL} x={labelA.x} y={labelA.y}>
          {labels.a}
        </text>
      )}
      {labels.b && (
        <text {...LABEL} x={labelB.x} y={labelB.y}>
          {labels.b}
        </text>
      )}
      {labels.c && (
        <text {...LABEL} x={labelC.x} y={labelC.y}>
          {labels.c}
        </text>
      )}
      {labels.angleC && (
        <text {...LABEL} x={angleLabelPos.x} y={angleLabelPos.y} fontSize={12}>
          {labels.angleC}
        </text>
      )}
    </Svg>
  );
}

// ── 放物線 ─────────────────────────────────────────

function Parabola({
  figure,
}: {
  figure: Extract<Figure, { kind: "parabola" }>;
}) {
  const { a, b, c, markVertex, caption } = figure;
  const f = (x: number) => a * x * x + b * x + c;

  const vx = -b / (2 * a);
  const vy = f(vx);

  // 頂点を中心に左右3の範囲を描く。原点は必ず視野に入れる。
  const xMin = Math.min(vx - 3, 0);
  const xMax = Math.max(vx + 3, 0);
  const samples = Array.from({ length: 81 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / 80;
    return { x, y: f(x) };
  });
  const yMin = Math.min(0, ...samples.map((p) => p.y));
  const yMax = Math.max(0, ...samples.map((p) => p.y));

  const W = 260;
  const H = 190;
  const pad = 26;
  const sx = (x: number) =>
    pad + ((x - xMin) / (xMax - xMin || 1)) * (W - pad * 2);
  const sy = (y: number) =>
    H - pad - ((y - yMin) / (yMax - yMin || 1)) * (H - pad * 2);

  const d = samples
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`)
    .join(" ");

  // 本文の数式と字面をそろえるため、負号はハイフンではなくマイナス記号を使う
  const fmt = (n: number) =>
    Object.is(n, -0) ? "0" : `${Math.round(n * 100) / 100}`.replace("-", "−");

  return (
    <Svg viewBox={`0 0 ${W} ${H}`} maxHeight={230}>
      {/* 座標軸 */}
      <line
        x1={pad - 8}
        y1={sy(0)}
        x2={W - pad + 8}
        y2={sy(0)}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.45}
      />
      <line
        x1={sx(0)}
        y1={pad - 8}
        x2={sx(0)}
        y2={H - pad + 8}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.45}
      />
      <text {...LABEL} x={W - pad + 12} y={sy(0) - 9} fontSize={11} opacity={0.6}>
        x
      </text>
      <text {...LABEL} x={sx(0) + 10} y={pad - 12} fontSize={11} opacity={0.6}>
        y
      </text>

      <path d={d} stroke="currentColor" strokeWidth={2} />

      {markVertex && (
        <>
          <circle cx={sx(vx)} cy={sy(vy)} r={4} className="fill-current" />
          <text
            {...LABEL}
            x={sx(vx)}
            y={sy(vy) + (a > 0 ? 18 : -18)}
            fontSize={12}
            fontWeight="bold"
          >
            ({fmt(vx)}, {fmt(vy)})
          </text>
        </>
      )}

      {caption && (
        <text {...LABEL} x={W / 2} y={12} fontSize={12} opacity={0.75}>
          {caption}
        </text>
      )}
    </Svg>
  );
}

// ── 箱ひげ図 ───────────────────────────────────────

function BoxPlot({ figure }: { figure: Extract<Figure, { kind: "boxplot" }> }) {
  const { min, q1, median, q3, max, caption } = figure;

  const W = 280;
  const H = 130;
  const pad = 30;
  const span = max - min || 1;
  const sx = (v: number) => pad + ((v - min) / span) * (W - pad * 2);
  const top = 34;
  const bottom = 78;
  const midY = (top + bottom) / 2;

  const ticks: { value: number; label: string }[] = [
    { value: min, label: "最小値" },
    { value: q1, label: "Q₁" },
    { value: median, label: "中央値" },
    { value: q3, label: "Q₃" },
    { value: max, label: "最大値" },
  ];

  return (
    <Svg viewBox={`0 0 ${W} ${H}`} maxHeight={170}>
      {/* ひげ */}
      <line
        x1={sx(min)}
        y1={midY}
        x2={sx(q1)}
        y2={midY}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <line
        x1={sx(q3)}
        y1={midY}
        x2={sx(max)}
        y2={midY}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <line
        x1={sx(min)}
        y1={top + 6}
        x2={sx(min)}
        y2={bottom - 6}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <line
        x1={sx(max)}
        y1={top + 6}
        x2={sx(max)}
        y2={bottom - 6}
        stroke="currentColor"
        strokeWidth={1.4}
      />

      {/* 箱 */}
      <rect
        x={sx(q1)}
        y={top}
        width={sx(q3) - sx(q1)}
        height={bottom - top}
        stroke="currentColor"
        strokeWidth={1.6}
        rx={2}
        className="fill-current opacity-[0.07]"
      />
      <rect
        x={sx(q1)}
        y={top}
        width={sx(q3) - sx(q1)}
        height={bottom - top}
        stroke="currentColor"
        strokeWidth={1.6}
        rx={2}
      />
      <line
        x1={sx(median)}
        y1={top}
        x2={sx(median)}
        y2={bottom}
        stroke="currentColor"
        strokeWidth={2.2}
      />

      {/* 目盛りと値 */}
      {ticks.map((t, i) => (
        <g key={i}>
          <text {...LABEL} x={sx(t.value)} y={bottom + 16} fontSize={12} fontWeight="bold">
            {t.value}
          </text>
          <text {...LABEL} x={sx(t.value)} y={top - 12} fontSize={10} opacity={0.65}>
            {t.label}
          </text>
        </g>
      ))}

      {caption && (
        <text {...LABEL} x={W / 2} y={H - 8} fontSize={11} opacity={0.7}>
          {caption}
        </text>
      )}
    </Svg>
  );
}
