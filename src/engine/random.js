/* ==========================================================================
   Seeded random numbers
   --------------------------------------------------------------------------
   Math.random() gives different numbers every time, so the same question
   could never be recreated. A *seeded* generator always produces the same
   sequence from the same starting number (the seed). That means:
     • a question can be rebuilt exactly from its seed (useful for testing)
     • "New questions" simply means "use a new seed"
   mulberry32 is a tiny, well-known generator that is good enough for this
   (it is NOT suitable for security, which doesn't matter here).
   ========================================================================== */
export function createRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // a number from 0 up to (not including) 1
  };

  return {
    next,
    // A whole number from min to max, both included.
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    // A whole number in the range that is not zero.
    nonZero(min, max) {
      let n = 0;
      while (n === 0) n = min + Math.floor(next() * (max - min + 1));
      return n;
    },
    pick: (list) => list[Math.floor(next() * list.length)],
    chance: (p) => next() < p,
    // Fisher–Yates shuffle on a copy, so the original list is not changed.
    shuffle(list) {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
  };
}

export const randomSeed = () => Math.floor(Math.random() * 2 ** 31);
