/* ==========================================================================
   Year 9 generators, Units 1–7
   (Rounding and accuracy · Indices and standard form · Prime factorisation ·
    Brackets and factorising · Inequalities and formulae · Linear graphs ·
    Sequences)
   Light format: core (Level 1) and extend (Level 2) for each lesson.
   Where a Year 9 skill is exactly one already built for Year 10, the
   generator is reused (reuse()) rather than written twice.
   ========================================================================== */
import { clean, fmt, gcd, lcm, round } from "../numbers.js";
import { core, expr, extend, lin, linExpr, mc3, multi, num, plot, polyExpr, polyMul, polyText, reuse, sgn, T } from "./helpers.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";

const S = (u, l) => `y9-u${u}-l${l}`;
const nz = (rng, a, b) => rng.nonZero(a, b);
const y10 = (id, level) => ({ ...Y10A_GENERATORS, ...Y10B_GENERATORS })[id].find((g) => g.level === level);
const mag = (x) => Math.floor(Math.log10(Math.abs(x)));
const sfRound = (x, sf) => round(x, sf - 1 - mag(x));
const sfDp = (x, sf) => Math.max(0, sf - 1 - mag(x));
const lineEq = (m, c) => `y = ${m === 1 ? "" : m === -1 ? "−" : fmt(m)}x${c === 0 ? "" : " " + sgn(c)}`;

/* =============================== UNIT 1: Rounding, estimation and accuracy =============================== */
const U1 = {
  [S(1, 1)]: [
    core(S(1, 1), "round-sf", "Rounding to significant figures", (rng) => {
      const x = rng.chance(0.5) ? rng.int(1001, 99999) : clean(rng.int(1001, 9999) / 10 ** rng.int(4, 6));
      const sf = rng.pick([1, 2, 3]);
      const value = sfRound(x, sf), dp = sfDp(x, sf);
      if (value === x) return null;
      return num(`Round ${fmt(x)} to ${sf} significant figure${sf > 1 ? "s" : ""}.`, value, {
        ...(dp > 0 ? { dp } : {}),
        traps: [T(round(x, sf), `That's ${sf} decimal place${sf > 1 ? "s" : ""}. Significant figures start counting from the first non-zero digit.`)],
        hints: ["Find the first non-zero digit: that is the 1st significant figure.", `Count ${sf} significant figure${sf > 1 ? "s" : ""}, then look at the next digit to decide whether to round up.`],
        solution: [`The first significant figure is the first non-zero digit.`, `${fmt(x)} ≈ ${dp > 0 ? fmt(value, dp) : fmt(value)} (${sf} s.f.)`], data: { x, sf },
      });
    }, (q) => Math.abs(Number(q.data.x.toPrecision(q.data.sf)) - q.answer.value) < 1e-12),
    extend(S(1, 1), "round-sf-zeros", "Significant figures with zeros", (rng) => {
      // Values that round up to a number needing trailing zeros, e.g. 0.04997 → 0.0500
      const sf = rng.pick([2, 3]);
      const p = rng.int(1, 3);
      const lead = rng.int(1, 8);
      const x = clean((lead + 1 - 0.003 * rng.int(1, 2)) / 10 ** p);
      const value = sfRound(x, sf), dp = sfDp(x, sf);
      return num(`Round ${fmt(x)} to ${sf} significant figures.`, value, {
        ...(dp > 0 ? { dp } : {}),
        hints: ["Zeros at the start of a decimal are not significant.", "Rounding up can carry into the next column. Keep any zeros needed to show the accuracy."],
        solution: [`${fmt(x)} ≈ ${dp > 0 ? fmt(value, dp) : fmt(value)} (${sf} s.f.)`, "The final zeros show that the answer is accurate to " + sf + " significant figures."], data: { x, sf },
      });
    }, (q) => Math.abs(Number(q.data.x.toPrecision(q.data.sf)) - q.answer.value) < 1e-12),
  ],
  [S(1, 2)]: [
    core(S(1, 2), "estimate-fraction", "Estimating a calculation", (rng) => {
      const A = rng.int(2, 9) * 10, B = rng.int(2, 9), C = rng.pick([2, 3, 4, 5, 6, 10]);
      if ((A * B) % C !== 0) return null;
      const a = clean(A + rng.nonZero(-4, 4) + rng.int(0, 9) / 10), b = clean(B + rng.nonZero(-4, 4) / 10), c = clean(C + rng.nonZero(-4, 4) / 10);
      const value = (A * B) / C;
      return num(`Estimate the value of (${fmt(a)} × ${fmt(b)}) ÷ ${fmt(c)} by rounding each number to 1 significant figure.`, value, {
        traps: [T(round((a * b) / c, 1), "That's (close to) the exact answer. Round first, then calculate.")],
        hints: ["Round each number to 1 significant figure.", `${fmt(a)} ≈ ${A}, ${fmt(b)} ≈ ${B}, ${fmt(c)} ≈ ${C}.`],
        solution: [`(${A} × ${B}) ÷ ${C}`, `= ${A * B} ÷ ${C} = ${fmt(value)}`], data: { a, b, c },
      });
    }, (q) => Math.abs(sfRound(q.data.a, 1) * sfRound(q.data.b, 1) / sfRound(q.data.c, 1) - q.answer.value) < 1e-9),
    extend(S(1, 2), "estimate-decimal-divisor", "Estimating with small decimals", (rng) => {
      const A = rng.int(2, 9), B = rng.int(1, 9) * 10, D = rng.pick([0.2, 0.5]);
      const a = clean(A + rng.nonZero(-3, 3) / 10), b = clean(B + rng.nonZero(-4, 4)), d = clean(D + rng.nonZero(-3, 3) / 100);
      const value = clean((A * B) / D);
      return num(`Estimate ${fmt(a)} × ${fmt(b)} ÷ ${fmt(d)} by rounding each number to 1 significant figure.`, value, {
        traps: [T(clean(A * B * D), `Dividing by ${D} makes the answer bigger, not smaller.`)],
        hints: [`${fmt(a)} ≈ ${A}, ${fmt(b)} ≈ ${B}, ${fmt(d)} ≈ ${D}.`, `Dividing by ${D} is the same as multiplying by ${1 / D}.`],
        solution: [`${A} × ${B} = ${A * B}`, `${A * B} ÷ ${D} = ${A * B} × ${1 / D} = ${fmt(value)}`], data: { a, b, d },
      });
    }, (q) => Math.abs(sfRound(q.data.a, 1) * sfRound(q.data.b, 1) / sfRound(q.data.d, 1) - q.answer.value) < 1e-9),
  ],
  [S(1, 3)]: [
    core(S(1, 3), "error-interval-whole", "Error intervals", (rng) => {
      const to = rng.pick([1, 10, 100]);
      const n = rng.int(3, 90) * to;
      return multi(`A number is ${fmt(n)}, rounded to the nearest ${to === 1 ? "whole number" : fmt(to)}. Write its error interval: lower bound ≤ x < upper bound.`, [["Lower bound:", n - to / 2], ["Upper bound:", n + to / 2]], {
        answerText: `${fmt(n - to / 2)} ≤ x < ${fmt(n + to / 2)}`,
        hints: [`Half of ${fmt(to)} is ${fmt(to / 2)}.`, `Go ${fmt(to / 2)} below and ${fmt(to / 2)} above ${fmt(n)}.`],
        solution: [`Half the rounding unit is ${fmt(to / 2)}`, `${fmt(n - to / 2)} ≤ x < ${fmt(n + to / 2)}`], data: { n, to },
      });
    }, (q) => q.steps[1].answer.value - q.steps[0].answer.value === q.data.to),
    extend(S(1, 3), "error-interval-dp", "Error intervals with decimals", (rng) => {
      const dp = rng.pick([1, 2]);
      const n = clean(rng.int(11, 999) / 10 ** dp);
      const h = 0.5 / 10 ** dp;
      return multi(`A length is ${fmt(n, dp)} m, correct to ${dp} decimal place${dp > 1 ? "s" : ""}. Write its error interval.`, [["Lower bound:", clean(n - h)], ["Upper bound:", clean(n + h)]], {
        answerText: `${fmt(clean(n - h))} ≤ x < ${fmt(clean(n + h))}`,
        hints: [`The rounding unit is ${fmt(1 / 10 ** dp)}, so half of it is ${fmt(h)}.`, `Subtract and add ${fmt(h)}.`],
        solution: [`${fmt(n, dp)} − ${fmt(h)} = ${fmt(clean(n - h))}`, `${fmt(n, dp)} + ${fmt(h)} = ${fmt(clean(n + h))}`, `${fmt(clean(n - h))} ≤ x < ${fmt(clean(n + h))}`], data: { n, h },
      });
    }, (q) => Math.abs(q.steps[1].answer.value - q.steps[0].answer.value - 2 * q.data.h) < 1e-9),
  ],
  [S(1, 4)]: [
    core(S(1, 4), "bound-perimeter", "Upper and lower bounds", (rng) => {
      const s = rng.int(3, 20), sides = rng.pick([3, 4, 5, 6]), upper = rng.chance(0.5);
      const names = { 3: "an equilateral triangle", 4: "a square", 5: "a regular pentagon", 6: "a regular hexagon" };
      const value = clean(sides * (s + (upper ? 0.5 : -0.5)));
      return num(`Each side of ${names[sides]} is ${s} cm, to the nearest cm. Find the ${upper ? "upper" : "lower"} bound of its perimeter.`, value, {
        unit: "cm", traps: [T(sides * s + (upper ? 0.5 : -0.5), `Each of the ${sides} sides could be 0.5 cm ${upper ? "longer" : "shorter"}.`)],
        hints: [`The ${upper ? "upper" : "lower"} bound of one side is ${s} ${upper ? "+" : "−"} 0.5 = ${fmt(s + (upper ? 0.5 : -0.5))} cm.`, `Multiply by ${sides}.`],
        solution: [`One side: ${fmt(s + (upper ? 0.5 : -0.5))} cm`, `${sides} × ${fmt(s + (upper ? 0.5 : -0.5))} = ${fmt(value)} cm`], data: { s, sides, upper },
      });
    }, (q) => Math.abs(q.data.sides * (q.data.s + (q.data.upper ? 0.5 : -0.5)) - q.answer.value) < 1e-9),
    extend(S(1, 4), "bound-area", "Bounds of an area", (rng) => {
      const a = rng.int(4, 20), b = rng.int(3, 15), upper = rng.chance(0.5);
      const d = upper ? 0.5 : -0.5;
      const value = clean((a + d) * (b + d));
      return num(`A rectangle measures ${a} cm by ${b} cm, each to the nearest cm. Find the ${upper ? "upper" : "lower"} bound of its area.`, value, {
        unit: "cm²", traps: [T(a * b, "Use the bounds of each length, not the rounded values."), T(clean(a * b + d), "Find the bound of EACH length first, then multiply.")],
        hints: [`${upper ? "Upper" : "Lower"} bounds of the sides: ${fmt(a + d)} cm and ${fmt(b + d)} cm.`, "Multiply them together."],
        solution: [`${fmt(a + d)} × ${fmt(b + d)} = ${fmt(value)} cm²`], data: { a, b, d },
      });
    }, (q) => Math.abs((q.data.a + q.data.d) * (q.data.b + q.data.d) - q.answer.value) < 1e-9),
  ],
};

