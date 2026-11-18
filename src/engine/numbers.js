/* ==========================================================================
   Exact number helpers
   --------------------------------------------------------------------------
   Computers store decimals in binary, so 0.1 + 0.2 gives 0.30000000000000004.
   For maths teaching that is unacceptable, so these helpers keep answers
   exact:
     • round(x, dp) rounds correctly, including the awkward "half" cases
     • fmt() writes numbers the British way: 12,500 and −3 with a true minus
     • parseNumber() reads what a student typed, forgivingly
   ========================================================================== */

// Clean up floating-point noise, e.g. 4.7 * 100 = 470.00000000000006 → 470.
export const clean = (x) => Number.parseFloat(Number(x).toPrecision(12));

// Round half away from zero, to `dp` decimal places (dp can be negative:
// dp = -1 → nearest 10, dp = -2 → nearest 100).
// Using the exponent-string trick avoids errors such as 1.005 → 1.00.
export function round(x, dp = 0) {
  const sign = x < 0 ? -1 : 1;
  const shifted = Number(`${Math.abs(clean(x))}e${dp}`);
  return clean(sign * Number(`${Math.round(shifted)}e${-dp}`));
}

// Count decimal places in a number as it would normally be written.
export function decimalPlaces(x) {
  const s = String(clean(x));
  if (s.includes("e-")) return Number(s.split("e-")[1]);
  return s.includes(".") ? s.split(".")[1].length : 0;
}

export const gcd = (a, b) => {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

/* Format a number for display.
     fmt(12500)        → "12,500"
     fmt(-3)           → "−3"   (proper minus sign, not a hyphen)
     fmt(2.5, 2)       → "2.50" (fixed decimal places when asked)
   Digits after the decimal point are not grouped with commas. */
export function fmt(x, dp = null) {
  const value = clean(x);
  // toFixed(dp) gives exactly dp places; otherwise use the shortest form.
  // (Very small numbers would print as "1e-7", so those use toFixed too.)
  let text = dp === null ? String(Math.abs(value)) : Math.abs(value).toFixed(dp);
  if (text.includes("e")) text = Math.abs(value).toFixed(12).replace(/\.?0+$/, "");
  const [whole, frac] = text.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = value < 0 ? "−" : "";
  return sign + grouped + (frac ? "." + frac : "");
}

// The same as fmt, but always shows a sign for positives too (+5, −3).
export const signed = (x) => (x > 0 ? "+" : "") + fmt(x);

/* Normalise text typed by a student before reading it:
     "−5"  (Unicode minus, often from phones) → "-5"
     " 12,500 " → "12500"
   Returns null if the text is not a plain number. Commas are only allowed
   in their proper places (12,500 is fine; 1,25 is rejected, because in
   some countries that means 1.25 and we must not guess). */
export function parseNumber(raw) {
  if (raw === null || raw === undefined) return null;
  let s = String(raw).trim().replace(/[−–—]/g, "-").replace(/\s+/g, "");
  if (s === "") return null;
  if (s.includes(",")) {
    if (!/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) return null;
    s = s.replace(/,/g, "");
  }
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return Number(s);
}

/* Read a fraction typed by a student. Accepts "3/4", "-3/4", "1 1/2"
   (mixed number) and whole numbers ("5" → 5/1).
   Returns { n, d } (numerator, denominator) or null. */
export function parseFraction(raw) {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim().replace(/[−–]/g, "-").replace(/\s*\/\s*/g, "/");
  let m = s.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/); // mixed number
  if (m) {
    const d = Number(m[4]);
    if (d === 0) return null;
    const n = Number(m[2]) * d + Number(m[3]);
    return { n: m[1] ? -n : n, d, mixed: true };
  }
  m = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (m) {
    const d = Number(m[2]);
    if (d === 0) return null;
    return { n: Number(m[1]) * Math.sign(d), d: Math.abs(d) };
  }
  m = s.match(/^-?\d+$/);
  if (m) return { n: Number(s), d: 1 };
  return null;
}

export function simplify({ n, d }) {
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
