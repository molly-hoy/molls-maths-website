/* Quizzes and assessments: the list, and the page that runs one. */
import { Link, useParams } from "react-router-dom";
import { ASSESSMENTS, getAssessment } from "../data/assessments.js";
import { getLesson } from "../data/curriculum.js";
import { FULL_LESSON_IDS } from "../data/lessons/index.js";
import { lessonEvidence } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import TestRunner from "../components/TestRunner.jsx";
import { StatusPill } from "../components/ui.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import styles from "./pages.module.css";

export function AssessmentsPage() {
  const { state } = useProgress();
  return (
    <div className="container">
      <header className="page-head">
        <h1>Quizzes and assessments</h1>
        <p className="lead">Assessments are made fresh each time from the question generators, so you can retake them without just remembering answers. Every result is broken down by lesson.</p>
      </header>

      <section className="section" aria-labelledby="as">
        <h2 id="as">Assessments</h2>
        <div className="grid-auto">
          {ASSESSMENTS.map((a) => {
            const last = state.assessments[a.id]?.[0];
            return (
              <article key={a.id} className="card" style={{ display: "grid", gap: "0.5rem", alignContent: "start" }}>
                <h3 style={{ margin: 0 }}>{a.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>{a.generators.length} questions · about {a.minutes} minutes · {a.calculator ? "calculator allowed" : "non-calculator"}</p>
                <p style={{ margin: 0 }}>{a.description}</p>
                {last && <p style={{ margin: 0, fontSize: "0.9rem" }}><strong>Last score:</strong> {last.score}/{last.total} ({new Date(last.date).toLocaleDateString("en-GB")})</p>}
                <div><Link to={`/assessments/${a.id}`} className="btn btn-small">{last ? "Retake" : "Start"}</Link></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="qz">
        <h2 id="qz">Lesson quizzes</h2>
        <p>Every fully written lesson ends with a five-question quiz (section L). Completing it marks the lesson as completed.</p>
        <ol className={styles.lessonTable}>
          {FULL_LESSON_IDS.map((id) => {
            const l = getLesson(id);
            const e = lessonEvidence(state, id);
            return (
              <li key={id}>
                <Link to={`/lesson/${id}#quiz`} className={styles.lessonRow}>
                  <span className={styles.lessonNo}>{l.number}</span>
                  <span className={styles.lessonTitle}>{l.title}</span>
                  <span className={styles.lessonRight}>{e.bestQuiz !== null && <span className="muted">Best {e.bestQuiz}%</span>}<StatusPill status={e.status} /></span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section">
        <h2>GCSE exam-style questions</h2>
        <p>Questions with full mark schemes (method and accuracy marks) are on the <Link to="/gcse#exam-q">GCSE page</Link>.</p>
      </section>
    </div>
  );
}

export function AssessmentRunPage() {
  const { assessmentId } = useParams();
  const a = getAssessment(assessmentId);
  const { dispatch } = useProgress();
  if (!a) return <NotFoundPage />;

  const summary = ({ questions, results }) => {
    const by = {};
    questions.forEach((q, i) => {
      by[q.skill] ??= { correct: 0, total: 0 };
      by[q.skill].total += 1;
      by[q.skill].correct += results[i].status === "correct" ? 1 : 0;
    });
    const weak = Object.entries(by).filter(([, v]) => v.correct < v.total);
    return (
      <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "0.75rem 1rem", width: "100%" }}>
        <p style={{ fontWeight: 600, marginBottom: "0.4rem" }}>Results by lesson</p>
        <ul style={{ display: "grid", gap: "0.25rem", fontSize: "0.95rem" }}>
          {Object.entries(by).map(([skill, v]) => <li key={skill}>{getLesson(skill)?.title ?? skill}: {v.correct}/{v.total}</li>)}
        </ul>
        <p style={{ fontWeight: 600, margin: "0.75rem 0 0.4rem" }}>{weak.length ? "Recommended to revisit" : "Excellent: nothing to revisit from this assessment."}</p>
        {weak.length > 0 && <ul style={{ display: "grid", gap: "0.25rem" }}>{weak.map(([skill]) => <li key={skill}><Link to={`/lesson/${skill}`}>{getLesson(skill)?.title}</Link></li>)}</ul>}
      </div>
    );
  };

  return (
    <div className="container">
      <header className="page-head">
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link to="/assessments">Quizzes and assessments</Link> / <span>{a.title}</span></nav>
        <h1>{a.title}</h1>
        <p className="lead">{a.description}</p>
        <p className="notice notice-info">{a.calculator ? "You may use a calculator." : "No calculator: use written methods."} Suggested time: {a.minutes} minutes. Hints are not available in assessments. Feedback and worked solutions appear after you submit.</p>
      </header>
      <TestRunner
        key={a.id}
        generators={a.generators}
        renderSummary={summary}
        onComplete={({ score, total, byLesson }) => dispatch({ type: "recordAssessment", assessmentId: a.id, score, total, byLesson })}
      />
    </div>
  );
}
