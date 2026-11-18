/* ==========================================================================
   Diagrams drawn from data
   --------------------------------------------------------------------------
   Diagrams are described in the lesson or question data, e.g.
     { kind: "numberline", min: -10, max: 10, ticks: 20, points: [...] }
   and drawn here as SVG (Scalable Vector Graphics: crisp at any size).
   Each diagram also has a text description for screen-reader users.
   ========================================================================== */
import { fmt } from "../engine/numbers.js";
import styles from "./Diagram.module.css";

export default function Diagram({ spec }) {
  if (!spec) return null;
  if (spec.kind === "numberline") return <NumberLine {...spec} />;
  if (spec.kind === "placevalue") return <PlaceValueTable number={spec.number} />;
  if (spec.kind === "triangle") return <RightTriangle {...spec} />;
  if (spec.kind === "graph") return <Graph {...spec} />;
  if (spec.kind === "shapes") return <Shapes {...spec} />;
  if (spec.kind === "boxplot") return <BoxPlot {...spec} />;
  if (spec.kind === "venn") return <Venn {...spec} />;
  if (spec.kind === "circle") return <CircleDiagram {...spec} />;
  return null;
}

export function NumberLine({ min, max, ticks = 10, points = [], segment = null }) {
  const W = 640, H = 92, pad = 28;
  const x = (v) => pad + ((v - min) / (max - min)) * (W - pad * 2);
  const step = (max - min) / ticks;
  // Label every tick when there are few, otherwise label every 5th (and zero).
  const labelEvery = ticks <= 12 ? 1 : ticks <= 30 ? 5 : 10;
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => Number((min + i * step).toFixed(6)));
  const description = `Number line from ${fmt(min)} to ${fmt(max)}${points.length ? ", marking " + points.map((p) => p.label).join(" and ") : ""}.`;

  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={description}>
        <line x1={pad - 14} x2={W - pad + 14} y1={50} y2={50} className={styles.axis} markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" className={styles.arrowHead} /></marker>
          <marker id="arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10,0 L0,5 L10,10 z" className={styles.arrowHead} /></marker>
        </defs>
        {tickValues.map((v, i) => {
          const labelled = i % labelEvery === 0 || v === 0;
          return (
            <g key={v}>
              <line x1={x(v)} x2={x(v)} y1={labelled ? 42 : 45} y2={labelled ? 58 : 55} className={v === 0 ? styles.zero : styles.tick} />
              {labelled && <text x={x(v)} y={78} className={styles.tickLabel}>{fmt(v)}</text>}
            </g>
          );
        })}
        {segment && (
          <g>
            <line x1={segment.aInf ? pad - 10 : x(segment.a)} x2={segment.bInf ? W - pad + 10 : x(segment.b)} y1={34} y2={34} className={styles.segment} />
            {!segment.aInf && <circle cx={x(segment.a)} cy={34} r={7} className={segment.aOpen ? styles.openDot : styles.closedDot} />}
            {!segment.bInf && <circle cx={x(segment.b)} cy={34} r={7} className={segment.bOpen ? styles.openDot : styles.closedDot} />}
          </g>
        )}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={x(p.value)} cy={50} r={6} className={styles.point} />
            <text x={x(p.value)} y={28 - (i % 2) * 0} className={styles.pointLabel}>{p.label}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

const COLUMN_NAMES = {
  "-3": "Thousandths", "-2": "Hundredths", "-1": "Tenths",
  0: "Ones", 1: "Tens", 2: "Hundreds", 3: "Thousands", 4: "Ten thousands", 5: "Hundred thousands",
};

