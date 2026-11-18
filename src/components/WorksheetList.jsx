/* ==========================================================================
   WORKSHEET LIST
   --------------------------------------------------------------------------
   Shows worksheets as cards. Each card has the title, the level and three
   buttons:
     • Open PDF     the full worksheet, with the answers on the last page
     • Pupil copy   the same worksheet with no answer pages, to hand out
     • Download     saves the full worksheet to your computer
   Used in three places, so they all look the same:
     • the Worksheets page (every worksheet, grouped by topic)
     • each lesson page ("Practise on paper")
     • each unit page ("Worksheets for this unit")

   Props:
     worksheets  the list of worksheet entries to show (from worksheets.js)
     limit       optional: show only this many at first, with a
                 "Show all" button for the rest. Leave it out to show all.
     compact     optional: smaller cards, for the narrow column on lesson
                 pages
   ========================================================================== */
import { useState } from "react";
import styles from "./WorksheetList.module.css";

// import.meta.env.BASE_URL is "/" normally, or the sub-folder the site is
// hosted in. Adding it keeps the PDF links working either way.
export const pdfUrl = (w) => `${import.meta.env.BASE_URL}${w.file}`;
export const pupilUrl = (w) => `${import.meta.env.BASE_URL}${w.pupilFile}`;

export default function WorksheetList({ worksheets, limit, compact = false }) {
  const [showAll, setShowAll] = useState(false);
  const shown = limit && !showAll ? worksheets.slice(0, limit) : worksheets;
  const hidden = worksheets.length - shown.length;

  return (
    <>
      <ul className={`${styles.list} ${compact ? styles.compact : ""}`}>
        {shown.map((w) => (
          <li key={w.slug} className={styles.item}>
            <div>
              <h3 className={styles.title}>{w.title}</h3>
              {w.level && <span className={styles.level}>{w.level}</span>}
            </div>
            <div className={styles.actions}>
              {/* The hidden "sr-only" text tells screen-reader users which
                  worksheet each button is for, since every button says the same. */}
              <a className="btn btn-small" href={pdfUrl(w)} target="_blank" rel="noreferrer">
                Open PDF<span className="sr-only"> for {w.title}, with answers (opens in a new tab)</span>
              </a>
              {/* Only shown if this worksheet has a pupil copy */}
              {w.pupilFile && (
                <a className="btn btn-secondary btn-small" href={pupilUrl(w)} target="_blank" rel="noreferrer"
                   title="The same worksheet without the answer pages">
                  Pupil copy<span className="sr-only"> of {w.title}, without answers (opens in a new tab)</span>
                </a>
              )}
              <a className="btn btn-secondary btn-small" href={pdfUrl(w)} download>
                Download<span className="sr-only"> {w.title}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* Only appears when some worksheets are hidden by the limit */}
      {hidden > 0 && (
        <button type="button" className={`btn btn-secondary btn-small ${styles.more}`} onClick={() => setShowAll(true)}>
          Show all {worksheets.length} worksheets
        </button>
      )}
    </>
  );
}
