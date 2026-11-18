/* ==========================================================================
   Year 10 generators, Units 9–12
   (Further trigonometry · Circles, surface area and volume ·
    Cumulative frequency, box plots and histograms · Probability)
   Angles are in degrees throughout.
   ========================================================================== */
import { clean, fmt, round, simplify } from "../numbers.js";
import { core, extend, frac, mc3, multi, num, T, triangle } from "./helpers.js";

const S = (u, l) => `y10-u${u}-l${l}`;
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const safe1 = (x) => Math.abs(((Math.abs(x) * 10) % 1) - 0.5) > 1e-4; // avoid ambiguous rounding
// A simplified fraction label for multiple choice, e.g. "{3/8}"
const fl = (n, d) => { const f = simplify({ n, d }); return f.d === 1 ? String(f.n) : `{${f.n}/${f.d}}`; };

/* =============================== UNIT 9: Further trigonometry =============================== */
const U9 = {
  [S(9, 1)]: [
    core(S(9, 1), "find-side", "Finding a side with SOHCAHTOA", (rng) => {
      const A = rng.int(20, 70), h = rng.int(5, 20), useSin = rng.chance(0.5);
      const v = useSin ? h * Math.sin(rad(A)) : h * Math.cos(rad(A));
      if (!safe1(v)) return null;
      return num(`In triangle ABC, angle B = 90°, angle A = ${A}° and the hypotenuse AC = ${h} cm. Find the length of ${useSin ? "BC (opposite A)" : "AB (adjacent to A)"}, to 1 decimal place.`, round(v, 1), {
        dp: 1, unit: "cm",
        traps: [T(round(useSin ? h * Math.cos(rad(A)) : h * Math.sin(rad(A)), 1), useSin ? "BC is OPPOSITE angle A, so use sine." : "AB is ADJACENT to angle A, so use cosine.")],
        diagram: triangle({ right: "B", sides: { CA: `${h} cm`, ...(useSin ? { BC: "?" } : { AB: "?" }) }, angles: { A: `${A}°` }, description: `Right-angled triangle, right angle at B, angle A ${A}°, hypotenuse ${h} cm.` }),
        hints: [`Label the sides: you know the hypotenuse and want the ${useSin ? "opposite" : "adjacent"}.`, `${useSin ? "sin" : "cos"} ${A}° = ${useSin ? "opp" : "adj"} ÷ hyp, so ${useSin ? "opp" : "adj"} = ${h} × ${useSin ? "sin" : "cos"} ${A}°.`],
        solution: [`${useSin ? "sin" : "cos"} ${A}° = x ÷ ${h}`, `x = ${h} × ${useSin ? "sin" : "cos"} ${A}° = ${fmt(round(v, 4))}…`, `= ${fmt(round(v, 1), 1)} cm`], data: { v },
      });
    }, (q) => Math.abs(round(q.data.v, 1) - q.answer.value) < 1e-9),
    extend(S(9, 1), "find-angle", "Finding an angle", (rng) => {
      const opp = rng.int(3, 15), adj = rng.int(3, 15);
      const a = deg(Math.atan(opp / adj));
      if (!safe1(a)) return null;
      return num(`In a right-angled triangle, the side opposite angle x is ${opp} cm and the side adjacent to x is ${adj} cm. Find x to 1 decimal place.`, round(a, 1), {
        dp: 1, unit: "°", traps: [T(round(deg(Math.atan(adj / opp)), 1), "Tangent is opposite ÷ adjacent, not the other way round.")],
        hints: ["You know the opposite and adjacent: use tan.", `x = tan⁻¹(${opp} ÷ ${adj}).`],
        solution: [`tan x = ${opp} ÷ ${adj}`, `x = tan⁻¹(${fmt(round(opp / adj, 4))}) = ${fmt(round(a, 3))}…`, `x = ${fmt(round(a, 1), 1)}°`], data: { a },
      });
    }, (q) => Math.abs(round(q.data.a, 1) - q.answer.value) < 1e-9),
  ],
  [S(9, 2)]: [
    core(S(9, 2), "exact-value", "Exact trigonometric values", (rng) => {
      const table = { sin: { 0: "0", 30: "{1/2}", 45: "√2 ÷ 2", 60: "√3 ÷ 2", 90: "1" }, cos: { 0: "1", 30: "√3 ÷ 2", 45: "√2 ÷ 2", 60: "{1/2}", 90: "0" }, tan: { 0: "0", 30: "√3 ÷ 3", 45: "1", 60: "√3" } };
      const fn = rng.pick(["sin", "cos", "tan"]);
      const angles = Object.keys(table[fn]).filter((a) => !["0", "90"].includes(a));
      const a = rng.pick(angles);
      const right = table[fn][a];
      const wrongs = [...new Set(Object.values(table[fn]).filter((v) => v !== right))].slice(0, 5);
      const picks = rng.shuffle(wrongs).slice(0, 2);
      return mc3(rng, `What is the exact value of ${fn} ${a}°?`, right, picks.map((p) => [p, "Use the exact-values triangles (the 1, 1, √2 triangle and the 1, √3, 2 triangle)."]), {
        hints: [a === "45" ? "Use an isosceles right-angled triangle with shorter sides 1 and hypotenuse √2." : "Use half of an equilateral triangle: sides 1, √3 and 2.", `${fn} = ${fn === "sin" ? "opp ÷ hyp" : fn === "cos" ? "adj ÷ hyp" : "opp ÷ adj"}.`],
        solution: [`${fn} ${a}° = ${right}`], data: {},
      });
    }, () => true),
    extend(S(9, 2), "exact-calculation", "Calculating with exact values", (rng) => {
      const vals = [["sin 30°", 0.5], ["cos 60°", 0.5], ["tan 45°", 1], ["sin 90°", 1], ["cos 0°", 1], ["cos 90°", 0], ["sin 0°", 0]];
      const [p, q] = rng.shuffle(vals).slice(0, 2);
      const a = rng.int(2, 9), b = rng.int(2, 9), plus = rng.chance(0.6);
      const value = clean(a * p[1] + (plus ? 1 : -1) * b * q[1]);
      return num(`Without a calculator, work out ${a} ${p[0]} ${plus ? "+" : "−"} ${b} ${q[0]}.`, value, {
        hints: ["Replace each trig value with its exact value.", `${p[0]} = ${fmt(p[1])} and ${q[0]} = ${fmt(q[1])}.`],
        solution: [`${a} × ${fmt(p[1])} ${plus ? "+" : "−"} ${b} × ${fmt(q[1])}`, `= ${fmt(value)}`], data: {},
      });
    }, () => true),
  ],
  [S(9, 3)]: [
    core(S(9, 3), "sine-rule-side", "Sine rule: finding a side", (rng) => {
      const A = rng.int(35, 80), B = rng.int(30, 75), a = rng.int(6, 18);
      if (A + B >= 160) return null;
      const b = (a * Math.sin(rad(B))) / Math.sin(rad(A));
      if (!safe1(b)) return null;
      return num(`In triangle ABC, angle A = ${A}°, angle B = ${B}° and BC = ${a} cm. Find AC to 1 decimal place.`, round(b, 1), {
        dp: 1, unit: "cm",
        diagram: triangle({ sides: { BC: `${a} cm`, CA: "?" }, angles: { A: `${A}°`, B: `${B}°` }, description: `Triangle ABC with angle A ${A}°, angle B ${B}°, BC ${a} cm.` }),
        hints: ["Sine rule: a ÷ sin A = b ÷ sin B. Side a is opposite angle A.", `AC = ${a} × sin ${B}° ÷ sin ${A}°.`],
        solution: [`AC ÷ sin ${B}° = ${a} ÷ sin ${A}°`, `AC = ${a} × sin ${B}° ÷ sin ${A}° = ${fmt(round(b, 4))}…`, `= ${fmt(round(b, 1), 1)} cm`], data: { b },
      });
    }, (q) => Math.abs(round(q.data.b, 1) - q.answer.value) < 1e-9),
    extend(S(9, 3), "sine-rule-angle", "Sine rule: finding an angle", (rng) => {
      const A = rng.int(40, 100), a = rng.int(8, 20), b = rng.int(4, a - 1);
      const B = deg(Math.asin((b * Math.sin(rad(A))) / a));
      if (!safe1(B)) return null;
      return num(`In triangle ABC, angle A = ${A}°, BC = ${a} cm and AC = ${b} cm. Angle B is acute. Find angle B to 1 decimal place.`, round(B, 1), {
        dp: 1, unit: "°",
        hints: ["sin B ÷ b = sin A ÷ a.", `sin B = ${b} × sin ${A}° ÷ ${a}. Then use sin⁻¹.`],
        solution: [`sin B = ${b} × sin ${A}° ÷ ${a} = ${fmt(round((b * Math.sin(rad(A))) / a, 4))}…`, `B = ${fmt(round(B, 1), 1)}°`], data: { B },
      });
    }, (q) => Math.abs(round(q.data.B, 1) - q.answer.value) < 1e-9),
  ],
  [S(9, 4)]: [
    core(S(9, 4), "cosine-rule-side", "Cosine rule: finding a side", (rng) => {
      const b = rng.int(5, 15), c = rng.int(5, 15), A = rng.int(30, 120);
      const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad(A)));
      if (!safe1(a)) return null;
      return num(`In triangle ABC, AB = ${c} cm, AC = ${b} cm and angle A = ${A}°. Find BC to 1 decimal place.`, round(a, 1), {
        dp: 1, unit: "cm",
        diagram: triangle({ sides: { AB: `${c} cm`, CA: `${b} cm`, BC: "?" }, angles: { A: `${A}°` }, description: `Triangle ABC with AB ${c} cm, AC ${b} cm and angle A ${A}°.` }),
        hints: ["Cosine rule: a² = b² + c² − 2bc cos A.", `a² = ${b}² + ${c}² − 2 × ${b} × ${c} × cos ${A}°.`],
        solution: [`a² = ${b * b} + ${c * c} − ${2 * b * c} cos ${A}° = ${fmt(round(a * a, 3))}…`, `a = ${fmt(round(a, 4))}…`, `BC = ${fmt(round(a, 1), 1)} cm`], data: { a },
      });
    }, (q) => Math.abs(round(q.data.a, 1) - q.answer.value) < 1e-9),
    extend(S(9, 4), "cosine-rule-angle", "Cosine rule: finding an angle", (rng) => {
      const a = rng.int(5, 15), b = rng.int(5, 15), c = rng.int(5, 15);
      if (a >= b + c || b >= a + c || c >= a + b) return null;
      const A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      if (!safe1(A)) return null;
      return num(`A triangle has sides AB = ${c} cm, AC = ${b} cm and BC = ${a} cm. Find angle A to 1 decimal place.`, round(A, 1), {
        dp: 1, unit: "°",
        hints: ["Rearranged cosine rule: cos A = (b² + c² − a²) ÷ 2bc.", `cos A = (${b * b} + ${c * c} − ${a * a}) ÷ ${2 * b * c}.`],
        solution: [`cos A = ${b * b + c * c - a * a} ÷ ${2 * b * c} = ${fmt(round((b * b + c * c - a * a) / (2 * b * c), 4))}…`, `A = ${fmt(round(A, 1), 1)}°`], data: { A },
      });
    }, (q) => Math.abs(round(q.data.A, 1) - q.answer.value) < 1e-9),
  ],
  [S(9, 5)]: [
    core(S(9, 5), "area-sine", "Area using ½ab sin C", (rng) => {
      const a = rng.int(4, 15), b = rng.int(4, 15), C = rng.int(25, 150);
      const area = 0.5 * a * b * Math.sin(rad(C));
      if (!safe1(area)) return null;
      return num(`Find the area of a triangle with sides ${a} cm and ${b} cm and an angle of ${C}° between them. Give your answer to 1 decimal place.`, round(area, 1), {
        dp: 1, unit: "cm²", traps: [T(round(0.5 * a * b, 1), "You need to multiply by sin C as well.")],
        hints: ["Area = ½ab sin C, where C is the angle between sides a and b.", `Area = 0.5 × ${a} × ${b} × sin ${C}°.`],
        solution: [`0.5 × ${a} × ${b} × sin ${C}° = ${fmt(round(area, 4))}…`, `= ${fmt(round(area, 1), 1)} cm²`], data: { area },
      });
    }, (q) => Math.abs(round(q.data.area, 1) - q.answer.value) < 1e-9),
    extend(S(9, 5), "area-find-side", "Using the area to find a side", (rng) => {
      const a = rng.int(5, 14), C = rng.pick([30, 45, 60, 50, 70, 40]), b = rng.int(4, 15);
      const area = round(0.5 * a * b * Math.sin(rad(C)), 1);
      const exact = area / (0.5 * a * Math.sin(rad(C)));
      if (!safe1(exact)) return null;
      return num(`A triangle has area ${fmt(area, 1)} cm². Two of its sides are ${a} cm and x cm, with an angle of ${C}° between them. Find x to 1 decimal place.`, round(exact, 1), {
        dp: 1, unit: "cm",
        hints: [`${fmt(area, 1)} = ½ × ${a} × x × sin ${C}°.`, `x = ${fmt(area, 1)} ÷ (0.5 × ${a} × sin ${C}°).`],
        solution: [`${fmt(area, 1)} = ${fmt(round(0.5 * a * Math.sin(rad(C)), 4))}… × x`, `x = ${fmt(round(exact, 4))}…`, `x = ${fmt(round(exact, 1), 1)} cm`], data: { exact },
      });
    }, (q) => Math.abs(round(q.data.exact, 1) - q.answer.value) < 1e-9),
  ],
  [S(9, 6)]: [
    core(S(9, 6), "cuboid-diagonal", "3D Pythagoras", (rng) => {
      const l = rng.int(3, 12), w = rng.int(2, 10), h = rng.int(2, 10);
      const d = Math.sqrt(l * l + w * w + h * h);
      if (Number.isInteger(d) || !safe1(d)) return null;
      return num(`A cuboid measures ${l} cm by ${w} cm by ${h} cm. Find the length of the longest diagonal (from one corner to the opposite corner), to 1 decimal place.`, round(d, 1), {
        dp: 1, unit: "cm", traps: [T(round(Math.sqrt(l * l + w * w), 1), "That's the diagonal of the base only. Use it with the height to find the 3D diagonal.")],
        hints: ["Find the diagonal of the base first, then use it with the height.", `d = √(${l}² + ${w}² + ${h}²).`],
        solution: [`d² = ${l * l} + ${w * w} + ${h * h} = ${l * l + w * w + h * h}`, `d = ${fmt(round(d, 4))}…`, `= ${fmt(round(d, 1), 1)} cm`], data: { d },
      });
    }, (q) => Math.abs(round(q.data.d, 1) - q.answer.value) < 1e-9),
    extend(S(9, 6), "diagonal-angle", "Angle between a diagonal and a plane", (rng) => {
      const l = rng.int(3, 12), w = rng.int(2, 10), h = rng.int(2, 10);
      const ang = deg(Math.atan(h / Math.sqrt(l * l + w * w)));
      if (!safe1(ang)) return null;
      return num(`A cuboid measures ${l} cm long, ${w} cm wide and ${h} cm high. Find the angle between the longest diagonal and the base, to 1 decimal place.`, round(ang, 1), {
        dp: 1, unit: "°",
        hints: [`The base diagonal is √(${l}² + ${w}²) = √${l * l + w * w}.`, `tan θ = height ÷ base diagonal = ${h} ÷ √${l * l + w * w}.`],
        solution: [`Base diagonal = √${l * l + w * w} = ${fmt(round(Math.sqrt(l * l + w * w), 4))}…`, `tan θ = ${h} ÷ ${fmt(round(Math.sqrt(l * l + w * w), 4))}…`, `θ = ${fmt(round(ang, 1), 1)}°`], data: { ang },
      });
    }, (q) => Math.abs(round(q.data.ang, 1) - q.answer.value) < 1e-9),
  ],
};