export function PlaceValueTable({ number }) {
  const clean = number.replace(/,/g, "");
  const [whole, frac = ""] = clean.split(".");
  const cells = [
    ...whole.split("").map((digit, i) => ({ digit, power: whole.length - 1 - i })),
    ...frac.split("").map((digit, i) => ({ digit, power: -(i + 1) })),
  ];
  return (
    <figure className={styles.figure}>
      <div className={styles.pvWrap}>
        <table className={styles.pv}>
          <caption className="sr-only">Place value table for {number}</caption>
          <thead>
            <tr>
              {cells.map((c, i) => (
                <th key={i} scope="col" className={c.power === 0 && frac ? styles.beforePoint : undefined}>{COLUMN_NAMES[c.power]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {cells.map((c, i) => (
                <td key={i} className={c.power === 0 && frac ? styles.beforePoint : undefined}>{c.digit}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {frac && <figcaption className={styles.caption}>The decimal point sits between the ones and tenths columns.</figcaption>}
    </figure>
  );
}

export function RightTriangle({ labels }) {
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 260 170" className={styles.svgSmall} role="img" aria-label={`Right-angled triangle with shorter sides ${labels[0]} and ${labels[1]}, and hypotenuse ${labels[2]}.`}>
        <polygon points="40,140 220,140 40,30" className={styles.shape} />
        <rect x="40" y="126" width="14" height="14" className={styles.rightAngle} />
        <text x="130" y="162" className={styles.sideLabel}>{labels[0]}</text>
        <text x="30" y="88" className={styles.sideLabel} textAnchor="end">{labels[1]}</text>
        <text x="142" y="76" className={styles.sideLabel}>{labels[2]}</text>
      </svg>
    </figure>
  );
}

/* ---------- Coordinate graph ----------
   { kind: "graph", x: [min, max], y: [min, max], xStep, yStep,
     curves: [{ points: [[x, y], …], label, dashed }],
     points: [{ x, y, label }], region: [[x, y], …] (shaded polygon),
     bars: [{ x0, x1, h }], xLabel, yLabel, description }            */
export function Graph({ x, y, xStep = 1, yStep = 1, curves = [], points = [], region, bars = [], xLabel = "x", yLabel = "y", description, labelEvery = 1 }) {
  const W = 400, H = 340, L = 44, R = 16, T = 16, B = 40;
  const sx = (v) => L + ((v - x[0]) / (x[1] - x[0])) * (W - L - R);
  const sy = (v) => H - B - ((v - y[0]) / (y[1] - y[0])) * (H - T - B);
  const ticks = (a, b, step) => { const out = []; for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(Number(v.toFixed(6))); return out; };
  const xs = ticks(x[0], x[1], xStep), ys = ticks(y[0], y[1], yStep);
  const axisX = y[0] <= 0 && y[1] >= 0 ? sy(0) : H - B;
  const axisY = x[0] <= 0 && x[1] >= 0 ? sx(0) : L;
  const id = `clip${Math.round(x[0] * 7 + y[1] * 13 + W)}`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? "Graph"}>
        <defs><clipPath id={id}><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath></defs>
        {xs.map((v) => <line key={"gx" + v} x1={sx(v)} x2={sx(v)} y1={T} y2={H - B} className={styles.grid} />)}
        {ys.map((v) => <line key={"gy" + v} y1={sy(v)} y2={sy(v)} x1={L} x2={W - R} className={styles.grid} />)}
        <line x1={L} x2={W - R} y1={axisX} y2={axisX} className={styles.axisLine} />
        <line y1={T} y2={H - B} x1={axisY} x2={axisY} className={styles.axisLine} />
        {xs.filter((v, i) => i % labelEvery === 0).map((v) => <text key={"lx" + v} x={sx(v)} y={Math.min(axisX + 16, H - B + 16)} className={styles.tickLabel}>{fmt(v)}</text>)}
        {ys.filter((v, i) => i % labelEvery === 0 && v !== 0).map((v) => <text key={"ly" + v} x={axisY - 6} y={sy(v) + 4} className={styles.tickLabelY}>{fmt(v)}</text>)}
        <text x={W - R} y={axisX - 6} className={styles.axisName} textAnchor="end">{xLabel}</text>
        <text x={axisY + 6} y={T + 12} className={styles.axisName}>{yLabel}</text>
        <g clipPath={`url(#${id})`}>
          {region && <polygon points={region.map(([a, b]) => `${sx(a)},${sy(b)}`).join(" ")} className={styles.region} />}
          {bars.map((b, i) => <rect key={i} x={sx(b.x0)} y={sy(b.h)} width={sx(b.x1) - sx(b.x0)} height={sy(y[0]) - sy(b.h)} className={styles.bar} />)}
          {curves.map((c, i) => <polyline key={i} points={c.points.map(([a, b]) => `${sx(a)},${sy(b)}`).join(" ")} className={c.dashed ? styles.curveDashed : (c.colour ?? i) % 2 ? styles.curve2 : styles.curve} />)}
        </g>
        {curves.filter((c) => c.label).map((c, i) => { const [a, b] = c.labelAt ?? c.points[c.points.length - 1]; return <text key={i} x={sx(a) - 4} y={sy(b) - 6} className={styles.curveLabel} textAnchor="end">{c.label}</text>; })}
        {points.map((p, i) => <g key={i}><circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} className={styles.dot} />{p.label && <text x={sx(p.x) + 7} y={sy(p.y) - 7} className={styles.curveLabel}>{p.label}</text>}</g>)}
      </svg>
    </figure>
  );
}

/* ---------- Shapes (not drawn accurately, as in GCSE papers) ----------
   { kind: "shapes", width, height, polys: [{ pts: [[x,y],…], dashed }],
     labels: [{ at: [x, y], text }], arcs: [{ cx, cy, r, from, to }] }    */
export function Shapes({ width = 320, height = 220, polys = [], labels = [], marks = [], description, note = true }) {
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.shapes} role="img" aria-label={description ?? "Diagram"}>
        {polys.map((p, i) => <polygon key={i} points={p.pts.map((q) => q.join(",")).join(" ")} className={p.open ? styles.openShape : styles.shape} strokeDasharray={p.dashed ? "6 5" : undefined} />)}
        {marks.map((m, i) => m.type === "right"
          ? <polyline key={i} points={m.pts.map((q) => q.join(",")).join(" ")} className={styles.rightAngle} />
          : <path key={i} d={m.d} className={styles.rightAngle} />)}
        {labels.map((l, i) => <text key={i} x={l.at[0]} y={l.at[1]} className={l.small ? styles.smallLabel : styles.sideLabel}>{l.text}</text>)}
      </svg>
      {note && <figcaption className={styles.caption}>Not drawn accurately</figcaption>}
    </figure>
  );
}

/* ---------- Box plot ---------- */
export function BoxPlot({ min, q1, med, q3, max, axis, step, unit = "", description }) {
  const W = 420, H = 130, L = 24, R = 24;
  const sx = (v) => L + ((v - axis[0]) / (axis[1] - axis[0])) * (W - L - R);
  const ticks = []; for (let v = axis[0]; v <= axis[1] + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? "Box plot"}>
        <line x1={sx(min)} x2={sx(q1)} y1={45} y2={45} className={styles.axisLine} />
        <line x1={sx(q3)} x2={sx(max)} y1={45} y2={45} className={styles.axisLine} />
        <rect x={sx(q1)} y={25} width={sx(q3) - sx(q1)} height={40} className={styles.box} />
        {[min, med, max].map((v, i) => <line key={i} x1={sx(v)} x2={sx(v)} y1={i === 1 ? 25 : 33} y2={i === 1 ? 65 : 57} className={styles.whisker} />)}
        <line x1={L} x2={W - R} y1={92} y2={92} className={styles.axisLine} />
        {ticks.map((v) => <g key={v}><line x1={sx(v)} x2={sx(v)} y1={92} y2={98} className={styles.axisLine} /><text x={sx(v)} y={114} className={styles.tickLabel}>{fmt(v)}</text></g>)}
        {unit && <text x={W - R} y={128} className={styles.axisName} textAnchor="end">{unit}</text>}
      </svg>
    </figure>
  );
}

