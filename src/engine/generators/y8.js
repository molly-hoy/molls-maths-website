/* ==========================================================================
   Year 8 generators, Units 1–12 (light format: core + extend per lesson)
   Negatives and powers · Fractions · Percentages · Equations · Graphs ·
   Ratio and proportion · Circles · Angles and polygons · 3D shapes ·
   Transformations · Charts · Probability
   ========================================================================== */
import { clean, fmt, gcd, round, simplify } from "../numbers.js";
import { core, expr, extend, frac, mc3, multi, num, reuse, T } from "./helpers.js";
import { Y7U1_GENERATORS } from "./y7u1.js";
import { Y7B_GENERATORS } from "./y7b.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y9B_GENERATORS } from "./y9b.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10C_GENERATORS } from "./y10c.js";
import { BANK_GENERATORS } from "./bank.js";

const S = (u, l) => `y8-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, make, v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, make, v);
const ALL = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS };
const from = (id, level) => ALL[id].find((g) => g.level === level);
const bank = (name) => BANK_GENERATORS.find((g) => g.id === `bank/${name}`);
const R = (gen, u, l, level, name) => reuse(gen, S(u, l), level, name);
const N = (prompt, value, hints, solution, o = {}) => num(prompt, value, { hints, solution, ...o });
const F = (n, d) => { const f = simplify({ n, d }); return f; };
const fs = (n, d) => (d === 1 ? `${n}` : `{${n}/${d}}`);
const nz = (rng, a, b) => rng.nonZero(a, b);
const safe1 = (x) => Math.abs(((Math.abs(x) * 10) % 1) - 0.5) > 1e-4;
const dp1 = (prompt, exact, unit, hints, steps, o = {}) => (safe1(exact) ? num(prompt, round(exact, 1), { dp: 1, unit, hints, solution: [...steps, `= ${fmt(round(exact, 1), 1)}${unit ? " " + unit : ""}`], traps: o.traps ?? [], data: { exact } }) : null);
const dpValid = (q) => Math.abs(round(q.data.exact, 1) - q.answer.value) < 1e-9;
const fmtP = (x, y) => `(${fmt(x)}, ${fmt(y)})`;

/* ---------------- Unit 1: Negative numbers and powers ---------------- */
const U1 = {
  [S(1, 1)]: [R(from("y7-u1-l6", 3), 1, 1, 1, "add-subtract-integers"), R(from("y7-u1-l6", 4), 1, 1, 2, "subtract-negatives")],
  [S(1, 2)]: [
    C(1, 2, "multiply-negatives", (rng) => { const a = nz(rng, -12, 12), b = nz(rng, -12, 12), div = rng.chance(0.4); if (a > 0 && b > 0) return null; return div ? N(`Work out ${fmt(a * b)} ÷ ${b < 0 ? `(${fmt(b)})` : b}.`, a, ["Divide the numbers, then decide the sign.", "Same signs give a positive; different signs give a negative."], [`${Math.abs(a * b)} ÷ ${Math.abs(b)} = ${Math.abs(a)}`, `Sign: ${(a * b < 0) === (b < 0) ? "same → positive" : "different → negative"}`, `= ${fmt(a)}`], { traps: [T(-a, "Check the sign: same signs give a positive answer.")] }) : N(`Work out ${a < 0 ? `(${fmt(a)})` : a} × ${b < 0 ? `(${fmt(b)})` : b}.`, a * b, ["Multiply the numbers, then decide the sign.", "Same signs → positive; different signs → negative."], [`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}`, `= ${fmt(a * b)}`], { traps: [T(-a * b, "Check the sign: two negatives make a positive.")] }); }),
    E(1, 2, "three-negatives", (rng) => { const a = nz(rng, -6, -1), b = nz(rng, -6, -1), c = nz(rng, -5, 5); if ((a * b) % c !== 0) return null; const v = (a * b) / c; return N(`Work out (${fmt(a)}) × (${fmt(b)}) ÷ ${c < 0 ? `(${fmt(c)})` : c}.`, v, ["Work from left to right.", `(${fmt(a)}) × (${fmt(b)}) = ${a * b}.`], [`${a * b} ÷ ${fmt(c)} = ${fmt(v)}`], { traps: [T(-v, "Count the negative signs: an even number gives a positive.")] }); }),
  ],
  [S(1, 3)]: [
    C(1, 3, "roots", (rng) => { const cube = rng.chance(0.4), n = cube ? rng.int(2, 10) : rng.int(2, 15); return N(`Work out ${cube ? "∛" : "√"}${cube ? n ** 3 : n * n}.`, n, [cube ? "Which number cubed gives this?" : "Which number squared gives this?", "Use your square and cube numbers."], [`${n}${cube ? "³" : "²"} = ${cube ? n ** 3 : n * n}`], { traps: [T(cube ? (n ** 3) / 3 : (n * n) / 2, "A root isn't dividing.")] }); }),
    E(1, 3, "estimate-root", (rng) => { const n = rng.int(3, 14); const x = n * n + rng.int(1, 2 * n); return mc3(rng, `Between which two whole numbers is √${x}?`, `${n} and ${n + 1}`, [[`${n - 1} and ${n}`, `${n}² = ${n * n}, which is less than ${x}.`], [`${n + 1} and ${n + 2}`, `${n + 1}² = ${(n + 1) ** 2}, which is more than ${x}.`]], { hints: ["Find the square numbers either side.", `${n}² = ${n * n} and ${n + 1}² = ${(n + 1) ** 2}.`], solution: [`${n * n} < ${x} < ${(n + 1) ** 2}`, `So √${x} is between ${n} and ${n + 1}`] }); }),
  ],
  [S(1, 4)]: [
    C(1, 4, "evaluate-power", (rng) => { const b = rng.int(2, 6), p = rng.int(2, b <= 3 ? 6 : 4); return N(`Work out ${b}^${p}.`, b ** p, [`${b}^${p} means ${Array(p).fill(b).join(" × ")}.`, "It's not " + b + " × " + p + "."], [`${Array(p).fill(b).join(" × ")} = ${b ** p}`], { traps: [T(b * p, "A power means repeated multiplication, not b × p.")] }); }),
    E(1, 4, "product-of-powers", (rng) => { const a = rng.int(1, 4), b = rng.int(1, 3); return N(`Work out 2^${a} × 3^${b}.`, 2 ** a * 3 ** b, ["Work out each power first.", `2^${a} = ${2 ** a}, 3^${b} = ${3 ** b}.`], [`${2 ** a} × ${3 ** b} = ${2 ** a * 3 ** b}`], { traps: [T(6 ** (a + b), "You can't combine powers with different bases.")] }); }),
  ],
  [S(1, 5)]: [R(from("y7-u1-l8", 3), 1, 5, 1, "with-indices"), R(from("y7-u1-l8", 4), 1, 5, 2, "place-brackets")],
};

/* ---------------- Unit 2: Calculating with fractions ---------------- */
const pf = (rng) => { const d = rng.int(2, 9); let n = rng.int(1, d - 1); while (gcd(n, d) > 1) n = rng.int(1, d - 1); return [n, d]; };
const U2 = {
  [S(2, 1)]: [
    C(2, 1, "multiply-fractions", (rng) => { const [a, b] = pf(rng), [c, d] = pf(rng); const f = F(a * c, b * d); return frac(`Work out {${a}/${b}} × {${c}/${d}}. Simplify your answer.`, f.n, f.d, { hints: ["Multiply the numerators together and the denominators together.", `{${a * c}/${b * d}}, then simplify.`], solution: [`{${a}/${b}} × {${c}/${d}} = {${a * c}/${b * d}}`, ...(f.d !== b * d ? [`= ${fs(f.n, f.d)}`] : [])] }); }),
    E(2, 1, "fraction-times-integer", (rng) => { const [a, b] = pf(rng), k = rng.int(2, 20); const f = F(a * k, b); return frac(`Work out {${a}/${b}} × ${k}. (You can give an improper fraction or a mixed number.)`, f.n, f.d, { hints: [`${k} = {${k}/1}.`, `{${a * k}/${b}}, then simplify.`], solution: [`{${a}/${b}} × ${k} = {${a * k}/${b}}`, ...(f.d !== b ? [`= ${fs(f.n, f.d)}`] : [])] }); }),
  ],
  [S(2, 2)]: [
    C(2, 2, "divide-fractions", (rng) => { const [a, b] = pf(rng), [c, d] = pf(rng); const f = F(a * d, b * c); return frac(`Work out {${a}/${b}} ÷ {${c}/${d}}. Simplify your answer.`, f.n, f.d, { hints: ["Keep the first fraction, change ÷ to ×, flip the second fraction.", `{${a}/${b}} × {${d}/${c}}.`], solution: [`{${a}/${b}} × {${d}/${c}} = {${a * d}/${b * c}}`, ...(f.d !== b * c || f.n !== a * d ? [`= ${fs(f.n, f.d)}`] : [])], traps: [T((a * c) / (b * d), "That's multiplying. For division, flip the second fraction first.")] }); }),
    E(2, 2, "how-many-bottles", (rng) => { const [a, b] = rng.pick([[1, 2], [3, 4], [1, 4], [2, 3], [1, 3], [3, 5]]); const total = a * rng.int(2, 12); return N(`How many {${a}/${b}}-litre bottles can be filled from ${total} litres?`, (total * b) / a, ["Divide the total by the size of one bottle.", `${total} ÷ {${a}/${b}} = ${total} × {${b}/${a}}.`], [`${total} × ${b} ÷ ${a} = ${(total * b) / a}`], { traps: [T(clean((total * a) / b), "Dividing by a fraction less than 1 gives a BIGGER answer.")] }); }),
  ],
  [S(2, 3)]: [
    C(2, 3, "add-mixed-same", (rng) => { const d = rng.int(3, 9), w1 = rng.int(1, 4), w2 = rng.int(1, 4), n1 = rng.int(1, d - 1), n2 = rng.int(1, d - 1); const f = F((w1 + w2) * d + n1 + n2, d); return frac(`Work out ${w1} {${n1}/${d}} + ${w2} {${n2}/${d}}. (Mixed number or improper fraction.)`, f.n, f.d, { hints: ["Add the whole numbers, then add the fractions.", `${w1 + w2} and {${n1 + n2}/${d}}.`], solution: [`${w1 + w2} + {${n1 + n2}/${d}}`, `= ${fs(f.n, f.d)}`] }); }),
    E(2, 3, "subtract-mixed-different", (rng) => { const b = rng.int(2, 5), d = rng.int(2, 6); if (b === d) return null; const w1 = rng.int(3, 6), w2 = rng.int(1, w1 - 1), a = rng.int(1, b - 1), c = rng.int(1, d - 1); const top = (w1 * b + a) * d - (w2 * d + c) * b; const f = F(top, b * d); return frac(`Work out ${w1} {${a}/${b}} − ${w2} {${c}/${d}}.`, f.n, f.d, { hints: ["Change both to improper fractions.", `Use a common denominator of ${b * d}.`], solution: [`{${w1 * b + a}/${b}} − {${w2 * d + c}/${d}}`, `= {${(w1 * b + a) * d}/${b * d}} − {${(w2 * d + c) * b}/${b * d}} = {${top}/${b * d}}`, `= ${fs(f.n, f.d)}`] }); }),
  ],
  [S(2, 4)]: [
    C(2, 4, "multiply-mixed", (rng) => { const w1 = rng.int(1, 3), w2 = rng.int(1, 3), [a, b] = pf(rng), [c, d] = pf(rng); const p = (w1 * b + a) * (w2 * d + c), q = b * d; const f = F(p, q); return frac(`Work out ${w1} {${a}/${b}} × ${w2} {${c}/${d}}.`, f.n, f.d, { hints: ["Change both to improper fractions first.", `{${w1 * b + a}/${b}} × {${w2 * d + c}/${d}}.`], solution: [`{${w1 * b + a}/${b}} × {${w2 * d + c}/${d}} = {${p}/${q}}`, `= ${fs(f.n, f.d)}`], traps: [T(w1 * w2 + (a * c) / (b * d), "You can't multiply the whole numbers and fractions separately.")] }); }),
    E(2, 4, "divide-mixed", (rng) => { const w1 = rng.int(1, 4), w2 = rng.int(1, 3), [a, b] = pf(rng), [c, d] = pf(rng); const p = (w1 * b + a) * d, q = b * (w2 * d + c); const f = F(p, q); return frac(`Work out ${w1} {${a}/${b}} ÷ ${w2} {${c}/${d}}.`, f.n, f.d, { hints: ["Change to improper fractions.", "Then flip the second and multiply."], solution: [`{${w1 * b + a}/${b}} × {${d}/${w2 * d + c}} = {${p}/${q}}`, `= ${fs(f.n, f.d)}`] }); }),
  ],
  [S(2, 5)]: [
    C(2, 5, "fraction-left", (rng) => { const [a, b] = rng.pick([[1, 3], [1, 4], [2, 5], [1, 2], [3, 8]]), [c, d] = rng.pick([[1, 4], [1, 3], [1, 2], [2, 3]]); const leftAfter1 = F(b - a, b); const f = F(leftAfter1.n * (d - c), leftAfter1.d * d); return frac(`Mia spends {${a}/${b}} of her money on a game, then {${c}/${d}} of what is left on food. What fraction of her money is left?`, f.n, f.d, { hints: [`After the game, {${b - a}/${b}} is left.`, `She spends {${c}/${d}} of that, so {${d - c}/${d}} of it remains.`], solution: [`{${b - a}/${b}} × {${d - c}/${d}} = ${fs(f.n, f.d)}`], traps: [T(1 - a / b - c / d, `The {${c}/${d}} is of what is LEFT, not of the original amount.`)] }); }),
    E(2, 5, "students-cycle", (rng) => { const [a, b] = rng.pick([[2, 5], [1, 3], [1, 4], [3, 10]]), [c, d] = rng.pick([[1, 3], [1, 4], [1, 5], [1, 6]]); const tot = b * d * rng.int(1, 4); const rest = tot - (tot * a) / b - (tot * c) / d; if (rest <= 0) return null; return N(`In a school of ${tot} students, {${a}/${b}} walk and {${c}/${d}} take the bus. The rest cycle. How many cycle?`, rest, ["Find how many walk and how many take the bus.", `Walk: ${(tot * a) / b}; bus: ${(tot * c) / d}.`], [`${tot} − ${(tot * a) / b} − ${(tot * c) / d} = ${rest}`]); }),
  ],
};

/* ---------------- Unit 3: Percentages ---------------- */
const U3 = {
  [S(3, 1)]: [R(from("y10-u1-l1", 1), 3, 1, 1, "frac-to-percent"), R(from("y10-u1-l1", 2), 3, 1, 2, "largest-fdp")],
  [S(3, 2)]: [
    C(3, 2, "percent-calculator", (rng) => { const p = rng.int(3, 97), a = rng.int(20, 900); return N(`Use a calculator to find ${p}% of £${a}.`, round((p * a) / 100, 2), [`${p}% = ${fmt(p / 100)}.`, `${fmt(p / 100)} × ${a}.`], [`${fmt(p / 100)} × ${a} = £${fmt(round((p * a) / 100, 2), 2)}`], { dp: 2, pre: "£", traps: [T(round(a / p, 2), "Multiply by the percentage as a decimal; don't divide.")] }); }),
    E(3, 2, "over-100-percent", (rng) => { const p = rng.pick([105, 110, 115, 120, 125, 150, 12.5, 17.5]), a = rng.int(40, 600); return N(`Find ${p}% of ${a}.`, round((p * a) / 100, 2), [`${p}% as a decimal is ${fmt(p / 100)}.`, `${fmt(p / 100)} × ${a}.`], [`${fmt(p / 100)} × ${a} = ${fmt(round((p * a) / 100, 2))}`]); }),
  ],
  [S(3, 3)]: [
    C(3, 3, "increase-percent", (rng) => { const p = rng.pick([5, 10, 12, 15, 20, 25, 30]), a = rng.int(2, 50) * 20; const v = clean(a + (a * p) / 100); return N(`Increase £${a} by ${p}%.`, v, [`Find ${p}% of £${a}.`, `${p}% of ${a} = ${clean((a * p) / 100)}. Add it on.`], [`${a} + ${clean((a * p) / 100)} = £${fmt(v)}`], { pre: "£", traps: [T(clean((a * p) / 100), "That's the increase. Add it to the original.")] }); }),
    E(3, 3, "decrease-percent", (rng) => { const p = rng.pick([5, 15, 20, 25, 35, 40]), a = rng.int(2, 50) * 20; const v = clean(a - (a * p) / 100); return N(`A coat costs £${a}. It is reduced by ${p}% in a sale. What is the sale price?`, v, [`Find ${p}% of £${a}.`, "Take it away from the original price."], [`${p}% of ${a} = ${clean((a * p) / 100)}`, `${a} − ${clean((a * p) / 100)} = £${fmt(v)}`], { pre: "£", traps: [T(clean((a * p) / 100), "That's the reduction. Subtract it from the original price.")] }); }),
  ],
  [S(3, 4)]: [R(from("y10-u2-l1", 1), 3, 4, 1, "find-multiplier"), R(from("y10-u2-l1", 2), 3, 4, 2, "use-multiplier")],
  [S(3, 5)]: [
    C(3, 5, "one-as-percent", (rng) => { const b = rng.pick([20, 25, 40, 50, 80, 200, 250]), a = rng.int(1, b - 1); const v = clean((a / b) * 100); if (!Number.isInteger(v * 10)) return null; return { ...N(`Write ${a} as a percentage of ${b}.`, v, ["Write it as a fraction: " + a + "/" + b + ".", "Multiply by 100."], [`${a} ÷ ${b} × 100 = ${fmt(v)}%`], { answerText: `${fmt(v)}%` }), type: "percentage" }; }),
    E(3, 5, "percent-1dp", (rng) => { const b = rng.int(30, 90), a = rng.int(5, b - 1); const v = (a / b) * 100; if (!safe1(v)) return null; return num(`A student scores ${a} out of ${b}. What percentage is this, to 1 decimal place?`, round(v, 1), { dp: 1, hints: [`${a} ÷ ${b} × 100.`, "Round to 1 decimal place."], solution: [`${a} ÷ ${b} × 100 = ${fmt(round(v, 4))}…`, `= ${fmt(round(v, 1), 1)}%`], data: { exact: v } }); }, dpValid),
  ],
  [S(3, 6)]: [
    R(bank("percent-change"), 3, 6, 1, "percent-change"),
    E(3, 6, "percent-profit", (rng) => { const cost = rng.int(4, 40) * 5, p = rng.pick([10, 20, 25, 30, 40, 50, 60]); const sell = clean(cost * (1 + p / 100)); return { ...N(`A trader buys a bike for £${cost} and sells it for £${fmt(sell)}. What is her percentage profit?`, p, ["Profit = selling price − cost.", `Percentage profit = profit ÷ COST × 100.`], [`Profit = £${fmt(clean(sell - cost))}`, `${fmt(clean(sell - cost))} ÷ ${cost} × 100 = ${p}%`], { answerText: `${p}%`, traps: [T(round(((sell - cost) / sell) * 100, 1), "Divide by the original cost, not the selling price.")] }), type: "percentage" }; }),
  ],
};

/* ---------------- Unit 4: Expressions and equations ---------------- */
const U4 = {
  [S(4, 1)]: [
    R(bank("expand-bracket"), 4, 1, 1, "expand-bracket"),
    E(4, 1, "factorise-single", (rng) => { const k = rng.int(2, 9), a = rng.int(1, 6), b = nz(rng, -9, 9); if (gcd(a, Math.abs(b)) !== 1) return null; return expr(`Factorise fully ${k * a}x ${b < 0 ? "−" : "+"} ${Math.abs(k * b)}.`, `${k}*(${a}*x+(${b}))`, { flags: { factorised: true }, answerText: `${k}(${a === 1 ? "" : a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)})`, hints: [`Find the highest common factor of ${k * a} and ${Math.abs(k * b)}.`, `It's ${k}. Write ${k}( … ).`], solution: [`HCF = ${k}`, `${k}(${a === 1 ? "" : a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)})`], traps: [] }); }),
  ],
  [S(4, 2)]: [
    C(4, 2, "think-of-a-number", (rng) => { const x = rng.int(2, 20), k = rng.int(2, 6), c = rng.int(1, 15); return N(`I think of a number, multiply it by ${k} and add ${c}. The answer is ${k * x + c}. What was my number?`, x, [`Write it as an equation: ${k}n + ${c} = ${k * x + c}.`, `Subtract ${c}, then divide by ${k}.`], [`${k}n = ${k * x}`, `n = ${x}`], { traps: [T(clean((k * x + c) / k - c), "Undo in reverse order: subtract first, then divide.")] }); }),
    E(4, 2, "triangle-perimeter", (rng) => { const x = rng.int(3, 15), a = rng.int(1, 9); const P = x + (x + a) + 2 * x; return N(`A triangle has sides x cm, (x + ${a}) cm and 2x cm. Its perimeter is ${P} cm. Find x.`, x, ["Add the three sides and set equal to the perimeter.", `4x + ${a} = ${P}.`], [`4x = ${P - a}`, `x = ${x}`]); }),
  ],
  [S(4, 3)]: [
    C(4, 3, "one-step", (rng) => { const x = rng.int(-10, 20), a = rng.int(2, 12), mult = rng.chance(0.5); return mult ? N(`Solve ${a}x = ${a * x}.`, x, [`Divide both sides by ${a}.`, `${a * x} ÷ ${a}.`], [`x = ${x}`]) : N(`Solve x + ${a} = ${x + a}.`, x, [`Subtract ${a} from both sides.`, `${x + a} − ${a}.`], [`x = ${x}`], { traps: [T(x + 2 * a, "Do the inverse: subtract, don't add.")] }); }),
    E(4, 3, "divide-equation", (rng) => { const x = rng.int(2, 15), a = rng.int(2, 9); return N(`Solve x/${a} = ${x}.`, a * x, [`Multiply both sides by ${a}.`, `${x} × ${a}.`], [`x = ${a * x}`], { traps: [T(clean(x / a), "Undo dividing by multiplying.")] }); }),
  ],
  [S(4, 4)]: [
    R(bank("two-step-equation"), 4, 4, 1, "two-step-equation"),
    E(4, 4, "bracket-over-number", (rng) => { const x = rng.int(-5, 15), a = nz(rng, -9, 9), b = rng.int(2, 6); const c = (x + a) / b; if (!Number.isInteger(c)) return null; return N(`Solve (x ${a < 0 ? "−" : "+"} ${Math.abs(a)}) ÷ ${b} = ${c}.`, x, [`Multiply both sides by ${b}.`, `x ${a < 0 ? "−" : "+"} ${Math.abs(a)} = ${b * c}.`], [`x ${a < 0 ? "−" : "+"} ${Math.abs(a)} = ${b * c}`, `x = ${x}`]); }),
  ],
  [S(4, 5)]: [
    C(4, 5, "bracket-equation", (rng) => { const x = rng.int(1, 12), a = rng.int(2, 6), b = nz(rng, -6, 9); return N(`Solve ${a}(x ${b < 0 ? "−" : "+"} ${Math.abs(b)}) = ${a * (x + b)}.`, x, [`Divide both sides by ${a} (or expand).`, `x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${x + b}.`], [`x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${x + b}`, `x = ${x}`]); }),
    E(4, 5, "bracket-negative-answer", (rng) => { const x = rng.int(-8, -1), a = rng.int(2, 5), b = rng.int(2, 4), c = rng.int(1, 9); return N(`Solve ${a}(${b}x − ${c}) = ${a * (b * x - c)}.`, x, ["Expand the bracket.", `${a * b}x − ${a * c} = ${a * (b * x - c)}.`], [`${a * b}x = ${a * (b * x - c) + a * c}`, `x = ${x}`], { traps: [T(-x, "Check the sign of your answer by substituting back.")] }); }),
  ],
  [S(4, 6)]: [
    C(4, 6, "unknowns-both-sides", (rng) => { const x = rng.int(-5, 12), a = rng.int(3, 9), c = rng.int(1, a - 1), b = rng.int(-10, 10); const d = a * x + b - c * x; return N(`Solve ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${c === 1 ? "" : c}x ${d < 0 ? "−" : "+"} ${Math.abs(d)}.`, x, [`Subtract ${c === 1 ? "" : c}x from both sides.`, `${a - c}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${d}.`], [`${a - c}x = ${d - b}`, `x = ${x}`]); }),
    E(4, 6, "both-sides-brackets", (rng) => { const x = rng.int(-4, 10), a = rng.int(2, 5), b = nz(rng, -5, 6), c = rng.int(1, 2 * a - 1); if (c === a) return null; const d = a * (x + b) - c * x; return N(`Solve ${a}(x ${b < 0 ? "−" : "+"} ${Math.abs(b)}) = ${c === 1 ? "" : c}x ${d < 0 ? "−" : "+"} ${Math.abs(d)}.`, x, ["Expand the bracket first.", `${a}x ${a * b < 0 ? "−" : "+"} ${Math.abs(a * b)} = ${c === 1 ? "" : c}x ${d < 0 ? "−" : "+"} ${Math.abs(d)}. Collect x terms on one side.`], [`${a - c}x = ${d - a * b}`, `x = ${x}`]); }),
  ],
};

