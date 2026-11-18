/* ==========================================================================
   Year 9 generators, Units 8–13
   (Proportion and compound measures · Pythagoras · Trigonometry ·
    Constructions, loci and bearings · Analysing data · Combined events)
   ========================================================================== */
import { clean, fmt, round, simplify } from "../numbers.js";
import { core, extend, frac, mc3, num, reuse, T, triangle } from "./helpers.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10C_GENERATORS } from "./y10c.js";

const S = (u, l) => `y9-u${u}-l${l}`;
const y10 = (id, level) => ({ ...Y10B_GENERATORS, ...Y10C_GENERATORS })[id].find((g) => g.level === level);
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const safe1 = (x) => Math.abs(((Math.abs(x) * 10) % 1) - 0.5) > 1e-4;
// A numeric answer to 1 decimal place, rejecting values too close to a rounding boundary.
function dp1(prompt, exact, unit, hints, steps, o = {}) {
  if (!safe1(exact)) return null;
  return num(prompt, round(exact, 1), { dp: 1, unit, hints, solution: [...steps, `= ${fmt(round(exact, 1), 1)}${unit ? " " + unit : ""}`], traps: o.traps ?? [], diagram: o.diagram, data: { exact } });
}
const dpValid = (q) => Math.abs(round(q.data.exact, 1) - q.answer.value) < 1e-9;

