/* KS3 overview: Years 7–9. */
import { Link } from "react-router-dom";
import { YEARS } from "../data/curriculum.js";
import CurriculumMapPage from "./CurriculumMapPage.jsx";
import styles from "./pages.module.css";

export default function KS3Page() {
  const ks3 = YEARS.filter((y) => y.keyStage === 3);
  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">Years 7, 8 and 9</p>
        <h1>Key Stage 3 Mathematics</h1>
        <p className="lead">Key Stage 3 follows the National Curriculum in England. Its aims are fluency in the fundamentals, mathematical reasoning, and solving problems by applying maths to unfamiliar situations. These three years build the foundations for GCSE.</p>
      </header>

      <div className="grid-auto">
        {ks3.map((y) => (
          <Link key={y.year} to={`/year/${y.year}`} className={styles.yearCard}>
            <span className={styles.yearNumber}>{y.title}</span>
            <span>{y.tagline}</span>
            <span className="muted">{y.units.length} units · {y.units.flatMap((u) => u.lessons).length} lessons</span>
          </Link>
        ))}
      </div>

      <section className="section">
        <h2>How KS3 is organised</h2>
        <div className={styles.two}>
          <div>
            <p>Every year covers all six strands. Topics come back each year at a deeper level. For example, rounding to the nearest 10 in Year 7 becomes significant figures and error intervals in Year 9, and upper and lower bounds at GCSE.</p>
            <p>KS3 content is not split into tiers. By the end of Year 9, students have met the foundations of almost every GCSE topic, ready for the GCSE course in Years 10 and 11.</p>
          </div>
          <div className="notice notice-info">
            <p><strong>What's written:</strong> all of Key Stage 3: Year 7 (12 units, 76 lessons), Year 8 (12 units, 66 lessons) and Year 9 (13 units, 67 lessons). Year 7 Unit 1 is the best starting point for younger students; Year 9 is the bridge into GCSE.</p>
            <p><Link to="/unit/y7-u1">Go to Year 7 Unit 1 →</Link></p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>KS3 curriculum map</h2>
        <CurriculumMapPage keyStage={3} />
      </section>
    </div>
  );
}