/* ---------------- Unit 5: Coordinates and straight-line graphs ---------------- */
const grid = (extra) => ({ kind: "graph", x: [-6, 6], y: [-6, 6], xStep: 1, yStep: 1, ...extra });
const U5 = {
  [S(5, 1)]: [
    C(5, 1, "read-coordinates", (rng) => { const x = nz(rng, -5, 5), y = nz(rng, -5, 5); if (Math.abs(x) === Math.abs(y)) return null; return mc3(rng, "What are the coordinates of point P?", fmtP(x, y), [[fmtP(y, x), "Coordinates are (across, up): x first."], [fmtP(-x, y), "Check which side of the y-axis P is on."]], { diagram: grid({ points: [{ x, y, label: "P" }], description: `Point P at (${x}, ${y}).` }), hints: ["Read across (x) first, then up or down (y).", "Left of the y-axis means negative x; below the x-axis means negative y."], solution: [`P = ${fmtP(x, y)}`] }); }),
    E(5, 1, "fourth-vertex", (rng) => { const x1 = rng.int(-5, 0), y1 = rng.int(-5, 0), w = rng.int(2, 5), h = rng.int(2, 5); return multi(`Three corners of a rectangle are ${fmtP(x1, y1)}, ${fmtP(x1 + w, y1)} and ${fmtP(x1 + w, y1 + h)}. Find the fourth corner.`, [["x =", x1], ["y =", y1 + h]], { answerText: fmtP(x1, y1 + h), hints: ["Sketch the three points.", "The fourth corner lines up with the others horizontally and vertically."], solution: [`The fourth corner is ${fmtP(x1, y1 + h)}`] }); }),
  ],
  [S(5, 2)]: [
    C(5, 2, "name-line", (rng) => { const k = nz(rng, -4, 4), vertical = rng.chance(0.5); const right = vertical ? `x = ${fmt(k)}` : `y = ${fmt(k)}`, swap = vertical ? `y = ${fmt(k)}` : `x = ${fmt(k)}`; return mc3(rng, "What is the equation of this line?", right, [[swap, vertical ? "Every point on a vertical line has the same x-coordinate." : "Every point on a horizontal line has the same y-coordinate."], ["y = x", "y = x is a diagonal line through the origin."]], { diagram: grid({ curves: [{ points: vertical ? [[k, -6], [k, 6]] : [[-6, k], [6, k]] }], description: `A ${vertical ? "vertical" : "horizontal"} line through ${vertical ? `x = ${k}` : `y = ${k}`}.` }), hints: [vertical ? "Is the line vertical or horizontal?" : "Is the line vertical or horizontal?", "Look at a few points on it: which coordinate stays the same?"], solution: [right] }); }),
    E(5, 2, "point-on-line", (rng) => { const k = nz(rng, -5, 5), a = rng.int(-5, 5); return mc3(rng, `Which point lies on the line y = ${fmt(k)}?`, fmtP(a, k), [[fmtP(k, a === k ? a + 1 : a), "On y = k, the y-coordinate is k."], [fmtP(a, k + 1), `The y-coordinate must be exactly ${fmt(k)}.`]], { hints: [`Points on y = ${fmt(k)} all have y-coordinate ${fmt(k)}.`, "Check the second number in each pair."], solution: [`${fmtP(a, k)} has y = ${fmt(k)}`] }); }),
  ],
  [S(5, 3)]: [
    C(5, 3, "table-value", (rng) => { const m = nz(rng, -4, 5), c = rng.int(-6, 6), x = rng.int(-4, 4); return N(`Complete the table for y = ${m === 1 ? "" : m === -1 ? "−" : m}x ${c < 0 ? "−" : "+"} ${Math.abs(c)}. What is y when x = ${x}?`, m * x + c, ["Substitute the x-value.", `y = ${m} × ${x < 0 ? `(${x})` : x} ${c < 0 ? "−" : "+"} ${Math.abs(c)}.`], [`y = ${m * x} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${m * x + c}`]); }),
    E(5, 3, "find-x-from-y", (rng) => { const m = rng.int(2, 6), c = rng.int(-6, 6), x = rng.int(-4, 6); return N(`On the line y = ${m}x ${c < 0 ? "−" : "+"} ${Math.abs(c)}, what is x when y = ${m * x + c}?`, x, [`Solve ${m}x ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${m * x + c}.`, `${m}x = ${m * x}.`], [`x = ${x}`]); }),
  ],
  [S(5, 4)]: [R(from("y9-u6-l3", 1), 5, 4, 1, "equation-from-graph"), R(from("y9-u6-l2", 1), 5, 4, 2, "intercept-rearranged")],
  [S(5, 5)]: [R(from("y9-u6-l1", 1), 5, 5, 1, "gradient-from-graph"), R(from("y10-u6-l1", 1), 5, 5, 2, "gradient-two-points")],
};

