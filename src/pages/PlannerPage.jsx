/* ==========================================================================
   Revision planner
   --------------------------------------------------------------------------
   The student picks an exam date, a tier and how many sessions a week they
   can do. Topics are put in priority order:
     1. topics flagged "needs practice" by results
     2. topics rated low confidence
     3. topics not yet secure
     4. secure topics, as a final review
   and shared out across the weeks before the exam.
   ========================================================================== */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_UNITS } from "../data/curriculum.js";
import { lessonEvidence } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import styles from "./pages.module.css";

function priority(e) {
  if (e.status === "needs-practice") return 0;
  if (e.confidence === 1) return 1;
  if (e.status !== "secure") return 2;
  return 3;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function PlannerPage() {
  const { state, dispatch } = useProgress();
  const saved = state.planner ?? { examDate: "", tier: "F", perWeek: 3 };
  const [form, setForm] = useState(saved);
  const [error, setError] = useState("");

  const plan = useMemo(() => {
    if (!state.planner?.examDate) return null;
    const { examDate, tier, perWeek } = state.planner;
    const days = Math.ceil((new Date(examDate) - new Date(todayISO())) / 86400000);
    const weeks = Math.max(1, Math.floor(days / 7));
    const topics = ALL_UNITS.filter((u) => u.year >= 10)
      .flatMap((u) => u.lessons.filter((l) => tier === "H" || l.tier === "F"))
      .map((l) => ({ lesson: l, e: lessonEvidence(state, l.id) }))
      .sort((a, b) => priority(a.e) - priority(b.e));
    const capacity = weeks * perWeek;
    const schedule = Array.from({ length: weeks }, (_, w) => topics.slice(w * perWeek, (w + 1) * perWeek));
    return { weeks, days, schedule, overflow: Math.max(0, topics.length - capacity), total: topics.length };
  }, [state]);

  function save(ev) {
    ev.preventDefault();
    if (!form.examDate) return setError("Please choose your first exam date.");
    if (form.examDate <= todayISO()) return setError("The exam date needs to be in the future.");
    setError("");
    dispatch({ type: "setPlanner", planner: { ...form, perWeek: Number(form.perWeek) } });
  }

  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">GCSE revision</p>
        <h1>Revision planner</h1>
        <p className="lead">Make a week-by-week plan that puts your weakest topics first. The plan updates as your results change.</p>
      </header>

      <form className={`card ${styles.form}`} onSubmit={save} noValidate>
        <div className={styles.formRow}>
          <div className="field">
            <label htmlFor="exam">First exam date</label>
            <input id="exam" type="date" className="input" min={todayISO()} value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} aria-describedby={error ? "plan-err" : undefined} />
          </div>
          <div className="field">
            <label htmlFor="tier">Tier</label>
            <select id="tier" className="input" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}>
              <option value="F">Foundation</option>
              <option value="H">Higher</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="per">Topics per week</label>
            <select id="per" className="input" value={form.perWeek} onChange={(e) => setForm({ ...form, perWeek: e.target.value })}>
              {[2, 3, 4, 5, 6, 8, 10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        {error && <p id="plan-err" className={styles.error} role="alert">{error}</p>}
        <div><button type="submit" className="btn">Make my plan</button></div>
      </form>

      {plan && (
        <section className="section" aria-labelledby="plan-title">
          <h2 id="plan-title">Your plan: {plan.weeks} week{plan.weeks > 1 ? "s" : ""} ({plan.days} days) to go</h2>
          {plan.overflow > 0 && <p className="notice notice-warning">{plan.total} topics won't all fit: {plan.overflow} lower-priority topics (mostly ones you're already secure on) are left out. Choose more topics per week to include them.</p>}
          <div className="grid-auto" style={{ marginTop: "1rem" }}>
            {plan.schedule.map((week, i) => (
              <div key={i} className={styles.plannerWeek}>
                <h3>Week {i + 1}</h3>
                {week.length === 0 ? <p className="muted">Mixed practice and past papers</p> : (
                  <ul>
                    {week.map(({ lesson, e }) => (
                      <li key={lesson.id}>
                        <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
                        {e.status === "needs-practice" && <span className="muted"> · needs practice</span>}
                        {e.status === "secure" && <span className="muted"> · review</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: "1rem" }}>Many GCSE lessons are not written yet; their links show what each topic covers. Use your class notes and textbook alongside, and plan the last week for full past papers.</p>
        </section>
      )}
    </div>
  );
}
