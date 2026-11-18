/* ==========================================================================
   Question generators for Year 7, Unit 1: Place value and number
   --------------------------------------------------------------------------
   Each lesson has four generators, one per difficulty level. Every question
   comes with:
     prompt    the question (text in {a/b} would be drawn as a fraction)
     answer    what is correct (see engine/check.js)
     traps     predictable wrong answers with targeted feedback
     hints     three staged hints, from a gentle nudge to nearly the answer
     solution  a full worked solution, shown only after an attempt
   ========================================================================== */
import { clean, fmt, round } from "../numbers.js";

const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
const PLACE_VALUES = [1, 10, 100, 1000, 10000, 100000];
const DECIMAL_NAMES = ["tenths", "hundredths", "thousandths"];
const COLS_WHOLE = ["ten thousands", "thousands", "hundreds", "tens", "ones"];
const COLS_DECIMAL = ["tens", "ones", "tenths", "hundredths", "thousandths"];

// Helper for "<", ">" and "=" questions.
function compareChoice(a, b, aText, bText) {
  const correct = a < b ? 0 : a > b ? 1 : 2;
  const options = [
    { label: "<", text: "is less than" },
    { label: ">", text: "is greater than" },
    { label: "=", text: "is equal to" },
  ].map((o, i) => ({
    ...o,
    feedback: i === correct ? null
      : i === 2 ? "These numbers aren't equal. Compare them column by column from the left."
      : "Look at the direction of the symbol: the wide, open end faces the larger number.",
  }));
  return { correct, options, sentence: `${aText} □ ${bText}` };
}

const lesson = (n) => `y7-u1-l${n}`;
const gen = (n, level, name, make, validate) => ({ id: `${lesson(n)}/${name}`, skill: lesson(n), level, make, validate });

