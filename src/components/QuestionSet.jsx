/* ==========================================================================
   QuestionSet: a block of practice questions
   --------------------------------------------------------------------------
   Makes one question from each generator, using a random seed. "New
   questions" simply picks a new seed. Each first attempt is saved as
   evidence for the skill it tests, and a running score is shown.
   ========================================================================== */
import { useMemo, useState } from "react";
import { makeSet } from "../engine/generate.js";
import { randomSeed } from "../engine/random.js";
import { useProgress } from "../state/ProgressContext.jsx";
import QuestionCard from "./QuestionCard.jsx";
import styles from "./QuestionSet.module.css";

export default function QuestionSet({ generators, startNumber = 1, showLevel = true, label = "questions" }) {
  const { dispatch } = useProgress();
  const [seed, setSeed] = useState(randomSeed);
  const [score, setScore] = useState({ answered: 0, correct: 0 });

  // Questions are rebuilt only when the seed or generators change.
  const { questions, error } = useMemo(() => {
    try {
      return { questions: makeSet(generators, seed), error: null };
    } catch (e) {
      return { questions: [], error: e.message };
    }
  }, [generators, seed]);

  function handleAnswer(question, { correct }) {
    dispatch({ type: "recordAnswer", lessonId: question.skill, correct, source: "practice" });
    setScore((s) => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));
  }

  if (error) {
    return <p className="notice notice-warning">Sorry, these questions couldn't be created ({error}). Please try “New questions”.</p>;
  }

  return (
    <div className={styles.set}>
      <div className={styles.bar}>
        <p className={styles.score} aria-live="polite">
          {score.answered === 0 ? `${questions.length} ${label}` : `Right first time: ${score.correct} of ${score.answered} answered`}
        </p>
        <button type="button" className="btn btn-secondary btn-small" onClick={() => { setSeed(randomSeed()); setScore({ answered: 0, correct: 0 }); }}>
          ↻ New questions
        </button>
      </div>
      <div className={styles.list}>
        {questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} number={startNumber + i} showLevel={showLevel} onAnswer={(r) => handleAnswer(q, r)} />
        ))}
      </div>
    </div>
  );
}
