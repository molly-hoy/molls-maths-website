/* ==========================================================================
   Lesson content registry
   --------------------------------------------------------------------------
   Connects each written lesson to its teaching content and its question
   generators. To publish a new lesson:
     1. write its content (Y7: full format in y7-u1.js; Y10: light format,
        see light.js and y10-a.js)
     2. write its generators (Y7: four levels; light lessons: core + extend)
     3. add both below
   The curriculum map then marks the lesson as "full" automatically.
   ========================================================================== */
import { Y7U1_LESSONS } from "./y7-u1.js";
import { Y10A_LESSONS } from "./y10-a.js";
import { Y10B_LESSONS } from "./y10-b.js";
import { Y10C_LESSONS } from "./y10-c.js";
import { Y7B_LESSONS } from "./y7-b.js";
import { Y8_LESSONS } from "./y8.js";
import { Y9A_LESSONS } from "./y9-a.js";
import { Y9B_LESSONS } from "./y9-b.js";
import { Y11A_LESSONS } from "./y11-a.js";
import { Y11B_LESSONS } from "./y11-b.js";
import { Y7U1_GENERATORS } from "../../engine/generators/y7u1.js";
import { Y7B_GENERATORS } from "../../engine/generators/y7b.js";
import { Y8_GENERATORS } from "../../engine/generators/y8.js";
import { Y9A_GENERATORS } from "../../engine/generators/y9a.js";
import { Y9B_GENERATORS } from "../../engine/generators/y9b.js";
import { Y10A_GENERATORS } from "../../engine/generators/y10a.js";
import { Y10B_GENERATORS } from "../../engine/generators/y10b.js";
import { Y10C_GENERATORS } from "../../engine/generators/y10c.js";
import { Y11A_GENERATORS } from "../../engine/generators/y11a.js";
import { Y11B_GENERATORS } from "../../engine/generators/y11b.js";
import { Y11C_GENERATORS } from "../../engine/generators/y11c.js";

const CONTENT = { ...Y7U1_LESSONS, ...Y7B_LESSONS, ...Y8_LESSONS, ...Y9A_LESSONS, ...Y9B_LESSONS, ...Y10A_LESSONS, ...Y10B_LESSONS, ...Y10C_LESSONS, ...Y11A_LESSONS, ...Y11B_LESSONS };
const GENERATORS = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y8_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS, ...Y11C_GENERATORS };

// Only lessons with BOTH content and generators count as written.
export const FULL_LESSON_IDS = Object.keys(CONTENT).filter((id) => GENERATORS[id]?.length);
export const ALL_GENERATORS = Object.values(GENERATORS).flat();

export function getLessonContent(lessonId) {
  const content = CONTENT[lessonId];
  const gens = GENERATORS[lessonId];
  if (!content || !gens?.length) return null;
  const byLevel = (level) => gens.find((g) => g.level === level);
  if (content.light) {
    // Light lessons: Core (level 1) and Extend (level 2)
    return {
      ...content,
      generators: gens,
      guided: [byLevel(1), byLevel(2)],
      independent: [1, 1, 1, 2, 2, 2].map(byLevel),
      quiz: [1, 1, 2, 2].map(byLevel),
    };
  }
  return {
    ...content,
    generators: gens,
    guided: [byLevel(1), byLevel(2)],                                    // H
    independent: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].map(byLevel),      // I
    quiz: [1, 2, 2, 3, 4].map(byLevel),                                  // L
  };
}

export function generatorsFor(lessonId) {
  return GENERATORS[lessonId] ?? [];
}