/* =============================== UNIT 10: Circles, surface area and volume =============================== */
function dpNum(prompt, exact, unit, hints, solutionHead, data = {}, traps = []) {
  if (!safe1(exact)) return null;
  return num(prompt, round(exact, 1), { dp: 1, unit, hints, traps, solution: [...solutionHead, `= ${fmt(round(exact, 1), 1)} ${unit}`], data: { exact, ...data } });
}
const dpValid = (q) => Math.abs(round(q.data.exact, 1) - q.answer.value) < 1e-9;

const U10 = {
  [S(10, 1)]: [
    core(S(10, 1), "arc-length", "Arc length", (rng) => {
      const r = rng.int(3, 15), t = rng.pick([30, 40, 45, 60, 72, 80, 100, 120, 135, 150, 210, 240]);
      const L = (t / 360) * 2 * Math.PI * r;
      return dpNum(`A sector of a circle has radius ${r} cm and angle ${t}°. Find the arc length, to 1 decimal place.`, L, "cm",
        ["Arc length = (angle ÷ 360) × 2πr.", `= (${t} ÷ 360) × 2 × π × ${r}.`], [`(${t} ÷ 360) × 2π × ${r} = ${fmt(round(L, 4))}…`], {}, [T(round((t / 360) * Math.PI * r * r, 1), "That's the sector AREA. Arc length uses the circumference, 2πr.")]);
    }, dpValid),
    extend(S(10, 1), "sector-area", "Sector area", (rng) => {
      const r = rng.int(3, 15), t = rng.pick([30, 40, 45, 60, 72, 80, 100, 120, 135, 150, 210, 240]);
      const A = (t / 360) * Math.PI * r * r;
      return dpNum(`Find the area of a sector with radius ${r} cm and angle ${t}°, to 1 decimal place.`, A, "cm²",
        ["Sector area = (angle ÷ 360) × πr².", `= (${t} ÷ 360) × π × ${r}².`], [`(${t} ÷ 360) × π × ${r * r} = ${fmt(round(A, 4))}…`], {}, [T(round((t / 360) * 2 * Math.PI * r, 1), "That's the arc LENGTH. For area use πr².")]);
    }, dpValid),
  ],
  [S(10, 2)]: [
    core(S(10, 2), "cylinder-volume", "Volume of a cylinder", (rng) => {
      const r = rng.int(2, 12), h = rng.int(3, 20);
      const V = Math.PI * r * r * h;
      return dpNum(`Find the volume of a cylinder with radius ${r} cm and height ${h} cm, to 1 decimal place.`, V, "cm³",
        ["Volume = area of circle × height = πr²h.", `= π × ${r}² × ${h}.`], [`π × ${r * r} × ${h} = ${fmt(round(V, 4))}…`], {}, [T(round(Math.PI * 2 * r * h, 1), "Use r², not 2r.")]);
    }, dpValid),
    extend(S(10, 2), "triangular-prism", "Volume of a triangular prism", (rng) => {
      const b = rng.int(3, 12), h = rng.int(2, 10), l = rng.int(4, 20);
      const V = 0.5 * b * h * l;
      return num(`A triangular prism has a triangular cross-section with base ${b} cm and height ${h} cm. The prism is ${l} cm long. Find its volume.`, V, {
        unit: "cm³", traps: [T(b * h * l, "The cross-section is a triangle: its area is ½ × base × height.")],
        hints: ["Volume of a prism = area of cross-section × length.", `Triangle area = ½ × ${b} × ${h} = ${fmt(0.5 * b * h)}.`],
        solution: [`Cross-section = ½ × ${b} × ${h} = ${fmt(0.5 * b * h)} cm²`, `Volume = ${fmt(0.5 * b * h)} × ${l} = ${fmt(V)} cm³`], data: { b, h, l },
      });
    }, (q) => q.answer.value === (q.data.b * q.data.h * q.data.l) / 2),
  ],
  [S(10, 3)]: [
    core(S(10, 3), "cuboid-surface", "Surface area of a cuboid", (rng) => {
      const l = rng.int(2, 15), w = rng.int(2, 12), h = rng.int(2, 10);
      const A = 2 * (l * w + l * h + w * h);
      return num(`Find the surface area of a cuboid ${l} cm by ${w} cm by ${h} cm.`, A, {
        unit: "cm²", traps: [T(l * w * h, "That's the volume. Surface area adds the areas of the six faces."), T(A / 2, "There are SIX faces: each of the three sizes appears twice.")],
        hints: ["A cuboid has 6 faces in 3 matching pairs.", `Faces: ${l} × ${w}, ${l} × ${h} and ${w} × ${h}, each twice.`],
        solution: [`2 × (${l * w} + ${l * h} + ${w * h}) = ${A} cm²`], data: { l, w, h },
      });
    }, (q) => q.answer.value === 2 * (q.data.l * q.data.w + q.data.l * q.data.h + q.data.w * q.data.h)),
    extend(S(10, 3), "cylinder-surface", "Surface area of a cylinder", (rng) => {
      const r = rng.int(2, 10), h = rng.int(3, 15);
      const A = 2 * Math.PI * r * r + 2 * Math.PI * r * h;
      return dpNum(`Find the total surface area of a closed cylinder with radius ${r} cm and height ${h} cm, to 1 decimal place.`, A, "cm²",
        ["Two circles plus the curved surface (a rectangle 2πr by h).", `2 × π × ${r}² + 2 × π × ${r} × ${h}.`], [`2π × ${r * r} + 2π × ${r * h} = ${fmt(round(A, 4))}…`], {}, [T(round(2 * Math.PI * r * h, 1), "That's only the curved surface. Add the two circular ends.")]);
    }, dpValid),
  ],
  [S(10, 4)]: [
    core(S(10, 4), "sphere-volume", "Volume of a sphere", (rng) => {
      const r = rng.int(2, 12);
      const V = (4 / 3) * Math.PI * r ** 3;
      return dpNum(`Find the volume of a sphere with radius ${r} cm, to 1 decimal place.`, V, "cm³",
        ["Volume of a sphere = (4/3)πr³ (on the formulae sheet).", `= (4/3) × π × ${r}³.`], [`(4/3) × π × ${r ** 3} = ${fmt(round(V, 4))}…`], {}, [T(round(4 * Math.PI * r * r, 1), "That's the surface area formula, 4πr².")]);
    }, dpValid),
    extend(S(10, 4), "cone-volume", "Volume of a cone", (rng) => {
      const r = rng.int(2, 10), h = rng.int(3, 18);
      const V = (1 / 3) * Math.PI * r * r * h;
      return dpNum(`Find the volume of a cone with base radius ${r} cm and perpendicular height ${h} cm, to 1 decimal place.`, V, "cm³",
        ["Volume of a cone = (1/3)πr²h.", `= (1/3) × π × ${r}² × ${h}.`], [`(1/3) × π × ${r * r} × ${h} = ${fmt(round(V, 4))}…`], {}, [T(round(Math.PI * r * r * h, 1), "That's a cylinder. A cone is one third of it.")]);
    }, dpValid),
  ],
  [S(10, 5)]: [
    core(S(10, 5), "pyramid-volume", "Volume of a pyramid", (rng) => {
      const b = rng.int(2, 12), h = rng.int(2, 15);
      if ((b * b * h) % 3 !== 0) return null;
      return num(`A square-based pyramid has base edges ${b} cm and perpendicular height ${h} cm. Find its volume.`, (b * b * h) / 3, {
        unit: "cm³", traps: [T(b * b * h, "A pyramid is one third of the prism with the same base and height.")],
        hints: ["Volume = (1/3) × base area × height.", `Base area = ${b}² = ${b * b}.`],
        solution: [`(1/3) × ${b * b} × ${h} = ${(b * b * h) / 3} cm³`], data: { b, h },
      });
    }, (q) => q.answer.value * 3 === q.data.b ** 2 * q.data.h),
    extend(S(10, 5), "frustum", "Volume of a frustum", (rng) => {
      const H = rng.pick([10, 12, 15, 20]), R = rng.int(4, 10), cut = rng.pick([2, 3, 4, 5].filter((c) => H % c === 0));
      const h = H / cut * rng.int(1, cut - 1), r = (R * h) / H;
      const V = (Math.PI / 3) * (R * R * H - r * r * h);
      return dpNum(`A cone has radius ${R} cm and height ${H} cm. A smaller cone of height ${fmt(h)} cm is cut off the top, leaving a frustum. The small cone has radius ${fmt(clean(r))} cm. Find the volume of the frustum, to 1 decimal place.`, V, "cm³",
        ["Frustum = big cone − small cone.", `(1/3)π × ${R}² × ${H} − (1/3)π × ${fmt(clean(r))}² × ${fmt(h)}.`],
        [`Big cone: ${fmt(round((Math.PI / 3) * R * R * H, 4))}…`, `Small cone: ${fmt(round((Math.PI / 3) * r * r * h, 4))}…`, `Difference = ${fmt(round(V, 4))}…`]);
    }, dpValid),
  ],
};