/* ---------------- Lesson 1: Understanding place value ---------------- */
const placeValue = [
  gen(1, 1, "digit-value-whole", (rng) => {
    const n = rng.int(10000, 99999);
    const digits = String(n);
    const pos = rng.int(0, 4); // 0 = ones column
    const d = Number(digits[digits.length - 1 - pos]);
    const value = d * PLACE_VALUES[pos];
    return {
      type: "numeric",
      prompt: `What is the value of the digit ${d} in ${fmt(n)}?`,
      answer: { value },
      answerText: fmt(value),
      data: { n, d, pos },
      traps: [
        { value: d, feedback: `${d} is the digit, but the question asks for its value. What is a ${d} worth in its column?` },
        { value: d * (PLACE_VALUES[pos + 1] ?? 0), feedback: "You're one column too far to the left. Count the columns from the right, starting with ones." },
        { value: pos > 0 ? d * PLACE_VALUES[pos - 1] : NaN, feedback: "You're one column too far to the right. Count the columns from the right, starting with ones." },
      ],
      hints: [
        "Write the number in a place value table: ten thousands, thousands, hundreds, tens, ones.",
        `Which column is the ${d} in? Count from the right: ones, tens, hundreds…`,
        `The ${d} is in the ${PLACE_NAMES[pos]} column, so it is worth ${d} × ${fmt(PLACE_VALUES[pos])}.`,
      ],
      solution: [
        `Put ${fmt(n)} in a place value table.`,
        `The ${d} is in the ${PLACE_NAMES[pos]} column.`,
        `Its value is ${d} × ${fmt(PLACE_VALUES[pos])} = ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    const { n, d, pos } = q.data;
    const digits = String(n);
    // The digit must appear only once, otherwise "the 4" would be ambiguous.
    return d !== 0 && digits.split("").filter((c) => c === String(d)).length === 1
      && Math.floor(n / 10 ** pos) % 10 === d && q.answer.value === d * 10 ** pos;
  }),

  gen(1, 2, "digit-value-decimal", (rng) => {
    const whole = rng.int(1, 99);
    const decimals = [rng.int(1, 9), rng.int(0, 9), rng.int(1, 9)];
    const n = clean(whole + decimals[0] / 10 + decimals[1] / 100 + decimals[2] / 1000);
    const k = rng.int(0, 2); // 0 = tenths
    const d = decimals[k];
    const value = clean(d / 10 ** (k + 1));
    return {
      type: "numeric",
      prompt: `What is the value of the digit ${d} in ${fmt(n, 3)}? Give your answer as a decimal or a fraction.`,
      answer: { value },
      answerText: `${fmt(value)} (which is ${d}/${fmt(10 ** (k + 1))})`,
      data: { n, d, k, whole },
      traps: [
        { value: d, feedback: `${d} is the digit itself. Digits after the decimal point are worth less than one.` },
        { value: clean(d / 10 ** k), feedback: "You're one column out. The first column after the point is tenths, then hundredths, then thousandths." },
        { value: clean(d * 10 ** (k + 1)), feedback: "Columns after the decimal point get smaller, not bigger: tenths, hundredths, thousandths." },
      ],
      hints: [
        "After the decimal point the columns are tenths, hundredths, thousandths.",
        `Which column is the ${d} in?`,
        `The ${d} is in the ${DECIMAL_NAMES[k]} column, so it is worth ${d} ${DECIMAL_NAMES[k]}.`,
      ],
      solution: [
        `Columns after the decimal point: tenths, hundredths, thousandths.`,
        `In ${fmt(n, 3)} the ${d} is in the ${DECIMAL_NAMES[k]} column.`,
        `${d} ${DECIMAL_NAMES[k]} = ${d}/${fmt(10 ** (k + 1))} = ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    const { n, d, k, whole } = q.data;
    const decimalDigits = fmt(n, 3).split(".")[1];
    const occurrences = fmt(n, 3).replace(".", "").split("").filter((c) => c === String(d)).length;
    return d !== 0 && occurrences === 1 && decimalDigits[k] === String(d) && whole >= 1
      && Math.abs(q.answer.value * 10 ** (k + 1) - d) < 1e-9;
  }),

  gen(1, 3, "partition", (rng) => {
    // e.g. 30,000 + 400 + 6: the zeros in the answer are "placeholders".
    const useDecimals = rng.chance(0.4);
    const pool = useDecimals ? [10, 1, 0.1, 0.01, 0.001] : [10000, 1000, 100, 10, 1];
    // Choose three columns, never two side by side, so placeholders are needed.
    const patterns = [[0, 2, 4], [0, 2, 3], [0, 1, 3], [1, 3, 4], [0, 3, 4]];
    const cols = rng.pick(patterns);
    const parts = cols.map((c) => clean(rng.int(1, 9) * pool[c]));
    const value = clean(parts.reduce((a, b) => a + b, 0));
    const squashed = Number(parts.map((p) => String(p).replace(/[0.]/g, "")).join(""));
    return {
      type: "numeric",
      prompt: `Write ${parts.map((p) => fmt(p)).join(" + ")} as a single number.`,
      answer: { value },
      answerText: fmt(value),
      data: { parts },
      traps: [{ value: squashed, feedback: "You've written the digits next to each other, but some columns are empty. Empty columns need a 0 as a placeholder." }],
      hints: [
        "Draw a place value table and put each part in its own column.",
        "Some columns have nothing in them. What digit shows an empty column?",
        "Fill every empty column with a 0, then read the number.",
      ],
      solution: [
        ...parts.map((p, i) => `${fmt(p)} goes in the ${(useDecimals ? COLS_DECIMAL : COLS_WHOLE)[cols[i]]} column.`),
        "Empty columns are filled with 0 as a placeholder.",
        `The number is ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    const sum = q.data.parts.reduce((a, b) => a + b, 0);
    return Math.abs(sum - q.answer.value) < 1e-9 && q.traps[0].value !== q.answer.value;
  }),

  gen(1, 4, "multiply-divide-powers", (rng) => {
    const x = rng.pick([clean(rng.int(11, 99) / 10), clean(rng.int(101, 999) / 100), rng.int(12, 480), clean(rng.int(1, 9) / 10 + rng.int(1, 9) / 100)]);
    const p = rng.int(1, 3);
    const power = 10 ** p;
    const multiply = rng.chance(0.5);
    const value = multiply ? clean(x * power) : clean(x / power);
    return {
      type: "numeric",
      prompt: `Work out ${fmt(x)} ${multiply ? "×" : "÷"} ${fmt(power)}.`,
      answer: { value },
      answerText: fmt(value),
      data: { x, p, multiply },
      traps: [
        { value: x, feedback: multiply ? "Adding zeros to the end of a decimal doesn't change its value. Instead, every digit moves to the left." : "Every digit should move to the right when you divide." },
        { value: multiply ? clean(x * 10 ** (p - 1)) : clean(x / 10 ** (p - 1)), feedback: `Check how many places to move. ${fmt(power)} has ${p} zero${p > 1 ? "s" : ""}, so every digit moves ${p} place${p > 1 ? "s" : ""}.` },
        { value: multiply ? clean(x / power) : clean(x * power), feedback: multiply ? "Multiplying by a power of 10 makes the number bigger, so the digits move left." : "Dividing by a power of 10 makes the number smaller, so the digits move right." },
      ],
      hints: [
        `${multiply ? "Multiplying" : "Dividing"} by ${fmt(power)} moves every digit ${p} place${p > 1 ? "s" : ""} to the ${multiply ? "left" : "right"}.`,
        "The decimal point stays still: the digits move past it. Fill any gaps with zeros.",
        `Will the answer be bigger or smaller than ${fmt(x)}? It should be ${fmt(power)} times ${multiply ? "bigger" : "smaller"}.`,
      ],
      solution: [
        `${fmt(power)} has ${p} zero${p > 1 ? "s" : ""}, so each digit moves ${p} place${p > 1 ? "s" : ""} to the ${multiply ? "left" : "right"}.`,
        `${fmt(x)} ${multiply ? "×" : "÷"} ${fmt(power)} = ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    // Check a different way: shift the decimal point in the digit string.
    const { x, p, multiply } = q.data;
    const back = multiply ? q.answer.value / 10 ** p : q.answer.value * 10 ** p;
    return Math.abs(back - x) < 1e-9;
  }),
];

/* ---------------- Lesson 2: Comparing and ordering numbers ---------------- */
const comparing = [
  gen(2, 1, "compare-integers", (rng) => {
    const a = rng.int(1000, 99999);
    // Make b share the first digits with a, so students must look closely.
    const s = String(a).split("");
    const i = rng.int(1, s.length - 1);
    s[i] = String((Number(s[i]) + rng.int(1, 9)) % 10);
    const b = Number(s.join(""));
    const c = compareChoice(a, b, fmt(a), fmt(b));
    return {
      type: "choice",
      prompt: `Which symbol makes this statement true? ${c.sentence}`,
      options: c.options,
      answer: { index: c.correct },
      answerText: `${fmt(a)} ${c.options[c.correct].label} ${fmt(b)}`,
      data: { a, b },
      hints: [
        "Both numbers have the same number of digits, so compare them column by column from the left.",
        "Find the first column where the digits are different.",
        "The number with the larger digit in that column is the larger number.",
      ],
      solution: [
        `Compare digits from the left: ${fmt(a)} and ${fmt(b)}.`,
        `The first difference is in the ${PLACE_NAMES[s.length - 1 - i]} column.`,
        `So ${fmt(a)} ${c.options[c.correct].text} ${fmt(b)}: ${fmt(a)} ${c.options[c.correct].label} ${fmt(b)}.`,
      ],
    };
  }, (q) => q.data.a !== q.data.b && (q.data.a < q.data.b ? 0 : 1) === q.answer.index),

  gen(2, 2, "compare-decimals", (rng) => {
    // The classic trap: 0.5 vs 0.45 ("longer means bigger" is wrong).
    const whole = rng.int(0, 9);
    const x = rng.int(2, 9);
    const y = rng.int(1, x - 1);
    const z = rng.int(1, 9);
    const short = clean(whole + x / 10);
    const long = clean(whole + y / 10 + z / 100);
    const [a, b] = rng.chance(0.5) ? [short, long] : [long, short];
    const c = compareChoice(a, b, fmt(a), fmt(b));
    return {
      type: "choice",
      prompt: `Which symbol makes this statement true? ${c.sentence}`,
      options: c.options.map((o, i) => (i !== c.correct && i !== 2
        ? { ...o, feedback: "A decimal with more digits isn't necessarily bigger. Compare the tenths first." } : o)),
      answer: { index: c.correct },
      answerText: `${fmt(a)} ${c.options[c.correct].label} ${fmt(b)}`,
      data: { a, b },
      hints: [
        "Line the numbers up by their decimal points.",
        `It can help to write them with the same number of decimal places: ${fmt(a, 2)} and ${fmt(b, 2)}.`,
        "Compare the tenths column first.",
      ],
      solution: [
        `Write both with 2 decimal places: ${fmt(a, 2)} and ${fmt(b, 2)}.`,
        `Compare the tenths: ${fmt(Math.max(a, b))} has more tenths.`,
        `So ${fmt(a)} ${c.options[c.correct].label} ${fmt(b)}.`,
      ],
    };
  }, (q) => q.data.a !== q.data.b && (q.data.a < q.data.b ? 0 : 1) === q.answer.index),

  gen(2, 3, "order-decimals", (rng) => {
    const w = rng.int(0, 12);
    const t = rng.int(2, 8);
    const u = rng.int(1, 9);
    const v = rng.int(1, 9);
    const values = [
      clean(w + t / 10),
      clean(w + t / 10 + u / 100),
      clean(w + u / 100),
      clean(w + (t - 1) / 10 + v / 100 + u / 1000),
    ];
    const order = [...values].sort((a, b) => a - b).map((x) => fmt(x));
    return {
      type: "order",
      prompt: "Put these numbers in order, starting with the smallest.",
      items: rng.shuffle(values.map((x) => fmt(x))),
      answer: { order, direction: "order from smallest to largest" },
      answerText: order.join(", "),
      data: { values },
      hints: [
        "Write every number with the same number of decimal places, adding zeros at the end.",
        `For example, ${fmt(values[0])} becomes ${fmt(values[0], 3)}.`,
        "Now compare them like whole numbers, column by column from the left.",
      ],
      solution: [
        `Write each with 3 decimal places: ${values.map((x) => fmt(x, 3)).join(", ")}.`,
        "Compare column by column from the left.",
        `Smallest to largest: ${order.join(", ")}.`,
      ],
    };
  }, (q) => new Set(q.data.values).size === 4),

  gen(2, 4, "order-same-digits", (rng) => {
    // Numbers built from the same two digits: only place value tells them apart.
    const a = rng.int(1, 9);
    let b = rng.int(1, 9);
    if (b === a) b = (a % 9) + 1;
    const values = [clean(a + b / 10), clean(a + b / 100), clean(a + a / 10 + b / 100), clean(b + a / 10), clean(a / 10 + b / 100)];
    const order = [...values].sort((x, y) => y - x).map((x) => fmt(x));
    return {
      type: "order",
      prompt: `These numbers all use the digits ${a} and ${b}. Put them in order, starting with the largest.`,
      items: rng.shuffle(values.map((x) => fmt(x))),
      answer: { order, direction: "order from largest to smallest" },
      answerText: order.join(", "),
      data: { values },
      hints: [
        "Start with the whole-number part: which numbers have the most ones?",
        "For numbers with the same whole part, compare tenths, then hundredths.",
        "A 0 straight after the decimal point means there are no tenths.",
      ],
      solution: [
        `With 2 decimal places: ${values.map((x) => fmt(x, 2)).join(", ")}.`,
        "Compare the ones first, then tenths, then hundredths.",
        `Largest to smallest: ${order.join(", ")}.`,
      ],
    };
  }, (q) => new Set(q.data.values).size === 5),
];

/* ---------------- Lesson 3: Rounding to 10, 100, 1,000 ---------------- */
function roundingGen(level, name, makeNumber, to) {
  return gen(3, level, name, (rng) => {
    const n = makeNumber(rng);
    const value = round(n, -Math.log10(to));
    const down = Math.floor(n / to) * to;
    const up = down + to;
    const decider = Math.floor((n % to) / (to / 10));
    return {
      type: "numeric",
      prompt: `Round ${fmt(n)} to the nearest ${fmt(to)}.`,
      answer: { value },
      answerText: fmt(value),
      data: { n, to },
      diagram: { kind: "numberline", min: down, max: up, ticks: 10, points: [{ value: n, label: fmt(n) }] },
      traps: [
        { value: value === up ? down : up, feedback: `Which multiple of ${fmt(to)} is ${fmt(n)} closer to? Look at the deciding digit: 5 or more rounds up, 4 or less rounds down.` },
        { value: Number(String(n).slice(0, -Math.log10(to)) || 0), feedback: `Rounding doesn't remove digits. The answer should still be about the same size as ${fmt(n)}.` },
      ],
      hints: [
        `Which two multiples of ${fmt(to)} does ${fmt(n)} lie between?`,
        `It lies between ${fmt(down)} and ${fmt(up)}. Halfway is ${fmt(down + to / 2)}.`,
        `Look at the deciding digit (the ${PLACE_NAMES[Math.log10(to) - 1]} digit): it is ${decider}.`,
      ],
      solution: [
        `${fmt(n)} lies between ${fmt(down)} and ${fmt(up)}.`,
        `The deciding digit is ${decider}, which is ${decider >= 5 ? "5 or more, so round up" : "4 or less, so round down"}.`,
        `${fmt(n)} rounded to the nearest ${fmt(to)} is ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    const { n, to } = q.data;
    // Independent check: the answer is a multiple of `to` and the closest one (halves round up).
    const v = q.answer.value;
    return n % to !== 0 && v % to === 0 && Math.abs(n - v) <= to / 2 && !(Math.abs(n - v) === to / 2 && v < n);
  });
}

const rounding = [
  roundingGen(1, "round-10", (rng) => rng.int(11, 999), 10),
  roundingGen(2, "round-100", (rng) => rng.int(1001, 9999), 100),
  roundingGen(3, "round-1000", (rng) => (rng.chance(0.5)
    ? rng.int(1, 9) * 10000 + 9000 + rng.int(500, 999) // forces a "carry", e.g. 39,612 → 40,000
    : rng.int(10001, 99999)), 1000),

  gen(3, 4, "rounding-reverse", (rng) => {
    const to = rng.pick([10, 100]);
    const rounded = rng.int(2, 9) * to * (to === 10 ? rng.int(1, 3) : 1);
    const smallest = rng.chance(0.5);
    const value = smallest ? rounded - to / 2 : rounded + to / 2 - 1;
    return {
      type: "numeric",
      prompt: `A whole number rounded to the nearest ${to} is ${fmt(rounded)}. What is the ${smallest ? "smallest" : "largest"} the number could be?`,
      answer: { value },
      answerText: fmt(value),
      data: { to, rounded, smallest },
      traps: [
        { value: rounded + to / 2, feedback: `${fmt(rounded + to / 2)} is exactly halfway, and halfway rounds up, so it would round to ${fmt(rounded + to)}.` },
        { value: rounded - to / 2 - 1, feedback: `${fmt(rounded - to / 2 - 1)} would round down to ${fmt(rounded - to)}.` },
        { value: smallest ? rounded - to : rounded + to, feedback: `That is the next multiple of ${to}. Think about the halfway point instead.` },
      ],
      hints: [
        `Halfway points matter: numbers from halfway upwards round up.`,
        `The halfway points either side of ${fmt(rounded)} are ${fmt(rounded - to / 2)} and ${fmt(rounded + to / 2)}.`,
        `Test your answer: does it round to ${fmt(rounded)}? Does the next whole number ${smallest ? "below" : "above"} it?`,
      ],
      solution: [
        `Numbers from ${fmt(rounded - to / 2)} up to ${fmt(rounded + to / 2 - 1)} round to ${fmt(rounded)}.`,
        `${fmt(rounded + to / 2)} is halfway and rounds up to ${fmt(rounded + to)}.`,
        `So the ${smallest ? "smallest" : "largest"} whole number is ${fmt(value)}.`,
      ],
    };
  }, (q) => {
    const { to, rounded, smallest } = q.data;
    const v = q.answer.value;
    const roundsTo = (x) => round(x, -Math.log10(to));
    return roundsTo(v) === rounded && roundsTo(smallest ? v - 1 : v + 1) !== rounded;
  }),
];

/* ---------------- Lesson 4: Rounding to decimal places ---------------- */
function dpQuestion(n, dp, context = null) {
  const value = round(n, dp);
  const truncated = Math.trunc(n * 10 ** dp) / 10 ** dp;
  const nextDigit = Number(fmt(n, dp + 3).replace("−", "").split(".")[1][dp]);
  return {
    type: "numeric",
    prompt: context ?? `Round ${fmt(n)} to ${dp} decimal place${dp > 1 ? "s" : ""}.`,
    answer: { value, dp },
    answerText: fmt(value, dp),
    data: { n, dp },
    traps: [
      { value: clean(truncated), feedback: `It looks like you've cut the number off instead of rounding. Check the next digit: it is ${nextDigit}.` },
      { value: round(n, dp === 1 ? 2 : 1), feedback: `Count the digits after the decimal point: you need exactly ${dp}.` },
    ],
    hints: [
      `Count ${dp} digit${dp > 1 ? "s" : ""} after the decimal point and draw a line.`,
      `The deciding digit is the one just after your line: it is ${nextDigit}.`,
      `${nextDigit >= 5 ? "It is 5 or more, so round up." : "It is 4 or less, so the digit before the line stays the same."} Keep exactly ${dp} decimal place${dp > 1 ? "s" : ""}.`,
    ],
    solution: [
      `Count ${dp} decimal place${dp > 1 ? "s" : ""}: the deciding digit is ${nextDigit}.`,
      nextDigit >= 5 ? "It is 5 or more, so round up." : "It is 4 or less, so round down (the digits before it stay the same).",
      `${fmt(n)} = ${fmt(value, dp)} (${dp} d.p.).`,
    ],
  };
}
const dpValidate = (q) => {
  const { n, dp } = q.data;
  const scaled = Math.round(n * 10 ** dp); // independent rounding (safe for these sizes)
  return Math.abs(scaled / 10 ** dp - q.answer.value) < 1e-9 && Math.abs(n - q.answer.value) <= 0.5 / 10 ** dp + 1e-9
    && clean(n) !== q.answer.value;
};

const roundingDp = [
  gen(4, 1, "round-1dp", (rng) => {
    // tenths digit up to 8, so there is no carry into the ones
    const n = clean(rng.int(0, 40) + rng.int(0, 8) / 10 + rng.int(1, 9) / 100);
    return dpQuestion(n, 1);
  }, dpValidate),
  gen(4, 2, "round-2dp", (rng) => {
    const n = clean(rng.int(0, 20) + rng.int(0, 9) / 10 + rng.int(0, 8) / 100 + rng.int(1, 9) / 1000 + (rng.chance(0.3) ? rng.int(1, 9) / 10000 : 0));
    return dpQuestion(n, 2);
  }, dpValidate),
  gen(4, 3, "round-dp-carry", (rng) => {
    // Rounding that ripples: 3.497 → 3.50, 6.96 → 7.0. The trailing zero matters.
    const dp = rng.pick([1, 2]);
    const w = rng.int(0, 19);
    const n = dp === 1
      ? clean(w + 0.9 + rng.int(5, 9) / 100)
      : clean(w + rng.int(0, 9) / 10 + 0.09 + rng.int(5, 9) / 1000);
    return dpQuestion(n, dp);
  }, (q) => dpValidate(q) && fmt(q.answer.value, q.data.dp).endsWith("0")),
  gen(4, 4, "share-money", (rng) => {
    const people = rng.pick([3, 6, 7, 9]);
    let total = rng.int(10, 95);
    while ((total * 100) % people === 0) total += 1;
    const q = dpQuestion(clean(total / people), 2,
      `£${total} is shared equally between ${people} friends. How much does each friend get, to the nearest penny? (Give your answer in pounds, e.g. 3.45.)`);
    q.data.total = total;
    q.data.people = people;
    q.hints = [
      `Work out £${total} ÷ ${people} with a written method (or a calculator).`,
      "There are 100 pennies in a pound, so “to the nearest penny” means 2 decimal places.",
      ...q.hints.slice(1),
    ];
    q.solution = [`£${total} ÷ ${people} = ${fmt(total / people, 5)}…`, ...q.solution.slice(1)];
    return q;
  }, (q) => dpValidate(q) && Math.abs(Math.round((q.data.total * 100) / q.data.people) / 100 - q.answer.value) < 1e-9),
];

/* ---------------- Lesson 5: Estimation ---------------- */
// Round to 1 significant figure: keep only the first non-zero digit.
const oneSf = (x) => {
  const p = Math.floor(Math.log10(Math.abs(x)));
  return round(x, -p);
};

const estimation = [
  gen(5, 1, "estimate-times-single", (rng) => {
    let a = rng.int(12, 94);
    if (a % 10 === 0 || a % 10 === 5) a += 1;
    const b = rng.int(3, 9);
    const ra = round(a, -1);
    const value = ra * b;
    return {
      type: "numeric",
      prompt: `Estimate ${a} × ${b} by first rounding ${a} to the nearest 10.`,
      answer: { value },
      answerText: `${ra} × ${b} = ${fmt(value)}`,
      data: { a, b },
      traps: [{ value: a * b, feedback: "That's the exact answer. An estimate uses the rounded number instead, which is quicker to work out." }],
      hints: [`Round ${a} to the nearest 10.`, `${a} ≈ ${ra}.`, `Now work out ${ra} × ${b}. Think ${ra / 10} × ${b}, then × 10.`],
      solution: [`${a} ≈ ${ra}`, `${ra} × ${b} = ${fmt(value)}`, `So ${a} × ${b} ≈ ${fmt(value)}.`],
    };
  }, (q) => q.answer.value === round(q.data.a, -1) * q.data.b),

  gen(5, 2, "estimate-1sf", (rng) => {
    const mode = rng.pick(["×", "+", "−"]);
    const pickNum = (lo, hi) => {
      let x = rng.int(lo, hi);
      // avoid numbers that are already rounded or that sit exactly on a halfway point
      while (String(x).slice(1).match(/^0+$/) || String(x)[1] === "5") x = rng.int(lo, hi);
      return x;
    };
    const [a, b] = mode === "×" ? [pickNum(11, 94), pickNum(11, 94)] : [pickNum(110, 940), pickNum(110, 940)].sort((x, y) => y - x);
    const ra = oneSf(a);
    const rb = oneSf(b);
    const value = mode === "×" ? ra * rb : mode === "+" ? ra + rb : ra - rb;
    const sign = mode === "−" ? "−" : mode;
    return {
      type: "numeric",
      prompt: `Estimate ${fmt(a)} ${sign} ${fmt(b)} by rounding each number to 1 significant figure.`,
      answer: { value },
      answerText: `${fmt(ra)} ${sign} ${fmt(rb)} = ${fmt(value)}`,
      data: { a, b, mode },
      traps: [{ value: mode === "×" ? a * b : mode === "+" ? a + b : a - b, feedback: "That's the exact answer. Round each number first, then calculate." }],
      hints: [
        "1 significant figure means keeping only the first non-zero digit and replacing the rest with zeros (rounding it properly).",
        `${fmt(a)} ≈ ${fmt(ra)}. What is ${fmt(b)} to 1 significant figure?`,
        `Work out ${fmt(ra)} ${sign} ${fmt(rb)}.`,
      ],
      solution: [`${fmt(a)} ≈ ${fmt(ra)} and ${fmt(b)} ≈ ${fmt(rb)}`, `${fmt(ra)} ${sign} ${fmt(rb)} = ${fmt(value)}`],
    };
  }, (q) => {
    const { a, b, mode } = q.data;
    const ra = oneSf(a), rb = oneSf(b);
    return [String(ra).replace(/0/g, "").length, String(rb).replace(/0/g, "").length].every((len) => len === 1)
      && q.answer.value === (mode === "×" ? ra * rb : mode === "+" ? ra + rb : ra - rb) && q.answer.value > 0;
  }),

  gen(5, 3, "estimate-divide-decimals", (rng) => {
    if (rng.chance(0.5)) {
      // Division chosen so the rounded numbers divide exactly: 612 ÷ 29 ≈ 600 ÷ 30 = 20
      const [ta, tb] = rng.pick([[4, 2], [6, 2], [6, 3], [8, 2], [8, 4], [9, 3]]);
      const a = ta * 100 + rng.nonZero(-40, 40);
      const b = tb * 10 + rng.nonZero(-4, 4);
      const value = (ta * 100) / (tb * 10);
      return {
        type: "numeric",
        prompt: `Estimate ${fmt(a)} ÷ ${b} by rounding each number to 1 significant figure.`,
        answer: { value },
        answerText: `${ta * 100} ÷ ${tb * 10} = ${value}`,
        data: { a, b, op: "÷" },
        traps: [{ value: round(a / b, 1), feedback: "That's close to the exact answer. For an estimate, round both numbers first, then divide." }, { value: (ta * 100) / tb, feedback: `Check your rounding of ${b}: to 1 significant figure it is ${tb * 10}, not ${tb}.` }],
        hints: ["Round each number to 1 significant figure.", `${fmt(a)} ≈ ${ta * 100} and ${b} ≈ ${tb * 10}.`, `${ta * 100} ÷ ${tb * 10} is the same as ${ta * 10} ÷ ${tb}.`],
        solution: [`${fmt(a)} ≈ ${ta * 100}, ${b} ≈ ${tb * 10}`, `${ta * 100} ÷ ${tb * 10} = ${ta * 10} ÷ ${tb} = ${value}`],
      };
    }
    // Decimals: 4.87 × 6.2 ≈ 5 × 6 = 30
    const ra = rng.int(2, 9), rb = rng.int(2, 9);
    const a = clean(ra + rng.nonZero(-40, 40) / 100);
    const b = clean(rb + rng.nonZero(-4, 4) / 10);
    const value = ra * rb;
    return {
      type: "numeric",
      prompt: `Estimate ${fmt(a)} × ${fmt(b)} by rounding each number to 1 significant figure.`,
      answer: { value },
      answerText: `${ra} × ${rb} = ${value}`,
      data: { a, b, op: "×" },
      traps: [{ value: round(a * b, 2), feedback: "That's the exact answer. Round each number to 1 significant figure first." }],
      hints: ["For a number between 1 and 10, 1 significant figure means the nearest whole number.", `${fmt(a)} ≈ ${ra}.`, `Now work out ${ra} × ${rb}.`],
      solution: [`${fmt(a)} ≈ ${ra}, ${fmt(b)} ≈ ${rb}`, `${ra} × ${rb} = ${value}`],
    };
  }, (q) => {
    const { a, b, op } = q.data;
    const est = op === "÷" ? oneSf(a) / oneSf(b) : oneSf(a) * oneSf(b);
    return Math.abs(est - q.answer.value) < 1e-9 && Number.isInteger(q.answer.value);
  }),

  gen(5, 4, "over-or-under", (rng) => {
    const up = rng.chance(0.5);
    // Both numbers round the same way, so the answer is certain.
    const pick = () => {
      const tens = rng.int(2, 8) * 10;
      return up ? tens - rng.int(1, 4) : tens + rng.int(1, 4);
    };
    const a = pick(), b = pick();
    const ra = round(a, -1), rb = round(b, -1);
    return {
      type: "choice",
      prompt: `Sam estimates ${a} × ${b} as ${ra} × ${rb} = ${fmt(ra * rb)}. Is the estimate bigger or smaller than the exact answer?`,
      options: [
        { label: "Bigger (an overestimate)", feedback: up ? null : `Both ${a} and ${b} were rounded down, so the rounded numbers are smaller.` },
        { label: "Smaller (an underestimate)", feedback: up ? `Both ${a} and ${b} were rounded up, so the rounded numbers are bigger.` : null },
        { label: "It's impossible to tell", feedback: "Here we can tell, because both numbers were rounded in the same direction." },
      ],
      answer: { index: up ? 0 : 1 },
      answerText: up ? "An overestimate" : "An underestimate",
      data: { a, b, up },
      hints: ["Was each number rounded up or down?", `${a} → ${ra} and ${b} → ${rb}.`, "If both numbers get bigger, what happens to their product?"],
      solution: [`${a} was rounded ${up ? "up" : "down"} to ${ra}, and ${b} was rounded ${up ? "up" : "down"} to ${rb}.`, `Both numbers ${up ? "increased" : "decreased"}, so the product ${up ? "increased" : "decreased"} too.`, `${fmt(ra * rb)} is an ${up ? "overestimate" : "underestimate"} (the exact answer is ${fmt(a * b)}).`],
    };
  }, (q) => (q.data.a * q.data.b < round(q.data.a, -1) * round(q.data.b, -1)) === q.data.up),
];

/* ---------------- Lesson 6: Negative numbers ---------------- */
const nl = (min, max, points) => ({ kind: "numberline", min, max, ticks: max - min, points });

const negatives = [
  gen(6, 1, "temperature-change", (rng) => {
    const start = rng.int(-9, 4);
    const rise = rng.chance(0.6);
    const change = rng.int(2, 9);
    const value = rise ? start + change : start - change;
    return {
      type: "numeric",
      prompt: `The temperature is ${fmt(start)} °C. It ${rise ? "rises" : "falls"} by ${change} degrees. What is the new temperature, in °C?`,
      answer: { value },
      answerText: `${fmt(value)} °C`,
      data: { start, change, rise },
      diagram: nl(-15, 15, [{ value: start, label: `${fmt(start)} °C` }]),
      traps: [
        { value: rise ? start - change : start + change, feedback: rise ? "A rise means going UP the number line (to the right)." : "A fall means going DOWN the number line (to the left)." },
        { value: -value, feedback: "Check the sign of your answer. Which side of zero do you end up?" },
      ],
      hints: [`Start at ${fmt(start)} on the number line.`, `${rise ? "Rising" : "Falling"} means moving ${rise ? "right (up)" : "left (down)"}.`, `Count ${change} steps ${rise ? "right" : "left"}. Remember to count through zero if you pass it.`],
      solution: [`Start at ${fmt(start)}.`, `Move ${change} ${rise ? "right" : "left"}: ${fmt(start)} ${rise ? "+" : "−"} ${change} = ${fmt(value)}.`, `The new temperature is ${fmt(value)} °C.`],
    };
  }, (q) => q.answer.value === (q.data.rise ? q.data.start + q.data.change : q.data.start - q.data.change)),

  gen(6, 2, "temperature-difference", (rng) => {
    const cold = -rng.int(2, 12);
    const warm = rng.int(1, 15);
    const places = rng.shuffle(["Oslo", "Cardiff", "Inverness", "Belfast", "Moscow", "Ottawa"]);
    const value = warm - cold;
    return {
      type: "numeric",
      prompt: `At midnight it is ${fmt(cold)} °C in ${places[0]} and ${warm} °C in ${places[1]}. What is the difference in temperature, in degrees?`,
      answer: { value },
      answerText: `${value} degrees`,
      data: { cold, warm },
      diagram: nl(-15, 15, [{ value: cold, label: places[0] }, { value: warm, label: places[1] }]),
      traps: [
        { value: warm + cold, feedback: "You've found the gap between the numbers without the signs. Count the steps from the colder temperature up to zero, then on to the warmer one." },
        { value: cold - warm, feedback: "A difference is a distance, so it's positive. Count the steps between the two temperatures." },
      ],
      hints: ["The difference is the number of steps between the two temperatures on a number line.", `From ${fmt(cold)} up to 0 is ${-cold} steps.`, `From 0 up to ${warm} is ${warm} more steps.`],
      solution: [`From ${fmt(cold)} to 0 is ${-cold} degrees.`, `From 0 to ${warm} is ${warm} degrees.`, `Difference = ${-cold} + ${warm} = ${value} degrees. (Or: ${warm} − (${fmt(cold)}) = ${value}.)`],
    };
  }, (q) => q.answer.value === Math.abs(q.data.warm - q.data.cold) && q.answer.value > 0),

  gen(6, 3, "add-subtract-integers", (rng) => {
    const form = rng.int(0, 2);
    let a, b, text, value;
    if (form === 0) { a = rng.int(2, 12); b = rng.int(2, 15); text = `${fmt(-a)} + ${b}`; value = -a + b; }
    else if (form === 1) { a = rng.int(2, 9); b = a + rng.int(2, 9); text = `${a} − ${b}`; value = a - b; }
    else { a = rng.int(2, 12); b = rng.int(2, 9); text = `${fmt(-a)} − ${b}`; value = -a - b; }
    return {
      type: "numeric",
      prompt: `Work out ${text}.`,
      answer: { value },
      answerText: fmt(value),
      data: { text, value: form === 0 ? -a + b : form === 1 ? a - b : -a - b },
      diagram: nl(-25, 25, []),
      traps: [{ value: -value, feedback: "The size is right but the sign is wrong. Which side of zero do you finish on?" }],
      hints: [
        "Use a number line. Start at the first number.",
        "Adding means move right. Subtracting means move left.",
        `Start at ${text.split(" ")[0]} and move ${text.includes("+") ? "right" : "left"} ${text.split(" ")[2]} steps.`,
      ],
      solution: [`Start at ${text.split(" ")[0]}.`, `${text.includes("+") ? "Add: move right" : "Subtract: move left"} ${text.split(" ")[2]}.`, `${text} = ${fmt(value)}.`],
    };
  }, (q) => q.answer.value === q.data.value && q.answer.value !== 0),

  gen(6, 4, "subtract-negatives", (rng) => {
    const form = rng.int(0, 2);
    const a = rng.int(2, 12), b = rng.int(2, 12);
    const cases = [
      { text: `${a} − (${fmt(-b)})`, value: a + b, rule: `Subtracting a negative is the same as adding: ${a} + ${b}.` },
      { text: `${fmt(-a)} − (${fmt(-b)})`, value: -a + b, rule: `Subtracting a negative is the same as adding: ${fmt(-a)} + ${b}.` },
      { text: `${a} + (${fmt(-b)})`, value: a - b, rule: `Adding a negative is the same as subtracting: ${a} − ${b}.` },
    ];
    const c = cases[form];
    return {
      type: "numeric",
      prompt: `Work out ${c.text}.`,
      answer: { value: c.value },
      answerText: fmt(c.value),
      data: { form, a, b },
      traps: [
        { value: form === 0 ? a - b : form === 1 ? -a - b : a + b, feedback: "Look at the two signs next to each other. Two negatives next to each other (− −) make an addition." },
        { value: -c.value, feedback: "The size is right but the sign is wrong." },
      ],
      hints: ["Look at the two signs next to each other in the middle.", "Subtracting a negative means adding. Adding a negative means subtracting.", c.rule],
      solution: [c.rule, `${c.text} = ${fmt(c.value)}.`],
    };
  }, (q) => {
    const { form, a, b } = q.data;
    return q.answer.value === [a - -b, -a - -b, a + -b][form] && q.answer.value !== 0;
  }),
];

/* ---------------- Lesson 7: Ordering negative numbers ---------------- */
const orderingNeg = [
  gen(7, 1, "compare-negatives", (rng) => {
    let a = -rng.int(1, 15), b = rng.chance(0.6) ? -rng.int(1, 15) : rng.int(0, 10);
    if (a === b) b = a + rng.int(1, 5);
    const [x, y] = rng.chance(0.5) ? [a, b] : [b, a];
    const c = compareChoice(x, y, fmt(x), fmt(y));
    return {
      type: "choice",
      prompt: `Which symbol makes this statement true? ${c.sentence}`,
      options: c.options.map((o, i) => (i !== c.correct && i !== 2 && x < 0 && y < 0
        ? { ...o, feedback: `For negative numbers, the further from zero, the smaller. ${fmt(Math.min(x, y))} is further left on the number line.` } : o)),
      answer: { index: c.correct },
      answerText: `${fmt(x)} ${c.options[c.correct].label} ${fmt(y)}`,
      data: { x, y },
      diagram: nl(-16, 16, []),
      hints: ["Picture both numbers on a number line.", "Numbers get smaller as you move left.", `Which is further left: ${fmt(x)} or ${fmt(y)}?`],
      solution: [`On a number line, ${fmt(Math.min(x, y))} is to the left of ${fmt(Math.max(x, y))}.`, `So ${fmt(x)} ${c.options[c.correct].label} ${fmt(y)}.`],
    };
  }, (q) => q.data.x !== q.data.y && (q.data.x < q.data.y ? 0 : 1) === q.answer.index),

  gen(7, 2, "order-integers", (rng) => {
    // Two negatives and three others, all different.
    const set = new Set([-rng.int(1, 20), -rng.int(1, 20)]);
    while (set.size < 5) set.add(rng.int(-20, 15));
    const values = [...set];
    const order = [...values].sort((a, b) => a - b).map((x) => fmt(x));
    return {
      type: "order",
      prompt: "Put these numbers in order, starting with the smallest.",
      items: rng.shuffle(values.map((x) => fmt(x))),
      answer: { order, direction: "order from smallest to largest" },
      answerText: order.join(", "),
      data: { values },
      hints: ["Sort into negatives and positives first.", "The negatives come first. The negative furthest from zero is the smallest.", "Then the positive numbers, smallest to largest."],
      solution: ["Negative numbers are smaller than positive numbers.", "Among negatives, the one furthest from zero is the smallest.", `Order: ${order.join(", ")}.`],
    };
  }, (q) => new Set(q.data.values).size === q.data.values.length && q.data.values.some((v) => v < 0)),

  gen(7, 3, "order-negative-decimals", (rng) => {
    const a = rng.int(1, 9);
    const values = [clean(-a / 10), clean(-(1 + a / 10)), clean(-(a / 10 + rng.int(1, 9) / 100)), clean(rng.int(1, 9) / 10), clean(-(1 + rng.int(1, 9) / 100))];
    const order = [...values].sort((x, y) => x - y).map((x) => fmt(x));
    return {
      type: "order",
      prompt: "Put these numbers in order, starting with the smallest.",
      items: rng.shuffle(values.map((x) => fmt(x))),
      answer: { order, direction: "order from smallest to largest" },
      answerText: order.join(", "),
      data: { values },
      hints: ["Negatives are smaller than positives.", "Write each with 2 decimal places so they're easier to compare.", "For negatives, the number further from zero is smaller: −1.2 < −0.5."],
      solution: [`With 2 decimal places: ${values.map((x) => fmt(x, 2)).join(", ")}.`, "The further a negative number is from zero, the smaller it is.", `Order: ${order.join(", ")}.`],
    };
  }, (q) => new Set(q.data.values).size === 5),

  gen(7, 4, "halfway", (rng) => {
    const a = rng.int(2, 15);
    let b = rng.int(1, 15);
    if ((b - a) % 2 !== 0) b += 1; // make the midpoint a whole number
    const value = (b - a) / 2;
    return {
      type: "numeric",
      prompt: `What number is exactly halfway between ${fmt(-a)} and ${b}?`,
      answer: { value },
      answerText: fmt(value),
      data: { a, b },
      diagram: nl(-16, 16, [{ value: -a, label: fmt(-a) }, { value: b, label: String(b) }]),
      traps: [{ value: (a + b) / 2, feedback: "That's half of the distance between them, but you need the point in the middle. Start at one end and move half the distance." }],
      hints: [`How far is it from ${fmt(-a)} to ${b}?`, `The distance is ${a + b}. Half of that is ${(a + b) / 2}.`, `Start at ${fmt(-a)} and move ${(a + b) / 2} steps to the right.`],
      solution: [`Distance from ${fmt(-a)} to ${b} = ${a} + ${b} = ${a + b}.`, `Half the distance = ${(a + b) / 2}.`, `${fmt(-a)} + ${(a + b) / 2} = ${fmt(value)}. (Check: (${fmt(-a)} + ${b}) ÷ 2 = ${fmt(value)}.)`],
    };
  }, (q) => q.answer.value === (-q.data.a + q.data.b) / 2 && Number.isInteger(q.answer.value)),
];

/* ---------------- Lesson 8: Introduction to BIDMAS ---------------- */
const bidmas = [
  gen(8, 1, "add-multiply", (rng) => {
    const a = rng.int(2, 15), b = rng.int(2, 9), c = rng.int(2, 9);
    const first = rng.chance(0.5);
    const text = first ? `${a} + ${b} × ${c}` : `${b} × ${c} + ${a}`;
    const value = a + b * c;
    return {
      type: "numeric",
      prompt: `Work out ${text}.`,
      answer: { value },
      answerText: fmt(value),
      data: { a, b, c },
      traps: first ? [{ value: (a + b) * c, feedback: `You've worked from left to right. In BIDMAS, multiplication comes before addition: do ${b} × ${c} first.` }] : [],
      hints: ["BIDMAS: Brackets, Indices, Division and Multiplication, then Addition and Subtraction.", "Is there a multiplication? Do that first.", `${b} × ${c} = ${b * c}. Now add ${a}.`],
      solution: [`Multiplication first: ${b} × ${c} = ${b * c}.`, `Then addition: ${first ? `${a} + ${b * c}` : `${b * c} + ${a}`} = ${value}.`],
    };
  }, (q) => q.answer.value === q.data.a + q.data.b * q.data.c),

  gen(8, 2, "brackets-divide", (rng) => {
    const form = rng.int(0, 1);
    if (form === 0) {
      const a = rng.int(2, 9), b = rng.int(2, 9), c = rng.int(2, 6);
      return {
        type: "numeric",
        prompt: `Work out (${a} + ${b}) × ${c}.`,
        answer: { value: (a + b) * c },
        answerText: fmt((a + b) * c),
        data: { check: (a + b) * c },
        traps: [{ value: a + b * c, feedback: "Brackets come first in BIDMAS. Work out the bracket before multiplying." }],
        hints: ["What does the B in BIDMAS stand for?", `Work out the bracket first: ${a} + ${b}.`, `${a} + ${b} = ${a + b}. Now multiply by ${c}.`],
        solution: [`Brackets first: ${a} + ${b} = ${a + b}.`, `Then ${a + b} × ${c} = ${(a + b) * c}.`],
      };
    }
    const c = rng.int(2, 9), q = rng.int(2, 9), b = c * q, a = q + rng.int(2, 20);
    return {
      type: "numeric",
      prompt: `Work out ${a} − ${b} ÷ ${c}.`,
      answer: { value: a - q },
      answerText: fmt(a - q),
      data: { check: a - b / c },
      traps: [{ value: (a - b) / c, feedback: `You've subtracted first. Division comes before subtraction: do ${b} ÷ ${c} first.` }],
      hints: ["Division comes before subtraction.", `Work out ${b} ÷ ${c} first.`, `${b} ÷ ${c} = ${q}. Now work out ${a} − ${q}.`],
      solution: [`Division first: ${b} ÷ ${c} = ${q}.`, `Then ${a} − ${q} = ${a - q}.`],
    };
  }, (q) => q.answer.value === q.data.check),

  gen(8, 3, "with-indices", (rng) => {
    const form = rng.int(0, 2);
    const a = rng.int(2, 12), b = rng.int(2, 6), c = rng.int(2, 5);
    const cases = [
      { text: `${a} + ${b}²`, value: a + b * b, steps: [`Indices first: ${b}² = ${b * b}.`, `Then ${a} + ${b * b} = ${a + b * b}.`], trap: (a + b) ** 2, trapMsg: "The square only applies to the number it's attached to, not the whole calculation." },
      { text: `${a} × ${c} − ${b}²`, value: a * c - b * b, steps: [`Indices first: ${b}² = ${b * b}.`, `Then multiply: ${a} × ${c} = ${a * c}.`, `Finally ${a * c} − ${b * b} = ${a * c - b * b}.`], trap: (a * c - b) ** 2, trapMsg: "Indices come before subtraction, and the square belongs only to the " + b + "." },
      { text: `(${a} − ${c})² + ${b}`, value: (a - c) ** 2 + b, steps: [`Brackets first: ${a} − ${c} = ${a - c}.`, `Indices: ${a - c}² = ${(a - c) ** 2}.`, `Then ${(a - c) ** 2} + ${b} = ${(a - c) ** 2 + b}.`], trap: a * a - c * c + b, trapMsg: "Work out the bracket first, then square the result. Squaring each number separately gives a different answer." },
    ];
    const k = cases[form];
    return {
      type: "numeric",
      prompt: `Work out ${k.text}.`,
      answer: { value: k.value },
      answerText: fmt(k.value),
      data: { form, a, b, c },
      traps: [{ value: k.trap, feedback: k.trapMsg }, { value: form === 0 ? a + b * 2 : NaN, feedback: "² means multiply the number by itself, not by 2." }],
      hints: ["Order: Brackets, Indices, Division/Multiplication, Addition/Subtraction.", form === 2 ? "Start with the bracket." : `Start with the index: ${b}² means ${b} × ${b}.`, k.steps[1]],
      solution: [...k.steps],
    };
  }, (q) => {
    const { form, a, b, c } = q.data;
    return q.answer.value === [a + b ** 2, a * c - b ** 2, (a - c) ** 2 + b][form] && a !== c && q.answer.value > 0;
  }),

  gen(8, 4, "place-brackets", (rng) => {
    const a = rng.int(2, 9), b = rng.int(2, 6), c = rng.int(3, 9), d = rng.int(1, c - 1);
    const options = [
      { label: `(${a} + ${b}) × ${c} − ${d}`, value: (a + b) * c - d },
      { label: `${a} + ${b} × (${c} − ${d})`, value: a + b * (c - d) },
      { label: `(${a} + ${b}) × (${c} − ${d})`, value: (a + b) * (c - d) },
      { label: `${a} + (${b} × ${c}) − ${d}`, value: a + b * c - d },
    ];
    const targetIndex = rng.int(0, 2);
    const target = options[targetIndex].value;
    const shuffled = rng.shuffle(options);
    return {
      type: "choice",
      prompt: `Where should the brackets go to make this true? ${a} + ${b} × ${c} − ${d} = ${target}`,
      options: shuffled.map((o) => ({ label: o.label, feedback: o.value === target ? null : `That gives ${o.value}, not ${target}. Work out each option using BIDMAS.` })),
      answer: { index: shuffled.findIndex((o) => o.label === options[targetIndex].label) },
      answerText: options[targetIndex].label,
      data: { values: options.map((o) => o.value) },
      hints: ["Work out each option, remembering that brackets are done first.", "Without brackets the answer would be " + (a + b * c - d) + ".", "Try the options one at a time and see which gives " + target + "."],
      solution: options.map((o) => `${o.label} = ${o.value}${o.value === target ? " ✓" : ""}`),
    };
  }, (q) => new Set(q.data.values).size === q.data.values.length),
];

export const Y7U1_GENERATORS = {
  "y7-u1-l1": placeValue,
  "y7-u1-l2": comparing,
  "y7-u1-l3": rounding,
  "y7-u1-l4": roundingDp,
  "y7-u1-l5": estimation,
  "y7-u1-l6": negatives,
  "y7-u1-l7": orderingNeg,
  "y7-u1-l8": bidmas,
};