/* ---------------- Unit 6: Ratio and proportion ---------------- */
const U6 = {
  [S(6, 1)]: [R(from("y7-u10-l3", 1), 6, 1, 1, "share-two-parts"), R(from("y10-u7-l1", 2), 6, 1, 2, "three-part-share")],
  [S(6, 2)]: [
    C(6, 2, "given-one-part", (rng) => { const a = rng.int(1, 7), b = rng.int(1, 9), u = rng.int(2, 15); if (a === b) return null; return N(`Sweets are shared between Jo and Ken in the ratio ${a} : ${b}. Jo gets ${a * u}. How many does Ken get?`, b * u, [`Jo's ${a} parts = ${a * u}, so 1 part = ${u}.`, `Ken has ${b} parts.`], [`1 part = ${u}`, `Ken = ${b} × ${u} = ${b * u}`], { traps: [T(a * u + b * u, "That's the total. Ken has only his own parts.")] }); }),
    R(from("y10-u7-l2", 1), 6, 2, 2, "difference-share"),
  ],
  [S(6, 3)]: [
    R(from("y10-u7-l3", 1), 6, 3, 1, "direct-unitary"),
    E(6, 3, "currency", (rng) => { const r = rng.pick([1.2, 1.25, 1.15, 1.3]), d = rng.int(10, 200) * 2; return N(`£1 = $${fmt(r, 2)}. Convert $${d} to pounds, to the nearest penny.`, round(d / r, 2), [`$${d} ÷ ${fmt(r)} gives pounds.`, "Dividing makes sense: fewer pounds than dollars."], [`${d} ÷ ${fmt(r)} = ${fmt(round(d / r, 4))}`, `£${fmt(round(d / r, 2), 2)}`], { dp: 2, pre: "£", traps: [T(round(d * r, 2), "That converts pounds to dollars. Here you need to divide.")] }); }),
  ],
  [S(6, 4)]: [
    R(from("y10-u7-l3", 2), 6, 4, 1, "recipe"),
    E(6, 4, "paint-coverage", (rng) => { const l = rng.int(2, 5), A = l * rng.int(6, 12), need = rng.int(30, 150); const v = clean((need * l) / A); if (!Number.isInteger(v * 100)) return null; return N(`${l} litres of paint cover ${A} m². How many litres are needed for ${need} m²?`, v, [`1 m² needs ${l} ÷ ${A} litres.`, `Multiply by ${need}.`], [`${l} ÷ ${A} × ${need} = ${fmt(v)} litres`], { unit: "litres" }); }),
  ],
  [S(6, 5)]: [
    C(6, 5, "best-buy", (rng) => { const g1 = rng.pick([200, 250, 400, 500]), g2 = rng.pick([300, 600, 750, 1000]); const p1 = clean(rng.int(80, 300) / 100), p2v = clean(rng.int(80, 500) / 100); const u1 = p1 / g1, u2 = p2v / g2; if (Math.abs(u1 - u2) < 1e-6) return null; const best = u1 < u2 ? "Pack A" : "Pack B"; return mc3(rng, `Pack A: ${g1} g for £${fmt(p1, 2)}. Pack B: ${g2} g for £${fmt(p2v, 2)}. Which is better value?`, best, [[best === "Pack A" ? "Pack B" : "Pack A", "Compare the cost per gram (or per 100 g)."], ["They are the same value", "Work out the cost per 100 g for each."]], { hints: ["Find the cost per 100 g of each pack.", `A: ${fmt(round((p1 / g1) * 100 * 100, 1))}p per 100 g; B: ${fmt(round((p2v / g2) * 100 * 100, 1))}p per 100 g.`], solution: [`A: £${fmt(p1, 2)} ÷ ${g1 / 100} = ${fmt(round((u1 * 100) * 100, 2))}p per 100 g`, `B: £${fmt(p2v, 2)} ÷ ${g2 / 100} = ${fmt(round((u2 * 100) * 100, 2))}p per 100 g`, `${best} is cheaper per 100 g.`] }); }),
    E(6, 5, "cost-per-100g", (rng) => { const g = rng.pick([200, 250, 400, 500, 800]), pence = (g / 100) * rng.int(20, 90); return N(`A ${g} g bag costs ${pence}p. What is the cost per 100 g, in pence?`, pence / (g / 100), [`${g} g is ${g / 100} lots of 100 g.`, `${pence} ÷ ${g / 100}.`], [`${pence} ÷ ${g / 100} = ${pence / (g / 100)}p`], { unit: "p" }); }),
  ],
};

