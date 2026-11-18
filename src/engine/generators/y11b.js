/* ==========================================================================
   Year 11 generators, Part B: Units 5–8 (light format: core + extend)
   Further algebra · Circle theorems · Transformations · Statistics review
   Circle theorem questions use the circle diagram with 3-option multiple choice.
   ========================================================================== */
import { clean, fmt, gcd, round } from "../numbers.js";
import { core, extend, mc3, multi, num, polyText, reuse, T } from "./helpers.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y9B_GENERATORS } from "./y9b.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10C_GENERATORS } from "./y10c.js";

const S = (u, l) => `y11-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, make, v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, make, v);
const ALL = { ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS };
const from = (id, level) => ALL[id].find((g) => g.level === level);
const R = (gen, u, l, level, name) => reuse(gen, S(u, l), level, name);
const N = (prompt, value, hints, solution, o = {}) => num(prompt, value, { hints, solution, ...o });
const nz = (rng, a, b) => rng.nonZero(a, b);
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const br = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));
const col = (a, b) => `(${fmt(a)}, ${fmt(b)})`;
const fr = (n, d) => (d === 1 ? String(n) : `{${n}/${d}}`);
const dpn = (prompt, exact, dp, unit, hints, steps, o = {}) => {
  const f = 10 ** dp;
  if (Math.abs((Math.abs(exact) * f) % 1 - 0.5) < 1e-4) return null;
  return num(prompt, round(exact, dp), { dp, unit, hints, solution: [...steps, `= ${fmt(round(exact, dp), dp)}${unit ? " " + unit : ""}`], traps: o.traps ?? [], data: { exact, dp } });
};
const dpValid = (q) => Math.abs(round(q.data.exact, q.data.dp) - q.answer.value) < 1e-9;
// Multiple choice from a bank of [prompt, correct, wrong1, wrong2, hint, explanation]
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, "Think again about what this word or fact really means."], [w2, "Think again about what this word or fact really means."]], { hints: [hint, "Rule out the options that don't fit."], solution: [why] });
};

/* ---------------- Unit 5: Further algebra ---------------- */
const U5 = {
  [S(5, 1)]: [
    C(5, 1, "x-squared-inequality", (rng) => {
      const a = rng.int(2, 9), less = rng.chance(0.5), strict = rng.chance(0.5), L = strict ? "<" : "≤", G = strict ? ">" : "≥";
      const right = less ? `${fmt(-a)} ${L} x ${L} ${a}` : `x ${L} ${fmt(-a)} or x ${G} ${a}`;
      const w1 = less ? `x ${L} ${a}` : `x ${G} ${a}`;
      const w2 = less ? `x ${L} ${fmt(-a)} or x ${G} ${a}` : `${fmt(-a)} ${L} x ${L} ${a}`;
      return mc3(rng, `Solve x² ${less ? L : G} ${a * a}.`, right, [[w1, "x could also be negative: −" + a + " squared is " + a * a + " too."], [w2, "Check which region of the graph y = x² − " + a * a + " is below or above the x-axis."]], {
        hints: [`The boundary values are x = ${a} and x = ${fmt(-a)}.`, `Sketch y = x² − ${a * a}: it is ${less ? "below" : "above"} the x-axis ${less ? "between" : "outside"} the roots.`],
        solution: [`x² = ${a * a} gives x = ±${a}`, `The graph is a U shape, so x² ${less ? L : G} ${a * a} ${less ? "between the roots" : "outside the roots"}.`, `Answer: ${right}`],
      });
    }),
    E(5, 1, "factorised-inequality", (rng) => {
      const p = rng.int(-6, 3), q = p + rng.int(1, 7); if (p === 0 || q === 0) return null;
      const less = rng.chance(0.5), strict = rng.chance(0.5), L = strict ? "<" : "≤", G = strict ? ">" : "≥";
      const between = (a, b) => `${fmt(a)} ${L} x ${L} ${fmt(b)}`, outside = (a, b) => `x ${L} ${fmt(a)} or x ${G} ${fmt(b)}`;
      const right = less ? between(p, q) : outside(p, q), w1 = less ? outside(p, q) : between(p, q), w2 = less ? between(-q, -p) : outside(-q, -p);
      return mc3(rng, `Solve ${polyText([1, -(p + q), p * q])} ${less ? L : G} 0.`, right, [[w1, "You have the roots right but the wrong region. Sketch the U-shaped graph."], [w2, "Check the signs of the roots: (x − p)(x − q) = 0 gives x = p and x = q."]], {
        hints: ["Factorise to find the roots, then sketch the graph.", `The roots are x = ${fmt(p)} and x = ${fmt(q)}.`],
        solution: [`${polyText([1, -(p + q), p * q])} = (x ${sg(-p)})(x ${sg(-q)})`, `Roots: x = ${fmt(p)} and x = ${fmt(q)}`, `The graph is U-shaped, so it is ${less ? "below" : "above"} the axis ${less ? "between" : "outside"} the roots: ${right}`],
      });
    }),
  ],
  [S(5, 2)]: [
    C(5, 2, "radius-from-equation", (rng) => {
      const r = rng.int(2, 15);
      return N(`A circle has equation x² + y² = ${r * r}. What is its radius?`, r, ["The equation of a circle with centre (0, 0) is x² + y² = r².", `Take the square root of ${r * r}.`], [`r² = ${r * r}`, `r = √${r * r} = ${r}`], { traps: [T(r * r, "That's r². Take the square root."), T(clean((r * r) / 2), "Don't halve it: take the square root.")] });
    }),
    E(5, 2, "centre-and-radius", (rng) => {
      const a = nz(rng, -7, 7), b = nz(rng, -7, 7), r = rng.int(2, 9);
      const half = (n, v) => `(${v} ${n < 0 ? "+" : "−"} ${Math.abs(n)})²`;
      return multi(`A circle has equation ${half(a, "x")} + ${half(b, "y")} = ${r * r}. Find the coordinates of its centre and its radius.`, [["centre x =", a, undefined, [T(-a, `(x − a)² has centre x = a, so check the sign.`)]], ["centre y =", b, undefined, [T(-b, `(y − b)² has centre y = b, so check the sign.`)]], ["radius =", r, undefined, [T(r * r, "That's r². Take the square root.")]]], {
        answerText: `centre ${col(a, b)}, radius ${r}`,
        hints: ["The equation is (x − a)² + (y − b)² = r², with centre (a, b).", "Be careful with signs: (x + 3)² means a = −3."],
        solution: [`Centre = ${col(a, b)}`, `r² = ${r * r}, so r = ${r}`],
      });
    }),
  ],
  [S(5, 3)]: (() => {
    const PAIRS = [[3, 4, 5], [6, 8, 10], [12, 5, 13], [15, 8, 17], [24, 10, 26], [21, 20, 29], [9, 40, 41], [30, 40, 50], [12, 16, 20]];
    const pick = (rng) => { const [px, py, r] = rng.pick(PAIRS); return { x: rng.chance(0.5) ? px : -px, y: rng.chance(0.5) ? py : -py, r }; };
    return [
      C(5, 3, "tangent-gradient", (rng) => {
        const { x, y, r } = pick(rng), m = clean(-x / y);
        return N(`The point (${fmt(x)}, ${fmt(y)}) lies on the circle x² + y² = ${r * r}. Find the gradient of the tangent to the circle at this point.`, m, [`First find the gradient of the radius from (0, 0) to (${fmt(x)}, ${fmt(y)}): ${fmt(y)} ÷ ${br(x)}.`, "The tangent is perpendicular to the radius, so the gradients multiply to −1."], [`Gradient of radius = ${fmt(y)}/${br(x)}`, `Gradient of tangent = −${br(x)}/${fmt(y)} = ${fmt(m)}`], { traps: [T(clean(y / x), "That's the gradient of the radius. The tangent is perpendicular."), T(clean(x / y), "Perpendicular gradients are negative reciprocals: change the sign too.")] });
      }),
      E(5, 3, "tangent-equation", (rng) => {
        const { x, y, r } = pick(rng), m = clean(-x / y), c = clean((r * r) / y);
        return multi(`The point (${fmt(x)}, ${fmt(y)}) lies on the circle x² + y² = ${r * r}. The tangent at this point has equation y = mx + c. Find m and c.`, [["m =", m], ["c =", c]], {
          answerText: `y = ${fmt(m)}x ${sg(c)}`,
          hints: ["Gradient of radius = y ÷ x; the tangent's gradient is the negative reciprocal.", "Substitute the point into y = mx + c to find c."],
          solution: [`m = −${br(x)}/${fmt(y)} = ${fmt(m)}`, `${fmt(y)} = ${fmt(m)} × ${br(x)} + c`, `c = ${fmt(c)}`],
        });
      }),
    ];
  })(),
  [S(5, 4)]: [
    C(5, 4, "simple-fraction-equation", (rng) => {
      let a = rng.int(2, 6), b = rng.int(2, 6); if (a === b) return null;
      const l = (a * b) / gcd(a, b), x = l * rng.int(1, 4), c = x / a + x / b;
      return N(`Solve x/${a} + x/${b} = ${c}.`, x, [`Multiply every term by ${l}, the lowest common multiple of ${a} and ${b}.`, `${l / a}x + ${l / b}x = ${l * c}.`], [`${l / a}x + ${l / b}x = ${l * c}`, `${(l / a) + (l / b)}x = ${l * c}`, `x = ${x}`]);
    }),
    E(5, 4, "cross-multiply", (rng) => {
      const a = rng.int(1, 6), b = rng.int(1, 6), p = rng.int(1, 5), x = rng.int(1, 12); if (a === b) return null;
      const qn = (b * (x + p)) / a - x; if (!Number.isInteger(qn) || qn === 0 || x + qn === 0) return null;
      return N(`Solve ${a}/(x ${sg(p)}) = ${b}/(x ${sg(qn)}).`, x, ["Multiply both sides by both denominators (cross-multiply).", `${a}(x ${sg(qn)}) = ${b}(x ${sg(p)}).`], [`${a}(x ${sg(qn)}) = ${b}(x ${sg(p)})`, `${a}x ${sg(a * qn)} = ${b}x ${sg(b * p)}`, `${a * qn - b * p} = ${b - a}x, so x = ${x}`]);
    }),
  ],
};

/* ---------------- Unit 6: Circle theorems ---------------- */
const circ = (o, description) => ({ kind: "circle", ...o, description });
const deg = (n) => `${fmt(n)}°`;
const jit = (rng, n = 8) => rng.int(-n, n);
const U6 = {
  [S(6, 1)]: [
    C(6, 1, "centre-circumference", (rng) => {
      const th = 2 * rng.int(20, 75), toCentre = rng.chance(0.5), a = 90 + th / 2, b = 90 - th / 2;
      const right = toCentre ? th : th / 2, given = toCentre ? th / 2 : th;
      const prompt = toCentre ? `O is the centre of the circle. Angle ACB = ${deg(given)}. Find angle AOB.` : `O is the centre of the circle. Angle AOB = ${deg(given)}. Find angle ACB.`;
      return mc3(rng, prompt, deg(right), [[deg(given), "The angles are not equal: the angle at the centre is twice the angle at the circumference."], [deg(360 - th), "That's the reflex angle at the centre."]], {
        diagram: circ({ points: { A: a, B: b, C: 270 }, lines: [["A", "O"], ["B", "O"], ["A", "C"], ["B", "C"]], angles: [{ at: "O", between: ["A", "B"], text: toCentre ? "?" : deg(given), dist: 30 }, { at: "C", between: ["A", "B"], text: toCentre ? deg(given) : "?", dist: 34 }] }, `A circle with centre O. A, B and C are on the circumference. Angle AOB is ${toCentre ? "unknown" : deg(given)} and angle ACB is ${toCentre ? deg(given) : "unknown"}.`),
        hints: ["The angle at the centre is twice the angle at the circumference.", toCentre ? `Multiply ${deg(given)} by 2.` : `Halve ${deg(given)}.`],
        solution: [`Angle at the centre = 2 × angle at the circumference`, toCentre ? `${given} × 2 = ${right}°` : `${given} ÷ 2 = ${right}°`],
      });
    }),
    E(6, 1, "centre-circumference-algebra", (rng) => {
      const x = rng.int(10, 40), a = rng.int(5, 20), b = 2 * a - x; if (b === 0) return null;
      const circumf = `(x + ${a})°`, centre = `(3x ${sg(b)})°`, th = 2 * (x + a);
      return mc3(rng, `O is the centre of the circle. Angle ACB = ${circumf} and angle AOB = ${centre}. Find the value of x.`, String(x), [[String(x + a), "That's the size of the angle ACB, not x."], [String(2 * x), "Set the centre angle equal to 2 × the circumference angle."]], {
        diagram: circ({ points: { A: 90 + th / 2, B: 90 - th / 2, C: 270 }, lines: [["A", "O"], ["B", "O"], ["A", "C"], ["B", "C"]], angles: [{ at: "O", between: ["A", "B"], text: centre, dist: 34 }, { at: "C", between: ["A", "B"], text: circumf, dist: 40 }] }, `A circle with centre O. Angle AOB is ${centre} and angle ACB is ${circumf}.`),
        hints: ["The angle at the centre is twice the angle at the circumference.", `3x ${sg(b)} = 2(x + ${a}).`],
        solution: [`3x ${sg(b)} = 2(x + ${a}) = 2x + ${2 * a}`, `x = ${2 * a} ${sg(-b)} = ${x}`],
      });
    }),
  ],
  [S(6, 2)]: [
    C(6, 2, "same-segment", (rng) => {
      const th = 5 * rng.int(5, 15);
      return mc3(rng, `A, B, C and D are points on a circle. Angle ACB = ${deg(th)}. Find angle ADB.`, deg(th), [[deg(2 * th), "That would be the angle at the centre. C and D are both on the circumference."], [deg(180 - th), "Angles in the same segment are equal, not supplementary."]], {
        diagram: circ({ points: { A: 270 - th, B: 270 + th, C: 120, D: 60 }, centre: false, lines: [["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]], angles: [{ at: "C", between: ["A", "B"], text: deg(th), dist: 34 }, { at: "D", between: ["A", "B"], text: "?", dist: 34 }] }, `A circle with points A, B, C and D. Angle ACB is ${deg(th)}; angle ADB is unknown.`),
        hints: ["Both angles are made from the same chord AB, and C and D are on the same side of it.", "Angles in the same segment are equal."],
        solution: ["Angles in the same segment are equal.", `Angle ADB = ${th}°`],
      });
    }),
    E(6, 2, "angle-in-semicircle", (rng) => {
      const x = 5 * rng.int(4, 14);
      return mc3(rng, `AB is a diameter of the circle. Angle CAB = ${deg(x)}. Find angle ABC.`, deg(90 - x), [[deg(x), "The two angles aren't equal. First work out angle ACB."], [deg(180 - x), "The angles in the triangle ABC add to 180°, and one of them is 90°."]], {
        diagram: circ({ points: { A: 180, B: 0, C: 2 * x }, centre: false, lines: [["A", "B"], ["A", "C"], ["B", "C"]], angles: [{ at: "A", between: ["B", "C"], text: deg(x), dist: 40 }, { at: "B", between: ["A", "C"], text: "?", dist: 34 }] }, `A circle with diameter AB and point C on the circumference. Angle CAB is ${deg(x)}; angle ABC is unknown.`),
        hints: ["The angle in a semicircle is 90°, so angle ACB = 90°.", "Angles in a triangle add to 180°."],
        solution: ["Angle ACB = 90° (angle in a semicircle)", `Angle ABC = 180 − 90 − ${x} = ${90 - x}°`],
      });
    }),
  ],
  [S(6, 3)]: [
    C(6, 3, "cyclic-quadrilateral", (rng) => {
      const x = 5 * rng.int(12, 26);
      return mc3(rng, `ABCD is a cyclic quadrilateral. Angle ABC = ${deg(x)}. Find angle ADC.`, deg(180 - x), [[deg(x), "Opposite angles in a cyclic quadrilateral add to 180°; they are not equal."], [deg(360 - x), "The four angles add to 360°, but opposite angles add to 180°."]], {
        diagram: circ({ points: { A: 210 + jit(rng), B: 320 + jit(rng), C: 50 + jit(rng), D: 140 + jit(rng) }, centre: false, lines: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]], angles: [{ at: "B", between: ["A", "C"], text: deg(x), dist: 34 }, { at: "D", between: ["A", "C"], text: "?", dist: 34 }] }, `A cyclic quadrilateral ABCD. Angle ABC is ${deg(x)}; angle ADC is unknown.`),
        hints: ["B and D are opposite corners.", "Opposite angles of a cyclic quadrilateral add up to 180°."],
        solution: ["Opposite angles of a cyclic quadrilateral add to 180°.", `Angle ADC = 180 − ${x} = ${180 - x}°`],
      });
    }),
    E(6, 3, "cyclic-algebra", (rng) => {
      const x = rng.int(10, 30), p = rng.int(1, 4), q = rng.int(1, 4), a = rng.int(5, 30), ang = p * x + a;
      if (ang < 45 || ang > 135) return null;
      const b = 180 - ang - q * x, e1 = `(${p === 1 ? "" : p}x + ${a})°`, e2 = `(${q === 1 ? "" : q}x ${sg(b)})°`;
      return mc3(rng, `ABCD is a cyclic quadrilateral. Angle ABC = ${e1} and angle ADC = ${e2}. Find the value of x.`, String(x), [[String(ang), "That's the size of angle ABC, not the value of x."], [String(x + 10), "Set the two expressions equal to 180 in total, then solve."]], {
        diagram: circ({ points: { A: 210 + jit(rng), B: 320 + jit(rng), C: 50 + jit(rng), D: 140 + jit(rng) }, centre: false, lines: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]], angles: [{ at: "B", between: ["A", "C"], text: e1, dist: 42 }, { at: "D", between: ["A", "C"], text: e2, dist: 42 }] }, `A cyclic quadrilateral ABCD. Angle ABC is ${e1} and angle ADC is ${e2}.`),
        hints: ["Opposite angles add up to 180°.", `${e1.slice(1, -2)} + ${e2.slice(1, -2)} = 180.`],
        solution: [`(${p}x + ${a}) + (${q}x ${sg(b)}) = 180`, `${p + q}x ${sg(a + b)} = 180`, `x = ${x}`],
      });
    }),
  ],
  [S(6, 4)]: [
    C(6, 4, "two-tangents-angle", (rng) => {
      const th = rng.int(76, 120), real = (180 - th) / 2, ad = Math.min(52, Math.max(28, real)), dist = 1 / Math.cos((ad * Math.PI) / 180);
      return mc3(rng, `PA and PB are tangents to a circle with centre O. Angle APB = ${deg(th)}. Find angle AOB.`, deg(180 - th), [[deg(th), "Angle AOB and angle APB aren't equal."], [deg(360 - th), "Use the quadrilateral OAPB: the angles add to 360°, and two of them are 90°."]], {
        diagram: circ({ points: { A: ad, B: -ad }, external: { P: [0, dist] }, lines: [["P", "A"], ["P", "B"], ["O", "A"], ["O", "B"]], angles: [{ at: "P", between: ["A", "B"], text: deg(th), dist: 36 }, { at: "O", between: ["A", "B"], text: "?", dist: 34 }] }, `Tangents PA and PB meet at P. Angle APB is ${deg(th)}; angle AOB is unknown.`),
        hints: ["A tangent meets the radius at 90°, so angles OAP and OBP are 90°.", "Angles in a quadrilateral add to 360°."],
        solution: ["Angle OAP = angle OBP = 90° (tangent ⟂ radius)", `Angle AOB = 360 − 90 − 90 − ${th} = ${180 - th}°`],
      });
    }),
    E(6, 4, "tangent-length", (rng) => {
      const r = rng.int(3, 12), op = r + rng.int(2, 12);
      return dpn(`PA is a tangent to a circle with centre O and radius ${r} cm, touching the circle at A. OP = ${op} cm. Work out the length of PA, to 1 decimal place.`, Math.sqrt(op * op - r * r), 1, "cm", ["The tangent meets the radius at 90°, so triangle OAP is right-angled at A.", `OP is the hypotenuse: PA² = ${op}² − ${r}².`], [`PA² = ${op * op} − ${r * r} = ${op * op - r * r}`, `PA = √${op * op - r * r}`], { traps: [T(op - r, "Use Pythagoras; lengths don't simply subtract.")] });
    }, dpValid),
  ],
  [S(6, 5)]: [
    C(6, 5, "alternate-segment", (rng) => {
      const th = 5 * rng.int(6, 14), al = 15 * rng.int(0, 23);
      return mc3(rng, `TA is a tangent to the circle at A. Angle TAB = ${deg(th)}. Find angle ACB.`, deg(th), [[deg(2 * th), "That would be the angle at the centre."], [deg(180 - th), "The alternate segment theorem says the angles are equal."]], {
        diagram: circ({ points: { A: al, B: al + 2 * th, C: al + 180 + th }, external: { T: [al + 35, 1.22] }, centre: false, tangent: "A", lines: [["A", "B"], ["C", "A"], ["C", "B"]], angles: [{ at: "A", between: ["T", "B"], text: deg(th), dist: 38 }, { at: "C", between: ["A", "B"], text: "?", dist: 34 }] }, `A circle with a tangent TA at A. Angle TAB is ${deg(th)}; angle ACB is unknown.`),
        hints: ["The angle between a tangent and a chord equals the angle in the alternate segment.", "C is in the alternate segment."],
        solution: ["Alternate segment theorem: the angle between the tangent and chord equals the angle in the alternate segment.", `Angle ACB = ${th}°`],
      });
    }),
    E(6, 5, "alternate-segment-algebra", (rng) => {
      const x = rng.int(10, 30), p = rng.int(2, 4), q = p + rng.int(1, 3), a = rng.int(5, 20), ang = p * x + a;
      if (ang > 80) return null;
      const b = q * x - ang; if (b === 0) return null;
      const e1 = `(${p}x + ${a})°`, e2 = `(${q}x ${sg(-b)})°`, al = 15 * rng.int(0, 23);
      return mc3(rng, `TA is a tangent to the circle at A. Angle TAB = ${e1} and angle ACB = ${e2}. Find the value of x.`, String(x), [[String(ang), "That's the size of the angle, not the value of x."], [String(2 * x), "The two angles are equal. Set the expressions equal and solve."]], {
        diagram: circ({ points: { A: al, B: al + 2 * ang, C: al + 180 + ang }, external: { T: [al + 35, 1.22] }, centre: false, tangent: "A", lines: [["A", "B"], ["C", "A"], ["C", "B"]], angles: [{ at: "A", between: ["T", "B"], text: e1, dist: 46 }, { at: "C", between: ["A", "B"], text: e2, dist: 44 }] }, `A circle with a tangent TA at A. Angle TAB is ${e1} and angle ACB is ${e2}.`),
        hints: ["Alternate segment theorem: the two angles are equal.", `${p}x + ${a} = ${q}x ${sg(-b)}.`],
        solution: [`${p}x + ${a} = ${q}x ${sg(-b)}`, `${a + b} = ${q - p}x`, `x = ${x}`],
      });
    }),
  ],
  [S(6, 6)]: [
    C(6, 6, "proof-steps", (rng) => bankMC(rng, [
      ["In the proof that the angle at the centre is twice the angle at the circumference, why is triangle OAC isosceles?", "OA and OC are both radii", "AC is a diameter", "Angle OAC is 90°", "Think about what O, A and C are.", "O is the centre and A, C are on the circle, so OA = OC (radii)."],
      ["In the proof that opposite angles of a cyclic quadrilateral add to 180°, the angles at the centre are 2x and 2y. Why does 2x + 2y = 360°?", "Angles around a point add to 360°", "Angles in a triangle add to 180°", "Angles on a straight line add to 180°", "The two angles at the centre make a full turn.", "The angles at the centre fill the whole space around O: 360°."],
      ["Two tangents PA and PB are drawn to a circle with centre O. Triangles OAP and OBP have OA = OB, OP common and right angles at A and B. Which condition shows they are congruent?", "RHS (right angle, hypotenuse, side)", "AAA", "SSS using the angle at P", "The triangles share the hypotenuse OP.", "Right angle, hypotenuse and one other side: RHS."],
      ["In a proof you write ‘angle ABD = angle ACD’. What is the correct reason?", "Angles in the same segment are equal", "The angle at the centre is twice the angle at the circumference", "Alternate angles are equal", "B and C are both on the same side of chord AD.", "Both angles stand on the chord AD from the same side."],
      ["To prove the angle in a semicircle is 90°, you use the angle at the centre. Which fact do you use?", "The angle at the centre is twice the angle at the circumference", "Opposite angles of a cyclic quadrilateral add to 180°", "The angle between a tangent and a radius is 90°", "The diameter makes a straight line through the centre: 180°.", "The angle at the centre is 180°, so the angle at the circumference is 90°."],
    ])),
    E(6, 6, "give-a-reason", (rng) => bankMC(rng, [
      ["ABCD is a cyclic quadrilateral. Angle ABC + angle ADC = 180°. What is the reason?", "Opposite angles in a cyclic quadrilateral add up to 180°", "Angles on a straight line add up to 180°", "Angles in a triangle add up to 180°", "ABCD has all four corners on the circle.", "That's the cyclic quadrilateral theorem."],
      ["Angle OAT = 90°, where T is on a tangent at A. What is the reason?", "The angle between a tangent and a radius is 90°", "The angle in a semicircle is 90°", "Angles on a straight line add up to 180°", "OA is a radius and AT is a tangent.", "A tangent is perpendicular to the radius at the point of contact."],
      ["AC is a diameter and angle ABC = 90°. What is the reason?", "The angle in a semicircle is 90°", "The angle between a tangent and a radius is 90°", "Angles in the same segment are equal", "B is on the circumference and AC is the diameter.", "That's the angle in a semicircle theorem."],
      ["Angle AOB = 100° at the centre, so angle ACB = 50° at the circumference. What is the reason?", "The angle at the centre is twice the angle at the circumference", "Angles in the same segment are equal", "Angles in a triangle add up to 180°", "Compare 100° with 50°.", "The angle at the centre is double."],
      ["The angle between a tangent and a chord equals an angle in the opposite segment. What is the name of this theorem?", "The alternate segment theorem", "The angle at the centre theorem", "The cyclic quadrilateral theorem", "The word ‘alternate’ refers to the other segment.", "That's the alternate segment theorem."],
      ["Which of these is NOT an acceptable reason in a circle theorem proof?", "The angles look equal in the diagram", "OA = OB because they are both radii", "Angles around a point add up to 360°", "Diagrams are not drawn accurately.", "You can't rely on how a diagram looks: you need a proper reason."],
    ])),
  ],
};

/* ---------------- Unit 7: Transformations and enlargement ---------------- */
const U7 = {
  [S(7, 1)]: [
    C(7, 1, "enlarge-origin", (rng) => {
      const a = rng.int(-6, 6), b = rng.int(-6, 6), k = rng.int(2, 4); if (a === 0 && b === 0) return null;
      return multi(`The point P(${fmt(a)}, ${fmt(b)}) is enlarged by scale factor ${k}, with centre (0, 0). Find the image of P.`, [["x =", a * k], ["y =", b * k]], { answerText: col(a * k, b * k), hints: ["Multiply each coordinate by the scale factor.", `${fmt(a)} × ${k} and ${fmt(b)} × ${k}.`], solution: [`${col(a, b)} × ${k} = ${col(a * k, b * k)}`] });
    }),
    E(7, 1, "enlarge-centre", (rng) => {
      const a = rng.int(-6, 6), b = rng.int(-6, 6), p = rng.int(-4, 4), q = rng.int(-4, 4), k = rng.int(2, 4); if ((a === p && b === q) || (p === 0 && q === 0)) return null;
      const x = p + k * (a - p), y = q + k * (b - q);
      return multi(`The point P(${fmt(a)}, ${fmt(b)}) is enlarged by scale factor ${k}, with centre (${fmt(p)}, ${fmt(q)}). Find the image of P.`, [["x =", x], ["y =", y]], { answerText: col(x, y), hints: ["Find the vector from the centre to P, then multiply it by the scale factor.", `The vector from the centre to P is (${fmt(a - p)}, ${fmt(b - q)}).`], solution: [`Centre to P = (${fmt(a - p)}, ${fmt(b - q)})`, `× ${k} = (${fmt(k * (a - p))}, ${fmt(k * (b - q))})`, `Add to the centre: ${col(x, y)}`] });
    }),
  ],
  [S(7, 2)]: [
    C(7, 2, "fractional-origin", (rng) => {
      const [n, d] = rng.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]), a = d * rng.int(-4, 4), b = d * rng.int(-4, 4); if (a === 0 && b === 0) return null;
      return multi(`The point P(${fmt(a)}, ${fmt(b)}) is enlarged by scale factor ${fr(n, d)}, with centre (0, 0). Find the image of P.`, [["x =", (a * n) / d], ["y =", (b * n) / d]], { answerText: col((a * n) / d, (b * n) / d), hints: ["Multiply each coordinate by the scale factor.", `Multiplying by ${fr(n, d)} means dividing by ${d} then multiplying by ${n}.`], solution: [`${fmt(a)} × ${fr(n, d)} = ${fmt((a * n) / d)}`, `${fmt(b)} × ${fr(n, d)} = ${fmt((b * n) / d)}`] });
    }),
    E(7, 2, "scale-factor-diagram", (rng) => {
      const [n, d] = rng.pick([[1, 2], [1, 3], [2, 3]]), s = 6 * n / d, A = [[-7, -5], [-1, -5], [-7, 1], [-7, -5]], B = [[2, -5], [2 + s, -5], [2, -5 + s], [2, -5]];
      return mc3(rng, "Triangle B is an enlargement of triangle A. What is the scale factor?", fr(n, d), [[fr(d, n), "That's the reciprocal. B is smaller than A, so the scale factor is less than 1."], [fr(1, d + 1), "Compare the lengths of matching sides: B's base ÷ A's base."]], {
        diagram: { kind: "graph", x: [-8, 8], y: [-6, 6], xStep: 1, yStep: 1, labelEvery: 2, curves: [{ points: A, label: "A", labelAt: A[1] }, { points: B, label: "B", labelAt: B[1] }], description: `Triangle A has a base of 6 squares. Triangle B has a base of ${s} squares.` },
        hints: ["Scale factor = length on the image ÷ matching length on the original.", "Compare the bases of the two triangles."],
        solution: ["Base of A = 6, base of B = " + s, `Scale factor = ${s} ÷ 6 = ${fr(n, d)}`],
      });
    }),
  ],
  [S(7, 3)]: [
    C(7, 3, "negative-origin", (rng) => {
      const a = rng.int(-6, 6), b = rng.int(-6, 6), k = rng.pick([-1, -2, -3]); if (a === 0 && b === 0) return null;
      return multi(`The point P(${fmt(a)}, ${fmt(b)}) is enlarged by scale factor ${fmt(k)}, with centre (0, 0). Find the image of P.`, [["x =", a * k], ["y =", b * k]], { answerText: col(a * k, b * k), hints: ["A negative scale factor puts the image on the opposite side of the centre.", `Multiply each coordinate by ${fmt(k)}.`], solution: [`${col(a, b)} × ${fmt(k)} = ${col(a * k, b * k)}`] });
    }),
    E(7, 3, "negative-centre", (rng) => {
      const a = rng.int(-6, 6), b = rng.int(-6, 6), p = rng.int(-4, 4), q = rng.int(-4, 4), k = rng.pick([-1, -2, -3]); if ((a === p && b === q) || (p === 0 && q === 0)) return null;
      const x = p + k * (a - p), y = q + k * (b - q);
      return multi(`The point P(${fmt(a)}, ${fmt(b)}) is enlarged by scale factor ${fmt(k)}, with centre (${fmt(p)}, ${fmt(q)}). Find the image of P.`, [["x =", x], ["y =", y]], { answerText: col(x, y), hints: ["Find the vector from the centre to P, multiply it by the scale factor, and add it to the centre.", `The vector from the centre to P is (${fmt(a - p)}, ${fmt(b - q)}).`], solution: [`Centre to P = (${fmt(a - p)}, ${fmt(b - q)})`, `× ${fmt(k)} = (${fmt(k * (a - p))}, ${fmt(k * (b - q))})`, `Add to the centre: ${col(x, y)}`] });
    }),
  ],
  [S(7, 4)]: [
    C(7, 4, "two-transformations", (rng) => {
      const T0 = [["reflected in the x-axis", ([x, y]) => [x, -y]], ["reflected in the y-axis", ([x, y]) => [-x, y]], ["rotated 180° about the origin", ([x, y]) => [-x, -y]], ["reflected in the line y = x", ([x, y]) => [y, x]]];
      const i = rng.int(0, 3); let j = rng.int(0, 3); if (i === j) return null;
      const p = [rng.int(-6, 6), rng.int(-6, 6)]; if (p[0] === p[1] || p[0] === 0 || p[1] === 0) return null;
      const mid = T0[i][1](p), end = T0[j][1](mid);
      return multi(`The point P(${fmt(p[0])}, ${fmt(p[1])}) is ${T0[i][0]} and then ${T0[j][0]}. Find the coordinates of the final image.`, [["x =", end[0]], ["y =", end[1]]], { answerText: col(end[0], end[1]), hints: ["Do the first transformation, write down the new point, then do the second.", `After the first: ${col(mid[0], mid[1])}.`], solution: [`${col(p[0], p[1])} → ${col(mid[0], mid[1])} (${T0[i][0]})`, `→ ${col(end[0], end[1])} (${T0[j][0]})`] });
    }),
    E(7, 4, "invariant-point", (rng) => {
      const kind = rng.int(0, 2), p = nz(rng, -6, 6), q = nz(rng, -6, 6), s = rng.pick([2, 3, -2]); if (p === q || p === -q) return null;
      if (kind === 0) return mc3(rng, `Which of these points is invariant under a reflection in the line x = ${fmt(p)}?`, col(p, q), [[col(q, p), "A point is invariant only if it lies on the mirror line, where x = " + fmt(p) + "."], [col(-p, q), "That point is reflected to a different position."]], { hints: ["An invariant point doesn't move.", "Points on the mirror line stay where they are."], solution: [`Points on the line x = ${fmt(p)} don't move, so ${col(p, q)} is invariant.`] });
      if (kind === 1) return mc3(rng, `Which point is invariant under a rotation of 180° about ${col(p, q)}?`, col(p, q), [[col(q, p), "Only the centre of rotation stays fixed."], [col(-p, -q), "That point moves under a rotation about " + col(p, q) + "."]], { hints: ["An invariant point doesn't move.", "Which point stays fixed in a rotation?"], solution: ["The centre of rotation is the only invariant point."] });
      return mc3(rng, `Which point is invariant under an enlargement with scale factor ${fmt(s)} and centre ${col(p, q)}?`, col(p, q), [[col(s * p, s * q), "Only the centre of enlargement stays fixed."], [col(q, p), "Only the centre of enlargement stays fixed."]], { hints: ["An invariant point doesn't move.", "Which point stays fixed in an enlargement?"], solution: ["The centre of enlargement is the only invariant point."] });
    }),
  ],
};

