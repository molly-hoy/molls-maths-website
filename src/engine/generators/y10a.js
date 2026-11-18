/* ==========================================================================
   Year 10 generators, Units 1–4
   (Number skills · Percentages · Algebraic manipulation · Quadratics)
   Two per lesson: core (Level 1) and extend (Level 2).
   Every validate() re-checks the answer by a different calculation.
   ========================================================================== */
import { clean, fmt, gcd, round, simplify } from "../numbers.js";
import { core, expr, extend, frac, lin, linExpr, mc3, multi, num, plot, polyExpr, polyMul, polyText, sgn, T } from "./helpers.js";

const S = (u, l) => `y10-u${u}-l${l}`;
const isSquare = (n) => Number.isInteger(Math.sqrt(n));
const SQUARE_FREE = [2, 3, 5, 6, 7, 10, 11];

/* =============================== UNIT 1: Number skills =============================== */
const U1 = {
  [S(1, 1)]: [
    core(S(1, 1), "frac-to-percent", "Fraction to percentage", (rng) => {
      const d = rng.pick([4, 5, 8, 20, 25, 40, 50]);
      let n = rng.int(1, d - 1);
      while (gcd(n, d) !== 1) n = rng.int(1, d - 1);
      const value = clean((n / d) * 100);
      return { ...num(`Write {${n}/${d}} as a percentage.`, value, {
        answerText: `${fmt(value)}%`,
        traps: [T(n, "Percent means “out of 100”, so the numerator alone isn't the answer. Divide, then multiply by 100."), T(clean(n / d), "That's the decimal. Multiply by 100 to get the percentage.")],
        hints: [`Divide ${n} by ${d} to get a decimal.`, `Then multiply by 100: ${fmt(n / d)} × 100.`],
        solution: [`${n} ÷ ${d} = ${fmt(n / d)}`, `${fmt(n / d)} × 100 = ${fmt(value)}%`], data: { n, d } }), type: "percentage" };
    }, (q) => Math.abs(q.answer.value - (q.data.n * 100) / q.data.d) < 1e-9),
  ],
};
U1[S(1, 1)].push(extend(S(1, 1), "largest-fdp", "Comparing fractions, decimals and percentages", (rng) => {
  // Three different values in different forms; which is largest?
  const pool = [[1, 4], [3, 8], [2, 5], [3, 5], [5, 8], [7, 10], [3, 4], [9, 20], [11, 25]];
  const [a, b, c] = rng.shuffle(pool).slice(0, 3);
  const vals = [a[0] / a[1], b[0] / b[1], c[0] / c[1]];
  const labels = [`{${a[0]}/${a[1]}}`, fmt(clean(vals[1])), `${fmt(clean(vals[2] * 100))}%`];
  const best = vals.indexOf(Math.max(...vals));
  return mc3(rng, `Which of these is the largest?`, labels[best], labels.filter((_, i) => i !== best).map((l) => [l, "Convert all three to the same form (e.g. percentages) before comparing."]), {
    hints: ["Convert each one to a percentage.", `{${a[0]}/${a[1]}} = ${fmt(clean(vals[0] * 100))}%, ${labels[1]} = ${fmt(clean(vals[1] * 100))}%.`],
    solution: [`As percentages: ${vals.map((v) => fmt(clean(v * 100)) + "%").join(", ")}.`, `The largest is ${labels[best]}.`], data: { vals },
  });
}, (q) => new Set(q.data.vals).size === 3));

U1[S(1, 2)] = [
  core(S(1, 2), "terminate-or-recur", "Terminating or recurring?", (rng) => {
    const d = rng.pick([3, 6, 7, 8, 9, 11, 12, 15, 16, 20, 25, 40]);
    let n = rng.int(1, d - 1);
    while (gcd(n, d) !== 1) n = rng.int(1, d - 1);
    let m = d; while (m % 2 === 0) m /= 2; while (m % 5 === 0) m /= 5;
    const terminates = m === 1;
    return mc3(rng, `Does {${n}/${d}} give a terminating or a recurring decimal?`, terminates ? "Terminating" : "Recurring",
      [[terminates ? "Recurring" : "Terminating", `Look at the prime factors of ${d}: a fraction in its simplest form terminates only if the denominator's prime factors are 2s and 5s.`], ["It's a whole number", `${n} isn't a multiple of ${d}, so it isn't a whole number.`]], {
        hints: ["The fraction is already in its simplest form.", `Write ${d} as a product of prime factors. Are there any primes other than 2 and 5?`],
        solution: [`${d} = ${primeFactors(d).join(" × ")}`, terminates ? "Only 2s and 5s, so the decimal terminates." : "It has a prime factor other than 2 or 5, so the decimal recurs.", `{${n}/${d}} = ${fmt(round(n / d, 6))}${terminates ? "" : "…"}`], data: { n, d, terminates },
      });
  }, (q) => {
    const s = String(q.data.n / q.data.d);
    return (s.split(".")[1]?.length ?? 0) < 10 === q.data.terminates;
  }),
  extend(S(1, 2), "single-recurring", "One recurring digit as a fraction", (rng) => {
    const dgt = rng.int(1, 8);
    const f = simplify({ n: dgt, d: 9 });
    return frac(`Write 0.${String(dgt).repeat(4)}… (the ${dgt} recurs) as a fraction in its simplest form.`, f.n, f.d, {
      traps: [T(dgt / 10, "0.1 would be one tenth, but the digit carries on forever. A single recurring digit is that digit over 9.")],
      hints: ["Let x = the decimal. Then 10x moves the digits one place left.", `10x − x = ${dgt}, so 9x = ${dgt}.`],
      solution: [`x = 0.${dgt}${dgt}${dgt}…`, `10x = ${dgt}.${dgt}${dgt}${dgt}…`, `10x − x = 9x = ${dgt}, so x = {${dgt}/9}${f.d !== 9 ? ` = {${f.n}/${f.d}}` : ""}`], data: { dgt },
    });
  }, (q) => Math.abs(q.answer.n / q.answer.d - q.data.dgt / 9) < 1e-12),
];

function primeFactors(n) {
  const out = []; let m = n;
  for (let p = 2; m > 1; p++) while (m % p === 0) { out.push(p); m /= p; }
  return out;
}

U1[S(1, 3)] = [
  core(S(1, 3), "two-digit-recurring", "Two recurring digits", (rng) => {
    let ab = rng.int(10, 98);
    while (ab % 11 === 0) ab = rng.int(10, 98);
    const f = simplify({ n: ab, d: 99 });
    const s = String(ab).padStart(2, "0");
    return frac(`Write 0.${s}${s}${s}… (the digits ${s} recur) as a fraction in its simplest form.`, f.n, f.d, {
      hints: ["Two digits recur, so multiply by 100.", `100x − x = 99x = ${ab}.`],
      solution: [`x = 0.${s}${s}…, 100x = ${s}.${s}${s}…`, `99x = ${ab}`, `x = {${ab}/99}${f.d !== 99 ? ` = {${f.n}/${f.d}}` : ""}`], data: { ab },
    });
  }, (q) => Math.abs(q.answer.n / q.answer.d - q.data.ab / 99) < 1e-12),
  extend(S(1, 3), "mixed-recurring", "A recurring digit after a non-recurring one", (rng) => {
    const a = rng.int(1, 8);
    let b = rng.int(1, 9);
    if (b === a) b = (b % 9) + 1;
    const f = simplify({ n: 9 * a + b, d: 90 });
    return frac(`Write 0.${a}${b}${b}${b}… (only the ${b} recurs) as a fraction in its simplest form.`, f.n, f.d, {
      hints: ["Let x = the decimal. Find 10x and 100x, so the recurring parts line up.", `100x = ${a}${b}.${b}${b}… and 10x = ${a}.${b}${b}…`],
      solution: [`100x − 10x = ${a}${b} − ${a}`, `90x = ${10 * a + b - a}`, `x = {${10 * a + b - a}/90}${f.d !== 90 ? ` = {${f.n}/${f.d}}` : ""}`], data: { a, b },
    });
  }, (q) => Math.abs(q.answer.n / q.answer.d - (q.data.a / 10 + q.data.b / 90)) < 1e-12),
];

