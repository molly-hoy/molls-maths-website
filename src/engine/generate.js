/* ==========================================================================
   Making questions safely
   --------------------------------------------------------------------------
   A generator is an object:
     {
       id:      "y7-u1-l3/round10",   unique name
       skill:   "y7-u1-l3",           the lesson whose skill it practises
       level:   1–4,                  difficulty (see LEVELS below)
       make(rng)      → a question object
       validate(q)    → true if the question is mathematically sound
     }

   validate() re-checks the answer a DIFFERENT way from make(), so a bug in
   one is caught by the other. makeQuestion() keeps trying new seeds until
   a question passes, and the automated test (scripts/test-generators.mjs)
   runs thousands of seeds for every generator.
   ========================================================================== */
import { createRng } from "./random.js";
import { clean } from "./numbers.js";

export const LEVELS = {
  1: { name: "Level 1", label: "Fluency", description: "Basic skill practice" },
  2: { name: "Level 2", label: "Developing", description: "Slightly more complex questions" },
  3: { name: "Level 3", label: "Secure", description: "Reasoning and multi-step questions" },
  4: { name: "Level 4", label: "Challenge", description: "Problem solving and exam-style" },
};

/* "Light" lessons (Year 10 onwards) use two levels instead of four:
   Core (the essential skill) and Extend (harder, multi-step or exam-style). */
export const LIGHT_LEVELS = { 1: "Core", 2: "Extend" };

// Checks that every question must pass, whatever its topic.
function basicChecks(q) {
  if (!q || !q.type || !q.prompt) return false;
  if (!Array.isArray(q.hints) || q.hints.length < 2) return false;
  if (!Array.isArray(q.solution) || q.solution.length < 1) return false;
  if (q.type === "numeric" || q.type === "percentage") {
    if (!Number.isFinite(q.answer?.value)) return false;
  }
  if (q.type === "choice") {
    if (!(q.answer.index >= 0 && q.answer.index < q.options.length)) return false;
    const labels = q.options.map((o) => o.label);
    if (new Set(labels).size !== labels.length) return false; // no duplicate options
  }
  if (q.type === "order") {
    if (new Set(q.items).size !== q.items.length) return false;
  }
  return true;
}

// Remove any "trap" that is actually equal to the right answer.
function tidyTraps(q) {
  if (q.traps && q.answer && "value" in q.answer) {
    const seen = new Set();
    q.traps = q.traps.filter((t) => {
      const key = clean(t.value);
      if (!Number.isFinite(key) || Math.abs(key - clean(q.answer.value)) < 1e-9 || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  return q;
}

export function makeQuestion(generator, seed) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const s = (seed + attempt * 7919) >>> 0;
    try {
      const q = generator.make(createRng(s));
      if (basicChecks(q) && generator.validate(q)) {
        return tidyTraps({ ...q, id: `${generator.id}#${s}`, skill: generator.skill, level: generator.level, levelName: generator.levelName, generator: generator.id, seed: s });
      }
    } catch {
      /* a failed attempt: try the next seed */
    }
  }
  throw new Error(`Generator ${generator.id} could not make a valid question`);
}

// Build a numbered list of questions from a list of generators.
export function makeSet(generators, baseSeed) {
  return generators.map((g, i) => makeQuestion(g, baseSeed + i * 104729));
}