/* ---------------- Unit 7: Circles and area ---------------- */
const U7 = {
  [S(7, 1)]: [
    C(7, 1, "trapezium-area", (rng) => { const a = rng.int(3, 15), b = rng.int(3, 15), h = rng.int(2, 12); if (a === b) return null; return N(`A trapezium has parallel sides ${a} cm and ${b} cm, and height ${h} cm. Find its area.`, ((a + b) * h) / 2, ["Area = ½(a + b)h.", `½ × (${a} + ${b}) × ${h}.`], [`½ × ${a + b} × ${h} = ${fmt(((a + b) * h) / 2)} cm²`], { unit: "cm²", traps: [T((a + b) * h, "Don't forget the ½.")] }); }),
    E(7, 1, "trapezium-height", (rng) => { const a = rng.int(3, 15), b = rng.int(3, 15), h = rng.int(2, 12); return N(`A trapezium has area ${fmt(((a + b) * h) / 2)} cm² and parallel sides ${a} cm and ${b} cm. Find its height.`, h, ["Area = ½(a + b)h.", `${fmt(((a + b) * h) / 2)} = ½ × ${a + b} × h.`], [`h = 2 × ${fmt(((a + b) * h) / 2)} ÷ ${a + b} = ${h} cm`], { unit: "cm" }); }),
  ],
  [S(7, 2)]: [
    C(7, 2, "circle-parts", (rng) => { const parts = [["radius", "From the centre to the edge"], ["diameter", "Across the circle through the centre"], ["chord", "A straight line joining two points on the circumference"], ["circumference", "The distance all the way round"], ["tangent", "A straight line touching the circle at one point"], ["arc", "Part of the circumference"]]; const [name, def] = rng.pick(parts); const others = rng.shuffle(parts.filter((p) => p[0] !== name)).slice(0, 2); return mc3(rng, `Which part of a circle is described as: “${def}”?`, name[0].toUpperCase() + name.slice(1), others.map(([o]) => [o[0].toUpperCase() + o.slice(1), "Check the definitions of each part of a circle."]), { hints: ["Radius, diameter, chord, tangent, arc, circumference…", "Sketch a circle and draw each one."], solution: [`${def}: the ${name}.`] }); }),
    E(7, 2, "radius-diameter", (rng) => { const r = rng.int(2, 30), toD = rng.chance(0.5); return N(toD ? `A circle has radius ${r} cm. What is its diameter?` : `A circle has diameter ${2 * r} cm. What is its radius?`, toD ? 2 * r : r, ["The diameter is twice the radius.", toD ? `${r} × 2.` : `${2 * r} ÷ 2.`], [toD ? `${r} × 2 = ${2 * r} cm` : `${2 * r} ÷ 2 = ${r} cm`], { unit: "cm" }); }),
  ],
  [S(7, 3)]: [
    C(7, 3, "circumference", (rng) => { const d = rng.int(2, 30); return dp1(`Find the circumference of a circle with diameter ${d} cm, to 1 decimal place.`, Math.PI * d, "cm", ["Circumference = π × diameter.", `π × ${d}.`], [`π × ${d} = ${fmt(round(Math.PI * d, 4))}…`], { traps: [T(round(Math.PI * d * 2, 1), "Use the diameter (or 2 × radius), not 2 × diameter.")] }); }, dpValid),
    E(7, 3, "radius-from-circumference", (rng) => { const C0 = rng.int(10, 120); return dp1(`A circle has circumference ${C0} cm. Find its radius, to 1 decimal place.`, C0 / (2 * Math.PI), "cm", ["C = 2πr, so r = C ÷ 2π.", `${C0} ÷ (2π).`], [`${C0} ÷ ${fmt(round(2 * Math.PI, 4))}… = ${fmt(round(C0 / (2 * Math.PI), 4))}…`], { traps: [T(round(C0 / Math.PI, 1), "That's the diameter. Halve it.")] }); }, dpValid),
  ],
  [S(7, 4)]: [
    C(7, 4, "circle-area", (rng) => { const r = rng.int(2, 20); return dp1(`Find the area of a circle with radius ${r} cm, to 1 decimal place.`, Math.PI * r * r, "cm²", ["Area = πr².", `π × ${r}².`], [`π × ${r * r} = ${fmt(round(Math.PI * r * r, 4))}…`], { traps: [T(round(Math.PI * 2 * r, 1), "That's the circumference. Area uses r².")] }); }, dpValid),
    E(7, 4, "circle-area-diameter", (rng) => { const d = rng.int(2, 20) * 2; return dp1(`Find the area of a circle with diameter ${d} cm, to 1 decimal place.`, Math.PI * (d / 2) ** 2, "cm²", [`Radius = ${d} ÷ 2 = ${d / 2}.`, `π × ${d / 2}².`], [`π × ${(d / 2) ** 2} = ${fmt(round(Math.PI * (d / 2) ** 2, 4))}…`], { traps: [T(round(Math.PI * d * d, 1), "Halve the diameter to get the radius first.")] }); }, dpValid),
  ],
  [S(7, 5)]: [
    C(7, 5, "semicircle-area", (rng) => { const r = rng.int(2, 15); return dp1(`Find the area of a semicircle with radius ${r} cm, to 1 decimal place.`, (Math.PI * r * r) / 2, "cm²", ["A semicircle is half a circle.", `½ × π × ${r}².`], [`½ × π × ${r * r} = ${fmt(round((Math.PI * r * r) / 2, 4))}…`], { traps: [T(round(Math.PI * r * r, 1), "That's a full circle. Halve it.")] }); }, dpValid),
    E(7, 5, "rectangle-plus-semicircle", (rng) => { const w = rng.int(2, 10) * 2, l = rng.int(5, 20); return dp1(`A shape is a rectangle ${l} cm by ${w} cm with a semicircle on one ${w} cm end. Find its total area, to 1 decimal place.`, l * w + (Math.PI * (w / 2) ** 2) / 2, "cm²", [`The semicircle has diameter ${w}, so radius ${w / 2}.`, `${l} × ${w} + ½π × ${w / 2}².`], [`Rectangle ${l * w}, semicircle ${fmt(round((Math.PI * (w / 2) ** 2) / 2, 4))}…`]); }, dpValid),
  ],
};