U1[S(1, 4)] = [
  core(S(1, 4), "simplify-surd", "Simplifying a surd", (rng) => {
    const m = rng.pick(SQUARE_FREE), k = rng.int(2, 6);
    const n = k * k * m;
    return multi(`Write √${n} in the form a√b, where a and b are whole numbers and b is as small as possible.`, [["a =", k], ["b =", m]], {
      answerText: `${k}√${m}`,
      hints: [`Find the largest square number that divides into ${n}.`, `${n} = ${k * k} × ${m}, and √${k * k} = ${k}.`],
      solution: [`${n} = ${k * k} × ${m}`, `√${n} = √${k * k} × √${m} = ${k}√${m}`], data: { n, k, m },
    });
  }, (q) => q.data.k ** 2 * q.data.m === q.data.n),
  extend(S(1, 4), "add-surds", "Adding surds", (rng) => {
    const m = rng.pick([2, 3, 5, 7]), p = rng.int(2, 5);
    let r = rng.int(1, 6);
    if (r === p) r += 1;
    const minus = rng.chance(0.35) && p > r;
    const a = minus ? p - r : p + r;
    const A = p * p * m, B = r * r * m;
    return multi(`Simplify √${A} ${minus ? "−" : "+"} √${B}. Give your answer in the form a√b.`, [["a =", a], ["b =", m]], {
      answerText: `${a}√${m}`,
      hints: ["Simplify each surd first so they have the same number under the root.", `√${A} = ${p}√${m} and √${B} = ${r === 1 ? "" : r}√${m}.`],
      solution: [`√${A} = ${p}√${m}`, `√${B} = ${r === 1 ? "" : r}√${m}`, `${p}√${m} ${minus ? "−" : "+"} ${r === 1 ? "" : r}√${m} = ${a}√${m}`], data: { A, B, a, m, minus },
    });
  }, (q) => Math.abs((q.data.minus ? Math.sqrt(q.data.A) - Math.sqrt(q.data.B) : Math.sqrt(q.data.A) + Math.sqrt(q.data.B)) - q.data.a * Math.sqrt(q.data.m)) < 1e-9),
];

U1[S(1, 5)] = [
  core(S(1, 5), "multiply-surds", "Multiplying surds", (rng) => {
    const m = rng.pick([2, 3, 5, 6, 7]), p = rng.int(1, 4), q2 = rng.int(1, 3);
    const a = m * p * p, b = m * q2 * q2;
    if (a === b && rng.chance(0.5)) return null;
    const value = m * p * q2;
    return num(`Work out √${a} × √${b}.`, value, {
      traps: [T(a * b, "√a × √b = √(ab). You still need the square root of the product.")],
      hints: ["√a × √b = √(a × b).", `√${a} × √${b} = √${a * b}.`],
      solution: [`√${a} × √${b} = √${a * b}`, `√${a * b} = ${value}`], data: { a, b },
    });
  }, (q) => Math.abs(Math.sqrt(q.data.a * q.data.b) - q.answer.value) < 1e-9),
  extend(S(1, 5), "difference-of-surds", "Expanding brackets with surds", (rng) => {
    const a = rng.int(2, 9);
    let b = rng.int(2, 20);
    while (isSquare(b)) b += 1;
    const value = a * a - b;
    return num(`Expand and simplify (${a} + √${b})(${a} − √${b}).`, value, {
      traps: [T(a * a + b, `√${b} × −√${b} = −${b}, so subtract.`), T(a * a, `The middle terms cancel, but the last term −${b} doesn't.`)],
      hints: ["Multiply every term in the first bracket by every term in the second.", `The middle terms ${a}√${b} and −${a}√${b} cancel.`],
      solution: [`= ${a * a} − ${a}√${b} + ${a}√${b} − ${b}`, `= ${a * a} − ${b} = ${fmt(value)}`], data: { a, b },
    });
  }, (q) => Math.abs((q.data.a + Math.sqrt(q.data.b)) * (q.data.a - Math.sqrt(q.data.b)) - q.answer.value) < 1e-9),
];

U1[S(1, 6)] = [
  core(S(1, 6), "rationalise", "Rationalising a denominator", (rng) => {
    const m = rng.pick([2, 3, 5, 6, 7]), k = rng.int(2, 6);
    const top = k * m;
    return num(`Write {${top}/√${m}} in the form k√${m}. What is k?`, k, {
      traps: [T(top, `Multiply top and bottom by √${m}: the denominator becomes ${m}, so divide ${top} by ${m}.`)],
      hints: [`Multiply the top and bottom by √${m}.`, `{${top}/√${m}} = ${top}√${m} ÷ ${m}.`],
      solution: [`{${top}/√${m}} × {√${m}/√${m}} = ${top}√${m} ÷ ${m}`, `= ${k}√${m}, so k = ${k}`], data: { top, m },
    });
  }, (q) => Math.abs(q.data.top / Math.sqrt(q.data.m) - q.answer.value * Math.sqrt(q.data.m)) < 1e-9),
  extend(S(1, 6), "rationalise-coefficient", "Rationalising with a number in front", (rng) => {
    const m = rng.pick([2, 3, 5, 7]), c = rng.int(2, 4), k = rng.int(1, 5);
    const top = k * c * m;
    return num(`Write ${top} ÷ (${c}√${m}) in the form k√${m}. What is k?`, k, {
      traps: [T(top / c, `After multiplying by √${m}, the denominator is ${c} × ${m} = ${c * m}, not ${c}.`)],
      hints: [`Multiply top and bottom by √${m}. The denominator becomes ${c} × ${m}.`, `${top}√${m} ÷ ${c * m}.`],
      solution: [`${top} ÷ (${c}√${m}) = ${top}√${m} ÷ (${c} × ${m})`, `= ${top}√${m} ÷ ${c * m} = ${k === 1 ? "" : k}√${m}`, `k = ${k}`], data: { top, c, m },
    });
  }, (q) => Math.abs(q.data.top / (q.data.c * Math.sqrt(q.data.m)) - q.answer.value * Math.sqrt(q.data.m)) < 1e-9),
];

