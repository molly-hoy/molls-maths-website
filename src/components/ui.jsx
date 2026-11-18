/* ==========================================================================
   Small reusable interface pieces
   --------------------------------------------------------------------------
   MathText      text where {3/4} is drawn as a proper stacked fraction
   Frac          a stacked fraction
   StrandTag     a strand's colour dot AND name (never colour alone)
   TierBadge     F (Foundation and Higher) or H (Higher only) for GCSE lessons
   StatusPill    mastery status with an icon and words
   ProgressBar   an accessible progress bar
   Placeholder   the clearly labelled notice for content not yet written
   ========================================================================== */
import { getStrand } from "../data/strands.js";
import { STATUS_INFO } from "../state/progress.js";
import styles from "./ui.module.css";

export function Frac({ n, d }) {
  return (
    <span className={styles.frac} role="math" aria-label={`${n} over ${d}`}>
      <span className={styles.num} aria-hidden="true">{n}</span>
      <span className={styles.den} aria-hidden="true">{d}</span>
    </span>
  );
}

// Split text on {a/b} markers and draw each as a stacked fraction.
// Line breaks (\n) become separate lines.
export function MathText({ children }) {
  const text = String(children ?? "");
  const lines = text.split("\n");
  return lines.map((line, li) => (
    <span key={li} className={lines.length > 1 ? styles.line : undefined}>
      {line.split(/(\{-?\d+\/\d+\})/g).map((part, i) => {
        const m = part.match(/^\{(-?\d+)\/(\d+)\}$/);
        // A plain hyphen in front of a number (e.g. "x = -3") is shown as a
        // proper minus sign (−), which is easier to read and matches textbooks.
        const shown = part.replace(/(^|[\s(=,[×÷+−])-(?=\d)/g, "$1−");
        return m ? <Frac key={i} n={m[1]} d={m[2]} /> : <span key={i}>{shown}</span>;
      })}
    </span>
  ));
}

export function StrandTag({ id, short = true }) {
  const strand = getStrand(id);
  if (!strand) return null;
  return (
    <span className={styles.strand} style={{ "--strand": strand.colour, "--strand-ink": strand.ink, "--strand-tint": strand.tint }}>
      <span className={styles.dot} aria-hidden="true" />
      {short ? strand.short ?? strand.name : strand.name}
    </span>
  );
}

export function TierBadge({ tier, grades }) {
  if (!tier) return null;
  const label = tier === "H" ? "Higher only" : "Foundation and Higher";
  return (
    <span className={`${styles.tier} ${tier === "H" ? styles.tierH : styles.tierF}`} title={label}>
      <span aria-hidden="true">{tier}</span>
      <span className="sr-only">{label}</span>
      {grades && <span className={styles.grades}>Grades {grades}</span>}
    </span>
  );
}

const STATUS_ICONS = { "not-started": "○", started: "◐", completed: "●", secure: "✓", "needs-practice": "!" };

export function StatusPill({ status }) {
  const info = STATUS_INFO[status];
  return (
    <span className={`${styles.pill} ${styles[info.tone]}`}>
      <span aria-hidden="true">{STATUS_ICONS[status]}</span> {info.label}
    </span>
  );
}

export function ProgressBar({ value, label }) {
  return (
    <div className={styles.progress}>
      <div className={styles.track} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-label={label}>
        <div className={styles.fill} style={{ width: `${value}%` }} />
      </div>
      <span className={styles.progressText}>{value}%</span>
    </div>
  );
}

export function Placeholder({ title = "Teaching content scheduled for a later stage", children }) {
  return (
    <div className={styles.placeholder} role="note">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
