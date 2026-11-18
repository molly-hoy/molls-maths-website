/* ==========================================================================
   Year 11 generators, Part C: Unit 9 (Exam preparation)
   Command words and marks · Non-calculator · Calculator · Multi-step problems
   plus Foundation and Higher mixed practice. A "mixed" generator picks a
   different skill from earlier in the course each time it makes a question.
   ========================================================================== */
import { clean, fmt, round } from "../numbers.js";
import { core, extend, mc3, num, reuse, T } from "./helpers.js";
import { Y7U1_GENERATORS } from "./y7u1.js";
import { Y7B_GENERATORS } from "./y7b.js";
import { Y8_GENERATORS } from "./y8.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y9B_GENERATORS } from "./y9b.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10C_GENERATORS } from "./y10c.js";
import { Y11A_GENERATORS } from "./y11a.js";
import { Y11B_GENERATORS } from "./y11b.js";

const S = (u, l) => `y11-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, make, v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, make, v);
const ALL = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y8_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS };
const from = (id, level) => ALL[id].find((g) => g.level === level);
const N = (prompt, value, hints, solution, o = {}) => num(prompt, value, { hints, solution, ...o });
const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = (n) => String(n).split("").map((c) => SUP[c]).join("");
const sf1 = (x) => { const m = 10 ** Math.floor(Math.log10(Math.abs(x))); const r = x / m; return Math.abs(r - Math.floor(r) - 0.5) < 1e-9 ? null : clean(Math.round(r) * m); };
const bankMC = (rng, items) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(items);
  return mc3(rng, prompt, right, [[w1, "Think again about what this means in an exam."], [w2, "Think again about what this means in an exam."]], { hints: [hint, "Rule out the options that don't fit."], solution: [why] });
};

// A mixed-practice generator: each question comes from one of the generators in the pool.
const mix = (skill, name, level, pool) => ({
  id: `${skill}/${name}`, skill, level, levelName: level === 1 ? "Core" : "Extend", title: name,
  make(rng) { const i = rng.int(0, pool.length - 1); const q = pool[i].make(rng); return q ? { ...q, data: { ...(q.data ?? {}), _mix: i } } : null; },
  validate(q) { const g = pool[q.data?._mix]; return g ? g.validate(q) : false; },
});

const U9 = {
  [S(9, 1)]: [
    C(9, 1, "command-words", (rng) => bankMC(rng, [
      ["What does the command word ‘Estimate’ ask you to do?", "Round the numbers to get an approximate answer", "Give an exact answer to 2 decimal places", "Prove the result using algebra", "Think about 1 significant figure.", "‘Estimate’ means round first, then calculate."],
      ["What does ‘Show that’ ask you to do?", "Give full working that leads to the answer you're given", "Write down the answer only", "Guess the answer and check it", "The answer is given in the question.", "You must show every step that reaches the given result."],
      ["What does ‘Write down’ usually mean?", "Give the answer, with little or no working needed", "Prove it with a full argument", "Draw a graph", "These are usually quick, 1-mark questions.", "‘Write down’ questions need only the answer."],
      ["What does ‘Expand’ mean?", "Multiply out the brackets", "Write as a product with brackets", "Solve the equation", "You start with brackets and end without them.", "Expanding removes brackets by multiplying."],
      ["What does ‘Factorise’ mean?", "Write as a product using brackets", "Multiply out the brackets", "Put the numbers in order", "The opposite of expanding.", "Factorising puts brackets back."],
      ["What does ‘Explain’ ask you to do?", "Give a reason in words", "Work out a number", "Round the answer", "You need to say why.", "‘Explain’ needs a written reason."],
    ])),
    E(9, 1, "marks-and-working", (rng) => bankMC(rng, [
      ["A 3-mark ‘Work out’ question. Your final answer is wrong but your method is correct. What can you still earn?", "Method marks (M marks)", "Nothing: the answer is wrong", "All 3 marks", "Examiners reward correct method.", "Method marks are awarded for correct working even if the final answer is wrong."],
      ["What is an A mark in a mark scheme?", "An accuracy mark: a correct answer or step, following correct method", "An extra mark for neat handwriting", "A mark for the answer only", "A marks depend on method marks.", "A marks reward accuracy, but only after correct method."],
      ["Why should you write down every step in a multi-mark question?", "Working can earn method marks even if the answer is wrong", "Examiners prefer long answers", "It uses up extra time", "Think about what the marks reward.", "Each correct step can earn a method mark."],
      ["The paper has 80 marks and lasts 90 minutes. About how long should a 4-mark question take?", "About 4½ minutes", "About 10 minutes", "About 1 minute", "Divide 90 minutes by 80 marks.", "90 ÷ 80 ≈ 1.1 minutes per mark, so about 4½ minutes for 4 marks."],
      ["You are stuck on a question worth 2 marks. What is the best thing to do?", "Write down any correct working, then move on and return later", "Leave it blank and never return", "Spend 15 minutes on it", "Time is limited.", "Pick up method marks and manage your time."],
      ["In a ‘Show that’ question, what should the final line of your working be?", "The result given in the question", "A different answer", "A rounded estimate", "Your working must reach the given answer.", "You must finish on the answer stated in the question."],
    ])),
  ],
  [S(9, 2)]: [
    C(9, 2, "decimal-multiplication", (rng) => {
      const d1 = rng.int(1, 2), d2 = rng.int(1, 2), n1 = rng.int(2, 9) * (rng.chance(0.4) ? 11 : 1), n2 = rng.int(2, 9);
      const v = clean((n1 * n2) / 10 ** (d1 + d2));
      return N(`Without a calculator, work out ${fmt(n1 / 10 ** d1, d1)} × ${fmt(n2 / 10 ** d2, d2)}.`, v, ["Ignore the decimal points and multiply the whole numbers.", `${n1} × ${n2} = ${n1 * n2}. Then count the decimal places: ${d1} + ${d2} = ${d1 + d2}.`], [`${n1} × ${n2} = ${n1 * n2}`, `Move the point ${d1 + d2} place${d1 + d2 === 1 ? "" : "s"}: ${fmt(v)}`], { traps: [T(clean((n1 * n2) / 10 ** (d1 + d2 - 1)), "Count the total number of decimal places carefully.")] });
    }),
    E(9, 2, "estimate-one-sf", (rng) => {
      const a = clean(rng.int(31, 99) / 10), b = clean(rng.int(11, 99) + rng.int(1, 9) / 10), c = clean(rng.int(21, 89) / 100);
      const ra = sf1(a), rb = sf1(b), rc = sf1(c); if (ra === null || rb === null || rc === null) return null;
      const est = clean((ra * rb) / rc);
      return N(`Estimate the value of (${fmt(a)} × ${fmt(b)}) ÷ ${fmt(c)} by rounding each number to 1 significant figure.`, est, ["Round each number to 1 significant figure first.", `${fmt(a)} → ${fmt(ra)}, ${fmt(b)} → ${fmt(rb)}, ${fmt(c)} → ${fmt(rc)}.`], [`(${fmt(ra)} × ${fmt(rb)}) ÷ ${fmt(rc)} = ${fmt(est)}`]);
    }),
  ],
  [S(9, 3)]: [
    C(9, 3, "standard-form-calculator", (rng) => {
      const a = rng.pick([1.5, 2, 2.5, 3, 4, 6]), b = rng.pick([2, 3, 4, 5, 8]), m = rng.int(2, 6), n = rng.int(-3, 3);
      const v = clean(a * b * 10 ** (m + n));
      return N(`Use a calculator to work out (${fmt(a)} × 10${sup(m)}) × (${b} × 10${sup(n)}). Give your answer as an ordinary number.`, v, ["Multiply the numbers, then add the powers of 10.", `${fmt(a)} × ${b} = ${fmt(clean(a * b))}; powers: ${m} + ${n < 0 ? `(${n})` : n} = ${m + n}.`], [`${fmt(clean(a * b))} × 10${sup(m + n)} = ${fmt(v)}`]);
    }),
    E(9, 3, "pythagoras-calculator", (rng) => {
      const a = rng.int(4, 25), b = rng.int(4, 25), exact = Math.hypot(a, b);
      if (Math.abs((exact * 10) % 1 - 0.5) < 1e-4) return null;
      return num(`A rectangle is ${a} cm by ${b} cm. Use a calculator to find the length of its diagonal, to 1 decimal place.`, round(exact, 1), { dp: 1, unit: "cm", hints: ["The diagonal is the hypotenuse of a right-angled triangle.", `√(${a}² + ${b}²).`], solution: [`${a}² + ${b}² = ${a * a + b * b}`, `√${a * a + b * b} = ${fmt(round(exact, 4))}… = ${fmt(round(exact, 1), 1)} cm`], traps: [T(a + b, "Use Pythagoras; don't just add the sides.")], data: { exact, dp: 1 } });
    }, (q) => Math.abs(round(q.data.exact, 1) - q.answer.value) < 1e-9),
  ],
  [S(9, 4)]: [
    C(9, 4, "shopping-change", (rng) => {
      const a = rng.int(2, 5), pa = rng.int(80, 250) / 100, b = rng.int(2, 6), pb = rng.int(150, 399) / 100, paid = Math.ceil((a * pa + b * pb) / 10) * 10 + 10 * rng.int(0, 1);
      const total = clean(a * pa + b * pb), change = clean(paid - total);
      return N(`Dan buys ${a} pens at £${fmt(pa, 2)} each and ${b} notebooks at £${fmt(pb, 2)} each. He pays with £${paid}. How much change does he get?`, change, ["Work out the cost of the pens and the cost of the notebooks.", "Add them, then take the total away from what he paid."], [`Pens: ${a} × ${fmt(pa, 2)} = £${fmt(clean(a * pa), 2)}`, `Notebooks: ${b} × ${fmt(pb, 2)} = £${fmt(clean(b * pb), 2)}`, `Change = ${paid} − ${fmt(total, 2)} = £${fmt(change, 2)}`], { dp: 2, pre: "£", traps: [T(total, "That's the total cost. The question asks for the change.")] });
    }),
    reuse(from("y10-u5-l4", 1), S(9, 4), 2, "tickets"),
  ],
  [S(9, 5)]: (() => {
    const own = (id, level) => ALL[id].find((g) => g.level === level);
    const pool1 = [["y9-u1-l1", 1], ["y9-u2-l1", 1], ["y9-u2-l4", 1], ["y9-u6-l1", 1], ["y9-u12-l1", 1], ["y9-u13-l1", 1], ["y10-u1-l1", 1], ["y10-u2-l1", 1], ["y10-u6-l2", 1], ["y10-u10-l2", 1], ["y8-u3-l2", 1], ["y8-u4-l4", 1], ["y8-u7-l4", 1], ["y8-u8-l6", 1], ["y7-u12-l1", 1]].map(([id, l]) => own(id, l));
    const pool2 = [["y9-u1-l1", 2], ["y9-u2-l2", 2], ["y9-u6-l2", 2], ["y9-u12-l2", 2], ["y10-u1-l1", 2], ["y10-u2-l1", 2], ["y10-u7-l2", 2], ["y8-u3-l6", 2], ["y8-u6-l3", 2], ["y8-u8-l6", 2], ["y8-u5-l4", 1]].map(([id, l]) => own(id, l));
    return [mix(S(9, 5), "foundation-mixed-core", 1, pool1), mix(S(9, 5), "foundation-mixed-extend", 2, pool2)];
  })(),
  [S(9, 6)]: (() => {
    const own = (id, level) => ALL[id].find((g) => g.level === level);
    const pool1 = [["y10-u3-l1", 1], ["y10-u4-l1", 1], ["y10-u4-l4", 1], ["y10-u5-l1", 1], ["y10-u9-l1", 1], ["y10-u9-l4", 1], ["y10-u10-l4", 1], ["y10-u11-l5", 1], ["y10-u12-l3", 1], ["y11-u2-l4", 1], ["y11-u3-l3", 1], ["y11-u5-l4", 1]].map(([id, l]) => own(id, l));
    const pool2 = [["y10-u3-l4", 2], ["y10-u4-l6", 2], ["y10-u4-l4", 2], ["y10-u9-l3", 2], ["y10-u9-l5", 2], ["y10-u10-l5", 2], ["y10-u5-l5", 2], ["y11-u2-l5", 2], ["y11-u5-l3", 2], ["y11-u3-l3", 2], ["y11-u6-l1", 2]].map(([id, l]) => own(id, l));
    return [mix(S(9, 6), "higher-mixed-core", 1, pool1), mix(S(9, 6), "higher-mixed-extend", 2, pool2)];
  })(),
};

export const Y11C_GENERATORS = U9;

