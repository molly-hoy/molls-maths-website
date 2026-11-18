/* ==========================================================================
   The "light" lesson format (Year 10 onwards)
   --------------------------------------------------------------------------
   Shorter than the Year 7 format but with the same A–M structure, so every
   page still works. Content is written compactly and expanded here:
     L({
       intro:  ["paragraph", …],
       obj:    ["objective", …],
       prior:  ["prior knowledge", …],
       vocab:  [["term", "definition"], …],
       teach:  [["Heading", "paragraph", "key point (optional)", visual?], …],
       ex:     [["question", ["step", …], "answer"], …],
       mis:    [["mistake", "why it's wrong", "what to do instead"], …],
       check:  ["checklist item", …],
     })
   ========================================================================== */
export function L(c) {
  return {
    light: true,
    introduction: c.intro,
    objectives: c.obj,
    priorKnowledge: c.prior,
    vocabulary: c.vocab.map(([term, definition]) => ({ term, definition })),
    teaching: c.teach.map(([heading, text, keyPoint, visual]) => ({ heading, paragraphs: Array.isArray(text) ? text : [text], keyPoint, visual })),
    examples: c.ex.map(([question, steps, answer]) => ({ question, steps, answer })),
    mistakes: c.mis.map(([mistake, why, fix]) => ({ mistake, why, fix })),
    checklist: c.check,
  };
}
