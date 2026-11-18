/* ==========================================================================
   Year 7 generators, Units 2–12 (light format: core + extend per lesson)
   Four operations · Factors and primes · Algebra · Fractions ·
   Decimals and percentages · Sequences · Angles · Perimeter and area ·
   Ratio · Data and averages · Probability
   Skills already built elsewhere are reused with reuse().
   ========================================================================== */
import { clean, fmt, gcd, round, simplify } from "../numbers.js";
import { core, expr, extend, frac, mc3, multi, num, reuse, T } from "./helpers.js";
import { Y7U1_GENERATORS } from "./y7u1.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { BANK_GENERATORS } from "./bank.js";
import { Y9B_GENERATORS } from "./y9b.js";

const S = (u, l) => `y7-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, make, v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, make, v);
const ALL = { ...Y7U1_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS };
const from = (id, level) => ALL[id].find((g) => g.level === level);
const bank = (name) => BANK_GENERATORS.find((g) => g.id === `bank/${name}`);
const R = (gen, u, l, level, name) => reuse(gen, S(u, l), level, name);
const N = (prompt, value, hints, solution, o = {}) => num(prompt, value, { hints, solution, ...o });

/* ---------------- Unit 2: The four operations ---------------- */
const U2 = {
  [S(2, 1)]: [
    C(2, 1, "column-addition", (rng) => { const a = rng.int(250, 9999), b = rng.int(250, 9999); return N(`Work out ${fmt(a)} + ${fmt(b)}.`, a + b, ["Line the numbers up by place value, ones under ones.", "Add each column from the right, carrying when a column makes 10 or more."], [`${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}`]); }),
    E(2, 1, "decimal-addition", (rng) => { const a = clean(rng.int(101, 9999) / 100), b = clean(rng.int(11, 999) / 10); const v = clean(a + b); return N(`Work out ${fmt(a)} + ${fmt(b)}.`, v, ["Line up the decimal points.", "Fill gaps with zeros so both have the same number of decimal places."], [`${fmt(a, 2)} + ${fmt(b, 2)} = ${fmt(v)}`], { traps: [T(clean(a + b / 10), "Line up the decimal points, not the last digits.")] }); }, (q) => true),
  ],
  [S(2, 2)]: [
    C(2, 2, "column-subtraction", (rng) => { const a = rng.int(1000, 9999), b = rng.int(100, a - 1); return N(`Work out ${fmt(a)} − ${fmt(b)}.`, a - b, ["Line up the columns. Work from the right.", "If the top digit is smaller, exchange 1 from the next column."], [`${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}`]); }),
    E(2, 2, "decimal-subtraction", (rng) => { const a = rng.int(5, 30), b = clean(rng.int(101, a * 100 - 1) / 100); const v = clean(a - b); return N(`Work out ${a} − ${fmt(b)}.`, v, [`Write ${a} as ${a}.00 so the decimal points line up.`, "Subtract column by column, exchanging where needed."], [`${a}.00 − ${fmt(b, 2)} = ${fmt(v)}`]); }),
  ],
  [S(2, 3)]: [
    C(2, 3, "short-multiplication", (rng) => { const a = rng.int(102, 999), b = rng.int(3, 9); return N(`Work out ${a} × ${b}.`, a * b, ["Multiply each digit by " + b + ", starting from the ones.", "Carry tens into the next column."], [`${a} × ${b} = ${fmt(a * b)}`]); }),
    E(2, 3, "long-multiplication", (rng) => { const a = rng.int(102, 999), b = rng.int(12, 89); return N(`Work out ${a} × ${b}.`, a * b, [`Split ${b} into ${Math.floor(b / 10) * 10} + ${b % 10}.`, `${a} × ${Math.floor(b / 10) * 10} = ${fmt(a * Math.floor(b / 10) * 10)} and ${a} × ${b % 10} = ${fmt(a * (b % 10))}. Add them.`], [`${fmt(a * Math.floor(b / 10) * 10)} + ${fmt(a * (b % 10))} = ${fmt(a * b)}`], { traps: [T(a * Math.floor(b / 10) + a * (b % 10), "Remember the tens digit is worth tens: multiply by " + Math.floor(b / 10) * 10 + ", not " + Math.floor(b / 10) + ".")] }); }),
  ],
  [S(2, 4)]: [
    C(2, 4, "short-division", (rng) => { const d = rng.int(3, 9), q = rng.int(102, 999); return N(`Work out ${fmt(d * q)} ÷ ${d}.`, q, ["Use the bus stop method: divide each digit from the left.", "Carry any remainder to the next digit."], [`${fmt(d * q)} ÷ ${d} = ${q}`]); }),
    E(2, 4, "division-decimal-answer", (rng) => { const d = rng.pick([4, 5, 8]), n = rng.int(30, 400); if (n % d === 0) return null; const v = clean(n / d); return N(`Work out ${n} ÷ ${d}, giving your answer as a decimal.`, v, [`Write ${n} as ${n}.000 so you can carry remainders past the decimal point.`, "Keep dividing until there's no remainder."], [`${n} ÷ ${d} = ${fmt(v)}`], { traps: [T(Math.floor(n / d), "Don't stop at the whole number: carry the remainder into the decimal places.")] }); }),
  ],
  [S(2, 5)]: [
    C(2, 5, "decimal-times-integer", (rng) => { const a = clean(rng.int(11, 99) / 10), b = rng.int(3, 9); return N(`Work out ${fmt(a)} × ${b}.`, clean(a * b), [`Ignore the decimal point: ${a * 10} × ${b} = ${a * 10 * b}.`, "There was 1 decimal place, so the answer has 1 decimal place."], [`${a * 10} × ${b} = ${a * 10 * b}`, `${fmt(a)} × ${b} = ${fmt(clean(a * b))}`]); }),
    E(2, 5, "long-division", (rng) => { const d = rng.int(12, 35), q = rng.int(21, 99); return N(`Work out ${fmt(d * q)} ÷ ${d}.`, q, [`Write out some multiples of ${d} first.`, "Use long division: how many times does " + d + " go into each part?"], [`${fmt(d * q)} ÷ ${d} = ${q}`, `Check: ${q} × ${d} = ${fmt(d * q)}`]); }),
  ],
  [S(2, 6)]: [
    C(2, 6, "mental-tricks", (rng) => { const k = rng.pick([9, 11, 99, 101]), a = rng.int(12, 48); return N(`Work out ${a} × ${k} in your head.`, a * k, [`${k} = ${k < 50 ? 10 : 100} ${k % 10 === 9 ? "− 1" : "+ 1"}.`, `${a} × ${k < 50 ? 10 : 100} = ${a * (k < 50 ? 10 : 100)}, then ${k % 10 === 9 ? "subtract" : "add"} ${a}.`], [`${a} × ${k} = ${a * (k < 50 ? 10 : 100)} ${k % 10 === 9 ? "−" : "+"} ${a} = ${fmt(a * k)}`]); }),
    E(2, 6, "decimal-mental", (rng) => { const a = rng.int(2, 9), b = rng.int(2, 9); const v = clean((a * b) / 100); return N(`Work out 0.${a} × 0.${b}.`, v, [`${a} × ${b} = ${a * b}.`, "There are 2 decimal places in total, so the answer has 2 decimal places."], [`0.${a} × 0.${b} = ${fmt(v)}`], { traps: [T(clean((a * b) / 10), "Count the decimal places in BOTH numbers: there are two.")] }); }),
  ],
  [S(2, 7)]: [
    C(2, 7, "change-word-problem", (rng) => { const n = rng.int(2, 6), p = clean(rng.int(55, 380) / 100), paid = 20; if (n * p >= paid) return null; const v = round(paid - n * p, 2); return N(`Kai buys ${n} sandwiches at £${fmt(p, 2)} each. He pays with a £20 note. How much change does he get?`, v, ["First find the total cost.", `Total = ${n} × £${fmt(p, 2)} = £${fmt(clean(n * p), 2)}. Subtract from £20.`], [`${n} × £${fmt(p, 2)} = £${fmt(clean(n * p), 2)}`, `£20 − £${fmt(clean(n * p), 2)} = £${fmt(v, 2)}`], { dp: 2, pre: "£" }); }),
    E(2, 7, "boxes-needed", (rng) => { const per = rng.pick([6, 12, 15, 24]), need = rng.int(40, 300); if (need % per === 0) return null; const v = Math.ceil(need / per); return N(`Eggs come in boxes of ${per}. A café needs ${need} eggs. How many boxes must it buy?`, v, [`${need} ÷ ${per} = ${fmt(round(need / per, 2))}…`, "You can't buy part of a box, and you need enough eggs, so round UP."], [`${need} ÷ ${per} = ${Math.floor(need / per)} remainder ${need % per}`, `${Math.floor(need / per)} boxes isn't enough, so ${v} boxes`], { traps: [T(Math.floor(need / per), "That's not enough eggs: round up.")] }); }),
  ],
};