/* =============================== UNIT 11: Statistics =============================== */
// Build grouped data (class width 10 from 0) and its cumulative frequency curve.
function groupedData(rng) {
  const freqs = [rng.int(2, 8), rng.int(6, 14), rng.int(12, 22), rng.int(10, 20), rng.int(4, 12), rng.int(1, 6)];
  // Make the total a multiple of 4, so the quartile positions are whole numbers.
  freqs[5] += (4 - (freqs.reduce((a, b) => a + b, 0) % 4)) % 4;
  const cum = freqs.reduce((acc, f) => [...acc, (acc.at(-1) ?? 0) + f], []);
  const pts = [[0, 0], ...cum.map((c, i) => [(i + 1) * 10, c])];
  // Read the x-value for a cumulative frequency, by straight-line interpolation.
  const read = (target) => {
    for (let i = 1; i < pts.length; i++) if (pts[i][1] >= target) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return x0 + ((target - y0) / (y1 - y0)) * (x1 - x0); }
    return 60;
  };
  return { freqs, cum, pts, n: cum.at(-1), read };
}
const cfDiagram = (g) => ({ kind: "graph", x: [0, 60], y: [0, Math.ceil(g.n / 10) * 10], xStep: 10, yStep: 10, curves: [{ points: g.pts }], points: g.pts.map(([x, y]) => ({ x, y })), xLabel: "Time (min)", yLabel: "Cumulative frequency", description: `Cumulative frequency graph through ${g.pts.map(([x, y]) => `(${x}, ${y})`).join(", ")}.` });