/* ---------- Venn diagram with frequencies ---------- */
export function Venn({ a, both, b, out, labels = ["A", "B"], description }) {
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 360 220" className={styles.shapes} role="img" aria-label={description ?? `Venn diagram: ${labels[0]} only ${a}, both ${both}, ${labels[1]} only ${b}, neither ${out}`}>
        <rect x="6" y="6" width="348" height="208" rx="10" className={styles.vennBox} />
        <circle cx="140" cy="112" r="78" className={styles.vennA} />
        <circle cx="220" cy="112" r="78" className={styles.vennB} />
        <text x="82" y="44" className={styles.sideLabel}>{labels[0]}</text>
        <text x="278" y="44" className={styles.sideLabel}>{labels[1]}</text>
        <text x="110" y="118" className={styles.vennNum}>{a}</text>
        <text x="180" y="118" className={styles.vennNum}>{both}</text>
        <text x="250" y="118" className={styles.vennNum}>{b}</text>
        <text x="330" y="200" className={styles.vennNum}>{out}</text>
      </svg>
    </figure>
  );
}

/* ---------- Circle diagram (for circle theorems) ----------
   points:   { A: 200, B: 340 }   name → position round the circle, in degrees
             anticlockwise from the 3 o'clock position. "O" is the centre.
   external: { P: [0, 1.5] }      points outside the circle: [direction in degrees,
             distance from the centre as a multiple of the radius]
   lines:    [["A","B"], ["A","O","dashed"]]   segments between any named points
   tangent:  "A"       draws the whole tangent touching the circle at A
   angles:   [{ at:"B", between:["A","C"], text:"50°", dist: 30 }]   angle labels
   centre:   false hides the centre point O (shown by default)
   Labels sit clear of the lines. The diagram is marked "Not drawn accurately". */
