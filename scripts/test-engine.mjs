/* Automated checks for the question engine. Run with:  node scripts/test-engine.mjs
   1. Every generator makes 2,000 questions; each must be valid, and its own
      correct answer must be marked correct, and every trap marked incorrect.
   2. Hand-written tests for the answer checkers and the expression parser. */
import { ALL_GENERATORS } from "../src/data/lessons/index.js";
import { BANK_GENERATORS } from "../src/engine/generators/bank.js";
import { makeQuestion } from "../src/engine/generate.js";
import { checkAnswer } from "../src/engine/check.js";
import { fmt, round, parseNumber, parseFraction } from "../src/engine/numbers.js";

let failures = 0, passes = 0;
const expect = (cond, msg) => { if (cond) passes++; else { failures++; if (failures < 40) console.log("FAIL:", msg); } };

function correctResponse(q) {
  switch (q.type) {
    case "numeric": return q.answer.dp !== undefined ? fmt(q.answer.value, q.answer.dp).replace(/,/g, "") : fmt(q.answer.value).replace(/,/g, "");
    case "percentage": return `${q.answer.value}%`;
    case "fraction": return q.answer.improper === false && q.answer.n > q.answer.d ? `${Math.floor(q.answer.n / q.answer.d)} ${q.answer.n % q.answer.d}/${q.answer.d}` : `${q.answer.n}/${q.answer.d}`;
    case "expression": return q.answer.expr;
    case "choice": return q.answer.index;
    case "multistep": return null;
    case "order": return q.answer.order;
    case "match": return q.pairs.map((p) => p.right);
  }
}

const only = process.argv[2];
const all = [...ALL_GENERATORS, ...BANK_GENERATORS].filter((g) => !only || g.id.startsWith(only));
for (const g of all) {
  const prompts = new Set();
  for (let seed = 1; seed <= (only ? 1000 : 2000); seed++) {
    let q;
    try { q = makeQuestion(g, seed * 7 + 3); } catch (e) { expect(false, `${g.id} seed ${seed}: ${e.message}`); continue; }
    prompts.add(q.prompt);
    const parts = q.type === "multistep" ? q.steps : [q];
    for (const part of parts) {
      const r = checkAnswer(part, correctResponse(part));
      expect(r.status === "correct", `${g.id} seed ${seed}: correct answer rejected (${r.message}) :: ${part.prompt} :: ${JSON.stringify(part.answer)}`);
      for (const t of part.traps ?? []) {
        if (t.value !== undefined && Number.isFinite(t.value)) {
          const tr = checkAnswer(part, String(t.value));
          expect(tr.status !== "correct", `${g.id} seed ${seed}: trap ${t.value} accepted :: ${part.prompt}`);
        }
      }
      if (part.type === "numeric") expect(!/NaN|undefined|Infinity/.test(part.prompt + q.solution.join(" ") + q.hints.join(" ")), `${g.id}: bad text ${part.prompt}`);
    }
  }
  console.log(`${g.id.padEnd(44)} ${String(prompts.size).padStart(5)} distinct questions`);
}

// ---- Hand-written checker tests ----
const num = (answer, typed) => checkAnswer({ type: "numeric", answer }, typed).status;
expect(num({ value: 12500 }, "12,500") === "correct", "commas accepted");
expect(num({ value: -5 }, "−5") === "correct", "unicode minus accepted");
expect(num({ value: 2.5, dp: 2 }, "2.50") === "correct", "2.50 at 2dp");
expect(num({ value: 2.5, dp: 2 }, "2.5") === "incorrect", "2.5 rejected at 2dp");
expect(num({ value: 0.07 }, "7/100") === "correct", "fraction for decimal");
expect(num({ value: 5 }, "abc") === "invalid", "text is invalid");
expect(num({ value: 5 }, "1,25") === "invalid", "badly placed comma is invalid");
expect(num({ value: 3.33, dp: 2 }, "£3.33") === "correct", "pound sign stripped");
expect(parseNumber(" 1,234.5 ") === 1234.5, "parse 1,234.5");
expect(JSON.stringify(parseFraction("1 1/2")) === JSON.stringify({ n: 3, d: 2, mixed: true }), "mixed number");
const frac = (typed) => checkAnswer({ type: "fraction", answer: { n: 2, d: 3, simplest: true } }, typed);
expect(frac("2/3").status === "correct", "2/3");
expect(frac("4/6").status === "incorrect" && /simplest/.test(frac("4/6").message), "4/6 not simplest");
expect(frac("3/4").status === "incorrect", "3/4 wrong");
const ex = (answer, typed) => checkAnswer({ type: "expression", answer }, typed).status;
expect(ex({ expr: "5x+3y", simplified: true }, "3y + 5x") === "correct", "order of terms");
expect(ex({ expr: "5x+3y", simplified: true }, "2x+3x+3y") === "incorrect", "not simplified");
expect(ex({ expr: "6x+12", expanded: true }, "6(x+2)") === "incorrect", "not expanded");
expect(ex({ expr: "6x+12", expanded: true }, "12 + 6x") === "correct", "expanded");
expect(ex({ expr: "x^2-4" }, "(x+2)(x-2)") === "correct", "difference of squares");
expect(ex({ expr: "2ab" }, "2ba") === "correct", "2ab = 2ba");
expect(ex({ expr: "x" }, "2x)") === "invalid", "unbalanced bracket is invalid");
expect(ex({ expr: "x" }, "alert(1)") === "invalid" || ex({ expr: "x" }, "alert(1)") === "incorrect", "code is never run");
expect(round(1.005, 2) === 1.01, "1.005 → 1.01");
expect(round(2.675, 2) === 2.68, "2.675 → 2.68");
expect(round(-2.5, 0) === -3, "half away from zero");
expect(fmt(-3) === "−3" && fmt(12500) === "12,500" && fmt(2.5, 2) === "2.50", "formatting");

// ---- Progress and mastery rules ----
const { progressReducer, emptyProgress, lessonEvidence } = await import("../src/state/progress.js");
let st = emptyProgress();
st = progressReducer(st, { type: "visitLesson", lessonId: "y7-u1-l1" });
expect(lessonEvidence(st, "y7-u1-l1").status === "started", "opening a lesson is only 'started'");
for (let i = 0; i < 5; i++) st = progressReducer(st, { type: "recordAnswer", lessonId: "y7-u1-l1", correct: true });
expect(!lessonEvidence(st, "y7-u1-l1").completed, "no quiz → not completed");
st = progressReducer(st, { type: "recordQuiz", lessonId: "y7-u1-l1", score: 4, total: 5 });
expect(lessonEvidence(st, "y7-u1-l1").status === "completed", "5 answers is not enough for secure");
st = progressReducer(st, { type: "recordAnswer", lessonId: "y7-u1-l1", correct: true });
expect(lessonEvidence(st, "y7-u1-l1").status === "secure", "quiz 80% + 6 answers + 100% recent → secure");
for (let i = 0; i < 6; i++) st = progressReducer(st, { type: "recordAnswer", lessonId: "y7-u1-l1", correct: false });
expect(lessonEvidence(st, "y7-u1-l1").status === "needs-practice", "recent errors → needs practice");
expect(lessonEvidence(st, "y7-u1-l1").completed, "still counts as completed");

console.log(`\n${passes} checks passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
