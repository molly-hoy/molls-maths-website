/* ==========================================================================
   Helpers for writing generators quickly and consistently
   --------------------------------------------------------------------------
   Used by the Year 10 "light" lessons. Each lesson has two generators:
     core(...)    Level 1 "Core": the essential skill
     extend(...)  Level 2 "Extend": harder, multi-step or exam-style
   Question builders:
     num()    a number answer (optionally to a set number of decimal places)
     frac()   a fraction answer
     expr()   an algebraic answer
     multi()  several numeric parts (e.g. x = and y =)
     mc3()    multiple choice with 3 options: used for every question that
              needs a graph or diagram to answer
   ========================================================================== */
import { fmt } from "../numbers.js";

export const core = (skill, name, title, make, validate) => ({ id: `${skill}/${name}`, skill, level: 1, levelName: "Core", title, make, validate });
export const extend = (skill, name, title, make, validate) => ({ id: `${skill}/${name}`, skill, level: 2, levelName: "Extend", title, make, validate });

export const T = (value, feedback) => ({ value, feedback });

export function num(prompt, value, o = {}) {
  return {
    type: "numeric", prompt,
    answer: o.dp === undefined ? { value } : { value, dp: o.dp },
    answerText: o.answerText ?? `${o.pre ?? ""}${o.dp === undefined ? fmt(value) : fmt(value, o.dp)}${o.unit ? " " + o.unit : ""}`,
    traps: o.traps ?? [], hints: o.hints, solution: o.solution, diagram: o.diagram, data: o.data ?? {},
  };
}

export function frac(prompt, n, d, o = {}) {
  return {
    type: "fraction", prompt, answer: { n, d, simplest: o.simplest ?? true },
    answerText: o.answerText ?? (d === 1 ? String(n) : `{${n}/${d}}`),
    traps: o.traps ?? [], hints: o.hints, solution: o.solution, diagram: o.diagram, data: o.data ?? {},
  };
}

export function expr(prompt, e, o = {}) {
  return {
    type: "expression", prompt, answer: { expr: e, ...(o.flags ?? {}) },
    answerText: o.answerText ?? e, traps: o.traps ?? [], hints: o.hints, solution: o.solution, data: o.data ?? {},
  };
}

// steps: [[label, value, dp?], …]
export function multi(prompt, steps, o = {}) {
  return {
    type: "multistep", prompt,
    steps: steps.map(([label, value, dp, traps]) => ({ type: "numeric", prompt: label, answer: dp === undefined ? { value } : { value, dp }, traps: (traps ?? []).filter((t) => Math.abs(t.value - value) > 1e-9) })),
    answer: {},
    answerText: o.answerText ?? steps.map(([label, value, dp]) => `${label} ${dp === undefined ? fmt(value) : fmt(value, dp)}`).join(", "),
    hints: o.hints, solution: o.solution, diagram: o.diagram, data: o.data ?? {},
  };
}

// correct: "label"; wrong: [["label", "why it's wrong"], ["label", "why"]]
export function mc3(rng, prompt, correct, wrong, o = {}) {
  const options = rng.shuffle([{ label: correct, feedback: null }, ...wrong.map(([label, feedback]) => ({ label, feedback }))]);
  return {
    type: "choice", prompt, options,
    answer: { index: options.findIndex((x) => x.label === correct) },
    answerText: correct, hints: o.hints, solution: o.solution, diagram: o.diagram, data: o.data ?? {},
  };
}

// Sample a function as points for a graph.
export function plot(fn, a, b, n = 120) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const y = fn(x);
    if (Number.isFinite(y)) pts.push([x, y]);
  }
  return pts;
}

// A general triangle (not to scale) with optional side and angle labels.
// sides: { AB, BC, CA }, angles: { A, B, C }, right: "B" draws a right angle at B.
export function triangle({ sides = {}, angles = {}, right = null, names = ["A", "B", "C"], description }) {
  const P = right === "B" ? { A: [40, 180], B: [280, 180], C: [280, 40] } : { A: [36, 186], B: [292, 186], C: [118, 34] };
  const mid = (p, q, dx, dy) => [(P[p][0] + P[q][0]) / 2 + dx, (P[p][1] + P[q][1]) / 2 + dy];
  const labels = [];
  if (names) {
    labels.push({ at: [P.A[0] - 14, P.A[1] + 6], text: names[0] }, { at: [P.B[0] + 12, P.B[1] + 6], text: names[1] }, { at: [P.C[0] + (right === "B" ? 12 : -4), P.C[1] - 8], text: names[2] });
  }
  if (sides.AB) labels.push({ at: mid("A", "B", 0, 22), text: sides.AB });
  if (sides.BC) labels.push({ at: mid("B", "C", right === "B" ? 30 : 30, 0), text: sides.BC });
  if (sides.CA) labels.push({ at: mid("C", "A", right === "B" ? -18 : -34, right === "B" ? -12 : 0), text: sides.CA });
  if (angles.A) labels.push({ at: [P.A[0] + 44, P.A[1] - 8], text: angles.A, small: true });
  if (angles.B) labels.push({ at: [P.B[0] - 40, P.B[1] - 8], text: angles.B, small: true });
  if (angles.C) labels.push({ at: [P.C[0] + (right === "B" ? -14 : 4), P.C[1] + 36], text: angles.C, small: true });
  const marks = right === "B" ? [{ type: "right", pts: [[P.B[0] - 16, P.B[1]], [P.B[0] - 16, P.B[1] - 16], [P.B[0], P.B[1] - 16]] }] : [];
  return { kind: "shapes", width: 340, height: 220, polys: [{ pts: [P.A, P.B, P.C] }], labels, marks, description };
}

/* ---------- Writing polynomials nicely ----------
   polyText([1, -5, 6]) → "x² − 5x + 6"   (for display)
   polyExpr([1, -5, 6]) → "1*x^2+(-5)*x+(6)"   (for the answer checker) */
const SUP = { 2: "²", 3: "³" };
export function polyText(coeffs, v = "x") {
  const deg = coeffs.length - 1;
  const parts = [];
  coeffs.forEach((c, i) => {
    const p = deg - i;
    if (c === 0) return;
    const abs = Math.abs(c);
    const body = p === 0 ? fmt(abs) : `${abs === 1 ? "" : fmt(abs)}${v}${p > 1 ? SUP[p] : ""}`;
    parts.push(parts.length === 0 ? (c < 0 ? "−" : "") + body : `${c < 0 ? "−" : "+"} ${body}`);
  });
  return parts.length ? parts.join(" ") : "0";
}
export function polyExpr(coeffs, v = "x") {
  const deg = coeffs.length - 1;
  return coeffs.map((c, i) => `(${c})*${v}^${deg - i}`).join("+");
}
// A linear bracket for display: lin(3, -2) → "(3x − 2)"
export const lin = (p, a, v = "x") => `(${p === 1 ? "" : p === -1 ? "−" : p}${v} ${a < 0 ? "−" : "+"} ${Math.abs(a)})`;
export const linExpr = (p, a, v = "x") => `((${p})*${v}+(${a}))`;
// Multiply two polynomials given as coefficient lists.
export function polyMul(a, b) {
  const out = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y; }));
  return out;
}
// "+ 3" / "− 3" for writing terms after the first
export const sgn = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;

// Reuse a generator from another year for a skill taught again here.
export const reuse = (gen, skill, level, name) => ({ ...gen, id: `${skill}/${name}`, skill, level, levelName: level === 1 ? "Core" : "Extend" });
