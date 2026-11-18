/* Home page: what the platform is, where to start, and what's ready now. */
import { Link } from "react-router-dom";
import { ALL_UNITS, COURSE_STATS, YEARS } from "../data/curriculum.js";
import { STRANDS } from "../data/strands.js";
import { BANK_GENERATORS } from "../engine/generators/bank.js";
import { recommendNext } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import styles from "./pages.module.css";

const LESSON_PARTS = [
  ["A", "Introduction", "Why the topic matters"],
  ["B", "Objectives", "What you will learn"],
  ["C", "Prior knowledge", "What you need first"],
  ["D", "Vocabulary", "Key words explained"],
  ["E", "Teaching", "Step-by-step explanation"],
  ["F", "Worked examples", "At least three, fully explained"],
  ["G", "Common mistakes", "And how to avoid them"],
  ["H", "Guided practice", "With hints, one at a time"],
  ["I", "Independent practice", "12 questions over 4 levels"],
  ["J", "Worked solutions", "Unlocked after you try"],
  ["K", "Checklist", "Skills and confidence"],
  ["L", "Quiz", "Five questions to finish"],
  ["M", "Completion", "Based on evidence, not clicks"],
];

const STRAND_BLURBS = {
  number: "Place value, calculation, fractions, decimals, percentages, powers, standard form and surds.",
  algebra: "Expressions, equations, sequences, graphs, inequalities, quadratics and functions.",
  ratio: "Ratio, proportion, percentage change, compound measures, growth and decay.",
  geometry: "Angles, area and volume, transformations, Pythagoras, trigonometry, circles and vectors.",
  statistics: "Collecting and presenting data, averages, spread, scatter graphs, box plots and histograms.",
  probability: "Probability scales, sample spaces, tree and Venn diagrams, and conditional probability.",
};

export default function HomePage() {
  const { state } = useProgress();
  const next = recommendNext(state);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMaths} aria-hidden="true">∑</div>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <p className="eyebrow" style={{ color: "#2c5a40" }}>Key Stage 3 and GCSE · Years 7 to 11</p>
            <h1>Maths from Year 7 to GCSE, one clear step at a time.</h1>
            <p className="lead">Full lessons with worked examples, instant feedback and hints, and progress that tracks what you can actually do, not just which pages you've opened.</p>
            <div className={styles.heroActions}>
              {next
                ? <Link to={`/lesson/${next.lesson.id}`} className="btn">{state.profile ? "Continue: " : "Start: "}{next.lesson.title}</Link>
                : <Link to="/year/7" className="btn">Start Year 7</Link>}
              <Link to="/curriculum-map" className="btn btn-secondary">See the curriculum map</Link>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <h2>Aligned to the English curriculum</h2>
            <ul>
              <li>KS3 National Curriculum programme of study (Years 7–9)</li>
              <li>GCSE Mathematics content for AQA, Pearson Edexcel and OCR (Years 10–11)</li>
              <li>Foundation and Higher tier topics clearly marked</li>
              <li>Written in British English, with UK units and money</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="years-title">
        <h2 id="years-title">Choose your year</h2>
        <div className={styles.yearCards}>
          {YEARS.map((y) => {
            const lessons = y.units.flatMap((u) => u.lessons);
            const ready = lessons.filter((l) => l.status === "full").length;
            return (
              <Link key={y.year} to={`/year/${y.year}`} className={styles.yearCard}>
                <span className={styles.ks}>{y.keyStage === 3 ? "Key Stage 3" : "Key Stage 4 · GCSE"}</span>
                <span className={styles.yearNumber}>{y.title}</span>
                <span>{y.tagline}</span>
                <span className="muted" style={{ fontSize: "0.875rem" }}>{y.units.length} units · {lessons.length} lessons{ready ? ` · ${ready} ready now` : ""}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section container" aria-labelledby="status-title">
        <div className="notice notice-info">
          <h2 id="status-title" style={{ fontSize: "1.1rem" }}>What's ready now</h2>
          <p>
            The complete curriculum map is in place: {COURSE_STATS.units} units and {COURSE_STATS.lessons} lessons across Years 7–11. <strong>{COURSE_STATS.fullLessons} lessons are written</strong>: all of <Link to="/year/7">Year 7</Link> (76 lessons), <Link to="/year/8">Year 8</Link> (66), <Link to="/year/9">Year 9</Link> (67), <Link to="/year/10">Year 10</Link> (64) and <Link to="/year/11">Year 11</Link> (42). Year 7 Unit 1 uses the full format with four question levels; every other lesson uses the shorter format with Core and Extend questions. Every written lesson has teaching, worked examples, checked practice questions and a quiz, and every finished unit has an end-of-unit check. Practice for a further {BANK_GENERATORS.length} skills is in the <Link to="/practice">practice bank</Link>.
          </p>
          <p>Every lesson in the course is now written. Full timed mock papers and secure accounts are still to come (see the About page).</p>
        </div>
      </section>

      <section className="section container" aria-labelledby="lesson-title">
        <h2 id="lesson-title">How every lesson works</h2>
        <p className="lead">Each lesson follows the same 13-part structure, so you always know where you are.</p>
        <ol className={styles.steps}>
          {LESSON_PARTS.map(([letter, name, desc]) => (
            <li key={letter} className={styles.stepItem}>
              <span className={styles.stepLetter}>{letter}</span>
              <div><strong>{name}</strong><span>{desc}</span></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container" aria-labelledby="strands-title">
        <h2 id="strands-title">Six strands of mathematics</h2>
        <div className={styles.strandGrid}>
          {STRANDS.map((s) => (
            <div key={s.id} className={styles.strandCard} style={{ "--strand": s.colour }}>
              <h3>{s.name}</h3>
              <p>{STRAND_BLURBS[s.id]}</p>
              <p className="muted" style={{ marginTop: "0.5rem" }}>{ALL_UNITS.filter((u) => u.strand === s.id).length} units across Years 7–11</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