/* =============================== UNIT 2: Indices and standard form =============================== */
function sfParts(x) {
  const n = mag(x);
  return { a: clean(x / 10 ** n), n };
}

const U2 = {
  [S(2, 1)]: [
    core(S(2, 1), "multiply-powers", "Multiplying powers", (rng) => {
      const b = rng.int(2, 9), m = rng.int(2, 9), n = rng.int(2, 9), div = rng.chance(0.4) && m > n;
      const p = div ? m - n : m + n;
      return num(`Write ${b}^${m} ${div ? "÷" : "×"} ${b}^${n} as a single power of ${b}. What is the power?`, p, {
        traps: [T(div ? m / n : m * n, div ? "When dividing powers of the same number, SUBTRACT the powers." : "When multiplying powers of the same number, ADD the powers.")],
        hints: [div ? "a^m ÷ a^n = a^(m − n)." : "a^m × a^n = a^(m + n).", `${m} ${div ? "−" : "+"} ${n}.`],
        solution: [`${b}^${m} ${div ? "÷" : "×"} ${b}^${n} = ${b}^${p}`], data: {},
      });
    }, () => true),
    extend(S(2, 1), "combined-laws", "Combining index laws", (rng) => {
      const m = rng.int(2, 9), n = nz(rng, -4, 9), k = rng.int(2, 9);
      const p = m + n - k;
      return num(`Simplify (x^${m} × x^${n < 0 ? `(${n})` : n}) ÷ x^${k}, giving your answer as x to a power. What is the power?`, p, {
        hints: ["Add the powers when multiplying, subtract when dividing.", `${m} + ${n < 0 ? `(${n})` : n} − ${k}.`],
        solution: [`x^${m} × x^${n} = x^${m + n}`, `x^${m + n} ÷ x^${k} = x^${p}`], data: {},
      });
    }, () => true),
  ],
  [S(2, 2)]: [
    core(S(2, 2), "power-of-power", "Powers of powers", (rng) => {
      const b = rng.int(2, 9), m = rng.int(2, 6), n = rng.int(2, 5);
      return num(`Write (${b}^${m})^${n} as a single power of ${b}. What is the power?`, m * n, {
        traps: [T(m + n, "For a power of a power, MULTIPLY the powers.")],
        hints: ["(a^m)^n = a^(m × n).", `${m} × ${n}.`], solution: [`(${b}^${m})^${n} = ${b}^${m * n}`], data: {},
      });
    }, () => true),
    extend(S(2, 2), "coefficient-power", "Powers of terms with coefficients", (rng) => {
      const c = rng.int(2, 5), m = rng.int(2, 5), n = rng.int(2, 4);
      return multi(`Simplify (${c}x^${m})^${n}. Give your answer as ax^b.`, [["a =", c ** n, undefined, [T(c * n, `The ${c} is raised to the power ${n} too: ${c}^${n}.`)]], ["b =", m * n]], {
        answerText: `${c ** n}x^${m * n}`,
        hints: [`Both the ${c} and the x^${m} are raised to the power ${n}.`, `${c}^${n} = ${c ** n}, and (x^${m})^${n} = x^${m * n}.`],
        solution: [`${c}^${n} = ${c ** n}`, `(x^${m})^${n} = x^${m * n}`, `${c ** n}x^${m * n}`], data: {},
      });
    }, () => true),
  ],
  [S(2, 3)]: [
    core(S(2, 3), "zero-or-minus-one", "Zero and negative indices", (rng) => {
      const b = rng.int(2, 12), zero = rng.chance(0.4);
      const value = zero ? 1 : clean(1 / b);
      return num(`Evaluate ${b}^${zero ? "0" : "−1"}. (You can give a fraction like 1/5.)`, value, {
        answerText: zero ? "1" : `1/${b}`,
        traps: zero ? [T(0, "Any non-zero number to the power 0 is 1, not 0.")] : [T(-b, "A negative power gives a reciprocal (1 over), not a negative number.")],
        hints: [zero ? "a^0 = 1 for any non-zero a." : "a^(−1) = 1/a.", zero ? `${b}^3 ÷ ${b}^3 = ${b}^0, and anything divided by itself is 1.` : `So ${b}^(−1) = 1/${b}.`],
        solution: [zero ? `${b}^0 = 1` : `${b}^(−1) = 1/${b}`], data: { b, zero },
      });
    }, (q) => Math.abs(q.data.b ** (q.data.zero ? 0 : -1) - q.answer.value) < 1e-12),
    extend(S(2, 3), "negative-power-fraction", "Negative powers of fractions", (rng) => {
      const a = rng.int(2, 5), b = rng.int(2, 7), p = rng.pick([1, 2]);
      if (gcd(a, b) !== 1) return null;
      const value = clean((b / a) ** p);
      return num(`Evaluate (${a}/${b})^(−${p}). (A fraction is fine.)`, value, {
        answerText: p === 1 ? `${b}/${a}` : `${b * b}/${a * a}`,
        traps: [T(clean((a / b) ** p), "The negative power flips the fraction.")],
        hints: ["A negative power means take the reciprocal: flip the fraction.", `(${a}/${b})^(−${p}) = (${b}/${a})^${p}.`],
        solution: [`(${b}/${a})^${p} = ${p === 1 ? `${b}/${a}` : `${b * b}/${a * a}`}`], data: { a, b, p },
      });
    }, (q) => Math.abs((q.data.a / q.data.b) ** -q.data.p - q.answer.value) < 1e-9),
  ],
  [S(2, 4)]: [
    core(S(2, 4), "to-standard-form-large", "Writing large numbers in standard form", (rng) => {
      const x = rng.int(11, 99) * 10 ** rng.int(2, 7);
      const { a, n } = sfParts(x);
      return multi(`Write ${fmt(x)} in standard form, A × 10ⁿ.`, [["A =", a, undefined, [T(a * 10, "A must be at least 1 and less than 10.")]], ["n =", n]], {
        answerText: `${fmt(a)} × 10^${n}`,
        hints: ["A must be between 1 and 10 (1 ≤ A < 10).", `Count how many places the decimal point moves to make ${fmt(a)}.`],
        solution: [`${fmt(x)} = ${fmt(a)} × 10^${n}`], data: { x },
      });
    }, (q) => Math.abs(q.steps[0].answer.value * 10 ** q.steps[1].answer.value - q.data.x) < 1e-6),
    extend(S(2, 4), "from-standard-form-large", "Standard form to an ordinary number", (rng) => {
      const a = clean(rng.int(11, 99) / 10), n = rng.int(3, 8);
      const value = clean(a * 10 ** n);
      return num(`Write ${fmt(a)} × 10^${n} as an ordinary number.`, value, {
        traps: [T(clean(a * 10 ** (n - 1)), "Move the digits " + n + " places, not " + (n - 1) + ".")],
        hints: [`Multiply by 10 ${n} times: the digits move ${n} places left.`, "Fill empty places with zeros."],
        solution: [`${fmt(a)} × 10^${n} = ${fmt(value)}`], data: { a, n },
      });
    }, (q) => Math.abs(q.data.a * 10 ** q.data.n - q.answer.value) < 1e-6),
  ],
  [S(2, 5)]: [
    core(S(2, 5), "to-standard-form-small", "Writing small numbers in standard form", (rng) => {
      const a = clean(rng.int(11, 99) / 10), n = -rng.int(2, 6);
      const x = clean(a * 10 ** n);
      return multi(`Write ${fmt(x)} in standard form, A × 10ⁿ.`, [["A =", a], ["n =", n, undefined, [T(-n, "Small numbers (less than 1) have a NEGATIVE power of 10.")]]], {
        answerText: `${fmt(a)} × 10^${n}`,
        hints: ["Move the decimal point until the number is between 1 and 10.", "For numbers less than 1, the power is negative."],
        solution: [`${fmt(x)} = ${fmt(a)} × 10^${n}`], data: { x },
      });
    }, (q) => Math.abs(q.steps[0].answer.value * 10 ** q.steps[1].answer.value - q.data.x) < 1e-15),
    extend(S(2, 5), "from-standard-form-small", "Small standard form to an ordinary number", (rng) => {
      const a = clean(rng.int(11, 99) / 10), n = -rng.int(2, 5);
      const value = clean(a * 10 ** n);
      return num(`Write ${fmt(a)} × 10^${n} as an ordinary number.`, value, {
        traps: [T(clean(a * 10 ** -n), "A negative power makes the number SMALLER: move the digits right.")],
        hints: [`Divide by 10 ${-n} times.`, `The digits move ${-n} places to the right.`],
        solution: [`${fmt(a)} × 10^${n} = ${fmt(value)}`], data: { a, n },
      });
    }, (q) => Math.abs(q.data.a * 10 ** q.data.n - q.answer.value) < 1e-15),
  ],
  [S(2, 6)]: [
    core(S(2, 6), "multiply-standard-form", "Multiplying in standard form", (rng) => {
      const a = rng.int(2, 9), b = rng.int(2, 9), m = rng.int(2, 8), n = rng.int(-4, 6);
      const prod = a * b;
      const A = prod >= 10 ? clean(prod / 10) : prod, N = m + n + (prod >= 10 ? 1 : 0);
      return multi(`Work out (${a} × 10^${m}) × (${b} × 10^${n}). Give your answer in standard form A × 10ⁿ.`, [["A =", A, undefined, [T(prod, "A must be less than 10: adjust the power of 10.")]], ["n =", N]], {
        answerText: `${fmt(A)} × 10^${N}`,
        hints: [`Multiply the numbers (${a} × ${b}) and add the powers (${m} + ${n}).`, prod >= 10 ? `${prod} × 10^${m + n} isn't standard form yet: ${prod} = ${fmt(prod / 10)} × 10.` : "Check A is between 1 and 10."],
        solution: [`${a} × ${b} = ${prod}`, `10^${m} × 10^${n} = 10^${m + n}`, `${fmt(A)} × 10^${N}`], data: { a, b, m, n },
      });
    }, (q) => { const v = q.data.a * q.data.b * 10 ** (q.data.m + q.data.n); return Math.abs(q.steps[0].answer.value * 10 ** q.steps[1].answer.value / v - 1) < 1e-9 && q.steps[0].answer.value < 10; }),
    extend(S(2, 6), "divide-standard-form", "Dividing in standard form", (rng) => {
      const b = rng.int(2, 9), q0 = rng.int(1, 9), m = rng.int(3, 9), n = rng.int(-3, 4);
      const a = b * q0;
      const A = a >= 10 ? clean(a / 10) : a, top = a >= 10 ? m + 1 : m;
      const quotient = q0, N = m - n;
      return multi(`Work out (${fmt(A)} × 10^${top}) ÷ (${b} × 10^${n}). Give your answer in standard form.`, [["A =", quotient], ["n =", N]], {
        answerText: `${quotient} × 10^${N}`,
        hints: [`Divide the numbers: ${fmt(A)} ÷ ${b}. Subtract the powers: ${top} − ${n < 0 ? `(${n})` : n}.`, "If the number part isn't between 1 and 10, adjust."],
        solution: [`${fmt(A)} ÷ ${b} = ${fmt(clean(A / b))}`, `10^${top} ÷ 10^${n} = 10^${top - n}`, `${fmt(clean(A / b))} × 10^${top - n} = ${quotient} × 10^${N}`], data: { A, top, b, n },
      });
    }, (q) => { const v = (q.data.A * 10 ** q.data.top) / (q.data.b * 10 ** q.data.n); return Math.abs(q.steps[0].answer.value * 10 ** q.steps[1].answer.value / v - 1) < 1e-9; }),
  ],
};