/* ---------------- Unit 8: Statistics and probability review ---------------- */
const U8 = {
  [S(8, 1)]: [
    C(8, 1, "choose-diagram", (rng) => bankMC(rng, [
      ["Which diagram is best for showing what proportion of a company's sales come from each of five products?", "Pie chart", "Scatter graph", "Line graph", "You need to compare parts of a whole.", "A pie chart shows how a total is shared."],
      ["Which diagram is best for investigating whether students who revise longer score higher marks?", "Scatter graph", "Pie chart", "Bar chart", "There are two numbers for each student.", "A scatter graph shows the relationship between two variables."],
      ["Which diagram is best for showing how the temperature in a town changes through one day?", "Line graph", "Pie chart", "Scatter graph", "The data is recorded over time.", "A line graph shows change over time."],
      ["Which diagram is best for comparing the number of students who chose each of six sports?", "Bar chart", "Scatter graph", "Line graph", "The data is in separate categories.", "A bar chart compares category frequencies."],
      ["Which diagram is best for comparing the median and spread of marks of two classes?", "Box plots", "Pie charts", "Line graph", "You need the median and quartiles for both classes.", "Box plots show the median and quartiles side by side."],
    ])),
    E(8, 1, "choose-diagram-higher", (rng) => bankMC(rng, [
      ["Heights of 200 students are grouped into classes of different widths. Which diagram should be used?", "Histogram", "Pie chart", "Pictogram", "The class widths are unequal.", "A histogram uses frequency density when class widths differ."],
      ["Which graph can be used to read off the median and quartiles from grouped data?", "Cumulative frequency graph", "Pie chart", "Pictogram", "You need running totals.", "A cumulative frequency graph lets you read median and quartiles."],
      ["Frequency density is plotted on the vertical axis of which diagram?", "Histogram", "Bar chart", "Scatter graph", "It's used when class widths are not equal.", "A histogram has frequency density on the vertical axis."],
      ["A teacher wants to compare the full distributions of two large data sets using the quartiles. Which diagram is best?", "Box plot", "Pie chart", "Frequency table", "Quartiles and the median are shown.", "Box plots show median, quartiles and range."],
    ])),
  ],
  [S(8, 2)]: [
    R(from("y9-u12-l4", 1), 8, 2, 1, "biased-sample"),
    E(8, 2, "critique-statistics", (rng) => bankMC(rng, [
      ["A newspaper graph has a y-axis starting at 96 instead of 0, which makes a small rise look huge. What is wrong with it?", "The axis is truncated, which exaggerates the change", "The graph has too many colours", "Nothing: graphs always show data fairly", "Look at where the vertical axis starts.", "A truncated axis makes small changes look large."],
      ["A survey asks, ‘Don't you agree our excellent café is the best in town?’ What is the problem?", "It's a leading question, so the results are biased", "The sample is too large", "The question is too short", "Does the question push people towards an answer?", "A leading question encourages one answer."],
      ["100 people outside a gym are asked how often they exercise. Why might the sample be unrepresentative?", "They are more likely than average to exercise often", "It is a random sample of the town", "100 is too many people", "Where were the people chosen?", "People at a gym aren't typical of the whole town."],
      ["Ice-cream sales and sunburn cases are positively correlated. Which conclusion is justified?", "Hot weather may be a common cause of both", "Ice cream causes sunburn", "Sunburn makes people buy ice cream", "Correlation does not prove causation.", "A third factor, such as the weather, may explain both."],
      ["40% of Class A (20 students) and 40% of Class B (80 students) prefer tea. Which statement is correct?", "More students in Class B prefer tea", "The same number prefer tea in both classes", "More students in Class A prefer tea", "Work out 40% of each class.", "40% of 80 = 32 is more than 40% of 20 = 8."],
      ["A firm's mean salary is £42,000 but its median is £28,000. Which is the better ‘typical’ salary?", "The median, because a few very high salaries pull the mean up", "The mean, because it uses every value", "The range, because it shows the spread", "Think about extreme values.", "The median isn't affected by a few very high salaries."],
    ])),
  ],
  [S(8, 3)]: [R(from("y10-u12-l1", 1), 8, 3, 1, "tree-diagram-independent"), R(from("y10-u12-l2", 2), 8, 3, 2, "tree-diagram-one-of-each")],
  [S(8, 4)]: [R(from("y10-u11-l4", 1), 8, 4, 1, "compare-statements"), R(from("y10-u11-l5", 2), 8, 4, 2, "histogram-frequency")],
};

export const Y11B_GENERATORS = { ...U5, ...U6, ...U7, ...U8 };
