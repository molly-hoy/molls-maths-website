/* A unit: introduction, objectives, prerequisites, lessons, checklist,
   practice, end-of-unit assessment and a progress indicator. */
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getUnit } from "../data/curriculum.js";
import { generatorsFor } from "../data/lessons/index.js";
import { ASSESSMENTS } from "../data/assessments.js";
import { worksheetsForLessons } from "../data/lessonWorksheets.js";
import { lessonEvidence, unitSummary } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import QuestionSet from "../components/QuestionSet.jsx";
import WorksheetList from "../components/WorksheetList.jsx";
import { Placeholder, ProgressBar, StatusPill, StrandTag, TierBadge } from "../components/ui.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import styles from "./pages.module.css";

export default function UnitPage() {
  const { unitId } = useParams();
  const unit = getUnit(unitId);
  const { state } = useProgress();

  // Mixed unit practice: one Level 2 question from each written lesson.
  const mixed = useMemo(() => (unit ? unit.lessons.filter((l) => l.status === "full").map((l) => generatorsFor(l.id).find((g) => g.level === 2) ?? generatorsFor(l.id)[0]) : []), [unit]);
  if (!unit) return <NotFoundPage />;

  const summary = unitSummary(state, unit.id);
  const assessments = ASSESSMENTS.filter((a) => a.unitId === unit.id);
  const unitNo = unit.id.split("-u")[1];
  // Every lesson's worksheets, gathered up without repeats
  const worksheets = worksheetsForLessons(unit.lessons.map((l) => l.id));

  return (
    <div className="container">
      <header className="page-head">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to={`/year/${unit.year}`}>Year {unit.year}</Link> / <span>Unit {unitNo}</span>
        </nav>
        <div className={styles.headRow}><StrandTag id={unit.strand} short={false} /><span className="muted">Year {unit.year} · Unit {unitNo}</span></div>
        <h1>{unit.title}</h1>
        <p className="lead">{unit.intro}</p>
      </header>

      <div className={styles.two}>
        <div>
          <section className="card" aria-labelledby="obj">
            <h2 id="obj">Unit objectives</h2>
            <ul className={styles.objectives}>{unit.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
          </section>

          <section className="section" aria-labelledby="lessons">
            <h2 id="lessons">Lessons</h2>
            <ol className={styles.lessonTable}>
              {unit.lessons.map((l) => {
                const e = lessonEvidence(state, l.id);
                return (
                  <li key={l.id}>
                    <Link to={`/lesson/${l.id}`} className={styles.lessonRow}>
                      <span className={styles.lessonNo}>{l.number}</span>
                      <span>
                        <span className={styles.lessonTitle}>{l.title}</span>
                        {(l.tier || e.attempted > 0) && (
                          <span className={styles.lessonSub}>
                            <TierBadge tier={l.tier} grades={l.grades} />
                            {e.attempted > 0 && <span>{e.attempted} answers · {e.accuracy}% right</span>}
                          </span>
                        )}
                      </span>
                      <span className={styles.lessonRight}>
                        {l.status === "full" ? <StatusPill status={e.status} /> : <span className={styles.planned}>Content coming later</span>}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside>
          <section className="card" aria-labelledby="prog">
            <h2 id="prog">Your progress</h2>
            <ProgressBar value={summary.percent} label="Unit progress" />
            <p className="muted" style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              {summary.completed} of {summary.total} lessons completed, {summary.secure} secure. A lesson is completed once you've done its quiz, and secure once your quiz and practice results show you can do it reliably.
            </p>
          </section>

          <section className="card" aria-labelledby="pre" style={{ marginTop: "1rem" }}>
            <h2 id="pre">Before you start</h2>
            {unit.prerequisites.length === 0
              ? <p>No earlier units are needed: this unit builds on Key Stage 2 knowledge.</p>
              : (
                <>
                  <p>This unit builds on:</p>
                  <ul className={styles.objectives}>
                    {unit.prerequisites.map((p) => { const pu = getUnit(p); return <li key={p}><Link to={`/unit/${p}`}>Year {pu.year}: {pu.title}</Link></li>; })}
                  </ul>
                </>
              )}
          </section>

          <section className="card" aria-labelledby="check" style={{ marginTop: "1rem" }}>
            <h2 id="check">Unit checklist</h2>
            <ul className={styles.checklist}>
              {unit.lessons.map((l) => {
                const secure = lessonEvidence(state, l.id).status === "secure";
                return (
                  <li key={l.id} style={{ padding: "0.5rem 0.75rem" }}>
                    <span className={`${styles.tick} ${secure ? styles.tickOn : ""}`} aria-hidden="true">✓</span>
                    <span>{l.title}<span className="sr-only">{secure ? " (secure)" : " (not yet secure)"}</span></span>
                  </li>
                );
              })}
            </ul>
            <p className="muted" style={{ fontSize: "0.85rem", marginTop: "0.5rem", marginBottom: 0 }}>Ticks appear automatically when your results show a lesson is secure. You can't tick them by hand.</p>
          </section>
        </aside>
      </div>

      {worksheets.length > 0 && (
        <section className="section" aria-labelledby="unit-ws">
          <h2 id="unit-ws">Worksheets for this unit</h2>
          <p className="muted">Printable PDFs that go with this unit's lessons, in lesson order. Answers are on the last page of each one; the pupil copy leaves them out.</p>
          <WorksheetList worksheets={worksheets} limit={9} />
        </section>
      )}

      <section className="section" aria-labelledby="practice">
        <h2 id="practice">Unit practice and assessment</h2>
        {mixed.length > 0 ? (
          <>
            {assessments.map((a) => (
              <p key={a.id}><Link to={`/assessments/${a.id}`} className="btn btn-secondary">{a.title}</Link> <span className="muted">{a.generators.length} questions · about {a.minutes} minutes</span></p>
            ))}
            <h3>Mixed practice: one question from every lesson</h3>
            <QuestionSet generators={mixed} />
          </>
        ) : (
          <Placeholder>
            <p>The lessons, practice questions and end-of-unit assessment for this unit will be added in a later development stage. The unit's place in the course, its objectives and prerequisites above are final.</p>
            <p>Some skills from this stage of the course can already be practised in the <Link to="/practice">practice bank</Link>.</p>
          </Placeholder>
        )}
      </section>
    </div>
  );
}
