# Moll's Maths: UK maths platform, Years 7–11

A maths education platform for KS3 (Years 7–9) and GCSE Foundation and Higher (Years 10–11), aligned to the National Curriculum in England and the DfE GCSE content used by AQA, Pearson Edexcel and OCR. Written in British English.

Built with **React 19 + Vite**, **React Router**, **CSS Modules** and **localStorage**. There is no backend.

## Run it

```bash
npm install
npm run dev      # development server
npm test         # question-engine and mastery tests (3.0 million checks)
npm run build    # production build in dist/
```

### Deploying to Cloudflare

The site is hosted on Cloudflare. In the Cloudflare project's build settings:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

`wrangler.jsonc` tells Cloudflare to put the `dist` folder online, and to send
every address to `index.html` so links like `/worksheets` still work when the
page is refreshed or opened directly.

## How the code is organised

```
src/
  data/                 CONTENT: no interface code in here
    curriculum.js       Years → units → lessons (single source of truth)
    strands.js          six strands + validated colours
    lessons/            teaching content (y7-u1.js, y7-b.js, y8.js, y9-a/b.js, y10-a/b/c.js, y11-a/b.js) + registry (index.js)
    assessments.js      assessments built from generators
    gcse.js             exam boards, tiers, command words, exam-style questions
  engine/               MATHS: pure functions, no React
    numbers.js          exact rounding, British formatting, input parsing
    expression.js       safe algebra parser (no eval) + equivalence testing
    check.js            answer checking for every question type
    generate.js         seeded, self-validating question creation
    generators/         y7u1.js, y7b.js, y8.js, y9a.js, y9b.js, y10a/b/c.js, y11a/b/c.js, bank.js, helpers.js
  state/                progress.js (rules, pure), ProgressContext.jsx (saving)
  components/           QuestionCard, AnswerInput, TestRunner, Diagram, Header…
  pages/                one file per page
scripts/test-engine.mjs automated tests
```

To add a lesson, write its content (like `data/lessons/y7-u1.js`) and its generators (four levels for the full format, or Core and Extend for the light format), then register both in `data/lessons/index.js`. The lesson is then marked as available everywhere automatically.

## Stage report

### Completed and working
- **Stage 1: design and navigation.** Accessible design system (Lexend, WCAG AA text contrast, focus rings, reduced motion). All 15 navigation items, grouped into drop-downs on desktop and a single menu on mobile. Home page and pages for every year group.
- **Stage 2: curriculum.** 58 units and 315 lessons across Years 7–11 and all six strands. Each unit has an introduction, objectives and prerequisites. GCSE lessons are tagged F/H with indicative grades. There is an interactive curriculum map (strands × years) that traces prerequisites and later units.
- **Stage 3: question engine.**
  - Answer types: numeric (handles commas and the Unicode minus sign), exact decimal places (with specific feedback such as "2.50, not 2.5"), fraction (equivalence and simplest form), percentage, algebraic expression (safe parser, checked by evaluating at random points; detects "not simplified" and "not expanded"), multiple choice, drag-and-drop ordering (pointer and keyboard), matching, and multi-step.
  - Common wrong answers ("traps") get targeted feedback.
  - Hints appear one at a time, and the worked solution unlocks only after a first attempt.
  - Questions are generated from seeds and checked by a second, independent calculation.
- **Stage 4: content.** Year 7 Unit 1 (Place value and number) has 8 complete lessons, each with all of sections A–M:
  - 3 worked examples
  - 3 common mistakes
  - 2 guided questions
  - 12 independent questions across 4 levels
  - a checklist
  - a 5-question quiz

  The unit also has an end-of-unit assessment (16 questions, with results by lesson and recommendations) and a challenge check. A practice bank has 10 further skills from later units.
- **Stage 5: progress.**
  - Optional student profile.
  - Mastery comes only from evidence. "Completed" means the quiz has been taken. "Secure" means best quiz ≥ 75% (80% in round 1), at least 6 answers, and ≥ 70% of the last 10 answers right first time.
  - Confidence ratings are recorded separately.
  - Dashboard: recommended next lesson, recent lessons, accuracy by strand, strongest and weakest lessons, revision tasks and scores.
  - Foundation and Higher revision checklists, plus a revision planner.
  - Students can export, import and reset their progress.