U1[S(1, 7)] = [
  core(S(1, 7), "unit-fraction-index", "Fractional indices: roots", (rng) => {
    const n = rng.pick([2, 2, 3]);
    const r = n === 2 ? rng.int(2, 15) : rng.int(2, 6);
    const base = r ** n;
    return num(`Evaluate ${base}^(1/${n}).`, r, {
      traps: [T(base / n, `A power of 1/${n} means the ${n === 2 ? "square" : "cube"} root, not dividing by ${n}.`)],
      hints: [`x^(1/${n}) means the ${n === 2 ? "square root" : "cube root"} of x.`, `Which number ${n === 2 ? "squared" : "cubed"} gives ${base}?`],
      solution: [`${base}^(1/${n}) = ${n === 2 ? "√" : "∛"}${base} = ${r}`], data: { base, n },
    });
  }, (q) => Math.abs(q.data.base ** (1 / q.data.n) - q.answer.value) < 1e-9),
  extend(S(1, 7), "general-fractional-index", "Fractional and negative indices", (rng) => {
    const n = rng.pick([2, 3]);
    const r = n === 2 ? rng.int(2, 6) : rng.int(2, 4);
    const p = rng.pick([2, 3].filter((x) => x !== n || n === 3));
    const negative = rng.chance(0.5);
    const base = r ** n;
    const pos = r ** p;
    const value = negative ? 1 / pos : pos;
    return num(`Evaluate ${base}^(${negative ? "−" : ""}${p}/${n}). (You can give a fraction, like 1/8.)`, clean(value), {
      answerText: negative ? `1/${pos}` : String(pos),
      traps: [T(negative ? -pos : clean(1 / pos), negative ? "A negative power means “one over”, not a negative number." : "Check the sign of the power.")],
      hints: [`Do the root first: ${n === 2 ? "√" : "∛"}${base} = ${r}.`, `Then raise to the power ${p}${negative ? ", and a negative power means 1 over the answer" : ""}.`],
      solution: [`${n === 2 ? "√" : "∛"}${base} = ${r}`, `${r}^${p} = ${pos}`, ...(negative ? [`Negative power: 1/${pos}`] : [])], data: { base, n, p, negative },
    });
  }, (q) => Math.abs(q.data.base ** ((q.data.negative ? -1 : 1) * q.data.p / q.data.n) - q.answer.value) < 1e-9),
];

