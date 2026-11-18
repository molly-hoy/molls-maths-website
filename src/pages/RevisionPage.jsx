/* ==========================================================================
   Foundation / Higher revision checklist
   --------------------------------------------------------------------------
   Built from the curriculum data: every GCSE lesson on the chosen tier,
   grouped by strand, with the student's evidence-based status and their
   own confidence rating side by side. Foundation shows F lessons; Higher
   shows everything, with Higher-only lessons marked.
   ========================================================================== */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ALL_UNITS } from "../data/curriculum.js";
import { STRANDS } from "../data/strands.js";
import { lessonEvidence } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import { StatusPill, TierBadge } from "../components/ui.jsx";
import styles from "./pages.module.css";

const CONF_LABEL = { 1: "Low", 2: "Medium", 3: "High" };

export default function RevisionPage({ tier }) {
  const { state, dispatch } = useProgress();
  const [onlyGaps, setOnlyGaps] = useState(false);
  const gcseUnits = ALL_UNITS.filter((u) => u.year >= 10);
  const isHigher = tier === "H";

  const rows = gcseUnits.flatMap((u) => u.lessons
    .filter((l) => isHigher || l.tier === "F")
    .map((l) => ({ lesson: l, unit: u, e: lessonEvidence(state, l.id) })));
  const shown = onlyGaps ? rows.filter((r) => r.e.status !== "secure") : rows;
  const secureCount = rows.filter((r) => r.e.status === "secure").length;

  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">GCSE revision</p>
        <h1>{isHigher ? "Higher" : "Foundation"} revision checklist</h1>
        <p className="lead">
          {isHigher
            ? "Every topic on the Higher tier: all Foundation content plus the Higher-only topics (marked H). Grades are indicative."
            : "Every topic on the Foundation tier (grades 1–5). Higher-only topics are left out."}
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statValue}>{rows.length}</span><span className={styles.statLabel}>topics</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{secureCount}</span><span className={styles.statLabel}>secure (from your results)</span></div>
        </div>
        <p className="notice notice-info">Status comes from your answers. Confidence is your own rating: set it here or on any lesson page. Use both to plan revision; <Link to="/revision/planner">the revision planner</Link> can turn this list into a weekly plan.</p>
        <label style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
          <input type="checkbox" checked={onlyGaps} onChange={(ev) => setOnlyGaps(ev.target.checked)} /> Show only topics that aren't secure yet
        </label>
      </header>

      {STRANDS.map((s) => {
        const group = shown.filter((r) => r.unit.strand === s.id);
        if (group.length === 0) return null;
        return (
          <section key={s.id} className="section" aria-labelledby={`rev-${s.id}`} style={{ paddingTop: 0 }}>
            <h2 id={`rev-${s.id}`} style={{ borderLeft: `6px solid ${s.colour}`, paddingLeft: "0.6rem" }}>{s.name}</h2>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th scope="col">Topic</th><th scope="col">Tier and grade</th><th scope="col">Status</th><th scope="col">Confidence</th></tr></thead>
                <tbody>
                  {group.map(({ lesson, unit, e }) => (
                    <tr key={lesson.id}>
                      <td><Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link><br /><span className="muted">Year {unit.year}: {unit.title}</span></td>
                      <td><TierBadge tier={lesson.tier} grades={lesson.grades} /></td>
                      <td><StatusPill status={e.status} /></td>
                      <td>
                        <label className="sr-only" htmlFor={`c-${lesson.id}`}>Confidence for {lesson.title}</label>
                        <select id={`c-${lesson.id}`} className="input" style={{ minHeight: 36, padding: "0.2rem 0.5rem" }} value={e.confidence ?? ""} onChange={(ev) => dispatch({ type: "setConfidence", lessonId: lesson.id, value: ev.target.value ? Number(ev.target.value) : null })}>
                          <option value="">Not rated</option>
                          {[1, 2, 3].map((v) => <option key={v} value={v}>{CONF_LABEL[v]}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