/* =============================== UNIT 3: Prime factorisation =============================== */
const pf = (n) => { const out = []; let m = n; for (let p = 2; m > 1; p++) while (m % p === 0) { out.push(p); m /= p; } return out; };
const indexForm = (n) => { const c = {}; pf(n).forEach((p) => { c[p] = (c[p] ?? 0) + 1; }); return Object.entries(c).map(([p, e]) => (e > 1 ? `${p}^${e}` : p)).join(" × "); };

const U3 = {
  [S(3, 1)]: [
    core(S(3, 1), "product-of-primes", "Product of prime factors", (rng) => {
      const n = rng.pick([2, 2, 3]) * rng.pick([2, 3, 5]) * rng.pick([2, 3, 5, 7]) * rng.pick([1, 2, 3]);
      const f = pf(n);
      if (f.length < 3) return null;
      const right = f.join(" × ");
      const w1 = [f[0] * f[1], ...f.slice(2)].join(" × "); // includes a non-prime
      const w2 = [...f.slice(0, -1), f.at(-1) + 2].join(" × ");
      if (new Set([right, w1, w2]).size < 3) return null;
      return mc3(rng, `Which of these is ${n} written as a product of prime factors?`, right, [[w1, `${f[0] * f[1]} isn't a prime number.`], [w2, `Multiply it out: it doesn't make ${n}.`]], {
        hints: ["Use a factor tree: split into factors until every branch ends in a prime.", "Check by multiplying your primes back together."],
        solution: [`${n} = ${right}`], data: { n },
      });
    }, (q) => pf(q.data.n).join(" × ") === q.answerText),
    extend(S(3, 1), "from-prime-factors", "From prime factors to a number", (rng) => {
      const a = rng.int(1, 4), b = rng.int(0, 3), c = rng.int(0, 2), d = rng.int(0, 1);
      const value = 2 ** a * 3 ** b * 5 ** c * 7 ** d;
      const txt = [[2, a], [3, b], [5, c], [7, d]].filter(([, e]) => e > 0).map(([p, e]) => (e > 1 ? `${p}^${e}` : p)).join(" × ");
      if (!txt.includes("×")) return null;
      return num(`What number is ${txt}?`, value, {
        hints: ["Work out each power first.", "Then multiply them together."],
        solution: [`${txt} = ${value}`], data: {},
      });
    }, () => true),
  ],
  [S(3, 2)]: [
    core(S(3, 2), "index-form-23", "Prime factors in index form", (rng) => {
      const a = rng.int(1, 5), b = rng.int(1, 4);
      const n = 2 ** a * 3 ** b;
      return multi(`Write ${n} as a product of prime factors in the form 2^a × 3^b.`, [["a =", a], ["b =", b]], {
        answerText: `2^${a} × 3^${b}`,
        hints: ["Keep dividing by 2 until you can't, then by 3.", `Count how many times you divided by each.`],
        solution: [`${n} = ${pf(n).join(" × ")}`, `= 2^${a} × 3^${b}`], data: { n },
      });
    }, (q) => 2 ** q.steps[0].answer.value * 3 ** q.steps[1].answer.value === q.data.n),
    extend(S(3, 2), "index-form-three", "Three prime factors in index form", (rng) => {
      const a = rng.int(1, 4), b = rng.int(1, 3), c = rng.int(1, 2), p = rng.pick([5, 7]);
      const n = 2 ** a * 3 ** b * p ** c;
      return multi(`Write ${n} in the form 2^a × 3^b × ${p}^c.`, [["a =", a], ["b =", b], ["c =", c]], {
        answerText: `2^${a} × 3^${b} × ${p}^${c}`,
        hints: ["Use a factor tree, or divide repeatedly by 2, then 3, then " + p + ".", "Count each prime."],
        solution: [`${n} = ${pf(n).join(" × ")}`, `= 2^${a} × 3^${b} × ${p}^${c}`], data: { n, p },
      });
    }, (q) => 2 ** q.steps[0].answer.value * 3 ** q.steps[1].answer.value * q.data.p ** q.steps[2].answer.value === q.data.n),
  ],
  [S(3, 3)]: [
    core(S(3, 3), "hcf", "HCF using prime factors", (rng) => {
      const g = rng.pick([4, 6, 8, 12, 14, 15, 18, 21]), x = rng.int(2, 9), y = rng.int(2, 9);
      if (gcd(x, y) !== 1 || x === y) return null;
      const a = g * x, b = g * y;
      return num(`Find the highest common factor (HCF) of ${a} and ${b}.`, g, {
        traps: [T(lcm(a, b), "That's the lowest common multiple. The HCF is the biggest number that divides into both.")],
        hints: [`${a} = ${indexForm(a)} and ${b} = ${indexForm(b)}.`, "Multiply the prime factors they share (the overlap in a Venn diagram)."],
        solution: [`${a} = ${indexForm(a)}`, `${b} = ${indexForm(b)}`, `Shared factors multiply to ${g}`], data: { a, b },
      });
    }, (q) => gcd(q.data.a, q.data.b) === q.answer.value),
    extend(S(3, 3), "hcf-index-form", "HCF from index form", (rng) => {
      const [a1, a2, b1, b2] = [rng.int(1, 4), rng.int(1, 4), rng.int(0, 3), rng.int(0, 3)];
      const p = rng.pick([5, 7]), c1 = rng.int(0, 1), c2 = rng.int(0, 1);
      const A = 2 ** a1 * 3 ** b1 * p ** c1, B = 2 ** a2 * 3 ** b2 * p ** c2;
      return num(`A = ${indexForm(A)} and B = ${indexForm(B)}. Find the HCF of A and B as an ordinary number.`, gcd(A, B), {
        hints: ["For the HCF, take each prime to the LOWER of its two powers.", "Then multiply out."],
        solution: [`HCF = ${indexForm(gcd(A, B)) || "1"} = ${gcd(A, B)}`], data: { A, B },
      });
    }, (q) => gcd(q.data.A, q.data.B) === q.answer.value && q.answer.value > 1),
  ],
  [S(3, 4)]: [
    core(S(3, 4), "lcm", "LCM using prime factors", (rng) => {
      const a = rng.int(4, 30), b = rng.int(4, 30);
      if (a === b || a % b === 0 || b % a === 0) return null;
      return num(`Find the lowest common multiple (LCM) of ${a} and ${b}.`, lcm(a, b), {
        traps: [T(a * b, `${a} × ${b} is a common multiple, but not always the LOWEST.`), T(gcd(a, b), "That's the HCF.")],
        hints: [`${a} = ${indexForm(a)} and ${b} = ${indexForm(b)}.`, "Take every prime factor at its HIGHEST power, and multiply."],
        solution: [`${a} = ${indexForm(a)}`, `${b} = ${indexForm(b)}`, `LCM = ${indexForm(lcm(a, b))} = ${lcm(a, b)}`], data: { a, b },
      });
    }, (q) => lcm(q.data.a, q.data.b) === q.answer.value),
    extend(S(3, 4), "lcm-index-form", "LCM from index form", (rng) => {
      const A = 2 ** rng.int(1, 3) * 3 ** rng.int(0, 2) * rng.pick([1, 5]), B = 2 ** rng.int(0, 3) * 3 ** rng.int(0, 2) * rng.pick([1, 7]);
      if (A === B || A < 4 || B < 4) return null;
      return num(`A = ${indexForm(A)} and B = ${indexForm(B)}. Find the LCM of A and B.`, lcm(A, B), {
        hints: ["For the LCM, take each prime to the HIGHER of its two powers.", "Then multiply out."],
        solution: [`LCM = ${indexForm(lcm(A, B))} = ${lcm(A, B)}`], data: { A, B },
      });
    }, (q) => lcm(q.data.A, q.data.B) === q.answer.value),
  ],
  [S(3, 5)]: [
    core(S(3, 5), "buses", "LCM problems", (rng) => {
      const a = rng.pick([6, 8, 10, 12, 15]), b = rng.pick([9, 14, 16, 18, 20, 25]);
      if (a === b) return null;
      const L = lcm(a, b);
      return num(`Bus A leaves every ${a} minutes and bus B every ${b} minutes. They both leave at 9 am. After how many minutes will they next leave together?`, L, {
        unit: "minutes", traps: [T(a * b, "That works, but they meet earlier: find the LOWEST common multiple.")],
        hints: ["This is a lowest common multiple question.", `List multiples of ${a} and ${b}, or use prime factors.`],
        solution: [`LCM of ${a} and ${b} = ${L}`, `They next leave together after ${L} minutes.`], data: { a, b },
      });
    }, (q) => lcm(q.data.a, q.data.b) === q.answer.value),
    extend(S(3, 5), "bags", "HCF problems", (rng) => {
      const g = rng.int(3, 12), x = rng.int(2, 9), y = rng.int(2, 9);
      if (gcd(x, y) !== 1 || x === y) return null;
      return num(`Jo has ${g * x} pencils and ${g * y} rubbers. She puts them into identical packs, using them all, with no leftovers. What is the greatest number of packs she can make?`, g, {
        unit: "packs", traps: [T(lcm(g * x, g * y), "That's the LCM. You need the biggest number that divides into both: the HCF.")],
        hints: ["The number of packs must divide into both amounts.", "Find the highest common factor."],
        solution: [`HCF of ${g * x} and ${g * y} = ${g}`, `${g} packs, each with ${x} pencils and ${y} rubbers`], data: { a: g * x, b: g * y },
      });
    }, (q) => gcd(q.data.a, q.data.b) === q.answer.value),
  ],
};

