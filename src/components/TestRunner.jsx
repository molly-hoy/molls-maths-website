/* ==========================================================================
   TestRunner: quizzes and assessments
   --------------------------------------------------------------------------
   The student answers every question, then submits once. Only then are
   answers marked, feedback shown and worked solutions unlocked. Each answer
   is saved as evidence for its skill, and onComplete receives the score
   broken down by lesson, so the page can recommend what to revisit.
   ========================================================================== */
import { useMemo, useState } from "react";
import { checkResponse, emptyResponse } from "../engine/check.js";
import { makeSet } from "../engine/generate.js";
import { randomSeed } from "../engine/random.js";
import { useProgress } from "../state/ProgressContext.jsx";
import QuestionCard from "./QuestionCard.jsx";
import styles from "./TestRunner.module.css";

const isBlank = (q, v) =>
  q.type === "multistep" ? v.some((s) => String(s).trim() === "")
  : q.type === "match" ? v.some((s) => !s)
  : q.type === "order" ? false
  : String(v ?? "").trim() === "";

export default function TestRunner({ generators, onComplete, renderSummary, submitLabel = "Submit and mark" }) {
  const { dispatch } = useProgress();
  const [seed, setSeed] = useState(randomSeed);
  const questions = useMemo(() => makeSet(generators, seed), [generators, seed]);
  const [values, setValues] = useState(() => questions.map(emptyResponse));
  const [results, setResults] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const blanks = questions.filter((q, i) => isBlank(q, values[i])).length;

  function submit() {
    if (blanks > 0 && !confirming) { setConfirming(true); return; }
    const marked = questions.map((q, i) => {
      const r = checkResponse(q, values[i]);
      // An unreadable or blank answer counts as incorrect in a test.
      return r.status === "invalid" ? { ...r, status: "incorrect", message: "No valid answer was given. " + r.message } : r;
    });
    setResults(marked);
    setConfirming(false);

    const byLesson = {};
    questions.forEach((q, i) => {
      const correct = marked[i].status === "correct";
      dispatch({ type: "recordAnswer", lessonId: q.skill, correct, source: "test" });
      byLesson[q.skill] ??= { correct: 0, total: 0 };
      byLesson[q.skill].total += 1;
      byLesson[q.skill].correct += correct ? 1 : 0;
    });
    const score = marked.filter((r) => r.status === "correct").length;
    onComplete?.({ score, total: questions.length, byLesson });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    const next = randomSeed();
    setSeed(next);
    setValues(makeSet(generators, next).map(emptyResponse));
    setResults(null);
    setConfirming(false);
  }

  const score = results ? results.filter((r) => r.status === "correct").length : 0;

  return (
    <div className={styles.runner}>
      {results && (
        <div className={styles.summary} role="status">
          <p className={styles.bigScore}>{score} / {questions.length}</p>
          <p>{Math.round((score / questions.length) * 100)}% correct. Scroll down to see feedback and a worked solution for each question you got wrong.</p>
          {renderSummary?.({ score, total: questions.length, questions, results })}
          <button type="button" className="btn" onClick={restart}>Try a new version</button>
        </div>
      )}

      <div className={styles.list}>
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            number={i + 1}
            mode="test"
            value={values[i]}
            onChange={(v) => setValues((all) => all.map((old, j) => (j === i ? v : old)))}
            result={results?.[i] ?? null}
          />
        ))}
      </div>

      {!results && (
        <div className={styles.submit}>
          {confirming && <p className="notice notice-warning">You have {blanks} unanswered question{blanks === 1 ? "" : "s"}. Blank answers are marked as incorrect. Submit anyway?</p>}
          <div className={styles.submitRow}>
            <button type="button" className="btn" onClick={submit}>{confirming ? "Yes, submit now" : submitLabel}</button>
            {confirming && <button type="button" className="btn btn-secondary" onClick={() => setConfirming(false)}>Keep working</button>}
            <span className="muted">{questions.length - blanks} of {questions.length} answered</span>
          </div>
        </div>
      )}
    </div>
  );
}
