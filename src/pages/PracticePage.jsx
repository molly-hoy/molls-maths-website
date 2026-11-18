/* ==========================================================================
   Practice questions
   --------------------------------------------------------------------------
   Choose a skill and a level, and get five fresh questions. Skills come
   from the fully written lessons and from the practice bank.
   ========================================================================== */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLesson, getUnit } from "../data/curriculum.js";
import { FULL_LESSON_IDS, generatorsFor } from "../data/lessons/index.js";
import { BANK_GENERATORS } from "../engine/generators/bank.js";
import { LEVELS } from "../engine/generate.js";
import QuestionSet from "../components/QuestionSet.jsx";
import styles from "./pages.module.css";

// Build the list of skills you can choose from.
const SKILLS = [
  ...FULL_LESSON_IDS.map((id) => ({ id, title: getLesson(id).title, group: `Year ${getUnit(getLesson(id).unitId).year}: ${getUnit(getLesson(id).unitId).title}`, generators: generatorsFor(id) })),
  ...BANK_GENERATORS.map((g) => ({ id: g.id, title: g.title, group: "Practice bank (lessons coming later)", generators: [g], lessonId: g.skill })),
];

export default function PracticePage() {
  const [skillId, setSkillId] = useState(SKILLS[0].id);
  const [level, setLevel] = useState("mixed");
  const skill = SKILLS.find((s) => s.id === skillId);

  // Five questions: either all at the chosen level, or a mix rising in difficulty.
  const gens = useMemo(() => {
    const list = skill.generators;
    if (list.length === 1) return Array(5).fill(list[0]);
    const levels = [...new Set(list.map((g) => g.level))];
    if (level === "mixed") return (levels.length === 2 ? [1, 1, 2, 2, 2] : [1, 2, 2, 3, 4]).map((lv) => list.find((g) => g.level === lv));
    return Array(5).fill(list.find((g) => g.level === Number(level)));
  }, [skill, level]);

  const groups = [...new Set(SKILLS.map((s) => s.group))];

  return (
    <div className="container">
      <header className="page-head">
        <h1>Practice questions</h1>
        <p className="lead">Pick a skill and a level. Every question is freshly generated and checked, with hints and a worked solution. Press “New questions” for another set, as many times as you like.</p>
      </header>

      <div className={`card ${styles.form}`} style={{ maxWidth: "none" }}>
        <div className={styles.formRow}>
          <div className="field">
            <label htmlFor="skill">Skill</label>
            <select id="skill" className="input" value={skillId} onChange={(e) => setSkillId(e.target.value)}>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {SKILLS.filter((s) => s.group === g).map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          {skill.generators.length > 1 && (
            <div className="field">
              <label htmlFor="level">Level</label>
              <select id="level" className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="mixed">Mixed levels</option>
                {skill.generators.map((g) => <option key={g.level} value={g.level}>{g.levelName ?? `${LEVELS[g.level].name}: ${LEVELS[g.level].label}`}</option>)}
              </select>
            </div>
          )}
        </div>
        <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
          {skill.lessonId
            ? <>This skill belongs to <Link to={`/lesson/${skill.lessonId}`}>{getLesson(skill.lessonId).title}</Link> (Year {getUnit(getLesson(skill.lessonId).unitId).year}). Its full lesson is scheduled for a later stage. Your answers still count as evidence.</>
            : <>Full lesson: <Link to={`/lesson/${skill.id}`}>{skill.title}</Link>.</>}
        </p>
      </div>

      <section className="section">
        <QuestionSet key={`${skillId}-${level}`} generators={gens} />
      </section>
    </div>
  );
}
