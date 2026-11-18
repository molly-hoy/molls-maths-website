/* ==========================================================================
   Teaching content: Year 9, Units 8–13 (light format, see light.js)
   ========================================================================== */
import { L } from "./light.js";

export const Y9B_LESSONS = {
  /* ======================= Unit 8: Proportion and compound measures ======================= */
  "y9-u8-l1": L({
    intro: ["Metric units are based on powers of 10, which makes converting between them straightforward, once you know the factors."],
    obj: ["Convert metric units of length, mass, capacity and area"],
    prior: ["Multiplying and dividing by 10, 100 and 1,000"],
    vocab: [["Metric prefixes", "kilo = 1,000; centi = 1/100; milli = 1/1,000."]],
    teach: [
      ["Bigger to smaller: multiply", ["1 km = 1,000 m, 1 m = 100 cm, 1 cm = 10 mm, 1 kg = 1,000 g, 1 litre = 1,000 ml. Converting to a smaller unit gives a bigger number."], "3.4 km = 3,400 m."],
      ["Area units", ["Square the length factor: 1 m² = 100 × 100 = 10,000 cm²."], "2.5 m² = 25,000 cm²."],
    ],
    ex: [
      ["Convert 4,750 g to kg.", ["÷ 1,000"], "4.75 kg"],
      ["Convert 3 cm² to mm².", ["1 cm² = 10 × 10 = 100 mm²"], "300 mm²"],
    ],
    mis: [
      ["Using 100 for m² to cm².", "Area is two-dimensional.", "Multiply by 100 twice: 10,000."],
    ],
    check: ["I can convert metric units", "I can convert area units"],
  }),
  "y9-u8-l2": L({
    intro: ["Speed links distance and time. Knowing one formula lets you find any of the three."],
    obj: ["Calculate speed, distance and time, including in minutes"],
    prior: ["Rearranging formulae", "Converting minutes and hours"],
    vocab: [["Average speed", "Total distance ÷ total time."]],
    teach: [
      ["The triangle", ["Speed = distance ÷ time. Distance = speed × time. Time = distance ÷ speed. Keep units consistent: km with hours for km/h."], "45 km at 60 km/h: 45 ÷ 60 = 0.75 h = 45 minutes."],
    ],
    ex: [
      ["150 km in 2.5 hours. Average speed?", ["150 ÷ 2.5"], "60 km/h"],
      ["How far in 20 minutes at 72 km/h?", ["20 min = ⅓ h", "72 × ⅓"], "24 km"],
    ],
    mis: [
      ["Writing 1 h 30 min as 1.3 h.", "30 minutes is half an hour.", "1.5 hours."],
    ],
    check: ["I can find speed, distance and time", "I can work with minutes"],
  }),
  "y9-u8-l3": L({
    intro: ["Density tells you how heavy a material is for its size. Gold is far denser than wood."],
    obj: ["Use density = mass ÷ volume"],
    prior: ["Rearranging formulae"],
    vocab: [["Density", "Mass per unit volume, e.g. g/cm³."]],
    teach: [
      ["Three forms", ["Density = mass ÷ volume. Mass = density × volume. Volume = mass ÷ density."], "Density 2.7 g/cm³, volume 10 cm³: mass 27 g."],
    ],
    ex: [
      ["Mass 240 g, volume 30 cm³. Density?", ["240 ÷ 30"], "8 g/cm³"],
      ["Mass 50 g, density 2.5 g/cm³. Volume?", ["50 ÷ 2.5"], "20 cm³"],
    ],
    mis: [
      ["Multiplying when you should divide.", "Check the units: g/cm³ means g ÷ cm³.", "Use the units as a guide."],
    ],
    check: ["I can find density, mass and volume"],
  }),
  "y9-u8-l4": L({
    intro: ["Compound measures combine two units, like m/s, N/m² or litres per minute."],
    obj: ["Use pressure and rates", "Convert compound units"],
    prior: ["Speed and density"],
    vocab: [["Pressure", "Force ÷ area, measured in N/m²."], ["Rate", "How much per unit of time."]],
    teach: [
      ["Pressure", ["Pressure = force ÷ area."], "100 N on 4 m²: 25 N/m²."],
      ["Converting m/s and km/h", ["1 m/s = 3,600 m per hour = 3.6 km/h. So m/s → km/h: × 3.6; km/h → m/s: ÷ 3.6."]],
    ],
    ex: [
      ["Convert 15 m/s to km/h.", ["15 × 3.6"], "54 km/h"],
      ["A tap fills 12 litres per minute. How long for 300 litres?", ["300 ÷ 12"], "25 minutes"],
    ],
    mis: [
      ["Converting only one part of the unit.", "Both metres AND seconds change.", "Convert distance and time separately."],
    ],
    check: ["I can calculate pressure", "I can convert compound units"],
  }),
  "y9-u8-l5": L({
    intro: ["In inverse proportion, one quantity goes up as the other goes down, so that their product stays the same."],
    obj: ["Solve inverse proportion problems"],
    prior: ["Direct proportion"],
    vocab: [["Inverse proportion", "When one doubles, the other halves."]],
    teach: [
      ["Keep the product", ["Multiply to find the total work, then divide."], "3 painters take 8 days: 24 painter-days. 4 painters: 24 ÷ 4 = 6 days."],
    ],
    ex: [
      ["6 people share a prize, getting £40 each. How much each if 8 share it?", ["Total £240"], "£30"],
      ["At 60 km/h a trip takes 2 h. How long at 40 km/h?", ["Distance 120 km"], "3 hours"],
    ],
    mis: [
      ["Treating it as direct proportion.", "More workers should mean less time.", "Check whether the answer should go up or down."],
    ],
    check: ["I can solve inverse proportion problems"],
  }),
  "y9-u8-l6": L({
    intro: ["Maps and plans are scale drawings: every length is reduced by the same scale factor."],
    obj: ["Use scales and ratio scales on maps"],
    prior: ["Ratio", "Converting units"],
    vocab: [["Ratio scale", "1 : 50,000 means 1 cm on the map is 50,000 cm in real life."]],
    teach: [
      ["Using a ratio scale", ["Multiply the map distance by the scale, then convert units (100,000 cm = 1 km)."], "1 : 50,000, 6 cm on the map: 300,000 cm = 3 km."],
    ],
    ex: [
      ["1 : 25,000. Map distance 8 cm. Real distance?", ["200,000 cm"], "2 km"],
      ["1 : 20,000. Real distance 3 km. Map distance?", ["300,000 cm ÷ 20,000"], "15 cm"],
    ],
    mis: [
      ["Forgetting to convert cm to km.", "The answer is in cm until you convert.", "Divide by 100,000."],
    ],
    check: ["I can use a map scale both ways"],
  }),

  /* ======================= Unit 9: Pythagoras' theorem ======================= */
  "y9-u9-l1": L({
    intro: ["Pythagoras' theorem links the three sides of every right-angled triangle: a² + b² = c²."],
    obj: ["Identify the hypotenuse", "Use the theorem to test for a right angle"],
    prior: ["Squares and square roots"],
    vocab: [["Hypotenuse", "The longest side, opposite the right angle."]],
    teach: [
      ["The theorem", ["In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides."], "3² + 4² = 9 + 16 = 25 = 5²."],
      ["Testing", ["If a² + b² = c² for the longest side c, the triangle is right-angled. If not, it isn't."]],
    ],
    ex: [
      ["Is a triangle with sides 6, 8, 10 right-angled?", ["36 + 64 = 100 = 10²"], "Yes"],
      ["Is a triangle with sides 4, 5, 7 right-angled?", ["16 + 25 = 41 ≠ 49"], "No"],
    ],
    mis: [
      ["Thinking the hypotenuse is always the slanted side in the picture.", "It's opposite the right angle, wherever it is drawn.", "Find the right angle first."],
    ],
    check: ["I can find the hypotenuse", "I can test for a right angle"],
  }),
  "y9-u9-l2": L({
    intro: ["To find the hypotenuse, square the two shorter sides, add, and take the square root."],
    obj: ["Find the length of the hypotenuse"],
    prior: ["Pythagoras' theorem"],
    vocab: [["√", "Square root."]],
    teach: [
      ["Square, add, root", ["c = √(a² + b²). Round at the end, not before."], "Sides 5 and 9: √(25 + 81) = √106 = 10.3."],
    ],
    ex: [
      ["Shorter sides 7 cm and 10 cm. Find the hypotenuse.", ["√(49 + 100) = √149"], "12.2 cm"],
      ["Walk 3 km south and 6 km west. Distance from start?", ["√(9 + 36) = √45"], "6.7 km"],
    ],
    mis: [
      ["Forgetting the square root.", "149 is c², not c.", "Always square root at the end."],
    ],
    check: ["I can find the hypotenuse"],
  }),
  "y9-u9-l3": L({
    intro: ["To find a shorter side, subtract instead of adding."],
    obj: ["Find the length of a shorter side"],
    prior: ["Finding the hypotenuse"],
    vocab: [["Shorter side", "Either side next to the right angle."]],
    teach: [
      ["Square, subtract, root", ["a = √(c² − b²). The hypotenuse squared comes first."], "Hypotenuse 13, side 5: √(169 − 25) = 12."],
    ],
    ex: [
      ["Hypotenuse 10 cm, side 6 cm. Find the other side.", ["√(100 − 36)"], "8 cm"],
      ["A 5 m ladder's foot is 1.5 m from a wall. How high does it reach?", ["√(25 − 2.25) = √22.75"], "4.8 m"],
    ],
    mis: [
      ["Adding when finding a shorter side.", "The answer would be longer than the hypotenuse.", "Subtract."],
    ],
    check: ["I can find a shorter side", "I can decide whether to add or subtract"],
  }),
  "y9-u9-l4": L({
    intro: ["Many shapes hide right-angled triangles. Spotting them lets you use Pythagoras to solve problems."],
    obj: ["Use Pythagoras in multi-step problems"],
    prior: ["Pythagoras", "Area"],
    vocab: [["Perpendicular height", "The height at right angles to the base."]],
    teach: [
      ["Find the triangle", ["Draw the right-angled triangle separately and label it. Isosceles triangles split into two right-angled triangles; rectangles have diagonals that make one."], "Isosceles triangle, sides 10, base 12: height = √(100 − 36) = 8."],
    ],
    ex: [
      ["A rectangle is 8 cm by 5 cm. Find its diagonal.", ["√(64 + 25) = √89"], "9.4 cm"],
      ["A screen 40 cm wide has a 50 cm diagonal. Find its area.", ["Height = √(2500 − 1600) = 30", "40 × 30"], "1,200 cm²"],
    ],
    mis: [
      ["Using the full base of an isosceles triangle.", "The height splits the base in half.", "Use half the base."],
    ],
    check: ["I can spot right-angled triangles", "I can solve multi-step problems"],
  }),
  "y9-u9-l5": L({
    intro: ["The distance between two points on a grid is the hypotenuse of a right-angled triangle."],
    obj: ["Find the distance between two coordinates"],
    prior: ["Coordinates", "Pythagoras"],
    vocab: [["Exact distance", "Left as a square root, e.g. √29."]],
    teach: [
      ["The method", ["Find the horizontal and vertical differences, square them, add, and square root."], "(1, 2) to (4, 6): √(3² + 4²) = 5."],
    ],
    ex: [
      ["Find the distance from (−2, 1) to (3, 4).", ["Differences 5 and 3", "√(25 + 9) = √34"], "5.8"],
      ["Give the exact distance from (0, 0) to (2, −5).", ["√(4 + 25)"], "√29"],
    ],
    mis: [
      ["Subtracting the negative wrongly.", "3 − (−2) = 5.", "Count the squares if unsure."],
    ],
    check: ["I can find the distance between two points"],
  }),

  /* ======================= Unit 10: Introduction to trigonometry ======================= */
  "y9-u10-l1": L({
    intro: ["Trigonometry finds missing sides and angles in right-angled triangles. First, you need to name the sides relative to an angle."],
    obj: ["Label the opposite, adjacent and hypotenuse", "Choose sin, cos or tan"],
    prior: ["Right-angled triangles", "Pythagoras"],
    vocab: [["Opposite", "The side across from the angle."], ["Adjacent", "The side next to the angle (not the hypotenuse)."], ["Hypotenuse", "The longest side, opposite the right angle."]],
    teach: [
      ["Labelling", ["Label the hypotenuse first (opposite the right angle). Then the side opposite your angle. The side left is adjacent."]],
      ["SOHCAHTOA", ["sin = opposite ÷ hypotenuse. cos = adjacent ÷ hypotenuse. tan = opposite ÷ adjacent. Pick the ratio using the two sides involved."]],
    ],
    ex: [
      ["You know the adjacent and want the opposite. Which ratio?", ["Opposite and adjacent"], "tan"],
      ["You know the hypotenuse and want the adjacent. Which ratio?", ["Adjacent and hypotenuse"], "cos"],
    ],
    mis: [
      ["Labelling opposite/adjacent from the right angle.", "They depend on the angle you're using.", "Label from the marked angle."],
    ],
    check: ["I can label the sides", "I can choose the right ratio"],
  }),
  "y9-u10-l2": L({
    intro: ["The tangent ratio links the opposite and adjacent sides."],
    obj: ["Use tan to find missing sides"],
    prior: ["Labelling sides"],
    vocab: [["tan θ", "opposite ÷ adjacent."]],
    teach: [
      ["Unknown on top", ["opp = adj × tan θ."], "adj 8, θ = 35°: opp = 8 × tan 35° = 5.6."],
      ["Unknown on the bottom", ["adj = opp ÷ tan θ."], "opp 6, θ = 50°: adj = 6 ÷ tan 50° = 5.0."],
    ],
    ex: [
      ["θ = 40°, adjacent = 12 cm. Find the opposite.", ["12 × tan 40°"], "10.1 cm"],
      ["θ = 25°, opposite = 7 cm. Find the adjacent.", ["7 ÷ tan 25°"], "15.0 cm"],
    ],
    mis: [
      ["Multiplying when the unknown is on the bottom.", "If adj is unknown, tan θ = opp ÷ adj.", "Rearrange: adj = opp ÷ tan θ."],
    ],
    check: ["I can find the opposite with tan", "I can find the adjacent with tan"],
  }),
  "y9-u10-l3": L({
    intro: ["Sine and cosine both involve the hypotenuse."],
    obj: ["Use sin and cos to find missing sides"],
    prior: ["Tangent"],
    vocab: [["sin θ", "opposite ÷ hypotenuse."], ["cos θ", "adjacent ÷ hypotenuse."]],
    teach: [
      ["Using sin and cos", ["opp = hyp × sin θ; adj = hyp × cos θ. If the hypotenuse is unknown, divide: hyp = opp ÷ sin θ or adj ÷ cos θ."], "hyp 10, θ = 30°: opp = 10 × sin 30° = 5."],
    ],
    ex: [
      ["hyp = 15 cm, θ = 52°. Find the adjacent.", ["15 × cos 52°"], "9.2 cm"],
      ["adj = 9 cm, θ = 40°. Find the hypotenuse.", ["9 ÷ cos 40°"], "11.7 cm"],
    ],
    mis: [
      ["Using sin for the adjacent side.", "sin uses the opposite.", "SOH CAH TOA."],
    ],
    check: ["I can use sin", "I can use cos"],
  }),
  "y9-u10-l4": L({
    intro: ["Now you can find any missing side in a right-angled triangle by choosing the right ratio."],
    obj: ["Choose and use the correct ratio to find a missing side"],
    prior: ["sin, cos and tan"],
    vocab: [["Rearrange", "Get the unknown on its own."]],
    teach: [
      ["Four steps", ["1. Label the sides. 2. Choose the ratio. 3. Write the equation. 4. Rearrange and calculate, rounding at the end."]],
    ],
    ex: [
      ["θ = 33°, opp = 5 cm. Find the hypotenuse.", ["sin 33° = 5 ÷ h", "h = 5 ÷ sin 33°"], "9.2 cm"],
      ["θ = 61°, hyp = 20 cm. Find the opposite.", ["20 × sin 61°"], "17.5 cm"],
    ],
    mis: [
      ["Calculator in radians or gradians.", "Answers will be wrong.", "Check it shows D (degrees)."],
    ],
    check: ["I can find any missing side"],
  }),
  "y9-u10-l5": L({
    intro: ["Inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) find an angle when you know two sides."],
    obj: ["Find missing angles using inverse trig functions"],
    prior: ["Labelling sides", "Choosing the ratio"],
    vocab: [["sin⁻¹", "The inverse of sin: finds the angle."]],
    teach: [
      ["The method", ["Choose the ratio from the two known sides, divide them, then use the inverse function."], "opp 4, hyp 9: θ = sin⁻¹(4 ÷ 9) = 26.4°."],
    ],
    ex: [
      ["adj = 7, hyp = 10. Find θ.", ["cos θ = 0.7"], "45.6°"],
      ["opp = 9, adj = 5. Find θ.", ["tan θ = 1.8"], "60.9°"],
    ],
    mis: [
      ["Pressing sin instead of sin⁻¹.", "sin gives a ratio from an angle.", "Use SHIFT then sin."],
    ],
    check: ["I can find a missing angle"],
  }),

  /* ======================= Unit 11: Constructions, loci and bearings ======================= */
  "y9-u11-l1": L({
    intro: ["Accurate constructions use a ruler, protractor and compasses. First, check that a triangle is possible at all."],
    obj: ["Construct triangles from given information", "Know when a triangle is possible"],
    prior: ["Measuring lengths and angles"],
    vocab: [["Compasses", "A tool for drawing arcs and circles of a fixed radius."], ["Triangle inequality", "The two shorter sides must add up to more than the longest side."]],
    teach: [
      ["Three sides (SSS)", ["Draw one side with a ruler. Set the compasses to the second length and draw an arc from one end; then the third length from the other end. Join to where the arcs cross. Leave the arcs visible."]],
      ["Is it possible?", ["3 cm, 4 cm and 8 cm can't make a triangle: 3 + 4 < 8."]],
    ],
    ex: [
      ["Can 5 cm, 6 cm and 12 cm make a triangle?", ["5 + 6 = 11, which is less than 12"], "No"],
      ["Two sides are 4 cm and 9 cm. Largest whole-number third side?", ["Must be less than 13"], "12 cm"],
    ],
    mis: [
      ["Rubbing out construction arcs.", "Examiners need to see them.", "Leave all arcs visible."],
    ],
    check: ["I can construct a triangle", "I can tell if a triangle is possible"],
  }),
  "y9-u11-l2": L({
    intro: ["A perpendicular bisector cuts a line exactly in half at right angles. Every point on it is the same distance from both ends."],
    obj: ["Construct a perpendicular bisector", "Understand its key property"],
    prior: ["Using compasses"],
    vocab: [["Perpendicular", "At right angles."], ["Bisect", "Cut into two equal parts."], ["Equidistant", "The same distance from."]],
    teach: [
      ["The construction", ["Open the compasses to more than half of AB. Draw arcs above and below the line from A, then from B with the same setting. Join the two crossing points."]],
      ["The property", ["Every point on the perpendicular bisector of AB is equidistant from A and B. It passes through the midpoint of AB."]],
    ],
    ex: [
      ["Where does the perpendicular bisector of A(2, 4) and B(8, 4) cross AB?", ["Midpoint: (5, 4)"], "(5, 4)"],
      ["What do points on the perpendicular bisector of AB have in common?", ["Distance to A = distance to B"], "They are equidistant from A and B"],
    ],
    mis: [
      ["Changing the compass width between arcs.", "The arcs must be the same size from both ends.", "Keep the setting fixed."],
    ],
    check: ["I can construct a perpendicular bisector", "I know its property"],
  }),
  "y9-u11-l3": L({
    intro: ["An angle bisector cuts an angle exactly in half. Points on it are the same distance from both arms of the angle."],
    obj: ["Construct an angle bisector"],
    prior: ["Using compasses", "Measuring angles"],
    vocab: [["Arms", "The two lines that form an angle."]],
    teach: [
      ["The construction", ["From the vertex, draw an arc crossing both arms. From each crossing, draw arcs (same setting) that meet inside the angle. Join the vertex to where they meet."], "Bisecting 70° gives two angles of 35°."],
    ],
    ex: [
      ["An angle of 110° is bisected. Size of each half?", ["110 ÷ 2"], "55°"],
      ["What is true of points on the bisector of angle ABC?", ["Equal distances from BA and BC"], "They are equidistant from the two arms"],
    ],
    mis: [
      ["Using a protractor instead of compasses.", "A construction must use compasses.", "Leave construction arcs."],
    ],
    check: ["I can construct an angle bisector"],
  }),
  "y9-u11-l4": L({
    intro: ["A locus is the set of all points that follow a rule, such as “exactly 3 m from the tree”."],
    obj: ["Describe and draw loci"],
    prior: ["Perpendicular and angle bisectors"],
    vocab: [["Locus (plural loci)", "A set of points that obey a rule."]],
    teach: [
      ["Common loci", ["A fixed distance from a point: a circle. Equidistant from two points: the perpendicular bisector. Equidistant from two lines: the angle bisector. A fixed distance from a line segment: two parallel lines joined by semicircles."]],
      ["Regions", ["“Less than 3 m” shades INSIDE the circle; “more than” shades outside."]],
    ],
    ex: [
      ["A goat is tied by a 5 m rope to a post. Describe where it can graze.", ["Every point up to 5 m away"], "Inside a circle of radius 5 m"],
      ["Points equidistant from two trees?", ["Same distance from both"], "The perpendicular bisector between them"],
    ],
    mis: [
      ["Drawing a rectangle around a line segment.", "The ends are curved.", "Use semicircles at each end."],
    ],
    check: ["I can describe common loci", "I can shade a region"],
  }),
  "y9-u11-l5": L({
    intro: ["Bearings describe direction using angles measured clockwise from north, always written with three figures."],
    obj: ["Measure and calculate bearings, including back bearings"],
    prior: ["Measuring angles", "Angles on a straight line and around a point"],
    vocab: [["Bearing", "An angle measured clockwise from north, e.g. 075°."], ["Back bearing", "The bearing for the return direction."]],
    teach: [
      ["Three rules", ["1. Start from north. 2. Measure clockwise. 3. Use three figures (e.g. 040°)."]],
      ["Back bearings", ["Add 180° if the bearing is less than 180°; otherwise subtract 180°."], "Bearing of B from A is 070°, so A from B is 250°."],
    ],
    ex: [
      ["The bearing of Q from P is 310°. Find the bearing of P from Q.", ["310 − 180"], "130°"],
      ["B is 40° east of south from A. Bearing of B from A?", ["180 − 40"], "140°"],
    ],
    mis: [
      ["Measuring anticlockwise.", "Bearings always go clockwise.", "Turn like the hands of a clock."],
    ],
    check: ["I can find a bearing", "I can find a back bearing"],
  }),
  "y9-u11-l6": L({
    intro: ["Scale drawings with bearings let you plan routes and find positions accurately."],
    obj: ["Use scales and bearings together"],
    prior: ["Bearings", "Map scales"],
    vocab: [["Scale", "e.g. 1 cm represents 5 km."]],
    teach: [
      ["Plotting a route", ["Draw a north line at the start, measure the bearing, and draw the length using the scale."], "Scale 1 cm : 5 km; 35 km is 7 cm."],
    ],
    ex: [
      ["Scale 1 cm : 2 km. A path is 9 km. Length on the drawing?", ["9 ÷ 2"], "4.5 cm"],
      ["Scale 1 : 20,000. 6.5 cm on the plan. Real distance?", ["130,000 cm"], "1.3 km"],
    ],
    mis: [
      ["Forgetting a new north line at each point.", "Bearings are measured from north at the point you're travelling from.", "Draw a north line at every point."],
    ],
    check: ["I can use a scale", "I can combine bearings and distances"],
  }),

  /* ======================= Unit 12: Analysing data ======================= */
  "y9-u12-l1": L({
    intro: ["Frequency tables summarise lots of data. You can still find the mean, median and mode from them."],
    obj: ["Find the mean and median from a frequency table"],
    prior: ["Mean, median and mode"],
    vocab: [["Frequency", "How many times a value occurs."]],
    teach: [
      ["Mean", ["Multiply each value by its frequency, add these up, and divide by the total frequency."], "Values 0, 1, 2 with frequencies 3, 5, 2: (0 + 5 + 4) ÷ 10 = 0.9."],
      ["Median", ["Find the position (n + 1) ÷ 2, then use running totals of the frequencies to find which value is there."]],
    ],
    ex: [
      ["Goals: 0 (4 matches), 1 (6), 2 (5), 3 (5). Mean?", ["Total = 0 + 6 + 10 + 15 = 31", "31 ÷ 20"], "1.55 goals"],
      ["For the same data, find the median.", ["20 values: the 10.5th position", "Running totals 4, 10, 15, 20: between 1 and 2"], "1.5"],
    ],
    mis: [
      ["Dividing by the number of rows.", "Each row represents many values.", "Divide by the total frequency."],
    ],
    check: ["I can find the mean from a frequency table", "I can find the median"],
  }),
  "y9-u12-l2": L({
    intro: ["With grouped data you don't know the exact values, so you can only estimate the mean."],
    obj: ["Estimate the mean of grouped data", "Find the class containing the median"],
    prior: ["Mean from a frequency table"],
    vocab: [["Midpoint", "The middle value of a class."], ["Modal class", "The class with the highest frequency."]],
    teach: [
      ["Estimated mean", ["Use each class midpoint as the value. Multiply by frequency, add, and divide by the total frequency. It's an estimate because the real values aren't known."], "Midpoints 5, 15, 25…"],
    ],
    ex: [
      ["0–10: 4, 10–20: 6. Estimate the mean.", ["(5 × 4 + 15 × 6) ÷ 10 = 110 ÷ 10"], "11"],
      ["Frequencies 3, 8, 6, 2. Which class contains the median?", ["19 values, the 10th", "Running totals 3, 11: the second class"], "The second class"],
    ],
    mis: [
      ["Using the class width instead of the midpoint.", "The midpoint represents each class.", "Add the class boundaries and halve."],
    ],
    check: ["I can estimate a mean", "I can find the class containing the median"],
  }),
  "y9-u12-l3": L({
    intro: ["To compare two sets of data, compare an average AND a measure of spread, and relate them to the context."],
    obj: ["Compare distributions using mean or median, and range"],
    prior: ["Averages and range"],
    vocab: [["Range", "Largest − smallest: a measure of spread."], ["Consistent", "Having a small spread."]],
    teach: [
      ["Two comparisons", ["Average: which is higher (on average)? Spread: which has the smaller range (more consistent)? Always write about the context."], "Team A had a higher mean, so scored more on average; Team B had a smaller range, so was more consistent."],
    ],
    ex: [
      ["A: mean 12, range 8. B: mean 15, range 3. Compare.", ["B higher on average", "B smaller range"], "B scored more on average and was more consistent"],
      ["Medians of 3, 9, 4, 7, 5 and 6, 2, 8, 1, 4?", ["Order: 3, 4, 5, 7, 9 → 5; 1, 2, 4, 6, 8 → 4"], "Difference of 1"],
    ],
    mis: [
      ["Saying a bigger range is more consistent.", "Bigger spread means less consistent.", "Smaller range = more consistent."],
    ],
    check: ["I can compare averages", "I can compare spread"],
  }),
  "y9-u12-l4": L({
    intro: ["A sample is a smaller group used to represent a whole population. If it's chosen badly, the results are biased."],
    obj: ["Identify bias in a sample", "Calculate a proportional sample"],
    prior: ["Fractions of amounts"],
    vocab: [["Population", "The whole group you want to know about."], ["Biased", "Not representative: it favours certain results."], ["Random sample", "Every member has an equal chance of being chosen."]],
    teach: [
      ["Avoiding bias", ["A good sample is random and large enough, and represents the whole population."], "Asking only people at a gym about exercise would be biased."],
      ["Proportional sampling", ["Each group's share of the sample matches its share of the population."], "Year 9 is 200 of 1,000 students; a sample of 50 needs 200/1000 × 50 = 10."],
    ],
    ex: [
      ["Is asking a football crowd about favourite sports biased?", ["They're likely to choose football"], "Yes"],
      ["A town has 3,000 adults and 1,000 children. A sample of 80: how many children?", ["1000/4000 × 80"], "20"],
    ],
    mis: [
      ["Thinking a big sample can't be biased.", "Size doesn't fix where it came from.", "Check how it was chosen."],
    ],
    check: ["I can spot bias", "I can find a proportional sample"],
  }),
  "y9-u12-l5": L({
    intro: ["A time series graph shows how something changes over time, such as sales each month. It helps you spot trends."],
    obj: ["Read and interpret time series graphs"],
    prior: ["Line graphs"],
    vocab: [["Trend", "The general direction of the data over time."], ["Seasonal pattern", "A pattern that repeats, e.g. every year."]],
    teach: [
      ["Reading", ["Time goes on the horizontal axis. Read the value at each time; compare points to find increases and decreases; describe the overall trend."]],
    ],
    ex: [
      ["Sales were 30 in week 2 and 45 in week 5. Change?", ["45 − 30"], "An increase of 15"],
      ["Ice cream sales peak in summer and drop in winter. What pattern is this?", ["It repeats each year"], "A seasonal pattern"],
    ],
    mis: [
      ["Misreading the vertical scale.", "Squares may represent 5 or 10.", "Check the scale before reading."],
    ],
    check: ["I can read time series", "I can describe changes and trends"],
  }),

  /* ======================= Unit 13: Combined events ======================= */
  "y9-u13-l1": L({
    intro: ["When two things happen, such as rolling two dice, a sample space diagram lists every possible outcome."],
    obj: ["Use sample space diagrams to find probabilities"],
    prior: ["Probability of a single event"],
    vocab: [["Sample space", "All possible outcomes."], ["Equally likely", "Each outcome has the same chance."]],
    teach: [
      ["Using a grid", ["Draw a grid with one event across and the other down. Fill in each outcome. Probability = favourable outcomes ÷ total outcomes."], "Two dice: 36 outcomes, 6 of which total 7, so P(7) = 6/36 = 1/6."],
    ],
    ex: [
      ["Two dice. P(total of 10)?", ["(4,6), (5,5), (6,4): 3 ways"], "3/36 = 1/12"],
      ["A coin and a dice. P(tails and an even number)?", ["12 outcomes, 3 work"], "3/12 = 1/4"],
    ],
    mis: [
      ["Thinking the 11 totals (2–12) are equally likely.", "7 can be made 6 ways; 2 only 1 way.", "Use the full 36-outcome grid."],
    ],
    check: ["I can draw a sample space", "I can find probabilities from it"],
  }),
  "y9-u13-l2": L({
    intro: ["Venn diagrams show how groups overlap. They make “and” and “or” probabilities clear."],
    obj: ["Use Venn diagrams to find probabilities"],
    prior: ["Probability", "Sets"],
    vocab: [["A ∩ B", "In A and B."], ["A ∪ B", "In A or B (or both)."]],
    teach: [
      ["Reading the regions", ["Count the people in the region you need and divide by the total (including those outside both circles)."], "A only 7, both 3, B only 5, neither 5: P(A ∩ B) = 3/20."],
    ],
    ex: [
      ["Using those numbers, find P(A ∪ B).", ["7 + 3 + 5 = 15"], "15/20 = 3/4"],
      ["Find P(neither).", ["5 out of 20"], "1/4"],
    ],
    mis: [
      ["Counting the overlap twice.", "The overlap is one region.", "Add each region once."],
    ],
    check: ["I can read a Venn diagram", "I can find “and” and “or” probabilities"],
  }),
  "y9-u13-l3": L({
    intro: ["Tree diagrams show two or more events in order, with a probability on every branch."],
    obj: ["Use tree diagrams, with and without replacement"],
    prior: ["Multiplying fractions"],
    vocab: [["Branch", "A line on a tree diagram for one outcome."], ["Without replacement", "The item isn't put back."]],
    teach: [
      ["Multiply along, add between", ["Multiply along the branches for “and”. If more than one route works, add them."], "P(red then red) = 3/5 × 3/5 = 9/25 with replacement."],
      ["Without replacement", ["The second set of branches has one fewer item in total."], "3 red, 2 blue: P(red, red) = 3/5 × 2/4 = 3/10."],
    ],
    ex: [
      ["P(A) = 0.3, P(B) = 0.6, independent. P(A and B)?", ["0.3 × 0.6"], "0.18"],
      ["4 red, 6 blue, two taken without replacement. P(both blue)?", ["6/10 × 5/9 = 30/90"], "1/3"],
    ],
    mis: [
      ["Adding along branches.", "“And” means multiply.", "Multiply along, add between."],
    ],
    check: ["I can use a tree diagram", "I can handle without replacement"],
  }),
  "y9-u13-l4": L({
    intro: ["Two events are independent if one doesn't affect the other, like flipping a coin and rolling a dice."],
    obj: ["Use the multiplication rule for independent events", "Find P(at least one)"],
    prior: ["Tree diagrams"],
    vocab: [["Independent", "The outcome of one doesn't affect the other."]],
    teach: [
      ["The rule", ["For independent events, P(A and B) = P(A) × P(B)."], "P(heads and a 6) = ½ × ⅙ = 1/12."],
      ["At least one", ["P(at least one) = 1 − P(neither)."]],
    ],
    ex: [
      ["P(heads and an even number)?", ["½ × ½"], "1/4"],
      ["P(rain) = 0.4 on each of two days. P(rain on at least one day)?", ["P(no rain both days) = 0.6 × 0.6 = 0.36", "1 − 0.36"], "0.64"],
    ],
    mis: [
      ["Adding for at least one: 0.4 + 0.4 = 0.8.", "This counts rain on both days twice.", "Use 1 − P(neither)."],
    ],
    check: ["I can multiply independent probabilities", "I can find P(at least one)"],
  }),
};
