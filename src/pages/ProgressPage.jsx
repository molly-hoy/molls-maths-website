/* ==========================================================================
   Student progress dashboard
   --------------------------------------------------------------------------
   Shows: profile, recommended next lesson, recently viewed lessons,
   completed and incomplete lessons, strongest and weakest areas, accuracy
   by strand, quiz and assessment scores, and revision tasks.
   Everything is calculated from the evidence in state/progress.js.
   ========================================================================== */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getLesson, getUnit } from "../data/curriculum.js";
import { getAssessment } from "../data/assessments.js";
import { FULL_LESSON_IDS } from "../data/lessons/index.js";
import { getStrand } from "../data/strands.js";
import { lessonEvidence, recommendNext, revisionTasks, strandSummary, strongestLessons, weakestLessons } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import { StatusPill } from "../components/ui.jsx";
import styles from "./pages.module.css";

function ProfileForm({ profile, onSave, onCancel }) {
  const [name, setName] = useState(profile?.name ?? "");
  const [year, setYear] = useState(profile?.year ?? 7);
  const [error, setError] = useState("");
  return (
    <form className={styles.form} noValidate onSubmit={(e) => {
      e.preventDefault();
      const clean = name.trim();
      if (!clean) return setError("Please enter a first name or nickname.");
      if (clean.length > 40) return setError("Please use 40 characters or fewer.");
      onSave({ name: clean, year: Number(year) });
    }}>
      <div className={styles.formRow}>
        <div className="field">
          <label htmlFor="pname">First name or nickname</label>
          <input id="pname" className="input" value={name} maxLength={40} autoComplete="given-name" onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "pname-err" : "pname-tip"} />
          <span id="pname-tip" className="muted" style={{ fontSize: "0.8rem" }}>No surname needed.</span>
        </div>
        <div className="field">
          <label htmlFor="pyear">Year group</label>
          <select id="pyear" className="input" value={year} onChange={(e) => setYear(e.target.value)}>
            {[7, 8, 9, 10, 11].map((y) => <option key={y} value={y}>Year {y}</option>)}
          </select>
        </div>
      </div>
      {error && <p id="pname-err" className={styles.error} role="alert">{error}</p>}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" className="btn">Save profile</button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export function downloadProgress(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `molls-maths-progress-${(state.profile?.name ?? "student").replace(/[^a-z0-9]/gi, "-").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ProgressPage() {
  const { state, dispatch, storageAvailable } = useProgress();
  const [editing, setEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef(null);

  const next = recommendNext(state);
  const strands = strandSummary(state);
  const weak = weakestLessons(state);
  const strong = strongestLessons(state).filter((s) => (s.recentAccuracy ?? 0) >= 70);
  const tasks = revisionTasks(state);
  const evidence = FULL_LESSON_IDS.map((id) => ({ id, ...lessonEvidence(state, id) }));
  const done = evidence.filter((e) => e.completed);
  const notDone = evidence.filter((e) => !e.completed);
  const totalAnswers = Object.values(state.skills).reduce((n, s) => n + s.attempted, 0);
  const quizzes = Object.entries(state.quizzes).flatMap(([lessonId, list]) => list.map((q) => ({ ...q, lessonId }))).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

  function importFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (data?.version !== 1 || typeof data.skills !== "object") throw new Error("not a progress file");
        dispatch({ type: "import", data });
        setImportMsg("Progress imported.");
      } catch {
        setImportMsg("That file isn't a Moll's Maths progress file, so nothing was changed.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="container">
      <header className="page-head">
        <h1>{state.profile ? `${state.profile.name}'s progress` : "Student progress"}</h1>
        <p className="notice notice-info" style={{ maxWidth: "68ch" }}>
          <strong>Saved in this browser only.</strong> {storageAvailable ? "Your progress is stored on this device, in this browser. It isn't sent anywhere, it won't appear on other devices, and clearing your browser data deletes it. Use “Download my progress” below to keep a copy or share it with a teacher." : "This browser isn't allowing saving, so progress will be lost when you close or reload the page."}
        </p>
      </header>

      {(!state.profile || editing) && (
        <section className="card" aria-labelledby="profile-h" style={{ marginBottom: "1.5rem" }}>
          <h2 id="profile-h">{state.profile ? "Edit profile" : "Set up your profile"}</h2>
          {!state.profile && <p>Tell us your name and year group so we can recommend the right lessons. This is optional: progress is tracked either way.</p>}
          <ProfileForm profile={state.profile} onCancel={state.profile ? () => setEditing(false) : null} onSave={(p) => { dispatch({ type: "setProfile", profile: p }); setEditing(false); }} />
        </section>
      )}

      {state.profile && !editing && (
        <p className="muted">Year {state.profile.year} · <button type="button" className="btn btn-quiet btn-small" onClick={() => setEditing(true)}>Edit profile</button></p>
      )}

      <div className={styles.stats}>
        <div className={styles.stat}><span className={styles.statValue}>{totalAnswers}</span><span className={styles.statLabel}>answers checked</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{done.length}</span><span className={styles.statLabel}>lessons completed</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{evidence.filter((e) => e.status === "secure").length}</span><span className={styles.statLabel}>lessons secure</span></div>
        <div className={styles.stat}><span className={styles.statValue}>{Object.values(state.quizzes).flat().length}</span><span className={styles.statLabel}>quizzes taken</span></div>
      </div>

      <div className={styles.dash}>
        <section className="card" aria-labelledby="next-h">
          <h2 id="next-h">Recommended next</h2>
          {next ? (
            <>
              <p style={{ fontSize: "1.15rem", fontWeight: 500, marginBottom: "0.25rem" }}>{next.lesson.title}</p>
              <p className="muted">{next.reason} · Year {getUnit(next.lesson.unitId).year}: {getUnit(next.lesson.unitId).title}</p>
              <Link to={`/lesson/${next.lesson.id}`} className="btn btn-small">Go to lesson</Link>
            </>
          ) : <p>Everything available is complete. Try the <Link to="/practice">practice bank</Link>.</p>}
        </section>

        <section className="card" aria-labelledby="recent-h">
          <h2 id="recent-h">Recently viewed</h2>
          {state.visits.length === 0 ? <p className="muted">Lessons you open will appear here.</p> : (
            <ul className={styles.miniList}>
              {state.visits.slice(0, 5).map((v) => getLesson(v.lessonId) && (
                <li key={v.lessonId}><Link to={`/lesson/${v.lessonId}`}>{getLesson(v.lessonId).title}</Link><StatusPill status={lessonEvidence(state, v.lessonId).status} /></li>
              ))}
            </ul>
          )}
        </section>

        <section className={`card ${styles.dashWide}`} aria-labelledby="strand-h">
          <h2 id="strand-h">Accuracy by strand</h2>
          <p className="muted" style={{ fontSize: "0.9rem" }}>Percentage of answers right first time, across all practice, quizzes and assessments.</p>
          {strands.length === 0 ? <p className="muted">Answer some questions to see how you're doing in each strand.</p> : (
            <div className={styles.strandBars}>
              {strands.map((s) => {
                const strand = getStrand(s.strand);
                return (
                  <div key={s.strand} className={styles.strandBar} title={`${strand.name}: ${s.correct} of ${s.attempted} right (${s.accuracy}%)`}>
                    <span>{strand.short ?? strand.name}</span>
                    <span className={styles.barTrack} aria-hidden="true"><span className={styles.barFill} style={{ width: `${s.accuracy}%`, "--strand": strand.colour }} /></span>
                    <span className={styles.barValue}>{s.accuracy}%<span className="sr-only"> ({s.correct} of {s.attempted} answers)</span></span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="card" aria-labelledby="strong-h">
          <h2 id="strong-h">Strongest lessons</h2>
          {strong.length === 0 ? <p className="muted">Lessons where at least 70% of your recent answers are right will appear here.</p> : (
            <ul className={styles.miniList}>{strong.map((s) => <li key={s.lessonId}><Link to={`/lesson/${s.lessonId}`}>{getLesson(s.lessonId).title}</Link><span>{s.recentAccuracy}%</span></li>)}</ul>
          )}
        </section>

        <section className="card" aria-labelledby="weak-h">
          <h2 id="weak-h">Areas to practise</h2>
          {weak.length === 0 ? <p className="muted">Once you've answered at least 3 questions on a lesson, your weakest areas will appear here.</p> : (
            <ul className={styles.miniList}>{weak.map((s) => <li key={s.lessonId}><Link to={`/lesson/${s.lessonId}`}>{getLesson(s.lessonId).title}</Link><span>{s.recentAccuracy}% recent</span></li>)}</ul>
          )}
        </section>

        <section className="card" aria-labelledby="tasks-h">
          <h2 id="tasks-h">Revision tasks</h2>
          {tasks.length === 0 ? <p className="muted">Nothing flagged yet. Tasks appear when results or your confidence ratings show a topic needs work.</p> : (
            <ul className={styles.miniList}>{tasks.slice(0, 8).map((t) => <li key={t.lessonId}><span><Link to={`/lesson/${t.lessonId}`}>{getLesson(t.lessonId).title}</Link><br /><span className="muted" style={{ fontSize: "0.85rem" }}>{t.reason}</span></span></li>)}</ul>
          )}
        </section>

        <section className="card" aria-labelledby="scores-h">
          <h2 id="scores-h">Quiz and assessment scores</h2>
          {quizzes.length === 0 && Object.keys(state.assessments).length === 0 ? <p className="muted">No quizzes taken yet.</p> : (
            <ul className={styles.miniList}>
              {Object.entries(state.assessments).map(([id, list]) => <li key={id}><span>{getAssessment(id)?.title ?? id}</span><strong>{list[0].score}/{list[0].total}</strong></li>)}
              {quizzes.map((q, i) => <li key={i}><span>Quiz: {getLesson(q.lessonId).title}</span><span>{q.score}/{q.total}</span></li>)}
            </ul>
          )}
        </section>

        <section className={`card ${styles.dashWide}`} aria-labelledby="lessons-h">
          <h2 id="lessons-h">Lessons: completed and still to do</h2>
          <div className={styles.two}>
            <div>
              <h3 style={{ fontSize: "1rem" }}>Completed ({done.length})</h3>
              {done.length === 0 ? <p className="muted">None yet. A lesson is completed when you take its quiz.</p> : <ul className={styles.miniList}>{done.map((e) => <li key={e.id}><Link to={`/lesson/${e.id}`}>{getLesson(e.id).title}</Link><StatusPill status={e.status} /></li>)}</ul>}
            </div>
            <div>
              <h3 style={{ fontSize: "1rem" }}>Still to do ({notDone.length})</h3>
              <ul className={styles.miniList}>{notDone.map((e) => <li key={e.id}><Link to={`/lesson/${e.id}`}>{getLesson(e.id).title}</Link><StatusPill status={e.status} /></li>)}</ul>
            </div>
          </div>
        </section>
      </div>

      <section className="section" aria-labelledby="data-h">
        <h2 id="data-h">Your data</h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" className="btn btn-secondary" onClick={() => downloadProgress(state)}>Download my progress</button>
          <button type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>Import a progress file</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importFile} />
          {!confirmReset
            ? <button type="button" className="btn btn-quiet" onClick={() => setConfirmReset(true)}>Reset all progress…</button>
            : (
              <span className="notice notice-warning" style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                This deletes everything saved in this browser.
                <button type="button" className="btn btn-small" onClick={() => { dispatch({ type: "reset" }); setConfirmReset(false); }}>Yes, reset</button>
                <button type="button" className="btn btn-secondary btn-small" onClick={() => setConfirmReset(false)}>Cancel</button>
              </span>
            )}
        </div>
        {importMsg && <p role="status" style={{ marginTop: "0.75rem" }}>{importMsg}</p>}
      </section>
    </div>
  );
}