/* =============================== UNIT 4: Brackets and factorising =============================== */
const U4 = {
  [S(4, 1)]: [reuse(y10("y10-u3-l1", 1), S(4, 1), 1, "expand-double"), reuse(y10("y10-u3-l1", 2), S(4, 1), 2, "expand-double-coefficients")],
  [S(4, 2)]: [
    core(S(4, 2), "square-bracket", "Squaring a bracket", (rng) => {
      const a = nz(rng, -9, 9);
      const c = polyMul([1, a], [1, a]);
      return expr(`Expand and simplify ${lin(1, a)}².`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        traps: [{ expr: `x^2+${a * a}`, feedback: `${lin(1, a)}² means ${lin(1, a)}${lin(1, a)}: there is a middle term, ${2 * a}x.` }],
        hints: [`Write it as ${lin(1, a)}${lin(1, a)}.`, "Multiply every term by every term, then collect the x terms."],
        solution: [`${lin(1, a)}${lin(1, a)} = x² ${sgn(a)}x ${sgn(a)}x ${sgn(a * a)}`, `= ${polyText(c)}`], data: {},
      });
    }, () => true),
    extend(S(4, 2), "square-bracket-coefficient", "Squaring with a coefficient", (rng) => {
      const p = rng.int(2, 5), a = nz(rng, -7, 7);
      const c = polyMul([p, a], [p, a]);
      return expr(`Expand and simplify ${lin(p, a)}².`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        traps: [{ expr: `${p * p}x^2+${a * a}`, feedback: "Don't forget the two middle terms." }],
        hints: [`${lin(p, a)}${lin(p, a)}.`, `First term: ${p}x × ${p}x = ${p * p}x². Middle terms: 2 × ${p}x × ${a}.`],
        solution: [`= ${p * p}x² ${sgn(p * a)}x ${sgn(p * a)}x ${sgn(a * a)}`, `= ${polyText(c)}`], data: {},
      });
    }, () => true),
  ],
  [S(4, 3)]: [
    reuse(y10("y10-u4-l2", 2), S(4, 3), 1, "evaluate-quadratic"),
    extend(S(4, 3), "simplify-quadratic", "Simplifying quadratic expressions", (rng) => {
      const a = nz(rng, -6, 6), b = nz(rng, -6, 6), c = nz(rng, -6, 6);
      const res = [1, a + b, b * c];
      return expr(`Expand and simplify x(x ${sgn(a)}) ${sgn(b)}(x ${sgn(c)}).`, polyExpr(res), {
        flags: { expanded: true, simplified: true }, answerText: polyText(res),
        hints: [`x(x ${sgn(a)}) = x² ${sgn(a)}x.`, `${fmt(b)}(x ${sgn(c)}) = ${fmt(b)}x ${sgn(b * c)}. Collect like terms.`],
        solution: [`x² ${sgn(a)}x ${sgn(b)}x ${sgn(b * c)}`, `= ${polyText(res)}`], data: {},
      });
    }, () => true),
  ],
  [S(4, 4)]: [
    core(S(4, 4), "factorise-monic", "Factorising x² + bx + c", (rng) => {
      const p = nz(rng, -9, 9), q = nz(rng, -9, 9);
      const c = polyMul([1, p], [1, q]);
      if (c[1] === 0) return null;
      return expr(`Factorise ${polyText(c)}.`, `${linExpr(1, p)}*${linExpr(1, q)}`, {
        flags: { factorised: true }, answerText: `${lin(1, p)}${lin(1, q)}`,
        hints: [`Find two numbers that multiply to ${fmt(c[2])} and add to ${fmt(c[1])}.`, `They are ${fmt(p)} and ${fmt(q)}.`],
        solution: [`${fmt(p)} × ${fmt(q)} = ${fmt(c[2])} and ${fmt(p)} + ${fmt(q)} = ${fmt(c[1])}`, `${lin(1, p)}${lin(1, q)}`], data: {},
      });
    }, () => true),
    extend(S(4, 4), "factorise-common-first", "Taking out a common factor first", (rng) => {
      const k = rng.int(2, 5), p = nz(rng, -6, 6), q = nz(rng, -6, 6);
      const c = polyMul([1, p], [1, q]).map((v) => v * k);
      if (c[1] === 0) return null;
      return expr(`Factorise fully ${polyText(c)}.`, `${k}*${linExpr(1, p)}*${linExpr(1, q)}`, {
        flags: { factorised: true }, answerText: `${k}${lin(1, p)}${lin(1, q)}`,
        traps: [{ expr: `${k}*(${polyExpr(polyMul([1, p], [1, q]))})`, feedback: "Good start, but the quadratic inside the bracket can be factorised further." }],
        hints: [`Every term is divisible by ${k}: take it out first.`, `${k}(${polyText(polyMul([1, p], [1, q]))}). Now factorise the bracket.`],
        solution: [`= ${k}(${polyText(polyMul([1, p], [1, q]))})`, `= ${k}${lin(1, p)}${lin(1, q)}`], data: {},
      });
    }, () => true),
  ],
  [S(4, 5)]: [
    core(S(4, 5), "dots-simple", "Difference of two squares", (rng) => {
      const a = rng.int(1, 12);
      return expr(`Factorise x² − ${a * a}.`, `(x+${a})*(x-${a})`, {
        flags: { factorised: true }, answerText: `(x + ${a})(x − ${a})`,
        hints: [`${a * a} = ${a}².`, `x² − a² = (x + a)(x − a).`],
        solution: [`x² − ${a}² = (x + ${a})(x − ${a})`], data: {},
      });
    }, () => true),
    extend(S(4, 5), "dots-coefficient", "Difference of two squares with coefficients", (rng) => {
      const p = rng.int(2, 7), a = rng.int(1, 9);
      if (gcd(p, a) !== 1) return null;
      return expr(`Factorise ${p * p}x² − ${a * a}.`, `(${p}*x+${a})*(${p}*x-${a})`, {
        flags: { factorised: true }, answerText: `(${p}x + ${a})(${p}x − ${a})`,
        hints: [`${p * p}x² = (${p}x)² and ${a * a} = ${a}².`, "Use (A + B)(A − B)."],
        solution: [`= (${p}x)² − ${a}²`, `= (${p}x + ${a})(${p}x − ${a})`], data: {},
      });
    }, () => true),
  ],
  [S(4, 6)]: [
    core(S(4, 6), "perimeter-equation", "Forming an equation from a shape", (rng) => {
      const x = rng.int(2, 15), a = rng.int(1, 9);
      const P = 2 * (x + a) + 2 * x;
      return num(`A rectangle has width x cm and length (x + ${a}) cm. Its perimeter is ${P} cm. Find x.`, x, {
        traps: [T((P - a) / 2, "The perimeter goes all the way round: two widths and two lengths.")],
        hints: [`Perimeter = x + (x + ${a}) + x + (x + ${a}) = 4x + ${2 * a}.`, `Solve 4x + ${2 * a} = ${P}.`],
        solution: [`4x + ${2 * a} = ${P}`, `4x = ${P - 2 * a}`, `x = ${x}`], data: { a, P },
      });
    }, (q) => 4 * q.answer.value + 2 * q.data.a === q.data.P),
    extend(S(4, 6), "angle-equation", "Forming an equation from angles", (rng) => {
      const x = rng.int(15, 40), b = rng.int(5, 30), c = rng.int(1, 3);
      const k = 180 - x - (2 * x + b) - (c * x);
      const third = c * x + k;
      if (third <= 5) return null;
      return num(`The angles of a triangle are x°, (2x + ${b})° and (${c === 1 ? "" : c}x ${sgn(k)})°. Find x.`, x, {
        hints: ["The angles in a triangle add up to 180°.", `x + 2x + ${b} + ${c === 1 ? "" : c}x ${sgn(k)} = 180.`],
        solution: [`${3 + c}x ${sgn(b + k)} = 180`, `${3 + c}x = ${180 - b - k}`, `x = ${x}`], data: { b, c, k },
      });
    }, (q) => { const x = q.answer.value; return x + 2 * x + q.data.b + q.data.c * x + q.data.k === 180; }),
  ],
};