const U11 = {
  [S(11, 1)]: [
    core(S(11, 1), "cumulative-total", "Cumulative frequency from a table", (rng) => {
      const g = groupedData(rng), k = rng.int(2, 5);
      return num(`The times (in minutes) for a task were grouped: ${g.freqs.map((f, i) => `${i * 10} < t ≤ ${(i + 1) * 10}: ${f}`).join("; ")}. What is the cumulative frequency for t ≤ ${k * 10}?`, g.cum[k - 1], {
        traps: [T(g.freqs[k - 1], "That's the frequency of one group. Cumulative frequency is the running total.")],
        hints: ["Cumulative frequency is a running total of the frequencies.", `Add the frequencies of the first ${k} groups.`],
        solution: [`${g.freqs.slice(0, k).join(" + ")} = ${g.cum[k - 1]}`], data: { g: g.freqs, k },
      });
    }, (q) => q.answer.value === q.data.g.slice(0, q.data.k).reduce((a, b) => a + b, 0)),
    extend(S(11, 1), "median-from-graph", "Median from a cumulative frequency graph", (rng) => {
      const g = groupedData(rng);
      const med = Math.round(g.read(g.n / 2)), lq = Math.round(g.read(g.n / 4)), uq = Math.round(g.read((3 * g.n) / 4));
      if (new Set([med, lq, uq]).size < 3) return null;
      return mc3(rng, `The graph shows the cumulative frequency of times for ${g.n} people. Estimate the median time.`, `${med} minutes`, [[`${lq} minutes`, `That's the lower quartile (reading across from ${g.n / 4}). The median is at ${g.n / 2}.`], [`${uq} minutes`, `That's the upper quartile. The median is half way: read across from ${g.n / 2}.`]], {
        diagram: cfDiagram(g),
        hints: [`The median is the value halfway through the data: ${g.n} ÷ 2 = ${g.n / 2}.`, `Read across from ${g.n / 2} on the cumulative frequency axis to the curve, then down.`],
        solution: [`${g.n} ÷ 2 = ${g.n / 2}`, `Reading across and down gives about ${med} minutes.`], data: {},
      });
    }, () => true),
  ],
  [S(11, 2)]: [
    core(S(11, 2), "iqr-list", "Interquartile range from a list", (rng) => {
      const n = rng.pick([7, 11]);
      const set = new Set(); while (set.size < n) set.add(rng.int(10, 80));
      const v = [...set].sort((a, b) => a - b);
      const lq = v[(n + 1) / 4 - 1], uq = v[(3 * (n + 1)) / 4 - 1];
      return num(`Here are ${n} values in order: ${v.join(", ")}. Find the interquartile range.`, uq - lq, {
        traps: [T(v[n - 1] - v[0], "That's the range. The IQR is upper quartile − lower quartile.")],
        hints: [`For ${n} values, the lower quartile is the ${(n + 1) / 4}${(n + 1) / 4 === 2 ? "nd" : "rd"} value and the upper quartile is the ${(3 * (n + 1)) / 4}th.`, `LQ = ${lq}. Find the UQ, then subtract.`],
        solution: [`LQ = ${lq}, UQ = ${uq}`, `IQR = ${uq} − ${lq} = ${uq - lq}`], data: { v },
      });
    }, (q) => { const v = q.data.v, n = v.length; return q.answer.value === v[(3 * (n + 1)) / 4 - 1] - v[(n + 1) / 4 - 1]; }),
    extend(S(11, 2), "iqr-from-graph", "IQR from a cumulative frequency graph", (rng) => {
      const g = groupedData(rng);
      const med = Math.round(g.read(g.n / 2)), lq = Math.round(g.read(g.n / 4)), uq = Math.round(g.read((3 * g.n) / 4));
      const iqr = uq - lq;
      if (new Set([iqr, med, uq - med]).size < 3 || iqr <= 0) return null;
      return mc3(rng, `The graph shows the cumulative frequency of times for ${g.n} people. Estimate the interquartile range.`, `${iqr} minutes`, [[`${med} minutes`, "That's the median, not the interquartile range."], [`${uq - med} minutes`, "That's the upper quartile minus the median. The IQR is UQ − LQ."]], {
        diagram: cfDiagram(g),
        hints: [`Lower quartile: read across from ${g.n / 4}. Upper quartile: read across from ${(3 * g.n) / 4}.`, "IQR = upper quartile − lower quartile."],
        solution: [`LQ ≈ ${lq}, UQ ≈ ${uq}`, `IQR ≈ ${uq} − ${lq} = ${iqr} minutes`], data: {},
      });
    }, () => true),
  ],
  [S(11, 3)]: [
    core(S(11, 3), "boxplot-median", "Reading a box plot", (rng) => {
      const min = rng.int(0, 10), q1 = min + rng.int(4, 12), med = q1 + rng.int(3, 10), q3 = med + rng.int(3, 12), max = q3 + rng.int(3, 14);
      const ask = rng.pick(["median", "lower quartile", "upper quartile"]);
      const val = { median: med, "lower quartile": q1, "upper quartile": q3 }[ask];
      const others = [["median", med], ["lower quartile", q1], ["upper quartile", q3]].filter(([n]) => n !== ask);
      return mc3(rng, `The box plot shows the marks scored in a test. What is the ${ask}?`, String(val), others.map(([name, v]) => [String(v), `That's the ${name}.`]), {
        diagram: { kind: "boxplot", min, q1, med, q3, max, axis: [0, Math.ceil((max + 2) / 10) * 10], step: 5, unit: "Mark", description: `Box plot: minimum ${min}, lower quartile ${q1}, median ${med}, upper quartile ${q3}, maximum ${max}.` },
        hints: ["The box runs from the lower quartile to the upper quartile.", "The line inside the box is the median."],
        solution: [`Lower quartile ${q1}, median ${med}, upper quartile ${q3}.`, `The ${ask} is ${val}.`], data: {},
      });
    }, () => true),
    extend(S(11, 3), "boxplot-iqr", "IQR from a box plot", (rng) => {
      const min = rng.int(0, 10), q1 = min + rng.int(4, 12), med = q1 + rng.int(3, 10), q3 = med + rng.int(3, 12), max = q3 + rng.int(3, 14);
      if (new Set([q3 - q1, max - min, q3 - med]).size < 3) return null;
      return mc3(rng, "The box plot shows the heights of some plants (cm). What is the interquartile range?", `${q3 - q1} cm`, [[`${max - min} cm`, "That's the range (maximum − minimum)."], [`${q3 - med} cm`, "That's the upper quartile minus the median."]], {
        diagram: { kind: "boxplot", min, q1, med, q3, max, axis: [0, Math.ceil((max + 2) / 10) * 10], step: 5, unit: "Height (cm)", description: `Box plot: minimum ${min}, lower quartile ${q1}, median ${med}, upper quartile ${q3}, maximum ${max}.` },
        hints: ["The IQR is the width of the box.", "IQR = upper quartile − lower quartile."],
        solution: [`IQR = ${q3} − ${q1} = ${q3 - q1} cm`], data: {},
      });
    }, () => true),
  ],
  [S(11, 4)]: [
    core(S(11, 4), "compare-statements", "Comparing distributions", (rng) => {
      const mA = rng.int(40, 70), mB = mA + rng.nonZero(-12, 12), iA = rng.int(6, 20);
      let iB = iA + rng.nonZero(-8, 8);
      if (iB <= 2 || Math.abs(iB - iA) < 2) return null;
      const higher = mA > mB ? "A" : "B", lower = higher === "A" ? "B" : "A", consistent = iA < iB ? "A" : "B", other = consistent === "A" ? "B" : "A";
      const st = (h, c) => `Class ${h} scored higher on average, and class ${c} had more consistent scores.`;
      return mc3(rng, `Class A: median ${mA}, interquartile range ${iA}. Class B: median ${mB}, interquartile range ${iB}. Which statement is correct?`, st(higher, consistent), [[st(lower, consistent), "Compare averages using the median: the higher median scored higher on average."], [st(higher, other), "A SMALLER interquartile range means more consistent scores."]], {
        hints: ["Compare the medians to compare averages.", "Compare the IQRs: the smaller one is more consistent."],
        solution: [`Medians: ${mA} vs ${mB}, so class ${higher} scored higher on average.`, `IQRs: ${iA} vs ${iB}, so class ${consistent} is more consistent.`], data: {},
      });
    }, () => true),
    extend(S(11, 4), "median-difference", "Comparing medians from data", (rng) => {
      const mk = () => { const s = new Set(); while (s.size < 7) s.add(rng.int(10, 60)); return [...s]; };
      const A = mk(), B = mk();
      const med = (v) => [...v].sort((a, b) => a - b)[3];
      const value = Math.abs(med(A) - med(B));
      if (value === 0) return null;
      return num(`Team A scored: ${A.join(", ")}. Team B scored: ${B.join(", ")}. Find the difference between the two medians.`, value, {
        traps: [T(Math.abs(A[3] - B[3]), "Put each list in order before finding the middle value.")],
        hints: ["Write each list in order first.", "With 7 values, the median is the 4th."],
        solution: [`A in order: ${[...A].sort((a, b) => a - b).join(", ")}; median ${med(A)}`, `B in order: ${[...B].sort((a, b) => a - b).join(", ")}; median ${med(B)}`, `Difference = ${value}`], data: { A, B },
      });
    }, (q) => { const med = (v) => [...v].sort((a, b) => a - b)[3]; return Math.abs(med(q.data.A) - med(q.data.B)) === q.answer.value; }),
  ],
  [S(11, 5)]: [
    core(S(11, 5), "frequency-density", "Frequency density", (rng) => {
      const w = rng.pick([5, 10, 20, 25, 4]), fd = rng.pick([0.4, 0.8, 1.2, 1.6, 2, 2.4, 3, 0.6]);
      const f = clean(w * fd);
      if (!Number.isInteger(f)) return null;
      const lo = rng.int(1, 6) * 10;
      return num(`A class interval is ${lo} < x ≤ ${lo + w} and has frequency ${f}. What is its frequency density?`, fd, {
        traps: [T(f, "Frequency density = frequency ÷ class width."), T(clean(f * w), "Divide by the class width; don't multiply.")],
        hints: [`Class width = ${lo + w} − ${lo} = ${w}.`, `Frequency density = ${f} ÷ ${w}.`],
        solution: [`${f} ÷ ${w} = ${fmt(fd)}`], data: { f, w },
      });
    }, (q) => Math.abs(q.data.f / q.data.w - q.answer.value) < 1e-9),
    extend(S(11, 5), "histogram-frequency", "Frequency from a histogram", (rng) => {
      const edges = [0, 10, 15, 20, 30, 50];
      const fds = [rng.int(1, 4), rng.int(3, 8), rng.int(4, 9), rng.int(2, 6), rng.int(1, 3)].map((x) => x * 0.5 + 0.5);
      const i = rng.int(0, 4), w = edges[i + 1] - edges[i];
      const f = clean(fds[i] * w);
      const wrong1 = fds[i], wrong2 = clean(fds[i] * (w === 10 ? 5 : 10));
      if (new Set([f, wrong1, wrong2]).size < 3) return null;
      return mc3(rng, `The histogram shows the lengths of some leaves (mm). How many leaves are in the class ${edges[i]} < x ≤ ${edges[i + 1]}?`, fmt(f), [[fmt(wrong1), "That's the frequency density (the bar's height). Frequency = height × width."], [fmt(wrong2), `Check the class width: ${edges[i + 1]} − ${edges[i]} = ${w}.`]], {
        diagram: { kind: "graph", x: [0, 50], y: [0, 5], xStep: 5, yStep: 0.5, labelEvery: 2, bars: fds.map((h, k) => ({ x0: edges[k], x1: edges[k + 1], h })), xLabel: "Length (mm)", yLabel: "Frequency density", description: `Histogram with bars ${fds.map((h, k) => `${edges[k]}–${edges[k + 1]} height ${h}`).join(", ")}.` },
        hints: ["In a histogram, the AREA of a bar is the frequency.", `Frequency = frequency density × class width = ${fmt(fds[i])} × ${w}.`],
        solution: [`Height ${fmt(fds[i])}, width ${w}`, `Frequency = ${fmt(fds[i])} × ${w} = ${fmt(f)}`], data: {},
      });
    }, () => true),
  ],
};

