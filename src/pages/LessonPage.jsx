/* ==========================================================================
   Lesson page
   --------------------------------------------------------------------------
   Fully written lessons show all 13 sections (A–M). The content comes from
   data/lessons/, and this page only decides how it looks: content and
   presentation are kept separate.
   Lessons that aren't written yet show their place in the course and a
   clearly labelled notice instead of invented content.
   ========================================================================== */
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getLesson, getUnit, neighbours } from "../data/curriculum.js";
import { getLessonContent } from "../data/lessons/index.js";
import { worksheetsForLesson } from "../data/lessonWorksheets.js";
import { BANK_GENERATORS } from "../engine/generators/bank.js";
import { lessonEvidence } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import Diagram from "../components/Diagram.jsx";
import QuestionSet from "../components/QuestionSet.jsx";
import TestRunner from "../components/TestRunner.jsx";
import WorksheetList from "../components/WorksheetList.jsx";
import { MathText, Placeholder, StatusPill, StrandTag, TierBadge } from "../components/ui.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import styles from "./pages.module.css";

const SECTIONS = [
  ["A", "intro", "Introduction"], ["B", "objectives", "Objectives"], ["C", "prior", "Prior knowledge"],
  ["D", "vocab", "Key vocabulary"], ["E", "teaching", "Teaching"], ["F", "examples", "Worked examples"],
  ["G", "mistakes", "Common mistakes"], ["H", "guided", "Guided practice"], ["I", "independent", "Independent practice"],
  ["J", "solutions", "Worked solutions"], ["K", "checklist", "Checklist"], ["L", "quiz", "Lesson quiz"], ["M", "complete", "Completion"],
];

function Section({ letter, id, title, children }) {
  return (
    <section id={id} className={styles.lessonSection} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className={styles.sectionTitle}><span className={styles.sectionLetter} aria-hidden="true">{letter}</span>{title}</h2>
      {children}
    </section>
  );
}

/* "Practise on paper": the printable worksheets that go with this lesson
   (the pairings live in data/lessonWorksheets.js). Shows nothing if the
   lesson has no worksheets. */
function PaperPractice({ lessonId, heading: H = "h3" }) {
  const worksheets = worksheetsForLesson(lessonId);
  if (worksheets.length === 0) return null;
  return (
    <div className={styles.paperPractice}>
      <H className={styles.paperTitle}>Practise on paper</H>
      <p className="muted">
        Printable worksheet{worksheets.length === 1 ? "" : "s"} for this lesson, with answers on the last page.
        The pupil copy leaves the answers out.
      </p>
      <WorksheetList worksheets={worksheets} limit={4} compact />
    </div>
  );
}

const CONFIDENCE = [[1, "Not confident yet"], [2, "Getting there"], [3, "Confident"]];