/* =============================== UNIT 8: Proportion and compound measures =============================== */
const U8 = {
  [S(8, 1)]: [
    core(S(8, 1), "convert-metric", "Converting metric units", (rng) => {
      const [from, to, f] = rng.pick([["km", "m", 1000], ["m", "cm", 100], ["cm", "mm", 10], ["kg", "g", 1000], ["litres", "ml", 1000], ["m", "km", 0.001], ["g", "kg", 0.001], ["ml", "litres", 0.001]]);
      const x = f < 1 ? rng.int(120, 9800) : clean(rng.int(12, 980) / 10);
      const value = clean(x * f);
      return num(`Convert ${fmt(x)} ${from} to ${to}.`, value, {
        unit: to, traps: [T(clean(f < 1 ? x * (1 / f) : x / f), f < 1 ? "Converting to a BIGGER unit gives a smaller number: divide." : "Converting to a SMALLER unit gives a bigger number: multiply.")],
        hints: [`1 ${f < 1 ? to : from} = ${fmt(f < 1 ? 1 / f : f)} ${f < 1 ? from : to}.`, f < 1 ? `Divide by ${fmt(1 / f)}.` : `Multiply by ${f}.`],
        solution: [`${fmt(x)} ${f < 1 ? "÷ " + fmt(1 / f) : "× " + f} = ${fmt(value)} ${to}`], data: { x, f },
      });
    }, (q) => Math.abs(q.data.x * q.data.f - q.answer.value) < 1e-9),
    extend(S(8, 1), "convert-area", "Converting area units", (rng) => {
      const [from, to, f] = rng.pick([["m²", "cm²", 10000], ["cm²", "mm²", 100], ["cm²", "m²", 0.0001]]);
      const x = f < 1 ? rng.int(2, 90) * 1000 : clean(rng.int(2, 95) / 10);
      const value = clean(x * f);
      return num(`Convert ${fmt(x)} ${from} to ${to}.`, value, {
        unit: to, traps: [T(clean(f < 1 ? x / 100 : x * Math.sqrt(f)), `Area units use the length factor SQUARED. 1 ${f < 1 ? "m" : from.replace("²", "")} = ${f < 1 ? 100 : Math.sqrt(f)} ${f < 1 ? "cm" : to.replace("²", "")}, so 1 ${f < 1 ? "m²" : from} = ${f < 1 ? "10,000 cm²" : fmt(f) + " " + to}.`)],
        hints: [`Picture a square: 1 m = 100 cm, so 1 m² = 100 × 100 = 10,000 cm².`, f < 1 ? "Divide by 10,000." : `Multiply by ${fmt(f)}.`],
        solution: [`${fmt(x)} ${f < 1 ? "÷ 10,000" : "× " + fmt(f)} = ${fmt(value)} ${to}`], data: { x, f },
      });
    }, (q) => Math.abs(q.data.x * q.data.f - q.answer.value) < 1e-9),
  ],
  [S(8, 2)]: [
    core(S(8, 2), "find-speed", "Speed, distance and time", (rng) => {
      const v = rng.int(4, 90), t = rng.pick([0.5, 1.5, 2, 2.5, 3, 4]);
      const d = clean(v * t);
      return num(`A car travels ${fmt(d)} km in ${fmt(t)} hours. Find its average speed in km/h.`, v, {
        unit: "km/h", traps: [T(clean(d * t), "Speed = distance ÷ time.")],
        hints: ["Speed = distance ÷ time.", `${fmt(d)} ÷ ${fmt(t)}.`], solution: [`${fmt(d)} ÷ ${fmt(t)} = ${v} km/h`], data: { d, t },
      });
    }, (q) => Math.abs(q.data.d / q.data.t - q.answer.value) < 1e-9),
    extend(S(8, 2), "time-minutes", "Time in minutes", (rng) => {
      const v = rng.pick([30, 40, 48, 60, 72, 80]), mins = rng.pick([15, 20, 25, 30, 40, 45, 50, 75, 90]);
      const d = clean((v * mins) / 60);
      if (!Number.isInteger(d * 2)) return null;
      return num(`How long does it take to travel ${fmt(d)} km at ${v} km/h? Give your answer in minutes.`, mins, {
        unit: "minutes", traps: [T(clean(d / v), "That's the time in HOURS. Multiply by 60 for minutes.")],
        hints: ["Time = distance ÷ speed.", `${fmt(d)} ÷ ${v} = ${fmt(round(d / v, 4))} hours. Convert to minutes.`],
        solution: [`${fmt(d)} ÷ ${v} = ${fmt(round(d / v, 4))} h`, `× 60 = ${mins} minutes`], data: { d, v },
      });
    }, (q) => Math.abs((q.data.d / q.data.v) * 60 - q.answer.value) < 1e-9),
  ],
  [S(8, 3)]: [
    core(S(8, 3), "find-mass", "Density, mass and volume", (rng) => {
      const rho = rng.pick([0.8, 1.2, 2.5, 7.8, 8.9, 11.3, 19.3]), V = rng.int(5, 60);
      const m = clean(rho * V);
      return num(`A metal has density ${fmt(rho)} g/cm³. Find the mass of ${V} cm³ of it.`, m, {
        unit: "g", traps: [T(round(V / rho, 2), "Mass = density × volume.")],
        hints: ["Mass = density × volume.", `${fmt(rho)} × ${V}.`], solution: [`${fmt(rho)} × ${V} = ${fmt(m)} g`], data: { rho, V },
      });
    }, (q) => Math.abs(q.data.rho * q.data.V - q.answer.value) < 1e-9),
    extend(S(8, 3), "find-volume", "Finding volume from density", (rng) => {
      const rho = rng.pick([0.5, 0.8, 2, 2.5, 4, 8]), V = rng.int(4, 50);
      const m = clean(rho * V);
      return num(`An object has mass ${fmt(m)} g and density ${fmt(rho)} g/cm³. Find its volume.`, V, {
        unit: "cm³", traps: [T(clean(m * rho), "Volume = mass ÷ density.")],
        hints: ["Rearrange density = mass ÷ volume: volume = mass ÷ density.", `${fmt(m)} ÷ ${fmt(rho)}.`], solution: [`${fmt(m)} ÷ ${fmt(rho)} = ${V} cm³`], data: { m, rho },
      });
    }, (q) => Math.abs(q.data.m / q.data.rho - q.answer.value) < 1e-9),
  ],
  [S(8, 4)]: [
    core(S(8, 4), "pressure", "Pressure", (rng) => {
      const A = rng.pick([2, 4, 5, 8, 10, 20, 25]), p = rng.int(3, 40);
      const F = A * p;
      return num(`A force of ${F} N acts on an area of ${A} m². Find the pressure in N/m².`, p, {
        unit: "N/m²", traps: [T(F * A, "Pressure = force ÷ area.")],
        hints: ["Pressure = force ÷ area.", `${F} ÷ ${A}.`], solution: [`${F} ÷ ${A} = ${p} N/m²`], data: { F, A },
      });
    }, (q) => q.data.F / q.data.A === q.answer.value),
    extend(S(8, 4), "ms-to-kmh", "Converting compound units", (rng) => {
      const toKmh = rng.chance(0.5), v = toKmh ? rng.pick([5, 10, 15, 20, 25, 30]) : rng.pick([18, 36, 54, 72, 90, 108]);
      const value = toKmh ? clean(v * 3.6) : clean(v / 3.6);
      return num(`Convert ${v} ${toKmh ? "m/s to km/h" : "km/h to m/s"}.`, value, {
        unit: toKmh ? "km/h" : "m/s", traps: [T(toKmh ? clean(v / 3.6) : clean(v * 3.6), toKmh ? "km/h values are bigger than m/s values: multiply." : "m/s values are smaller than km/h values: divide.")],
        hints: [toKmh ? `${v} m/s means ${v} m every second, so ${v * 3600} m every hour.` : `${v} km/h = ${v * 1000} m per hour.`, toKmh ? "Divide by 1,000 to get km. (Overall: × 3.6.)" : "Divide by 3,600 seconds. (Overall: ÷ 3.6.)"],
        solution: [toKmh ? `${v} × 3600 ÷ 1000 = ${fmt(value)} km/h` : `${v} × 1000 ÷ 3600 = ${fmt(value)} m/s`], data: { v, toKmh },
      });
    }, (q) => Math.abs((q.data.toKmh ? q.data.v * 3.6 : q.data.v / 3.6) - q.answer.value) < 1e-9),
  ],
  [S(8, 5)]: [reuse(y10("y10-u7-l4", 1), S(8, 5), 1, "workers"), reuse(y10("y10-u7-l4", 2), S(8, 5), 2, "speed-time")],
  [S(8, 6)]: [
    core(S(8, 6), "map-to-real", "Map scales", (rng) => {
      const scale = rng.pick([25000, 50000, 100000, 200000]), cm = clean(rng.int(2, 30) / 2);
      const km = clean((cm * scale) / 100000);
      return num(`A map has a scale of 1 : ${fmt(scale)}. Two towns are ${fmt(cm)} cm apart on the map. How far apart are they in real life, in km?`, km, {
        unit: "km", traps: [T(clean(cm * scale), "That's the real distance in cm. Convert to km (÷ 100,000).")],
        hints: [`1 cm on the map = ${fmt(scale)} cm in real life.`, `${fmt(cm)} × ${fmt(scale)} cm, then ÷ 100,000 to get km.`],
        solution: [`${fmt(cm)} × ${fmt(scale)} = ${fmt(clean(cm * scale))} cm`, `÷ 100,000 = ${fmt(km)} km`], data: { scale, cm },
      });
    }, (q) => Math.abs((q.data.cm * q.data.scale) / 100000 - q.answer.value) < 1e-9),
    extend(S(8, 6), "real-to-map", "Real distance to map distance", (rng) => {
      const scale = rng.pick([20000, 25000, 50000]), km = clean(rng.int(1, 20) / 2);
      const cm = clean((km * 100000) / scale);
      return num(`On a map with scale 1 : ${fmt(scale)}, how many centimetres represent ${fmt(km)} km?`, cm, {
        unit: "cm", traps: [T(clean(km * scale), "Divide by the scale, after converting km to cm.")],
        hints: [`${fmt(km)} km = ${fmt(km * 100000)} cm.`, `Divide by ${fmt(scale)}.`],
        solution: [`${fmt(km)} km = ${fmt(km * 100000)} cm`, `÷ ${fmt(scale)} = ${fmt(cm)} cm`], data: { km, scale },
      });
    }, (q) => Math.abs((q.data.km * 100000) / q.data.scale - q.answer.value) < 1e-9),
  ],
};

/* =============================== UNIT 9: Pythagoras' theorem =============================== */
const VERTEX_SETS = [["A", "B", "C"], ["P", "Q", "R"], ["X", "Y", "Z"], ["L", "M", "N"], ["D", "E", "F"]];