/* =============================== UNIT 2: Percentages =============================== */
const U2 = {
  [S(2, 1)]: [
    core(S(2, 1), "find-multiplier", "Finding a multiplier", (rng) => {
      const p = rng.pick([3, 5, 8, 12, 15, 17.5, 20, 35, 2.5, 7]);
      const up = rng.chance(0.5);
      const value = clean(1 + (up ? p : -p) / 100);
      return num(`What single number do you multiply by to ${up ? "increase" : "decrease"} an amount by ${p}%?`, value, {
        traps: [T(clean(p / 100), "That finds the percentage itself. Add it to (or take it from) 1 for the whole new amount."), T(clean(1 + (up ? -p : p) / 100), up ? "An increase needs a multiplier greater than 1." : "A decrease needs a multiplier less than 1.")],
        hints: ["The original amount is 100%, which is 1 as a decimal.", `${up ? "Add" : "Subtract"} ${p}%: 100% ${up ? "+" : "−"} ${p}% = ${fmt(clean(100 + (up ? p : -p)))}%.`],
        solution: [`100% ${up ? "+" : "−"} ${p}% = ${fmt(clean(100 + (up ? p : -p)))}%`, `As a decimal: ${fmt(value)}`], data: { p, up },
      });
    }, (q) => Math.abs(q.answer.value * 100 - (100 + (q.data.up ? q.data.p : -q.data.p))) < 1e-9),
    extend(S(2, 1), "use-multiplier", "Using a multiplier", (rng) => {
      const amount = rng.int(40, 900) + rng.pick([0, 0.5, 0.99, 0.25]);
      const p = rng.pick([4, 6, 12, 15, 18, 22, 7.5, 2.5]);
      const up = rng.chance(0.5);
      const m = clean(1 + (up ? p : -p) / 100);
      const value = round(amount * m, 2);
      return num(`${up ? "Increase" : "Decrease"} £${fmt(amount, 2)} by ${p}%. Give your answer to the nearest penny.`, value, {
        dp: 2, pre: "£",
        traps: [T(round(amount * p / 100, 2), "That's just the percentage. Use the multiplier to find the new amount directly."), T(round(amount * (2 - m), 2), up ? "This is a decrease. An increase needs a multiplier greater than 1." : "This is an increase. A decrease needs a multiplier less than 1.")],
        hints: [`The multiplier is ${fmt(m)}.`, `Work out ${fmt(amount, 2)} × ${fmt(m)}, then round to 2 decimal places.`],
        solution: [`Multiplier = ${fmt(m)}`, `${fmt(amount, 2)} × ${fmt(m)} = ${fmt(round(amount * m, 6))}`, `= £${fmt(value, 2)}`], data: { amount, p, up },
      });
    }, (q) => Math.abs(round(q.data.amount * (100 + (q.data.up ? q.data.p : -q.data.p)) / 100, 2) - q.answer.value) < 1e-9),
  ],
  [S(2, 2)]: [
    core(S(2, 2), "two-changes", "Two percentage changes", (rng) => {
      const start = rng.int(4, 40) * 25;
      const a = rng.pick([10, 20, 5, 15, 25]), b = rng.pick([10, 20, 5, 30]);
      const value = round(start * (1 + a / 100) * (1 - b / 100), 2);
      return num(`A painting is worth £${fmt(start)}. Its value increases by ${a}%, then decreases by ${b}%. What is it worth now?`, value, {
        pre: "£",
        traps: [T(start * (1 + (a - b) / 100), `You can't just combine ${a}% and ${b}%: the second change is a percentage of the new value.`)],
        hints: ["Use a multiplier for each change, one after the other.", `£${fmt(start)} × ${fmt(1 + a / 100)} × ${fmt(1 - b / 100)}.`],
        solution: [`After the increase: £${fmt(start)} × ${fmt(1 + a / 100)} = £${fmt(clean(start * (1 + a / 100)))}`, `After the decrease: × ${fmt(1 - b / 100)} = £${fmt(value)}`], data: { start, a, b },
      });
    }, (q) => Math.abs(q.data.start * (100 + q.data.a) * (100 - q.data.b) / 10000 - q.answer.value) < 1e-6),
    extend(S(2, 2), "overall-change", "Overall percentage change", (rng) => {
      const a = rng.pick([10, 20, 30, 40, 50]);
      const value = clean((a * a) / 100);
      return { ...num(`A price goes up by ${a}% and then down by ${a}%. What is the overall percentage decrease?`, value, {
        answerText: `${fmt(value)}%`,
        traps: [T(0, `The ${a}% decrease is taken from a larger amount, so it removes more than the increase added.`)],
        hints: [`Multiply the multipliers: ${fmt(1 + a / 100)} × ${fmt(1 - a / 100)}.`, "Compare the result with 1."],
        solution: [`${fmt(1 + a / 100)} × ${fmt(1 - a / 100)} = ${fmt(clean(1 - value / 100))}`, `1 − ${fmt(clean(1 - value / 100))} = ${fmt(clean(value / 100))}, a ${fmt(value)}% decrease`], data: { a } }), type: "percentage" };
    }, (q) => Math.abs((1 - (1 + q.data.a / 100) * (1 - q.data.a / 100)) * 100 - q.answer.value) < 1e-9),
  ],
  [S(2, 3)]: [
    core(S(2, 3), "simple-interest", "Simple interest", (rng) => {
      const P = rng.int(5, 60) * 100, r = rng.pick([2, 3, 4, 5, 2.5, 3.5]), n = rng.int(2, 6);
      const value = clean(P * r * n / 100);
      return num(`£${fmt(P)} is invested at ${r}% simple interest per year. How much interest is earned in ${n} years?`, value, {
        pre: "£",
        traps: [T(clean(P * r / 100), "That's the interest for one year. Simple interest is the same every year."), T(clean(P + value), "That's the total in the account. The question asks for the interest only.")],
        hints: [`Interest for one year = ${r}% of £${fmt(P)}.`, `Multiply by ${n} years.`],
        solution: [`One year: ${r}% of £${fmt(P)} = £${fmt(clean(P * r / 100))}`, `${n} years: £${fmt(clean(P * r / 100))} × ${n} = £${fmt(value)}`], data: { P, r, n },
      });
    }, (q) => Math.abs(q.data.P * q.data.r / 100 * q.data.n - q.answer.value) < 1e-9),
    extend(S(2, 3), "compound-interest", "Compound interest", (rng) => {
      const P = rng.int(5, 80) * 100, r = rng.pick([2, 3, 4, 5, 1.5, 2.5]), n = rng.int(2, 6);
      const value = round(P * (1 + r / 100) ** n, 2);
      return num(`£${fmt(P)} is invested at ${r}% compound interest per year. What is it worth after ${n} years? Give your answer to the nearest penny.`, value, {
        dp: 2, pre: "£",
        traps: [T(clean(P + P * r * n / 100), "That's simple interest. With compound interest, interest is added to the total each year.")],
        hints: [`The multiplier is ${fmt(1 + r / 100)}.`, `Work out ${fmt(P)} × ${fmt(1 + r / 100)}^${n}.`],
        solution: [`${fmt(P)} × ${fmt(1 + r / 100)}^${n} = ${fmt(round(P * (1 + r / 100) ** n, 5))}`, `= £${fmt(value, 2)}`], data: { P, r, n },
      });
    }, (q) => { let v = q.data.P; for (let i = 0; i < q.data.n; i++) v *= 1 + q.data.r / 100; return Math.abs(round(v, 2) - q.answer.value) < 1e-9; }),
  ],
  [S(2, 4)]: [
    core(S(2, 4), "reverse-increase", "Reverse percentage (increase)", (rng) => {
      const O = rng.int(3, 40) * 20, p = rng.pick([5, 10, 15, 20, 25, 40]);
      const after = clean(O * (1 + p / 100));
      return num(`After a ${p}% pay rise, Sam earns £${fmt(after)} a month. What did Sam earn before the rise?`, O, {
        pre: "£",
        traps: [T(clean(after * (1 - p / 100)), `Taking ${p}% off the new amount doesn't work: the ${p}% was of the ORIGINAL amount.`)],
        hints: [`£${fmt(after)} is ${100 + p}% of the original.`, `Divide by ${fmt(1 + p / 100)}.`],
        solution: [`£${fmt(after)} = ${100 + p}% of the original`, `Original = ${fmt(after)} ÷ ${fmt(1 + p / 100)} = £${fmt(O)}`], data: { after, p },
      });
    }, (q) => Math.abs(q.data.after / (1 + q.data.p / 100) - q.answer.value) < 1e-9),
    extend(S(2, 4), "reverse-decrease", "Reverse percentage (decrease)", (rng) => {
      const O = rng.int(3, 50) * 20, p = rng.pick([10, 15, 20, 25, 30, 35, 12.5]);
      const after = clean(O * (1 - p / 100));
      return num(`In a sale, prices are reduced by ${p}%. A coat costs £${fmt(after)} in the sale. What was its original price?`, O, {
        pre: "£",
        traps: [T(clean(after * (1 + p / 100)), `Adding ${p}% back doesn't work: the ${p}% was taken from the ORIGINAL price.`)],
        hints: [`£${fmt(after)} is ${fmt(100 - p)}% of the original price.`, `Divide by ${fmt(1 - p / 100)}.`],
        solution: [`£${fmt(after)} = ${fmt(100 - p)}% of the original`, `Original = ${fmt(after)} ÷ ${fmt(1 - p / 100)} = £${fmt(O)}`], data: { after, p },
      });
    }, (q) => Math.abs(q.data.after / (1 - q.data.p / 100) - q.answer.value) < 1e-9),
  ],
  [S(2, 5)]: [
    core(S(2, 5), "depreciation", "Depreciation", (rng) => {
      const V = rng.int(8, 30) * 1000, r = rng.pick([8, 10, 12, 15, 20]), n = rng.int(2, 5);
      const value = round(V * (1 - r / 100) ** n, 0);
      return num(`A car costs £${fmt(V)}. It loses ${r}% of its value each year. What is it worth after ${n} years, to the nearest pound?`, value, {
        pre: "£",
        traps: [T(clean(V * (1 - r * n / 100)), `The ${r}% is taken from the value at the start of EACH year, not from the original price every time.`)],
        hints: [`The multiplier is ${fmt(1 - r / 100)}.`, `Work out ${fmt(V)} × ${fmt(1 - r / 100)}^${n}.`],
        solution: [`${fmt(V)} × ${fmt(1 - r / 100)}^${n} = ${fmt(round(V * (1 - r / 100) ** n, 3))}`, `≈ £${fmt(value)}`], data: { V, r, n },
      });
    }, (q) => { let v = q.data.V; for (let i = 0; i < q.data.n; i++) v *= 1 - q.data.r / 100; return Math.abs(Math.round(v) - q.answer.value) < 1e-9; }),
    extend(S(2, 5), "years-to-halve", "How many years?", (rng) => {
      const V = rng.int(10, 40) * 1000, r = rng.pick([10, 12, 15, 18, 20, 25]);
      const target = V / 2;
      let years = 0, v = V;
      while (v >= target) { v *= 1 - r / 100; years++; }
      return num(`A machine is worth £${fmt(V)}. Its value falls by ${r}% each year. After how many complete years will it first be worth less than half its original value?`, years, {
        answerText: `${years} years`,
        traps: [T(Math.ceil(50 / r), `Halving by ${r}% each time isn't the same as subtracting ${r}% of the original. Work it out year by year.`)],
        hints: [`Half the value is £${fmt(target)}.`, `Multiply by ${fmt(1 - r / 100)} repeatedly until you go below £${fmt(target)}.`],
        solution: [`Multiplier ${fmt(1 - r / 100)}`, `After ${years - 1} years: £${fmt(round(V * (1 - r / 100) ** (years - 1), 2))} (not below half yet)`, `After ${years} years: £${fmt(round(V * (1 - r / 100) ** years, 2))} (below £${fmt(target)})`, `Answer: ${years} years`], data: { V, r },
      });
    }, (q) => (1 - q.data.r / 100) ** q.answer.value < 0.5 && (1 - q.data.r / 100) ** (q.answer.value - 1) >= 0.5),
  ],
};

/* =============================== UNIT 3: Algebraic manipulation =============================== */
const nz = (rng, a, b) => rng.nonZero(a, b);

