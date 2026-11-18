/* ==========================================================================
   Teaching content: Year 10, Units 5–8 (light format, see light.js)
   Simultaneous equations · Straight lines and inequalities ·
   Proportion and ratio problems · Congruence and similarity
   ========================================================================== */
import { L } from "./light.js";

export const Y10B_LESSONS = {
  /* ======================= Unit 5: Simultaneous equations ======================= */
  "y10-u5-l1": L({
    intro: ["Simultaneous equations are two equations that are both true at the same time. Elimination removes one letter by adding or subtracting the equations."],
    obj: ["Solve simultaneous equations by elimination, including when you must multiply first"],
    prior: ["Solving linear equations", "Multiplying negative numbers"],
    vocab: [["Simultaneous", "Happening at the same time: both equations share the same x and y."], ["Eliminate", "Remove one variable by adding or subtracting equations."]],
    teach: [
      ["Add or subtract?", ["If the coefficients of one letter are the same, subtract. If they are equal but opposite signs, add. Same Signs Subtract."], "3x + 2y = 16 and x − 2y = 0: add to get 4x = 16."],
      ["Multiplying first", ["If no coefficients match, multiply one or both equations so they do. Then eliminate, solve, and substitute back."]],
    ],
    ex: [
      ["Solve 2x + y = 11 and 3x − y = 9.", ["Add: 5x = 20, so x = 4", "2(4) + y = 11, so y = 3"], "x = 4, y = 3"],
      ["Solve 3x + 2y = 12 and 2x + 5y = 19.", ["× 2 and × 3: 6x + 4y = 24 and 6x + 15y = 57", "Subtract: 11y = 33, y = 3", "3x + 6 = 12, x = 2"], "x = 2, y = 3"],
    ],
    mis: [
      ["Multiplying only the left-hand side.", "Both sides must be multiplied to keep the equation true.", "Multiply every term."],
      ["Stopping after finding one letter.", "You need both values.", "Substitute back, then check in the other equation."],
    ],
    check: ["I can solve by adding or subtracting", "I can solve when I need to multiply first"],
  }),

  "y10-u5-l2": L({
    intro: ["Substitution works well when one equation already says y = … or x = …. You replace that letter in the other equation."],
    obj: ["Solve simultaneous equations by substitution"],
    prior: ["Expanding brackets", "Solving linear equations"],
    vocab: [["Substitute", "Replace a letter with an expression or value."]],
    teach: [
      ["The method", ["Make one letter the subject of one equation. Substitute into the other, using brackets. Solve, then find the other letter."], "y = 2x − 1 and 3x + y = 14: 3x + (2x − 1) = 14, so 5x = 15, x = 3, y = 5."],
    ],
    ex: [
      ["Solve y = x + 4 and 2x + 3y = 22.", ["2x + 3(x + 4) = 22", "5x + 12 = 22, x = 2", "y = 6"], "x = 2, y = 6"],
      ["Solve x + 2y = 7 and 3x − y = 7.", ["x = 7 − 2y", "3(7 − 2y) − y = 7, so 21 − 7y = 7, y = 2", "x = 3"], "x = 3, y = 2"],
    ],
    mis: [
      ["Forgetting brackets: 3x − 2x + 1.", "The whole expression replaces y.", "3x − (2x − 1) = x + 1."],
    ],
    check: ["I can solve by substitution", "I can rearrange first, then substitute"],
  }),

  "y10-u5-l3": L({
    intro: ["Every linear equation is a straight line. The solution of two simultaneous equations is the point where their lines cross."],
    obj: ["Solve simultaneous equations using graphs", "Find where two lines intersect algebraically"],
    prior: ["Plotting straight-line graphs", "y = mx + c"],
    vocab: [["Point of intersection", "Where two graphs cross."]],
    teach: [
      ["Reading the solution", ["Draw both lines. The coordinates of the crossing point give x and y."]],
      ["Algebraically", ["If both equations are y = …, set the right-hand sides equal and solve."], "y = 2x + 1 and y = −x + 7: 2x + 1 = −x + 7, so x = 2, y = 5."],
    ],
    ex: [
      ["Where do y = 3x − 2 and y = x + 4 meet?", ["3x − 2 = x + 4", "2x = 6, x = 3, y = 7"], "(3, 7)"],
      ["Two lines cross at (−1, 4). What is the solution of the equations?", ["Read x first, then y"], "x = −1, y = 4"],
    ],
    mis: [
      ["Writing the coordinates the wrong way round.", "Coordinates are (x, y): across, then up.", "x is read from the horizontal axis."],
    ],
    check: ["I can solve graphically", "I can find an intersection algebraically"],
  }),

  "y10-u5-l4": L({
    intro: ["Many real problems, such as ticket prices or the cost of items, can be modelled with two equations."],
    obj: ["Form and solve simultaneous equations from a context"],
    prior: ["Solving simultaneous equations"],
    vocab: [["Model", "Using algebra to represent a real situation."]],
    teach: [
      ["Forming equations", ["Choose letters for the unknowns and say what they mean. Each sentence with two facts gives one equation. Solve, then answer the question in context with units."], "3 coffees and 2 teas cost £10.30: 3c + 2t = 10.30."],
    ],
    ex: [
      ["2 adults and 3 children pay £36. 1 adult and 2 children pay £21. Find the adult price.", ["2a + 3c = 36 and a + 2c = 21", "Double the second: 2a + 4c = 42; subtract: c = 6", "a = 21 − 12"], "£9"],
      ["The sum of two numbers is 27 and their difference is 5. Find them.", ["x + y = 27, x − y = 5", "2x = 32"], "16 and 11"],
    ],
    mis: [
      ["Mixing pounds and pence.", "Equations must use the same units throughout.", "Convert everything to pence or everything to pounds."],
    ],
    check: ["I can write two equations from a problem", "I can answer in context"],
  }),

  "y10-u5-l5": L({
    intro: ["A straight line can cross a curve, such as a parabola, at two points. Solving a linear and a quadratic equation together finds them."],
    obj: ["Solve a linear and a quadratic equation simultaneously"],
    prior: ["Substitution", "Solving quadratics by factorising"],
    vocab: [["Intersection points", "The points where a line meets a curve."]],
    teach: [
      ["The method", ["Substitute the linear equation into the quadratic (or set the two expressions for y equal). Rearrange to = 0 and solve the quadratic. Then substitute each x into the LINEAR equation to find y."], "y = x² and y = x + 2: x² = x + 2, so (x − 2)(x + 1) = 0, giving (2, 4) and (−1, 1)."],
    ],
    ex: [
      ["Solve y = x² − 3 and y = 2x.", ["x² − 3 = 2x", "x² − 2x − 3 = 0, so (x − 3)(x + 1) = 0"], "(3, 6) and (−1, −2)"],
      ["Find where y = x² + 1 meets y = 5.", ["x² + 1 = 5", "x² = 4"], "(2, 5) and (−2, 5)"],
    ],
    mis: [
      ["Giving only one solution.", "A line usually meets a parabola twice.", "Look for two x-values and pair each with its y."],
      ["Mixing up which y goes with which x.", "Each point has its own pair.", "Substitute each x separately."],
    ],
    check: ["I can solve linear and quadratic equations together", "I can give the points of intersection as coordinates"],
  }),

  /* ======================= Unit 6: Straight lines and inequalities ======================= */
  "y10-u6-l1": L({
    intro: ["Given two points, you can find everything about the straight line through them: its gradient and its equation."],
    obj: ["Find the gradient between two points", "Find the equation of a line through two points"],
    prior: ["y = mx + c"],
    vocab: [["Gradient", "Steepness: change in y ÷ change in x."], ["y-intercept", "Where the line crosses the y-axis (c)."]],
    teach: [
      ["Gradient", ["m = (y₂ − y₁) ÷ (x₂ − x₁). Keep the points in the same order on the top and bottom."], "(1, 3) and (4, 9): m = 6 ÷ 3 = 2."],
      ["Equation", ["Put m into y = mx + c, substitute one point, and solve for c."], "9 = 2(4) + c, so c = 1: y = 2x + 1."],
    ],
    ex: [
      ["Find the gradient through (−2, 5) and (2, −3).", ["Change in y = −8", "Change in x = 4"], "−2"],
      ["Find the equation through (0, 4) and (3, 10).", ["m = 6 ÷ 3 = 2", "c = 4 (it passes through (0, 4))"], "y = 2x + 4"],
    ],
    mis: [
      ["Dividing change in x by change in y.", "Gradient is rise over run.", "y on the top, x on the bottom."],
    ],
    check: ["I can find a gradient from two points", "I can find the equation of the line"],
  }),

  "y10-u6-l2": L({
    intro: ["A line segment has two endpoints. You can find its midpoint by averaging, and its length using Pythagoras."],
    obj: ["Find the midpoint of a line segment", "Find the length of a line segment"],
    prior: ["Coordinates", "Pythagoras' theorem"],
    vocab: [["Midpoint", "The point exactly halfway along a segment."]],
    teach: [
      ["Midpoint", ["Average the x-coordinates and average the y-coordinates."], "(2, 7) and (6, −1): midpoint (4, 3)."],
      ["Length", ["Draw a right-angled triangle: horizontal change and vertical change are the shorter sides. Use Pythagoras."], "(1, 2) to (4, 6): √(3² + 4²) = 5."],
    ],
    ex: [
      ["Find the midpoint of (−3, 4) and (5, 10).", ["x: (−3 + 5) ÷ 2 = 1", "y: (4 + 10) ÷ 2 = 7"], "(1, 7)"],
      ["Find the length from (0, 0) to (2, 5) to 1 d.p.", ["√(4 + 25) = √29"], "5.4"],
    ],
    mis: [
      ["Subtracting instead of adding for the midpoint.", "The midpoint is the mean of the coordinates.", "Add, then halve."],
    ],
    check: ["I can find a midpoint", "I can find the length of a segment"],
  }),

  "y10-u6-l3": L({
    intro: ["Parallel lines have equal gradients. Perpendicular lines meet at right angles, and their gradients multiply to −1."],
    obj: ["Recognise parallel and perpendicular gradients", "Find the equation of a perpendicular line"],
    prior: ["Equation of a line"],
    vocab: [["Parallel", "Never meet: same gradient."], ["Perpendicular", "At right angles: gradients multiply to −1."], ["Negative reciprocal", "Flip the fraction and change the sign: 2 → −½."]],
    teach: [
      ["Perpendicular gradient", ["If one line has gradient m, a perpendicular line has gradient −1/m."], "Perpendicular to y = 3x + 2: gradient −⅓."],
      ["Finding the equation", ["Use the perpendicular gradient and the given point to find c, as before."]],
    ],
    ex: [
      ["Find the gradient perpendicular to y = −4x + 1.", ["−1 ÷ −4"], "¼"],
      ["Find the line perpendicular to y = 2x − 5 through (4, 1).", ["m = −½", "1 = −½(4) + c, c = 3"], "y = −½x + 3"],
    ],
    mis: [
      ["Only flipping, or only changing the sign.", "Both are needed.", "2 becomes −½, and −⅓ becomes 3."],
    ],
    check: ["I can find a perpendicular gradient", "I can find the equation of a perpendicular line"],
  }),

  "y10-u6-l4": L({
    intro: ["Inequalities are solved like equations, with one extra rule about negatives. The answer is a range of values."],
    obj: ["Solve linear inequalities", "List integers that satisfy an inequality"],
    prior: ["Solving linear equations", "Inequality symbols"],
    vocab: [["<, ≤", "Less than; less than or equal to."], ["Integer", "A whole number (positive, negative or zero)."]],
    teach: [
      ["Solving", ["Do the same to both sides. If you multiply or divide by a NEGATIVE number, reverse the inequality sign."], "3x + 2 < 14 → 3x < 12 → x < 4."],
      ["Double inequalities", ["Do the same to all three parts."], "−3 < 2x + 1 ≤ 7 → −4 < 2x ≤ 6 → −2 < x ≤ 3: integers −1, 0, 1, 2, 3."],
    ],
    ex: [
      ["Solve 5x − 3 ≥ 17.", ["5x ≥ 20"], "x ≥ 4"],
      ["Solve 7 − 2x > 1.", ["−2x > −6", "Divide by −2 and reverse the sign"], "x < 3"],
    ],
    mis: [
      ["Forgetting to reverse the sign when dividing by a negative.", "−x > −3 means x < 3.", "Reverse the sign, or move x to the other side."],
      ["Including an endpoint for < or >.", "Strict inequalities don't include the boundary.", "Only ≤ and ≥ include it."],
    ],
    check: ["I can solve linear inequalities", "I can list integer solutions"],
  }),

  "y10-u6-l5": L({
    intro: ["An inequality in x and y describes a region of the graph. Several inequalities together define a shape."],
    obj: ["Identify the inequality for a shaded region", "Decide whether a point lies in a region"],
    prior: ["Straight-line graphs", "Inequalities"],
    vocab: [["Region", "The area of a graph where an inequality is true."], ["Boundary", "The line where the inequality becomes an equation."]],
    teach: [
      ["Reading a region", ["Draw the boundary line y = …. Use a dashed line for < or > (not included) and a solid line for ≤ or ≥. y > … is above the line; y < … is below."]],
      ["Testing a point", ["Substitute the point into each inequality. It's in the region only if every inequality is true."], "Is (1, 2) in y < 2x + 3? 2 < 5 ✓."],
    ],
    ex: [
      ["The region above the dashed line y = x − 1 is shaded. Write the inequality.", ["Above means y is bigger", "Dashed means not included"], "y > x − 1"],
      ["Does (3, 1) satisfy x + y ≤ 4 and y ≥ 0?", ["3 + 1 = 4 ≤ 4 ✓", "1 ≥ 0 ✓"], "Yes"],
    ],
    mis: [
      ["Using a solid line for < or >.", "A solid line means the boundary is included.", "Dashed for strict inequalities."],
    ],
    check: ["I can describe a shaded region", "I can test whether a point is in a region"],
  }),

  /* ======================= Unit 7: Proportion and ratio problems ======================= */
  "y10-u7-l1": L({
    intro: ["Sometimes you're given two ratios that share a quantity. Combining them makes a three-part ratio."],
    obj: ["Combine two ratios", "Share in a three-part ratio"],
    prior: ["Simplifying ratios", "LCM"],
    vocab: [["Three-part ratio", "A ratio comparing three quantities, e.g. 2 : 3 : 5."]],
    teach: [
      ["Matching the shared part", ["Make the shared quantity the same in both ratios using the LCM."], "A : B = 2 : 3, B : C = 4 : 5. LCM of 3 and 4 is 12: A : B : C = 8 : 12 : 15."],
      ["Sharing", ["Add the parts, find one part, then multiply."]],
    ],
    ex: [
      ["A : B = 1 : 2 and B : C = 3 : 4. Find A : C.", ["A : B = 3 : 6, B : C = 6 : 8"], "3 : 8"],
      ["Share £120 in the ratio 1 : 2 : 3.", ["6 parts, 1 part = £20"], "£20, £40, £60"],
    ],
    mis: [
      ["Writing A : B : C = 2 : 3 : 5 from 2 : 3 and 4 : 5.", "The B parts (3 and 4) don't match.", "Scale so B is the same in both."],
    ],
    check: ["I can combine ratios", "I can share in a three-part ratio"],
  }),

  "y10-u7-l2": L({
    intro: ["Harder ratio problems give a difference between shares, or describe a ratio that changes."],
    obj: ["Solve ratio problems involving differences and changes"],
    prior: ["Sharing in a ratio", "Solving equations"],
    vocab: [["Part", "One share of the ratio."]],
    teach: [
      ["Using the difference", ["If A : B = 2 : 5 and B has £18 more, the difference is 3 parts, so 1 part = £6."]],
      ["Changing ratios", ["Use algebra: write the amounts as 3k and 4k, apply the change, and form an equation."], "3k + 6 = 4k gives k = 6."],
    ],
    ex: [
      ["Red : blue = 3 : 7 and there are 20 more blue. How many red?", ["4 parts = 20, 1 part = 5"], "15"],
      ["Boys : girls = 2 : 3. After 5 boys join it is 1 : 1. How many girls?", ["2k + 5 = 3k, so k = 5"], "15 girls"],
    ],
    mis: [
      ["Treating the difference as one whole share.", "The difference is the gap in parts.", "Subtract the ratio numbers first."],
    ],
    check: ["I can use a difference between shares", "I can solve a changing-ratio problem"],
  }),

  "y10-u7-l3": L({
    intro: ["Two quantities are in direct proportion if doubling one doubles the other. Costs, recipes and conversions are examples."],
    obj: ["Solve direct proportion problems using the unitary method"],
    prior: ["Multiplication and division", "Ratio"],
    vocab: [["Direct proportion", "When one quantity is multiplied by k, so is the other."], ["Unitary method", "Find the value of one, then multiply."]],
    teach: [
      ["Unitary method", ["Divide to find the value for 1, then multiply to find the value for the amount you need."], "5 apples cost £1.40, so 1 costs 28p and 8 cost £2.24."],
    ],
    ex: [
      ["6 m of fabric costs £27. How much do 10 m cost?", ["1 m costs £4.50"], "£45"],
      ["A recipe for 4 uses 300 g of rice. How much for 6?", ["75 g per person"], "450 g"],
    ],
    mis: [
      ["Adding the difference: 4 → 6 people means add 2 × something.", "Proportion is multiplicative.", "Find the value for one first."],
    ],
    check: ["I can use the unitary method", "I can scale recipes and costs"],
  }),

  "y10-u7-l4": L({
    intro: ["In inverse proportion, as one quantity increases the other decreases. More workers means less time; higher speed means a shorter journey."],
    obj: ["Solve inverse proportion problems"],
    prior: ["Direct proportion"],
    vocab: [["Inverse proportion", "When one quantity doubles, the other halves. Their product stays the same."]],
    teach: [
      ["Keep the product", ["Multiply the two quantities to find the total (e.g. worker-days), then divide by the new value."], "4 people take 6 hours: 24 person-hours. 3 people take 24 ÷ 3 = 8 hours."],
    ],
    ex: [
      ["5 taps fill a tank in 12 minutes. How long for 3 taps?", ["5 × 12 = 60 tap-minutes"], "20 minutes"],
      ["At 50 km/h a trip takes 3 hours. How long at 75 km/h?", ["Distance = 150 km"], "2 hours"],
    ],
    mis: [
      ["Treating it as direct proportion.", "More workers can't take longer.", "Ask: should the answer go up or down?"],
    ],
    check: ["I can recognise inverse proportion", "I can solve inverse proportion problems"],
  }),

  "y10-u7-l5": L({
    intro: ["The shape of a graph shows the type of proportion. This is a quick way to recognise relationships in data."],
    obj: ["Recognise direct and inverse proportion graphs", "Find the equation of a direct proportion graph"],
    prior: ["Straight-line graphs"],
    vocab: [["y = kx", "Direct proportion; k is the constant of proportionality."], ["y = k/x", "Inverse proportion."]],
    teach: [
      ["Shapes", ["Direct proportion: a straight line through the origin. Inverse proportion: a curve that falls and gets closer to both axes without touching them. A straight line NOT through the origin is not proportion."]],
      ["Finding k", ["For y = kx, divide y by x at any point on the line."], "Through (3, 12): k = 4, so y = 4x."],
    ],
    ex: [
      ["A straight line through the origin passes through (5, 15). Find its equation.", ["k = 15 ÷ 5 = 3"], "y = 3x"],
      ["Is y = 2x + 1 a direct proportion?", ["It doesn't pass through (0, 0)"], "No"],
    ],
    mis: [
      ["Calling any straight line direct proportion.", "It must pass through the origin.", "Check the point (0, 0)."],
    ],
    check: ["I can recognise proportion graphs", "I can find k from a graph"],
  }),

  "y10-u7-l6": L({
    intro: ["Higher questions describe proportion with powers or roots, such as y ∝ x² or y ∝ 1/x. You form an equation with a constant k."],
    obj: ["Write and use proportion equations"],
    prior: ["Direct and inverse proportion", "Substitution"],
    vocab: [["∝", "“Is proportional to”."], ["Constant of proportionality", "The k in y = kx², y = k/x, etc."]],
    teach: [
      ["Three steps", ["1. Write the equation with k (y = kx², y = k/x, …). 2. Substitute the given values to find k. 3. Use the equation to answer."], "y ∝ x²; y = 48 when x = 4: 48 = 16k, k = 3, so y = 3x²."],
    ],
    ex: [
      ["y ∝ x². y = 20 when x = 2. Find y when x = 5.", ["20 = 4k, k = 5", "y = 5 × 25"], "125"],
      ["y ∝ 1/x. y = 6 when x = 4. Find y when x = 3.", ["6 = k/4, k = 24", "y = 24 ÷ 3"], "8"],
    ],
    mis: [
      ["Forgetting to square: k = 20 ÷ 2.", "y ∝ x² means y = kx².", "k = 20 ÷ 2² = 5."],
    ],
    check: ["I can find k", "I can use proportion equations with powers and reciprocals"],
  }),

  /* ======================= Unit 8: Congruence and similarity ======================= */
  "y10-u8-l1": L({
    intro: ["Congruent shapes are identical: the same shape and size. For triangles, you only need certain facts to prove congruence."],
    obj: ["Use SSS, SAS, ASA and RHS to show triangles are congruent"],
    prior: ["Angle facts", "Properties of triangles"],
    vocab: [["Congruent", "Exactly the same shape and size."], ["Included angle", "The angle between two given sides."]],
    teach: [
      ["The four conditions", ["SSS: three sides. SAS: two sides and the angle between them. ASA: two angles and the side between them (or AAS). RHS: right angle, hypotenuse and one other side."], "AAA isn't enough: the triangles could be different sizes."],
    ],
    ex: [
      ["Two triangles have sides 5, 7, 9 cm and 9, 5, 7 cm. Are they congruent?", ["Three pairs of equal sides"], "Yes, by SSS"],
      ["Two right-angled triangles have hypotenuse 13 cm and one side 5 cm. Are they congruent?", ["Right angle, hypotenuse, side"], "Yes, by RHS"],
    ],
    mis: [
      ["Using SSA (an angle not between the two sides).", "That doesn't always give a unique triangle.", "For SAS, the angle must be between the sides."],
    ],
    check: ["I know the congruence conditions", "I can identify which applies"],
  }),

  "y10-u8-l2": L({
    intro: ["Similar shapes are enlargements of each other: the same shape but different sizes. Corresponding lengths are all multiplied by the same scale factor."],
    obj: ["Find scale factors", "Find missing lengths in similar shapes"],
    prior: ["Enlargement", "Ratio"],
    vocab: [["Similar", "Same shape, angles equal, lengths in the same ratio."], ["Scale factor", "The number lengths are multiplied by."]],
    teach: [
      ["The method", ["Find a pair of corresponding sides you know both of. Scale factor = new length ÷ original length. Multiply (or divide) to find missing sides."], "A 3 cm by 5 cm rectangle is similar to one 7.5 cm wide: scale factor 2.5, so the length is 12.5 cm."],
    ],
    ex: [
      ["Triangle sides 4 cm and 6 cm; a similar triangle has 10 cm matching the 4 cm. Find the other side.", ["Scale factor 10 ÷ 4 = 2.5"], "15 cm"],
      ["A similar shape is smaller: 12 cm becomes 9 cm. What does 8 cm become?", ["Scale factor 9 ÷ 12 = 0.75"], "6 cm"],
    ],
    mis: [
      ["Adding the difference instead of multiplying.", "Enlargements multiply all lengths.", "Use a scale factor."],
    ],
    check: ["I can find a scale factor", "I can find missing lengths"],
  }),

  "y10-u8-l3": L({
    intro: ["Similar triangles often appear inside each other, especially when a line is drawn parallel to one side."],
    obj: ["Identify similar triangles", "Find missing sides in nested triangles"],
    prior: ["Similar shapes", "Angles in parallel lines"],
    vocab: [["Corresponding sides", "Sides in the same position in each triangle."]],
    teach: [
      ["Spotting similarity", ["If a line is parallel to one side of a triangle, it makes a smaller triangle with the same angles: they are similar."]],
      ["Careful with lengths", ["Use whole sides. If AD = 4 and DB = 6, the big triangle's side AB is 10, not 6."], "Scale factor = AB ÷ AD = 10 ÷ 4 = 2.5."],
    ],
    ex: [
      ["DE ∥ BC, AD = 3, AB = 9, DE = 4. Find BC.", ["Scale factor 9 ÷ 3 = 3"], "12"],
      ["Two similar triangles have bases 6 cm and 9 cm. The small one has height 4 cm. Find the large height.", ["Scale factor 1.5"], "6 cm"],
    ],
    mis: [
      ["Using DB instead of AB.", "DB is only part of the larger triangle's side.", "Add the parts first."],
    ],
    check: ["I can spot similar triangles", "I can solve nested triangle problems"],
  }),

  "y10-u8-l4": L({
    intro: ["When lengths are multiplied by k, areas are multiplied by k² and volumes by k³. This is a favourite Higher exam topic."],
    obj: ["Use area and volume scale factors"],
    prior: ["Similar shapes", "Squares, cubes and roots"],
    vocab: [["Area scale factor", "k², where k is the length scale factor."], ["Volume scale factor", "k³."]],
    teach: [
      ["The rules", ["Length × k, area × k², volume × k³."], "Scale factor 3: area × 9, volume × 27."],
      ["Working backwards", ["From an area ratio, square root to get the length ratio. Then cube for volume."]],
    ],
    ex: [
      ["A shape is enlarged by scale factor 4. Its area was 5 cm². Find the new area.", ["Area × 16"], "80 cm²"],
      ["Similar solids have surface areas 9 cm² and 25 cm². The small volume is 54 cm³. Find the large volume.", ["Length ratio 3 : 5", "Volume ratio 27 : 125", "54 ÷ 27 × 125"], "250 cm³"],
    ],
    mis: [
      ["Using the length scale factor for area.", "Area is two-dimensional.", "Square the scale factor."],
    ],
    check: ["I can use area scale factors", "I can use volume scale factors"],
  }),
};