/* ---------------- Unit 8: Angles in parallel lines and polygons ---------------- */
const U8 = {
  [S(8, 1)]: [
    C(8, 1, "corresponding", (rng) => { const a = rng.int(25, 155); return N(`Two parallel lines are crossed by a transversal. One angle is ${a}°. What is the corresponding angle?`, a, ["Corresponding angles are in matching positions (an F shape).", "They are equal."], [`Corresponding angles are equal: ${a}°`], { unit: "°", traps: [T(180 - a, "Corresponding angles are equal, not adding to 180°.")] }); }),
    E(8, 1, "corresponding-algebra", (rng) => { const x = rng.int(10, 40), k = rng.int(2, 4), c = rng.int(1, 20); const a = k * x + c; if (a >= 180) return null; return N(`Corresponding angles are (${k}x + ${c})° and ${a}°. Find x.`, x, ["Corresponding angles are equal.", `${k}x + ${c} = ${a}.`], [`${k}x = ${a - c}`, `x = ${x}`]); }),
  ],
  [S(8, 2)]: [
    C(8, 2, "reason-alternate", (rng) => mc3(rng, "In a Z shape between parallel lines, two angles are equal. What is the correct reason?", "Alternate angles are equal", [["Corresponding angles are equal", "Corresponding angles make an F shape."], ["Co-interior angles add up to 180°", "Co-interior angles make a C (or U) shape."]], { hints: ["Which letter shape do the lines make?", "Z = alternate, F = corresponding, C = co-interior."], solution: ["Angles in a Z shape are alternate angles, which are equal."] })),
    E(8, 2, "alternate-algebra", (rng) => { const x = rng.int(10, 30), k = rng.int(2, 5), c = rng.int(1, 20), m = k + rng.int(1, 3); const a = k * x + c; const d = m * x - a; return N(`Alternate angles are (${k}x + ${c})° and (${m}x − ${d})°. Find x.`, x, ["Alternate angles are equal.", `${k}x + ${c} = ${m}x − ${d}.`], [`${c + d} = ${m - k}x`, `x = ${x}`]); }, () => true),
  ],
  [S(8, 3)]: [
    C(8, 3, "co-interior", (rng) => { const a = rng.int(25, 155); return N(`Two angles are co-interior (between parallel lines, on the same side). One is ${a}°. Find the other.`, 180 - a, ["Co-interior angles add up to 180°.", `180 − ${a}.`], [`180 − ${a} = ${180 - a}°`], { unit: "°", traps: [T(a, "Co-interior angles aren't equal: they add to 180°.")] }); }),
    E(8, 3, "co-interior-algebra", (rng) => { const x = rng.int(20, 50), c = rng.int(1, 30); if (3 * x + c >= 180) return null; return N(`Co-interior angles are x° and (2x + ${c})°. Find x.`, (180 - c) / 3, ["Co-interior angles add to 180°.", `3x + ${c} = 180.`], [`3x = ${180 - c}`, `x = ${fmt((180 - c) / 3)}`]); }, (q) => Number.isInteger(q.answer.value)),
  ],
  [S(8, 4)]: [
    C(8, 4, "classify-triangle", (rng) => { const kind = rng.pick(["equilateral", "isosceles", "right", "scalene"]); const ang = { equilateral: [60, 60, 60], isosceles: (() => { const b = rng.int(20, 80); return [b, b, 180 - 2 * b]; })(), right: (() => { const a = rng.int(20, 70); return [90, a, 90 - a]; })(), scalene: (() => { const a = rng.int(25, 50), b = a + rng.int(8, 25); return [a, b, 180 - a - b]; })() }[kind]; const names = { equilateral: "Equilateral", isosceles: "Isosceles", right: "Right-angled", scalene: "Scalene (no special type)" }; if (kind === "isosceles" && ang[2] === 90) return null; if (kind === "scalene" && (ang.includes(90) || new Set(ang).size < 3)) return null; const others = rng.shuffle(Object.keys(names).filter((k) => k !== kind)).slice(0, 2); return mc3(rng, `A triangle has angles ${ang.join("°, ")}°. What type of triangle is it?`, names[kind], others.map((o) => [names[o], "Look for equal angles and right angles."]), { hints: ["Two equal angles: isosceles. All equal: equilateral.", "A 90° angle: right-angled."], solution: [`${names[kind]}.`] }); }),
    E(8, 4, "exterior-angle-triangle", (rng) => { const a = rng.int(25, 80), b = rng.int(25, 80); return N(`In a triangle, two interior angles are ${a}° and ${b}°. Find the exterior angle at the third corner.`, a + b, ["The exterior angle equals the sum of the two opposite interior angles.", `${a} + ${b}.`], [`Third angle = ${180 - a - b}°`, `Exterior = 180 − ${180 - a - b} = ${a + b}°`], { unit: "°", traps: [T(180 - a - b, "That's the interior angle. The exterior is on the straight line with it.")] }); }),
  ],
  [S(8, 5)]: [
    C(8, 5, "quadrilateral-properties", (rng) => { const qs = [["Opposite sides parallel and all sides equal, but angles not 90°", "Rhombus", ["Square", "Kite"]], ["Exactly one pair of parallel sides", "Trapezium", ["Parallelogram", "Rhombus"]], ["Two pairs of equal adjacent sides and no parallel sides", "Kite", ["Rhombus", "Trapezium"]], ["Opposite sides equal and parallel, angles not 90°", "Parallelogram", ["Rectangle", "Kite"]]]; const [d, right, wrong] = rng.pick(qs); return mc3(rng, `Which quadrilateral is described: “${d}”?`, right, wrong.map((w) => [w, "Check its sides, angles and parallel lines."]), { hints: ["Think about parallel sides and equal sides.", "Sketch each shape."], solution: [`It's a ${right.toLowerCase()}.`] }); }),
    E(8, 5, "parallelogram-angle", (rng) => { const a = rng.int(40, 140); if (a === 90) return null; return N(`One angle of a parallelogram is ${a}°. Find the size of an angle next to it.`, 180 - a, ["Neighbouring angles in a parallelogram are co-interior.", `180 − ${a}.`], [`180 − ${a} = ${180 - a}°`], { unit: "°", traps: [T(a, "That's the opposite angle. Neighbouring angles add to 180°.")] }); }),
  ],
  [S(8, 6)]: [
    C(8, 6, "interior-sum", (rng) => { const n = rng.int(5, 12); return N(`Find the sum of the interior angles of a polygon with ${n} sides.`, (n - 2) * 180, ["A polygon with n sides splits into (n − 2) triangles.", `(${n} − 2) × 180.`], [`${n - 2} × 180 = ${(n - 2) * 180}°`], { unit: "°", traps: [T(n * 180, "It splits into (n − 2) triangles, not n.")] }); }),
    E(8, 6, "regular-interior", (rng) => { const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]); return N(`Find the size of each interior angle of a regular polygon with ${n} sides.`, ((n - 2) * 180) / n, [`Total = (${n} − 2) × 180 = ${(n - 2) * 180}°.`, `Share equally between ${n} angles.`], [`${(n - 2) * 180} ÷ ${n} = ${fmt(((n - 2) * 180) / n)}°`], { unit: "°" }); }),
  ],
  [S(8, 7)]: [
    C(8, 7, "regular-exterior", (rng) => { const n = rng.pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]); return N(`Find each exterior angle of a regular polygon with ${n} sides.`, 360 / n, ["Exterior angles of any polygon add up to 360°.", `360 ÷ ${n}.`], [`360 ÷ ${n} = ${fmt(360 / n)}°`], { unit: "°", traps: [T(180 - 360 / n, "That's the interior angle.")] }); }),
    E(8, 7, "sides-from-exterior", (rng) => { const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30]); return N(`Each exterior angle of a regular polygon is ${fmt(360 / n)}°. How many sides does it have?`, n, ["Exterior angles add to 360°.", `360 ÷ ${fmt(360 / n)}.`], [`360 ÷ ${fmt(360 / n)} = ${n} sides`]); }),
  ],
};