export default function LessonPage() {
  const { lessonId } = useParams();
  const lesson = getLesson(lessonId);
  const { state, dispatch } = useProgress();
  // useMemo keeps the same generator lists between renders, so questions
  // are not regenerated every time the page updates.
  const content = useMemo(() => getLessonContent(lessonId), [lessonId]);

  useEffect(() => {
    if (lesson) { dispatch({ type: "visitLesson", lessonId }); }
  }, [lessonId, lesson, dispatch]);

  if (!lesson) return <NotFoundPage />;
  const unit = getUnit(lesson.unitId);
  const { previous, next } = neighbours(lessonId);
  const e = lessonEvidence(state, lessonId);

  const head = (
    <header className="page-head">
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/year/${unit.year}`}>Year {unit.year}</Link> / <Link to={`/unit/${unit.id}`}>{unit.title}</Link> / <span>Lesson {lesson.number}</span>
      </nav>
      <div className={styles.headRow}>
        <StrandTag id={unit.strand} />
        <TierBadge tier={lesson.tier} grades={lesson.grades} />
        {lesson.status === "full" && <StatusPill status={e.status} />}
      </div>
      <h1>{lesson.title}</h1>
      <p className="muted">Year {unit.year} · Unit {unit.id.split("-u")[1]}: {unit.title} · Lesson {lesson.number} of {unit.lessons.length}</p>
    </header>
  );

  const pager = (
    <nav className={styles.pager} aria-label="Lesson navigation">
      {previous ? <Link to={`/lesson/${previous.id}`}>← {previous.title}</Link> : <span />}
      {next && <Link to={`/lesson/${next.id}`}>{next.title} →</Link>}
    </nav>
  );

  /* ---------- A lesson that isn't written yet ---------- */
  if (!content) {
    const bank = BANK_GENERATORS.filter((g) => g.skill === lessonId);
    return (
      <div className="container">
        {head}
        <Placeholder>
          <p>This lesson's teaching content, worked examples and questions will be written in a later development stage. Its title, position in the course and prerequisites are final.</p>
          <p>Until then, the unit's objectives show what it will cover.</p>
        </Placeholder>
        <section className="section">
          <h2>Where this lesson fits</h2>
          <ul className={styles.objectives}>
            {unit.objectives.map((o) => <li key={o}>{o}</li>)}
          </ul>
          {unit.prerequisites.length > 0 && (
            <p style={{ marginTop: "1rem" }}>Prerequisites: {unit.prerequisites.map((p, i) => <span key={p}>{i > 0 && ", "}<Link to={`/unit/${p}`}>{getUnit(p).title} (Year {getUnit(p).year})</Link></span>)}</p>
          )}
        </section>
        <section className="section">
          <PaperPractice lessonId={lessonId} heading="h2" />
        </section>
        {bank.length > 0 && (
          <section className="section">
            <h2>Practise this skill now</h2>
            <p>Questions for this skill are already available from the practice bank. Your answers count as evidence for this lesson.</p>
            <QuestionSet generators={bank} />
          </section>
        )}
        {pager}
      </div>
    );
  }

  /* ---------- A fully written lesson ---------- */
  const quizDone = e.quizCount > 0;
  return (
    <div className="container">
      {head}
      <div className={styles.lessonLayout}>
        <nav className={styles.toc} aria-label="Lesson sections">
          <ol>
            {SECTIONS.map(([letter, id, title]) => (
              <li key={id}><a href={`#${id}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}><span className={styles.tocLetter}>{letter}</span><span className={styles.tocName}>{title}</span></a></li>
            ))}
          </ol>
        </nav>

        <div style={{ minWidth: 0 }}>
          <Section letter="A" id="intro" title="Introduction">
            {content.introduction.map((p, i) => <p key={i} className={i === 0 ? "lead" : undefined}>{p}</p>)}
          </Section>

          <Section letter="B" id="objectives" title="Learning objectives">
            <p>By the end of this lesson you will be able to:</p>
            <ul className={styles.objectives}>{content.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
          </Section>

          <Section letter="C" id="prior" title="Prior knowledge">
            <p>Before you start, you should be able to:</p>
            <ul className={styles.objectives}>{content.priorKnowledge.map((p) => <li key={p}>{p}</li>)}</ul>
            {previous && previous.unitId === lesson.unitId && <p style={{ marginTop: "0.75rem" }}>Need a reminder? <Link to={`/lesson/${previous.id}`}>Revisit the previous lesson: {previous.title}</Link>.</p>}
          </Section>

          <Section letter="D" id="vocab" title="Key vocabulary">
            <dl className={styles.vocab}>
              {content.vocabulary.map((v) => <div key={v.term}><dt>{v.term}</dt><dd>{v.definition}</dd></div>)}
            </dl>
          </Section>

          <Section letter="E" id="teaching" title="Step-by-step teaching">
            {content.teaching.map((step) => (
              <div key={step.heading} className={styles.teachStep}>
                <h3>{step.heading}</h3>
                {step.paragraphs.map((p, i) => <p key={i}><MathText>{p}</MathText></p>)}
                {step.visual && <Diagram spec={step.visual} />}
                {step.keyPoint && <p className={styles.keyPoint}><strong>Key point: </strong><MathText>{step.keyPoint}</MathText></p>}
              </div>
            ))}
          </Section>

          <Section letter="F" id="examples" title="Worked examples">
            <div className={styles.examples}>
              {content.examples.map((ex, i) => (
                <div key={i} className={styles.example}>
                  <p className={styles.exampleQ} style={{ margin: 0 }}><span>Example {i + 1}</span><MathText>{ex.question}</MathText></p>
                  <div className={styles.exampleBody}>
                    <ol>{ex.steps.map((s, j) => <li key={j}><MathText>{s}</MathText></li>)}</ol>
                    <p className={styles.exampleAnswer}>Answer: <MathText>{ex.answer}</MathText></p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section letter="G" id="mistakes" title="Common mistakes">
            <div className={styles.mistakes}>
              {content.mistakes.map((m, i) => (
                <div key={i} className={styles.mistake}>
                  <p><span className={styles.mistakeLabel}>✗ Mistake: </span>{m.mistake}</p>
                  <p><strong>Why it's wrong: </strong>{m.why}</p>
                  <p><span className={styles.fixLabel}>✓ Instead: </span>{m.fix}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section letter="H" id="guided" title="Guided practice">
            <p>Try these {content.guided.length} questions with support. If you get stuck, reveal the hints one at a time: each one gives a little more help. Try to use as few as you can.</p>
            <QuestionSet generators={content.guided} label="guided questions" />
          </Section>

          <Section letter="I" id="independent" title="Independent practice">
            {content.light
              ? <p>Six questions at two levels: <strong>Core</strong> (the essential skill) and <strong>Extend</strong> (harder, multi-step or exam-style). Questions that need a graph or diagram are multiple choice. Press “New questions” for more.</p>
              : <p>Twelve questions in four levels: <strong>Level 1</strong> fluency, <strong>Level 2</strong> developing, <strong>Level 3</strong> reasoning and multi-step, <strong>Level 4</strong> problem solving. Hints are there if you need them, but try first without.</p>}
            <QuestionSet generators={content.independent} label="practice questions" />
            <PaperPractice lessonId={lessonId} />
          </Section>

          <Section letter="J" id="solutions" title="Worked solutions">
            <p>Every practice question above has a full worked solution. To help you learn, each one unlocks only <strong>after your first attempt</strong> at that question: use the “Show worked solution” button on the question.</p>
            <p>Got one wrong? Read the solution, then press “New questions” and try a similar one yourself. That is the quickest way to make a skill stick.</p>
          </Section>

          <Section letter="K" id="checklist" title="Lesson checklist">
            <ul className={styles.checklist}>
              {content.checklist.map((c) => (
                <li key={c}><span className={`${styles.tick} ${e.status === "secure" ? styles.tickOn : ""}`} aria-hidden="true">✓</span>{c}</li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: "0.9rem", marginTop: "0.75rem" }}>
              These are ticked automatically when your results show the lesson is secure. Your evidence so far: {e.attempted} answers, {e.accuracy ?? 0}% right first time{e.bestQuiz !== null ? `, best quiz score ${e.bestQuiz}%` : ""}.
            </p>
            <h3 style={{ marginTop: "1.25rem" }}>How confident do you feel?</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>This is your own rating. It helps plan your revision but doesn't change your results.</p>
            <div className={styles.confidence} role="group" aria-label="Confidence rating">
              {CONFIDENCE.map(([value, label]) => (
                <button key={value} type="button" className="btn btn-secondary btn-small" aria-pressed={e.confidence === value} onClick={() => dispatch({ type: "setConfidence", lessonId, value })}>{label}</button>
              ))}
            </div>
          </Section>

          <Section letter="L" id="quiz" title="Lesson quiz">
            <p>{content.quiz.length} questions, no hints. Answer them all, then submit. You'll see your score, feedback and worked solutions. Completing the quiz marks this lesson as completed.</p>
            <TestRunner key={lessonId} generators={content.quiz} submitLabel="Submit quiz" onComplete={({ score, total }) => dispatch({ type: "recordQuiz", lessonId, score, total })} />
          </Section>

          <Section letter="M" id="complete" title="Lesson completion">
            <div className={styles.completion}>
              <div className={styles.headRow} style={{ margin: 0 }}><strong>Status:</strong> <StatusPill status={e.status} /></div>
              <ul className={styles.criteria}>
                <li>{quizDone ? "✓" : "○"} Complete the lesson quiz {quizDone && `(best score ${e.bestQuiz}%)`}</li>
                <li>{e.bestQuiz >= 75 ? "✓" : "○"} Score at least 75% on the quiz</li>
                <li>{e.attempted >= 6 ? "✓" : "○"} Answer at least 6 questions ({e.attempted} so far)</li>
                <li>{e.recentAccuracy >= 70 ? "✓" : "○"} Get at least 70% of your 10 most recent answers right first time {e.recentAccuracy !== null && `(currently ${e.recentAccuracy}%)`}</li>
              </ul>
              <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>Opening a lesson never marks it as complete. Completion and mastery come only from your answers.</p>
              {next && <p style={{ margin: 0 }}><Link to={`/lesson/${next.id}`} className="btn">Next lesson: {next.title}</Link></p>}
            </div>
          </Section>
          {pager}
        </div>
      </div>
    </div>
  );
}
