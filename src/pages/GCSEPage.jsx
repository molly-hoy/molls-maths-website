/* ==========================================================================
   GCSE Mathematics: tiers, exam structure, command words, mark schemes,
   and exam-style questions with self-marking against a mark scheme.
   ========================================================================== */
import { useState } from "react";
import { Link } from "react-router-dom";
import { COMMAND_WORDS, EXAM_BOARDS, EXAM_QUESTIONS, FORMULAE_NOTE, MARK_TYPES, TIERS } from "../data/gcse.js";
import { checkAnswer } from "../engine/check.js";
import AnswerInput from "../components/AnswerInput.jsx";
import { MathText, Placeholder, StrandTag, TierBadge } from "../components/ui.jsx";
import CurriculumMapPage from "./CurriculumMapPage.jsx";
import styles from "./pages.module.css";

function ExamQuestion({ q }) {
  const [values, setValues] = useState(q.check.map(() => ""));
  const [results, setResults] = useState(null);
  const [marks, setMarks] = useState(q.markScheme.map(() => false));

  const submit = () => setResults(q.check.map((c, i) => checkAnswer(c, values[i])));
  const answered = results && results.every((r) => r.status !== "invalid");
  const allRight = answered && results.every((r) => r.status === "correct");

  return (
    <article className="card" style={{ display: "grid", gap: "0.75rem" }}>
      <div className={styles.headRow} style={{ margin: 0 }}>
        <TierBadge tier={q.tier} grades={q.grade} />
        <StrandTag id={q.strand} />
        <span className="muted" style={{ fontSize: "0.85rem" }}>{q.calculator ? "Calculator allowed" : "Non-calculator"} · {q.marks} marks</span>
      </div>
      <p style={{ fontSize: "1.125rem", margin: 0 }}><MathText>{q.prompt}</MathText></p>
      <p className="muted" style={{ fontSize: "0.9rem", margin: 0 }}>Write your full working on paper, as you would in the exam, then enter your final answer.</p>
      {q.check.map((c, i) => (
        <div key={i}>
          <AnswerInput question={c} id={`${q.id}-${i}`} label={c.prompt} value={values[i]} disabled={allRight} onChange={(v) => setValues(values.map((old, j) => (j === i ? v : old)))} onSubmit={submit} />
          {results?.[i] && results[i].status !== "correct" && <p className="notice notice-warning" style={{ marginTop: "0.4rem" }}>{results[i].message}</p>}
        </div>
      ))}
      {!allRight && <div><button type="button" className="btn btn-small" onClick={submit}>Check final answer</button></div>}
      {allRight && <p className="notice notice-good" style={{ margin: 0 }}>✓ Your final answer is correct, which earns the final accuracy mark.</p>}

      {answered && (
        <div style={{ background: "var(--surface-2)", borderRadius: "10px", padding: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Mark scheme: tick the marks your working earns</h4>
          <div className={styles.markScheme}>
            {q.markScheme.map((m, i) => (
              <label key={i}>
                <input type="checkbox" checked={marks[i]} onChange={() => setMarks(marks.map((v, j) => (j === i ? !v : v)))} />
                <span className={styles.markCode}>{m.code}</span>
                <span>{m.text}</span>
              </label>
            ))}
          </div>
          <p style={{ margin: "0.75rem 0 0.5rem" }}><strong>Your mark: {marks.filter(Boolean).length} / {q.marks}</strong></p>
          <details>
            <summary>Model solution</summary>
            <ol style={{ paddingLeft: "1.3rem", marginTop: "0.5rem" }}>{q.solution.map((s, i) => <li key={i}>{s}</li>)}</ol>
          </details>
        </div>
      )}
    </article>
  );
}

export default function GCSEPage() {
  const [tier, setTier] = useState("all");
  const questions = EXAM_QUESTIONS.filter((q) => tier === "all" || q.tier === tier);
  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">Years 10 and 11 · Key Stage 4</p>
        <h1>GCSE Mathematics</h1>
        <p className="lead">The GCSE course is taught over Years 10 and 11 and assessed by three exam papers at the end of Year 11. Everything here applies to AQA, Pearson Edexcel and OCR; check with your teacher which board and tier you are entered for.</p>
      </header>

      <section className="section" aria-labelledby="tiers">
        <h2 id="tiers">Foundation and Higher tiers</h2>
        <div className="grid-auto">
          {TIERS.map((t) => (
            <div key={t.tier} className="card">
              <h3>{t.tier} tier</h3>
              <p><strong>{t.grades}</strong></p>
              <p>{t.who}</p>
              <p className="muted" style={{ margin: 0 }}>{t.content}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1rem" }}>Grade boundaries are set after each exam series and change from year to year, so no fixed marks are quoted here. Grades shown on lessons are <em>indicative</em>: roughly the grade at which a topic is usually examined.</p>
        <p><Link to="/revision/foundation">Foundation revision checklist</Link> · <Link to="/revision/higher">Higher revision checklist</Link></p>
      </section>

      <section className="section" aria-labelledby="papers">
        <h2 id="papers">The exam papers</h2>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th scope="col">Exam board</th><th scope="col">Specification</th><th scope="col">Papers</th><th scope="col">Marks</th><th scope="col">Non-calculator paper</th></tr></thead>
            <tbody>{EXAM_BOARDS.map((b) => <tr key={b.board}><td>{b.board}</td><td>{b.spec}</td><td>{b.papers}</td><td>{b.marks}</td><td>{b.nonCalc}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="notice notice-info" style={{ marginTop: "1rem" }}>{FORMULAE_NOTE}</p>
      </section>

      <section className="section" aria-labelledby="command">
        <h2 id="command">Command words</h2>
        <p>The first word of a question tells you what the examiner wants.</p>
        <dl className={styles.commandGrid}>
          {COMMAND_WORDS.map((c) => <div key={c.word}><dt>{c.word}</dt><dd>{c.meaning}</dd></div>)}
        </dl>
      </section>

      <section className="section" aria-labelledby="marks">
        <h2 id="marks">How marks are awarded</h2>
        <p>Most questions worth more than one mark have <strong>method marks</strong>. A correct method earns marks even with a wrong final answer, but an answer with no working may get nothing if it's wrong. <strong>Always show your working.</strong></p>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th scope="col">Code</th><th scope="col">Type</th><th scope="col">Meaning</th></tr></thead>
            <tbody>{MARK_TYPES.map((m) => <tr key={m.code}><td><strong>{m.code}</strong></td><td>{m.name}</td><td>{m.meaning}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="exam-q">
        <h2 id="exam-q">Exam-style questions</h2>
        <p>Original questions in the style of GCSE papers. The site checks your final answer; then you mark your own working against the mark scheme, just as examiners do.</p>
        <div className={styles.filterRow} role="group" aria-label="Filter by tier">
          {[["all", "All"], ["F", "Foundation"], ["H", "Higher"]].map(([v, l]) => <button key={v} type="button" className={styles.chip} aria-pressed={tier === v} onClick={() => setTier(v)}>{l}</button>)}
        </div>
        <div style={{ display: "grid", gap: "1rem" }}>
          {questions.map((q) => <ExamQuestion key={q.id} q={q} />)}
        </div>
      </section>

      <section className="section" aria-labelledby="mocks">
        <h2 id="mocks">Mock exams</h2>
        <Placeholder title="Full mock papers are scheduled for a later stage">
          <p>Complete timed mock papers (Foundation and Higher, calculator and non-calculator) are still to be written. For now, use the exam-style questions above and the <Link to="/assessments">assessments</Link>.</p>
        </Placeholder>
      </section>

      <section className="section">
        <h2>GCSE curriculum map</h2>
        <CurriculumMapPage keyStage={4} />
      </section>
    </div>
  );
}
