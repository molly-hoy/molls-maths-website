/* ==========================================================================
   GCSE information and exam-style questions
   --------------------------------------------------------------------------
   Facts here were checked against the exam boards' published assessment
   overviews (checked November 2026). Exam boards can change details, so
   students should always confirm with their teacher which board and tier
   they are entered for.
   Grade boundaries change every year, so none are quoted as fixed values.
   ========================================================================== */

export const EXAM_BOARDS = [
  { board: "AQA", spec: "8300", papers: "3 papers × 1 hour 30 minutes", marks: "80 marks each (240 total)", nonCalc: "Paper 1" },
  { board: "Pearson Edexcel", spec: "1MA1", papers: "3 papers × 1 hour 30 minutes", marks: "80 marks each (240 total)", nonCalc: "Paper 1" },
  { board: "OCR", spec: "J560", papers: "3 papers × 1 hour 30 minutes", marks: "100 marks each (300 total)", nonCalc: "Paper 2 (Foundation) / Paper 5 (Higher)" },
];

export const TIERS = [
  { tier: "Foundation", grades: "Grades 1 to 5", who: "For students working towards grades 1–5. The highest grade available is 5.", content: "All the Foundation content: the topics marked F on this site." },
  { tier: "Higher", grades: "Grades 4 to 9 (an allowed grade 3 is possible)", who: "For students aiming for grades 4–9. Higher papers start at around grade 4 difficulty, so they are not a safe choice for a student who is not yet secure at grade 4.", content: "All Foundation content plus the Higher-only topics marked H." },
];

export const FORMULAE_NOTE = "For GCSE Mathematics exams, the exam boards provide a formulae sheet. Ofqual confirmed in 2026 that this will continue for the lifetime of the current specifications. Formulae on the sheet include the quadratic formula, the sine and cosine rules, and volume and surface area formulae for spheres and cones. Students still need to learn and understand formulae that are not on the sheet, such as the area of a rectangle or Pythagoras' theorem.";

export const COMMAND_WORDS = [
  { word: "Write down", meaning: "The answer can be written with little or no working. Usually 1 mark." },
  { word: "Work out / Calculate", meaning: "Do a calculation. Show your working: method marks are available even if the final answer is wrong." },
  { word: "Estimate", meaning: "Round the numbers (usually to 1 significant figure) and calculate with the rounded numbers. An exact answer may get no marks." },
  { word: "Show that", meaning: "You are given the answer. You must show every step that leads to it. Writing the answer alone earns nothing." },
  { word: "Explain / Give a reason", meaning: "Write a sentence using mathematical language, e.g. “alternate angles are equal”." },
  { word: "Prove", meaning: "Give a complete logical argument, usually algebraic, that works in every case (not just examples)." },
  { word: "Simplify", meaning: "Write the expression in its simplest form, e.g. collect like terms or cancel common factors." },
  { word: "Solve", meaning: "Find the value(s) of the unknown that make the equation or inequality true." },
  { word: "Expand", meaning: "Multiply out the brackets." },
  { word: "Factorise", meaning: "Put into brackets by taking out common factors. Factorise fully means take out the highest common factor." },
  { word: "Hence", meaning: "Use the answer you just found to answer the next part." },
  { word: "Describe fully", meaning: "Give every detail. For a transformation: the type, and all its information (e.g. centre, angle and direction of a rotation)." },
  { word: "Sketch", meaning: "Draw the general shape with key features labelled. It doesn't need to be accurate." },
  { word: "Construct", meaning: "Draw accurately with a ruler and compasses, leaving your construction arcs visible." },
];

export const MARK_TYPES = [
  { code: "M", name: "Method mark", meaning: "For a correct method, even if there is an arithmetic slip later." },
  { code: "A", name: "Accuracy mark", meaning: "For a correct answer. Usually depends on the method mark before it." },
  { code: "B", name: "Independent mark", meaning: "For a correct statement or value, regardless of method." },
  { code: "ft", name: "Follow through", meaning: "An earlier mistake is carried forward fairly, so you aren't penalised twice." },
];

/* Exam-style questions, written for this site in the style of GCSE papers.
   (They are original questions, not copied from any exam board paper.)
   `check` gives the final answer(s) as engine questions, so the site can
   mark the final answer; students then mark their own working against
   the mark scheme. */
