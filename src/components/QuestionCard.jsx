/* ==========================================================================
   QuestionCard: one question, in one of two modes
   --------------------------------------------------------------------------
   mode="practice"  (guided and independent practice)
     • check as often as you like, with feedback each time
     • hints are revealed one at a time, only when asked for
     • the worked solution unlocks only AFTER a first attempt, so the
       answer is never shown before the student has tried
     • the first real attempt is reported with onAnswer({ correct }):
       that is the evidence used for mastery. An answer only counts as
       "right first time" if the student used fewer than all the hints.

   mode="test"  (quizzes and assessments)
     • no hints; the parent component collects answers and marks them all
       at once, then passes `result` back so feedback and solutions show
   ========================================================================== */
import { useId, useState } from "react";
import { checkResponse, emptyResponse } from "../engine/check.js";
import { LEVELS } from "../engine/generate.js";
import AnswerInput from "./AnswerInput.jsx";
import Diagram from "./Diagram.jsx";
import { MathText } from "./ui.jsx";
import styles from "./QuestionCard.module.css";

export default function QuestionCard({ question, number, mode = "practice", onAnswer, value: controlledValue, onChange: controlledChange, result: controlledResult, showLevel = true }) {
  const id = useId();
  const [ownValue, setOwnValue] = useState(() => emptyResponse(question));
  const [ownResult, setOwnResult] = useState(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const isTest = mode === "test";
  const value = isTest ? controlledValue : ownValue;
  const setValue = isTest ? controlledChange : setOwnValue;
  const result = isTest ? controlledResult : ownResult;
  const solved = result?.status === "correct";
  const locked = isTest ? Boolean(controlledResult) : solved;

  function check() {
    const r = checkResponse(question, value);
    setOwnResult(r);
    if (r.status !== "invalid" && !attempted) {
      setAttempted(true);
      onAnswer?.({ correct: r.status === "correct" && hintsShown < question.hints.length, hintsUsed: hintsShown });
    }
  }

  const canSeeSolution = isTest ? Boolean(controlledResult) : attempted;

  return (
    <article className={styles.card} aria-labelledby={`${id}-title`}>
      <header className={styles.head}>
        <h4 id={`${id}-title`} className={styles.number}>Question {number}</h4>
        {showLevel && <span className={styles.level}>{question.levelName ?? `${LEVELS[question.level].name}: ${LEVELS[question.level].label}`}</span>}
      </header>

      <p className={styles.prompt}><MathText>{question.prompt}</MathText></p>
      {question.diagram && <Diagram spec={question.diagram} />}

      {question.type === "multistep" ? (
        <div className={styles.steps}>
          {question.steps.map((step, i) => {
            const stepResult = result?.stepResults?.[i];
            return (
              <div key={i} className={styles.step}>
                <AnswerInput
                  question={step}
                  id={`${id}-s${i}`}
                  label={step.prompt}
                  value={value[i]}
                  disabled={locked || stepResult?.status === "correct"}
                  onChange={(v) => setValue(value.map((old, j) => (j === i ? v : old)))}
                  onSubmit={isTest ? undefined : check}
                />
                {stepResult && <span className={stepResult.status === "correct" ? styles.stepOk : styles.stepNo}>{stepResult.status === "correct" ? "✓ Correct" : stepResult.status === "invalid" ? "Check the format" : "✗ Not yet"}</span>}
              </div>
            );
          })}
        </div>
      ) : (
        <AnswerInput question={question} id={id} value={value} onChange={setValue} disabled={locked} onSubmit={isTest ? undefined : check} />
      )}

      {/* Feedback, announced to screen readers as it changes */}
      <div aria-live="polite" className={styles.feedbackArea}>
        {result && (
          <p className={`${styles.feedback} ${styles[result.status]}`}>
            <strong>{result.status === "correct" ? "✓ Correct. " : result.status === "invalid" ? "Check your answer format. " : "✗ Not quite. "}</strong>
            {result.status !== "correct" && result.message}
            {result.status === "correct" && !isTest && hintsShown === question.hints.length && " (You used every hint, so this one won't count towards mastery yet. Try another without hints!)"}
          </p>
        )}
      </div>

      {!isTest && (
        <div className={styles.actions}>
          {!solved && <button type="button" className="btn btn-small" onClick={check}>Check answer</button>}
          {!solved && hintsShown < question.hints.length && (
            <button type="button" className="btn btn-secondary btn-small" onClick={() => setHintsShown((n) => n + 1)}>
              {hintsShown === 0 ? "Show a hint" : "Next hint"} ({hintsShown + 1} of {question.hints.length})
            </button>
          )}
          {canSeeSolution && (
            <button type="button" className="btn btn-quiet btn-small" aria-expanded={showSolution} onClick={() => setShowSolution((s) => !s)}>
              {showSolution ? "Hide worked solution" : "Show worked solution"}
            </button>
          )}
          {!canSeeSolution && <span className={styles.lockNote}>The worked solution unlocks after your first attempt.</span>}
        </div>
      )}

      {hintsShown > 0 && !isTest && (
        <ol className={styles.hints} aria-label="Hints">
          {question.hints.slice(0, hintsShown).map((h, i) => (
            <li key={i}><span className={styles.hintLabel}>Hint {i + 1}</span> <MathText>{h}</MathText></li>
          ))}
        </ol>
      )}

      {(showSolution || (isTest && controlledResult && controlledResult.status !== "correct")) && canSeeSolution && (
        <div className={styles.solution}>
          <h5>Worked solution</h5>
          <ol>
            {question.solution.map((s, i) => <li key={i}><MathText>{s}</MathText></li>)}
          </ol>
          <p className={styles.answer}><strong>Answer:</strong> <MathText>{question.answerText}</MathText></p>
        </div>
      )}
    </article>
  );
}
