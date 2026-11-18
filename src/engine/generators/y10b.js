/* ==========================================================================
   Year 10 generators, Units 5–8
   (Simultaneous equations · Straight lines and inequalities ·
    Proportion and ratio · Congruence and similarity)
   ========================================================================== */
import { clean, fmt, gcd, lcm, round } from "../numbers.js";
import { core, extend, mc3, multi, num, plot, sgn, T } from "./helpers.js";

const S = (u, l) => `y10-u${u}-l${l}`;
const nz = (rng, a, b) => rng.nonZero(a, b);
// "3x + 2y" style, for writing equations
const lhs = (a, b, x = "x", y = "y") => `${a === 1 ? "" : a === -1 ? "−" : fmt(a)}${x} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : fmt(Math.abs(b))}${y}`;
const lineEq = (m, c) => `y = ${m === 1 ? "" : m === -1 ? "−" : fmt(m)}x${c === 0 ? "" : " " + sgn(c)}`;
const solves = (eqs, x, y) => eqs.every(([a, b, c]) => Math.abs(a * x + b * y - c) < 1e-9);

/* =============================== UNIT 5: Simultaneous equations =============================== */
const U5 = {
  [S(5, 1)]: [
    core(S(5, 1), "eliminate-add", "Elimination (add)", (rng) => {
      const x = rng.int(-4, 9), y = rng.int(-4, 9), a = rng.int(1, 5), d = rng.int(1, 5), b = rng.int(1, 5);
      const e1 = [a, b, a * x + b * y], e2 = [d, -b, d * x - b * y];
      return multi(`Solve the simultaneous equations:\n${lhs(a, b)} = ${fmt(e1[2])}\n${lhs(d, -b)} = ${fmt(e2[2])}`, [["x =", x], ["y =", y]], {
        hints: [`The y terms are +${b === 1 ? "" : b}y and −${b === 1 ? "" : b}y. Adding the equations eliminates y.`, `Adding: ${a + d}x = ${fmt(e1[2] + e2[2])}.`],
        solution: [`Add: ${a + d}x = ${fmt(e1[2] + e2[2])}, so x = ${fmt(x)}`, `Substitute into the first equation: ${a}(${fmt(x)}) + ${b}y = ${fmt(e1[2])}, so y = ${fmt(y)}`, `Check in the second equation ✓`], data: { eqs: [e1, e2] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
    extend(S(5, 1), "eliminate-scale", "Elimination (multiplying first)", (rng) => {
      const x = rng.int(-5, 8), y = rng.int(-5, 8);
      const a = rng.int(2, 5), b = nz(rng, -5, 5), c = rng.int(2, 5), d = nz(rng, -5, 5);
      if (a * d - b * c === 0 || a === c || Math.abs(b) === Math.abs(d)) return null;
      const e1 = [a, b, a * x + b * y], e2 = [c, d, c * x + d * y];
      return multi(`Solve the simultaneous equations:\n${lhs(a, b)} = ${fmt(e1[2])}\n${lhs(c, d)} = ${fmt(e2[2])}`, [["x =", x], ["y =", y]], {
        hints: ["Multiply one or both equations so that the x (or y) coefficients match.", `For example, multiply the first by ${c} and the second by ${a} so both have ${a * c}x, then subtract.`],
        solution: [`× ${c}: ${lhs(a * c, b * c)} = ${fmt(e1[2] * c)}`, `× ${a}: ${lhs(a * c, d * a)} = ${fmt(e2[2] * a)}`, `Subtract: ${fmt(b * c - d * a)}y = ${fmt(e1[2] * c - e2[2] * a)}, so y = ${fmt(y)}`, `Substitute: x = ${fmt(x)}`], data: { eqs: [e1, e2] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
  ],
  [S(5, 2)]: [
    core(S(5, 2), "substitute", "Substitution", (rng) => {
      const x = rng.int(-5, 8), m = nz(rng, -4, 4), c = rng.int(-6, 6), y = m * x + c;
      const a = rng.int(1, 5), b = nz(rng, -4, 4);
      if (a + b * m === 0) return null;
      return multi(`Solve the simultaneous equations:\n${lineEq(m, c)}\n${lhs(a, b)} = ${fmt(a * x + b * y)}`, [["x =", x], ["y =", y]], {
        hints: [`Replace y in the second equation with (${lineEq(m, c).slice(4)}).`, `${a}x ${sgn(b)}(${lineEq(m, c).slice(4)}) = ${fmt(a * x + b * y)}. Expand and solve for x.`],
        solution: [`${a}x ${sgn(b)}(${lineEq(m, c).slice(4)}) = ${fmt(a * x + b * y)}`, `${fmt(a + b * m)}x ${sgn(b * c)} = ${fmt(a * x + b * y)}, so x = ${fmt(x)}`, `y = ${fmt(m)} × ${fmt(x)} ${sgn(c)} = ${fmt(y)}`], data: { eqs: [[-m, 1, c], [a, b, a * x + b * y]] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
    extend(S(5, 2), "substitute-rearrange", "Rearrange, then substitute", (rng) => {
      const x = rng.int(-4, 8), y = rng.int(-4, 8), k = nz(rng, -4, 4), a = rng.int(2, 5), b = nz(rng, -5, 5);
      if (b - a * k === 0) return null;
      const e1 = [1, k, x + k * y], e2 = [a, b, a * x + b * y];
      return multi(`Solve the simultaneous equations:\n${lhs(1, k)} = ${fmt(e1[2])}\n${lhs(a, b)} = ${fmt(e2[2])}`, [["x =", x], ["y =", y]], {
        hints: [`Rearrange the first equation: x = ${fmt(e1[2])} ${sgn(-k)}y.`, "Substitute this into the second equation and solve for y."],
        solution: [`x = ${fmt(e1[2])} ${sgn(-k)}y`, `${a}(${fmt(e1[2])} ${sgn(-k)}y) ${sgn(b)}y = ${fmt(e2[2])}`, `${fmt(b - a * k)}y = ${fmt(e2[2] - a * e1[2])}, so y = ${fmt(y)}`, `x = ${fmt(x)}`], data: { eqs: [e1, e2] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
  ],
  [S(5, 3)]: [
    core(S(5, 3), "intersection-graph", "Solving graphically", (rng) => {
      const x0 = rng.int(-3, 3), y0 = rng.int(-3, 4);
      const m1 = nz(rng, -2, 3); let m2 = nz(rng, -3, 2);
      if (m2 === m1) m2 = -m1 || 1;
      const c1 = y0 - m1 * x0, c2 = y0 - m2 * x0;
      if (x0 === y0 || c1 === y0 || Math.abs(c1) > 9 || Math.abs(c2) > 9) return null;
      return mc3(rng, `The graph shows the lines ${lineEq(m1, c1)} and ${lineEq(m2, c2)}. Use it to solve the simultaneous equations.`, `x = ${fmt(x0)}, y = ${fmt(y0)}`, [
        [`x = ${fmt(y0)}, y = ${fmt(x0)}`, "The x-coordinate is read across (horizontal axis) first, then the y-coordinate."],
        [`x = 0, y = ${fmt(c1)}`, "That's where one line crosses the y-axis. The solution is where the two lines cross each other."],
      ], {
        diagram: { kind: "graph", x: [-6, 6], y: [-6, 6], xStep: 1, yStep: 1, curves: [{ points: [[-6, m1 * -6 + c1], [6, m1 * 6 + c1]] }, { points: [[-6, m2 * -6 + c2], [6, m2 * 6 + c2]] }], description: `Two straight lines crossing at (${x0}, ${y0}).` },
        hints: ["The solution is the point where the two lines cross.", "Read the x-coordinate first, then the y-coordinate."],
        solution: [`The lines cross at (${fmt(x0)}, ${fmt(y0)}).`, `So x = ${fmt(x0)}, y = ${fmt(y0)}.`], data: { x0, y0 },
      });
    }, () => true),
    extend(S(5, 3), "intersection-algebra", "Where do two lines meet?", (rng) => {
      const x0 = rng.int(-5, 6), y0 = rng.int(-6, 8), m1 = nz(rng, -4, 4);
      let m2 = nz(rng, -4, 4);
      if (m2 === m1) m2 = m1 + 1 || 2;
      const c1 = y0 - m1 * x0, c2 = y0 - m2 * x0;
      return multi(`Find the point where ${lineEq(m1, c1)} and ${lineEq(m2, c2)} intersect.`, [["x =", x0], ["y =", y0]], {
        answerText: `(${fmt(x0)}, ${fmt(y0)})`,
        hints: ["At the crossing point both y-values are equal, so set the right-hand sides equal.", `${lineEq(m1, c1).slice(4)} = ${lineEq(m2, c2).slice(4)}.`],
        solution: [`${lineEq(m1, c1).slice(4)} = ${lineEq(m2, c2).slice(4)}`, `${fmt(m1 - m2)}x = ${fmt(c2 - c1)}, so x = ${fmt(x0)}`, `y = ${fmt(y0)}`], data: { eqs: [[-m1, 1, c1], [-m2, 1, c2]] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
  ],
  [S(5, 4)]: [
    core(S(5, 4), "tickets", "Forming equations from a context", (rng) => {
      const A = rng.int(6, 15), C = rng.int(3, A - 1), p = rng.int(2, 4), q = rng.int(1, 3), r = rng.int(1, 2), s = rng.int(2, 5);
      if (p * s - q * r === 0) return null;
      return num(`${p} adult tickets and ${q} child tickets cost £${p * A + q * C}. ${r} adult ticket${r > 1 ? "s" : ""} and ${s} child tickets cost £${r * A + s * C}. How much is one adult ticket?`, A, {
        pre: "£", traps: [T(C, "That's the price of a child ticket.")],
        hints: ["Let a = the price of an adult ticket and c = a child ticket.", `${p}a + ${q}c = ${p * A + q * C} and ${r}a + ${s}c = ${r * A + s * C}. Solve simultaneously.`],
        solution: [`${p}a + ${q}c = ${p * A + q * C}`, `${r}a + ${s}c = ${r * A + s * C}`, `Solving: a = ${A}, c = ${C}`, `An adult ticket costs £${A}.`], data: { A, C, p, q, r, s },
      });
    }, (q) => { const { A, C, p, q: qq, r, s } = q.data; return p * A + qq * C > 0 && r * A + s * C > 0 && A === q.answer.value; }),
    extend(S(5, 4), "pens-pencils", "Two unknown prices", (rng) => {
      const pen = rng.int(40, 120), pencil = rng.int(15, 60), a = rng.int(2, 5), b = rng.int(1, 4), c = rng.int(1, 3), d = rng.int(2, 6);
      if (a * d - b * c === 0 || pen === pencil) return null;
      return multi(`${a} pens and ${b} pencil${b > 1 ? "s" : ""} cost ${a * pen + b * pencil}p. ${c} pen${c > 1 ? "s" : ""} and ${d} pencils cost ${c * pen + d * pencil}p. Find the cost of each, in pence.`, [["One pen (p):", pen], ["One pencil (p):", pencil]], {
        hints: ["Let x = pen price, y = pencil price. Write two equations.", `${a}x + ${b}y = ${a * pen + b * pencil} and ${c}x + ${d}y = ${c * pen + d * pencil}.`],
        solution: [`${a}x + ${b}y = ${a * pen + b * pencil}`, `${c}x + ${d}y = ${c * pen + d * pencil}`, `Eliminate one letter and solve: x = ${pen}, y = ${pencil}`], data: { eqs: [[a, b, a * pen + b * pencil], [c, d, c * pen + d * pencil]] },
      });
    }, (q) => solves(q.data.eqs, ...q.steps.map((s) => s.answer.value))),
  ],
  [S(5, 5)]: [
    core(S(5, 5), "line-parabola-x", "A line and a curve", (rng) => {
      const r1 = rng.int(-4, 5); let r2 = rng.int(-4, 5);
      if (r2 === r1) return null;
      const k = rng.int(-5, 5), m = r1 + r2, n = k - r1 * r2;
      if (m === 0) return null;
      const [hi, lo] = [Math.max(r1, r2), Math.min(r1, r2)];
      return multi(`Solve the simultaneous equations y = x²${k === 0 ? "" : " " + sgn(k)} and ${lineEq(m, n)}. Give both x-values.`, [["Larger x =", hi], ["Smaller x =", lo]], {
        hints: ["Set the two expressions for y equal to each other.", `x²${k === 0 ? "" : " " + sgn(k)} = ${lineEq(m, n).slice(4)}, so x² ${sgn(-m)}x ${sgn(r1 * r2)} = 0. Factorise.`],
        solution: [`x² ${sgn(-m)}x ${sgn(r1 * r2)} = 0`, `(x ${sgn(-r1)})(x ${sgn(-r2)}) = 0`, `x = ${fmt(hi)} or x = ${fmt(lo)}`], data: { k, m, n },
      });
    }, (q) => q.steps.every((s) => { const x = s.answer.value; return Math.abs(x * x + q.data.k - (q.data.m * x + q.data.n)) < 1e-9; })),
    extend(S(5, 5), "line-parabola-point", "Finding a point of intersection", (rng) => {
      const r1 = rng.int(1, 5), r2 = rng.int(-5, -1), k = rng.int(-4, 4), m = r1 + r2, n = k - r1 * r2;
      if (m === 0) return null;
      return multi(`The line ${lineEq(m, n)} meets the curve y = x²${k === 0 ? "" : " " + sgn(k)} at two points. Find the coordinates of the point with a positive x-coordinate.`, [["x =", r1], ["y =", r1 * r1 + k]], {
        answerText: `(${r1}, ${fmt(r1 * r1 + k)})`,
        hints: ["Set the expressions equal and solve the quadratic.", "Choose the positive x, then substitute to find y."],
        solution: [`x² ${sgn(-m)}x ${sgn(r1 * r2)} = 0`, `x = ${r1} or x = ${r2}`, `When x = ${r1}: y = ${r1 * r1} ${sgn(k)} = ${fmt(r1 * r1 + k)}`], data: { k, m, n },
      });
    }, (q) => { const [x, y] = q.steps.map((s) => s.answer.value); return Math.abs(x * x + q.data.k - y) < 1e-9 && Math.abs(q.data.m * x + q.data.n - y) < 1e-9; }),
  ],
};

/* =============================== UNIT 6: Straight lines and inequalities =============================== */
const U6 = {
  [S(6, 1)]: [
    core(S(6, 1), "gradient-two-points", "Gradient from two points", (rng) => {
      const m = nz(rng, -4, 4), x1 = rng.int(-5, 3), x2 = x1 + rng.int(1, 5), c = rng.int(-5, 5);
      const y1 = m * x1 + c, y2 = m * x2 + c;
      return num(`Find the gradient of the line through (${fmt(x1)}, ${fmt(y1)}) and (${fmt(x2)}, ${fmt(y2)}).`, m, {
        traps: [T(clean((x2 - x1) / (y2 - y1)), "Gradient = change in y ÷ change in x (not the other way round).")],
        hints: ["Gradient = (change in y) ÷ (change in x).", `Change in y = ${fmt(y2)} − ${fmt(y1)} = ${fmt(y2 - y1)}.`],
        solution: [`Change in y = ${fmt(y2 - y1)}, change in x = ${fmt(x2 - x1)}`, `Gradient = ${fmt(y2 - y1)} ÷ ${fmt(x2 - x1)} = ${fmt(m)}`], data: { x1, y1, x2, y2 },
      });
    }, (q) => Math.abs((q.data.y2 - q.data.y1) / (q.data.x2 - q.data.x1) - q.answer.value) < 1e-9),
    extend(S(6, 1), "equation-two-points", "Equation of a line through two points", (rng) => {
      const m = nz(rng, -4, 4), x1 = rng.int(-4, 3), x2 = x1 + rng.int(1, 4), c = rng.int(-7, 7);
      const y1 = m * x1 + c, y2 = m * x2 + c;
      return multi(`Find the equation of the line through (${fmt(x1)}, ${fmt(y1)}) and (${fmt(x2)}, ${fmt(y2)}) in the form y = mx + c.`, [["m =", m], ["c =", c]], {
        answerText: lineEq(m, c),
        hints: [`Gradient m = ${fmt(y2 - y1)} ÷ ${fmt(x2 - x1)}.`, `Substitute one point into y = ${fmt(m)}x + c to find c.`],
        solution: [`m = ${fmt(y2 - y1)} ÷ ${fmt(x2 - x1)} = ${fmt(m)}`, `${fmt(y1)} = ${fmt(m)} × ${fmt(x1)} + c, so c = ${fmt(c)}`, lineEq(m, c)], data: { x1, y1, x2, y2 },
      });
    }, (q) => { const [m, c] = q.steps.map((s) => s.answer.value); return m * q.data.x1 + c === q.data.y1 && m * q.data.x2 + c === q.data.y2; }),
  ],
  [S(6, 2)]: [
    core(S(6, 2), "midpoint", "Midpoint", (rng) => {
      const x1 = rng.int(-8, 8), y1 = rng.int(-8, 8), x2 = rng.int(-8, 8), y2 = rng.int(-8, 8);
      if (x1 === x2 && y1 === y2) return null;
      return multi(`Find the midpoint of the line segment from (${fmt(x1)}, ${fmt(y1)}) to (${fmt(x2)}, ${fmt(y2)}).`, [["x =", (x1 + x2) / 2], ["y =", (y1 + y2) / 2]], {
        answerText: `(${fmt((x1 + x2) / 2)}, ${fmt((y1 + y2) / 2)})`,
        hints: ["The midpoint is the mean of the x-coordinates and the mean of the y-coordinates.", `x: (${fmt(x1)} + ${fmt(x2)}) ÷ 2.`],
        solution: [`x = (${fmt(x1)} + ${fmt(x2)}) ÷ 2 = ${fmt((x1 + x2) / 2)}`, `y = (${fmt(y1)} + ${fmt(y2)}) ÷ 2 = ${fmt((y1 + y2) / 2)}`], data: {},
      });
    }, () => true),
    extend(S(6, 2), "segment-length", "Length of a line segment", (rng) => {
      const x1 = rng.int(-6, 6), y1 = rng.int(-6, 6), dx = nz(rng, -7, 7), dy = nz(rng, -7, 7);
      const L2 = dx * dx + dy * dy;
      if (Number.isInteger(Math.sqrt(L2))) return null;
      const value = round(Math.sqrt(L2), 1);
      return num(`Find the length of the line segment from (${fmt(x1)}, ${fmt(y1)}) to (${fmt(x1 + dx)}, ${fmt(y1 + dy)}). Give your answer to 1 decimal place.`, value, {
        dp: 1, traps: [T(Math.abs(dx) + Math.abs(dy), "The distance isn't the two changes added: use Pythagoras.")],
        hints: [`Horizontal change = ${Math.abs(dx)}, vertical change = ${Math.abs(dy)}.`, `Length = √(${Math.abs(dx)}² + ${Math.abs(dy)}²) = √${L2}.`],
        solution: [`√(${dx * dx} + ${dy * dy}) = √${L2} = ${fmt(round(Math.sqrt(L2), 4))}…`, `= ${fmt(value, 1)}`], data: { L2 },
      });
    }, (q) => Math.abs(Math.round(Math.sqrt(q.data.L2) * 10) / 10 - q.answer.value) < 1e-9),
  ],
  [S(6, 3)]: [
    core(S(6, 3), "perpendicular-gradient", "Perpendicular gradient", (rng) => {
      const m = nz(rng, -6, 6), c = rng.int(-6, 6);
      const value = clean(-1 / m);
      return num(`What is the gradient of a line perpendicular to ${lineEq(m, c)}? (A fraction is fine.)`, value, {
        answerText: Math.abs(m) === 1 ? fmt(-m) : `${m > 0 ? "−" : ""}1/${Math.abs(m)}`,
        traps: [T(clean(1 / m), "Perpendicular gradients are negative reciprocals: change the sign as well."), T(-m, "Change the sign AND flip the fraction (take the reciprocal).")],
        hints: ["Perpendicular gradients multiply to −1.", `So the new gradient is −1 ÷ ${fmt(m)}.`],
        solution: [`m₁ × m₂ = −1`, `m₂ = −1 ÷ ${fmt(m)} = ${Math.abs(m) === 1 ? fmt(-m) : `${m > 0 ? "−" : ""}1/${Math.abs(m)}`}`], data: { m },
      });
    }, (q) => Math.abs(q.answer.value * q.data.m + 1) < 1e-9),
    extend(S(6, 3), "perpendicular-line", "Equation of a perpendicular line", (rng) => {
      const k = nz(rng, -4, 4), c0 = rng.int(-5, 5);
      // The given line has gradient k; the perpendicular has gradient −1/k.
      const x0 = k * rng.int(-2, 2), y0 = rng.int(-6, 6);
      const m = -1 / k, c = y0 - m * x0;
      return multi(`Find the equation of the line perpendicular to ${lineEq(k, c0)} that passes through (${fmt(x0)}, ${fmt(y0)}). Give it as y = mx + c (fractions are fine).`, [["m =", clean(m)], ["c =", clean(c)]], {
        answerText: `y = ${Math.abs(k) === 1 ? (m < 0 ? "−" : "") : `${m < 0 ? "−" : ""}(1/${Math.abs(k)})`}x ${sgn(clean(c))}`,
        hints: [`The perpendicular gradient is −1 ÷ ${fmt(k)}.`, `Substitute (${fmt(x0)}, ${fmt(y0)}) into y = mx + c to find c.`],
        solution: [`m = −1/${fmt(k)}`, `${fmt(y0)} = m × ${fmt(x0)} + c, so c = ${fmt(clean(c))}`], data: { x0, y0, k },
      });
    }, (q) => { const [m, c] = q.steps.map((s) => s.answer.value); return Math.abs(m * q.data.k + 1) < 1e-9 && Math.abs(m * q.data.x0 + c - q.data.y0) < 1e-9 && Number.isInteger(c); }),
  ],
  [S(6, 4)]: [
    core(S(6, 4), "solve-inequality", "Solving a linear inequality", (rng) => {
      const a = rng.int(2, 6), x = rng.int(-5, 8), b = nz(rng, -9, 9), sym = rng.pick(["<", ">", "≤", "≥"]);
      const c = a * x + b;
      const flip = { "<": ">", ">": "<", "≤": "≥", "≥": "≤" }[sym];
      return mc3(rng, `Solve ${a}x ${sgn(b)} ${sym} ${fmt(c)}.`, `x ${sym} ${fmt(x)}`, [
        [`x ${flip} ${fmt(x)}`, "Dividing by a positive number doesn't change the direction of the inequality sign."],
        [`x ${sym} ${fmt(clean((c + b) / a))}`, `Check the first step: to undo ${sgn(b)}, ${b > 0 ? "subtract" : "add"} ${Math.abs(b)} on both sides.`],
      ], {
        hints: [`${b > 0 ? "Subtract" : "Add"} ${Math.abs(b)} on both sides.`, `Then divide both sides by ${a}.`],
        solution: [`${a}x ${sym} ${fmt(c - b)}`, `x ${sym} ${fmt(x)}`], data: { a, b, c, x },
      });
    }, (q) => q.data.a * q.data.x + q.data.b === q.data.c),
    extend(S(6, 4), "count-integers", "Integer solutions", (rng) => {
      const lo = rng.int(-9, 3), q0 = nz(rng, -5, 5), hi = lo + rng.int(5, 14);
      let count = 0; const list = [];
      for (let x = -40; x <= 40; x++) if (lo < 2 * x + q0 && 2 * x + q0 <= hi) { count++; list.push(x); }
      if (count < 2) return null;
      return num(`How many integers x satisfy ${fmt(lo)} < 2x ${sgn(q0)} ≤ ${fmt(hi)}?`, count, {
        hints: [`${q0 > 0 ? "Subtract" : "Add"} ${Math.abs(q0)} from all three parts, then divide all three parts by 2.`, `${fmt(clean((lo - q0) / 2))} < x ≤ ${fmt(clean((hi - q0) / 2))}. Watch which end is included.`],
        solution: [`${fmt(lo - q0)} < 2x ≤ ${fmt(hi - q0)}`, `${fmt(clean((lo - q0) / 2))} < x ≤ ${fmt(clean((hi - q0) / 2))}`, `Integers: ${list.join(", ")}`, `That's ${count} integers.`], data: { lo, q0, hi },
      });
    }, (q) => { let n = 0; for (let x = -50; x <= 50; x++) if (q.data.lo < 2 * x + q.data.q0 && 2 * x + q.data.q0 <= q.data.hi) n++; return n === q.answer.value; }),
  ],
  [S(6, 5)]: [
    core(S(6, 5), "region-one-line", "Which inequality is shaded?", (rng) => {
      const m = rng.pick([-2, -1, 1, 2, 0.5]), c = rng.int(-2, 3), above = rng.chance(0.5);
      const f = (x) => m * x + c;
      const far = above ? 30 : -30;
      const eq = `${m === 1 ? "" : m === -1 ? "−" : m === 0.5 ? "½" : fmt(m)}x${c === 0 ? "" : " " + sgn(c)}`;
      return mc3(rng, "The shaded region (not including the dashed line) is described by one inequality. Which one?", `y ${above ? ">" : "<"} ${eq}`, [
        [`y ${above ? "<" : ">"} ${eq}`, "Check a point in the shaded region, such as one far above or below the line."],
        [`x ${above ? ">" : "<"} ${eq.replace("x", "y")}`, "The boundary line is y = " + eq + ", so the inequality is in terms of y."],
      ], {
        diagram: { kind: "graph", x: [-5, 5], y: [-5, 5], curves: [{ points: [[-5, f(-5)], [5, f(5)]], dashed: true, label: `y = ${eq}`, labelAt: [4.8, Math.max(-4.4, Math.min(4.4, f(4.8)))] }], region: [[-5, f(-5)], [5, f(5)], [5, far], [-5, far]], description: `Dashed line y = ${eq}, with the region ${above ? "above" : "below"} it shaded.` },
        hints: ["The boundary is the line y = " + eq + ".", "Pick a point in the shaded region and test it."],
        solution: [`The shaded region is ${above ? "above" : "below"} the line, and the line is dashed (not included).`, `So y ${above ? ">" : "<"} ${eq}.`], data: {},
      });
    }, () => true),
    extend(S(6, 5), "point-in-region", "Points in a region", (rng) => {
      const a = rng.int(-2, 1), b = rng.int(-2, 1), s = rng.int(a + b + 4, a + b + 7);
      // Region: x ≥ a, y ≥ b, x + y ≤ s (a triangle)
      const inside = [a + 1, b + 1];
      const outA = [a - 1, b + 2], outB = [s - b + 1, b];
      const fmtP = (p) => `(${fmt(p[0])}, ${fmt(p[1])})`;
      return mc3(rng, `The shaded region satisfies x ≥ ${fmt(a)}, y ≥ ${fmt(b)} and x + y ≤ ${s}. Which point lies in the region?`, fmtP(inside), [
        [fmtP(outA), `This point has x = ${fmt(outA[0])}, which is less than ${fmt(a)}.`],
        [fmtP(outB), `Here x + y = ${fmt(outB[0] + outB[1])}, which is more than ${s}.`],
      ], {
        diagram: { kind: "graph", x: [-4, 9], y: [-4, 9], labelEvery: 1, curves: [{ points: [[a, -4], [a, 9]] }, { points: [[-4, b], [9, b]] }, { points: [[-4, s + 4], [s + 4, -4]] }], region: [[a, b], [s - b, b], [a, s - a]], points: [{ x: inside[0], y: inside[1] }, { x: outA[0], y: outA[1] }, { x: outB[0], y: outB[1] }], description: `Triangle region bounded by x = ${a}, y = ${b} and x + y = ${s}, with three points marked.` },
        hints: ["Check each point against all three inequalities.", "A point is only in the region if it satisfies every inequality."],
        solution: [`${fmtP(inside)}: x ≥ ${fmt(a)} ✓, y ≥ ${fmt(b)} ✓, x + y = ${fmt(inside[0] + inside[1])} ≤ ${s} ✓`], data: { a, b, s, inside, outA, outB },
      });
    }, (q) => { const ok = ([x, y]) => x >= q.data.a && y >= q.data.b && x + y <= q.data.s; return ok(q.data.inside) && !ok(q.data.outA) && !ok(q.data.outB); }),
  ],
};

/* =============================== UNIT 7: Proportion and ratio =============================== */
function divisors(n) { const d = []; for (let i = 2; i < n; i++) if (n % i === 0) d.push(i); return d; }

const U7 = {
  [S(7, 1)]: [
    core(S(7, 1), "combine-ratios", "Combining ratios", (rng) => {
      const p = rng.int(1, 5), q = rng.int(2, 6), r = rng.int(2, 6), s = rng.int(1, 7);
      if (q === r) return null;
      const L = lcm(q, r), A = p * (L / q), C = s * (L / r), g = gcd(A, C);
      return multi(`A : B = ${p} : ${q} and B : C = ${r} : ${s}. Find A : C in its simplest form.`, [["A part:", A / g], ["C part:", C / g]], {
        answerText: `${A / g} : ${C / g}`,
        hints: [`Make the B parts the same: the LCM of ${q} and ${r} is ${L}.`, `A : B = ${A} : ${L} and B : C = ${L} : ${C}.`],
        solution: [`A : B = ${A} : ${L}`, `B : C = ${L} : ${C}`, `A : C = ${A} : ${C}${g > 1 ? ` = ${A / g} : ${C / g}` : ""}`], data: { p, q, r, s },
      });
    }, (q) => { const [a, c] = q.steps.map((x) => x.answer.value); return Math.abs(a / c - (q.data.p / q.data.q) * (q.data.r / q.data.s)) < 1e-9 && gcd(a, c) === 1; }),
    extend(S(7, 1), "three-part-share", "Sharing in a three-part ratio", (rng) => {
      const a = rng.int(1, 5), b = rng.int(1, 6), c = rng.int(1, 7), unit = rng.int(3, 25);
      const total = (a + b + c) * unit;
      return num(`£${fmt(total)} is shared between Ali, Beth and Cara in the ratio ${a} : ${b} : ${c}. How much does Cara get?`, c * unit, {
        pre: "£", traps: [T(total / 3, "The shares aren't equal: use the ratio."), T(unit, "That's one part. Cara gets " + c + " parts.")],
        hints: [`Total parts = ${a} + ${b} + ${c} = ${a + b + c}.`, `One part = £${fmt(total)} ÷ ${a + b + c}.`],
        solution: [`${a + b + c} parts`, `One part = £${unit}`, `Cara: ${c} × £${unit} = £${c * unit}`], data: { total, a, b, c },
      });
    }, (q) => q.answer.value === q.data.total * q.data.c / (q.data.a + q.data.b + q.data.c)),
  ],
  [S(7, 2)]: [
    core(S(7, 2), "difference-share", "Ratio and difference", (rng) => {
      const p = rng.int(1, 6), q = p + rng.int(1, 5), unit = rng.int(2, 20);
      const diff = (q - p) * unit;
      return num(`Amy and Ben share some money in the ratio ${p} : ${q}. Ben gets £${diff} more than Amy. How much does Amy get?`, p * unit, {
        pre: "£", traps: [T(q * unit, "That's Ben's share.")],
        hints: [`The difference is ${q} − ${p} = ${q - p} parts.`, `${q - p} parts = £${diff}, so 1 part = £${unit}.`],
        solution: [`${q - p} parts = £${diff}`, `1 part = £${unit}`, `Amy: ${p} × £${unit} = £${p * unit}`], data: { p, q, diff },
      });
    }, (q) => q.answer.value === q.data.p * q.data.diff / (q.data.q - q.data.p)),
    extend(S(7, 2), "changing-ratio", "A changing ratio", (rng) => {
      const p = rng.int(2, 5), q = p + rng.int(1, 3), m = rng.int(2, 6);
      const join = (q - p) * m;
      return num(`In a club, the ratio of boys to girls is ${p} : ${q}. ${join} more boys join, and now there are equal numbers of boys and girls. How many girls are there?`, q * m, {
        traps: [T(p * m, "That's the number of boys before the others joined.")],
        hints: [`Let the numbers be ${p}k boys and ${q}k girls.`, `${p}k + ${join} = ${q}k. Solve for k.`],
        solution: [`${p}k + ${join} = ${q}k`, `${q - p}k = ${join}, so k = ${m}`, `Girls = ${q} × ${m} = ${q * m}`], data: { p, q, join },
      });
    }, (q) => { const k = q.data.join / (q.data.q - q.data.p); return q.answer.value === q.data.q * k; }),
  ],
  [S(7, 3)]: [
    core(S(7, 3), "direct-unitary", "Direct proportion", (rng) => {
      const price = rng.int(15, 95), n = rng.int(3, 9), m = rng.int(2, 15);
      if (m === n) return null;
      return num(`${n} notebooks cost £${fmt(price * n / 100, 2)}. How much do ${m} notebooks cost?`, round(price * m / 100, 2), {
        dp: 2, pre: "£",
        hints: [`Find the cost of one notebook: £${fmt(price * n / 100, 2)} ÷ ${n}.`, `One costs £${fmt(price / 100, 2)}. Multiply by ${m}.`],
        solution: [`1 notebook = £${fmt(price / 100, 2)}`, `${m} notebooks = ${m} × £${fmt(price / 100, 2)} = £${fmt(price * m / 100, 2)}`], data: { price, m },
      });
    }, (q) => Math.abs(q.data.price * q.data.m / 100 - q.answer.value) < 1e-9),
    extend(S(7, 3), "recipe", "Scaling a recipe", (rng) => {
      const s = rng.pick([4, 6, 8]), t = rng.pick([3, 5, 10, 12, 2]), per = rng.int(15, 60);
      if (s === t) return null;
      const g = per * s, value = clean(per * t);
      return num(`A recipe for ${s} people uses ${g} g of flour. How much flour is needed for ${t} people?`, value, {
        unit: "g", traps: [T(g + (t - s), "Proportion means multiplying, not adding the difference.")],
        hints: [`Flour for 1 person = ${g} ÷ ${s}.`, `= ${per} g. Multiply by ${t}.`],
        solution: [`${g} ÷ ${s} = ${per} g per person`, `${per} × ${t} = ${fmt(value)} g`], data: { per, t },
      });
    }, (q) => q.answer.value === q.data.per * q.data.t),
  ],
  [S(7, 4)]: [
    core(S(7, 4), "workers", "Inverse proportion", (rng) => {
      const w2 = rng.int(2, 10), d2 = rng.int(2, 12), k = w2 * d2;
      const opts = divisors(k).filter((w) => w !== w2 && w <= 15);
      if (!opts.length) return null;
      const w1 = rng.pick(opts), d1 = k / w1;
      return num(`${w1} builders take ${d1} days to build a wall. How long would ${w2} builders take, working at the same rate?`, d2, {
        unit: "days", traps: [T(clean((d1 * w2) / w1), "More builders should take LESS time: this is inverse proportion.")],
        hints: [`Total work = ${w1} × ${d1} = ${k} builder-days.`, `Divide by ${w2}.`],
        solution: [`${w1} × ${d1} = ${k} builder-days`, `${k} ÷ ${w2} = ${d2} days`], data: { w1, d1, w2 },
      });
    }, (q) => q.data.w1 * q.data.d1 === q.data.w2 * q.answer.value),
    extend(S(7, 4), "speed-time", "Speed and time", (rng) => {
      const t2 = rng.pick([1.5, 2, 2.5, 3, 4]), v2 = rng.pick([40, 48, 60, 72, 80]), k = t2 * v2;
      const v1 = rng.pick([30, 40, 45, 50, 60, 90, 120].filter((v) => v !== v2 && Number.isInteger((k / v) * 4)));
      if (!v1) return null;
      return num(`A journey takes ${fmt(k / v1)} hours at an average speed of ${v1} km/h. How long would it take at ${v2} km/h? Give your answer in hours.`, t2, {
        unit: "hours", traps: [T(clean((k / v1) * v2 / v1), "A faster speed means a SHORTER time.")],
        hints: [`Distance = speed × time = ${v1} × ${fmt(k / v1)} = ${fmt(k)} km.`, `Time = ${fmt(k)} ÷ ${v2}.`],
        solution: [`Distance = ${fmt(k)} km`, `Time = ${fmt(k)} ÷ ${v2} = ${fmt(t2)} hours`], data: { k, v2 },
      });
    }, (q) => Math.abs(q.data.k / q.data.v2 - q.answer.value) < 1e-9),
  ],
  [S(7, 5)]: [
    core(S(7, 5), "graph-type", "Recognising proportion from a graph", (rng) => {
      const kind = rng.pick(["direct", "inverse", "neither"]);
      const k = rng.int(2, 6);
      const curve = kind === "direct" ? plot((x) => (k / 2) * x, 0, 10, 2) : kind === "inverse" ? plot((x) => (k * 4) / x, 0.8, 10, 80) : plot((x) => (k / 3) * x + 3, 0, 10, 2);
      const names = { direct: "Direct proportion", inverse: "Inverse proportion", neither: "Neither" };
      const why = { direct: "A direct proportion graph is a straight line through the origin.", inverse: "An inverse proportion graph is a curve that falls as x increases, getting closer to the axes.", neither: "This is a straight line that doesn't pass through the origin, so it's not proportion." };
      return mc3(rng, "What kind of relationship does this graph show between x and y?", names[kind], Object.keys(names).filter((n) => n !== kind).map((n) => [names[n], why[kind]]), {
        diagram: { kind: "graph", x: [0, 10], y: [0, 20], xStep: 1, yStep: 2, curves: [{ points: curve }], description: `Graph showing ${kind === "direct" ? "a straight line through the origin" : kind === "inverse" ? "a decreasing curve" : "a straight line crossing the y-axis above the origin"}.` },
        hints: ["Direct proportion: straight line through (0, 0).", "Inverse proportion: as one doubles, the other halves (a falling curve)."],
        solution: [why[kind]], data: {},
      });
    }, () => true),
    extend(S(7, 5), "graph-equation", "Equation from a proportion graph", (rng) => {
      const k = rng.int(2, 5), a = rng.int(2, 4);
      return mc3(rng, `The graph shows y in direct proportion to x. It passes through (${a}, ${a * k}). Which equation describes it?`, `y = ${k}x`, [
        [`y = x/${k}`, `At x = ${a}, this gives y = ${fmt(round(a / k, 2))}, not ${a * k}.`],
        [`y = x + ${a * k - a}`, "This passes through the point, but not through the origin, so it isn't direct proportion."],
      ], {
        diagram: { kind: "graph", x: [0, 6], y: [0, 24], xStep: 1, yStep: 4, curves: [{ points: [[0, 0], [6, 6 * k]] }], points: [{ x: a, y: a * k, label: `(${a}, ${a * k})` }], description: `Straight line through the origin and (${a}, ${a * k}).` },
        hints: ["Direct proportion means y = kx.", `k = ${a * k} ÷ ${a}.`],
        solution: [`y = kx, and ${a * k} = k × ${a}`, `k = ${k}, so y = ${k}x`], data: {},
      });
    }, () => true),
  ],
  [S(7, 6)]: [
    core(S(7, 6), "square-proportion", "y proportional to x²", (rng) => {
      const k = rng.int(2, 5), B = rng.int(2, 5), C = rng.int(2, 8);
      if (B === C) return null;
      const A = k * B * B;
      return num(`y is directly proportional to x². When x = ${B}, y = ${A}. Find y when x = ${C}.`, k * C * C, {
        traps: [T(clean(A / B * C), "y is proportional to x SQUARED: k = y ÷ x².")],
        hints: [`Write y = kx². Substitute: ${A} = k × ${B}².`, `k = ${A} ÷ ${B * B} = ${k}.`],
        solution: [`y = kx²`, `${A} = k × ${B * B}, so k = ${k}`, `y = ${k} × ${C}² = ${k * C * C}`], data: { k, C },
      });
    }, (q) => q.answer.value === q.data.k * q.data.C ** 2),
    extend(S(7, 6), "inverse-equation", "y inversely proportional to x", (rng) => {
      const C = rng.int(2, 9), y2 = rng.int(2, 12), k = C * y2;
      const opts = divisors(k).filter((d) => d !== C);
      if (!opts.length) return null;
      const B = rng.pick(opts), A = k / B;
      return num(`y is inversely proportional to x. When x = ${B}, y = ${A}. Find y when x = ${C}.`, y2, {
        traps: [T(clean(A / B * C), "Inversely proportional means y = k ÷ x, not y = kx.")],
        hints: [`Write y = k/x. Substitute: ${A} = k ÷ ${B}.`, `k = ${A} × ${B} = ${k}.`],
        solution: [`y = k/x`, `k = ${A} × ${B} = ${k}`, `y = ${k} ÷ ${C} = ${y2}`], data: { A, B, C },
      });
    }, (q) => q.data.A * q.data.B === q.data.C * q.answer.value),
  ],
};

/* =============================== UNIT 8: Congruence and similarity =============================== */
const twoTriangles = (left, right, description) => ({
  kind: "shapes", width: 360, height: 180, description,
  polys: [{ pts: [[20, 150], [150, 150], [60, 40]] }, { pts: [[200, 150], [330, 150], [240, 40]] }],
  labels: [...left.map(([x, y, t]) => ({ at: [x, y], text: t })), ...right.map(([x, y, t]) => ({ at: [x + 180, y], text: t }))],
});

const U8 = {
  [S(8, 1)]: [
    core(S(8, 1), "which-condition", "Which congruence condition?", (rng) => {
      const kind = rng.pick(["SSS", "SAS", "ASA"]);
      const s1 = rng.int(4, 9), s2 = rng.int(5, 12), s3 = rng.int(6, 13), a1 = rng.int(35, 70), a2 = rng.int(40, 75);
      const labels = {
        SSS: [[85, 168, `${s1} cm`], [20, 95, `${s2} cm`], [118, 95, `${s3} cm`]],
        SAS: [[85, 168, `${s1} cm`], [20, 95, `${s2} cm`], [44, 138, `${a1}°`]],
        ASA: [[85, 168, `${s1} cm`], [44, 138, `${a1}°`], [122, 140, `${a2}°`]],
      }[kind];
      const why = { SSS: "three pairs of equal sides", SAS: "two sides and the angle between them", ASA: "two angles and the side between them" };
      return mc3(rng, "These two triangles have the measurements shown. Which condition proves they are congruent?", kind, ["SSS", "SAS", "ASA"].filter((k) => k !== kind).map((k) => [k, `${k} needs ${why[k]}. Look at what is actually marked.`]), {
        diagram: twoTriangles(labels, labels, `Two triangles, each marked with ${why[kind]}.`),
        hints: ["Count how many sides and how many angles are marked.", "If there is an angle, is it between the two sides, or is the side between the two angles?"],
        solution: [`Each triangle shows ${why[kind]}.`, `So they are congruent by ${kind}.`], data: {},
      });
    }, () => true),
    extend(S(8, 1), "not-a-condition", "Which isn't a proof?", (rng) => {
      const valid = rng.shuffle(["SSS (three sides)", "SAS (two sides and the included angle)", "ASA (two angles and the included side)", "RHS (right angle, hypotenuse and a side)"]).slice(0, 2);
      return mc3(rng, "Which of these does NOT prove that two triangles are congruent?", "AAA (three angles)", valid.map((v) => [v, `${v.split(" ")[0]} is a valid congruence condition.`]), {
        hints: ["Congruent shapes are exactly the same size and shape.", "Could two triangles have the same three angles but different sizes?"],
        solution: ["Triangles with equal angles can be different sizes (an enlargement), so AAA shows similarity, not congruence."], data: {},
      });
    }, () => true),
  ],
  [S(8, 2)]: [
    core(S(8, 2), "similar-rectangles", "Missing length in similar shapes", (rng) => {
      const w = rng.int(2, 8), h = w + rng.int(1, 6), k = rng.pick([2, 3, 4, 1.5, 2.5]);
      if (!Number.isInteger(w * k)) return null;
      return num(`Rectangle A is ${w} cm by ${h} cm. Rectangle B is similar to A, and its shorter side is ${fmt(w * k)} cm. How long is its longer side?`, clean(h * k), {
        unit: "cm", traps: [T(h + (w * k - w), "Similar shapes are enlargements: multiply by the scale factor, don't add.")],
        hints: [`Scale factor = ${fmt(w * k)} ÷ ${w}.`, `Scale factor = ${fmt(k)}. Multiply ${h} by it.`],
        solution: [`Scale factor = ${fmt(w * k)} ÷ ${w} = ${fmt(k)}`, `${h} × ${fmt(k)} = ${fmt(clean(h * k))} cm`], data: { h, k },
      });
    }, (q) => Math.abs(q.data.h * q.data.k - q.answer.value) < 1e-9),
    extend(S(8, 2), "similar-fractional", "Similar shapes with a decimal scale factor", (rng) => {
      const a = rng.int(4, 12), b = rng.int(5, 15), c = rng.int(3, 11);
      if (a === c) return null;
      const value = round((b * c) / a, 1);
      if (Number.isInteger((b * c) / a)) return null;
      return num(`Two triangles are similar. In the small triangle, two sides are ${a} cm and ${b} cm. In the large triangle, the side matching ${a} cm is ${c} cm. Find the side matching ${b} cm, to 1 decimal place.`, value, {
        dp: 1, unit: "cm",
        hints: [`Scale factor = ${c} ÷ ${a}.`, `Missing side = ${b} × ${c} ÷ ${a}.`],
        solution: [`Scale factor = ${c} ÷ ${a} = ${fmt(round(c / a, 4))}…`, `${b} × ${c} ÷ ${a} = ${fmt(round((b * c) / a, 4))}…`, `= ${fmt(value, 1)} cm`], data: { a, b, c },
      });
    }, (q) => Math.abs(Math.round((q.data.b * q.data.c / q.data.a) * 10) / 10 - q.answer.value) < 1e-9),
  ],
  [S(8, 3)]: [
    core(S(8, 3), "similar-triangles-diagram", "Similar triangles from a diagram", (rng) => {
      const k = rng.pick([2, 3, 1.5, 2.5]), base = rng.pick([4, 6, 8]), side = rng.int(3, 9);
      const big = clean(base * k), x = clean(side * k);
      return mc3(rng, `The two triangles are similar. Find the length marked x.`, `${fmt(x)} cm`, [
        [`${fmt(side + big - base)} cm`, "Don't add the difference: similar shapes use a multiplier (scale factor)."],
        [`${fmt(round(side / k, 2))} cm`, "The larger triangle should have the longer side: multiply by the scale factor."],
      ], {
        diagram: twoTriangles([[85, 168, `${base} cm`], [20, 95, `${side} cm`]], [[85, 168, `${fmt(big)} cm`], [20, 95, "x"]], `Two similar triangles. Small: base ${base} cm, side ${side} cm. Large: base ${big} cm, side x.`),
        hints: ["Find the scale factor from the pair of matching sides you know.", `${fmt(big)} ÷ ${base} = ${fmt(k)}.`],
        solution: [`Scale factor = ${fmt(big)} ÷ ${base} = ${fmt(k)}`, `x = ${side} × ${fmt(k)} = ${fmt(x)} cm`], data: {},
      });
    }, () => true),
    extend(S(8, 3), "nested-triangles", "Parallel lines and similar triangles", (rng) => {
      const AD = rng.int(2, 6), DB = rng.int(2, 6), DE = rng.int(3, 8);
      const AB = AD + DB, BC = clean((DE * AB) / AD);
      if (!Number.isInteger(BC * 2)) return null;
      return mc3(rng, `DE is parallel to BC. AD = ${AD} cm, DB = ${DB} cm and DE = ${DE} cm. Find BC.`, `${fmt(BC)} cm`, [
        [`${fmt(round((DE * DB) / AD, 2))} cm`, `The scale factor uses AB = ${AD} + ${DB} = ${AB}, not DB.`],
        [`${fmt(DE + DB)} cm`, "Similar triangles use a scale factor, not adding."],
      ], {
        diagram: { kind: "shapes", width: 300, height: 220, polys: [{ pts: [[150, 20], [30, 200], [270, 200]] }, { pts: [[100, 95], [200, 95]], open: true }],
          labels: [{ at: [150, 14], text: "A" }, { at: [18, 210], text: "B" }, { at: [282, 210], text: "C" }, { at: [86, 99], text: "D" }, { at: [214, 99], text: "E" }, { at: [108, 60], text: `${AD} cm`, small: true }, { at: [48, 150], text: `${DB} cm`, small: true }, { at: [150, 88], text: `${DE} cm`, small: true }, { at: [150, 216], text: "BC = ?", small: true }],
          description: `Triangle ABC with D on AB and E on AC, DE parallel to BC. AD ${AD}, DB ${DB}, DE ${DE}.` },
        hints: ["Triangles ADE and ABC are similar.", `AB = ${AD} + ${DB} = ${AB}. Scale factor = ${AB} ÷ ${AD}.`],
        solution: [`AB = ${AB} cm`, `Scale factor = ${AB} ÷ ${AD} = ${fmt(round(AB / AD, 4))}`, `BC = ${DE} × ${AB} ÷ ${AD} = ${fmt(BC)} cm`], data: {},
      });
    }, () => true),
  ],
  [S(8, 4)]: [
    core(S(8, 4), "area-scale", "Area scale factor", (rng) => {
      const k = rng.int(2, 5), area = rng.int(3, 20);
      return num(`Shape B is an enlargement of shape A with scale factor ${k}. The area of A is ${area} cm². What is the area of B?`, area * k * k, {
        unit: "cm²", traps: [T(area * k, `Areas scale by the scale factor SQUARED: ${k}² = ${k * k}.`)],
        hints: [`Area scale factor = (length scale factor)².`, `${k}² = ${k * k}.`],
        solution: [`Area scale factor = ${k}² = ${k * k}`, `${area} × ${k * k} = ${area * k * k} cm²`], data: { area, k },
      });
    }, (q) => q.answer.value === q.data.area * q.data.k ** 2),
    extend(S(8, 4), "volume-from-area", "Volume from surface areas", (rng) => {
      const p = rng.int(1, 3), q = p + rng.int(1, 3), unit = rng.int(1, 5);
      const vSmall = unit * p ** 3;
      return num(`Two similar solids have surface areas ${p * p * 4} cm² and ${q * q * 4} cm². The smaller has volume ${vSmall} cm³. Find the volume of the larger.`, unit * q ** 3, {
        unit: "cm³", traps: [T(clean(vSmall * (q * q) / (p * p)), "That uses the area scale factor. Volumes scale by the length scale factor CUBED.")],
        hints: [`Area ratio ${p * p * 4} : ${q * q * 4} = ${p * p} : ${q * q}, so the length ratio is ${p} : ${q}.`, `Volume ratio = ${p}³ : ${q}³ = ${p ** 3} : ${q ** 3}.`],
        solution: [`Length ratio ${p} : ${q}`, `Volume ratio ${p ** 3} : ${q ** 3}`, `${vSmall} × ${q ** 3} ÷ ${p ** 3} = ${unit * q ** 3} cm³`], data: { p, q, vSmall },
      });
    }, (q) => Math.abs(q.data.vSmall * (q.data.q / q.data.p) ** 3 - q.answer.value) < 1e-9),
  ],
};

export const Y10B_GENERATORS = { ...U5, ...U6, ...U7, ...U8 };
