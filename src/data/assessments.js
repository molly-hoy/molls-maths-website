/* ==========================================================================
   Assessments
   --------------------------------------------------------------------------
   Each assessment is a list of generators. Questions are made fresh for
   every attempt, so a student can retake an assessment without simply
   remembering the answers. Results are broken down by lesson, so the
   platform can recommend exactly what to revisit.
   ========================================================================== */
import { Y7U1_GENERATORS } from "../engine/generators/y7u1.js";
import { BANK_GENERATORS } from "../engine/generators/bank.js";
import { ALL_UNITS } from "./curriculum.js";
import { generatorsFor } from "./lessons/index.js";

const lv = (lessonId, level) => Y7U1_GENERATORS[lessonId].find((g) => g.level === level);

export const ASSESSMENTS = [
  {
    id: "y7-u1-end",
    title: "Year 7 Unit 1: end-of-unit assessment",
    unitId: "y7-u1",
    description: "16 questions covering all eight lessons of Place value and number: two per lesson, at Levels 2 and 3. You'll get a breakdown by lesson and a list of what to revisit.",
    calculator: false,
    minutes: 30,
    generators: ["y7-u1-l1", "y7-u1-l2", "y7-u1-l3", "y7-u1-l4", "y7-u1-l5", "y7-u1-l6", "y7-u1-l7", "y7-u1-l8"].flatMap((id) => [lv(id, 2), lv(id, 3)]),
  },
  {
    id: "y7-u1-challenge",
    title: "Year 7 Unit 1: challenge check",
    unitId: "y7-u1",
    description: "8 Level 4 problem-solving questions, one from each lesson. A stretch for students who are already secure.",
    calculator: false,
    minutes: 20,
    generators: ["y7-u1-l1", "y7-u1-l2", "y7-u1-l3", "y7-u1-l4", "y7-u1-l5", "y7-u1-l6", "y7-u1-l7", "y7-u1-l8"].map((id) => lv(id, 4)),
  },
  {
    id: "skills-check",
    title: "Mixed skills check (KS3 to GCSE)",
    unitId: null,
    description: "10 questions from the skills practice bank: fractions, percentages, algebra, equations, Pythagoras, averages and a multi-step problem. Useful as a quick diagnostic before the full lessons for these topics are released.",
    calculator: true,
    minutes: 25,
    generators: BANK_GENERATORS,
  },
];

/* End-of-unit checks for every Year 7 to 11 unit (apart from Year 7 Unit 1) whose lessons are all written:
   one Core and one Extend question per lesson. */
for (const unit of ALL_UNITS.filter((u) => [7, 8, 9, 10, 11].includes(u.year) && u.id !== "y7-u1" && u.lessons.every((l) => l.status === "full"))) {
  const n = unit.id.split("-u")[1];
  ASSESSMENTS.push({
    id: `${unit.id}-end`,
    title: `Year ${unit.year} Unit ${n}: end-of-unit check`,
    unitId: unit.id,
    description: `${unit.lessons.length * 2} questions on ${unit.title}: one Core and one Extend question from each lesson, with results by lesson.`,
    calculator: true,
    minutes: unit.lessons.length * 5,
    generators: unit.lessons.flatMap((l) => generatorsFor(l.id)),
  });
}

export const getAssessment = (id) => ASSESSMENTS.find((a) => a.id === id);