/* ---------------- Unit 9: 3D shapes ---------------- */
const SOLIDS = { cube: [6, 12, 8], cuboid: [6, 12, 8], "triangular prism": [5, 9, 6], "square-based pyramid": [5, 8, 5], tetrahedron: [4, 6, 4], "pentagonal prism": [7, 15, 10] };
const U9 = {
  [S(9, 1)]: [
    C(9, 1, "faces-edges-vertices", (rng) => { const name = rng.pick(Object.keys(SOLIDS)), k = rng.int(0, 2); const what = ["faces", "edges", "vertices"][k]; return N(`How many ${what} does a ${name} have?`, SOLIDS[name][k], ["Picture or sketch the solid.", what === "vertices" ? "Vertices are the corners." : what === "edges" ? "Edges are where two faces meet." : "Faces are the flat surfaces."], [`A ${name} has ${SOLIDS[name][0]} faces, ${SOLIDS[name][1]} edges and ${SOLIDS[name][2]} vertices.`]); }),
    E(9, 1, "euler", (rng) => { const name = rng.pick(Object.keys(SOLIDS)); const [f, e, v] = SOLIDS[name]; return N(`A solid has ${f} faces and ${v} vertices. Use Euler's formula F + V − E = 2 to find the number of edges.`, e, ["Rearrange: E = F + V − 2.", `${f} + ${v} − 2.`], [`E = ${f} + ${v} − 2 = ${e}`]); }),
  ],
  [S(9, 2)]: [
    C(9, 2, "net-to-solid", (rng) => { const nets = [["6 squares", "Cube", ["Square-based pyramid", "Triangular prism"]], ["2 triangles and 3 rectangles", "Triangular prism", ["Tetrahedron", "Square-based pyramid"]], ["1 square and 4 triangles", "Square-based pyramid", ["Cube", "Triangular prism"]], ["4 triangles", "Tetrahedron", ["Square-based pyramid", "Triangular prism"]]]; const [d, right, wrong] = rng.pick(nets); return mc3(rng, `A net is made from ${d}. Which solid does it fold into?`, right, wrong.map((w) => [w, "Count the faces and their shapes."]), { hints: ["Each shape in the net becomes a face.", "Match the faces to a solid."], solution: [`${d}: a ${right.toLowerCase()}.`] }); }),
    E(9, 2, "net-faces", (rng) => { const name = rng.pick(Object.keys(SOLIDS)); return N(`How many shapes will be in the net of a ${name}?`, SOLIDS[name][0], ["The net has one shape for each face.", "Count the faces."], [`${SOLIDS[name][0]} faces, so ${SOLIDS[name][0]} shapes`]); }),
  ],
  [S(9, 3)]: [
    R(from("y10-u10-l3", 1), 9, 3, 1, "cuboid-surface"),
    E(9, 3, "cube-surface-from-volume", (rng) => { const s = rng.int(2, 10); return N(`A cube has volume ${s ** 3} cm³. Find its surface area.`, 6 * s * s, [`Side length = ∛${s ** 3} = ${s} cm.`, `6 faces, each ${s}².`], [`Side ${s} cm`, `6 × ${s * s} = ${6 * s * s} cm²`], { unit: "cm²" }); }),
  ],
  [S(9, 4)]: [
    C(9, 4, "cuboid-volume", (rng) => { const l = rng.int(2, 15), w = rng.int(2, 12), h = rng.int(2, 10); return N(`Find the volume of a cuboid ${l} cm by ${w} cm by ${h} cm.`, l * w * h, ["Volume = length × width × height.", `${l} × ${w} × ${h}.`], [`${l * w * h} cm³`], { unit: "cm³", traps: [T(2 * (l * w + l * h + w * h), "That's the surface area.")] }); }),
    E(9, 4, "cuboid-missing-length", (rng) => { const l = rng.int(2, 15), w = rng.int(2, 12), h = rng.int(2, 10); return N(`A cuboid has volume ${l * w * h} cm³. It is ${l} cm long and ${w} cm wide. How tall is it?`, h, ["Volume = l × w × h.", `${l * w * h} ÷ (${l} × ${w}).`], [`${l * w * h} ÷ ${l * w} = ${h} cm`], { unit: "cm" }); }),
  ],
  [S(9, 5)]: [
    C(9, 5, "plan-meaning", (rng) => { const which = rng.pick(["plan", "front", "side"]); const d = { plan: "The view from above", front: "The view from the front", side: "The view from the side" }; const right = d[which]; return mc3(rng, `What is the ${which === "plan" ? "plan" : which + " elevation"} of a 3D shape?`, right, Object.keys(d).filter((k) => k !== which).map((k) => [d[k], "Plan = from above; elevations = from the front or side."]), { hints: ["Plan: looking down from above.", "Elevation: looking from the front or side."], solution: [right] }); }),
    E(9, 5, "cylinder-views", (rng) => { const view = rng.pick(["plan", "front elevation"]); return mc3(rng, `A cylinder stands upright on a table. What shape is its ${view}?`, view === "plan" ? "A circle" : "A rectangle", [[view === "plan" ? "A rectangle" : "A circle", view === "plan" ? "From above you see the circular top." : "From the front you see its height and width."], ["A triangle", "A cylinder has no triangular views."]], { hints: ["Imagine looking at it from that direction.", "What outline would you see?"], solution: [view === "plan" ? "From above: a circle." : "From the front: a rectangle."] }); }),
  ],
};