export function CircleDiagram({ points = {}, external = {}, lines = [], tangent = null, angles = [], centre = true, description }) {
  const W = 340, H = 320, cx = 170, cy = 160, r = 82;
  const rad = (d) => (d * Math.PI) / 180;
  const pos = { O: [cx, cy] };
  for (const [name, deg] of Object.entries(points)) pos[name] = [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
  for (const [name, [deg, dist]] of Object.entries(external)) pos[name] = [cx + dist * r * Math.cos(rad(deg)), cy - dist * r * Math.sin(rad(deg))];
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1; return [dx / len, dy / len]; };
  const t = tangent ? pos[tangent] : null;
  const tDir = t ? [-(t[1] - cy) / r, (t[0] - cx) / r] : null;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.shapes} role="img" aria-label={description ?? "Circle diagram"}>
        <circle cx={cx} cy={cy} r={r} className={styles.openShape} />
        {t && <line x1={t[0] - tDir[0] * 80} y1={t[1] - tDir[1] * 80} x2={t[0] + tDir[0] * 80} y2={t[1] + tDir[1] * 80} className={styles.openShape} />}
        {lines.map(([a, b, style], i) => <line key={i} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} className={styles.openShape} strokeDasharray={style === "dashed" ? "6 5" : undefined} />)}
        {Object.entries(pos).filter(([name]) => name !== "O" || centre).map(([name, [x, y]]) => {
          // Every other point is labelled outwards from the centre. The centre itself is
          // labelled on the side AWAY from the lines that leave it, so "O" never sits on a radius.
          let out = unit([cx, cy], [x, y]);
          if (name === "O") {
            let sx = 0, sy = 0;
            for (const [a, b] of lines) {
              const other = a === "O" ? b : b === "O" ? a : null;
              if (other) { const v = unit([cx, cy], pos[other]); sx += v[0]; sy += v[1]; }
            }
            const sl = Math.hypot(sx, sy);
            out = sl < 0.2 ? [0.7, 0.7] : [-sx / sl, -sy / sl];
          }
          const dx = out[0] * (name === "O" ? 14 : 16), dy = out[1] * (name === "O" ? 14 : 16) + 5;
          return <g key={name}><circle cx={x} cy={y} r="3.5" className={styles.dot} /><text x={x + dx} y={y + dy} className={styles.sideLabel}>{name}</text></g>;
        })}
        {angles.map((a, i) => {
          const v = pos[a.at], u1 = unit(v, pos[a.between[0]]), u2 = unit(v, pos[a.between[1]]);
          let bx = u1[0] + u2[0], by = u1[1] + u2[1]; const bl = Math.hypot(bx, by);
          if (bl < 1e-6) { bx = -u1[1]; by = u1[0]; } else { bx /= bl; by /= bl; }
          const d = a.dist ?? 30;
          return <text key={i} x={v[0] + bx * d} y={v[1] + by * d + 5} className={styles.smallLabel}>{a.text}</text>;
        })}
      </svg>
      <figcaption className={styles.caption}>Not drawn accurately</figcaption>
    </figure>
  );
}
