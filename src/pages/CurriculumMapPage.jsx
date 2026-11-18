/* ==========================================================================
   Visual curriculum map: strands (rows) × years (columns)
   --------------------------------------------------------------------------
   Select a unit to highlight what it builds on (its prerequisites, traced
   all the way back) and what builds on it later. This shows the "spiral":
   topics return each year at greater depth.
   ========================================================================== */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_UNITS, getUnit, YEARS } from "../data/curriculum.js";
import { STRANDS } from "../data/strands.js";
import { StrandTag } from "../components/ui.jsx";
import styles from "./pages.module.css";

// Every unit that `id` depends on, directly or indirectly.
function ancestors(id, found = new Set()) {
  for (const p of getUnit(id).prerequisites) {
    if (!found.has(p)) { found.add(p); ancestors(p, found); }
  }
  return found;
}
function descendants(id) {
  return new Set(ALL_UNITS.filter((u) => ancestors(u.id).has(id)).map((u) => u.id));
}

export default function CurriculumMapPage({ keyStage = null }) {
  const [selected, setSelected] = useState(null);
  const years = keyStage ? YEARS.filter((y) => y.keyStage === keyStage) : YEARS;
  const before = useMemo(() => (selected ? ancestors(selected) : new Set()), [selected]);
  const after = useMemo(() => (selected ? descendants(selected) : new Set()), [selected]);
  const unit = selected ? getUnit(selected) : null;

  return (
    <div className={keyStage ? undefined : "container"}>
      {!keyStage && (
        <header className="page-head">
          <p className="eyebrow">Years 7–11</p>
          <h1>Curriculum map</h1>
          <p className="lead">Every unit in the course, by strand and year. Select a unit to see what it builds on and what builds on it.</p>
        </header>
      )}

      <div className={styles.legend} aria-hidden={!selected}>
        <span><span className={styles.legendSwatch} style={{ background: "var(--ink)", borderColor: "var(--ink)" }} />Selected unit</span>
        <span><span className={styles.legendSwatch} style={{ background: "#fff5d6", borderColor: "#e3b33c" }} />Builds on (prerequisites)</span>
        <span><span className={styles.legendSwatch} style={{ background: "#e7f3ff", borderColor: "#6aa5e0" }} />Leads to (later units)</span>
        {selected && <button type="button" className="btn btn-quiet btn-small" onClick={() => setSelected(null)}>Clear selection</button>}
      </div>

      <div className={styles.mapWrap}>
        <div className={styles.map} style={{ gridTemplateColumns: `150px repeat(${years.length}, minmax(170px, 1fr))`, minWidth: `${150 + years.length * 175}px` }} role="table" aria-label="Units by strand and year">
          <div className={styles.mapHead} role="columnheader">Strand</div>
          {years.map((y) => <div key={y.year} className={styles.mapHead} role="columnheader"><Link to={`/year/${y.year}`}>{y.title}</Link></div>)}
          {STRANDS.map((s) => (
            <div key={s.id} role="row" style={{ display: "contents" }}>
              <div className={styles.mapStrand} role="rowheader" style={{ "--strand": s.colour, "--strand-ink": s.ink, "--strand-tint": s.tint }}>{s.short ?? s.name}</div>
              {years.map((y) => (
                <div key={y.year} className={styles.mapCell} role="cell">
                  {y.units.filter((u) => u.strand === s.id).map((u) => {
                    const state = u.id === selected ? styles.mapSelected : before.has(u.id) ? styles.mapPrereq : after.has(u.id) ? styles.mapDependent : selected ? styles.mapFaded : "";
                    const ready = u.lessons.filter((l) => l.status === "full").length;
                    return (
                      <button key={u.id} type="button" className={`${styles.mapUnit} ${state}`} style={{ "--strand": s.colour }} aria-pressed={u.id === selected} onClick={() => setSelected(u.id === selected ? null : u.id)}>
                        {u.title}
                        <small>{u.lessons.length} lessons{ready ? ` · ${ready} ready` : ""}</small>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mapDetail} aria-live="polite">
        {unit && (
          <div className="card">
            <div className={styles.headRow}><StrandTag id={unit.strand} /><span className="muted">Year {unit.year}</span></div>
            <h2>{unit.title}</h2>
            <p>{unit.intro}</p>
            <p><strong>Builds on:</strong> {before.size ? [...before].map((id) => `${getUnit(id).title} (Y${getUnit(id).year})`).join(", ") : "Key Stage 2 knowledge only"}</p>
            <p><strong>Leads to:</strong> {after.size ? [...after].map((id) => `${getUnit(id).title} (Y${getUnit(id).year})`).join(", ") : "No later units depend on this directly"}</p>
            <Link to={`/unit/${unit.id}`} className="btn btn-small">Open unit</Link>
          </div>
        )}
      </div>
    </div>
  );
}
