/* ==========================================================================
   Worksheets: printable PDF worksheets
   --------------------------------------------------------------------------
   The list of worksheets comes from src/data/worksheets.js, which is written
   automatically by worksheets-src/build.py each time the PDFs are rebuilt.
   So to add a worksheet you never touch this page: add a topic file in
   worksheets-src/topics/, run the build, and it appears here.

   The PDFs themselves live in public/worksheets/. Everything in /public is
   copied to the site untouched, so a file there is served at
   /worksheets/<name>.pdf.
   ========================================================================== */
import { useMemo, useState } from "react";
import { WORKSHEETS } from "../data/worksheets.js";
import WorksheetList from "../components/WorksheetList.jsx";
import styles from "./WorksheetsPage.module.css";

// Topics in alphabetical order, for the filter buttons.
const TOPICS = [...new Set(WORKSHEETS.map((w) => w.topic))].sort();

// Levels from easiest to hardest. Only levels that some worksheet actually
// uses get a button, so a level with no worksheets never shows up.
const LEVEL_ORDER = ["KS2", "KS3", "GCSE Foundation", "GCSE Higher"];
const LEVELS = LEVEL_ORDER.filter((l) => WORKSHEETS.some((w) => w.level === l));

export default function WorksheetsPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState("All");

  // Only recalculated when the search text or chosen topic changes.
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORKSHEETS.filter(
      (w) => (topic === "All" || w.topic === topic)
        && (level === "All" || w.level === level)
        && (!q || w.title.toLowerCase().includes(q)),
    );
  }, [query, topic, level]);

  // Group what's shown by topic, so each topic gets its own heading.
  const groups = TOPICS.map((t) => ({ topic: t, items: shown.filter((w) => w.topic === t) }))
    .filter((g) => g.items.length);

  return (
    <div className="container">
      <header className="page-head">
        <h1>Worksheets</h1>
        <p className="lead">
          Printable PDF worksheets for every topic. Each one starts with practice questions,
          moves on to problem solving, and has the answers on the last page. Each one also
          has a pupil copy, which is the same worksheet without the answers, ready to hand out.
        </p>
      </header>

      {/* ---- search box, then the topic and level filters ---- */}
      <div className={`card ${styles.controls}`}>
        <div className="field">
          <label htmlFor="ws-search">Search worksheets</label>
          <input
            id="ws-search"
            className="input"
            type="search"
            placeholder="e.g. fractions, area, bearings"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* Two rows of filter buttons. Both work together: e.g. Algebra + KS3
            shows only KS3 algebra worksheets. */}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel} id="topic-label">Topic</span>
          <div className={styles.topics} role="group" aria-labelledby="topic-label">
            {["All", ...TOPICS].map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.chip} ${topic === t ? styles.chipOn : ""}`}
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterRow}>
          <span className={styles.filterLabel} id="level-label">Level</span>
          <div className={styles.topics} role="group" aria-labelledby="level-label">
            {["All", ...LEVELS].map((l) => (
              <button
                key={l}
                type="button"
                className={`${styles.chip} ${level === l ? styles.chipOn : ""}`}
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* aria-live makes screen readers announce the new count as you type */}
      <p className="muted" aria-live="polite">
        {shown.length} worksheet{shown.length === 1 ? "" : "s"}
      </p>

      {groups.map((g) => (
        <section key={g.topic} className="section">
          <h2 className={styles.groupTitle}>{g.topic}</h2>
          <WorksheetList worksheets={g.items} />
        </section>
      ))}

      {shown.length === 0 && (
        <p className="notice notice-info">No worksheets match. Try a shorter word, or set Topic or Level back to All.</p>
      )}
    </div>
  );
}
