/* A year group: every unit in teaching order, with a strand filter. */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getYear } from "../data/curriculum.js";
import { getStrand, STRANDS } from "../data/strands.js";
import { unitSummary } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import { ProgressBar, StrandTag } from "../components/ui.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import styles from "./pages.module.css";

export default function YearPage() {
  const { year } = useParams();
  const data = getYear(year);
  const { state } = useProgress();
  const [strand, setStrand] = useState("all");
  if (!data) return <NotFoundPage />;

  const lessons = data.units.flatMap((u) => u.lessons);
  const ready = lessons.filter((l) => l.status === "full").length;
  const units = strand === "all" ? data.units : data.units.filter((u) => u.strand === strand);
  const isGcse = data.keyStage === 4;

  return (
    <div className="container">
      <header className="page-head">
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link to="/">Home</Link> / <span>{data.title}</span></nav>
        <p className="eyebrow">{isGcse ? "Key Stage 4 · GCSE Mathematics" : "Key Stage 3"}</p>
        <h1>{data.title}: {data.tagline}</h1>
        <p className="lead">
          {isGcse
            ? "GCSE lessons are marked F (Foundation and Higher) or H (Higher only), with an indicative grade range, so you can see which topics are on your tier."
            : "Units are listed in the recommended teaching order. Each unit builds on the ones before it; prerequisites are listed on every unit page."}
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statValue}>{data.units.length}</span><span className={styles.statLabel}>units</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{lessons.length}</span><span className={styles.statLabel}>lessons</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{ready}</span><span className={styles.statLabel}>fully written so far</span></div>
          {isGcse && <div className={styles.stat}><span className={styles.statValue}>{lessons.filter((l) => l.tier === "H").length}</span><span className={styles.statLabel}>Higher-only lessons</span></div>}
        </div>
      </header>

      <div className={styles.filterRow} role="group" aria-label="Filter by strand">
        <button type="button" className={styles.chip} aria-pressed={strand === "all"} onClick={() => setStrand("all")}>All strands</button>
        {STRANDS.filter((s) => data.units.some((u) => u.strand === s.id)).map((s) => (
          <button key={s.id} type="button" className={styles.chip} aria-pressed={strand === s.id} onClick={() => setStrand(s.id)}>{s.short ?? s.name}</button>
        ))}
      </div>

      <ol className={styles.unitList}>
        {units.map((u) => {
          const s = getStrand(u.strand);
          const summary = unitSummary(state, u.id);
          const full = u.lessons.filter((l) => l.status === "full").length;
          return (
            <li key={u.id}>
              <Link to={`/unit/${u.id}`} className={styles.unitCard} style={{ "--strand-tint": s.tint, "--strand-ink": s.ink }}>
                <span className={styles.unitNo} aria-hidden="true">{u.id.split("-u")[1]}</span>
                <div>
                  <h3>Unit {u.id.split("-u")[1]}: {u.title}</h3>
                  <p>{u.intro}</p>
                  <div className={styles.unitMeta}>
                    <StrandTag id={u.strand} />
                    <span>{u.lessons.length} lessons</span>
                    {full > 0 ? <span className={styles.available}>{full} lessons available</span> : <span className={styles.planned}>Planned</span>}
                  </div>
                  {summary.completed > 0 && <div style={{ marginTop: "0.6rem", maxWidth: "20rem" }}><ProgressBar value={summary.percent} label={`Progress in ${u.title}`} /></div>}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