- **GCSE page:** tiers, exam structure for each board (checked November 2026), formulae sheet note, command words, mark types, and 6 exam-style questions with M/A/B mark schemes and self-marking.
- **Tutor and parent view:** a read-only report from a progress file the student exports. It is clearly labelled as not secure.
- **Testing:**
  - Every generator: 2,000 seeds, checking the correct answer is accepted and every trap is rejected.
  - Checker and mastery-rule tests.
  - Browser tests of all 23 routes at desktop and mobile widths: no errors and no horizontal overflow.
  - End-to-end tests of answering, hints, quizzes, drag-and-drop, profile, persistence after reload, the planner and assessments.

### Round 2: Moll's Maths and all of Year 10
- **Rebrand:** renamed to Moll's Maths. The dark blue is replaced with pale green, always used as a fill under dark green text so contrast stays accessible. A deeper green (`--brand-strong`) is used for links and borders, because pale green text would be too faint to read.
- **Light lesson format** (`data/lessons/light.js`): the same A–M structure, with shorter teaching (one or two steps), 2 worked examples and 2 common mistakes. There are **two question levels**: Core and Extend.
  - Guided practice: 2 questions
  - Independent practice: 6 questions (3 Core, 3 Extend)
  - Quiz: 4 questions
- **Diagram questions are 3-option multiple choice.** New diagrams: coordinate graphs (curves, lines, shaded regions, histogram bars), shapes marked "Not drawn accurately", box plots and Venn diagrams.
- **Year 10 is complete:** all 12 units and 64 lessons, with 128 generators (Core and Extend for each lesson). Each unit has an end-of-unit check, with one Core and one Extend question per lesson.
- **Engine additions:**
  - "factorised", "simplified fraction" and "single fraction" checks for algebra answers
  - question level labels
  - the secure threshold changed to 75%, so a 4-question quiz can show mastery at 3/4
- **Testing:**
  - Every generator runs for 2,000 seeds: the correct answer must be accepted and every trap rejected (885,000+ checks, 0 failures).
  - All 64 Year 10 lessons were opened in a browser with no errors.
  - Desktop and mobile widths show no horizontal overflow.

### Round 3: all of Year 9
- **Year 9 is complete:** all 13 units and 67 lessons, in the same light format as Year 10 (Core and Extend questions, diagram questions as 3-option multiple choice). Each unit has an end-of-unit check.
- **New question types and diagrams:**
  - inequality number lines with open and filled circles
  - triangles with any vertex names (for labelling sides and finding the hypotenuse)
  - bearing diagrams
  - distance-time, conversion and time-series graphs
- **Reused generators:** where a Year 9 skill is exactly one already built for Year 10, the same generator is reused (`reuse()` in helpers.js). Examples: expanding brackets, inverse proportion, Venn diagrams, finding a side with trigonometry. Each Year 9 lesson still has its own Core and Extend pair, and its progress is tracked separately.
- **Testing:**
  - Every generator runs for 2,000 seeds (1.5 million checks across the platform, 0 failures).
  - All 67 Year 9 lessons opened in a browser with no errors.
  - All pages were checked at desktop and mobile widths.

### Round 4: all of Years 7 and 8
- **Year 7 is complete:** Units 2–12 (68 lessons) were added in the light format, alongside the existing full-format Unit 1. All 12 units and 76 lessons are written.
- **Year 8 is complete:** all 12 units and 66 lessons in the light format, from negative numbers and powers through to probability.
- Each new unit has an end-of-unit check, with one Core and one Extend question per lesson.
- **Diagram questions are 3-option multiple choice**, as before. New ones include reading coordinates, naming horizontal and vertical lines, mirror lines, translation vectors, scale factors, scatter graphs and lines of best fit.
- **Reused generators:** where a Year 7 or 8 skill is the same as one already built (for example, HCF and LCM, multipliers or gradient), that generator is reused. Every lesson still tracks its progress separately.
- **Display fix:** a hyphen in front of a number (such as "x = -3") is now always shown as a proper minus sign (−), on every page.
- **Testing:**
  - Every generator runs for 2,000 seeds (2.6 million checks across the platform, 0 failures).
  - All 142 Year 7 and 8 lessons were opened in a browser. Each showed 6 practice questions, a 4-question quiz, no placeholder and no errors.
  - All pages were checked at desktop and mobile widths.