const U9 = {
  [S(9, 1)]: [
    core(S(9, 1), "which-hypotenuse", "Identifying the hypotenuse", (rng) => {
      const [a, b, c] = rng.pick(VERTEX_SETS);
      // Right angle at the middle vertex b: the hypotenuse joins a and c.
      return mc3(rng, `The triangle has a right angle at ${b}. Which side is the hypotenuse?`, `${a}${c}`, [[`${a}${b}`, `The hypotenuse is opposite the right angle, so it doesn't touch ${b}.`], [`${b}${c}`, `The hypotenuse is opposite the right angle, so it doesn't touch ${b}.`]], {
        diagram: triangle({ right: "B", names: [a, b, c], description: `Right-angled triangle ${a}${b}${c} with the right angle at ${b}.` }),
        hints: ["The hypotenuse is the longest side.", "It is always opposite the right angle."],
        solution: [`The side opposite the right angle at ${b} is ${a}${c}.`], data: {},
      });
    }, () => true),
    extend(S(9, 1), "is-right-angled", "Is it right-angled?", (rng) => {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]];
      const yes = rng.chance(0.5);
      let [a, b, c] = rng.pick(triples);
      if (!yes) c += rng.pick([-1, 1]);
      const lhs = a * a + b * b, rhs = c * c;
      return mc3(rng, `A triangle has sides ${a} cm, ${b} cm and ${c} cm. Is it right-angled?`, yes ? `Yes: ${a}² + ${b}² = ${c}²` : `No: ${a}² + ${b}² ≠ ${c}²`, [
        [yes ? `No: ${a}² + ${b}² ≠ ${c}²` : `Yes: ${a}² + ${b}² = ${c}²`, `Work it out: ${a * a} + ${b * b} = ${lhs}, and ${c}² = ${rhs}.`],
        ["You can't tell without measuring an angle", "Pythagoras' theorem works backwards too: if a² + b² = c², the triangle is right-angled."],
      ], {
        hints: ["Check whether the two shorter sides squared add up to the longest side squared.", `${a}² + ${b}² = ${lhs}. What is ${c}²?`],
        solution: [`${a}² + ${b}² = ${lhs}`, `${c}² = ${rhs}`, yes ? "Equal, so it is right-angled." : "Not equal, so it is not right-angled."], data: { lhs, rhs, yes },
      });
    }, (q) => (q.data.lhs === q.data.rhs) === q.data.yes),
  ],
  [S(9, 2)]: [
    core(S(9, 2), "hypotenuse", "Finding the hypotenuse", (rng) => {
      const a = rng.int(3, 15), b = rng.int(3, 15);
      const h = Math.hypot(a, b);
      if (Number.isInteger(h)) return null;
      return dp1(`Find the length of the hypotenuse AC, to 1 decimal place.`, h, "cm",
        ["c² = a² + b², where c is the hypotenuse.", `AC² = ${a}² + ${b}² = ${a * a + b * b}.`], [`AC² = ${a * a} + ${b * b} = ${a * a + b * b}`, `AC = √${a * a + b * b}`],
        { traps: [T(a + b, "Square the sides, add, then square root.")], diagram: triangle({ right: "B", sides: { AB: `${a} cm`, BC: `${b} cm`, CA: "?" }, description: `Right-angled triangle with shorter sides ${a} cm and ${b} cm.` }) });
    }, dpValid),
    extend(S(9, 2), "walk-distance", "Pythagoras in context", (rng) => {
      const n = rng.int(2, 12), e = rng.int(2, 12);
      const d = Math.hypot(n, e);
      if (Number.isInteger(d)) return null;
      return dp1(`Sam walks ${n} km north and then ${e} km east. How far is Sam from the start, in a straight line? Give your answer to 1 decimal place.`, d, "km",
        ["Sketch it: the two walks make the shorter sides of a right-angled triangle.", `Distance = √(${n}² + ${e}²).`], [`√(${n * n} + ${e * e}) = √${n * n + e * e}`], { traps: [T(n + e, "The straight-line distance is shorter than the route walked.")] });
    }, dpValid),
  ],
  [S(9, 3)]: [
    core(S(9, 3), "shorter-side", "Finding a shorter side", (rng) => {
      const a = rng.int(3, 12), c = a + rng.int(2, 10);
      const b = Math.sqrt(c * c - a * a);
      if (Number.isInteger(b)) return null;
      return dp1(`The hypotenuse AC is ${c} cm and AB is ${a} cm. Find BC to 1 decimal place.`, b, "cm",
        ["To find a shorter side, SUBTRACT the squares.", `BC² = ${c}² − ${a}².`], [`BC² = ${c * c} − ${a * a} = ${c * c - a * a}`, `BC = √${c * c - a * a}`],
        { traps: [T(round(Math.hypot(a, c), 1), "BC is a shorter side, so subtract: BC² = AC² − AB².")], diagram: triangle({ right: "B", sides: { AB: `${a} cm`, CA: `${c} cm`, BC: "?" }, description: `Right-angled triangle with hypotenuse ${c} cm and side ${a} cm.` }) });
    }, dpValid),
    extend(S(9, 3), "ladder", "Ladder problems", (rng) => {
      const L = rng.int(4, 10), d = clean(rng.int(5, Math.floor(L * 10 * 0.6)) / 10);
      const h = Math.sqrt(L * L - d * d);
      return dp1(`A ${L} m ladder leans against a vertical wall. Its foot is ${fmt(d)} m from the wall. How high up the wall does it reach? Give your answer to 1 decimal place.`, h, "m",
        ["The ladder is the hypotenuse.", `height² = ${L}² − ${fmt(d)}².`], [`h² = ${L * L} − ${fmt(clean(d * d))} = ${fmt(clean(L * L - d * d))}`, `h = √${fmt(clean(L * L - d * d))}`], { traps: [T(round(Math.hypot(L, d), 1), "The ladder is the longest side: subtract, don't add.")] });
    }, dpValid),
  ],
  [S(9, 4)]: [
    core(S(9, 4), "isosceles-height", "Height of an isosceles triangle", (rng) => {
      const base = rng.int(3, 12) * 2, s = base / 2 + rng.int(2, 9);
      const h = Math.sqrt(s * s - (base / 2) ** 2);
      return dp1(`An isosceles triangle has two sides of ${s} cm and a base of ${base} cm. Find its perpendicular height, to 1 decimal place.`, h, "cm",
        ["The height splits the triangle into two right-angled triangles.", `Each has hypotenuse ${s} and base ${base / 2}.`], [`h² = ${s}² − ${base / 2}² = ${s * s - (base / 2) ** 2}`, `h = √${s * s - (base / 2) ** 2}`], { traps: [T(round(Math.sqrt(s * s - base * base > 0 ? s * s - base * base : 1), 1), "Halve the base first.")] });
    }, dpValid),
    extend(S(9, 4), "screen-area", "Multi-step Pythagoras", (rng) => {
      const w = rng.int(20, 60), d = w + rng.int(8, 30);
      const h = Math.sqrt(d * d - w * w);
      return dp1(`A rectangular screen is ${w} cm wide and its diagonal is ${d} cm. Find the area of the screen, to 1 decimal place.`, w * h, "cm²",
        ["First use Pythagoras to find the height.", `height = √(${d}² − ${w}²) = ${fmt(round(h, 3))}… cm. Then area = width × height.`], [`height = √${d * d - w * w} = ${fmt(round(h, 4))}…`, `area = ${w} × ${fmt(round(h, 4))}…`]);
    }, dpValid),
  ],
  [S(9, 5)]: [
    reuse(y10("y10-u6-l2", 2), S(9, 5), 1, "segment-length"),
    extend(S(9, 5), "exact-distance", "Exact distance between points", (rng) => {
      const x1 = rng.int(-6, 6), y1 = rng.int(-6, 6), dx = rng.nonZero(-7, 7), dy = rng.nonZero(-7, 7);
      const k = dx * dx + dy * dy;
      if (Number.isInteger(Math.sqrt(k))) return null;
      return num(`The distance from (${fmt(x1)}, ${fmt(y1)}) to (${fmt(x1 + dx)}, ${fmt(y1 + dy)}) is √k. Find k.`, k, {
        traps: [T(Math.abs(dx) + Math.abs(dy), "Square each difference before adding.")],
        hints: [`Differences: ${Math.abs(dx)} across and ${Math.abs(dy)} up or down.`, `k = ${Math.abs(dx)}² + ${Math.abs(dy)}².`],
        solution: [`k = ${dx * dx} + ${dy * dy} = ${k}`, `Distance = √${k}`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 10: Introduction to trigonometry =============================== */
const U10 = {
  [S(10, 1)]: [
    core(S(10, 1), "label-sides", "Labelling the sides", (rng) => {
      const atA = rng.chance(0.5), ask = rng.pick(["opposite", "adjacent"]);
      const names = rng.shuffle(["p", "q", "r", "s", "t", "u"]).slice(0, 3);
      const sides = { AB: names[0], BC: names[1], CA: names[2] };
      const opp = atA ? names[1] : names[0], adj = atA ? names[0] : names[1], hyp = names[2];
      const right = ask === "opposite" ? opp : adj, other = ask === "opposite" ? adj : opp;
      return mc3(rng, `Which side is ${ask} the angle x?`, right, [[other, ask === "opposite" ? "That side touches angle x: it's the adjacent." : "That side doesn't touch angle x: it's the opposite."], [hyp, "That's the hypotenuse, opposite the right angle."]], {
        diagram: triangle({ right: "B", names: false, sides, angles: atA ? { A: "x" } : { C: "x" }, description: `Right-angled triangle with sides ${names.join(", ")} and angle x at ${atA ? "the bottom left" : "the top"}.` }),
        hints: ["The hypotenuse is opposite the right angle.", "The opposite side is across from x; the adjacent side is next to x (and isn't the hypotenuse)."],
        solution: [`Hypotenuse: ${hyp}. Opposite x: ${opp}. Adjacent to x: ${adj}.`], data: {},
      });
    }, () => true),
    extend(S(10, 1), "which-ratio", "Choosing the ratio", (rng) => {
      const pairs = [[["opposite", "hypotenuse"], "sin"], [["adjacent", "hypotenuse"], "cos"], [["opposite", "adjacent"], "tan"]];
      const [[k, w], ratio] = rng.pick(pairs);
      const [known, want] = rng.shuffle([k, w]);
      return mc3(rng, `In a right-angled triangle you know the ${known} side and want to find the ${want} side. Which ratio should you use?`, ratio, ["sin", "cos", "tan"].filter((r) => r !== ratio).map((r) => [r, `${r} uses the ${{ sin: "opposite and hypotenuse", cos: "adjacent and hypotenuse", tan: "opposite and adjacent" }[r]}.`]), {
        hints: ["SOH CAH TOA.", `Which ratio uses the ${known} and the ${want}?`],
        solution: [`The ${k} and ${w} are linked by ${ratio}.`], data: {},
      });
    }, () => true),
  ],
  [S(10, 2)]: [
    core(S(10, 2), "tan-opposite", "Using tan to find the opposite", (rng) => {
      const A = rng.int(15, 70), adj = rng.int(4, 20);
      const v = adj * Math.tan(rad(A));
      return dp1(`Angle A = ${A}° and the adjacent side AB = ${adj} cm. Find the opposite side BC, to 1 decimal place.`, v, "cm",
        ["You know the adjacent and want the opposite: use tan.", `BC = ${adj} × tan ${A}°.`], [`tan ${A}° = BC ÷ ${adj}`, `BC = ${adj} × tan ${A}° = ${fmt(round(v, 4))}…`],
        { diagram: triangle({ right: "B", sides: { AB: `${adj} cm`, BC: "?" }, angles: { A: `${A}°` }, description: `Right-angled triangle, angle A ${A}°, AB ${adj} cm.` }) });
    }, dpValid),
    extend(S(10, 2), "tan-adjacent", "Using tan to find the adjacent", (rng) => {
      const A = rng.int(15, 70), opp = rng.int(4, 20);
      const v = opp / Math.tan(rad(A));
      return dp1(`Angle A = ${A}° and the opposite side BC = ${opp} cm. Find the adjacent side AB, to 1 decimal place.`, v, "cm",
        ["tan A = opposite ÷ adjacent.", `AB = ${opp} ÷ tan ${A}°.`], [`tan ${A}° = ${opp} ÷ AB`, `AB = ${opp} ÷ tan ${A}° = ${fmt(round(v, 4))}…`],
        { traps: [T(round(opp * Math.tan(rad(A)), 1), "The unknown is on the bottom of the ratio, so divide.")] });
    }, dpValid),
  ],
  [S(10, 3)]: [
    core(S(10, 3), "sin-opposite", "Using sine", (rng) => {
      const A = rng.int(15, 75), h = rng.int(5, 20);
      const v = h * Math.sin(rad(A));
      return dp1(`Angle A = ${A}° and the hypotenuse AC = ${h} cm. Find the opposite side BC, to 1 decimal place.`, v, "cm",
        ["Opposite and hypotenuse: use sin.", `BC = ${h} × sin ${A}°.`], [`sin ${A}° = BC ÷ ${h}`, `BC = ${fmt(round(v, 4))}…`],
        { traps: [T(round(h * Math.cos(rad(A)), 1), "Opposite and hypotenuse use sin, not cos.")], diagram: triangle({ right: "B", sides: { CA: `${h} cm`, BC: "?" }, angles: { A: `${A}°` }, description: `Right-angled triangle, angle A ${A}°, hypotenuse ${h} cm.` }) });
    }, dpValid),
    extend(S(10, 3), "cos-hypotenuse", "Using cosine to find the hypotenuse", (rng) => {
      const A = rng.int(15, 75), adj = rng.int(4, 18);
      const v = adj / Math.cos(rad(A));
      return dp1(`Angle A = ${A}° and the adjacent side AB = ${adj} cm. Find the hypotenuse AC, to 1 decimal place.`, v, "cm",
        ["Adjacent and hypotenuse: use cos.", `AC = ${adj} ÷ cos ${A}°.`], [`cos ${A}° = ${adj} ÷ AC`, `AC = ${fmt(round(v, 4))}…`],
        { traps: [T(round(adj * Math.cos(rad(A)), 1), "The hypotenuse is on the bottom of cos = adj ÷ hyp, so divide.")] });
    }, dpValid),
  ],
  [S(10, 4)]: [
    reuse(y10("y10-u9-l1", 1), S(10, 4), 1, "find-side"),
    extend(S(10, 4), "hyp-from-opposite", "Finding the hypotenuse with sine", (rng) => {
      const A = rng.int(15, 75), opp = rng.int(4, 18);
      const v = opp / Math.sin(rad(A));
      return dp1(`In a right-angled triangle, angle x = ${A}° and the side opposite x is ${opp} cm. Find the hypotenuse, to 1 decimal place.`, v, "cm",
        ["Opposite and hypotenuse: use sin.", `hyp = ${opp} ÷ sin ${A}°.`], [`sin ${A}° = ${opp} ÷ hyp`, `hyp = ${fmt(round(v, 4))}…`]);
    }, dpValid),
  ],
  [S(10, 5)]: [
    core(S(10, 5), "angle-sin", "Finding an angle with sin⁻¹", (rng) => {
      const h = rng.int(6, 20), o = rng.int(2, h - 1);
      const v = deg(Math.asin(o / h));
      return dp1(`In a right-angled triangle, the side opposite angle x is ${o} cm and the hypotenuse is ${h} cm. Find x, to 1 decimal place.`, v, "°",
        ["Opposite and hypotenuse: use sin.", `x = sin⁻¹(${o} ÷ ${h}).`], [`sin x = ${o} ÷ ${h}`, `x = sin⁻¹(${fmt(round(o / h, 4))}…)`],
        { traps: [T(round(deg(Math.acos(o / h)), 1), "Opposite and hypotenuse use sin⁻¹, not cos⁻¹.")] });
    }, dpValid),
    reuse(y10("y10-u9-l1", 2), S(10, 5), 2, "find-angle"),
  ],
};

/* =============================== UNIT 11: Constructions, loci and bearings =============================== */
const U11 = {
  [S(11, 1)]: [
    core(S(11, 1), "possible-triangle", "Can the triangle be drawn?", (rng) => {
      const a = rng.int(3, 8), b = rng.int(3, 8);
      const ok = [a, b, rng.int(Math.abs(a - b) + 1, a + b - 1)];
      const tooLong = [a, b, a + b + rng.int(1, 4)], equal = [a, b, a + b];
      const t = (s) => `${s[0]} cm, ${s[1]} cm, ${s[2]} cm`;
      return mc3(rng, "Which of these sets of lengths can make a triangle?", t(ok), [[t(tooLong), `The two shorter sides (${a} + ${b} = ${a + b}) can't reach across ${tooLong[2]} cm.`], [t(equal), `${a} + ${b} = ${a + b} exactly, so the sides would lie flat.`]], {
        hints: ["For a triangle, the two shorter sides must add up to MORE than the longest side.", "Check each set."],
        solution: [`${t(ok)}: the two shorter sides add up to more than the longest, so it works.`], data: { ok },
      });
    }, (q) => { const s = [...q.data.ok].sort((x, y) => x - y); return s[0] + s[1] > s[2]; }),
    extend(S(11, 1), "largest-third-side", "Largest possible side", (rng) => {
      const a = rng.int(3, 12), b = rng.int(3, 12);
      return num(`Two sides of a triangle are ${a} cm and ${b} cm. The third side is a whole number of cm. What is the largest it can be?`, a + b - 1, {
        unit: "cm", traps: [T(a + b, `If the third side were ${a + b} cm, the other two would lie flat along it.`)],
        hints: ["The two shorter sides must add up to more than the longest side.", `So the third side must be less than ${a} + ${b} = ${a + b}.`],
        solution: [`Third side < ${a + b}`, `Largest whole number: ${a + b - 1} cm`], data: {},
      });
    }, () => true),
  ],
  [S(11, 2)]: [
    core(S(11, 2), "perp-bisector-property", "Perpendicular bisectors", (rng) => mc3(rng, "Every point on the perpendicular bisector of a line segment AB is…", "the same distance from A as from B", [["the same distance from two lines", "That describes an angle bisector."], ["a fixed distance from the midpoint of AB", "That would be a circle, not a straight line."]], {
      hints: ["The perpendicular bisector cuts AB in half at right angles.", "Think of the arcs you draw from A and B with the same radius."],
      solution: ["Each point on the perpendicular bisector is equidistant from A and B."], data: {},
    }), () => true),
    reuse(y10("y10-u6-l2", 1), S(11, 2), 2, "midpoint"),
  ],
  [S(11, 3)]: [
    core(S(11, 3), "angle-bisector-property", "Angle bisectors", (rng) => mc3(rng, "Every point on the bisector of angle ABC is…", "the same distance from the lines BA and BC", [["the same distance from the points A and C", "That describes the perpendicular bisector of AC."], ["the same distance from B", "That would be a circle centred on B."]], {
      hints: ["An angle bisector cuts an angle exactly in half.", "Think about how far a point on it is from each arm of the angle."],
      solution: ["Points on the angle bisector are equidistant from the two lines (arms) of the angle."], data: {},
    }), () => true),
    extend(S(11, 3), "bisect-twice", "Bisecting angles", (rng) => {
      const a = rng.pick([40, 60, 72, 80, 100, 120, 140, 160]);
      return num(`An angle of ${a}° is bisected. Then one of the new angles is bisected again. What is the size of each of the smallest angles?`, a / 4, {
        unit: "°", traps: [T(a / 2, "That's after the first bisection only.")],
        hints: ["Bisecting halves an angle.", `${a} ÷ 2 = ${a / 2}, then halve again.`], solution: [`${a} ÷ 2 = ${a / 2}`, `${a / 2} ÷ 2 = ${fmt(a / 4)}°`], data: {},
      });
    }, () => true),
  ],
  [S(11, 4)]: [
    core(S(11, 4), "locus-point", "Locus from a point", (rng) => {
      const d = rng.int(2, 8);
      return mc3(rng, `What is the locus of points exactly ${d} cm from a point P?`, `A circle with centre P and radius ${d} cm`, [[`A straight line ${d} cm long`, "Points can be in any direction from P."], [`A square with sides ${d * 2} cm`, `The corners of a square are more than ${d} cm from its centre.`]], {
        hints: ["Imagine all the points that are the same distance from P.", "They are in every direction."],
        solution: [`All points ${d} cm from P form a circle of radius ${d} cm.`], data: {},
      });
    }, () => true),
    extend(S(11, 4), "locus-segment", "Locus from a line segment", (rng) => {
      const d = rng.int(2, 6);
      return mc3(rng, `What is the locus of points exactly ${d} cm from a line segment AB?`, "Two parallel lines joined by a semicircle at each end", [["A rectangle around AB", "Points near the ends A and B curve around them."], [`A circle of radius ${d} cm`, "That's the locus from a single point."]], {
        hints: ["Along the middle of AB, the points form lines parallel to AB.", "Around each end, the points are a fixed distance from A or B."],
        solution: ["Parallel lines on either side of AB, joined by semicircles centred on A and B (a ‘running track’ shape)."], data: {},
      });
    }, () => true),
  ],
  [S(11, 5)]: [
    core(S(11, 5), "back-bearing", "Back bearings", (rng) => {
      const b = rng.int(10, 350);
      if (b === 180) return null;
      const back = b < 180 ? b + 180 : b - 180;
      const three = (x) => String(x).padStart(3, "0");
      return num(`The bearing of B from A is ${three(b)}°. What is the bearing of A from B?`, back, {
        unit: "°", answerText: `${three(back)}°`, traps: [T(360 - b, "A back bearing is in the opposite direction: add or subtract 180°.")],
        hints: ["The return journey points in exactly the opposite direction.", b < 180 ? "Add 180°." : "Subtract 180°."], solution: [`${b} ${b < 180 ? "+" : "−"} 180 = ${back}`, `Bearing ${three(back)}°`], data: {},
      });
    }, () => true),
    extend(S(11, 5), "bearing-diagram", "Reading a bearing", (rng) => {
      const b = rng.int(100, 260);
      const three = (x) => String(x).padStart(3, "0");
      const phi = Math.abs(180 - b);
      if (b === 180 || phi < 20) return null;
      const P = [170, 115], R = 90;
      const B = [P[0] + R * Math.sin(rad(b)), P[1] - R * Math.cos(rad(b))];
      return mc3(rng, "The diagram shows point B from point A. The angle shown is measured from the dashed SOUTH line. What is the bearing of B from A?", `${three(b)}°`, [[`${three(phi)}°`, "Bearings are measured from NORTH, clockwise."], [`${three(360 - b)}°`, "Bearings go clockwise from north, not anticlockwise."]], {
        diagram: { kind: "shapes", width: 340, height: 230, note: false,
          polys: [{ pts: [P, [P[0], P[1] - 100]], open: true }, { pts: [P, [P[0], P[1] + 100]], open: true, dashed: true }, { pts: [P, B], open: true }],
          labels: [{ at: [P[0], P[1] - 106], text: "N" }, { at: [P[0] - 14, P[1] + 4], text: "A" }, { at: [B[0] + (b < 180 ? 12 : -12), B[1] + 4], text: "B" }, { at: [P[0] + 52 * Math.sin(rad((180 + b) / 2)), P[1] - 52 * Math.cos(rad((180 + b) / 2)) + 5], text: `${phi}°`, small: true }],
          description: `North line at A, with B in the ${b < 180 ? "south-east" : "south-west"}, ${phi}° from the south line.` },
        hints: ["A bearing is measured clockwise from north, with three figures.", b < 180 ? `From north round to south is 180°. B is ${phi}° before south.` : `From north round to south is 180°. B is ${phi}° past south.`],
        solution: [b < 180 ? `180 − ${phi} = ${b}` : `180 + ${phi} = ${b}`, `Bearing ${three(b)}°`], data: {},
      });
    }, () => true),
  ],
  [S(11, 6)]: [
    core(S(11, 6), "scale-drawing-cm", "Scale drawings", (rng) => {
      const s = rng.pick([2, 4, 5, 10, 20]), km = s * clean(rng.int(3, 24) / 2);
      return num(`A scale drawing uses 1 cm to represent ${s} km. A ship sails ${fmt(km)} km. How long is this on the drawing?`, clean(km / s), {
        unit: "cm", traps: [T(km * s, "Divide the real distance by the scale.")],
        hints: [`Each 1 cm represents ${s} km.`, `${fmt(km)} ÷ ${s}.`], solution: [`${fmt(km)} ÷ ${s} = ${fmt(clean(km / s))} cm`], data: {},
      });
    }, () => true),
    extend(S(11, 6), "ratio-scale-km", "Ratio scales", (rng) => {
      const scale = rng.pick([10000, 20000, 25000, 50000]), cm = clean(rng.int(3, 30) / 2);
      const km = clean((cm * scale) / 100000);
      return num(`A plan has a scale of 1 : ${fmt(scale)}. Two points are ${fmt(cm)} cm apart on the plan. How far apart are they in real life, in km?`, km, {
        unit: "km", hints: [`Real distance = ${fmt(cm)} × ${fmt(scale)} cm.`, "Divide by 100,000 to convert cm to km."],
        solution: [`${fmt(cm)} × ${fmt(scale)} = ${fmt(clean(cm * scale))} cm`, `= ${fmt(km)} km`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 12: Analysing data =============================== */
const U12 = {
  [S(12, 1)]: [
    core(S(12, 1), "mean-frequency-table", "Mean from a frequency table", (rng) => {
      const values = [0, 1, 2, 3, 4], f = values.map(() => rng.int(1, 12));
      const n = f.reduce((a, b) => a + b, 0), total = values.reduce((s, v, i) => s + v * f[i], 0);
      return dp1(`The number of pets owned by some students: ${values.map((v, i) => `${v} pets: ${f[i]}`).join("; ")}. Find the mean number of pets, to 1 decimal place.`, total / n, "",
        ["Multiply each value by its frequency and add: that's the total number of pets.", `Divide by the number of students, ${n}.`], [`Total = ${values.map((v, i) => `${v} × ${f[i]}`).join(" + ")} = ${total}`, `Mean = ${total} ÷ ${n} = ${fmt(round(total / n, 4))}…`],
        { traps: [T(round(total / 5, 1), `Divide by the number of students (${n}), not the number of rows.`)] });
    }, dpValid),
    extend(S(12, 1), "median-frequency-table", "Median from a frequency table", (rng) => {
      const values = [1, 2, 3, 4, 5], f = values.map(() => rng.int(2, 10));
      const n = f.reduce((a, b) => a + b, 0);
      if (n % 2 === 0) return null;
      const pos = (n + 1) / 2;
      let c = 0, med = 0;
      for (let i = 0; i < 5; i++) { c += f[i]; if (c >= pos) { med = values[i]; break; } }
      return num(`Shoe-shop survey (number of pairs owned): ${values.map((v, i) => `${v}: ${f[i]}`).join("; ")}. Find the median.`, med, {
        hints: [`There are ${n} people, so the median is the ${pos}th value.`, "Add up the frequencies until you reach the " + pos + "th person."],
        solution: [`n = ${n}; median position = ${pos}`, `Running totals: ${f.reduce((acc, x) => [...acc, (acc.at(-1) ?? 0) + x], []).join(", ")}`, `The ${pos}th value is ${med}`], data: { f, med },
      });
    }, (q) => { const n = q.data.f.reduce((a, b) => a + b, 0); let c = 0; for (let i = 0; i < 5; i++) { c += q.data.f[i]; if (c >= (n + 1) / 2) return i + 1 === q.answer.value; } return false; }),
  ],
  [S(12, 2)]: [
    core(S(12, 2), "estimated-mean", "Estimated mean from grouped data", (rng) => {
      const f = [rng.int(2, 10), rng.int(4, 14), rng.int(5, 15), rng.int(2, 10)];
      const mids = [5, 15, 25, 35], n = f.reduce((a, b) => a + b, 0), total = mids.reduce((s, m, i) => s + m * f[i], 0);
      return dp1(`Times (minutes): 0 < t ≤ 10: ${f[0]}; 10 < t ≤ 20: ${f[1]}; 20 < t ≤ 30: ${f[2]}; 30 < t ≤ 40: ${f[3]}. Estimate the mean time, to 1 decimal place.`, total / n, "minutes",
        ["Use the midpoint of each group: 5, 15, 25, 35.", "Multiply each midpoint by its frequency, add, and divide by the total frequency."], [`Σfx = ${mids.map((m, i) => `${m} × ${f[i]}`).join(" + ")} = ${total}`, `Mean ≈ ${total} ÷ ${n}`]);
    }, dpValid),
    extend(S(12, 2), "median-class", "The class containing the median", (rng) => {
      const f = [rng.int(2, 10), rng.int(4, 14), rng.int(5, 15), rng.int(2, 10)];
      const n = f.reduce((a, b) => a + b, 0), pos = (n + 1) / 2;
      const labels = ["0 < t ≤ 10", "10 < t ≤ 20", "20 < t ≤ 30", "30 < t ≤ 40"];
      let c = 0, k = 0; for (let i = 0; i < 4; i++) { c += f[i]; if (c >= pos) { k = i; break; } }
      const modal = f.indexOf(Math.max(...f));
      const wrong = [0, 1, 2, 3].filter((i) => i !== k);
      const w1 = modal !== k ? modal : wrong[0], w2 = wrong.find((i) => i !== w1);
      return mc3(rng, `Times (minutes): ${labels.map((l, i) => `${l}: ${f[i]}`).join("; ")}. Which class contains the median?`, labels[k], [[labels[w1], w1 === modal ? "That's the modal class (the highest frequency)." : "Count through the running totals to the middle value."], [labels[w2], "Count through the running totals to the middle value."]], {
        hints: [`There are ${n} values, so the median is the ${fmt(pos)}th.`, "Add the frequencies until you pass that position."],
        solution: [`Running totals: ${f.reduce((acc, x) => [...acc, (acc.at(-1) ?? 0) + x], []).join(", ")}`, `The ${fmt(pos)}th value is in ${labels[k]}`], data: {},
      });
    }, () => true),
  ],
  [S(12, 3)]: [
    core(S(12, 3), "compare-mean-range", "Comparing with the mean and range", (rng) => {
      const mA = rng.int(40, 70), mB = mA + rng.nonZero(-12, 12), rA = rng.int(10, 40);
      const rB = rA + rng.nonZero(-15, 15);
      if (rB <= 3 || Math.abs(rB - rA) < 3) return null;
      const hi = mA > mB ? "A" : "B", lo = hi === "A" ? "B" : "A", con = rA < rB ? "A" : "B", inc = con === "A" ? "B" : "A";
      const st = (h, c) => `Team ${h} scored more on average; team ${c}'s scores were more consistent.`;
      return mc3(rng, `Team A: mean ${mA}, range ${rA}. Team B: mean ${mB}, range ${rB}. Which statement is correct?`, st(hi, con), [[st(lo, con), "The higher mean is the higher average."], [st(hi, inc), "A SMALLER range means more consistent."]], {
        hints: ["Compare the means for the average.", "Compare the ranges for consistency: smaller is more consistent."],
        solution: [`Means: ${mA} vs ${mB}`, `Ranges: ${rA} vs ${rB}`, st(hi, con)], data: {},
      });
    }, () => true),
    reuse(y10("y10-u11-l4", 2), S(12, 3), 2, "median-difference"),
  ],
  [S(12, 4)]: [
    core(S(12, 4), "biased-sample", "Spotting bias", (rng) => {
      const scenarios = [
        ["To find out how often people in a town exercise, Ali asks people coming out of a gym.", "Biased: people at a gym probably exercise more than average", [["Fair: a gym is a public place", "People leaving a gym are not typical of the whole town."], ["Fair, as long as he asks at least 10 people", "A bigger sample from the gym is still biased."]]],
        ["To find the favourite subject in a school, Beth asks only her maths class.", "Biased: one class doesn't represent the whole school", [["Fair: every student takes maths", "Her class may share opinions, and other years aren't included."], ["Fair, because the class is chosen at random", "She chose her own class, not a random sample."]]],
        ["To see how people will vote, a reporter asks the first 20 people at a political party's meeting.", "Biased: they are likely to support that party", [["Fair: 20 is enough people", "The size doesn't fix where the sample came from."], ["Fair, because they are adults", "Being adults doesn't make them representative of all voters."]]],
      ];
      const [prompt, right, wrong] = rng.pick(scenarios);
      return mc3(rng, `${prompt} Is the sample fair or biased?`, right, wrong, {
        hints: ["A sample should represent the whole population.", "Would these people answer differently from the rest of the population?"],
        solution: [right], data: {},
      });
    }, () => true),
    extend(S(12, 4), "proportional-sample", "Proportional (stratified) sampling", (rng) => {
      const total = rng.pick([600, 800, 1000, 1200]), sample = rng.pick([40, 50, 60, 80, 100]);
      const group = rng.int(2, 8) * (total / 20);
      const value = (group * sample) / total;
      if (!Number.isInteger(value)) return null;
      return num(`A school has ${total} students, of whom ${group} are in Year 9. A sample of ${sample} students is taken, in proportion to year group size. How many Year 9 students should be in the sample?`, value, {
        traps: [T(clean(sample / 5), "Use the fraction of the school that is in Year 9, not an equal share for each year.")],
        hints: [`Fraction in Year 9 = ${group} ÷ ${total}.`, `Multiply by the sample size, ${sample}.`],
        solution: [`${group} ÷ ${total} × ${sample} = ${value}`], data: {},
      });
    }, () => true),
  ],
  [S(12, 5)]: [
    core(S(12, 5), "time-series-max", "Reading a time series", (rng) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], vals = months.map(() => rng.int(10, 50));
      const max = Math.max(...vals);
      if (vals.filter((v) => v === max).length > 1) return null;
      const k = vals.indexOf(max), min = vals.indexOf(Math.min(...vals));
      const other = [0, 1, 2, 3, 4, 5].find((i) => i !== k && i !== min);
      return mc3(rng, "The line graph shows the number of ice creams sold each month. In which month were the most sold?", months[k], [[months[min], "That's the month with the FEWEST sales."], [months[other], "Look for the highest point on the graph."]], {
        diagram: { kind: "graph", x: [0.5, 6.5], y: [0, 60], xStep: 1, yStep: 10, curves: [{ points: vals.map((v, i) => [i + 1, v]) }], points: vals.map((v, i) => ({ x: i + 1, y: v })), xLabel: "Month (1 = Jan)", yLabel: "Sales", description: `Sales by month: ${months.map((m, i) => `${m} ${vals[i]}`).join(", ")}.` },
        hints: ["Find the highest point on the line.", "Read down to the month (1 = January)."],
        solution: [`The highest point is month ${k + 1}: ${months[k]} (${max} sales).`], data: {},
      });
    }, () => true),
    extend(S(12, 5), "time-series-change", "Change over time", (rng) => {
      const vals = [1, 2, 3, 4, 5, 6].map(() => rng.int(2, 11) * 5);
      const a = rng.int(0, 3), b = a + rng.int(1, 2);
      const diff = vals[b] - vals[a];
      if (diff === 0 || new Set([Math.abs(diff), vals[b], vals[a]]).size < 3) return null;
      return mc3(rng, `The graph shows a shop's weekly sales of umbrellas. By how much did sales ${diff > 0 ? "increase" : "decrease"} from week ${a + 1} to week ${b + 1}?`, String(Math.abs(diff)), [[String(vals[b]), `That's the sales in week ${b + 1}. Find the difference.`], [String(vals[a]), `That's the sales in week ${a + 1}. Find the difference.`]], {
        diagram: { kind: "graph", x: [0.5, 6.5], y: [0, 60], xStep: 1, yStep: 5, labelEvery: 2, curves: [{ points: vals.map((v, i) => [i + 1, v]) }], points: vals.map((v, i) => ({ x: i + 1, y: v })), xLabel: "Week", yLabel: "Sales", description: `Weekly sales: ${vals.join(", ")}.` },
        hints: [`Read the sales in week ${a + 1} and week ${b + 1}.`, "Subtract the smaller from the larger."],
        solution: [`Week ${a + 1}: ${vals[a]}, week ${b + 1}: ${vals[b]}`, `Difference = ${Math.abs(diff)}`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 13: Combined events =============================== */
const U13 = {
  [S(13, 1)]: [
    core(S(13, 1), "two-dice-sum", "Sample spaces: two dice", (rng) => {
      const s = rng.int(3, 11);
      let count = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) count++;
      const f = simplify({ n: count, d: 36 });
      return frac(`Two fair six-sided dice are rolled and the scores are added. What is the probability of a total of ${s}?`, f.n, f.d, {
        traps: [T(1 / 11, "The totals 2 to 12 are NOT equally likely. Use a sample space of all 36 outcomes.")],
        hints: ["Draw a 6 × 6 sample space grid: 36 equally likely outcomes.", `Count the outcomes that add to ${s}.`],
        solution: [`There are ${count} ways to make ${s}`, `P = {${count}/36}${f.d !== 36 ? ` = {${f.n}/${f.d}}` : ""}`], data: {},
      });
    }, () => true),
    extend(S(13, 1), "spinner-product", "Sample spaces: two spinners", (rng) => {
      const a = rng.int(3, 5), b = rng.int(3, 6), target = rng.pick(["even", "greater"]);
      const k = rng.int(4, 10);
      let count = 0; for (let x = 1; x <= a; x++) for (let y = 1; y <= b; y++) { const p = x * y; if (target === "even" ? p % 2 === 0 : p > k) count++; }
      if (count === 0 || count === a * b) return null;
      const f = simplify({ n: count, d: a * b });
      return frac(`A spinner numbered 1 to ${a} and a spinner numbered 1 to ${b} are spun, and the scores are multiplied. Find the probability that the result is ${target === "even" ? "even" : `greater than ${k}`}.`, f.n, f.d, {
        hints: [`Draw a ${a} × ${b} grid of products: ${a * b} outcomes.`, "Count the outcomes that fit."],
        solution: [`${count} of the ${a * b} outcomes`, `P = {${count}/${a * b}}${f.d !== a * b ? ` = {${f.n}/${f.d}}` : ""}`], data: {},
      });
    }, () => true),
  ],
  [S(13, 2)]: [reuse(y10("y10-u12-l3", 1), S(13, 2), 1, "venn-intersection"), reuse(y10("y10-u12-l3", 2), S(13, 2), 2, "venn-union")],
  [S(13, 3)]: [reuse(y10("y10-u12-l1", 1), S(13, 3), 1, "both-independent"), reuse(y10("y10-u12-l2", 1), S(13, 3), 2, "both-without-replacement")],
  [S(13, 4)]: [
    core(S(13, 4), "coin-and-dice", "Independent events", (rng) => {
      const set = rng.pick([["a six", 1], ["an even number", 3], ["a number less than 3", 2], ["a prime number", 3], ["a 1 or a 2", 2]]);
      const f = simplify({ n: set[1], d: 12 });
      return frac(`A fair coin is flipped and a fair dice is rolled. Find the probability of getting heads and ${set[0]}.`, f.n, f.d, {
        traps: [T(0.5 + set[1] / 6, "For two independent events happening together, MULTIPLY.")],
        hints: [`P(heads) = {1/2}, P(${set[0]}) = {${set[1]}/6}.`, "Multiply them."],
        solution: [`{1/2} × {${set[1]}/6} = {${set[1]}/12}${f.d !== 12 ? ` = {${f.n}/${f.d}}` : ""}`], data: {},
      });
    }, () => true),
    reuse(y10("y10-u12-l1", 2), S(13, 4), 2, "at-least-one"),
  ],
};

export const Y9B_GENERATORS = { ...U8, ...U9, ...U10, ...U11, ...U12, ...U13 };