/* ---------------- Unit 3: Factors, multiples and primes ---------------- */
const factorsOf = (n) => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
const isPrime = (n) => n > 1 && factorsOf(n).length === 2;
const U3 = {
  [S(3, 1)]: [
    C(3, 1, "count-factors", (rng) => { const n = rng.pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 60]); const f = factorsOf(n); return N(`How many factors does ${n} have?`, f.length, ["Find the factors in pairs: 1 × " + n + ", 2 × …", "Stop when the pairs start to repeat."], [`Factors: ${f.join(", ")}`, `That's ${f.length} factors`], { traps: [T(f.length - 2, "Remember 1 and the number itself are factors too.")] }); }),
    E(3, 1, "not-a-factor", (rng) => { const n = rng.pick([24, 36, 48, 60, 72, 90]); const f = factorsOf(n).filter((x) => x > 2 && x < n); const [a, b] = rng.shuffle(f).slice(0, 2); let c = rng.int(4, 20); while (n % c === 0) c++; return mc3(rng, `Which of these is NOT a factor of ${n}?`, String(c), [[String(a), `${n} ÷ ${a} = ${n / a}, so ${a} is a factor.`], [String(b), `${n} ÷ ${b} = ${n / b}, so ${b} is a factor.`]], { hints: ["A factor divides exactly, with no remainder.", "Try dividing " + n + " by each option."], solution: [`${n} ÷ ${c} = ${fmt(round(n / c, 3))}…, not a whole number`] }); }),
  ],
  [S(3, 2)]: [
    C(3, 2, "first-multiple-above", (rng) => { const k = rng.int(6, 19), lim = rng.int(60, 200); const v = (Math.floor(lim / k) + 1) * k; return N(`What is the first multiple of ${k} that is greater than ${lim}?`, v, [`${lim} ÷ ${k} = ${fmt(round(lim / k, 2))}…`, `Try ${Math.floor(lim / k) + 1} × ${k}.`], [`${Math.floor(lim / k)} × ${k} = ${Math.floor(lim / k) * k} (not more than ${lim})`, `${Math.floor(lim / k) + 1} × ${k} = ${v}`]); }),
    E(3, 2, "count-multiples", (rng) => { const k = rng.int(3, 12), a = rng.int(20, 80), b = a + rng.int(30, 90); let n = 0; for (let x = a + 1; x < b; x++) if (x % k === 0) n++; return N(`How many multiples of ${k} are there between ${a} and ${b}?`, n, [`Find the first multiple of ${k} after ${a} and the last before ${b}.`, "Count them, or divide the range by " + k + "."], [`Multiples: ${Array.from({ length: 200 }, (_, i) => i * k).filter((x) => x > a && x < b).join(", ")}`, `${n} multiples`]); }),
  ],
  [S(3, 3)]: [
    C(3, 3, "which-prime", (rng) => { const primes = [23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97], tricky = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91]; const p = rng.pick(primes); const [x, y] = rng.shuffle(tricky).slice(0, 2); return mc3(rng, "Which of these numbers is prime?", String(p), [[String(x), `${x} = ${factorsOf(x)[1]} × ${x / factorsOf(x)[1]}.`], [String(y), `${y} = ${factorsOf(y)[1]} × ${y / factorsOf(y)[1]}.`]], { hints: ["A prime has exactly two factors: 1 and itself.", "Test dividing by 2, 3, 5 and 7."], solution: [`${p} has no factors other than 1 and ${p}.`] }); }),
    E(3, 3, "sum-of-primes", (rng) => { const a = rng.int(10, 60), b = a + rng.int(10, 20); const ps = []; for (let x = a; x <= b; x++) if (isPrime(x)) ps.push(x); if (ps.length < 2) return null; return N(`Find the sum of all the prime numbers between ${a} and ${b}.`, ps.reduce((s, x) => s + x, 0), ["List the numbers and cross out any with factors other than 1 and themselves.", "Add the primes that are left."], [`Primes: ${ps.join(", ")}`, `Sum = ${ps.reduce((s, x) => s + x, 0)}`]); }),
  ],
  [S(3, 4)]: [
    C(3, 4, "square-or-cube", (rng) => { const cube = rng.chance(0.4), n = cube ? rng.int(2, 10) : rng.int(2, 15); const v = cube ? n ** 3 : n * n; return N(`Work out ${n}${cube ? "³" : "²"}.`, v, [cube ? `${n}³ = ${n} × ${n} × ${n}.` : `${n}² = ${n} × ${n}.`, "It is not " + n + " × " + (cube ? 3 : 2) + "."], [`${n}${cube ? "³" : "²"} = ${v}`], { traps: [T(n * (cube ? 3 : 2), cube ? "Cubing means multiplying the number by itself three times." : "Squaring means multiplying the number by itself.")] }); }),
    E(3, 4, "root", (rng) => { const cube = rng.chance(0.4), n = cube ? rng.int(2, 10) : rng.int(2, 15); const v = cube ? n ** 3 : n * n; return N(`Work out ${cube ? "∛" : "√"}${v}.`, n, [cube ? "Which number cubed gives " + v + "?" : "Which number squared gives " + v + "?", "Use your knowledge of square and cube numbers."], [`${n}${cube ? "³" : "²"} = ${v}, so ${cube ? "∛" : "√"}${v} = ${n}`], { traps: [T(v / 2, "A square root isn't halving.")] }); }),
  ],
  [S(3, 5)]: [R(from("y9-u3-l3", 1), 3, 5, 1, "hcf"), R(from("y9-u3-l5", 2), 3, 5, 2, "bags")],
  [S(3, 6)]: [R(from("y9-u3-l4", 1), 3, 6, 1, "lcm"), R(from("y9-u3-l5", 1), 3, 6, 2, "buses")],
};

/* ---------------- Unit 4: Introduction to algebra ---------------- */
const U4 = {
  [S(4, 1)]: [
    C(4, 1, "meaning", (rng) => { const k = rng.int(2, 9), op = rng.pick(["+", "×", "−"]); const right = { "+": `${k} more than n`, "×": `${k} times n`, "−": `${k} less than n` }[op]; const txt = op === "×" ? `${k}n` : `n ${op} ${k}`; const others = { "+": `${k} times n`, "×": `${k} more than n`, "−": `n less than ${k}` }; return mc3(rng, `What does ${txt} mean?`, right, [[others[op], "Read the operation carefully."], [op === "×" ? `n to the power ${k}` : `${k} lots of n`, "Check what the symbol between the parts means."]], { hints: ["A letter stands for an unknown number.", op === "×" ? `${k}n means ${k} × n.` : "Read it out loud."], solution: [`${txt} means ${right}.`] }); }),
    E(4, 1, "sweets-expression", (rng) => { const a = rng.int(3, 12), b = rng.int(1, a - 1); return expr(`Sam has x sweets. He is given ${a} more, then eats ${b}. Write an expression for how many he has now.`, `x+${a - b}`, { flags: { simplified: true }, answerText: `x + ${a - b}`, hints: [`Start with x, add ${a}, subtract ${b}.`, `x + ${a} − ${b}, then simplify.`], solution: [`x + ${a} − ${b} = x + ${a - b}`] }); }),
  ],
  [S(4, 2)]: [
    C(4, 2, "write-product", (rng) => { const k = rng.int(2, 9); return mc3(rng, `How is ${k} × a × b written in algebra?`, `${k}ab`, [[`${k} + a + b`, "× is not +."], [`ab${k}`, "Numbers are written first."]], { hints: ["Leave out the × signs.", "Write the number first, then the letters in alphabetical order."], solution: [`${k} × a × b = ${k}ab`] }); }),
    E(4, 2, "write-square", (rng) => { const k = rng.int(2, 9); return mc3(rng, `How is a × a × ${k} written in algebra?`, `${k}a²`, [[`${2 * k}a`, "a × a is a squared, not 2a."], [`a${k}²`, "The number goes first and the power belongs to the letter."]], { hints: ["a × a = a².", "Write the number first."], solution: [`a × a × ${k} = ${k}a²`] }); }),
  ],
  [S(4, 3)]: [
    C(4, 3, "collect-one-letter", (rng) => { const a = rng.int(2, 9), b = rng.int(2, 9), c = rng.int(1, a + b - 1); const v = a + b - c; return expr(`Simplify ${a}m + ${b}m − ${c}m.`, `${v}*m`, { flags: { simplified: true }, answerText: `${v}m`, hints: ["They are all m terms, so combine the numbers.", `${a} + ${b} − ${c}.`], solution: [`${a} + ${b} − ${c} = ${v}`, `${v}m`] }); }),
    R(bank("collect-like-terms"), 4, 3, 2, "collect-like-terms"),
  ],
  [S(4, 4)]: [
    C(4, 4, "multiply-terms", (rng) => { const a = rng.int(2, 9), b = rng.int(2, 9); return expr(`Simplify ${a}x × ${b}y.`, `${a * b}*x*y`, { answerText: `${a * b}xy`, hints: ["Multiply the numbers, then the letters.", `${a} × ${b} = ${a * b}.`], solution: [`${a} × ${b} = ${a * b}, x × y = xy`, `${a * b}xy`], traps: [{ expr: `${a + b}*x*y`, feedback: "Multiply the numbers, don't add them." }] }); }),
    E(4, 4, "divide-terms", (rng) => { const a = rng.int(2, 6), b = rng.int(2, 9); return expr(`Simplify ${a * b}ab ÷ ${a}a.`, `${b}*b`, { answerText: `${b}b`, hints: ["Write it as a fraction and cancel.", `${a * b} ÷ ${a} = ${b}, and a ÷ a = 1.`], solution: [`${a * b} ÷ ${a} = ${b}`, `ab ÷ a = b`, `${b}b`] }); }),
  ],
  [S(4, 5)]: [
    C(4, 5, "substitute", (rng) => { const p = rng.int(2, 9), q = rng.int(2, 9), a = rng.int(1, 9), b = rng.int(1, 9); return N(`Work out ${p}a + ${q}b when a = ${a} and b = ${b}.`, p * a + q * b, [`${p}a means ${p} × a.`, `${p} × ${a} + ${q} × ${b}.`], [`${p * a} + ${q * b} = ${p * a + q * b}`], { traps: [T(Number(`${p}${a}`) + Number(`${q}${b}`), `${p}a means ${p} × a, not the digits ${p}${a}.`)] }); }),
    E(4, 5, "substitute-square", (rng) => { const a = rng.int(-6, 6), b = rng.int(-5, 8); if (a === 0) return null; return N(`Work out a² − 2b when a = ${fmt(a)} and b = ${fmt(b)}.`, a * a - 2 * b, ["Put negative numbers in brackets.", `(${fmt(a)})² = ${a * a}.`], [`(${fmt(a)})² − 2 × ${b < 0 ? `(${fmt(b)})` : b} = ${a * a} ${2 * b < 0 ? "+" : "−"} ${Math.abs(2 * b)} = ${a * a - 2 * b}`], { traps: [T(-(a * a) - 2 * b, "A negative number squared is positive.")] }); }),
  ],
  [S(4, 6)]: [
    C(4, 6, "pens-expression", (rng) => { const n = rng.int(2, 9), r = rng.int(10, 90); return expr(`A pen costs p pence and a ruler costs ${r}p. Write an expression for the cost of ${n} pens and one ruler.`, `${n}*p+${r}`, { answerText: `${n}p + ${r}`, hints: [`${n} pens cost ${n} × p.`, `Then add ${r} for the ruler.`], solution: [`${n}p + ${r}`] }); }),
    E(4, 6, "rectangle-perimeter-expression", (rng) => { const k = rng.int(1, 9); return expr(`A rectangle has width w cm. Its length is ${k} cm more than its width. Write a simplified expression for its perimeter.`, `4*w+${2 * k}`, { flags: { simplified: true }, answerText: `4w + ${2 * k}`, hints: [`Length = w + ${k}.`, `Perimeter = w + (w + ${k}) + w + (w + ${k}).`], solution: [`2w + 2(w + ${k}) = 4w + ${2 * k}`], traps: [{ expr: `2*w+${k}`, feedback: "A rectangle has four sides: two widths and two lengths." }] }); }),
  ],
  [S(4, 7)]: [
    R(bank("expand-bracket"), 4, 7, 1, "expand-bracket"),
    E(4, 7, "expand-and-simplify", (rng) => { const a = rng.int(2, 6), b = rng.int(1, 9), c = rng.int(2, 5), d = rng.int(1, 9); const k = a * b - c * d; return expr(`Expand and simplify ${a}(x + ${b}) + ${c}(x − ${d}).`, `${a + c}*x+(${k})`, { flags: { simplified: true, expanded: true }, answerText: `${a + c}x ${k < 0 ? "−" : "+"} ${Math.abs(k)}`, hints: [`${a}(x + ${b}) = ${a}x + ${a * b}.`, `${c}(x − ${d}) = ${c}x − ${c * d}. Now collect like terms.`], solution: [`${a}x + ${a * b} + ${c}x − ${c * d}`, `= ${a + c}x ${k < 0 ? "−" : "+"} ${Math.abs(k)}`] }); }),
  ],
};

