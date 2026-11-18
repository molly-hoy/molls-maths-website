/* ==========================================================================
   Student progress: the rules
   --------------------------------------------------------------------------
   Pure functions only (no React), so the rules are easy to read and test.

   HOW MASTERY IS DECIDED (the brief says mastery must come from evidence,
   never from simply opening a lesson):
     • every checked answer is stored against the skill (lesson) it tests
     • a lesson is COMPLETED once its quiz has been attempted
     • a lesson is SECURE when
         – the best quiz score is at least 75%, AND
         – at least 6 questions have been answered, AND
         – at least 70% of the most recent 10 answers were right first time
     • a lesson NEEDS PRACTICE when at least 3 answers are recorded and fewer
       than half of the recent ones were right
   Confidence ratings (1–3) are the student's own view. They are shown next
   to the evidence but never change the mastery status.
   ========================================================================== */
import { ALL_LESSONS, ALL_UNITS, getLesson, getUnit } from "../data/curriculum.js";

export const STORAGE_KEY = "molls-maths-progress-v1";

export const emptyProgress = () => ({
  version: 1,
  profile: null,       // { name, year, createdAt }
  skills: {},          // lessonId → { attempted, correct, recent: [true, false, …] }
  quizzes: {},         // lessonId → [{ score, total, date }]
  assessments: {},     // assessmentId → [{ score, total, date, byLesson }]
  confidence: {},      // lessonId → 1 | 2 | 3
  visits: [],          // [{ lessonId, date }], newest first
  activity: [],        // [{ kind, lessonId, detail, date }], newest first
  planner: null,       // revision planner settings
});

const RECENT = 10;
const cap = (list, n) => list.slice(0, n);

/* ---------------- The reducer: every change goes through here ---------------- */
export function progressReducer(state, action) {
  const now = new Date().toISOString();
  switch (action.type) {
    case "setProfile":
      return { ...state, profile: { ...action.profile, createdAt: state.profile?.createdAt ?? now } };

    case "recordAnswer": {
      // { lessonId, correct, source }
      const old = state.skills[action.lessonId] ?? { attempted: 0, correct: 0, recent: [] };
      const skill = {
        attempted: old.attempted + 1,
        correct: old.correct + (action.correct ? 1 : 0),
        recent: cap([action.correct, ...old.recent], RECENT),
      };
      return { ...state, skills: { ...state.skills, [action.lessonId]: skill } };
    }

    case "recordQuiz": {
      const entry = { score: action.score, total: action.total, date: now };
      const list = cap([entry, ...(state.quizzes[action.lessonId] ?? [])], 20);
      return {
        ...state,
        quizzes: { ...state.quizzes, [action.lessonId]: list },
        activity: cap([{ kind: "quiz", lessonId: action.lessonId, detail: `${action.score}/${action.total}`, date: now }, ...state.activity], 30),
      };
    }

    case "recordAssessment": {
      const entry = { score: action.score, total: action.total, byLesson: action.byLesson, date: now };
      const list = cap([entry, ...(state.assessments[action.assessmentId] ?? [])], 20);
      return {
        ...state,
        assessments: { ...state.assessments, [action.assessmentId]: list },
        activity: cap([{ kind: "assessment", assessmentId: action.assessmentId, detail: `${action.score}/${action.total}`, date: now }, ...state.activity], 30),
      };
    }

    case "visitLesson": {
      const visits = cap([{ lessonId: action.lessonId, date: now }, ...state.visits.filter((v) => v.lessonId !== action.lessonId)], 12);
      return { ...state, visits };
    }

    case "setConfidence":
      return { ...state, confidence: { ...state.confidence, [action.lessonId]: action.value } };

    case "setPlanner":
      return { ...state, planner: action.planner };

    case "import":
      return { ...emptyProgress(), ...action.data };

    case "reset":
      return emptyProgress();

    default:
      return state;
  }
}

/* ---------------- Reading the evidence ---------------- */
const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);