/* =============================== UNIT 12: Probability =============================== */
const U12 = {
  [S(12, 1)]: [
    core(S(12, 1), "both-independent", "Two independent events", (rng) => {
      const a = rng.int(1, 4), b = rng.pick([5, 6, 8]), c = rng.int(1, 3), d = rng.pick([4, 5, 10]);
      const f = simplify({ n: a * c, d: b * d });
      return frac(`The probability that Ella's bus is late is {${a}/${b}}. The probability that it rains is {${c}/${d}}. The events are independent. Find the probability that the bus is late AND it rains.`, f.n, f.d, {
        traps: [T((a * d + c * b) / (b * d), "For “and”, multiply the probabilities; don't add.")],
        hints: ["For independent events, P(A and B) = P(A) × P(B).", `{${a}/${b}} × {${c}/${d}}: multiply tops, multiply bottoms.`],
        solution: [`{${a}/${b}} × {${c}/${d}} = {${a * c}/${b * d}}`, ...(f.d !== b * d ? [`= {${f.n}/${f.d}}`] : [])], data: {},
      });
    }, () => true),
    extend(S(12, 1), "at-least-one", "At least one", (rng) => {
      const a = rng.int(1, 4), b = rng.pick([5, 6, 8]), c = rng.int(1, 3), d = rng.pick([4, 5, 10]);
      const n = b * d - (b - a) * (d - c), f = simplify({ n, d: b * d });
      return frac(`P(A) = {${a}/${b}} and P(B) = {${c}/${d}}, and A and B are independent. Find the probability that at least one of them happens.`, f.n, f.d, {
        traps: [T((a * d + c * b) / (b * d), "Adding counts “both” twice. Use 1 − P(neither).")],
        hints: ["P(at least one) = 1 − P(neither).", `P(neither) = {${b - a}/${b}} × {${d - c}/${d}}.`],
        solution: [`P(neither) = {${b - a}/${b}} × {${d - c}/${d}} = {${(b - a) * (d - c)}/${b * d}}`, `P(at least one) = 1 − {${(b - a) * (d - c)}/${b * d}} = {${n}/${b * d}}`, ...(f.d !== b * d ? [`= {${f.n}/${f.d}}`] : [])], data: {},
      });
    }, () => true),
  ],
  [S(12, 2)]: [
    core(S(12, 2), "both-without-replacement", "Without replacement", (rng) => {
      const r = rng.int(2, 7), bl = rng.int(2, 8), n = r + bl;
      const f = simplify({ n: r * (r - 1), d: n * (n - 1) });
      return frac(`A bag has ${r} red and ${bl} blue counters. Two are taken out without replacement. Find the probability that both are red.`, f.n, f.d, {
        traps: [T((r * r) / (n * n), "Without replacement, there is one fewer counter (and one fewer red) for the second pick.")],
        hints: [`First pick: P(red) = {${r}/${n}}.`, `Second pick: ${r - 1} reds left out of ${n - 1}.`],
        solution: [`{${r}/${n}} × {${r - 1}/${n - 1}} = {${r * (r - 1)}/${n * (n - 1)}}`, ...(f.d !== n * (n - 1) ? [`= {${f.n}/${f.d}}`] : [])], data: {},
      });
    }, () => true),
    extend(S(12, 2), "one-of-each", "One of each", (rng) => {
      const r = rng.int(2, 7), bl = rng.int(2, 8), n = r + bl;
      const f = simplify({ n: 2 * r * bl, d: n * (n - 1) });
      return frac(`A bag has ${r} red and ${bl} blue counters. Two are taken out without replacement. Find the probability of getting one of each colour.`, f.n, f.d, {
        traps: [T((r * bl) / (n * (n - 1)), "There are two ways: red then blue, OR blue then red. Add both.")],
        hints: ["Red then blue, or blue then red.", `P(RB) = {${r}/${n}} × {${bl}/${n - 1}}, and P(BR) is the same.`],
        solution: [`P(RB) = {${r * bl}/${n * (n - 1)}}, P(BR) = {${r * bl}/${n * (n - 1)}}`, `Total = {${2 * r * bl}/${n * (n - 1)}}`, ...(f.d !== n * (n - 1) ? [`= {${f.n}/${f.d}}`] : [])], data: {},
      });
    }, () => true),
  ],
  [S(12, 3)]: [
    core(S(12, 3), "venn-intersection", "Venn diagrams: A and B", (rng) => {
      const a = rng.int(3, 15), both = rng.int(2, 10), b = rng.int(3, 15), out = rng.int(1, 10), T0 = a + both + b + out;
      const right = fl(both, T0), w1 = fl(a + both, T0), w2 = fl(both, a + both);
      if (new Set([right, w1, w2]).size < 3) return null;
      return mc3(rng, "The Venn diagram shows how many students study French (F) and Spanish (S). A student is chosen at random. Find P(F ∩ S).", right, [[w1, "That's P(F): everyone in the F circle. F ∩ S is only the overlap."], [w2, "Divide by the total number of students, not just those in F."]], {
        diagram: { kind: "venn", a, both, b, out, labels: ["F", "S"] },
        hints: ["∩ means “and”: the overlap of the circles.", `The total number of students is ${a} + ${both} + ${b} + ${out} = ${T0}.`],
        solution: [`F ∩ S = ${both} students`, `P(F ∩ S) = ${right}`], data: {},
      });
    }, () => true),
    extend(S(12, 3), "venn-union", "Venn diagrams: A or B", (rng) => {
      const a = rng.int(3, 15), both = rng.int(2, 10), b = rng.int(3, 15), out = rng.int(1, 10), T0 = a + both + b + out;
      const right = fl(a + both + b, T0), w1 = fl(a + b, T0), w2 = fl(out, T0);
      if (new Set([right, w1, w2]).size < 3) return null;
      return mc3(rng, "The Venn diagram shows how many people own a cat (C) and a dog (D). A person is chosen at random. Find P(C ∪ D).", right, [[w1, "∪ means in C or D or both, so include the overlap."], [w2, "That's the probability of owning neither."]], {
        diagram: { kind: "venn", a, both, b, out, labels: ["C", "D"] },
        hints: ["∪ means “or”: anywhere in either circle.", `Add ${a}, ${both} and ${b}, then divide by ${T0}.`],
        solution: [`C ∪ D = ${a} + ${both} + ${b} = ${a + both + b}`, `P(C ∪ D) = ${right}`], data: {},
      });
    }, () => true),
  ],
  [S(12, 4)]: [
    core(S(12, 4), "two-way-conditional", "Conditional probability from a table", (rng) => {
      const yb = rng.int(5, 20), yf = rng.int(5, 20), nb = rng.int(5, 20), nf = rng.int(5, 20);
      const f = simplify({ n: yf, d: yb + yf });
      return frac(`In a survey, ${yb} Year 10 students chose basketball and ${yf} chose football. ${nb} Year 11 students chose basketball and ${nf} chose football. A Year 10 student is chosen at random. What is the probability they chose football?`, f.n, f.d, {
        traps: [T(yf / (yb + yf + nb + nf), "You're told the student is in Year 10, so only count Year 10 students.")],
        hints: ["“Given Year 10” means you only look at Year 10.", `There are ${yb} + ${yf} = ${yb + yf} Year 10 students.`],
        solution: [`Year 10 total = ${yb + yf}`, `P(football | Year 10) = {${yf}/${yb + yf}}${f.d !== yb + yf ? ` = {${f.n}/${f.d}}` : ""}`], data: {},
      });
    }, () => true),
    extend(S(12, 4), "venn-conditional", "Conditional probability from a Venn diagram", (rng) => {
      const a = rng.int(3, 15), both = rng.int(2, 10), b = rng.int(3, 15), out = rng.int(1, 10), T0 = a + both + b + out;
      const right = fl(both, both + b), w1 = fl(both, T0), w2 = fl(both, a + both);
      if (new Set([right, w1, w2]).size < 3) return null;
      return mc3(rng, "The Venn diagram shows students who play hockey (H) and tennis (T). A student who plays tennis is chosen at random. What is the probability they also play hockey?", right, [[w1, "Given they play tennis, only count the students in the T circle."], [w2, "That's P(T | H). Here you know they play TENNIS."]], {
        diagram: { kind: "venn", a, both, b, out, labels: ["H", "T"] },
        hints: ["“Given they play tennis” means only look at the T circle.", `The T circle has ${both} + ${b} = ${both + b} students.`],
        solution: [`Students in T: ${both + b}`, `Of these, ${both} also play hockey`, `P(H | T) = ${right}`], data: {},
      });
    }, () => true),
  ],
};

export const Y10C_GENERATORS = { ...U9, ...U10, ...U11, ...U12 };