/* ---------------- Unit 10: Transformations ---------------- */
const tri = (dx, dy, s = 1) => [[0, 0], [2 * s, 0], [0, s * 2], [0, 0]].map(([x, y]) => [x + dx, y + dy]);
const U10 = {
  [S(10, 1)]: [
    C(10, 1, "mirror-line", (rng) => { const k = rng.int(-1, 1), vertical = rng.chance(0.5); const obj = tri(vertical ? k + 1 : -1, vertical ? 1 : k + 1); const img = obj.map(([x, y]) => (vertical ? [2 * k - x, y] : [x, 2 * k - y])); const right = vertical ? `x = ${fmt(k)}` : `y = ${fmt(k)}`; return mc3(rng, "Shape B is a reflection of shape A. What is the mirror line?", right, [[vertical ? `y = ${fmt(k)}` : `x = ${fmt(k)}`, "Is the mirror line vertical or horizontal?"], [vertical ? `x = ${fmt(k + 1)}` : `y = ${fmt(k + 1)}`, "The mirror line is exactly halfway between the shapes."]], { diagram: grid({ curves: [{ points: obj, label: "A", labelAt: obj[1] }, { points: img, label: "B", labelAt: img[1] }], description: `Two triangles reflected in the line ${right}.` }), hints: ["The mirror line is halfway between matching corners.", "x = … is vertical; y = … is horizontal."], solution: [`The mirror line is ${right}.`] }); }),
    E(10, 1, "reflect-point", (rng) => { const x = nz(rng, -5, 5), y = nz(rng, -5, 5), axis = rng.pick(["x-axis", "y-axis"]); if (Math.abs(x) === Math.abs(y)) return null; const img = axis === "y-axis" ? [-x, y] : [x, -y]; const wrong = axis === "y-axis" ? [x, -y] : [-x, y]; return mc3(rng, `The point ${fmtP(x, y)} is reflected in the ${axis}. Where does it end up?`, fmtP(...img), [[fmtP(...wrong), `Reflecting in the ${axis} changes the ${axis === "y-axis" ? "x" : "y"}-coordinate's sign.`], [fmtP(-x, -y), "That's a rotation of 180°, not a reflection."]], { hints: [axis === "y-axis" ? "The y-axis is vertical: points flip left/right." : "The x-axis is horizontal: points flip up/down.", "Only one coordinate changes sign."], solution: [`${fmtP(x, y)} → ${fmtP(...img)}`] }); }),
  ],
  [S(10, 2)]: [
    C(10, 2, "rotate-180", (rng) => { const x = nz(rng, -6, 6), y = nz(rng, -6, 6); if (Math.abs(x) === Math.abs(y)) return null; return mc3(rng, `The point ${fmtP(x, y)} is rotated 180° about the origin. Where does it end up?`, fmtP(-x, -y), [[fmtP(-x, y), "That's a reflection in the y-axis."], [fmtP(y, x), "Swapping the coordinates isn't a 180° rotation."]], { hints: ["A half turn about the origin changes the sign of both coordinates.", `(${fmt(x)}, ${fmt(y)}) → (${fmt(-x)}, ?).`], solution: [`${fmtP(x, y)} → ${fmtP(-x, -y)}`] }); }),
    E(10, 2, "rotate-90", (rng) => { const x = nz(rng, -6, 6), y = nz(rng, -6, 6); if (Math.abs(x) === Math.abs(y)) return null; return mc3(rng, `The point ${fmtP(x, y)} is rotated 90° clockwise about the origin. Where does it end up?`, fmtP(y, -x), [[fmtP(-y, x), "That's 90° ANTICLOCKWISE."], [fmtP(-x, -y), "That's a 180° rotation."]], { hints: ["Use tracing paper, or the rule (x, y) → (y, −x) for 90° clockwise.", "Check with a sketch."], solution: [`${fmtP(x, y)} → ${fmtP(y, -x)}`] }); }),
  ],
  [S(10, 3)]: [
    C(10, 3, "translate-point", (rng) => { const x = rng.int(-5, 5), y = rng.int(-5, 5), a = nz(rng, -5, 5), b = nz(rng, -5, 5); return multi(`The point ${fmtP(x, y)} is translated by the vector (${fmt(a)}, ${fmt(b)}) (${Math.abs(a)} ${a > 0 ? "right" : "left"}, ${Math.abs(b)} ${b > 0 ? "up" : "down"}). Find its new position.`, [["x =", x + a], ["y =", y + b]], { answerText: fmtP(x + a, y + b), hints: ["Add the top of the vector to x and the bottom to y.", `${fmt(x)} + ${fmt(a)} and ${fmt(y)} + ${fmt(b)}.`], solution: [`${fmtP(x, y)} → ${fmtP(x + a, y + b)}`] }); }),
    E(10, 3, "translation-vector", (rng) => { const a = nz(rng, -4, 4), b = nz(rng, -4, 4); if (a === b || a === -b) return null; const obj = tri(-2, -1); const img = obj.map(([x, y]) => [x + a, y + b]); return mc3(rng, "Shape A is translated to shape B. What is the column vector of the translation?", `(${fmt(a)}, ${fmt(b)})`, [[`(${fmt(b)}, ${fmt(a)})`, "The top number is the horizontal movement; the bottom is vertical."], [`(${fmt(-a)}, ${fmt(-b)})`, "That's from B back to A."]], { diagram: grid({ curves: [{ points: obj, label: "A", labelAt: obj[1] }, { points: img, label: "B", labelAt: img[1] }], description: `Triangle A translated ${a} across and ${b} up to B.` }), hints: ["Pick a corner of A and its matching corner in B.", "Count across (right +), then up (up +)."], solution: [`${Math.abs(a)} ${a > 0 ? "right" : "left"}, ${Math.abs(b)} ${b > 0 ? "up" : "down"}: (${fmt(a)}, ${fmt(b)})`] }); }),
  ],
  [S(10, 4)]: [
    C(10, 4, "enlarged-lengths", (rng) => { const w = rng.int(2, 6), h = rng.int(2, 6), k = rng.int(2, 4); return N(`A ${w} cm by ${h} cm rectangle is enlarged by scale factor ${k}. What is the perimeter of the new rectangle?`, 2 * k * (w + h), [`New sides: ${k * w} cm and ${k * h} cm.`, "Perimeter = 2 × (length + width)."], [`2 × (${k * w} + ${k * h}) = ${2 * k * (w + h)} cm`], { unit: "cm", traps: [T(2 * (w + h) + k, "Multiply every length by the scale factor.")] }); }),
    E(10, 4, "find-scale-factor", (rng) => { const k = rng.int(2, 3); const obj = tri(-5, -5); const img = obj.map(([x, y]) => [-5 + (x + 5) * k, -5 + (y + 5) * k]); return mc3(rng, "Shape B is an enlargement of shape A. What is the scale factor?", String(k), [[String(k + 1), "Compare the lengths of matching sides."], [`{1/${k}}`, "B is bigger than A, so the scale factor is more than 1."]], { diagram: grid({ curves: [{ points: obj, label: "A", labelAt: obj[1] }, { points: img, label: "B", labelAt: img[1] }], description: `Triangle A with base 2, enlarged to B with base ${2 * k}.` }), hints: ["Measure one side of A and the matching side of B.", "Scale factor = B's length ÷ A's length."], solution: [`Base of A = 2, base of B = ${2 * k}`, `Scale factor = ${k}`] }); }),
  ],
  [S(10, 5)]: [
    C(10, 5, "which-transformation", (rng) => { const t = rng.pick([["The shape has moved 3 squares right without turning or flipping.", "Translation"], ["The shape has been flipped over a line.", "Reflection"], ["The shape has been turned about a point.", "Rotation"], ["The shape is the same shape but twice as big.", "Enlargement"]]); const others = rng.shuffle(["Translation", "Reflection", "Rotation", "Enlargement"].filter((x) => x !== t[1])).slice(0, 2); return mc3(rng, `${t[0]} Which transformation is this?`, t[1], others.map((o) => [o, "Think about whether the shape slid, flipped, turned or changed size."]), { hints: ["Slide = translation, flip = reflection, turn = rotation, resize = enlargement.", "Read the description carefully."], solution: [t[1]] }); }),
    E(10, 5, "describe-rotation", (rng) => mc3(rng, "Which description of a rotation is complete?", "Rotation 90° clockwise about (0, 0)", [["Rotation 90° clockwise", "A rotation needs a centre too."], ["Rotation about (0, 0)", "A rotation needs an angle and a direction too."]], { hints: ["A rotation needs three things.", "Angle, direction and centre."], solution: ["Angle, direction and centre are all needed."] })),
  ],
  [S(10, 6)]: [
    C(10, 6, "not-congruent", (rng) => mc3(rng, "Which transformation can produce an image that is NOT congruent to the object?", "Enlargement", [["Rotation", "Rotations don't change size or shape."], ["Reflection", "Reflections don't change size or shape."]], { hints: ["Congruent means exactly the same size and shape.", "Which transformation can change size?"], solution: ["An enlargement changes the size, so the image isn't congruent (unless the scale factor is 1 or −1)."] })),
    R(from("y10-u8-l1", 1), 10, 6, 2, "which-condition"),
  ],
};