export function lessonEvidence(state, lessonId) {
  const skill = state.skills[lessonId] ?? { attempted: 0, correct: 0, recent: [] };
  const quizzes = state.quizzes[lessonId] ?? [];
  const best = quizzes.reduce((m, q) => Math.max(m, q.score / q.total), -1);
  const recentRight = skill.recent.filter(Boolean).length;
  const recentAccuracy = skill.recent.length ? recentRight / skill.recent.length : null;
  const visited = state.visits.some((v) => v.lessonId === lessonId);

  let status = "not-started";
  if (visited || skill.attempted > 0) status = "started";
  if (quizzes.length > 0) status = "completed";
  if (best >= 0.75 && skill.attempted >= 6 && recentAccuracy >= 0.7) status = "secure";
  if (skill.attempted >= 3 && recentAccuracy !== null && recentAccuracy < 0.5) status = "needs-practice";

  return {
    status,
    completed: quizzes.length > 0, // the quiz has been taken (even if the result was weak)
    attempted: skill.attempted,
    correct: skill.correct,
    accuracy: pct(skill.correct, skill.attempted),
    recentAccuracy: recentAccuracy === null ? null : Math.round(recentAccuracy * 100),
    bestQuiz: best >= 0 ? Math.round(best * 100) : null,
    quizCount: quizzes.length,
    confidence: state.confidence[lessonId] ?? null,
  };
}

export const STATUS_INFO = {
  "not-started": { label: "Not started", tone: "neutral" },
  started: { label: "In progress", tone: "info" },
  completed: { label: "Quiz done", tone: "info" },
  secure: { label: "Secure", tone: "good" },
  "needs-practice": { label: "Needs practice", tone: "warning" },
};

export function unitSummary(state, unitId) {
  const unit = getUnit(unitId);
  const items = unit.lessons.map((l) => lessonEvidence(state, l.id));
  const secure = items.filter((e) => e.status === "secure").length;
  const completed = items.filter((e) => e.completed).length;
  return { total: items.length, secure, completed, percent: pct(completed, items.length) ?? 0 };
}

// Accuracy per strand, from every answer recorded.
export function strandSummary(state) {
  const totals = {};
  for (const [lessonId, skill] of Object.entries(state.skills)) {
    const lesson = getLesson(lessonId);
    if (!lesson) continue;
    const strand = getUnit(lesson.unitId).strand;
    totals[strand] ??= { attempted: 0, correct: 0 };
    totals[strand].attempted += skill.attempted;
    totals[strand].correct += skill.correct;
  }
  return Object.entries(totals).map(([strand, t]) => ({ strand, ...t, accuracy: pct(t.correct, t.attempted) }));
}

/* The next lesson to do: the first lesson with teaching content, in the
   student's year first, that isn't completed yet. If everything available
   is done, suggest the weakest lesson to revisit. */
export function recommendNext(state) {
  const year = state.profile?.year ?? 7;
  const available = ALL_LESSONS.filter((l) => l.status === "full");
  const ordered = [...available.filter((l) => getUnit(l.unitId).year === year), ...available];
  const next = ordered.find((l) => !lessonEvidence(state, l.id).completed);
  if (next) return { lesson: next, reason: lessonEvidence(state, next.id).status === "not-started" ? "Next lesson in your course" : "You've started this lesson: finish it with the quiz" };
  const weakest = weakestLessons(state, 1)[0];
  return weakest ? { lesson: getLesson(weakest.lessonId), reason: "Your weakest lesson: worth another look" } : null;
}

export function weakestLessons(state, n = 5) {
  return Object.keys(state.skills)
    .map((lessonId) => ({ lessonId, ...lessonEvidence(state, lessonId) }))
    .filter((e) => e.attempted >= 3 && getLesson(e.lessonId))
    .sort((a, b) => (a.recentAccuracy ?? 0) - (b.recentAccuracy ?? 0))
    .slice(0, n);
}

export function strongestLessons(state, n = 5) {
  return Object.keys(state.skills)
    .map((lessonId) => ({ lessonId, ...lessonEvidence(state, lessonId) }))
    .filter((e) => e.attempted >= 3 && getLesson(e.lessonId))
    .sort((a, b) => (b.recentAccuracy ?? 0) - (a.recentAccuracy ?? 0))
    .slice(0, n);
}

// Revision tasks: lessons flagged by evidence, then lessons the student rated low.
export function revisionTasks(state) {
  const tasks = [];
  for (const lessonId of new Set([...Object.keys(state.skills), ...Object.keys(state.confidence)])) {
    if (!getLesson(lessonId)) continue;
    const e = lessonEvidence(state, lessonId);
    if (e.status === "needs-practice") tasks.push({ lessonId, reason: `Only ${e.recentAccuracy}% of your recent answers were right`, priority: 1 });
    else if (e.confidence === 1) tasks.push({ lessonId, reason: "You rated your confidence as low", priority: 2 });
    else if (e.status === "completed") tasks.push({ lessonId, reason: `Best quiz score ${e.bestQuiz}%: aim for 75% or more to make it secure`, priority: 3 });
  }
  return tasks.sort((a, b) => a.priority - b.priority);
}

export const unitsForYear = (year) => ALL_UNITS.filter((u) => u.year === year);