/* ---------------- Unit 5: Fractions ---------------- */
const U5 = {
  [S(5, 1)]: [
    C(5, 1, "pizza-left", (rng) => { const d = rng.pick([6, 8, 10, 12]), e = rng.int(1, d - 1); const f = simplify({ n: d - e, d }); return frac(`A pizza is cut into ${d} equal slices. ${e} slice${e > 1 ? "s are" : " is"} eaten. What fraction of the pizza is left? Give it in its simplest form.`, f.n, f.d, { hints: [`${d - e} slices are left out of ${d}.`, "Simplify if you can."], solution: [`{${d - e}/${d}}${f.d !== d ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T(e / d, "That's the fraction eaten, not the fraction left.")] }); }),
    E(5, 1, "fraction-of-hour", (rng) => { const m = rng.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 48, 50]); const f = simplify({ n: m, d: 60 }); return frac(`What fraction of an hour is ${m} minutes? Give it in its simplest form.`, f.n, f.d, { hints: ["There are 60 minutes in an hour.", `{${m}/60}: simplify it.`], solution: [`{${m}/60} = {${f.n}/${f.d}}`], traps: [T(m / 100, "An hour has 60 minutes, not 100.")] }); }),
  ],
  [S(5, 2)]: [
    C(5, 2, "missing-numerator", (rng) => { const d = rng.int(3, 9); let n = rng.int(1, d - 1); while (gcd(n, d) > 1) n = rng.int(1, d - 1); const k = rng.int(2, 8); return N(`Fill in the missing number: {${n}/${d}} = ?/${d * k}`, n * k, [`${d} × ${k} = ${d * k}.`, `Do the same to the top: ${n} × ${k}.`], [`Multiply top and bottom by ${k}`, `{${n}/${d}} = {${n * k}/${d * k}}`], { traps: [T(n + d * k - d, "Multiply the top by the same number as the bottom; don't add.")] }); }),
    E(5, 2, "not-equivalent", (rng) => { const d = rng.int(3, 7); let n = rng.int(1, d - 1); while (gcd(n, d) > 1) n = rng.int(1, d - 1); const k1 = rng.int(2, 5), k2 = k1 + rng.int(1, 4); const wrong = `{${n + 1}/${d * k1 + 1}}`; return mc3(rng, `Which of these is NOT equivalent to {${n}/${d}}?`, wrong, [[`{${n * k1}/${d * k1}}`, `This is {${n}/${d}} with top and bottom × ${k1}.`], [`{${n * k2}/${d * k2}}`, `This is {${n}/${d}} with top and bottom × ${k2}.`]], { hints: ["Equivalent fractions have top and bottom multiplied by the same number.", "Adding the same number doesn't keep a fraction equivalent."], solution: [`${wrong} isn't {${n}/${d}} multiplied top and bottom by the same number.`] }); }, (q) => true),
  ],
  [S(5, 3)]: [
    R(bank("simplify-fraction"), 5, 3, 1, "simplify-fraction"),
    E(5, 3, "simplify-large", (rng) => { const g = rng.pick([12, 15, 16, 18, 24]), d0 = rng.int(3, 7); let n0 = rng.int(1, d0 - 1); while (gcd(n0, d0) > 1) n0 = rng.int(1, d0 - 1); return frac(`Simplify {${n0 * g}/${d0 * g}} fully.`, n0, d0, { hints: [`Find the HCF of ${n0 * g} and ${d0 * g}.`, `Divide top and bottom by ${g}.`], solution: [`HCF = ${g}`, `{${n0 * g}/${d0 * g}} = {${n0}/${d0}}`] }); }),
  ],
  [S(5, 4)]: [
    C(5, 4, "larger-fraction", (rng) => { const a = [rng.int(1, 4), rng.int(5, 9)], b = [rng.int(1, 5), rng.int(5, 10)]; const va = a[0] / a[1], vb = b[0] / b[1]; if (va === vb || a[0] >= a[1] || b[0] >= b[1]) return null; const big = va > vb ? a : b, small = va > vb ? b : a; return mc3(rng, `Which is larger: {${a[0]}/${a[1]}} or {${b[0]}/${b[1]}}?`, `{${big[0]}/${big[1]}}`, [[`{${small[0]}/${small[1]}}`, "Write both with a common denominator, or as decimals, to compare."], ["They are equal", "Convert both to decimals to check."]], { hints: ["Use a common denominator.", `{${a[0]}/${a[1]}} = ${fmt(round(va, 3))}…, {${b[0]}/${b[1]}} = ${fmt(round(vb, 3))}…`], solution: [`{${big[0]}/${big[1]}} is larger.`] }); }),
    E(5, 4, "order-fractions", (rng) => { const pool = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [5, 8], [3, 8], [5, 6], [7, 10], [7, 12]]; const four = rng.shuffle(pool).slice(0, 4); const vals = four.map(([n, d]) => n / d); if (new Set(vals).size < 4) return null; const items = four.map(([n, d]) => `{${n}/${d}}`); const order = [...four].sort((x, y) => x[0] / x[1] - y[0] / y[1]).map(([n, d]) => `{${n}/${d}}`); return { type: "order", prompt: "Put these fractions in order, smallest first.", items: rng.shuffle(items), answer: { order, direction: "order from smallest to largest" }, answerText: order.join(", "), hints: ["Convert each to a decimal (divide top by bottom).", "Then order the decimals."], solution: [four.map(([n, d]) => `{${n}/${d}} = ${fmt(round(n / d, 3))}`).join(", "), `Order: ${order.join(", ")}`] }; }),
  ],
  [S(5, 5)]: [
    C(5, 5, "improper-to-mixed", (rng) => { const d = rng.int(3, 9), w = rng.int(1, 5); let r = rng.int(1, d - 1); while (gcd(r, d) > 1) r = rng.int(1, d - 1); const n = w * d + r; return { ...frac(`Write {${n}/${d}} as a mixed number. (Type it like 2 1/3.)`, n, d, { simplest: false, answerText: `${w} {${r}/${d}}`, hints: [`How many whole ${d}s go into ${n}?`, `${n} ÷ ${d} = ${w} remainder ${r}.`], solution: [`${n} ÷ ${d} = ${w} r ${r}`, `${w} {${r}/${d}}`] }), answer: { n, d, improper: false } }; }),
    E(5, 5, "mixed-to-improper", (rng) => { const d = rng.int(2, 9), w = rng.int(1, 6); let r = rng.int(1, d - 1); while (gcd(r, d) > 1) r = rng.int(1, d - 1); return frac(`Write ${w} {${r}/${d}} as an improper fraction.`, w * d + r, d, { hints: [`${w} whole ones = {${w * d}/${d}}.`, `Add the ${r}/${d}.`], solution: [`${w} × ${d} + ${r} = ${w * d + r}`, `{${w * d + r}/${d}}`] }); }),
  ],
  [S(5, 6)]: [
    C(5, 6, "add-same-denominator", (rng) => { const d = rng.int(5, 12), a = rng.int(1, d - 2), b = rng.int(1, d - 1 - a); const f = simplify({ n: a + b, d }); return frac(`Work out {${a}/${d}} + {${b}/${d}}. Simplify if possible.`, f.n, f.d, { hints: ["The denominators are the same, so add the numerators.", "Keep the denominator the same."], solution: [`{${a + b}/${d}}${f.d !== d ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T((a + b) / (2 * d), "Don't add the denominators.")] }); }),
    E(5, 6, "add-different-denominators", (rng) => { const b = rng.int(2, 6), d = rng.int(2, 8); if (b === d) return null; const a = rng.int(1, b - 1), c = rng.int(1, d - 1); const minus = rng.chance(0.4) && a / b > c / d; const n = minus ? a * d - c * b : a * d + c * b; const f = simplify({ n, d: b * d }); return frac(`Work out {${a}/${b}} ${minus ? "−" : "+"} {${c}/${d}}. Simplify your answer.`, f.n, f.d, { hints: [`Use a common denominator, such as ${b * d}.`, `{${a}/${b}} = {${a * d}/${b * d}} and {${c}/${d}} = {${c * b}/${b * d}}.`], solution: [`{${a * d}/${b * d}} ${minus ? "−" : "+"} {${c * b}/${b * d}} = {${n}/${b * d}}`, ...(f.d !== b * d ? [`= {${f.n}/${f.d}}`] : [])], traps: [T(minus ? (a - c) / Math.abs(b - d || 1) : (a + c) / (b + d), "You can't add the tops and bottoms separately: use a common denominator.")] }); }),
  ],
  [S(5, 7)]: [
    C(5, 7, "fraction-of-amount", (rng) => { const d = rng.int(3, 9), n = rng.int(1, d - 1), k = rng.int(2, 15); return N(`Work out {${n}/${d}} of ${d * k}.`, n * k, [`Divide by the denominator: ${d * k} ÷ ${d} = ${k}.`, `Multiply by the numerator: ${k} × ${n}.`], [`${d * k} ÷ ${d} = ${k}`, `${k} × ${n} = ${n * k}`], { traps: [T(k, "That's one part. Multiply by the numerator too.")] }); }),
    E(5, 7, "reverse-fraction", (rng) => { const d = rng.int(3, 9), n = rng.int(2, d - 1), k = rng.int(2, 12); if (gcd(n, d) > 1) return null; return N(`{${n}/${d}} of a number is ${n * k}. What is the number?`, d * k, [`${n} parts = ${n * k}, so 1 part = ${k}.`, `The whole is ${d} parts.`], [`1 part = ${n * k} ÷ ${n} = ${k}`, `Number = ${d} × ${k} = ${d * k}`], { traps: [T(clean((n * k * n) / d), "Work backwards: find one part first, then the whole.")] }); }),
  ],
};

/* ---------------- Unit 6: Decimals and percentages ---------------- */
const U6 = {
  [S(6, 1)]: [R(from("y7-u1-l1", 2), 6, 1, 1, "digit-value-decimal"), R(from("y7-u1-l2", 3), 6, 1, 2, "order-decimals")],
  [S(6, 2)]: [
    C(6, 2, "add-decimals", (rng) => { const a = clean(rng.int(101, 999) / 100), b = clean(rng.int(11, 99) / 10); return N(`Work out ${fmt(a)} + ${fmt(b)}.`, clean(a + b), ["Line up the decimal points.", `${fmt(a, 2)} + ${fmt(b, 2)}.`], [`= ${fmt(clean(a + b))}`]); }),
    E(6, 2, "subtract-from-whole", (rng) => { const w = rng.int(5, 20), b = clean(rng.int(101, w * 100 - 1) / 100); return N(`Work out ${w} − ${fmt(b)}.`, clean(w - b), [`Write ${w} as ${w}.00.`, "Exchange across the decimal point."], [`${w}.00 − ${fmt(b, 2)} = ${fmt(clean(w - b))}`]); }),
  ],
  [S(6, 3)]: [
    R(from("y7-u1-l1", 4), 6, 3, 1, "multiply-divide-powers"),
    E(6, 3, "two-step-powers", (rng) => { const x = clean(rng.int(11, 999) / 10), m = rng.pick([100, 1000]), d = rng.pick([10, 100]); return N(`Work out ${fmt(x)} × ${fmt(m)} ÷ ${d}.`, clean((x * m) / d), [`× ${fmt(m)} moves digits ${Math.log10(m)} places left.`, `÷ ${d} moves them ${Math.log10(d)} place${d > 10 ? "s" : ""} right.`], [`${fmt(x)} × ${fmt(m)} = ${fmt(clean(x * m))}`, `÷ ${d} = ${fmt(clean((x * m) / d))}`]); }),
  ],
  [S(6, 4)]: [
    C(6, 4, "percentage-not-shaded", (rng) => { const p = rng.int(5, 95); return { ...N(`${p}% of a grid is shaded. What percentage is not shaded?`, 100 - p, ["The whole grid is 100%.", `100 − ${p}.`], [`100% − ${p}% = ${100 - p}%`], { answerText: `${100 - p}%` }), type: "percentage" }; }),
    E(6, 4, "out-of-to-percent", (rng) => { const d = rng.pick([20, 25, 50, 10, 4, 5]), n = rng.int(1, d - 1); return { ...N(`Ella scored ${n} out of ${d}. What percentage is this?`, clean((n / d) * 100), [`Make the denominator 100: multiply top and bottom by ${100 / d}.`, `${n} × ${100 / d}.`], [`{${n}/${d}} = {${n * (100 / d)}/100} = ${n * (100 / d)}%`], { answerText: `${clean((n / d) * 100)}%` }), type: "percentage" }; }),
  ],
  [S(6, 5)]: [R(bank("fdp-match"), 6, 5, 1, "fdp-match"), R(from("y10-u1-l1", 1), 6, 5, 2, "frac-to-percent")],
  [S(6, 6)]: [
    R(bank("percent-of-amount"), 6, 6, 1, "percent-of-amount"),
    E(6, 6, "increase-by-10", (rng) => { const p = rng.pick([10, 20, 5, 25, 50]), a = rng.int(2, 40) * 20, up = rng.chance(0.5); const v = up ? a + (a * p) / 100 : a - (a * p) / 100; return N(`${up ? "Increase" : "Decrease"} £${a} by ${p}% without a calculator.`, v, [`Find ${p}% of £${a} first.`, `${p}% of £${a} = £${(a * p) / 100}. Then ${up ? "add it" : "subtract it"}.`], [`${p}% of ${a} = ${(a * p) / 100}`, `${a} ${up ? "+" : "−"} ${(a * p) / 100} = ${v}`], { pre: "£", traps: [T((a * p) / 100, `That's the ${p}%. Now ${up ? "add it to" : "take it from"} the original.`)] }); }),
  ],
};

/* ---------------- Unit 7: Sequences ---------------- */
const U7 = {
  [S(7, 1)]: [
    C(7, 1, "next-term", (rng) => { const a = rng.int(1, 20), d = rng.nonZero(-6, 9); const t = [0, 1, 2, 3].map((i) => a + i * d); return N(`What is the next term? ${t.join(", ")}, …`, a + 4 * d, [`Find the difference between terms: ${t[1]} − ${t[0]}.`, `Add ${d} to the last term.`], [`Difference ${fmt(d)}`, `${t[3]} ${d < 0 ? "−" : "+"} ${Math.abs(d)} = ${a + 4 * d}`]); }),
    E(7, 1, "missing-middle", (rng) => { const a = rng.int(1, 20), d = rng.int(2, 9); return N(`Find the missing term: ${a}, ?, ${a + 2 * d}, ${a + 3 * d}, …`, a + d, ["Find the difference from the terms you know.", `${a + 3 * d} − ${a + 2 * d} = ${d}.`], [`Difference ${d}`, `${a} + ${d} = ${a + d}`]); }),
  ],
  [S(7, 2)]: [
    C(7, 2, "describe-rule", (rng) => { const d = rng.int(2, 9), dec = rng.chance(0.4), a = dec ? rng.int(40, 70) : rng.int(1, 15); const t = [0, 1, 2, 3].map((i) => a + (dec ? -1 : 1) * i * d); return mc3(rng, `What is the term-to-term rule for ${t.join(", ")}, …?`, `${dec ? "Subtract" : "Add"} ${d}`, [[`${dec ? "Add" : "Subtract"} ${d}`, `The terms are getting ${dec ? "smaller" : "bigger"}.`], [`Multiply by ${d}`, "The terms change by the same amount each time: that's adding or subtracting."]], { hints: ["Look at how you get from one term to the next.", `${t[0]} → ${t[1]}.`], solution: [`Each term ${dec ? "subtracts" : "adds"} ${d}.`] }); }),
    E(7, 2, "double-plus-one", (rng) => { const a = rng.int(1, 6), m = rng.pick([2, 3]), c = rng.pick([1, -1, 2]); const t = [a]; for (let i = 0; i < 3; i++) t.push(t.at(-1) * m + c); return N(`A sequence uses the rule “multiply by ${m}, then ${c < 0 ? "subtract" : "add"} ${Math.abs(c)}”. The first terms are ${t.slice(0, 3).join(", ")}. Find the 4th term.`, t[3], [`Start with ${t[2]}.`, `${t[2]} × ${m} = ${t[2] * m}, then ${c < 0 ? "subtract" : "add"} ${Math.abs(c)}.`], [`${t[2]} × ${m} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${t[3]}`]); }),
  ],
  [S(7, 3)]: [
    C(7, 3, "fifth-term", (rng) => { const a = rng.int(1, 30), d = rng.nonZero(-7, 9); return N(`A sequence starts at ${a} and the rule is “${d < 0 ? "subtract" : "add"} ${Math.abs(d)}”. What is the 5th term?`, a + 4 * d, ["Write out the terms one at a time.", `There are 4 steps from the 1st term to the 5th.`], [`${[0, 1, 2, 3, 4].map((i) => a + i * d).join(", ")}`, `5th term = ${a + 4 * d}`], { traps: [T(a + 5 * d, "From the 1st to the 5th term is only 4 steps.")] }); }),
    E(7, 3, "two-step-rule", (rng) => { const a = rng.int(2, 9), m = rng.pick([2, 3]), c = rng.int(1, 5); const t = [a]; for (let i = 0; i < 3; i++) t.push(t.at(-1) * m - c); return N(`The first term of a sequence is ${a}. The rule is “multiply by ${m}, then subtract ${c}”. Find the 4th term.`, t[3], ["Apply the rule three times.", `2nd term: ${a} × ${m} − ${c} = ${t[1]}.`], [`${t.join(", ")}`]); }),
  ],
  [S(7, 4)]: [
    C(7, 4, "common-difference", (rng) => { const a = rng.int(-10, 20), d = rng.nonZero(-8, 9); const t = [0, 1, 2, 3].map((i) => a + i * d); return N(`What is the common difference of ${t.map(fmt).join(", ")}, …?`, d, ["Subtract each term from the next one.", `${fmt(t[1])} − ${fmt(t[0])}.`], [`Common difference = ${fmt(d)}`], { traps: [T(-d, "Subtract the earlier term from the later one: if the terms decrease, the difference is negative.")] }); }),
    E(7, 4, "tenth-term", (rng) => { const a = rng.int(1, 20), d = rng.int(2, 9); return N(`An arithmetic sequence starts ${a}, ${a + d}, ${a + 2 * d}, … What is the 10th term?`, a + 9 * d, [`From the 1st term to the 10th is 9 steps of ${d}.`, `${a} + 9 × ${d}.`], [`${a} + 9 × ${d} = ${a + 9 * d}`], { traps: [T(a + 10 * d, "From the 1st term to the 10th is 9 steps, not 10.")] }); }),
  ],
  [S(7, 5)]: [R(from("y9-u7-l2", 1), 7, 5, 1, "find-term"), R(from("y9-u7-l1", 1), 7, 5, 2, "nth-term-increasing")],
  [S(7, 6)]: [
    C(7, 6, "matchstick-pattern", (rng) => { const d = rng.int(2, 6), c = rng.int(1, 4), k = rng.pick([10, 12, 15, 20]); const t = [1, 2, 3].map((n) => d * n + c); return N(`Patterns of matchsticks use ${t.join(", ")} sticks for patterns 1, 2 and 3. How many sticks are in pattern ${k}?`, d * k + c, [`Each pattern adds ${d} sticks.`, `Pattern n uses ${d}n + ${c} sticks.`], [`${d} × ${k} + ${c} = ${d * k + c}`]); }),
    E(7, 6, "which-pattern", (rng) => { const d = rng.int(2, 6), c = rng.int(1, 4), n = rng.int(8, 30); return N(`Pattern n uses ${d}n + ${c} tiles. Which pattern uses ${d * n + c} tiles?`, n, [`Solve ${d}n + ${c} = ${d * n + c}.`, `${d}n = ${d * n}.`], [`n = ${d * n} ÷ ${d} = ${n}`]); }),
  ],
};

/* ---------------- Unit 8: Angles and lines ---------------- */
function angleDiagram(a) {
  const P = [60, 170], L = 220;
  const B = [P[0] + L * Math.cos((a * Math.PI) / 180), P[1] - L * Math.sin((a * Math.PI) / 180)];
  return { kind: "shapes", width: 340, height: 200, note: false, polys: [{ pts: [P, [P[0] + L, P[1]]], open: true }, { pts: [P, B.map((v) => Math.round(v))], open: true }], labels: [{ at: [P[0] + 40 * Math.cos((a * Math.PI) / 360) + 6, P[1] - 40 * Math.sin((a * Math.PI) / 360)], text: "?", small: true }], description: `An angle drawn between two lines.` };
}
const U8 = {
  [S(8, 1)]: [
    C(8, 1, "classify-angle", (rng) => { const kind = rng.pick(["acute", "obtuse", "reflex", "right"]); const a = { acute: rng.int(10, 85), obtuse: rng.int(95, 175), reflex: rng.int(190, 350), right: 90 }[kind]; const names = { acute: "Acute", obtuse: "Obtuse", reflex: "Reflex", right: "Right angle" }; const others = rng.shuffle(Object.keys(names).filter((k) => k !== kind)).slice(0, 2); return mc3(rng, `What type of angle is ${a}°?`, names[kind], others.map((o) => [names[o], "Acute < 90°, right = 90°, obtuse between 90° and 180°, reflex > 180°."]), { hints: ["Compare the angle with 90° and 180°.", "Reflex angles are more than 180°."], solution: [`${a}° is ${names[kind].toLowerCase()}.`] }); }),
    E(8, 1, "reflex-partner", (rng) => { const a = rng.int(20, 170); return N(`An angle at a point is ${a}°. What is the reflex angle that makes a full turn with it?`, 360 - a, ["A full turn is 360°.", `360 − ${a}.`], [`360 − ${a} = ${360 - a}°`], { unit: "°", traps: [T(180 - a, "A full turn is 360°, not 180°.")] }); }),
  ],
  [S(8, 2)]: [
    C(8, 2, "read-angle", (rng) => { const a = rng.int(2, 17) * 10 + rng.pick([0, 5]); if (a >= 175 || a <= 15) return null; return mc3(rng, "Estimate the size of the angle marked ?. (Use what you know about right angles and straight lines.)", `${a}°`, [[`${180 - a}°`, "That's reading the wrong scale on a protractor: is the angle acute or obtuse?"], [`${a < 90 ? a + 90 : a - 60}°`, "Compare with a right angle (90°)."]], { diagram: angleDiagram(a), hints: ["Is the angle less than or more than a right angle?", "On a protractor, start from 0° on the line the angle begins from."], solution: [`The angle is ${a < 90 ? "acute" : "obtuse"}, about ${a}°.`] }); }),
    E(8, 2, "protractor-scale", (rng) => { const a = rng.int(20, 160); return N(`Ali measures an angle using the wrong scale of the protractor and reads ${180 - a}°. The angle is ${a < 90 ? "acute" : "obtuse"}. What is its actual size?`, a, ["The two scales add up to 180°.", `180 − ${180 - a}.`], [`180 − ${180 - a} = ${a}°`], { unit: "°" }); }),
  ],
  [S(8, 3)]: [
    C(8, 3, "straight-line", (rng) => { const a = rng.int(15, 165); return N(`Two angles on a straight line are ${a}° and x°. Find x.`, 180 - a, ["Angles on a straight line add up to 180°.", `180 − ${a}.`], [`x = 180 − ${a} = ${180 - a}`], { unit: "°", traps: [T(360 - a, "Angles on a straight line add to 180°, not 360°.")] }); }),
    E(8, 3, "straight-line-algebra", (rng) => { const x = rng.int(15, 50), c = rng.int(5, 30); const third = 180 - x - (2 * x + c); if (third <= 0) return null; return N(`Three angles on a straight line are x°, (2x + ${c})° and ${third}°. Find x.`, x, ["They add up to 180°.", `x + 2x + ${c} + ${third} = 180.`], [`3x + ${c + third} = 180`, `3x = ${180 - c - third}`, `x = ${x}`]); }),
  ],
  [S(8, 4)]: [
    C(8, 4, "around-point", (rng) => { const a = rng.int(40, 150), b = rng.int(40, 150); if (a + b >= 340) return null; return N(`Three angles meet at a point. Two are ${a}° and ${b}°. Find the third.`, 360 - a - b, ["Angles around a point add up to 360°.", `360 − ${a} − ${b}.`], [`360 − ${a + b} = ${360 - a - b}°`], { unit: "°", traps: [T(180 - a - b, "Angles around a point add to 360°.")] }); }),
    E(8, 4, "around-point-algebra", (rng) => { const x = rng.pick([20, 30, 36, 40, 45, 50]), c = 360 - 6 * x; return N(`Angles around a point are x°, 2x° and ${3}x°${c ? ` and ${c}°` : ""}. Find x.`, x, ["They add to 360°.", `6x${c ? ` + ${c}` : ""} = 360.`], [`6x = ${360 - c}`, `x = ${x}`]); }, (q) => true),
  ],
  [S(8, 5)]: [
    C(8, 5, "vertically-opposite", (rng) => { const a = rng.int(20, 160); const ask = rng.pick(["opposite", "next"]); return N(`Two straight lines cross. One of the angles is ${a}°. What is the angle ${ask === "opposite" ? "vertically opposite it" : "next to it (on the same straight line)"}?`, ask === "opposite" ? a : 180 - a, [ask === "opposite" ? "Vertically opposite angles are equal." : "Angles on a straight line add to 180°.", ask === "opposite" ? "It's the same size." : `180 − ${a}.`], [ask === "opposite" ? `${a}° (vertically opposite angles are equal)` : `180 − ${a} = ${180 - a}°`], { unit: "°" }); }),
    E(8, 5, "vertically-opposite-algebra", (rng) => { const x = rng.int(15, 40), a = rng.int(2, 4), b = a + rng.int(1, 3); const c = (b - a) * x; return N(`Two vertically opposite angles are (${a}x + ${c})° and ${b}x°. Find x.`, x, ["Vertically opposite angles are equal.", `${a}x + ${c} = ${b}x.`], [`${c} = ${b - a}x`, `x = ${x}`]); }),
  ],
  [S(8, 6)]: [
    C(8, 6, "triangle-angle", (rng) => { const a = rng.int(20, 100), b = rng.int(20, 150 - a); return N(`Two angles in a triangle are ${a}° and ${b}°. Find the third.`, 180 - a - b, ["Angles in a triangle add up to 180°.", `180 − ${a} − ${b}.`], [`180 − ${a + b} = ${180 - a - b}°`], { unit: "°" }); }),
    E(8, 6, "isosceles", (rng) => { const top = rng.int(10, 80) * 2; return N(`An isosceles triangle has a top angle of ${top}°. What size is each of the two equal base angles?`, (180 - top) / 2, ["The two base angles are equal.", `They share 180 − ${top} = ${180 - top}°.`], [`(180 − ${top}) ÷ 2 = ${(180 - top) / 2}°`], { unit: "°", traps: [T(180 - top, "Share that between the TWO base angles.")] }); }),
  ],
  [S(8, 7)]: [
    C(8, 7, "quadrilateral-angle", (rng) => { const a = rng.int(50, 130), b = rng.int(50, 130), c = rng.int(50, 130); if (a + b + c >= 340) return null; return N(`Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Find the fourth.`, 360 - a - b - c, ["Angles in a quadrilateral add up to 360°.", `360 − ${a + b + c}.`], [`360 − ${a + b + c} = ${360 - a - b - c}°`], { unit: "°", traps: [T(180 - a - b - c > 0 ? 180 - a - b - c : 1, "Quadrilaterals add to 360°, not 180°.")] }); }),
    E(8, 7, "quadrilateral-ratio", (rng) => { const parts = [[1, 2, 3, 4], [1, 1, 2, 2], [2, 3, 3, 4], [1, 2, 2, 3]][rng.int(0, 3)]; const s = parts.reduce((a, b) => a + b, 0); const x = 360 / s; if (!Number.isInteger(x)) return null; return N(`The angles of a quadrilateral are ${parts.map((p) => (p === 1 ? "x" : `${p}x`)).join(", ")} (in degrees). Find x.`, x, ["They add up to 360°.", `${s}x = 360.`], [`x = 360 ÷ ${s} = ${x}`], { traps: [T(180 / s, "Quadrilaterals add to 360°.")] }); }),
  ],
};

/* ---------------- Unit 9: Perimeter and area ---------------- */
const U9 = {
  [S(9, 1)]: [
    C(9, 1, "rectangle-perimeter", (rng) => { const l = rng.int(3, 25), w = rng.int(2, 20); return N(`Find the perimeter of a rectangle ${l} cm long and ${w} cm wide.`, 2 * (l + w), ["Perimeter is the distance all the way round.", `${l} + ${w} + ${l} + ${w}.`], [`2 × (${l} + ${w}) = ${2 * (l + w)} cm`], { unit: "cm", traps: [T(l * w, "That's the area. Perimeter adds the sides."), T(l + w, "There are four sides, not two.")] }); }),
    E(9, 1, "l-shape-perimeter", (rng) => { const W = rng.int(8, 20), H = rng.int(8, 20), a = rng.int(2, W - 3), b = rng.int(2, H - 3); return N(`An L-shape is made by cutting a ${a} cm by ${b} cm rectangle from the corner of a ${W} cm by ${H} cm rectangle. Find the perimeter of the L-shape.`, 2 * (W + H), ["Sketch it and label every side.", "Cutting a corner out doesn't change the perimeter: the missing sides are replaced by the new inner sides."], [`Perimeter = 2 × (${W} + ${H}) = ${2 * (W + H)} cm`], { unit: "cm", traps: [T(2 * (W + H) - a - b, "The cut-out adds two new sides that replace the ones removed.")] }); }),
  ],
  [S(9, 2)]: [
    C(9, 2, "rectangle-area", (rng) => { const l = rng.int(3, 25), w = rng.int(2, 20); return N(`Find the area of a rectangle ${l} cm by ${w} cm.`, l * w, ["Area of a rectangle = length × width.", `${l} × ${w}.`], [`${l} × ${w} = ${l * w} cm²`], { unit: "cm²", traps: [T(2 * (l + w), "That's the perimeter.")] }); }),
    R(bank("carpet-cost"), 9, 2, 2, "carpet-cost"),
  ],
  [S(9, 3)]: [
    C(9, 3, "triangle-area", (rng) => { const b = rng.int(3, 20), h = rng.int(2, 16); return N(`Find the area of a triangle with base ${b} cm and perpendicular height ${h} cm.`, (b * h) / 2, ["Area = ½ × base × height.", `½ × ${b} × ${h}.`], [`${b} × ${h} ÷ 2 = ${fmt((b * h) / 2)} cm²`], { unit: "cm²", traps: [T(b * h, "Don't forget to halve: a triangle is half a rectangle.")] }); }),
    E(9, 3, "triangle-height", (rng) => { const b = rng.int(4, 16), h = rng.int(3, 14); return N(`A triangle has area ${fmt((b * h) / 2)} cm² and base ${b} cm. Find its perpendicular height.`, h, ["Area = ½ × base × height.", `${fmt((b * h) / 2)} = ½ × ${b} × h, so h = ${fmt(b * h)} ÷ ${b}.`], [`h = 2 × ${fmt((b * h) / 2)} ÷ ${b} = ${h} cm`], { unit: "cm", traps: [T(clean((b * h) / 2 / b), "Double the area first, because of the ½.")] }); }),
  ],
  [S(9, 4)]: [
    C(9, 4, "parallelogram-area", (rng) => { const b = rng.int(4, 20), h = rng.int(3, 15); return N(`A parallelogram has base ${b} cm and perpendicular height ${h} cm. Find its area.`, b * h, ["Area of a parallelogram = base × perpendicular height.", `${b} × ${h}.`], [`${b} × ${h} = ${b * h} cm²`], { unit: "cm²", traps: [T((b * h) / 2, "It's not a triangle: don't halve.")] }); }),
    E(9, 4, "parallelogram-slant", (rng) => { const b = rng.int(5, 15), h = rng.int(3, 9), s = h + rng.int(1, 4); return N(`A parallelogram has base ${b} cm, slanted side ${s} cm and perpendicular height ${h} cm. Find its area.`, b * h, ["Use the PERPENDICULAR height, not the slanted side.", `${b} × ${h}.`], [`${b} × ${h} = ${b * h} cm²`], { unit: "cm²", traps: [T(b * s, "Use the perpendicular height, not the slanted side.")] }); }),
  ],
  [S(9, 5)]: [
    C(9, 5, "l-shape-area", (rng) => { const W = rng.int(8, 20), H = rng.int(8, 20), a = rng.int(2, W - 3), b = rng.int(2, H - 3); return N(`An L-shape is made by cutting a ${a} cm by ${b} cm rectangle from the corner of a ${W} cm by ${H} cm rectangle. Find its area.`, W * H - a * b, ["Find the area of the big rectangle, then subtract the cut-out.", `${W} × ${H} − ${a} × ${b}.`], [`${W * H} − ${a * b} = ${W * H - a * b} cm²`], { unit: "cm²" }); }),
    E(9, 5, "house-shape", (rng) => { const w = rng.int(4, 12) * 2, h = rng.int(4, 12), t = rng.int(2, 8); return N(`A shape is a rectangle ${w} cm wide and ${h} cm tall, with a triangle on top. The triangle has the same base (${w} cm) and is ${t} cm tall. Find the total area.`, w * h + (w * t) / 2, ["Find the rectangle and triangle areas separately.", `${w} × ${h} + ½ × ${w} × ${t}.`], [`${w * h} + ${(w * t) / 2} = ${w * h + (w * t) / 2} cm²`], { unit: "cm²" }); }),
  ],
  [S(9, 6)]: [R(from("y9-u8-l1", 1), 9, 6, 1, "convert-metric"), R(from("y9-u8-l1", 2), 9, 6, 2, "convert-area")],
};

/* ---------------- Unit 10: Ratio ---------------- */
const U10 = {
  [S(10, 1)]: [
    C(10, 1, "ratio-scale-up", (rng) => { const a = rng.int(1, 5), b = rng.int(2, 7), k = rng.int(2, 8); return N(`A drink is made with ${a} cup${a > 1 ? "s" : ""} of juice for every ${b} cups of water. How many cups of water are needed with ${a * k} cups of juice?`, b * k, [`${a * k} ÷ ${a} = ${k}, so make ${k} times as much.`, `${b} × ${k}.`], [`${b} × ${k} = ${b * k} cups`], { traps: [T(a * k + (b - a), "Ratios multiply; they don't add a fixed amount.")] }); }),
    E(10, 1, "fraction-from-ratio", (rng) => { const a = rng.int(1, 7), b = rng.int(1, 7); if (a === b) return null; const f = simplify({ n: b, d: a + b }); return frac(`The ratio of boys to girls in a club is ${a} : ${b}. What fraction of the club are girls?`, f.n, f.d, { hints: [`There are ${a} + ${b} = ${a + b} parts in total.`, `Girls are ${b} of those parts.`], solution: [`{${b}/${a + b}}${f.d !== a + b ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T(b / a, "The fraction is out of the TOTAL number of parts.")] }); }),
  ],
  [S(10, 2)]: [
    C(10, 2, "simplify-ratio", (rng) => { const g = rng.int(2, 9), a = rng.int(1, 9), b = rng.int(1, 9); if (gcd(a, b) !== 1 || a === b) return null; return multi(`Simplify the ratio ${a * g} : ${b * g}.`, [["First part:", a], ["Second part:", b]], { answerText: `${a} : ${b}`, hints: ["Divide both parts by their highest common factor.", `Both divide by ${g}.`], solution: [`${a * g} : ${b * g} = ${a} : ${b}`] }); }),
    E(10, 2, "ratio-units", (rng) => { const cm = rng.pick([20, 25, 40, 50, 60, 75]), m = rng.int(1, 4); const a = cm, b = m * 100, g = gcd(a, b); return multi(`Simplify the ratio ${cm} cm : ${m} m.`, [["First part:", a / g], ["Second part:", b / g]], { answerText: `${a / g} : ${b / g}`, hints: [`Make the units the same: ${m} m = ${m * 100} cm.`, `Simplify ${cm} : ${m * 100}.`], solution: [`${cm} : ${m * 100}`, `= ${a / g} : ${b / g}`] }); }),
  ],
  [S(10, 3)]: [
    C(10, 3, "share-two-parts", (rng) => { const a = rng.int(1, 6), b = rng.int(1, 7), u = rng.int(2, 20); if (a === b) return null; const T0 = (a + b) * u; return N(`Share £${T0} in the ratio ${a} : ${b}. What is the larger share?`, Math.max(a, b) * u, [`Total parts = ${a + b}. One part = £${T0} ÷ ${a + b}.`, `One part = £${u}.`], [`£${T0} ÷ ${a + b} = £${u}`, `Larger share = ${Math.max(a, b)} × £${u} = £${Math.max(a, b) * u}`], { pre: "£", traps: [T(T0 / 2, "Shares in a ratio aren't equal.")] }); }),
    R(from("y10-u7-l1", 2), 10, 3, 2, "three-part-share"),
  ],
  [S(10, 4)]: [
    C(10, 4, "ratio-to-fraction", (rng) => { const a = rng.int(1, 9), b = rng.int(1, 9); if (a === b) return null; const f = simplify({ n: a, d: a + b }); return frac(`Red and blue beads are in the ratio ${a} : ${b}. What fraction of the beads are red?`, f.n, f.d, { hints: [`Total parts: ${a + b}.`, `Red: ${a} parts.`], solution: [`{${a}/${a + b}}${f.d !== a + b ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T(a / b, "Divide by the TOTAL number of parts.")] }); }),
    E(10, 4, "fraction-to-ratio", (rng) => { const d = rng.int(3, 11), n = rng.int(1, d - 1); if (gcd(n, d) !== 1) return null; return multi(`{${n}/${d}} of a class are boys. Write the ratio of boys to girls.`, [["Boys:", n], ["Girls:", d - n]], { answerText: `${n} : ${d - n}`, hints: [`If {${n}/${d}} are boys, then {${d - n}/${d}} are girls.`, `So the ratio is ${n} : ${d - n}.`], solution: [`Boys : girls = ${n} : ${d - n}`] }); }),
  ],
  [S(10, 5)]: [
    R(from("y10-u7-l3", 2), 10, 5, 1, "recipe"),
    E(10, 5, "how-many-servings", (rng) => { const f = rng.pick([150, 200, 250]), e = rng.int(2, 3), F = f * rng.int(3, 8) + rng.int(0, f - 1), Eg = rng.int(6, 20); const batches = Math.min(Math.floor(F / f), Math.floor(Eg / e)); if (batches < 1) return null; return N(`A recipe for 4 people needs ${f} g of flour and ${e} eggs. You have ${fmt(F)} g of flour and ${Eg} eggs. What is the greatest number of people you can make it for, using whole batches?`, batches * 4, ["Work out how many batches each ingredient allows.", `Flour: ${fmt(F)} ÷ ${f} = ${fmt(round(F / f, 2))}…; eggs: ${Eg} ÷ ${e} = ${fmt(round(Eg / e, 2))}…`], [`Flour allows ${Math.floor(F / f)} batches, eggs allow ${Math.floor(Eg / e)}`, `So ${batches} batches = ${batches * 4} people`]); }),
  ],
};

/* ---------------- Unit 11: Data and averages ---------------- */
const U11 = {
  [S(11, 1)]: [
    C(11, 1, "type-of-data", (rng) => { const items = [["eye colour", "Qualitative"], ["favourite sport", "Qualitative"], ["number of pets", "Discrete"], ["shoe size", "Discrete"], ["height", "Continuous"], ["time to run 100 m", "Continuous"], ["mass of a parcel", "Continuous"], ["number of siblings", "Discrete"]]; const [v, t] = rng.pick(items); const others = ["Qualitative", "Discrete", "Continuous"].filter((x) => x !== t); return mc3(rng, `What type of data is ${v}?`, t, others.map((o) => [o, "Qualitative = words/categories; discrete = counted (separate values); continuous = measured."]), { hints: ["Is it a word or a number?", "If a number: is it counted or measured?"], solution: [`${v[0].toUpperCase() + v.slice(1)} is ${t.toLowerCase()} data.`] }); }),
    E(11, 1, "continuous-example", (rng) => { const opts = [["the mass of an apple", "the number of apples in a bag", "the colour of an apple"], ["the time taken to walk home", "the number of cars passing", "the make of a car"], ["the length of a leaf", "the number of leaves on a branch", "the type of tree"]]; const [c, d, q] = rng.pick(opts); return mc3(rng, "Which of these is continuous data?", c, [[d, "That's counted, so it's discrete."], [q, "That's described in words, so it's qualitative."]], { hints: ["Continuous data is measured, and can take any value in a range.", "Counted data is discrete."], solution: [`${c[0].toUpperCase() + c.slice(1)} is measured, so it's continuous.`] }); }),
  ],
  [S(11, 2)]: [
    C(11, 2, "good-question", (rng) => mc3(rng, "Which is the best question for a survey about how much exercise people do?", "How many hours of exercise do you do each week? (0–1, 2–3, 4–5, more than 5)", [["Do you agree that exercise is important?", "This is a leading question: it pushes people towards an answer."], ["How much exercise do you do?", "It's vague, with no time period or answer options."]], { hints: ["A good question is clear, unbiased and has non-overlapping answer options.", "Check for a time frame and options."], solution: ["The first question has a clear time frame and answer options that don't overlap."] })),
    E(11, 2, "primary-secondary", (rng) => { const p = rng.chance(0.5); return mc3(rng, p ? "Tia counts the cars passing her school for an hour. What kind of data is this?" : "Ben uses rainfall figures from the Met Office website. What kind of data is this?", p ? "Primary data" : "Secondary data", [[p ? "Secondary data" : "Primary data", "Primary data is collected yourself; secondary data was collected by someone else."], ["Continuous data", "The question is about who collected the data."]], { hints: ["Did the person collect the data themselves?", "Primary = you collected it."], solution: [p ? "She collected it herself: primary data." : "Someone else collected it: secondary data."] }); }),
  ],
  [S(11, 3)]: [
    C(11, 3, "total-frequency", (rng) => { const cats = ["Football", "Tennis", "Swimming", "Netball"], f = cats.map(() => rng.int(2, 15)); return N(`A frequency table shows favourite sports: ${cats.map((c, i) => `${c} ${f[i]}`).join(", ")}. How many people were asked?`, f.reduce((a, b) => a + b, 0), ["The total is the sum of all the frequencies.", f.join(" + ")], [`${f.join(" + ")} = ${f.reduce((a, b) => a + b, 0)}`]); }),
    E(11, 3, "tally-count", (rng) => { const n = rng.int(7, 23); const groups = Math.floor(n / 5), rest = n % 5; const tally = [..."卌".repeat(groups)].join(" ") + (rest ? " " + "|".repeat(rest) : ""); return N(`A tally shows: ${tally} (卌 is a group of five). What is the frequency?`, n, ["Each gate (卌) is 5.", `${groups} groups of 5, plus ${rest}.`], [`${groups} × 5 + ${rest} = ${n}`]); }),
  ],
  [S(11, 4)]: [
    C(11, 4, "read-bar-chart", (rng) => { const cats = ["Mon", "Tue", "Wed", "Thu", "Fri"], v = cats.map(() => rng.int(2, 18)); const k = rng.int(0, 4); const w1 = v[k] + 1, w2 = v[(k + 1) % 5]; if (new Set([v[k], w1, w2]).size < 3) return null; return mc3(rng, `The bar chart shows how many books were borrowed each day (1 = Mon … 5 = Fri). How many were borrowed on ${cats[k]}?`, String(v[k]), [[String(w1), "Read across from the top of the bar to the scale carefully."], [String(w2), `That's a different day. ${cats[k]} is bar ${k + 1}.`]], { diagram: { kind: "graph", x: [0.5, 5.5], y: [0, 20], xStep: 1, yStep: 2, bars: v.map((h, i) => ({ x0: i + 0.6, x1: i + 1.4, h })), xLabel: "Day", yLabel: "Books", description: `Bar chart: ${cats.map((c, i) => `${c} ${v[i]}`).join(", ")}.` }, hints: [`Find bar ${k + 1} (${cats[k]}).`, "Read across from the top of the bar."], solution: [`${cats[k]}: ${v[k]} books`] }); }),
    E(11, 4, "bar-chart-difference", (rng) => { const v = [1, 2, 3, 4, 5].map(() => rng.int(2, 18)); const a = rng.int(0, 4); let b = rng.int(0, 4); if (a === b || v[a] === v[b]) return null; const d = Math.abs(v[a] - v[b]); if (new Set([d, v[a], v[b]]).size < 3) return null; return mc3(rng, `The bar chart shows the number of visitors each day. How many more visitors were there on day ${v[a] > v[b] ? a + 1 : b + 1} than on day ${v[a] > v[b] ? b + 1 : a + 1}?`, String(d), [[String(Math.max(v[a], v[b])), "That's the number on one day. Find the difference."], [String(Math.min(v[a], v[b])), "That's the number on one day. Find the difference."]], { diagram: { kind: "graph", x: [0.5, 5.5], y: [0, 20], xStep: 1, yStep: 2, bars: v.map((h, i) => ({ x0: i + 0.6, x1: i + 1.4, h })), xLabel: "Day", yLabel: "Visitors", description: `Bar chart of visitors: ${v.join(", ")}.` }, hints: ["Read both bars.", "Subtract the smaller from the larger."], solution: [`${Math.max(v[a], v[b])} − ${Math.min(v[a], v[b])} = ${d}`] }); }),
  ],
  [S(11, 5)]: [
    C(11, 5, "range", (rng) => { const v = Array.from({ length: rng.int(5, 8) }, () => rng.int(1, 60)); return N(`Find the range of: ${v.join(", ")}.`, Math.max(...v) - Math.min(...v), ["Range = largest − smallest.", `Largest ${Math.max(...v)}, smallest ${Math.min(...v)}.`], [`${Math.max(...v)} − ${Math.min(...v)} = ${Math.max(...v) - Math.min(...v)}`], { traps: [T(v.at(-1) - v[0], "Use the largest and smallest values, not the last and first.")] }); }),
    E(11, 5, "median-even", (rng) => { const v = Array.from({ length: 6 }, () => rng.int(1, 40)); const s = [...v].sort((a, b) => a - b); const m = (s[2] + s[3]) / 2; return N(`Find the median of: ${v.join(", ")}.`, m, ["Put the numbers in order first.", "With 6 values, the median is halfway between the 3rd and 4th."], [`In order: ${s.join(", ")}`, `(${s[2]} + ${s[3]}) ÷ 2 = ${fmt(m)}`], { traps: [T((v[2] + v[3]) / 2, "Order the numbers before finding the middle.")] }); }),
  ],
  [S(11, 6)]: [
    R(bank("mean"), 11, 6, 1, "mean"),
    E(11, 6, "missing-value-mean", (rng) => { const m = rng.int(5, 20), a = rng.int(1, 30), b = rng.int(1, 30), c = rng.int(1, 30); const d = 4 * m - a - b - c; if (d < 0) return null; return N(`The mean of four numbers is ${m}. Three of them are ${a}, ${b} and ${c}. Find the fourth.`, d, [`The total of the four numbers is 4 × ${m} = ${4 * m}.`, `Subtract the three you know.`], [`Total = ${4 * m}`, `${4 * m} − ${a + b + c} = ${d}`]); }),
  ],
};

/* ---------------- Unit 12: Probability ---------------- */
const U12 = {
  [S(12, 1)]: [
    C(12, 1, "probability-words", (rng) => { const events = [["rolling a 7 on a normal dice", "Impossible"], ["the sun rising tomorrow", "Certain"], ["getting heads when you flip a coin", "Even chance"], ["rolling a number less than 6 on a dice", "Likely"], ["picking a red card from a pack that is all black", "Impossible"], ["rolling a 6 on a dice", "Unlikely"]]; const [e, w] = rng.pick(events); const others = rng.shuffle(["Impossible", "Unlikely", "Even chance", "Likely", "Certain"].filter((x) => x !== w)).slice(0, 2); return mc3(rng, `Which word best describes the probability of ${e}?`, w, others.map((o) => [o, "Think about how many outcomes are possible and how many give the event."]), { hints: ["Impossible = 0, certain = 1, even chance = ½.", "Is it more or less likely than not?"], solution: [`${e[0].toUpperCase() + e.slice(1)}: ${w.toLowerCase()}.`] }); }),
    E(12, 1, "more-likely", (rng) => { const a = rng.int(1, 5), b = rng.int(1, 5); if (a === b) return null; return mc3(rng, `Bag A has ${a} red and ${6 - a} blue counters. Bag B has ${b} red and ${6 - b} blue. Which bag gives the better chance of picking red?`, a > b ? "Bag A" : "Bag B", [[a > b ? "Bag B" : "Bag A", "Compare the number of reds out of 6 in each bag."], ["Both are the same", `${a}/6 and ${b}/6 are different.`]], { hints: ["Both bags have 6 counters.", "Which has more red?"], solution: [`A: ${a}/6, B: ${b}/6`, `${a > b ? "Bag A" : "Bag B"} is better.`] }); }),
  ],
  [S(12, 2)]: [
    C(12, 2, "probability-scale", (rng) => { const p = rng.pick([0.05, 0.1, 0.2, 0.3, 0.7, 0.8, 0.9, 0.95]); const w = p < 0.5 ? "Unlikely" : "Likely"; return mc3(rng, `An event has probability ${fmt(p)}. How would you describe it?`, w, [[p < 0.5 ? "Likely" : "Unlikely", `${fmt(p)} is ${p < 0.5 ? "less" : "more"} than 0.5.`], ["Certain", "Certain is exactly 1."]], { hints: ["The probability scale goes from 0 (impossible) to 1 (certain).", "0.5 is an even chance."], solution: [`${fmt(p)} is ${p < 0.5 ? "below" : "above"} 0.5, so ${w.toLowerCase()}.`] }); }),
    E(12, 2, "not-a-probability", (rng) => { const bad = rng.pick(["1.2", "−0.3", "{5/4}", "110%"]); const good = rng.shuffle(["0", "1", "0.45", "{3/8}", "75%"]).slice(0, 2); return mc3(rng, "Which of these CANNOT be a probability?", bad, good.map((g) => [g, "This is between 0 and 1 (inclusive), so it can be a probability."]), { hints: ["A probability must be between 0 and 1.", "Check for values below 0 or above 1."], solution: [`${bad} is outside 0 to 1.`] }); }),
  ],
  [S(12, 3)]: [
    C(12, 3, "bag-probability", (rng) => { const r = rng.int(1, 9), b = rng.int(1, 9), g = rng.int(0, 6); const n = r + b + g; const f = simplify({ n: r, d: n }); return frac(`A bag has ${r} red, ${b} blue${g ? ` and ${g} green` : ""} counters. One is picked at random. Find P(red).`, f.n, f.d, { hints: [`Total counters = ${n}.`, `P(red) = number of red ÷ total.`], solution: [`{${r}/${n}}${f.d !== n ? ` = {${f.n}/${f.d}}` : ""}`], traps: [T(r / b, "Divide by the TOTAL number of counters.")] }); }),
    E(12, 3, "dice-event", (rng) => { const ev = rng.pick([["a prime number", [2, 3, 5]], ["a multiple of 3", [3, 6]], ["a number greater than 4", [5, 6]], ["a factor of 6", [1, 2, 3, 6]], ["an odd number", [1, 3, 5]]]); const f = simplify({ n: ev[1].length, d: 6 }); return frac(`A fair dice is rolled. Find the probability of rolling ${ev[0]}.`, f.n, f.d, { hints: ["There are 6 equally likely outcomes.", `Which of 1–6 are ${ev[0]}s?`], solution: [`${ev[1].join(", ")}: ${ev[1].length} outcomes`, `{${ev[1].length}/6}${f.d !== 6 ? ` = {${f.n}/${f.d}}` : ""}`] }); }),
  ],
  [S(12, 4)]: [
    C(12, 4, "not-happening", (rng) => { const p = clean(rng.int(1, 99) / 100); return N(`The probability that it rains tomorrow is ${fmt(p)}. What is the probability that it does NOT rain?`, clean(1 - p), ["The probabilities of an event and its opposite add to 1.", `1 − ${fmt(p)}.`], [`1 − ${fmt(p)} = ${fmt(clean(1 - p))}`]); }),
    E(12, 4, "missing-probability", (rng) => { const a = clean(rng.int(5, 45) / 100), b = clean(rng.int(5, 45) / 100); return N(`A spinner lands on red, blue or green. P(red) = ${fmt(a)} and P(blue) = ${fmt(b)}. Find P(green).`, clean(1 - a - b), ["All the probabilities add up to 1.", `1 − ${fmt(a)} − ${fmt(b)}.`], [`1 − ${fmt(clean(a + b))} = ${fmt(clean(1 - a - b))}`]); }),
  ],
  [S(12, 5)]: [
    C(12, 5, "menu-outcomes", (rng) => { const a = rng.int(2, 6), b = rng.int(2, 7); return N(`A café has ${a} starters and ${b} main courses. How many different two-course meals (one starter and one main) are possible?`, a * b, ["For each starter, there are " + b + " mains.", `${a} × ${b}.`], [`${a} × ${b} = ${a * b}`], { traps: [T(a + b, "Each starter can go with every main: multiply.")] }); }),
    E(12, 5, "spinner-total", (rng) => { const n = rng.int(3, 5), t = rng.int(3, 2 * n - 1); let c = 0; for (let x = 1; x <= n; x++) for (let y = 1; y <= n; y++) if (x + y === t) c++; return N(`Two spinners are each numbered 1 to ${n}. Both are spun and the scores are added. How many of the outcomes give a total of ${t}?`, c, ["List the pairs systematically: (1, ?), (2, ?)…", `Find all pairs that add to ${t}.`], [`Pairs: ${Array.from({ length: n }, (_, i) => i + 1).filter((x) => t - x >= 1 && t - x <= n).map((x) => `(${x}, ${t - x})`).join(", ")}`, `${c} outcomes`]); }),
  ],
};

export const Y7B_GENERATORS = { ...U2, ...U3, ...U4, ...U5, ...U6, ...U7, ...U8, ...U9, ...U10, ...U11, ...U12 };