/* ---------------- Unit 11: Charts and graphs ---------------- */
const U11 = {
  [S(11, 1)]: [
    C(11, 1, "pie-angle", (rng) => { const n = rng.pick([24, 30, 36, 40, 45, 60, 72, 90, 120]), k = rng.int(1, n - 1); const a = (k / n) * 360; if (!Number.isInteger(a)) return null; return N(`In a survey of ${n} people, ${k} chose blue. What angle should blue have in a pie chart?`, a, [`Each person is 360 ÷ ${n} = ${360 / n}°.`, `${k} × ${360 / n}.`], [`${k} × ${360 / n} = ${a}°`], { unit: "°", traps: [T(k, "Each person gets more than 1°: 360 ÷ " + n + " degrees.")] }); }),
    E(11, 1, "pie-people", (rng) => { const n = rng.pick([24, 30, 36, 40, 45, 60, 72, 90, 120, 180]), a = rng.int(1, 11) * 30; const k = (a / 360) * n; if (!Number.isInteger(k)) return null; return N(`A pie chart represents ${n} people. The sector for “tea” has angle ${a}°. How many people chose tea?`, k, ["The fraction of the circle is " + a + "/360.", `${a}/360 of ${n}.`], [`${a} ÷ 360 × ${n} = ${k}`]); }),
  ],
  [S(11, 2)]: [
    C(11, 2, "dual-table-difference", (rng) => { const sports = ["football", "netball", "tennis"], boys = sports.map(() => rng.int(3, 20)), girls = sports.map(() => rng.int(3, 20)); const k = rng.int(0, 2); if (boys[k] === girls[k]) return null; return N(`A dual bar chart shows favourite sports. Boys: ${sports.map((s, i) => `${s} ${boys[i]}`).join(", ")}. Girls: ${sports.map((s, i) => `${s} ${girls[i]}`).join(", ")}. How many more ${girls[k] > boys[k] ? "girls than boys" : "boys than girls"} chose ${sports[k]}?`, Math.abs(boys[k] - girls[k]), ["Find the two bars for that sport.", "Subtract the smaller from the larger."], [`${Math.max(boys[k], girls[k])} − ${Math.min(boys[k], girls[k])} = ${Math.abs(boys[k] - girls[k])}`]); }),
    E(11, 2, "dual-biggest-difference", (rng) => { const days = ["Monday", "Tuesday", "Wednesday"], a = days.map(() => rng.int(5, 30)), b = days.map(() => rng.int(5, 30)); const d = a.map((x, i) => Math.abs(x - b[i])); const k = d.indexOf(Math.max(...d)); if (d.filter((x) => x === d[k]).length > 1) return null; return mc3(rng, `Shop A sold ${days.map((x, i) => `${a[i]} on ${x}`).join(", ")}. Shop B sold ${days.map((x, i) => `${b[i]} on ${x}`).join(", ")}. On which day was the difference between the shops greatest?`, days[k], days.filter((_, i) => i !== k).map((x) => [x, "Find the difference for each day and compare."]), { hints: ["Work out the difference for each day.", d.map((x, i) => `${days[i]}: ${x}`).join(", ")], solution: [`Greatest difference: ${days[k]} (${d[k]})`] }); }),
  ],
  [S(11, 3)]: [R(from("y9-u12-l5", 1), 11, 3, 1, "time-series-max"), R(from("y9-u12-l5", 2), 11, 3, 2, "time-series-change")],
  [S(11, 4)]: [
    C(11, 4, "grouped-count", (rng) => { const f = [rng.int(1, 9), rng.int(3, 12), rng.int(3, 12), rng.int(1, 9)], labels = ["0–9", "10–19", "20–29", "30–39"]; const k = rng.int(1, 3); return N(`Marks: ${labels.map((l, i) => `${l}: ${f[i]}`).join("; ")}. How many students scored ${k * 10} or more?`, f.slice(k).reduce((a, b) => a + b, 0), ["Add the frequencies of the groups from " + k * 10 + " upwards.", f.slice(k).join(" + ")], [`${f.slice(k).join(" + ")} = ${f.slice(k).reduce((a, b) => a + b, 0)}`]); }),
    R(from("y9-u12-l2", 2), 11, 4, 2, "median-class"),
  ],
  [S(11, 5)]: [
    C(11, 5, "describe-correlation", (rng) => { const kind = rng.pick(["Positive", "Negative", "No"]); const pts = Array.from({ length: 12 }, (_, i) => { const x = 1 + (i * 8) / 11; const y = kind === "Positive" ? x + rng.int(-1, 1) * 0.8 + 1 : kind === "Negative" ? 10 - x + rng.int(-1, 1) * 0.8 : rng.int(1, 9); return { x: round(x, 2), y: round(y, 2) }; }); return mc3(rng, "What type of correlation does the scatter graph show?", `${kind} correlation`, ["Positive", "Negative", "No"].filter((k) => k !== kind).map((k) => [`${k} correlation`, "Positive: both go up together. Negative: one goes up as the other goes down. None: no pattern."]), { diagram: { kind: "graph", x: [0, 10], y: [0, 11], xStep: 1, yStep: 1, points: pts, description: `Scatter graph showing ${kind.toLowerCase()} correlation.` }, hints: ["Look at the overall direction of the points.", "Do they rise, fall, or have no pattern?"], solution: [`${kind} correlation.`] }); }),
    E(11, 5, "line-of-best-fit", (rng) => { const m = rng.pick([1, 2]), c = rng.int(1, 4); const pts = Array.from({ length: 10 }, (_, i) => ({ x: i + 0.5, y: round(m * (i + 0.5) + c + (rng.next() - 0.5) * 2, 2) })); const x0 = rng.int(2, 7); const right = m * x0 + c; return mc3(rng, `Use the line of best fit to estimate y when x = ${x0}.`, String(right), [[String(right + 4 * m), "Read up from x = " + x0 + " to the LINE, then across."], [String(x0), "That's the x-value. Read the y-value from the line."]], { diagram: { kind: "graph", x: [0, 10], y: [0, 26], xStep: 1, yStep: 2, points: pts, curves: [{ points: [[0, c], [10, 10 * m + c]], dashed: true }], description: `Scatter graph with a line of best fit y = ${m}x + ${c}.` }, hints: [`Find x = ${x0} on the horizontal axis.`, "Go up to the dashed line, then across to the y-axis."], solution: [`At x = ${x0}, the line gives y ≈ ${right}`] }); }),
  ],
  [S(11, 6)]: [
    C(11, 6, "context-correlation", (rng) => { const pairs = [["outdoor temperature and ice cream sales", "Positive"], ["age of a car and its value", "Negative"], ["shoe size and favourite number", "None"], ["hours of revision and test score", "Positive"], ["outdoor temperature and heating bills", "Negative"]]; const [p, k] = rng.pick(pairs); return mc3(rng, `What correlation would you expect between ${p}?`, k === "None" ? "No correlation" : `${k} correlation`, ["Positive", "Negative", "None"].filter((x) => x !== k).map((x) => [x === "None" ? "No correlation" : `${x} correlation`, "Think: as one goes up, what happens to the other?"]), { hints: ["Imagine one quantity increasing.", "Does the other go up, down, or neither?"], solution: [k === "None" ? "They are unrelated: no correlation." : `${k} correlation.`] }); }),
    E(11, 6, "correlation-causation", (rng) => mc3(rng, "Towns with more swimming pools have more ice cream shops (positive correlation). Which conclusion is sensible?", "Both may be linked to something else, such as population size", [["Swimming pools cause ice cream shops to open", "Correlation doesn't prove that one thing causes the other."], ["There is no relationship at all", "There is a correlation: the data shows a relationship."]], { hints: ["Correlation is not the same as causation.", "Could a third factor explain both?"], solution: ["Bigger towns tend to have more of both: a third factor, not cause and effect."] })),
  ],
};

/* ---------------- Unit 12: Probability ---------------- */
const U12 = {
  [S(12, 1)]: [R(from("y9-u13-l1", 1), 12, 1, 1, "two-dice-sum"), R(from("y9-u13-l1", 2), 12, 1, 2, "spinner-product")],
  [S(12, 2)]: [
    C(12, 2, "complete-two-way", (rng) => { const bc = rng.int(5, 20), bd = rng.int(5, 20), gc = rng.int(5, 20), gd = rng.int(5, 20); return N(`In a two-way table: boys who like cats ${bc}, boys who like dogs ?, total boys ${bc + bd}; girls who like cats ${gc}, girls who like dogs ${gd}. Find the missing number.`, bd, ["Each row adds up to its total.", `${bc + bd} − ${bc}.`], [`${bc + bd} − ${bc} = ${bd}`]); }),
    E(12, 2, "two-way-probability", (rng) => { const bc = rng.int(3, 15), bd = rng.int(3, 15), gc = rng.int(3, 15), gd = rng.int(3, 15); const T0 = bc + bd + gc + gd; const f = simplify({ n: gc, d: T0 }); return frac(`Boys: ${bc} like cats, ${bd} like dogs. Girls: ${gc} like cats, ${gd} like dogs. One student is picked at random. Find the probability they are a girl who likes cats.`, f.n, f.d, { hints: [`Total students = ${T0}.`, `Girls who like cats = ${gc}.`], solution: [`{${gc}/${T0}}${f.d !== T0 ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T(gc / (gc + gd), "The student is picked from EVERYONE, so divide by the overall total.")] }); }),
  ],
  [S(12, 3)]: [
    C(12, 3, "relative-frequency", (rng) => { const n = rng.pick([20, 25, 40, 50, 100, 200]), h = rng.int(Math.floor(n * 0.3), Math.floor(n * 0.7)); return N(`A coin is flipped ${n} times and lands on heads ${h} times. What is the relative frequency of heads, as a decimal?`, clean(h / n), ["Relative frequency = number of times it happened ÷ number of trials.", `${h} ÷ ${n}.`], [`${h} ÷ ${n} = ${fmt(clean(h / n))}`], { traps: [T(0.5, "That's the theoretical probability. Use the experiment's results.")] }); }),
    E(12, 3, "is-it-biased", (rng) => { const n = rng.pick([300, 600, 1200]), sixes = rng.chance(0.5) ? Math.round(n / 6) + rng.int(-8, 8) : Math.round(n / 3) + rng.int(-10, 10); const biased = Math.abs(sixes - n / 6) > n / 20; return mc3(rng, `A dice is rolled ${n} times and lands on 6 ${sixes} times. What does this suggest?`, biased ? "The dice is probably biased towards 6" : "The dice is probably fair", [[biased ? "The dice is probably fair" : "The dice is probably biased towards 6", `A fair dice would give about ${n / 6} sixes in ${n} rolls.`], ["You can't tell anything from an experiment", `${n} is a large number of trials, so the results are a good guide.`]], { hints: [`Expected sixes for a fair dice: ${n} ÷ 6 = ${n / 6}.`, "Is the result close to that?"], solution: [`Expected ≈ ${n / 6}, observed ${sixes}: ${biased ? "much higher, so probably biased" : "close, so probably fair"}.`] }); }),
  ],
  [S(12, 4)]: [
    C(12, 4, "estimate-probability", (rng) => { const n = rng.pick([50, 80, 100, 200, 250]), r = rng.int(5, n - 5); return N(`A spinner is spun ${n} times and lands on red ${r} times. Estimate the probability of red, as a decimal.`, clean(r / n), ["Estimated probability = relative frequency.", `${r} ÷ ${n}.`], [`${r} ÷ ${n} = ${fmt(clean(r / n))}`]); }),
    E(12, 4, "more-reliable", (rng) => { const a = rng.int(10, 40), b = a * rng.int(10, 30); return mc3(rng, `Asha spins a spinner ${a} times; Ben spins it ${b} times. Whose estimate of the probability of red is more reliable?`, "Ben's, because he did more trials", [["Asha's, because she did fewer trials", "More trials give a more reliable estimate."], ["Both are equally reliable", "The number of trials affects reliability."]], { hints: ["More trials usually give results closer to the true probability.", "Compare the number of trials."], solution: [`${b} trials is far more than ${a}, so Ben's estimate is more reliable.`] }); }),
  ],
  [S(12, 5)]: [
    C(12, 5, "expected-frequency", (rng) => { const p = rng.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.05]), n = rng.pick([20, 40, 60, 80, 100, 200, 500]); return N(`The probability that a light bulb is faulty is ${fmt(p)}. How many faulty bulbs would you expect in a batch of ${n}?`, clean(p * n), ["Expected frequency = probability × number of trials.", `${fmt(p)} × ${n}.`], [`${fmt(p)} × ${n} = ${fmt(clean(p * n))}`]); }),
    E(12, 5, "expected-dice", (rng) => { const ev = rng.pick([["a six", 1], ["an even number", 3], ["a number less than 3", 2], ["a multiple of 3", 2]]), n = 6 * rng.int(5, 50); return N(`A fair dice is rolled ${n} times. How many times would you expect to roll ${ev[0]}?`, (ev[1] / 6) * n, [`P(${ev[0]}) = ${ev[1]}/6.`, `${ev[1]}/6 × ${n}.`], [`${ev[1]}/6 × ${n} = ${(ev[1] / 6) * n}`]); }),
  ],
};

export const Y8_GENERATORS = { ...U1, ...U2, ...U3, ...U4, ...U5, ...U6, ...U7, ...U8, ...U9, ...U10, ...U11, ...U12 };
