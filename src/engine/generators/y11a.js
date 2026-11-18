/* ==========================================================================
   Year 11 generators, Part A: Units 1–4 (light format: core + extend)
   Vectors · Functions and graphs · Bounds and accuracy · Rates of change
   ========================================================================== */
import { clean, fmt, round } from "../numbers.js";
import { core, expr, extend, mc3, multi, num, plot, polyText, reuse, T } from "./helpers.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y9B_GENERATORS } from "./y9b.js";

const S = (u, l) => `y11-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, make, v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, make, v);
const from = (id, level) => ({ ...Y9A_GENERATORS, ...Y9B_GENERATORS })[id].find((g) => g.level === level);
const R = (gen, u, l, level, name) => reuse(gen, S(u, l), level, name);
const N = (prompt, value, hints, solution, o = {}) => num(prompt, value, { hints, solution, ...o });
const nz = (rng, a, b) => rng.nonZero(a, b);
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const br = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));
const col = (a, b) => `(${fmt(a)}, ${fmt(b)})`;
const co = (c, v) => (Math.abs(c) === 1 ? "" : fmt(Math.abs(c))) + v;
const lc = (c1, c2, v1 = "a", v2 = "b") => `${c1 < 0 ? "−" : ""}${co(c1, v1)} ${c2 < 0 ? "−" : "+"} ${co(c2, v2)}`;
const ax = (a, v = "x") => (a === 1 ? v : a === -1 ? `−${v}` : `${fmt(a)}${v}`);
const lt = (a, b) => (b === 0 ? ax(a) : `${ax(a)} ${sg(b)}`);

// A number answer rounded to dp places. Refuses values that sit on a rounding boundary.
const dpn = (prompt, exact, dp, unit, hints, steps, o = {}) => {
  const f = 10 ** dp;
  if (Math.abs((Math.abs(exact) * f) % 1 - 0.5) < 1e-4) return null;
  return num(prompt, round(exact, dp), { dp, unit, hints, solution: [...steps, `= ${fmt(round(exact, dp), dp)}${unit ? " " + unit : ""}`], traps: o.traps ?? [], data: { exact, dp } });
};
const dpValid = (q) => Math.abs(round(q.data.exact, q.data.dp) - q.answer.value) < 1e-9;

/* ---------------- Unit 1: Vectors ---------------- */
const U1 = {
  [S(1, 1)]: [
    C(1, 1, "vector-between-points", (rng) => {
      const x1 = rng.int(-6, 6), y1 = rng.int(-6, 6), x2 = rng.int(-6, 6), y2 = rng.int(-6, 6);
      if (x1 === x2 && y1 === y2) return null;
      const a = x2 - x1, b = y2 - y1;
      return multi(`A is the point (${fmt(x1)}, ${fmt(y1)}) and B is the point (${fmt(x2)}, ${fmt(y2)}). Write the vector AB as (top, bottom).`, [["top =", a], ["bottom =", b]], {
        answerText: col(a, b),
        hints: ["AB = B − A: take the coordinates of A away from the coordinates of B.", `Top: ${fmt(x2)} − ${br(x1)}. Bottom: ${fmt(y2)} − ${br(y1)}.`],
        solution: [`Top: ${fmt(x2)} − ${br(x1)} = ${fmt(a)}`, `Bottom: ${fmt(y2)} − ${br(y1)} = ${fmt(b)}`, `AB = ${col(a, b)}`],
      });
    }),
    E(1, 1, "magnitude", (rng) => {
      const p = nz(rng, -9, 9), q = nz(rng, -9, 9);
      return dpn(`The vector a = ${col(p, q)}. Work out the magnitude (length) of a, to 1 decimal place.`, Math.hypot(p, q), 1, "", ["Use Pythagoras: magnitude = √(top² + bottom²).", `${p * p} + ${q * q} = ${p * p + q * q}.`], [`|a| = √(${p * p} + ${q * q}) = √${p * p + q * q}`], { traps: [T(p * p + q * q, "That's before taking the square root.")] });
    }, dpValid),
  ],
  [S(1, 2)]: [
    C(1, 2, "add-subtract-vectors", (rng) => {
      const p = rng.int(-6, 6), q = rng.int(-6, 6), r = rng.int(-6, 6), s = rng.int(-6, 6), add = rng.chance(0.5);
      const a = add ? p + r : p - r, b = add ? q + s : q - s;
      return multi(`a = ${col(p, q)} and b = ${col(r, s)}. Work out a ${add ? "+" : "−"} b, written as (top, bottom).`, [["top =", a], ["bottom =", b]], {
        answerText: col(a, b),
        hints: ["Work with the top numbers, then the bottom numbers.", add ? "Add each pair." : "Subtract each pair, taking care with negatives."],
        solution: [`Top: ${fmt(p)} ${add ? "+" : "−"} ${br(r)} = ${fmt(a)}`, `Bottom: ${fmt(q)} ${add ? "+" : "−"} ${br(s)} = ${fmt(b)}`],
      });
    }),
    E(1, 2, "multiples-of-vectors", (rng) => {
      const p = rng.int(-4, 4), q = rng.int(-4, 4), r = rng.int(-4, 4), s = rng.int(-4, 4), m = nz(rng, -4, 4), n = nz(rng, -4, 4);
      const a = m * p + n * r, b = m * q + n * s;
      return multi(`a = ${col(p, q)} and b = ${col(r, s)}. Work out ${lc(m, n)}, written as (top, bottom).`, [["top =", a], ["bottom =", b]], {
        answerText: col(a, b),
        hints: ["Multiply each vector first, then add or subtract.", `${fmt(m)}a = ${col(m * p, m * q)}.`],
        solution: [`${fmt(m)}a = ${col(m * p, m * q)} and ${fmt(n)}b = ${col(n * r, n * s)}`, `Total = ${col(a, b)}`],
      });
    }),
  ],
  [S(1, 3)]: [
    C(1, 3, "vector-ab", (rng) => {
      const p = rng.int(1, 5), q = rng.int(1, 5), ask = rng.pick(["AB", "BA"]);
      const e = ask === "AB" ? `${q}*b-${p}*a` : `${p}*a-${q}*b`;
      const shown = ask === "AB" ? `${co(q, "b")} − ${co(p, "a")}` : `${co(p, "a")} − ${co(q, "b")}`;
      return expr(`In triangle OAB, OA = ${co(p, "a")} and OB = ${co(q, "b")}. Find ${ask} in terms of a and b.`, e, {
        answerText: shown,
        hints: ask === "AB" ? ["Go from A back to O, then on to B.", "AB = −OA + OB."] : ["Go from B back to O, then on to A.", "BA = −OB + OA."],
        solution: ask === "AB" ? [`AB = AO + OB = −${co(p, "a")} + ${co(q, "b")}`, `= ${shown}`] : [`BA = BO + OA = −${co(q, "b")} + ${co(p, "a")}`, `= ${shown}`],
      });
    }),
    E(1, 3, "point-on-line", (rng) => {
      const p = rng.int(1, 4), q = rng.int(1, 4);
      return expr(`OA = ${3 * p}a and OB = ${3 * q}b. P is the point on AB where AP : PB = 1 : 2. Find OP in terms of a and b.`, `${2 * p}*a+${q}*b`, {
        answerText: `${co(2 * p, "a")} + ${co(q, "b")}`,
        hints: ["First find AB = OB − OA. AP is one third of AB.", "OP = OA + AP."],
        solution: [`AB = ${co(3 * q, "b")} − ${co(3 * p, "a")}`, `AP = ⅓AB = ${co(q, "b")} − ${co(p, "a")}`, `OP = OA + AP = ${co(3 * p, "a")} + ${co(q, "b")} − ${co(p, "a")} = ${co(2 * p, "a")} + ${co(q, "b")}`],
      });
    }),
  ],
  [S(1, 4)]: [
    C(1, 4, "parallel-vectors", (rng) => {
      const p = rng.int(1, 4), q = rng.int(2, 6), t = rng.pick([2, 3, 4, -2, -3]);
      return mc3(rng, `AB = ${lc(p, q)} and CD = ${lc(p * t, q * t)}. What does this show about AB and CD?`, "AB and CD are parallel", [["AB and CD are the same length", `CD is ${Math.abs(t)} times as long as AB.`], ["AB and CD are perpendicular", "Vectors that are multiples of each other point along the same direction."]], {
        hints: ["Is one vector a multiple of the other?", `CD = ${t} × AB.`],
        solution: [`CD = ${t}(${lc(p, q)}) = ${lc(p * t, q * t)}`, "One vector is a multiple of the other, so they are parallel."],
      });
    }),
    E(1, 4, "find-k-parallel", (rng) => {
      const p = rng.int(1, 3), q = rng.int(2, 6), t = rng.pick([2, 3, 4, -2]);
      return N(`AB = ${lc(p, q)} and CD = ${p * t < 0 ? "−" : ""}${co(p * t, "a")} + kb. AB is parallel to CD. Find the value of k.`, q * t, [`CD must be a multiple of AB. Find the multiplier from the a parts: ${p * t} ÷ ${p}.`, "Multiply the b part of AB by the same number."], [`${fmt(p * t)}a ÷ ${p}a = ${t}`, `k = ${t} × ${q} = ${fmt(q * t)}`]);
    }),
  ],
};

/* ---------------- Unit 2: Functions and graphs ---------------- */
const SHAPES = [
  ["y = x³", (x) => x ** 3, [[-2, 2]], "a cubic through the origin, rising from left to right"],
  ["y = −x³", (x) => -(x ** 3), [[-2, 2]], "a cubic through the origin, falling from left to right"],
  ["y = 1/x", (x) => 1 / x, [[-4, -0.25], [0.25, 4]], "a reciprocal graph with branches in the top-right and bottom-left"],
  ["y = −1/x", (x) => -1 / x, [[-4, -0.25], [0.25, 4]], "a reciprocal graph with branches in the top-left and bottom-right"],
];
const U2 = {
  [S(2, 1)]: [
    C(2, 1, "match-graph", (rng) => {
      const k = rng.int(0, 3), [name, fn, ranges, desc] = SHAPES[k];
      const wrong = rng.shuffle(SHAPES.filter((_, i) => i !== k)).slice(0, 2);
      return mc3(rng, "Which equation matches this graph?", name, wrong.map(([n]) => [n, "Check which corners the curve passes through and whether it rises or falls."]), {
        diagram: { kind: "graph", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, curves: ranges.map(([a, b]) => ({ points: plot(fn, a, b, 80), colour: 0 })), description: `A graph of ${desc}.` },
        hints: ["Does the curve go through the origin, or have gaps (asymptotes) at the axes?", "Which pair of quadrants does it sit in?"],
        solution: [`The graph is ${desc}.`, `So the equation is ${name}.`],
      });
    }),
    E(2, 1, "evaluate-cubic", (rng) => {
      const a = nz(rng, -4, 4), b = rng.int(1, 9), x = nz(rng, -4, 4);
      const y = x ** 3 + a * x - b;
      return N(`Work out the value of y when x = ${fmt(x)} for the curve y = x³ ${sg(a)}x − ${b}.`, y, [`Substitute x = ${fmt(x)}; use brackets for negatives.`, `${br(x)}³ = ${x ** 3}.`], [`y = ${br(x)}³ ${sg(a)}(${fmt(x)}) − ${b}`, `= ${x ** 3} ${sg(a * x)} − ${b} = ${fmt(y)}`], { traps: [T(-y, "Check the sign of each term.")] });
    }),
  ],
  [S(2, 2)]: [
    C(2, 2, "which-exponential", (rng) => {
      const b = rng.int(2, 5), y = b * b;
      const wrong = [`y = ${b + 1}^x`, `y = ${b}x + 1`];
      return mc3(rng, `The graph of an equation passes through the point (2, ${y}) and has a y-intercept of 1. Which equation could it be?`, `y = ${b}^x`, wrong.map((w) => [w, "Test the point (2, " + y + ") in this equation."]), {
        diagram: { kind: "graph", x: [-2, 3], y: [0, y + 6], xStep: 1, yStep: y > 16 ? 5 : 4, curves: [{ points: plot((x) => b ** x, -2, 3, 80) }], points: [{ x: 2, y, label: `(2, ${y})` }, { x: 0, y: 1, label: "(0, 1)" }], description: `An exponential curve through (0, 1) and (2, ${y}).` },
        hints: ["Substitute x = 2 into each equation.", `Which one gives y = ${y}?`],
        solution: [`${b}^2 = ${y}, and ${b}^0 = 1`, `So the equation is y = ${b}^x.`],
      });
    }),
    E(2, 2, "growth-decay", (rng) => {
      const grow = rng.chance(0.5), P = rng.pick([500, 800, 1200, 2500, 4000, 12000]), r = rng.pick([2, 3, 4, 5, 8, 10, 12, 15]), n = rng.int(2, 5);
      const m = grow ? 1 + r / 100 : 1 - r / 100, exact = P * m ** n;
      return dpn(grow ? `£${fmt(P)} is invested at ${r}% compound interest per year. How much is it worth after ${n} years? Give your answer to the nearest penny.` : `A car is worth £${fmt(P)} and loses ${r}% of its value each year. What is it worth after ${n} years? Give your answer to the nearest penny.`, exact, 2, "", [`The multiplier is ${fmt(clean(m))}.`, `Value = ${fmt(P)} × ${fmt(clean(m))}^${n}.`], [`${fmt(P)} × ${fmt(clean(m))}^${n} = ${fmt(round(exact, 4))}…`]);
    }, dpValid),
  ],
  [S(2, 3)]: [
    C(2, 3, "function-value", (rng) => {
      const a = nz(rng, -5, 6), b = rng.int(-9, 9), k = rng.int(-5, 7);
      return N(`f(x) = ${lt(a, b)}. Work out f(${fmt(k)}).`, a * k + b, [`Replace x with ${br(k)}.`, `${a} × ${br(k)} ${sg(b)}.`], [`f(${fmt(k)}) = ${a} × ${br(k)} ${sg(b)} = ${fmt(a * k + b)}`]);
    }),
    E(2, 3, "quadratic-function", (rng) => {
      const A = rng.int(1, 3), B = rng.int(-6, 6), Cc = rng.int(-9, 9), k = nz(rng, -4, 4);
      const v = A * k * k + B * k + Cc;
      return N(`f(x) = ${polyText([A, B, Cc])}. Work out f(${fmt(k)}).`, v, [`Square ${br(k)} first.`, `${br(k)}² = ${k * k}.`], [`f(${fmt(k)}) = ${A} × ${k * k} ${sg(B * k)} ${sg(Cc)}`, `= ${fmt(v)}`], { traps: [T(A * k * k - B * k + Cc, "Check the sign of the middle term when x is negative.")] });
    }),
  ],
  [S(2, 4)]: [
    C(2, 4, "composite-value", (rng) => {
      const a = rng.int(2, 5), b = rng.int(-6, 6), c = rng.int(2, 4), d = rng.int(-5, 5), k = rng.int(1, 6);
      const g = c * k + d, v = a * g + b;
      return N(`f(x) = ${lt(a, b)} and g(x) = ${lt(c, d)}. Work out fg(${k}).`, v, ["fg(x) means do g first, then f.", `g(${k}) = ${fmt(g)}.`], [`g(${k}) = ${c} × ${k} ${sg(d)} = ${fmt(g)}`, `f(${fmt(g)}) = ${a} × ${br(g)} ${sg(b)} = ${fmt(v)}`], { traps: [T(c * (a * k + b) + d, "That's gf. For fg, do g first.")] });
    }),
    E(2, 4, "composite-inverse-expression", (rng) => {
      const a = rng.int(2, 5), b = nz(rng, -7, 7), kind = rng.pick(["fg", "gf", "inv"]);
      const f = `f(x) = ${lt(a, b)}`;
      if (kind === "fg") return expr(`${f} and g(x) = x². Find fg(x).`, `${a}*x^2+(${b})`, { answerText: `${a}x² ${sg(b)}`, hints: ["fg(x) means f(g(x)): put g(x) = x² into f.", `Replace x in ${lt(a, b)} with x².`], solution: [`fg(x) = ${a}(x²) ${sg(b)} = ${a}x² ${sg(b)}`] });
      if (kind === "gf") return expr(`${f} and g(x) = x². Find gf(x), and expand it.`, `${a * a}*x^2+${2 * a * b}*x+${b * b}`, { flags: { expanded: true }, answerText: polyText([a * a, 2 * a * b, b * b]), hints: ["gf(x) means g(f(x)): square f(x).", `(${lt(a, b)})² = (${lt(a, b)})(${lt(a, b)}).`], solution: [`gf(x) = (${lt(a, b)})²`, `= ${polyText([a * a, 2 * a * b, b * b])}`] });
      return expr(`${f}. Find f⁻¹(x).`, `(x-(${b}))/${a}`, { answerText: `(x ${sg(-b)}) ÷ ${a}`, hints: ["Write y = f(x), then make x the subject.", `y = ${lt(a, b)}; undo the ${sg(b)}, then divide by ${a}.`], solution: [`y = ${lt(a, b)}`, `y ${sg(-b)} = ${a}x`, `x = (y ${sg(-b)}) ÷ ${a}, so f⁻¹(x) = (x ${sg(-b)}) ÷ ${a}`] });
    }),
  ],
  [S(2, 5)]: (() => {
    const tf = {
      "f(x) + a": (a) => [`f(x) ${a < 0 ? "−" : "+"} ${Math.abs(a)}`, ([x, y]) => [x, y + a], "adds to the y-coordinate"],
      "f(x + a)": (a) => [`f(x ${a < 0 ? "−" : "+"} ${Math.abs(a)})`, ([x, y]) => [x - a, y], "moves the graph left when a is positive (x changes by −a)"],
      "-f(x)": () => ["−f(x)", ([x, y]) => [x, -y], "reflects in the x-axis"],
      "f(-x)": () => ["f(−x)", ([x, y]) => [-x, y], "reflects in the y-axis"],
      "2f(x)": () => ["2f(x)", ([x, y]) => [x, 2 * y], "stretches vertically by scale factor 2"],
      "f(2x)": () => ["f(2x)", ([x, y]) => [x / 2, y], "stretches horizontally by scale factor ½"],
    };
    const make = (keys) => (rng) => {
      const key = rng.pick(keys), a = nz(rng, -5, 5);
      const [label, fn, why] = tf[key](a);
      const p = [key === "f(2x)" ? 2 * rng.int(-4, 4) : rng.int(-6, 6), rng.int(-7, 7)];
      const [nx, ny] = fn(p);
      return multi(`The graph of y = f(x) has a turning point at ${col(p[0], p[1])}. Write down the turning point of the graph of y = ${label}.`, [["x =", nx], ["y =", ny]], {
        answerText: col(nx, ny),
        hints: [`Think about what ${label} does to the graph: it ${why}.`, "Apply that to the coordinates of the turning point."],
        solution: [`y = ${label} ${why}.`, `${col(p[0], p[1])} → ${col(nx, ny)}`],
      });
    };
    return [C(2, 5, "translate-graph", make(["f(x) + a", "f(x + a)"])), E(2, 5, "reflect-stretch-graph", make(["-f(x)", "f(-x)", "2f(x)", "f(2x)"]))];
  })(),
  [S(2, 6)]: [
    C(2, 6, "iterate-once", (rng) => {
      const a = rng.int(2, 9), x0 = rng.int(1, 6);
      return dpn(`A sequence uses x(n+1) = √(x(n) + ${a}), starting with x(0) = ${x0}. Work out x(1) correct to 2 decimal places.`, Math.sqrt(x0 + a), 2, "", [`Put x(n) = ${x0} into the formula.`, `x(1) = √(${x0} + ${a}).`], [`x(1) = √${x0 + a}`]);
    }, dpValid),
    E(2, 6, "iterate-twice", (rng) => {
      const a = rng.int(2, 9), x0 = rng.int(1, 5), kind = rng.pick(["sqrt", "recip"]);
      const f = kind === "sqrt" ? (x) => Math.sqrt(x + a) : (x) => 1 + a / (x * x);
      const exact = f(f(x0));
      return dpn(kind === "sqrt" ? `A sequence uses x(n+1) = √(x(n) + ${a}), starting with x(0) = ${x0}. Work out x(2) correct to 2 decimal places. Do not round until the end.` : `A sequence uses x(n+1) = 1 + ${a}/x(n)², starting with x(0) = ${x0}. Work out x(2) correct to 2 decimal places. Do not round until the end.`, exact, 2, "", ["Work out x(1) first, and keep all the digits on your calculator.", "Then use x(1) to find x(2)."], [`x(1) = ${fmt(round(f(x0), 4))}…`, `x(2) = f(x(1)) = ${fmt(round(exact, 4))}…`], { traps: [T(round(f(round(f(x0), 1)), 2), "Don't round x(1) before using it.")] });
    }, dpValid),
  ],
};

/* ---------------- Unit 3: Bounds and accuracy ---------------- */
const accuracy = (dp) => (dp === 0 ? "the nearest whole number" : dp < 0 ? `the nearest ${10 ** -dp}` : `${dp} decimal place${dp === 1 ? "" : "s"}`);
const U3 = {
  [S(3, 1)]: [R(from("y9-u1-l3", 1), 3, 1, 1, "error-interval-whole"), R(from("y9-u1-l3", 2), 3, 1, 2, "error-interval-dp")],
  [S(3, 2)]: [
    C(3, 2, "bound-rounded", (rng) => {
      const dp = rng.pick([-1, 0, 1, 2]), step = 10 ** -dp, v = clean(rng.int(4, 900) * step), upper = rng.chance(0.5);
      const ans = clean(upper ? v + step / 2 : v - step / 2);
      return N(`A length is ${fmt(v, Math.max(dp, 0))} cm, rounded to ${accuracy(dp)}. Write down the ${upper ? "upper" : "lower"} bound.`, ans, [`The bounds are half a unit either side. Half of ${fmt(clean(step))} is ${fmt(clean(step / 2))}.`, upper ? "Add half a unit." : "Subtract half a unit."], [`Half a unit = ${fmt(clean(step / 2))}`, `${fmt(v, Math.max(dp, 0))} ${upper ? "+" : "−"} ${fmt(clean(step / 2))} = ${fmt(ans)}`], { traps: [T(clean(upper ? v + step : v - step), "Go half a unit, not a whole unit.")] });
    }),
    E(3, 2, "bound-2sf", (rng) => {
      let d = rng.int(11, 99); if (d % 10 === 0) return null;
      const e = rng.int(-2, 2), v = clean(d * 10 ** e), half = 0.5 * 10 ** e, upper = rng.chance(0.5);
      const ans = clean(upper ? v + half : v - half);
      return N(`x = ${fmt(v)} correct to 2 significant figures. Write down the ${upper ? "upper" : "lower"} bound of x.`, ans, ["Find the place value of the second significant figure.", `That is ${fmt(clean(10 ** e))}; half of it is ${fmt(clean(half))}.`], [`Second significant figure is worth ${fmt(clean(10 ** e))}`, `${fmt(v)} ${upper ? "+" : "−"} ${fmt(clean(half))} = ${fmt(ans)}`]);
    }),
  ],
  [S(3, 3)]: [
    C(3, 3, "bound-sum-difference", (rng) => {
      const dp = rng.pick([0, 1, 2]), s = 10 ** -dp;
      let a = clean(rng.int(40, 300) * s), b = clean(rng.int(10, 39) * s);
      const plus = rng.chance(0.5), upper = rng.chance(0.5);
      const ub = (x) => x + s / 2, lb = (x) => x - s / 2;
      const ans = clean(plus ? (upper ? ub(a) + ub(b) : lb(a) + lb(b)) : upper ? ub(a) - lb(b) : lb(a) - ub(b));
      return N(`a = ${fmt(a, dp)} and b = ${fmt(b, dp)}, both rounded to ${accuracy(dp)}. Work out the ${upper ? "upper" : "lower"} bound of a ${plus ? "+" : "−"} b.`, ans, [plus ? `Use the ${upper ? "upper" : "lower"} bound of both numbers.` : upper ? "For the biggest difference, use the upper bound of a and the LOWER bound of b." : "For the smallest difference, use the lower bound of a and the UPPER bound of b.", `Each bound is ${fmt(clean(s / 2))} away from the given value.`], [`a: ${fmt(clean(lb(a)))} to ${fmt(clean(ub(a)))}; b: ${fmt(clean(lb(b)))} to ${fmt(clean(ub(b)))}`, `Answer = ${fmt(ans)}`]);
    }),
    E(3, 3, "bound-speed", (rng) => {
      const u = rng.pick([1, 5, 10]), d = rng.int(8, 40) * u, t = clean(rng.int(25, 95) / 10);
      const exact = (d + u / 2) / (t - 0.05);
      return dpn(`A car travels ${d} m, measured to the nearest ${u} m, in ${fmt(t, 1)} seconds, measured to 1 decimal place. Work out the upper bound of its speed in m/s, correct to 2 decimal places.`, exact, 2, "", ["Speed = distance ÷ time. For the largest speed, use the largest distance and the smallest time.", `Upper bound of distance = ${fmt(d + u / 2)}; lower bound of time = ${fmt(clean(t - 0.05))}.`], [`${fmt(d + u / 2)} ÷ ${fmt(clean(t - 0.05))} = ${fmt(round(exact, 4))}…`], { traps: [T(round((d + u / 2) / (t + 0.05), 2), "Divide by the LOWER bound of time to get the biggest speed.")] });
    }, dpValid),
  ],
  [S(3, 4)]: [
    C(3, 4, "truncate", (rng) => {
      const dp = rng.int(1, 3), n = rng.int(10000, 99999);
      const t = Math.floor(n / 10 ** (4 - dp)) / 10 ** dp, rounded = Math.round(n / 10 ** (4 - dp)) / 10 ** dp;
      return num(`Truncate ${(n / 10000).toFixed(4)} to ${dp} decimal place${dp === 1 ? "" : "s"}.`, t, { dp, hints: ["Truncating means cutting off the digits after the place you need, without rounding.", `Keep the first ${dp} digit${dp === 1 ? "" : "s"} after the decimal point.`], solution: [`${(n / 10000).toFixed(4)} → ${t.toFixed(dp)}`], traps: [T(rounded, "That's rounding. Truncating just cuts the digits off.")] });
    }),
    E(3, 4, "truncation-interval", (rng) => {
      const dp = rng.int(0, 2), s = 10 ** -dp, t = clean(rng.int(11, 99) * s);
      const correct = `${fmt(t, dp)} ≤ x < ${fmt(clean(t + s), dp)}`;
      return mc3(rng, `A number x is truncated to ${accuracy(dp)} and the result is ${fmt(t, dp)}. Which is the error interval for x?`, correct, [[`${fmt(clean(t - s / 2), dp + 1)} ≤ x < ${fmt(clean(t + s / 2), dp + 1)}`, "That is the interval for ROUNDING. Truncating always rounds down."], [`${fmt(clean(t - s), dp)} < x ≤ ${fmt(t, dp)}`, "A truncated number is never bigger than the original."]], {
        hints: ["Truncating cuts digits off, so x is at least the truncated value.", `x could be anything up to, but not including, ${fmt(clean(t + s), dp)}.`],
        solution: [`Smallest x = ${fmt(t, dp)}`, `x < ${fmt(clean(t + s), dp)}`, `Error interval: ${correct}`],
      });
    }),
  ],
};

/* ---------------- Unit 4: Rates of change and graphs ---------------- */
// A speed-time graph that rises, stays level, then falls to zero.
function vt(rng) {
  const v = rng.pick([12, 16, 18, 20, 24]), t1 = rng.pick([2, 3, 4, 6]), d = rng.pick([2, 3, 4, 6]), h = rng.int(2, 6);
  if (v % t1 !== 0 || v % d !== 0) return null;
  const T3 = t1 + h + d, xMax = Math.ceil(T3 / 2) * 2 + 2, yMax = Math.ceil(v / 4) * 4 + 4;
  return { v, t1, d, h, T3, diagram: { kind: "graph", x: [0, xMax], y: [0, yMax], xStep: 2, yStep: 4, xLabel: "Time (s)", yLabel: "Speed (m/s)", curves: [{ points: [[0, 0], [t1, v], [t1 + h, v], [T3, 0]] }], description: `A speed-time graph: speed rises to ${v} m/s in ${t1} s, stays constant for ${h} s, then falls to 0 over ${d} s.` } };
}
const U4 = {
  [S(4, 1)]: [R(from("y9-u6-l6", 1), 4, 1, 1, "distance-time-speed"), R(from("y9-u6-l6", 2), 4, 1, 2, "distance-time-stop")],
  [S(4, 2)]: [
    C(4, 2, "acceleration", (rng) => {
      const g = vt(rng); if (!g) return null;
      return mc3(rng, "What is the acceleration in the first part of the journey?", `${g.v / g.t1} m/s²`, [[`${g.v} m/s²`, "That's the top speed. Acceleration is the change in speed divided by the time."], [`${g.v * g.t1} m/s²`, "Divide the change in speed by the time; don't multiply."]], { diagram: g.diagram, hints: ["Acceleration is the gradient of the line.", `Speed goes from 0 to ${g.v} in ${g.t1} seconds.`], solution: [`${g.v} ÷ ${g.t1} = ${g.v / g.t1} m/s²`] });
    }),
    E(4, 2, "deceleration", (rng) => {
      const g = vt(rng); if (!g) return null;
      return mc3(rng, "What is the deceleration in the last part of the journey?", `${g.v / g.d} m/s²`, [[`${g.v / g.t1} m/s²`, "That's the acceleration in the first part."], [`${g.v * g.d} m/s²`, "Divide the change in speed by the time; don't multiply."]], { diagram: g.diagram, hints: ["Deceleration is the size of the negative gradient.", `Speed falls from ${g.v} to 0 in ${g.d} seconds.`], solution: [`${g.v} ÷ ${g.d} = ${g.v / g.d} m/s²`] });
    }),
  ],
  [S(4, 3)]: [
    C(4, 3, "distance-from-graph", (rng) => {
      const g = vt(rng); if (!g) return null;
      const area = (g.v * g.t1) / 2 + g.v * g.h + (g.v * g.d) / 2;
      return mc3(rng, "What is the total distance travelled?", `${area} m`, [[`${g.v * g.T3} m`, "That treats the whole graph as a rectangle. The first and last parts are triangles."], [`${(g.v * g.T3) / 2} m`, "That treats the whole graph as one triangle."]], { diagram: g.diagram, hints: ["Distance is the area under the graph.", "Split it into a triangle, a rectangle and a triangle."], solution: [`Triangle: ½ × ${g.t1} × ${g.v} = ${(g.v * g.t1) / 2}`, `Rectangle: ${g.h} × ${g.v} = ${g.v * g.h}`, `Triangle: ½ × ${g.d} × ${g.v} = ${(g.v * g.d) / 2}`, `Total = ${area} m`] });
    }),
    E(4, 3, "trapezium-rule", (rng) => {
      const w = rng.pick([2, 4, 6]), n = rng.int(3, 4), ys = [0]; for (let i = 1; i <= n; i++) ys.push(rng.int(4, 20));
      const est = (w / 2) * (ys[0] + ys[n] + 2 * ys.slice(1, n).reduce((a, b) => a + b, 0));
      return N(`The speed of a train is measured every ${w} seconds.\nTime (s): ${ys.map((_, i) => i * w).join(", ")}\nSpeed (m/s): ${ys.join(", ")}\nUse trapezia to estimate the distance travelled.`, est, ["Each strip is a trapezium: area = ½ × width × (sum of the two heights).", `Width = ${w}.`], [`Estimate = ½ × ${w} × [${ys[0]} + ${ys[n]} + 2 × (${ys.slice(1, n).join(" + ")})]`, `= ${est} m`], { unit: "m" });
    }),
  ],
  [S(4, 4)]: [
    C(4, 4, "tangent-gradient", (rng) => {
      const dx = rng.pick([2, 4]), m = rng.pick([-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3]), x1 = rng.int(0, 6), y1 = rng.int(2, 20);
      return N(`A tangent to a curve touches it at the point (${x1}, ${y1}). The tangent also passes through the point (${x1 + dx}, ${fmt(clean(y1 + m * dx))}). Find the gradient of the curve at (${x1}, ${y1}).`, m, ["The gradient of the curve at a point is the gradient of the tangent there.", "Gradient = change in y ÷ change in x."], [`Change in y = ${fmt(clean(m * dx))}; change in x = ${dx}`, `Gradient = ${fmt(clean(m * dx))} ÷ ${dx} = ${fmt(m)}`], { traps: [T(clean(1 / m), "Divide change in y by change in x, not the other way round.")] });
    }),
    E(4, 4, "average-rate", (rng) => {
      const ctx = rng.pick([["litres of water in a tank", "litres", "minute"], ["distance from home in metres", "metres", "second"], ["the cost in pounds", "pounds", "month"]]);
      const t1 = rng.int(1, 5), dt = rng.pick([2, 4, 5]), r = rng.pick([1.5, 2, 2.5, 3, 4, 5, 6]), v1 = rng.int(5, 30), v2 = clean(v1 + r * dt);
      return N(`The graph of ${ctx[0]} passes through (${t1}, ${v1}) and (${t1 + dt}, ${fmt(v2)}) where the x-axis is time in ${ctx[2]}s. Find the average rate of change between these times, in ${ctx[1]} per ${ctx[2]}.`, r, ["Average rate of change is change in y ÷ change in x.", `Change in y = ${fmt(v2)} − ${v1}.`], [`${fmt(v2)} − ${v1} = ${fmt(clean(v2 - v1))}`, `${fmt(clean(v2 - v1))} ÷ ${dt} = ${fmt(r)} ${ctx[1]} per ${ctx[2]}`], { unit: `${ctx[1]} per ${ctx[2]}` });
    }),
  ],
};

export const Y11A_GENERATORS = { ...U1, ...U2, ...U3, ...U4 };