export const EXAM_QUESTIONS = [
  {
    id: "gcse-f1", tier: "F", grade: "3", strand: "ratio", calculator: false, marks: 3,
    prompt: "A coat costs £80. In a sale, the price is reduced by 15%. Work out the sale price of the coat.",
    check: [{ type: "numeric", prompt: "Sale price (£)", answer: { value: 68 }, traps: [{ value: 12, feedback: "£12 is the reduction. Subtract it from the original price." }, { value: 92, feedback: "The price is reduced, so subtract the 15%." }] }],
    markScheme: [
      { code: "M1", text: "Finds 15% of 80, e.g. 10% = 8 and 5% = 4, or 0.15 × 80, or 12 seen" },
      { code: "M1", text: "Subtracts their 15% from 80, or 0.85 × 80" },
      { code: "A1", text: "68 (£68)" },
    ],
    solution: ["10% of £80 = £8, so 5% = £4", "15% = £8 + £4 = £12", "Sale price = £80 − £12 = £68"],
  },
  {
    id: "gcse-f2", tier: "F", grade: "3–4", strand: "number", calculator: false, marks: 2,
    prompt: "Work out an estimate for (48.7 × 6.1) ÷ 9.8",
    check: [{ type: "numeric", prompt: "Estimate", answer: { value: 30 }, traps: [{ value: 30.3, feedback: "That's close to the exact answer. For an estimate, round each number to 1 significant figure first." }] }],
    markScheme: [
      { code: "M1", text: "Rounds at least two of the numbers to 1 significant figure, e.g. 50, 6 and 10" },
      { code: "A1", text: "30 (from correct rounding)" },
    ],
    solution: ["48.7 ≈ 50, 6.1 ≈ 6, 9.8 ≈ 10", "50 × 6 = 300", "300 ÷ 10 = 30"],
  },
  {
    id: "gcse-f3", tier: "F", grade: "3–4", strand: "ratio", calculator: false, marks: 3,
    prompt: "Amir and Ben share £84 in the ratio 3 : 4. How much does Ben get?",
    check: [{ type: "numeric", prompt: "Ben's share (£)", answer: { value: 48 }, traps: [{ value: 36, feedback: "£36 is Amir's share (3 parts). Ben has 4 parts." }, { value: 12, feedback: "£12 is the value of one part. Ben has 4 parts." }, { value: 21, feedback: "There are 3 + 4 = 7 parts altogether, not 4." }] }],
    markScheme: [
      { code: "M1", text: "84 ÷ (3 + 4) or 12 seen" },
      { code: "M1", text: "4 × their 12" },
      { code: "A1", text: "48 (£48)" },
    ],
    solution: ["Total parts = 3 + 4 = 7", "One part = £84 ÷ 7 = £12", "Ben gets 4 parts = 4 × £12 = £48"],
  },
  {
    id: "gcse-h1", tier: "H", grade: "5", strand: "algebra", calculator: false, marks: 3,
    prompt: "Solve the simultaneous equations\n3x + 2y = 16\nx − 2y = 0",
    check: [
      { type: "numeric", prompt: "x =", answer: { value: 4 } },
      { type: "numeric", prompt: "y =", answer: { value: 2 } },
    ],
    markScheme: [
      { code: "M1", text: "Correct method to eliminate one variable, e.g. adds the equations to get 4x = 16, or substitutes x = 2y" },
      { code: "A1", text: "x = 4" },
      { code: "A1", text: "y = 2" },
    ],
    solution: ["Add the equations: 3x + x + 2y − 2y = 16 + 0, so 4x = 16", "x = 4", "Substitute into x − 2y = 0: 4 − 2y = 0, so y = 2", "Check in the first equation: 3(4) + 2(2) = 12 + 4 = 16 ✓"],
  },
  {
    id: "gcse-h2", tier: "H", grade: "5", strand: "ratio", calculator: true, marks: 3,
    prompt: "Jess invests £2,500 for 4 years at 3% per year compound interest. Work out the value of the investment at the end of 4 years. Give your answer to the nearest penny.",
    check: [{ type: "numeric", prompt: "Value (£)", answer: { value: 2813.77, dp: 2 }, traps: [{ value: 2800, feedback: "That uses simple interest (3% of £2,500 each year). Compound interest adds interest on the interest too." }, { value: 313.77, feedback: "That's the interest only. Add it to the £2,500 invested." }] }],
    markScheme: [
      { code: "M1", text: "Uses the multiplier 1.03" },
      { code: "M1", text: "2500 × 1.03⁴ (or a complete year-by-year method)" },
      { code: "A1", text: "2813.77" },
    ],
    solution: ["Multiplier for a 3% increase = 1.03", "2500 × 1.03⁴ = 2500 × 1.12550881 = 2813.772…", "£2,813.77 to the nearest penny"],
  },
  {
    id: "gcse-h3", tier: "H", grade: "5–6", strand: "algebra", calculator: false, marks: 3,
    prompt: "Solve x² − 5x − 14 = 0",
    check: [
      { type: "numeric", prompt: "The larger solution: x =", answer: { value: 7 }, traps: [{ value: 2, feedback: "Check the signs in your brackets: (x − 7)(x + 2) expands to x² − 5x − 14." }] },
      { type: "numeric", prompt: "The smaller solution: x =", answer: { value: -2 }, traps: [{ value: -7, feedback: "Check the signs: if a bracket is (x + 2), the solution is x = −2." }] },
    ],
    markScheme: [
      { code: "M1", text: "(x ± 7)(x ± 2), or correct use of the quadratic formula" },
      { code: "A1", text: "(x − 7)(x + 2) = 0" },
      { code: "A1", text: "x = 7 and x = −2" },
    ],
    solution: ["Find two numbers that multiply to −14 and add to −5: −7 and 2", "x² − 5x − 14 = (x − 7)(x + 2) = 0", "So x − 7 = 0 or x + 2 = 0", "x = 7 or x = −2"],
  },
];