/* =============================== UNIT 5: Inequalities and formulae =============================== */
const U5 = {
  [S(5, 1)]: [
    core(S(5, 1), "count-integers-range", "Integers in a range", (rng) => {
      const a = rng.int(-6, 3), b = a + rng.int(3, 8), ls = rng.pick(["<", "≤"]), rs = rng.pick(["<", "≤"]);
      const list = []; for (let x = a - 1; x <= b + 1; x++) if ((ls === "<" ? a < x : a <= x) && (rs === "<" ? x < b : x <= b)) list.push(x);
      return num(`How many integers x satisfy ${fmt(a)} ${ls} x ${rs} ${fmt(b)}?`, list.length, {
        hints: ["< means the end value is NOT included; ≤ means it is.", "List the integers, then count them."],
        solution: [`The integers are ${list.map(fmt).join(", ")}`, `That's ${list.length}`], data: { list },
      });
    }, (q) => q.data.list.length === q.answer.value),
    extend(S(5, 1), "largest-integer", "Largest integer solution", (rng) => {
      const a = rng.int(2, 7), c = rng.int(5, 50);
      if (c % a === 0) return null;
      const value = Math.floor(c / a);
      return num(`What is the largest integer x that satisfies ${a}x < ${c}?`, value, {
        traps: [T(value + 1, `Check: ${a} × ${value + 1} = ${a * (value + 1)}, which is not less than ${c}.`)],
        hints: [`Divide both sides by ${a}: x < ${fmt(round(c / a, 3))}…`, "Find the largest whole number below that."],
        solution: [`x < ${c} ÷ ${a} = ${fmt(round(c / a, 3))}…`, `Largest integer: ${value}`], data: { a, c },
      });
    }, (q) => q.data.a * q.answer.value < q.data.c && q.data.a * (q.answer.value + 1) >= q.data.c),
  ],
  [S(5, 2)]: [
    core(S(5, 2), "read-number-line", "Inequalities on a number line", (rng) => {
      const a = rng.int(-4, 4), right = rng.chance(0.5), open = rng.chance(0.5);
      const sym = right ? (open ? ">" : "≥") : (open ? "<" : "≤");
      const wrongSym = right ? (open ? "≥" : ">") : (open ? "≤" : "<");
      const flip = right ? (open ? "<" : "≤") : (open ? ">" : "≥");
      return mc3(rng, "Which inequality is shown on the number line?", `x ${sym} ${fmt(a)}`, [[`x ${wrongSym} ${fmt(a)}`, open ? "An open (empty) circle means the value is NOT included." : "A filled circle means the value IS included."], [`x ${flip} ${fmt(a)}`, `The line goes to the ${right ? "right (bigger numbers)" : "left (smaller numbers)"}.`]], {
        diagram: { kind: "numberline", min: -6, max: 6, ticks: 12, segment: right ? { a, aOpen: open, bInf: true } : { b: a, bOpen: open, aInf: true } },
        hints: ["Open circle: not included (< or >). Filled circle: included (≤ or ≥).", "Which way does the line go?"],
        solution: [`${open ? "Open" : "Filled"} circle at ${fmt(a)}, line to the ${right ? "right" : "left"}`, `x ${sym} ${fmt(a)}`], data: {},
      });
    }, () => true),
    extend(S(5, 2), "read-double-inequality", "Double inequalities on a number line", (rng) => {
      const a = rng.int(-5, 0), b = a + rng.int(2, 6), aOpen = rng.chance(0.5), bOpen = rng.chance(0.5);
      const s = (o) => (o ? "<" : "≤");
      return mc3(rng, "Which inequality is shown on the number line?", `${fmt(a)} ${s(aOpen)} x ${s(bOpen)} ${fmt(b)}`, [
        [`${fmt(a)} ${s(!aOpen)} x ${s(bOpen)} ${fmt(b)}`, `Look at the circle at ${fmt(a)}: is it open or filled?`],
        [`${fmt(a)} ${s(aOpen)} x ${s(!bOpen)} ${fmt(b)}`, `Look at the circle at ${fmt(b)}: is it open or filled?`],
      ], {
        diagram: { kind: "numberline", min: -6, max: 6, ticks: 12, segment: { a, b, aOpen, bOpen } },
        hints: ["Check each end separately.", "Open circle: < (not included). Filled circle: ≤ (included)."],
        solution: [`${fmt(a)} ${s(aOpen)} x ${s(bOpen)} ${fmt(b)}`], data: {},
      });
    }, () => true),
  ],
  [S(5, 3)]: [
    reuse(y10("y10-u6-l4", 1), S(5, 3), 1, "solve-inequality"),
    extend(S(5, 3), "negative-coefficient", "Inequalities with a negative x term", (rng) => {
      const a = rng.int(2, 5), x = rng.int(-4, 6), c = rng.int(5, 20);
      const r = c - a * x;
      return mc3(rng, `Solve ${c} − ${a}x > ${fmt(r)}.`, `x < ${fmt(x)}`, [[`x > ${fmt(x)}`, "Dividing by a negative number reverses the inequality sign."], [`x < ${fmt(-x)}`, "Check the sign of your answer."]], {
        hints: [`Subtract ${c}: −${a}x > ${fmt(r - c)}.`, `Divide by −${a}, and reverse the sign.`],
        solution: [`−${a}x > ${fmt(r - c)}`, `x < ${fmt(x)} (sign reversed)`], data: { a, x, c, r },
      });
    }, (q) => q.data.x !== 0 && q.data.c - q.data.a * q.data.x === q.data.r),
  ],
  [S(5, 4)]: [
    core(S(5, 4), "v-u-at", "Substituting into a formula", (rng) => {
      const u = rng.int(0, 20), a = nz(rng, -5, 9), t = rng.int(2, 10);
      return num(`v = u + at. Find v when u = ${u}, a = ${fmt(a)} and t = ${t}.`, u + a * t, {
        traps: [T((u + a) * t, "Multiplication first: work out a × t, then add u.")],
        hints: ["Replace each letter with its value.", `v = ${u} + ${a < 0 ? `(${a})` : a} × ${t}.`],
        solution: [`v = ${u} + ${a < 0 ? `(${a})` : a} × ${t}`, `= ${u} ${sgn(a * t)} = ${u + a * t}`], data: {},
      });
    }, () => true),
    extend(S(5, 4), "s-ut-at2", "Substituting with a square", (rng) => {
      const u = rng.int(0, 10), a = rng.pick([2, 4, 6, -2, 10]), t = rng.int(2, 8);
      const value = u * t + 0.5 * a * t * t;
      return num(`s = ut + ½at². Find s when u = ${u}, a = ${fmt(a)} and t = ${t}.`, value, {
        traps: [T(u * t + 0.5 * (a * t) ** 2, "Only t is squared, not a × t.")],
        hints: ["Indices first: work out t².", `s = ${u} × ${t} + 0.5 × ${a < 0 ? `(${a})` : a} × ${t * t}.`],
        solution: [`ut = ${u * t}`, `½at² = 0.5 × ${fmt(a)} × ${t * t} = ${fmt(0.5 * a * t * t)}`, `s = ${fmt(value)}`], data: {},
      });
    }, () => true),
  ],
  [S(5, 5)]: [
    core(S(5, 5), "subject-linear", "Changing the subject", (rng) => {
      const a = rng.int(2, 9), b = nz(rng, -12, 12);
      return expr(`Make x the subject of y = ${a}x ${sgn(b)}.`, `(y-(${b}))/${a}`, {
        answerText: `x = (y ${sgn(-b)}) ÷ ${a}`,
        traps: [{ expr: `y/${a}-(${b})`, feedback: `Undo the ${sgn(b)} first, before dividing by ${a}.` }],
        hints: [`${b > 0 ? "Subtract" : "Add"} ${Math.abs(b)} on both sides.`, `Then divide both sides by ${a}. (Type just the right-hand side, e.g. (y − 3)/2.)`],
        solution: [`y ${sgn(-b)} = ${a}x`, `x = (y ${sgn(-b)}) ÷ ${a}`], data: {},
      });
    }, () => true),
    extend(S(5, 5), "subject-perimeter", "Changing the subject (brackets)", (rng) => {
      const v = rng.pick([["P", "l", "w", "P = 2(l + w)", "P/2-w", "l = P/2 − w"], ["v", "t", "u", "v = u + at", "(v-u)/a", "t = (v − u)/a"], ["A", "h", "b", "A = ½bh", "2*A/b", "h = 2A/b"]]);
      const [, target, , formula, ans, text] = v;
      return expr(`Make ${target} the subject of ${formula}. (Type only the right-hand side.)`, ans, {
        answerText: text,
        hints: ["Undo the operations in reverse order, doing the same to both sides.", formula.includes("(") ? "Divide by the number outside the bracket first." : `Isolate the term containing ${target}.`],
        solution: [`${text}`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 6: Linear graphs =============================== */
const lineGraph = (m, c, extra = {}) => ({ kind: "graph", x: [-5, 5], y: [-8, 8], xStep: 1, yStep: 2, curves: [{ points: [[-5, m * -5 + c], [5, m * 5 + c]] }], description: `A straight line through (0, ${c}) with gradient ${m}.`, ...extra });

const U6 = {
  [S(6, 1)]: [
    core(S(6, 1), "gradient-from-graph", "Gradient from a graph", (rng) => {
      const m = rng.pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5]), c = rng.int(-3, 3);
      const recip = m === 0.5 ? "2" : m === -0.5 ? "−2" : Math.abs(m) === 1 ? (m > 0 ? "−1" : "1") : `${m > 0 ? "" : "−"}1/${Math.abs(m)}`;
      return mc3(rng, "What is the gradient of this straight line?", m === 0.5 ? "½" : m === -0.5 ? "−½" : fmt(m), [
        [m === 0.5 ? "−½" : m === -0.5 ? "½" : fmt(-m), `Does the line go up or down from left to right? ${m > 0 ? "Up means positive." : "Down means negative."}`],
        [recip === fmt(-m) ? fmt(m * 2) : recip, "Gradient = change in y ÷ change in x (up ÷ across), not across ÷ up."],
      ], {
        diagram: lineGraph(m, c),
        hints: ["Pick two points where the line crosses grid lines exactly.", "Gradient = change in y ÷ change in x."],
        solution: [`Going 1 right, the line goes ${Math.abs(m) === 0.5 ? "half a square" : Math.abs(m)} ${m > 0 ? "up" : "down"}.`, `Gradient = ${fmt(m)}`], data: {},
      });
    }, (q) => new Set(q.options.map((o) => o.label)).size === 3),
    reuse(y10("y10-u6-l1", 1), S(6, 1), 2, "gradient-two-points"),
  ],
  [S(6, 2)]: [
    core(S(6, 2), "intercept-rearranged", "Finding the y-intercept", (rng) => {
      const m = nz(rng, -5, 5), c = nz(rng, -9, 9);
      return num(`What is the y-intercept of the line y ${sgn(-m)}x = ${fmt(c)}?`, c, {
        traps: [T(m, "That's the gradient. Rearrange to y = mx + c first.")],
        hints: [`Rearrange to make y the subject: y = ${fmt(m)}x ${sgn(c)}.`, "The y-intercept is c, where the line crosses the y-axis."],
        solution: [`y = ${fmt(m)}x ${sgn(c)}`, `y-intercept = ${fmt(c)}, at (0, ${fmt(c)})`], data: {},
      });
    }, () => true),
    extend(S(6, 2), "intercept-divide", "y-intercept when y has a coefficient", (rng) => {
      const k = rng.int(2, 5), m = nz(rng, -4, 4), c = nz(rng, -6, 6);
      return num(`What is the y-intercept of ${k}y ${sgn(-k * m)}x = ${fmt(k * c)}?`, c, {
        traps: [T(k * c, `Divide every term by ${k} to get y on its own.`)],
        hints: [`Rearrange: ${k}y = ${fmt(k * m)}x ${sgn(k * c)}.`, `Divide by ${k}: y = ${fmt(m)}x ${sgn(c)}.`],
        solution: [`y = ${fmt(m)}x ${sgn(c)}`, `y-intercept = ${fmt(c)}`], data: {},
      });
    }, () => true),
  ],
  [S(6, 3)]: [
    core(S(6, 3), "equation-from-graph", "Equation from a graph", (rng) => {
      const m = rng.pick([-3, -2, -1, 1, 2, 3]), c = nz(rng, -3, 3);
      return mc3(rng, "Which equation describes this line?", lineEq(m, c), [[lineEq(c, m), "In y = mx + c, m is the gradient and c is where the line crosses the y-axis."], [lineEq(-m, c), `Check the direction: the line goes ${m > 0 ? "up" : "down"} from left to right.`]], {
        diagram: lineGraph(m, c),
        hints: ["Read where the line crosses the y-axis: that's c.", "Find the gradient m: how far up (or down) for each 1 across."],
        solution: [`c = ${c}, m = ${m}`, lineEq(m, c)], data: { m, c },
      });
    }, (q) => q.data.m !== q.data.c && q.data.c !== -q.data.m),
    reuse(y10("y10-u6-l1", 2), S(6, 3), 2, "equation-two-points"),
  ],
  [S(6, 4)]: [
    core(S(6, 4), "which-parallel", "Spotting parallel lines", (rng) => {
      const m = nz(rng, -5, 5), c = rng.int(-6, 6), c2 = c + nz(rng, -5, 5);
      return mc3(rng, `Which line is parallel to ${lineEq(m, c)}?`, lineEq(m, c2), [[lineEq(-m, c), "Parallel lines have the SAME gradient, including its sign."], [lineEq(c2 === 0 ? m + 1 : c2, m), "The gradient is the number in front of x."]], {
        hints: ["Parallel lines have the same gradient.", `The gradient of ${lineEq(m, c)} is ${fmt(m)}.`],
        solution: [`Gradient ${fmt(m)}: ${lineEq(m, c2)} also has gradient ${fmt(m)}.`], data: {},
      });
    }, (q) => new Set(q.options.map((o) => o.label)).size === 3),
    extend(S(6, 4), "parallel-through-point", "Parallel line through a point", (rng) => {
      const m = nz(rng, -4, 4), c0 = rng.int(-5, 5), x0 = rng.int(-4, 4), y0 = rng.int(-8, 8);
      const c = y0 - m * x0;
      if (c === c0) return null;
      return num(`A line is parallel to ${lineEq(m, c0)} and passes through (${fmt(x0)}, ${fmt(y0)}). Its equation is y = ${fmt(m)}x + c. Find c.`, c, {
        hints: [`The gradient is ${fmt(m)} (same as the parallel line).`, `Substitute: ${fmt(y0)} = ${fmt(m)} × ${fmt(x0)} + c.`],
        solution: [`${fmt(y0)} = ${fmt(m * x0)} + c`, `c = ${fmt(c)}`], data: { m, x0, y0 },
      });
    }, (q) => q.data.y0 === q.data.m * q.data.x0 + q.answer.value),
  ],
  [S(6, 5)]: [
    core(S(6, 5), "conversion-graph", "Reading a conversion graph", (rng) => {
      const k = rng.pick([1.1, 1.2, 1.25, 1.15]), a = rng.int(2, 9) * 10;
      const right = round(a * k, 0), w1 = round(a / k, 0), w2 = round(a * k + 10, 0);
      if (new Set([right, w1, w2]).size < 3) return null;
      return mc3(rng, `The graph converts pounds (£) to euros (€). Use it to convert £${a} to euros.`, `€${right}`, [[`€${w1}`, "Read UP from the pounds axis to the line, then across to euros."], [`€${w2}`, "Read the value carefully from the line, using the gridlines."]], {
        diagram: { kind: "graph", x: [0, 100], y: [0, 130], xStep: 10, yStep: 10, curves: [{ points: [[0, 0], [100, 100 * k]] }], points: [{ x: a, y: a * k }], xLabel: "Pounds (£)", yLabel: "Euros (€)", description: `Straight line through the origin: £100 = €${fmt(100 * k)}.` },
        hints: [`Find £${a} on the horizontal axis.`, "Go up to the line, then across to the euros axis."],
        solution: [`£${a} × ${fmt(k)} ≈ €${right}`], data: {},
      });
    }, () => true),
    extend(S(6, 5), "taxi-graph", "Interpreting a real-life graph", (rng) => {
      const fixed = rng.int(2, 6), per = rng.pick([1, 1.5, 2, 2.5]);
      const ask = rng.pick(["fixed", "per"]);
      const money = (v) => (Number.isInteger(v) ? `£${v}` : `£${fmt(v, 2)}`);
      const right = ask === "fixed" ? money(fixed) : money(per);
      const w = ask === "fixed" ? [[money(per), "That's the cost per mile (the gradient)."], [money(fixed + per), "The fixed charge is the cost when the distance is 0."]] : [[money(fixed), "That's the fixed charge (where the line starts)."], [money(fixed + per), "That's the total for 1 mile. The cost per mile is the gradient."]];
      if (new Set([right, ...w.map((x) => x[0])]).size < 3) return null;
      return mc3(rng, `The graph shows the cost of a taxi journey. What is ${ask === "fixed" ? "the fixed charge (the cost before any miles)" : "the cost per mile"}?`, right, w, {
        diagram: { kind: "graph", x: [0, 10], y: [0, 30], xStep: 1, yStep: 2, curves: [{ points: [[0, fixed], [10, fixed + 10 * per]] }], xLabel: "Miles", yLabel: "Cost (£)", description: `Straight line starting at £${fixed} and rising £${per} per mile.` },
        hints: ["The fixed charge is where the line crosses the cost axis.", "The cost per mile is the gradient: rise for each 1 mile."],
        solution: [`Starts at ${money(fixed)}; rises ${money(per)} for each mile.`, `Answer: ${right}`], data: {},
      });
    }, () => true),
  ],
  [S(6, 6)]: [
    core(S(6, 6), "dt-speed", "Speed from a distance-time graph", (rng) => {
      const t1 = rng.pick([1, 2]), d1 = rng.pick([20, 30, 40, 60]) * t1 / (t1 === 2 ? 2 : 1), stop = rng.pick([0.5, 1]);
      const speed = d1 / t1;
      return mc3(rng, "The graph shows Mia's cycle ride. What was her speed for the first part of the journey?", `${fmt(speed)} km/h`, [[`${fmt(d1)} km/h`, `That's the distance. Speed = distance ÷ time (${t1} hour${t1 > 1 ? "s" : ""}).`], [`${fmt(round(t1 / d1, 3))} km/h`, "Speed = distance ÷ time, not time ÷ distance."]], {
        diagram: { kind: "graph", x: [0, 4], y: [0, 70], xStep: 0.5, yStep: 10, curves: [{ points: [[0, 0], [t1, d1], [t1 + stop, d1], [4, 0]] }], xLabel: "Time (h)", yLabel: "Distance (km)", description: `Distance-time graph: ${d1} km in ${t1} hours, a stop of ${stop} hours, then back home.` },
        hints: ["Speed = distance ÷ time.", `In the first section she travels ${d1} km in ${t1} hour${t1 > 1 ? "s" : ""}.`],
        solution: [`${d1} ÷ ${t1} = ${fmt(speed)} km/h`], data: {},
      });
    }, (q) => new Set(q.options.map((o) => o.label)).size === 3),
    extend(S(6, 6), "dt-stop", "Reading a stop from a distance-time graph", (rng) => {
      const t1 = rng.pick([0.5, 1, 1.5]), stop = rng.pick([0.5, 1, 1.5]), d1 = rng.pick([20, 30, 40]);
      const mins = stop * 60;
      return mc3(rng, "The graph shows a journey. For how long did the traveller stop?", `${mins} minutes`, [[`${mins + 30} minutes`, "Read the start and end of the flat section carefully."], [`${t1 * 60} minutes`, "The stop is the FLAT part of the graph (distance not changing)."]], {
        diagram: { kind: "graph", x: [0, 4], y: [0, 50], xStep: 0.5, yStep: 10, curves: [{ points: [[0, 0], [t1, d1], [t1 + stop, d1], [3.5, 0]] }], xLabel: "Time (h)", yLabel: "Distance (km)", description: `Distance-time graph with a flat section from ${t1} h to ${t1 + stop} h.` },
        hints: ["A horizontal section means the distance isn't changing: the traveller is stopped.", "Each small square across is half an hour."],
        solution: [`Flat from ${fmt(t1)} h to ${fmt(t1 + stop)} h`, `${fmt(stop)} hours = ${mins} minutes`], data: {},
      });
    }, (q) => new Set(q.options.map((o) => o.label)).size === 3),
  ],
};

/* =============================== UNIT 7: Sequences =============================== */
const nthText = (d, b) => `${d === 1 ? "" : d === -1 ? "−" : fmt(d)}n${b === 0 ? "" : " " + sgn(b)}`;

const U7 = {
  [S(7, 1)]: [
    core(S(7, 1), "nth-term-increasing", "Finding the nth term", (rng) => {
      const d = rng.int(2, 9), b = rng.int(-6, 8);
      const terms = [1, 2, 3, 4, 5].map((n) => d * n + b);
      return expr(`Find the nth term of the sequence ${terms.join(", ")}, …`, `${d}*n+(${b})`, {
        answerText: nthText(d, b), flags: { simplified: true },
        traps: [{ expr: `n+(${d})`, feedback: `The sequence goes up by ${d} each time, so it starts “${d}n”.` }],
        hints: [`The common difference is ${d}, so the nth term starts ${d}n.`, `${d}n gives ${d}, ${2 * d}, ${3 * d}… How do you get from these to the sequence?`],
        solution: [`Difference = ${d}, so ${d}n`, `${d} × 1 = ${d}; the first term is ${terms[0]}, so adjust by ${fmt(b)}`, `nth term = ${nthText(d, b)}`], data: {},
      });
    }, () => true),
    extend(S(7, 1), "nth-term-decreasing", "nth term of a decreasing sequence", (rng) => {
      const d = -rng.int(2, 7), b = rng.int(10, 40);
      const terms = [1, 2, 3, 4, 5].map((n) => d * n + b);
      return expr(`Find the nth term of the sequence ${terms.map(fmt).join(", ")}, …`, `${d}*n+(${b})`, {
        answerText: `${b} − ${-d}n`, flags: { simplified: true },
        hints: [`The sequence goes DOWN by ${-d}, so the nth term contains ${d}n.`, `${d}n gives ${d}, ${2 * d}… Add ${b} to get the sequence.`],
        solution: [`Difference = ${d}`, `nth term = ${b} − ${-d}n`], data: {},
      });
    }, () => true),
  ],
  [S(7, 2)]: [
    core(S(7, 2), "find-term", "Using the nth term", (rng) => {
      const d = nz(rng, -6, 9), b = rng.int(-10, 10), k = rng.pick([10, 15, 20, 25, 50, 100]);
      return num(`The nth term of a sequence is ${nthText(d, b)}. Find the ${k}th term.`, d * k + b, {
        hints: [`Substitute n = ${k}.`, `${fmt(d)} × ${k} ${sgn(b)}.`],
        solution: [`${fmt(d)} × ${k} ${sgn(b)} = ${fmt(d * k + b)}`], data: {},
      });
    }, () => true),
    extend(S(7, 2), "which-term", "Which term is it?", (rng) => {
      const d = rng.int(2, 9), b = rng.int(-6, 10), n = rng.int(8, 60);
      const value = d * n + b;
      return num(`The nth term of a sequence is ${nthText(d, b)}. Which term is equal to ${value}?`, n, {
        traps: [T(value, `${value} is the value of the term. The question asks for its position, n.`)],
        hints: [`Solve ${nthText(d, b)} = ${value}.`, `${d}n = ${value - b}.`],
        solution: [`${nthText(d, b)} = ${value}`, `${d}n = ${value - b}`, `n = ${n}`], data: {},
      });
    }, () => true),
  ],
  [S(7, 3)]: [
    core(S(7, 3), "geometric-next", "Geometric sequences", (rng) => {
      const a = rng.int(1, 6), r = rng.pick([2, 3, 4, 5, -2, 0.5]);
      const t = [0, 1, 2, 3].map((i) => clean(a * (r === 0.5 ? 64 : 1) * r ** i));
      const next = clean(t[3] * r);
      return num(`Find the next term of the geometric sequence ${t.map(fmt).join(", ")}, …`, next, {
        traps: [T(clean(t[3] + (t[3] - t[2])), "This isn't arithmetic (adding the same amount). Each term is MULTIPLIED by the same number.")],
        hints: ["Divide a term by the one before it to find the common ratio.", `Ratio = ${fmt(t[1])} ÷ ${fmt(t[0])} = ${fmt(r)}.`],
        solution: [`Common ratio = ${fmt(r)}`, `${fmt(t[3])} × ${fmt(r)} = ${fmt(next)}`], data: {},
      });
    }, () => true),
    extend(S(7, 3), "geometric-term", "A later term of a geometric sequence", (rng) => {
      const a = rng.int(1, 5), r = rng.pick([2, 3]), k = rng.int(5, 8);
      const value = a * r ** (k - 1);
      return num(`A geometric sequence starts ${a}, ${a * r}, ${a * r * r}, … Find the ${k}th term.`, value, {
        traps: [T(a * r ** k, `The first term is ${a} × ${r}⁰, so the ${k}th term is ${a} × ${r}^${k - 1}.`)],
        hints: [`Common ratio = ${r}.`, `Keep multiplying by ${r}, or use ${a} × ${r}^${k - 1}.`],
        solution: [`${k}th term = ${a} × ${r}^${k - 1} = ${value}`], data: {},
      });
    }, () => true),
  ],
  [S(7, 4)]: [
    core(S(7, 4), "name-special", "Recognising special sequences", (rng) => {
      const kind = rng.pick(["square", "triangular", "cube", "fibonacci"]);
      const seqs = { square: [1, 4, 9, 16, 25], triangular: [1, 3, 6, 10, 15], cube: [1, 8, 27, 64, 125], fibonacci: [1, 1, 2, 3, 5, 8] };
      const names = { square: "Square numbers", triangular: "Triangular numbers", cube: "Cube numbers", fibonacci: "Fibonacci sequence" };
      const wrong = rng.shuffle(Object.keys(names).filter((k) => k !== kind)).slice(0, 2);
      return mc3(rng, `What is the name of the sequence ${seqs[kind].join(", ")}, …?`, names[kind], wrong.map((w) => [names[w], `${names[w]} go ${seqs[w].join(", ")}, …`]), {
        hints: ["Square numbers: 1², 2², 3²… Cube numbers: 1³, 2³, 3³…", "Triangular numbers add 2, 3, 4… Fibonacci: each term is the sum of the two before."],
        solution: [`${seqs[kind].join(", ")} are the ${names[kind].toLowerCase()}.`], data: {},
      });
    }, () => true),
    extend(S(7, 4), "fibonacci-type", "Fibonacci-type sequences", (rng) => {
      const a = rng.int(1, 6), b = rng.int(1, 9);
      const t = [a, b]; while (t.length < 7) t.push(t.at(-1) + t.at(-2));
      return num(`In a Fibonacci-type sequence, each term is the sum of the two before. The first two terms are ${a} and ${b}. Find the 7th term.`, t[6], {
        hints: [`Third term = ${a} + ${b} = ${a + b}.`, "Keep adding the last two terms."],
        solution: [`${t.join(", ")}`, `7th term = ${t[6]}`], data: {},
      });
    }, () => true),
  ],
};

export const Y9A_GENERATORS = { ...U1, ...U2, ...U3, ...U4, ...U5, ...U6, ...U7 };