### Round 5: all of Year 11
- **Year 11 is complete:** 9 units and 42 lessons in the light format. Topics run from vectors, further graphs, bounds and rates of change through circle equations and circle theorems, transformations and exam technique. All 315 lessons across Years 7–11 are now written.
- **New circle diagram** (`CircleDiagram` in Diagram.jsx): draws points on a circle by angle, external points, chords, a tangent and labelled angles, with "Not drawn accurately" shown every time. The centre label "O" is placed away from the radii so it never sits on a line.
- **Diagram questions are 3-option multiple choice**, as before. New ones include cubic, reciprocal and exponential graphs, velocity-time graphs, circle theorems and scale factors.
- **Mixed practice:** Unit 9 lessons draw a different skill from earlier years each time, so exam practice is varied.
- **Reused generators:** where a skill matches an earlier one (for example, rounding, ratio or inverse proportion), that generator is reused. Every lesson still tracks its progress separately.
- **Testing:**
  - Every generator runs for 2,000 seeds (3.0 million checks across the platform, 0 failures).
  - All 42 Year 11 lessons were opened in a browser. Each showed 6 practice questions, a 4-question quiz, no placeholder and no errors.
  - The circle theorem diagrams were checked by eye for overlapping labels.
  - All pages were checked at desktop and mobile widths.

### Honest limitations
- Progress is saved **only in this browser** (localStorage). There are no accounts, no syncing between devices, and clearing browser data deletes it. The site says this wherever progress is shown.
- The contact form checks your entries but **does not send** anything.
- There are no full timed mock papers yet. The mock-paper page says so.
- Lessons in Years 7–11 (apart from Year 7 Unit 1) use the lighter format by request: fewer questions per lesson than the brief's original "at least 10 across 4 levels". "New questions" gives unlimited fresh practice.

### Still to develop
1. More diagram types: angle diagrams and tree diagrams.
2. Full timed GCSE mock papers.
3. **Stage 6:** a backend (e.g. Supabase) with secure accounts, student and tutor roles, classes, assignments and a content editor.
4. **Stage 7:** an accessibility audit with screen-reader users, and review of the content by a maths teacher.

## Worksheets (printable PDFs)

There are 478 printable worksheets. Each one has practice questions, then
problem solving, then the answers on the last page. They appear in three
places on the site:

- the **Worksheets page** (`/worksheets`), with search and topic filters
- each **lesson page**, in a "Practise on paper" box at the end of
  Independent practice
- each **unit page**, under "Worksheets for this unit"

All three use the same component, `src/components/WorksheetList.jsx`.

### Which worksheets go with which lesson

`src/data/lessonWorksheets.js` pairs each lesson id (e.g. `y7-u1-l3`) with
a list of worksheet names (the PDF file names without `.pdf`). To change
which worksheets a lesson shows, edit that list. The first in the list is
shown first.

### Making or changing the PDFs

The PDFs are made by a small Python program in `worksheets-src/`, not by hand:

- `worksheets-src/topics/` holds the questions and answers. Each file covers
  a group of topics, and its `SHEETS` list at the bottom says which function
  builds which worksheet.
- `worksheets-src/engine/` holds the shared layout, the diagram drawing and
  the algebra answer checker.
- `worksheets-src/worksheet-list.csv` is the master list: each worksheet's
  title, topic and level. To change a title, topic or level, edit the CSV.

To rebuild (it needs `pip install reportlab`), run from this folder:

```
python3 worksheets-src/build.py --publish
```

This writes the PDFs, copies them into `public/worksheets/` and rewrites
`src/data/worksheets.js`, the list the site reads. Without `--publish` it
only writes the PDFs to `worksheets-src/output/`, so you can check them
before the website changes. Add part of a name to rebuild just those
worksheets, e.g. `python3 worksheets-src/build.py fractions`.
