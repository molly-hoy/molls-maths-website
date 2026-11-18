/* ==========================================================================
   Tutor and parent view (read-only)
   --------------------------------------------------------------------------
   HONEST LIMITS: this site has no accounts and no server, so there is no
   secure tutor login and a tutor can't see a student's progress remotely.
   What this page CAN do: a student downloads their progress file (Student
   Progress page) and sends it to their tutor, who opens it here to see a
   read-only report. The file is read in the browser and never uploaded.
   A real tutor area (logins, roles, classes, assignments) needs a backend
   with authentication. That is planned for a later stage.
   ========================================================================== */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ALL_UNITS, getLesson } from "../data/curriculum.js";
import { emptyProgress, lessonEvidence, revisionTasks, strandSummary } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import { getStrand } from "../data/strands.js";
import { Placeholder, StatusPill } from "../components/ui.jsx";
import styles from "./pages.module.css";

function Report({ data }) {
  const lessons = ALL_UNITS.flatMap((u) => u.lessons).filter((l) => data.skills[l.id] || data.quizzes[l.id] || l.status === "full");
  const strands = strandSummary(data);
  const tasks = revisionTasks(data);
  return (
    <div className="card" style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ margin: 0 }}>Report: {data.profile?.name ?? "Unnamed student"}{data.profile?.year ? `, Year ${data.profile.year}` : ""}</h2>
      <div className="table-wrap">
        <table className="table">
          <caption className="sr-only">Lesson results</caption>
          <thead><tr><th scope="col">Lesson</th><th scope="col">Status</th><th scope="col">Answers</th><th scope="col">Right first time</th><th scope="col">Best quiz</th><th scope="col">Self-rated confidence</th></tr></thead>
          <tbody>
            {lessons.map((l) => {
              const e = lessonEvidence(data, l.id);
              return <tr key={l.id}><td>{l.title}</td><td><StatusPill status={e.status} /></td><td>{e.attempted}</td><td>{e.accuracy ?? "–"}{e.accuracy !== null && "%"}</td><td>{e.bestQuiz ?? "–"}{e.bestQuiz !== null && "%"}</td><td>{["–", "Low", "Medium", "High"][e.confidence ?? 0]}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3>By strand</h3>
        {strands.length === 0 ? <p className="muted">No answers recorded.</p> : <ul className={styles.miniList}>{strands.map((s) => <li key={s.strand}><span>{getStrand(s.strand).name}</span><span>{s.accuracy}% ({s.correct}/{s.attempted})</span></li>)}</ul>}
      </div>
      <div>
        <h3>Suggested focus</h3>
        {tasks.length === 0 ? <p className="muted">Nothing flagged.</p> : <ul className={styles.miniList}>{tasks.map((t) => <li key={t.lessonId}><span>{getLesson(t.lessonId).title}</span><span className="muted">{t.reason}</span></li>)}</ul>}
      </div>
      <div className="no-print"><button type="button" className="btn btn-secondary btn-small" onClick={() => window.print()}>Print this report</button></div>
    </div>
  );
}

export default function TutorPage() {
  const { state } = useProgress();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  function open(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed?.version !== 1 || typeof parsed.skills !== "object") throw new Error();
        setData({ ...emptyProgress(), ...parsed });
        setMsg("");
      } catch {
        setMsg("That file couldn't be read as a Moll's Maths progress file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">For tutors and parents</p>
        <h1>Tutor and parent view</h1>
        <p className="lead">See a read-only report of a student's progress.</p>
        <div className="notice notice-warning" style={{ maxWidth: "70ch" }}>
          <p><strong>This is not a secure tutor area.</strong> The site has no accounts or server, so it can't verify who is a tutor and can't show progress from another device. Reports are made from a progress file the student shares with you. The file is opened in your browser and never uploaded.</p>
        </div>
      </header>

      <section className="section" aria-labelledby="open-h" style={{ paddingTop: 0 }}>
        <h2 id="open-h">Open a student's progress file</h2>
        <p>Ask the student to press “Download my progress” on their <Link to="/progress">Student Progress</Link> page and send you the file.</p>
        <label className="btn btn-secondary" style={{ cursor: "pointer" }}>
          Choose progress file
          <input type="file" accept="application/json,.json" className="sr-only" onChange={open} />
        </label>
        {msg && <p className={styles.error} role="alert" style={{ marginTop: "0.5rem" }}>{msg}</p>}
        {Object.keys(state.skills).length > 0 && !data && <p style={{ marginTop: "0.75rem" }}><button type="button" className="btn btn-quiet" onClick={() => setData(state)}>Or view the progress saved in this browser</button></p>}
      </section>

      {data && <Report data={data} />}

      <section className="section">
        <h2>Coming in a later stage</h2>
        <Placeholder title="Full tutor admin area: scheduled for Stage 6">
          <ul className={styles.objectives}>
            <li>Secure sign-in with separate student and tutor roles (needs a backend such as Supabase or Firebase)</li>
            <li>Classes and groups, with live progress across students</li>
            <li>Setting assignments and deadlines</li>
            <li>Editing and adding lesson content through a form instead of code</li>
          </ul>
        </Placeholder>
      </section>
    </div>
  );
}