const U3 = {
  [S(3, 1)]: [
    core(S(3, 1), "expand-double", "Expanding double brackets", (rng) => {
      const a = nz(rng, -9, 9), b = nz(rng, -9, 9);
      const c = polyMul([1, a], [1, b]);
      return expr(`Expand and simplify ${lin(1, a)}${lin(1, b)}.`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        traps: [{ expr: `x^2+(${a * b})`, feedback: "You've missed the two middle terms. Multiply every term by every term (try a grid)." }],
        hints: ["Multiply each term in the first bracket by each term in the second: four multiplications.", `x × x, x × ${fmt(b)}, ${fmt(a)} × x and ${fmt(a)} × ${fmt(b)}. Then collect the two x terms.`],
        solution: [`x² ${sgn(b)}x ${sgn(a)}x ${sgn(a * b)}`, `= ${polyText(c)}`], data: { c },
      });
    }, (q) => q.data.c[1] !== 0 || true),
    extend(S(3, 1), "expand-double-coefficients", "Expanding brackets with coefficients", (rng) => {
      const p = rng.int(2, 5), q2 = rng.int(1, 4), a = nz(rng, -7, 7), b = nz(rng, -7, 7);
      const c = polyMul([p, a], [q2, b]);
      return expr(`Expand and simplify ${lin(p, a)}${lin(q2, b)}.`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        hints: ["Use a grid: rows for one bracket, columns for the other.", `First terms: ${p}x × ${q2 === 1 ? "" : q2}x = ${p * q2}x².`],
        solution: [`${p * q2}x² ${sgn(p * b)}x ${sgn(a * q2)}x ${sgn(a * b)}`, `= ${polyText(c)}`], data: { c },
      });
    }, () => true),
  ],
  [S(3, 2)]: [
    core(S(3, 2), "expand-triple", "Expanding three brackets", (rng) => {
      const a = nz(rng, -5, 5), b = nz(rng, -5, 5), d = nz(rng, -5, 5);
      const c = polyMul(polyMul([1, a], [1, b]), [1, d]);
      return expr(`Expand and simplify ${lin(1, a)}${lin(1, b)}${lin(1, d)}.`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        hints: ["Expand two of the brackets first.", `${lin(1, a)}${lin(1, b)} = ${polyText(polyMul([1, a], [1, b]))}. Now multiply by ${lin(1, d)}.`],
        solution: [`${lin(1, a)}${lin(1, b)} = ${polyText(polyMul([1, a], [1, b]))}`, `Multiply each term by ${lin(1, d)} and collect like terms`, `= ${polyText(c)}`], data: {},
      });
    }, () => true),
    extend(S(3, 2), "expand-triple-coefficient", "Three brackets with a coefficient", (rng) => {
      const p = rng.int(2, 3), a = nz(rng, -5, 5), b = nz(rng, -4, 4), d = nz(rng, -4, 4);
      const c = polyMul(polyMul([p, a], [1, b]), [1, d]);
      return expr(`Expand and simplify ${lin(p, a)}${lin(1, b)}${lin(1, d)}.`, polyExpr(c), {
        flags: { expanded: true, simplified: true }, answerText: polyText(c),
        hints: ["Expand the last two brackets first.", `${lin(1, b)}${lin(1, d)} = ${polyText(polyMul([1, b], [1, d]))}.`],
        solution: [`${lin(1, b)}${lin(1, d)} = ${polyText(polyMul([1, b], [1, d]))}`, `Multiply by ${lin(p, a)} and collect like terms`, `= ${polyText(c)}`], data: {},
      });
    }, () => true),
  ],
  [S(3, 3)]: [
    core(S(3, 3), "factorise-prime-a", "Factorising ax² + bx + c", (rng) => {
      const a = rng.pick([2, 3, 5]);
      let p = nz(rng, -7, 7);
      while (gcd(a, Math.abs(p)) !== 1) p = nz(rng, -7, 7);
      const q2 = nz(rng, -6, 6);
      const c = polyMul([a, p], [1, q2]);
      if (c[1] === 0) return null;
      return expr(`Factorise ${polyText(c)}.`, `${linExpr(a, p)}*${linExpr(1, q2)}`, {
        flags: { factorised: true }, answerText: `${lin(a, p)}${lin(1, q2)}`,
        hints: [`One bracket starts with ${a}x and the other with x.`, `Find numbers that multiply to ${c[2]} and make the middle term ${c[1]}x. Check by expanding.`],
        solution: [`a × c = ${a} × ${c[2]} = ${a * c[2]}. Find two numbers that multiply to ${a * c[2]} and add to ${c[1]}: ${a * q2} and ${p}.`, `Split the middle term and factorise in pairs`, `= ${lin(a, p)}${lin(1, q2)}`], data: {},
      });
    }, () => true),
    extend(S(3, 3), "factorise-composite-a", "Factorising when a isn't prime", (rng) => {
      const [r, s] = rng.pick([[2, 3], [3, 2], [2, 2], [3, 4], [4, 3], [2, 5]]);
      let p = nz(rng, -5, 5), q2 = nz(rng, -5, 5);
      while (gcd(r, Math.abs(p)) !== 1) p = nz(rng, -5, 5);
      while (gcd(s, Math.abs(q2)) !== 1) q2 = nz(rng, -5, 5);
      const c = polyMul([r, p], [s, q2]);
      if (c[1] === 0) return null;
      return expr(`Factorise ${polyText(c)}.`, `${linExpr(r, p)}*${linExpr(s, q2)}`, {
        flags: { factorised: true }, answerText: `${lin(r, p)}${lin(s, q2)}`,
        hints: [`Multiply a × c: ${c[0]} × ${c[2]} = ${c[0] * c[2]}. Find two numbers that multiply to this and add to ${c[1]}.`, `The numbers are ${r * q2} and ${s * p}. Split the middle term and factorise in pairs.`],
        solution: [`${c[0]} × ${c[2]} = ${c[0] * c[2]}; ${r * q2} × ${s * p} = ${c[0] * c[2]} and ${r * q2} + ${s * p} = ${c[1]}`, `Split: ${c[0]}x² ${sgn(r * q2)}x ${sgn(s * p)}x ${sgn(c[2])}`, `= ${lin(r, p)}${lin(s, q2)}`], data: {},
      });
    }, () => true),
  ],
  [S(3, 4)]: [
    core(S(3, 4), "cancel-quadratic", "Simplifying an algebraic fraction", (rng) => {
      const a = nz(rng, -8, 8);
      let b = nz(rng, -8, 8);
      if (b === a) b = a + 1 || 2;
      const top = polyMul([1, a], [1, b]);
      return expr(`Simplify (${polyText(top)}) ÷ ${lin(1, a)}.`, `x+(${b})`, {
        flags: { noPowers: true }, answerText: `x ${sgn(b)}`,
        hints: ["Factorise the top.", `${polyText(top)} = ${lin(1, a)}${lin(1, b)}. Now cancel.`],
        solution: [`${polyText(top)} = ${lin(1, a)}${lin(1, b)}`, `Cancel ${lin(1, a)}: answer x ${sgn(b)}`], data: {},
      });
    }, () => true),
    extend(S(3, 4), "cancel-both", "Factorising top and bottom", (rng) => {
      const a = rng.int(1, 7);
      let b = nz(rng, -7, 7);
      while (b === a || b === -a) b = nz(rng, -7, 7);
      const top = [1, 0, -a * a];
      const bottom = polyMul([1, a], [1, b]);
      return expr(`Simplify (${polyText(top)}) ÷ (${polyText(bottom)}).`, `(x-${a})/(x+(${b}))`, {
        flags: { noPowers: true }, answerText: `(x − ${a}) ÷ (x ${sgn(b)})`,
        hints: [`The top is a difference of two squares: x² − ${a * a} = (x + ${a})(x − ${a}).`, `The bottom factorises to (x + ${a})${lin(1, b)}.`],
        solution: [`Top: (x + ${a})(x − ${a})`, `Bottom: (x + ${a})${lin(1, b)}`, `Cancel (x + ${a}): (x − ${a}) ÷ (x ${sgn(b)})`], data: {},
      });
    }, () => true),
  ],
  [S(3, 5)]: [
    core(S(3, 5), "add-x-over-numbers", "Adding algebraic fractions", (rng) => {
      let a = rng.int(2, 7), b = rng.int(2, 9);
      while (b === a) b = rng.int(2, 9);
      const minus = rng.chance(0.4);
      const top = minus ? b - a : a + b;
      const den = a * b;
      const g = gcd(Math.abs(top), den);
      return expr(`Write x/${a} ${minus ? "−" : "+"} x/${b} as a single fraction in its simplest form.`, `(${top / g})*x/${den / g}`, {
        flags: { singleFraction: true }, answerText: `${top / g === 1 ? "" : top / g === -1 ? "−" : top / g}x/${den / g}`,
        hints: [`Use a common denominator, such as ${den}.`, `x/${a} = ${b}x/${den} and x/${b} = ${a}x/${den}.`],
        solution: [`${b}x/${den} ${minus ? "−" : "+"} ${a}x/${den} = ${top}x/${den}`, ...(g > 1 ? [`Simplify: ${top / g}x/${den / g}`] : [])], data: {},
      });
    }, () => true),
    extend(S(3, 5), "add-reciprocals", "Fractions with algebraic denominators", (rng) => {
      const p = rng.int(1, 4), q2 = rng.int(1, 4), a = nz(rng, -6, 6);
      let b = nz(rng, -6, 6);
      if (b === a) b = a + 2;
      const topC = [p + q2, p * b + q2 * a];
      return expr(`Write ${p}/${lin(1, a)} + ${q2}/${lin(1, b)} as a single fraction.`, `(${polyExpr(topC)})/(${linExpr(1, a)}*${linExpr(1, b)})`, {
        flags: { singleFraction: true }, answerText: `(${polyText(topC)}) ÷ (${lin(1, a)}${lin(1, b)})`,
        hints: [`The common denominator is ${lin(1, a)}${lin(1, b)}.`, `Numerator: ${p}${lin(1, b)} + ${q2}${lin(1, a)}.`],
        solution: [`= [${p}${lin(1, b)} + ${q2}${lin(1, a)}] ÷ [${lin(1, a)}${lin(1, b)}]`, `Numerator = ${polyText(topC)}`, `Answer: (${polyText(topC)}) ÷ (${lin(1, a)}${lin(1, b)})`], data: {},
      });
    }, () => true),
  ],
  [S(3, 6)]: [
    core(S(3, 6), "always-property", "Spotting a proof", (rng) => {
      const kind = rng.pick(["even", "odd", "three"]);
      const k = rng.int(1, 5);
      const opts = {
        even: [`2n + ${2 * k}`, [[`n + ${2 * k}`, `If n is odd, n + ${2 * k} is odd.`], [`2n + ${2 * k - 1}`, "2n is even, and adding an odd number makes it odd."]]],
        odd: [`2n + ${2 * k - 1}`, [[`2n + ${2 * k}`, "2n is even and adding an even number keeps it even."], [`n + ${2 * k - 1}`, `If n is even, n + ${2 * k - 1} is odd, but if n is odd it's even, so it isn't ALWAYS odd.`]]],
        three: [`3n + ${3 * k}`, [[`3n + ${3 * k + 1}`, `3n is a multiple of 3, but adding ${3 * k + 1} isn't.`], [`n + ${3 * k}`, "This is only a multiple of 3 when n is."]]],
      }[kind];
      const what = { even: "always even", odd: "always odd", three: "always a multiple of 3" }[kind];
      return mc3(rng, `n is any whole number. Which expression is ${what}?`, opts[0], opts[1], {
        hints: ["Try factorising each expression.", kind === "three" ? "A multiple of 3 can be written as 3 × (a whole number)." : "An even number can be written as 2 × (a whole number); an odd number is one more than that."],
        solution: [kind === "even" ? `2n + ${2 * k} = 2(n + ${k}), which is 2 × a whole number, so always even.` : kind === "odd" ? `2n + ${2 * k - 1} = 2(n + ${k - 1}) + 1: one more than an even number, so always odd.` : `3n + ${3 * k} = 3(n + ${k}), so always a multiple of 3.`], data: {},
      });
    }, () => true),
    extend(S(3, 6), "difference-of-squares-proof", "Simplifying for a proof", (rng) => {
      const a = rng.int(1, 6);
      return expr(`Expand and simplify (n + ${a})² − (n − ${a})². (This proves the result is always a multiple of ${4 * a}.)`, `${4 * a}*n`, {
        flags: { simplified: true, expanded: true }, answerText: `${4 * a}n`,
        traps: [{ expr: "0", feedback: `(n + ${a})² isn't n² + ${a * a}: remember the middle term 2 × ${a} × n.` }],
        hints: [`(n + ${a})² = n² + ${2 * a}n + ${a * a}.`, `(n − ${a})² = n² − ${2 * a}n + ${a * a}. Subtract carefully (change every sign).`],
        solution: [`(n² + ${2 * a}n + ${a * a}) − (n² − ${2 * a}n + ${a * a})`, `= ${4 * a}n`, `${4 * a}n = ${4 * a} × n, so it is always a multiple of ${4 * a}.`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 4: Quadratics =============================== */
function distinctRoots(rng, lo = -9, hi = 9) {
  const r1 = nz(rng, lo, hi);
  let r2 = nz(rng, lo, hi);
  while (r2 === r1) r2 = nz(rng, lo, hi);
  return [Math.max(r1, r2), Math.min(r1, r2)];
}
const qform = (a, b, c) => { const D = b * b - 4 * a * c; return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]; };
const safe2dp = (x) => Math.abs((Math.abs(x) * 100) % 1 - 0.5) > 1e-6;

const U4 = {
  [S(4, 1)]: [
    core(S(4, 1), "solve-factorise", "Solving by factorising", (rng) => {
      const [r1, r2] = distinctRoots(rng);
      const c = [1, -(r1 + r2), r1 * r2];
      if (c[1] === 0) return null;
      return multi(`Solve ${polyText(c)} = 0.`, [["Larger solution: x =", r1, undefined, [T(-r1, "Check the signs: if a bracket is (x − 3), then x = 3.")]], ["Smaller solution: x =", r2, undefined, [T(-r2, "Check the signs: if a bracket is (x + 3), then x = −3.")]]], {
        answerText: `x = ${fmt(r1)} or x = ${fmt(r2)}`,
        hints: [`Find two numbers that multiply to ${fmt(c[2])} and add to ${fmt(c[1])}.`, `${polyText(c)} = ${lin(1, -r1)}${lin(1, -r2)} = 0. Set each bracket to 0.`],
        solution: [`${polyText(c)} = ${lin(1, -r1)}${lin(1, -r2)}`, `So x − ${fmt(r1)} = 0 or x − ${fmt(r2)} = 0`, `x = ${fmt(r1)} or x = ${fmt(r2)}`], data: { c },
      });
    }, (q) => q.steps.every((s) => { const x = s.answer.value, c = q.data.c; return Math.abs(c[0] * x * x + c[1] * x + c[2]) < 1e-9; })),
    extend(S(4, 1), "solve-factorise-a2", "Solving when a = 2", (rng) => {
      let p = rng.pick([-7, -5, -3, -1, 1, 3, 5, 7]);
      const q2 = nz(rng, -6, 6);
      const c = polyMul([2, -p], [1, -q2]);
      if (c[1] === 0) return null;
      const roots = [p / 2, q2].sort((x, y) => y - x);
      return multi(`Solve ${polyText(c)} = 0. (You may give answers as decimals or fractions.)`, [["Larger solution: x =", roots[0]], ["Smaller solution: x =", roots[1]]], {
        answerText: `x = ${fmt(roots[0])} or x = ${fmt(roots[1])}`,
        hints: [`Factorise: one bracket starts 2x, the other x.`, `${polyText(c)} = ${lin(2, -p)}${lin(1, -q2)}.`],
        solution: [`${polyText(c)} = ${lin(2, -p)}${lin(1, -q2)} = 0`, `2x ${sgn(-p)} = 0 gives x = ${fmt(p / 2)}`, `x ${sgn(-q2)} = 0 gives x = ${fmt(q2)}`], data: { c },
      });
    }, (q) => q.steps.every((s) => { const x = s.answer.value, c = q.data.c; return Math.abs(c[0] * x * x + c[1] * x + c[2]) < 1e-9; })),
  ],
  [S(4, 2)]: [
    core(S(4, 2), "match-graph", "Matching a quadratic graph", (rng) => {
      const h = nz(rng, -3, 3), v = nz(rng, -4, 3);
      const f = (x) => (x - h) ** 2 + v;
      const eq = (H, V) => `y = (x ${H < 0 ? "+" : "−"} ${Math.abs(H)})² ${V < 0 ? "−" : "+"} ${Math.abs(V)}`;
      return mc3(rng, "This is the graph of a quadratic. Which equation does it show?", eq(h, v), [[eq(-h, v), "Check the sign inside the bracket: y = (x − a)² has its lowest point at x = a."], [eq(h, -v), "Check the lowest point's y-coordinate."]], {
        diagram: { kind: "graph", x: [-6, 6], y: [-6, 10], xStep: 1, yStep: 2, curves: [{ points: plot(f, -6, 6) }], points: [{ x: h, y: v }], description: `U-shaped curve with its lowest point at (${h}, ${v}).` },
        hints: ["Find the turning point (the lowest point) of the curve.", "y = (x − a)² + b has its turning point at (a, b)."],
        solution: [`The turning point is at (${h}, ${v}).`, `So the equation is ${eq(h, v)}.`], data: { h, v },
      });
    }, (q) => q.data.h !== 0 && q.data.v !== 0),
    extend(S(4, 2), "table-of-values", "Table of values", (rng) => {
      const b = nz(rng, -5, 5), c = rng.int(-6, 6), x = rng.int(-4, -1);
      const value = x * x + b * x + c;
      return num(`Complete the table of values for y = ${polyText([1, b, c])}. What is y when x = ${x}?`, value, {
        traps: [T(-(x * x) + b * x + c, `(${x})² is positive: ${x} × ${x} = ${x * x}.`)],
        hints: [`Substitute x = ${x}. Put negative numbers in brackets.`, `(${x})² = ${x * x}.`],
        solution: [`y = (${x})² ${sgn(b)} × (${x}) ${sgn(c)}`, `= ${x * x} ${sgn(b * x)} ${sgn(c)} = ${fmt(value)}`], data: { b, c, x },
      });
    }, (q) => q.answer.value === q.data.x ** 2 + q.data.b * q.data.x + q.data.c),
  ],
  [S(4, 3)]: [
    core(S(4, 3), "roots-from-graph", "Roots from a graph", (rng) => {
      const [r1, r2] = distinctRoots(rng, -5, 5);
      const f = (x) => (x - r1) * (x - r2);
      const ymin = Math.min(-2, f((r1 + r2) / 2)) - 1;
      return mc3(rng, "The graph shows a quadratic curve. What are the roots of the equation y = 0?", `x = ${fmt(r2)} and x = ${fmt(r1)}`, [
        [`x = ${fmt(-r1)} and x = ${fmt(-r2)}`, "Read the x-values where the curve actually crosses the x-axis; check the signs."],
        [`x = 0 and y = ${fmt(r1 * r2)}`, `(0, ${fmt(r1 * r2)}) is where the curve crosses the y-axis, not the roots.`],
      ], {
        diagram: { kind: "graph", x: [-6, 6], y: [Math.max(-14, Math.floor(ymin / 2) * 2), 12], xStep: 1, yStep: 2, curves: [{ points: plot(f, -6, 6) }], description: `U-shaped curve crossing the x-axis at ${r2} and ${r1}.` },
        hints: ["The roots are where the curve crosses the x-axis (where y = 0).", "Read both x-values carefully."],
        solution: [`The curve crosses the x-axis at x = ${fmt(r2)} and x = ${fmt(r1)}.`], data: { r1, r2 },
      });
    }, (q) => q.data.r1 !== -q.data.r2 && q.data.r1 * q.data.r2 !== 0),
    extend(S(4, 3), "turning-point", "Finding the turning point", (rng) => {
      const h = nz(rng, -6, 6), k = rng.int(-9, 9);
      const c = [1, -2 * h, h * h + k];
      return multi(`Find the coordinates of the turning point of y = ${polyText(c)}.`, [["x =", h], ["y =", k]], {
        answerText: `(${fmt(h)}, ${fmt(k)})`,
        hints: [`The turning point of y = x² + bx + c is at x = −b ÷ 2.`, `x = ${fmt(-c[1])} ÷ 2 = ${fmt(h)}. Substitute to find y.`],
        solution: [`x = −(${fmt(c[1])}) ÷ 2 = ${fmt(h)}`, `y = (${fmt(h)})² ${sgn(c[1])} × ${fmt(h)} ${sgn(c[2])} = ${fmt(k)}`, `Turning point (${fmt(h)}, ${fmt(k)})`], data: { c },
      });
    }, (q) => { const [h, k] = q.steps.map((s) => s.answer.value); const c = q.data.c; return Math.abs(c[0] * h * h + c[1] * h + c[2] - k) < 1e-9; }),
  ],
  [S(4, 4)]: [
    core(S(4, 4), "quadratic-formula", "Using the quadratic formula", (rng) => {
      const b = nz(rng, -9, 9), c = rng.int(-9, 9);
      const D = b * b - 4 * c;
      if (D <= 0 || isSquare(D)) return null;
      const [x1, x2] = qform(1, b, c);
      if (!safe2dp(x1) || !safe2dp(x2)) return null;
      return multi(`Solve ${polyText([1, b, c])} = 0. Give your answers to 2 decimal places.`, [["Larger solution: x =", round(x1, 2), 2], ["Smaller solution: x =", round(x2, 2), 2]], {
        hints: ["x = (−b ± √(b² − 4ac)) ÷ 2a, with a = 1, b = " + b + ", c = " + c + ".", `b² − 4ac = ${b * b} − ${4 * c} = ${D}.`],
        solution: [`x = (${fmt(-b)} ± √${D}) ÷ 2`, `x = ${fmt(round(x1, 4))}… or ${fmt(round(x2, 4))}…`, `x = ${fmt(round(x1, 2), 2)} or x = ${fmt(round(x2, 2), 2)}`], data: { b, c },
      });
    }, (q) => { const [x1, x2] = qform(1, q.data.b, q.data.c); return Math.abs(round(x1, 2) - q.steps[0].answer.value) < 1e-9 && Math.abs(round(x2, 2) - q.steps[1].answer.value) < 1e-9; }),
    extend(S(4, 4), "number-of-solutions", "How many solutions?", (rng) => {
      const kind = rng.pick([0, 1, 2]);
      let a = rng.int(1, 4), b, c;
      if (kind === 1) { const r = nz(rng, -4, 4); b = -2 * a * r; c = a * r * r; }
      else { b = nz(rng, -8, 8); c = kind === 2 ? -rng.int(1, 9) : Math.floor((b * b) / (4 * a)) + rng.int(1, 6); }
      const D = b * b - 4 * a * c;
      const n = D > 0 ? 2 : D === 0 ? 1 : 0;
      const label = (k) => (k === 0 ? "No real solutions" : k === 1 ? "Exactly one solution" : "Two different solutions");
      return mc3(rng, `How many real solutions does ${polyText([a, b, c])} = 0 have?`, label(n), [0, 1, 2].filter((k) => k !== n).map((k) => [label(k), `Work out the discriminant b² − 4ac and check whether it is positive, zero or negative.`]), {
        hints: ["Work out the discriminant: b² − 4ac.", "Positive: two solutions. Zero: one. Negative: none."],
        solution: [`b² − 4ac = ${b * b} − ${4 * a * c} = ${D}`, `${D > 0 ? "Positive" : D === 0 ? "Zero" : "Negative"}, so: ${label(n).toLowerCase()}.`], data: { a, b, c, n },
      });
    }, (q) => { const D = q.data.b ** 2 - 4 * q.data.a * q.data.c; return (D > 0 ? 2 : D === 0 ? 1 : 0) === q.data.n; }),
  ],
  [S(4, 5)]: [
    core(S(4, 5), "complete-square-even", "Completing the square", (rng) => {
      const p = nz(rng, -6, 6), c = rng.int(-10, 12);
      const b = 2 * p, qv = c - p * p;
      return multi(`Write ${polyText([1, b, c])} in the form (x + p)² + q.`, [["p =", p, undefined, [T(b, `p is HALF of the x coefficient: ${b} ÷ 2.`)]], ["q =", qv, undefined, [T(c + p * p, `Expanding (x ${sgn(p)})² gives an extra ${p * p}, so subtract it: q = ${c} − ${p * p}.`)]]], {
        answerText: `(x ${sgn(p)})² ${sgn(qv)}`,
        hints: [`Halve the x coefficient: p = ${b} ÷ 2 = ${p}.`, `(x ${sgn(p)})² = x² ${sgn(b)}x + ${p * p}, so subtract ${p * p}.`],
        solution: [`p = ${b} ÷ 2 = ${p}`, `(x ${sgn(p)})² = ${polyText([1, b, p * p])}`, `q = ${c} − ${p * p} = ${qv}`, `(x ${sgn(p)})² ${sgn(qv)}`], data: { b, c },
      });
    }, (q) => { const [p, qq] = q.steps.map((s) => s.answer.value); return 2 * p === q.data.b && p * p + qq === q.data.c; }),
    extend(S(4, 5), "complete-square-odd", "Completing the square (odd b)", (rng) => {
      const b = rng.pick([-9, -7, -5, -3, -1, 1, 3, 5, 7, 9]), c = rng.int(-6, 8);
      const p = b / 2, qv = c - (b * b) / 4;
      return multi(`Write ${polyText([1, b, c])} in the form (x + p)² + q. (Decimals or fractions are fine.)`, [["p =", p], ["q =", qv]], {
        answerText: `(x ${sgn(p)})² ${sgn(qv)}`,
        hints: [`p = ${b} ÷ 2 = ${fmt(p)}.`, `p² = ${fmt(p * p)}. Then q = ${c} − ${fmt(p * p)}.`],
        solution: [`p = ${fmt(p)}`, `q = ${c} − ${fmt(p * p)} = ${fmt(qv)}`, `(x ${sgn(p)})² ${sgn(qv)}`], data: { b, c },
      });
    }, (q) => { const [p, qq] = q.steps.map((s) => s.answer.value); return Math.abs(2 * p - q.data.b) < 1e-9 && Math.abs(p * p + qq - q.data.c) < 1e-9; }),
  ],
  [S(4, 6)]: [
    core(S(4, 6), "solve-by-completing", "Solving by completing the square", (rng) => {
      const p = nz(rng, -5, 5), c = rng.int(-10, 8);
      const r = p * p - c;
      if (r <= 0 || isSquare(r)) return null;
      const x1 = -p + Math.sqrt(r), x2 = -p - Math.sqrt(r);
      if (!safe2dp(x1) || !safe2dp(x2)) return null;
      return multi(`Solve ${polyText([1, 2 * p, c])} = 0 by completing the square. Give your answers to 2 decimal places.`, [["Larger solution: x =", round(x1, 2), 2], ["Smaller solution: x =", round(x2, 2), 2]], {
        hints: [`${polyText([1, 2 * p, c])} = (x ${sgn(p)})² ${sgn(c - p * p)}.`, `So (x ${sgn(p)})² = ${r}, and x ${sgn(p)} = ±√${r}.`],
        solution: [`(x ${sgn(p)})² ${sgn(c - p * p)} = 0`, `(x ${sgn(p)})² = ${r}`, `x = ${fmt(-p)} ± √${r}`, `x = ${fmt(round(x1, 2), 2)} or x = ${fmt(round(x2, 2), 2)}`], data: { p, c },
      });
    }, (q) => q.steps.every((s) => Math.abs(s.answer.value ** 2 + 2 * q.data.p * s.answer.value + q.data.c) < 0.1)),
    extend(S(4, 6), "surd-form-solutions", "Exact solutions in surd form", (rng) => {
      const p = nz(rng, -6, 6), c = rng.int(-10, 8);
      const r = p * p - c;
      if (r <= 1 || isSquare(r)) return null;
      return multi(`Solve ${polyText([1, 2 * p, c])} = 0, giving your answers in the form a ± √b.`, [["a =", -p, undefined, [T(p, `If (x ${sgn(p)})² = ${r}, then x = ${fmt(-p)} ± √${r}: the sign of p changes.`)]], ["b =", r]], {
        answerText: `x = ${fmt(-p)} ± √${r}`,
        hints: [`Complete the square: (x ${sgn(p)})² ${sgn(c - p * p)} = 0.`, `(x ${sgn(p)})² = ${r}.`],
        solution: [`(x ${sgn(p)})² = ${p * p} − (${c}) = ${r}`, `x ${sgn(p)} = ±√${r}`, `x = ${fmt(-p)} ± √${r}`], data: { p, c },
      });
    }, (q) => { const [a, b] = q.steps.map((s) => s.answer.value); const x = a + Math.sqrt(b); return Math.abs(x * x + 2 * q.data.p * x + q.data.c) < 1e-9; }),
  ],
};

export const Y10A_GENERATORS = { ...U1, ...U2, ...U3, ...U4 };
