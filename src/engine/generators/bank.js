/* ==========================================================================
   Skills practice bank
   --------------------------------------------------------------------------
   Extra generators for skills from LATER units. Their full lessons are not
   written yet, but practice is available now, and these generators show
   every answer type the engine supports:
     fraction · percentage · algebraic expression · equation · decimal
     places · matching · multi-step
   Each is linked (skill) to the planned lesson it belongs to, so practice
   here already counts as evidence for that lesson.
   ========================================================================== */
import { clean, fmt, gcd, round } from "../numbers.js";

const gen = (skill, level, name, title, make, validate) => ({ id: `bank/${name}`, skill, level, title, make, validate });

export const BANK_GENERATORS = [
  gen("y7-u5-l3", 2, "simplify-fraction", "Simplifying fractions", (rng) => {
    const d0 = rng.int(2, 12), n0 = rng.int(1, d0 - 1);
    const g = gcd(n0, d0);
    const n1 = n0 / g, d1 = d0 / g;
    const k = rng.int(2, 9);
    const n = n1 * k, d = d1 * k;
    return {
      type: "fraction",
      prompt: `Write {${n}/${d}} in its simplest form.`,
      answer: { n: n1, d: d1, simplest: true },
      answerText: `${n1}/${d1}`,
      data: { n, d },
      hints: ["Find a number that divides into both the numerator (top) and denominator (bottom).", `The highest common factor of ${n} and ${d} is ${gcd(n, d)}.`, `Divide the top and bottom by ${gcd(n, d)}.`],
      solution: [`HCF of ${n} and ${d} is ${gcd(n, d)}.`, `${n} ÷ ${gcd(n, d)} = ${n1} and ${d} ÷ ${gcd(n, d)} = ${d1}.`, `{${n}/${d}} = {${n1}/${d1}}`],
    };
  }, (q) => q.answer.n * q.data.d === q.answer.d * q.data.n && gcd(q.answer.n, q.answer.d) === 1 && q.answer.d > 1),

  gen("y7-u6-l6", 2, "percent-of-amount", "Percentage of an amount (non-calculator)", (rng) => {
    const p = rng.pick([10, 20, 25, 30, 40, 50, 60, 75, 5, 15, 35]);
    const amount = rng.int(2, 40) * 20;
    const value = (p * amount) / 100;
    const tenPercent = amount / 10;
    return {
      type: "numeric",
      prompt: `Work out ${p}% of £${fmt(amount)} without a calculator.`,
      answer: { value },
      answerText: `£${fmt(value)}`,
      data: { p, amount },
      traps: [{ value: amount - value, feedback: `That's what is left after taking ${p}% away. The question asks for ${p}% of the amount.` }],
      hints: ["Start by finding 10% (divide by 10).", `10% of £${fmt(amount)} = £${fmt(tenPercent)}.`, p % 10 === 0 ? `${p}% is ${p / 10} lots of 10%.` : p === 25 || p === 75 ? `25% is a quarter. Divide by 4${p === 75 ? ", then multiply by 3" : ""}.` : "5% is half of 10%."],
      solution: [`10% of £${fmt(amount)} = £${fmt(tenPercent)}`, `${p}% = £${fmt(value)}`],
    };
  }, (q) => Math.abs(q.answer.value - clean(q.data.amount * q.data.p / 100)) < 1e-9),

  gen("y8-u3-l6", 3, "percent-change", "Percentage change", (rng) => {
    const original = rng.int(2, 25) * 20;
    const pct = rng.pick([5, 10, 15, 20, 25, 30, 40, 60]);
    const up = rng.chance(0.5);
    const now = original + (up ? 1 : -1) * (original * pct) / 100;
    return {
      type: "percentage",
      prompt: `A bike cost £${fmt(original)}. Its price ${up ? "rises" : "falls"} to £${fmt(now)}. Work out the percentage ${up ? "increase" : "decrease"}.`,
      answer: { value: pct },
      answerText: `${pct}%`,
      data: { original, now },
      traps: [{ value: round((Math.abs(now - original) / now) * 100, 1), feedback: "Divide the change by the ORIGINAL price, not the new price." }, { value: Math.abs(now - original), feedback: "That's the change in pounds. Now write it as a percentage of the original price." }],
      hints: ["Percentage change = change ÷ original × 100.", `The change is £${fmt(Math.abs(now - original))}.`, `Work out ${fmt(Math.abs(now - original))} ÷ ${fmt(original)} × 100.`],
      solution: [`Change = £${fmt(Math.abs(now - original))}`, `${fmt(Math.abs(now - original))} ÷ ${fmt(original)} = ${fmt(pct / 100)}`, `${fmt(pct / 100)} × 100 = ${pct}%`],
    };
  }, (q) => Math.abs((Math.abs(q.data.now - q.data.original) / q.data.original) * 100 - q.answer.value) < 1e-9),

  gen("y7-u4-l3", 2, "collect-like-terms", "Collecting like terms", (rng) => {
    const [a, b, c, d] = [rng.int(2, 9), rng.int(2, 9), rng.int(1, 9), rng.int(1, 9)];
    const minus = rng.chance(0.5);
    const xs = a + (minus ? -c : c);
    const ys = b + d;
    const term = (k, v) => (k === 1 ? v : k === -1 ? `−${v}` : `${k}${v}`);
    const pieces = [];
    if (xs !== 0) pieces.push(term(xs, "x"));
    pieces.push(term(ys, "y"));
    const expr = `${xs}*x + ${ys}*y`;
    return {
      type: "expression",
      prompt: `Simplify ${a}x + ${b}y ${minus ? "−" : "+"} ${c === 1 ? "" : c}x + ${d === 1 ? "" : d}y.`,
      answer: { expr, simplified: true },
      answerText: pieces.join(" + ").replace("+ −", "− "),
      data: { xs, ys },
      traps: [{ expr: `${a + c + b + d}*x*y`, feedback: "x terms and y terms are unlike terms, so they can't be combined into one term." }],
      hints: ["Like terms have exactly the same letters. Collect the x terms, then the y terms.", `x terms: ${a}x ${minus ? "−" : "+"} ${c}x.`, `y terms: ${b}y + ${d}y.`],
      solution: [`x terms: ${a}x ${minus ? "−" : "+"} ${c}x = ${term(xs, "x")}`, `y terms: ${b}y + ${d}y = ${ys}y`, `Answer: ${pieces.join(" + ").replace("+ −", "− ")}`],
    };
  }, (q) => q.data.ys > 0 && q.data.xs !== 0),

  gen("y7-u4-l7", 2, "expand-bracket", "Expanding single brackets", (rng) => {
    const k = rng.int(2, 9), a = rng.int(1, 5), b = rng.int(1, 9);
    const minus = rng.chance(0.4);
    return {
      type: "expression",
      prompt: `Expand ${k}(${a === 1 ? "" : a}x ${minus ? "−" : "+"} ${b}).`,
      answer: { expr: `${k * a}x ${minus ? "-" : "+"} ${k * b}`, expanded: true },
      answerText: `${k * a}x ${minus ? "−" : "+"} ${k * b}`,
      data: { k, a, b, minus },
      traps: [{ expr: `${k * a}x ${minus ? "-" : "+"} ${b}`, feedback: `Multiply BOTH terms inside the bracket by ${k}.` }],
      hints: ["Multiply every term inside the bracket by the number outside.", `${k} × ${a === 1 ? "" : a}x = ${k * a}x.`, `${k} × ${b} = ${k * b}. Keep the ${minus ? "minus" : "plus"} sign.`],
      solution: [`${k} × ${a === 1 ? "" : a}x = ${k * a}x`, `${k} × ${minus ? "−" : ""}${b} = ${minus ? "−" : ""}${k * b}`, `${k * a}x ${minus ? "−" : "+"} ${k * b}`],
    };
  }, (q) => q.data.k * q.data.a > 1),

  gen("y8-u4-l4", 3, "two-step-equation", "Solving two-step equations", (rng) => {
    const a = rng.int(2, 9), x = rng.int(-6, 12), b = rng.nonZero(-15, 20);
    const c = a * x + b;
    return {
      type: "numeric",
      prompt: `Solve ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fmt(c)}. Write the value of x.`,
      answer: { value: x },
      answerText: `x = ${fmt(x)}`,
      data: { a, b, c },
      traps: [{ value: (c + b) / a, feedback: `To undo ${b < 0 ? "− " + Math.abs(b) : "+ " + b}, do the inverse: ${b < 0 ? "add" : "subtract"} ${Math.abs(b)} from both sides.` }, { value: c / a - b, feedback: "Undo the addition or subtraction first, then the multiplication." }],
      hints: ["Use inverse operations, doing the same to both sides.", `${b < 0 ? "Add" : "Subtract"} ${Math.abs(b)} on both sides: ${a}x = ${fmt(c - b)}.`, `Divide both sides by ${a}.`],
      solution: [`${a}x = ${fmt(c)} ${b < 0 ? "+" : "−"} ${Math.abs(b)} = ${fmt(c - b)}`, `x = ${fmt(c - b)} ÷ ${a} = ${fmt(x)}`, `Check: ${a} × ${fmt(x)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fmt(c)} ✓`],
    };
  }, (q) => q.data.a * q.answer.value + q.data.b === q.data.c),

  gen("y9-u9-l2", 3, "pythagoras", "Finding the hypotenuse", (rng) => {
    const a = rng.int(3, 15), b = rng.int(3, 15);
    const exact = Math.sqrt(a * a + b * b);
    const value = round(exact, 1);
    return {
      type: "numeric",
      prompt: `A right-angled triangle has shorter sides of ${a} cm and ${b} cm. Find the length of the hypotenuse, correct to 1 decimal place.`,
      answer: { value, dp: 1 },
      answerText: `${fmt(value, 1)} cm`,
      data: { a, b },
      diagram: { kind: "triangle", a, b, labels: [`${a} cm`, `${b} cm`, "c"] },
      traps: [{ value: a + b, feedback: "The sides don't simply add. Use Pythagoras: c² = a² + b²." }, { value: round(Math.sqrt(Math.abs(a * a - b * b)), 1), feedback: "To find the hypotenuse (the longest side), ADD the squares." }],
      hints: ["Pythagoras' theorem: c² = a² + b², where c is the hypotenuse.", `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}.`, `c = √${a * a + b * b}. Round to 1 decimal place.`],
      solution: [`c² = ${a * a} + ${b * b} = ${a * a + b * b}`, `c = √${a * a + b * b} = ${fmt(exact, 4)}…`, `c = ${fmt(value, 1)} cm (1 d.p.)`],
    };
  }, (q) => !Number.isInteger(Math.sqrt(q.data.a ** 2 + q.data.b ** 2)) && Math.abs(q.answer.value - Math.round(Math.hypot(q.data.a, q.data.b) * 10) / 10) < 1e-9),

  gen("y7-u11-l6", 2, "mean", "The mean", (rng) => {
    const count = rng.int(4, 6);
    const values = Array.from({ length: count }, () => rng.int(2, 30));
    let total = values.reduce((a, b) => a + b, 0);
    const fix = (count - (total % count)) % count;
    values[0] += fix; // make the mean a whole number
    total += fix;
    return {
      type: "numeric",
      prompt: `Find the mean of these numbers: ${values.join(", ")}.`,
      answer: { value: total / count },
      answerText: fmt(total / count),
      data: { values },
      traps: [{ value: total, feedback: `That's the total. Now divide by how many numbers there are (${count}).` }, { value: [...values].sort((a, b) => a - b)[Math.floor(count / 2)], feedback: "That looks like the median (middle value). The mean is the total divided by the number of values." }],
      hints: ["Mean = total ÷ number of values.", `The total is ${total}.`, `There are ${count} numbers, so work out ${total} ÷ ${count}.`],
      solution: [`Total = ${values.join(" + ")} = ${total}`, `Mean = ${total} ÷ ${count} = ${fmt(total / count)}`],
    };
  }, (q) => q.data.values.reduce((a, b) => a + b, 0) / q.data.values.length === q.answer.value),

  gen("y7-u6-l5", 2, "fdp-match", "Fractions, decimals and percentages", (rng) => {
    const pool = [["1/2", "0.5", "50%"], ["1/4", "0.25", "25%"], ["3/4", "0.75", "75%"], ["1/5", "0.2", "20%"], ["2/5", "0.4", "40%"], ["1/10", "0.1", "10%"], ["3/10", "0.3", "30%"], ["1/20", "0.05", "5%"], ["7/10", "0.7", "70%"], ["1/100", "0.01", "1%"]];
    const chosen = rng.shuffle(pool).slice(0, 4);
    const usePercent = rng.chance(0.5);
    const pairs = chosen.map(([f, d, p]) => ({ left: `{${f}}`, right: usePercent ? p : d }));
    return {
      type: "match",
      prompt: `Match each fraction to the equal ${usePercent ? "percentage" : "decimal"}.`,
      pairs,
      choices: rng.shuffle(pairs.map((p) => p.right)),
      answer: {},
      answerText: chosen.map(([f, d, p]) => `${f} = ${usePercent ? p : d}`).join(", "),
      data: { chosen },
      hints: ["Divide the numerator by the denominator to get a decimal.", "To make a fraction out of 100, multiply the top and bottom by the same number.", "Percent means 'out of 100': 0.25 = 25%."],
      solution: chosen.map(([f, d, p]) => `${f} = ${d} = ${p}`),
    };
  }, (q) => q.data.chosen.every(([f, d, p]) => {
    const [n, den] = f.split("/").map(Number);
    return Math.abs(n / den - Number(d)) < 1e-9 && Math.abs(Number(d) * 100 - Number(p.replace("%", ""))) < 1e-9;
  })),

  gen("y7-u9-l2", 4, "carpet-cost", "Area problem (multi-step)", (rng) => {
    const l = rng.int(3, 9), w = rng.int(2, 7), price = rng.pick([8, 12, 15, 18, 24]);
    const area = l * w;
    return {
      type: "multistep",
      prompt: `A rectangular room is ${l} m long and ${w} m wide. Carpet costs £${price} per square metre. Work out the cost of carpeting the whole floor.`,
      steps: [
        { type: "numeric", prompt: "Step 1: Find the area of the floor, in m².", answer: { value: area }, traps: [{ value: 2 * (l + w), feedback: "That's the perimeter (the distance around the edge). Area = length × width." }] },
        { type: "numeric", prompt: "Step 2: Find the total cost, in pounds.", answer: { value: area * price }, traps: [{ value: 2 * (l + w) * price, feedback: "This uses the perimeter. Use your area from Step 1." }] },
      ],
      answer: {},
      answerText: `£${fmt(area * price)}`,
      data: { l, w, price },
      hints: ["First find the area. Then use the price per square metre.", `Area = ${l} × ${w}.`, `Cost = area × £${price}.`],
      solution: [`Area = ${l} × ${w} = ${area} m²`, `Cost = ${area} × £${price} = £${fmt(area * price)}`],
    };
  }, (q) => q.steps[1].answer.value === q.data.l * q.data.w * q.data.price && 2 * (q.data.l + q.data.w) !== q.data.l * q.data.w),
];
