/* ==========================================================================
   Teaching content: Year 10, Units 9–12 (light format, see light.js)
   Further trigonometry · Circles, surface area and volume ·
   Cumulative frequency, box plots and histograms · Probability at GCSE
   ========================================================================== */
import { L } from "./light.js";

export const Y10C_LESSONS = {
  /* ======================= Unit 9: Further trigonometry ======================= */
  "y10-u9-l1": L({
    intro: ["Trigonometry links the angles and sides of right-angled triangles. SOHCAHTOA tells you which ratio to use."],
    obj: ["Find missing sides and angles in right-angled triangles"],
    prior: ["Labelling opposite, adjacent and hypotenuse", "Rearranging formulae"],
    vocab: [["SOHCAHTOA", "sin = opp ÷ hyp, cos = adj ÷ hyp, tan = opp ÷ adj."], ["Inverse function", "sin⁻¹, cos⁻¹, tan⁻¹ find an angle from a ratio."]],
    teach: [
      ["Choosing the ratio", ["Label the sides relative to the angle. Pick the ratio that uses the two sides you know (or know and want)."], "Hypotenuse 10, angle 30°, want the opposite: opp = 10 × sin 30° = 5."],
      ["Finding an angle", ["Work out the ratio as a number, then use the inverse function on your calculator."], "opp 5, adj 8: x = tan⁻¹(5 ÷ 8) = 32.0°."],
    ],
    ex: [
      ["Angle 40°, hypotenuse 12 cm. Find the adjacent side to 1 d.p.", ["adj = 12 × cos 40°"], "9.2 cm"],
      ["Opposite 7 cm, hypotenuse 9 cm. Find the angle to 1 d.p.", ["sin x = 7 ÷ 9", "x = sin⁻¹(0.777…)"], "51.1°"],
    ],
    mis: [
      ["Calculator in radians.", "Answers will be wildly wrong.", "Check the calculator shows D (degrees)."],
      ["Labelling from the wrong angle.", "Opposite and adjacent depend on which angle you use.", "Label from the angle in the question."],
    ],
    check: ["I can find a missing side", "I can find a missing angle"],
  }),

  "y10-u9-l2": L({
    intro: ["Some trig values are worth knowing exactly, without a calculator. They come from two special triangles."],
    obj: ["Recall exact values of sin, cos and tan for 0°, 30°, 45°, 60° and 90°"],
    prior: ["SOHCAHTOA", "Surds"],
    vocab: [["Exact value", "A value written precisely, e.g. √3/2, not as a rounded decimal."]],
    teach: [
      ["The special triangles", ["A right-angled isosceles triangle with shorter sides 1 has hypotenuse √2: this gives 45°. Half an equilateral triangle of side 2 has sides 1, √3 and 2: this gives 30° and 60°."], "sin 30° = cos 60° = ½; sin 60° = cos 30° = √3/2; sin 45° = cos 45° = √2/2; tan 45° = 1; tan 60° = √3; tan 30° = √3/3."],
      ["0° and 90°", ["sin 0° = 0, cos 0° = 1, sin 90° = 1, cos 90° = 0, tan 0° = 0."]],
    ],
    ex: [
      ["Find the exact value of 4 sin 30°.", ["sin 30° = ½"], "2"],
      ["Find the exact value of cos 30° × tan 60°.", ["(√3/2) × √3 = 3/2"], "3/2"],
    ],
    mis: [
      ["Mixing up sin 30° and sin 60°.", "They are different: ½ and √3/2.", "Sketch the half-equilateral triangle."],
    ],
    check: ["I know the exact values", "I can calculate with them without a calculator"],
  }),

  "y10-u9-l3": L({
    intro: ["The sine rule works in ANY triangle, not just right-angled ones. Use it when you know a side and its opposite angle."],
    obj: ["Use the sine rule to find sides and angles"],
    prior: ["Trigonometry in right-angled triangles"],
    vocab: [["Sine rule", "a ÷ sin A = b ÷ sin B = c ÷ sin C."], ["Notation", "Side a is opposite angle A."]],
    teach: [
      ["Finding a side", ["Use a/sin A = b/sin B with the missing side on top."], "A = 50°, B = 70°, a = 8: b = 8 × sin 70° ÷ sin 50° = 9.8."],
      ["Finding an angle", ["Flip it: sin A ÷ a = sin B ÷ b, then use sin⁻¹."]],
    ],
    ex: [
      ["A = 40°, B = 65°, a = 10 cm. Find b to 1 d.p.", ["b = 10 × sin 65° ÷ sin 40°"], "14.1 cm"],
      ["A = 72°, a = 15, b = 9, B acute. Find B to 1 d.p.", ["sin B = 9 × sin 72° ÷ 15 = 0.5706…"], "34.8°"],
    ],
    mis: [
      ["Pairing a side with the wrong angle.", "Each side goes with the angle OPPOSITE it.", "Label a opposite A, b opposite B."],
    ],
    check: ["I can find a side with the sine rule", "I can find an angle with the sine rule"],
  }),

  "y10-u9-l4": L({
    intro: ["The cosine rule finds a side when you know two sides and the angle between them, or an angle when you know all three sides."],
    obj: ["Use the cosine rule to find sides and angles"],
    prior: ["Sine rule", "Order of operations"],
    vocab: [["Cosine rule", "a² = b² + c² − 2bc cos A."]],
    teach: [
      ["Finding a side", ["Substitute, work out the right-hand side carefully, then square root."], "b = 7, c = 9, A = 60°: a² = 49 + 81 − 126 × 0.5 = 67, a = 8.2."],
      ["Finding an angle", ["cos A = (b² + c² − a²) ÷ 2bc. Then use cos⁻¹."]],
    ],
    ex: [
      ["b = 5, c = 8, A = 110°. Find a to 1 d.p.", ["a² = 25 + 64 − 80 cos 110° = 116.36…"], "10.8"],
      ["Sides 6, 7 and 8. Find the angle opposite 8.", ["cos C = (36 + 49 − 64) ÷ 84 = 0.25"], "75.5°"],
    ],
    mis: [
      ["Calculating (b² + c² − 2bc) × cos A.", "Only 2bc is multiplied by cos A.", "Type the whole formula into the calculator as written."],
    ],
    check: ["I can find a side with the cosine rule", "I can find an angle with the cosine rule"],
  }),

  "y10-u9-l5": L({
    intro: ["You can find the area of any triangle if you know two sides and the angle between them."],
    obj: ["Use area = ½ab sin C", "Rearrange it to find a side"],
    prior: ["Area of a triangle", "Trigonometry"],
    vocab: [["Included angle", "The angle between the two known sides."]],
    teach: [
      ["The formula", ["Area = ½ × a × b × sin C, where C is between sides a and b."], "Sides 6 and 9, angle 40°: ½ × 6 × 9 × sin 40° = 17.4 cm²."],
    ],
    ex: [
      ["Sides 10 cm and 12 cm with 30° between them. Find the area.", ["½ × 10 × 12 × ½"], "30 cm²"],
      ["Area 20 cm², one side 8 cm, angle 45°. Find the other side.", ["20 = ½ × 8 × x × sin 45°", "x = 20 ÷ 2.828…"], "7.1 cm"],
    ],
    mis: [
      ["Using an angle that isn't between the two sides.", "The formula needs the included angle.", "Check the angle is where the two sides meet."],
    ],
    check: ["I can find an area using ½ab sin C", "I can find a missing side from the area"],
  }),

  "y10-u9-l6": L({
    intro: ["In 3D shapes, find a right-angled triangle hidden inside the shape, then use Pythagoras or trigonometry as normal."],
    obj: ["Find lengths and angles in cuboids"],
    prior: ["Pythagoras", "Trigonometry"],
    vocab: [["Space diagonal", "A diagonal through the inside of a cuboid, from corner to opposite corner."]],
    teach: [
      ["The longest diagonal", ["d = √(l² + w² + h²). This is Pythagoras twice: first the base diagonal, then with the height."], "3 × 4 × 12 cuboid: √(9 + 16 + 144) = 13."],
      ["Angle with the base", ["The diagonal, the base diagonal and the height make a right-angled triangle. tan θ = height ÷ base diagonal."]],
    ],
    ex: [
      ["A cuboid 5 × 4 × 3 cm. Find the space diagonal.", ["√(25 + 16 + 9) = √50"], "7.1 cm"],
      ["For the same cuboid, find the angle with the base.", ["Base diagonal = √41", "tan θ = 3 ÷ √41"], "25.1°"],
    ],
    mis: [
      ["Using the height against an edge instead of the base diagonal.", "The angle with the base needs the diagonal of the base.", "Draw the triangle out flat."],
    ],
    check: ["I can find a space diagonal", "I can find the angle between a line and a plane"],
  }),

  /* ======================= Unit 10: Circles, surface area and volume ======================= */
  "y10-u10-l1": L({
    intro: ["A sector is a slice of a circle. Its arc length and area are fractions of the full circle's circumference and area."],
    obj: ["Find arc lengths", "Find sector areas"],
    prior: ["Circumference and area of a circle"],
    vocab: [["Sector", "A region bounded by two radii and an arc."], ["Arc", "Part of the circumference."]],
    teach: [
      ["The fraction", ["The fraction of the circle is angle ÷ 360. Arc length = (θ ÷ 360) × 2πr. Sector area = (θ ÷ 360) × πr²."], "r = 6, θ = 60°: arc = (1/6) × 12π = 2π = 6.3 cm."],
    ],
    ex: [
      ["Find the arc length when r = 10 cm and θ = 72°.", ["(72 ÷ 360) × 20π = 4π"], "12.6 cm"],
      ["Find the sector area when r = 4 cm and θ = 135°.", ["(135 ÷ 360) × 16π = 6π"], "18.8 cm²"],
    ],
    mis: [
      ["Using πr² for arc length.", "Arc length is a length, so it comes from the circumference.", "Use 2πr for length, πr² for area."],
    ],
    check: ["I can find an arc length", "I can find a sector area"],
  }),

  "y10-u10-l2": L({
    intro: ["A prism has the same cross-section all the way through. Its volume is the area of that cross-section times its length."],
    obj: ["Find the volume of prisms, including cylinders"],
    prior: ["Areas of 2D shapes"],
    vocab: [["Prism", "A 3D shape with a constant cross-section."], ["Cylinder", "A prism with a circular cross-section."]],
    teach: [
      ["Volume", ["Volume = area of cross-section × length. For a cylinder: V = πr²h."], "Radius 3, height 10: V = 90π = 282.7 cm³."],
    ],
    ex: [
      ["A triangular prism: triangle base 6 cm, height 4 cm, length 10 cm. Find the volume.", ["Cross-section = 12 cm²"], "120 cm³"],
      ["A cylinder has radius 5 cm and height 8 cm. Find its volume.", ["π × 25 × 8 = 200π"], "628.3 cm³"],
    ],
    mis: [
      ["Forgetting the ½ for a triangle.", "The area of a triangle is half base times height.", "Find the cross-section area carefully first."],
    ],
    check: ["I can find the volume of a prism", "I can find the volume of a cylinder"],
  }),

  "y10-u10-l3": L({
    intro: ["Surface area is the total area of all the faces of a 3D shape, like the amount of wrapping paper needed to cover it."],
    obj: ["Find the surface area of cuboids, prisms and cylinders"],
    prior: ["Areas of 2D shapes", "Circumference"],
    vocab: [["Net", "A flat shape that folds to make a 3D shape."], ["Curved surface", "For a cylinder, a rectangle 2πr wide and h tall."]],
    teach: [
      ["Add every face", ["Sketch the net, find the area of each face, and add. A cylinder is two circles plus a rectangle: SA = 2πr² + 2πrh."], "r = 2, h = 5: 8π + 20π = 28π = 88.0 cm²."],
    ],
    ex: [
      ["Find the surface area of a 3 × 4 × 5 cm cuboid.", ["2(12 + 15 + 20)"], "94 cm²"],
      ["Find the curved surface area of a cylinder, r = 3 cm, h = 7 cm.", ["2π × 3 × 7 = 42π"], "131.9 cm²"],
    ],
    mis: [
      ["Only counting three faces of a cuboid.", "Each face has an opposite partner.", "Double the three different faces."],
    ],
    check: ["I can find the surface area of a cuboid", "I can find the surface area of a cylinder"],
  }),

  "y10-u10-l4": L({
    intro: ["Cones and spheres have their own volume formulae, given on the GCSE formulae sheet. Knowing how to use them is what matters."],
    obj: ["Find the volume of spheres and cones"],
    prior: ["Volume of a cylinder", "Using formulae"],
    vocab: [["Perpendicular height", "The vertical height of a cone, at right angles to the base."], ["Hemisphere", "Half a sphere."]],
    teach: [
      ["Formulae", ["Sphere: V = (4/3)πr³. Cone: V = (1/3)πr²h. A cone is one third of the cylinder with the same base and height."], "Sphere, r = 3: 36π = 113.1 cm³."],
    ],
    ex: [
      ["Find the volume of a cone with r = 4 cm, h = 9 cm.", ["(1/3) × π × 16 × 9 = 48π"], "150.8 cm³"],
      ["Find the volume of a hemisphere of radius 6 cm.", ["½ × (4/3) × π × 216 = 144π"], "452.4 cm³"],
    ],
    mis: [
      ["Using the slant height in the cone volume.", "The formula needs the perpendicular height.", "Use Pythagoras first if you're given the slant height."],
    ],
    check: ["I can find the volume of a sphere", "I can find the volume of a cone"],
  }),

  "y10-u10-l5": L({
    intro: ["A pyramid is a third of a prism with the same base and height. A frustum is what's left when the top of a cone or pyramid is cut off."],
    obj: ["Find the volume of pyramids", "Find the volume of a frustum"],
    prior: ["Volume of a cone", "Similar shapes"],
    vocab: [["Pyramid", "A 3D shape whose faces meet at a point above a base."], ["Frustum", "A cone or pyramid with its top cut off parallel to the base."]],
    teach: [
      ["Pyramids", ["V = (1/3) × base area × height."], "Square base 6 cm, height 10 cm: (1/3) × 36 × 10 = 120 cm³."],
      ["Frustums", ["Volume of the frustum = volume of the whole cone − volume of the small cone removed. The small cone is similar to the big one."]],
    ],
    ex: [
      ["A pyramid has a rectangular base 4 × 9 cm and height 5 cm. Find its volume.", ["(1/3) × 36 × 5"], "60 cm³"],
      ["A cone r = 6, h = 12 has a cone r = 3, h = 6 removed. Find the frustum's volume.", ["Big: 144π, small: 18π", "126π"], "395.8 cm³"],
    ],
    mis: [
      ["Subtracting radii or heights instead of volumes.", "A frustum isn't a smaller cone.", "Work out both cone volumes, then subtract."],
    ],
    check: ["I can find the volume of a pyramid", "I can find the volume of a frustum"],
  }),

  /* ======================= Unit 11: Statistics ======================= */
  "y10-u11-l1": L({
    intro: ["A cumulative frequency graph shows a running total. It lets you estimate the median and quartiles of grouped data."],
    obj: ["Complete a cumulative frequency table", "Estimate the median from a cumulative frequency graph"],
    prior: ["Grouped frequency tables", "Median"],
    vocab: [["Cumulative frequency", "A running total of frequencies."], ["Upper class boundary", "The top of each group: points are plotted here."]],
    teach: [
      ["Plotting", ["Add the frequencies as you go. Plot each running total at the upper end of its group, and join with a smooth curve (or straight lines)."]],
      ["The median", ["Find n ÷ 2 on the cumulative frequency axis, read across to the curve, then down to the x-axis."], "n = 80: read across from 40."],
    ],
    ex: [
      ["Frequencies 4, 9, 15, 8. Find the cumulative frequencies.", ["4, 4 + 9, 13 + 15, 28 + 8"], "4, 13, 28, 36"],
      ["n = 60. Where do you read across from for the median?", ["60 ÷ 2"], "30"],
    ],
    mis: [
      ["Plotting at the middle of each group.", "Cumulative frequency is the total up to the END of the group.", "Plot at the upper class boundary."],
    ],
    check: ["I can work out cumulative frequencies", "I can estimate a median from the graph"],
  }),

  "y10-u11-l2": L({
    intro: ["The interquartile range (IQR) measures spread for the middle half of the data, so it isn't affected by extreme values."],
    obj: ["Find quartiles and the IQR from a list or a graph"],
    prior: ["Median and range", "Cumulative frequency graphs"],
    vocab: [["Lower quartile (LQ)", "A quarter of the way through the data."], ["Upper quartile (UQ)", "Three quarters of the way through."], ["IQR", "UQ − LQ."]],
    teach: [
      ["From a list", ["Order the data. For n values, the LQ is the (n + 1)/4th value and the UQ is the 3(n + 1)/4th value."], "11 values: LQ is the 3rd, UQ is the 9th."],
      ["From a graph", ["Read across from n/4 for the LQ and 3n/4 for the UQ."]],
    ],
    ex: [
      ["Find the IQR of 3, 5, 6, 8, 11, 14, 20.", ["LQ = 5 (2nd), UQ = 14 (6th)"], "9"],
      ["n = 120. Where do you read across for the quartiles?", ["120 ÷ 4 and 3 × 120 ÷ 4"], "30 and 90"],
    ],
    mis: [
      ["Using the range instead of the IQR.", "The range uses the extremes.", "IQR = UQ − LQ."],
    ],
    check: ["I can find quartiles from a list", "I can find the IQR from a graph"],
  }),

  "y10-u11-l3": L({
    intro: ["A box plot summarises data with five values: minimum, lower quartile, median, upper quartile and maximum."],
    obj: ["Read and draw box plots"],
    prior: ["Quartiles and IQR"],
    vocab: [["Box plot", "A diagram showing the five-number summary."], ["Whiskers", "Lines from the box to the minimum and maximum."]],
    teach: [
      ["Reading one", ["The box runs from LQ to UQ (its width is the IQR). The line inside is the median. The whiskers reach the minimum and maximum (their spread is the range)."]],
    ],
    ex: [
      ["A box plot has min 12, LQ 20, median 26, UQ 31, max 40. Find the IQR.", ["31 − 20"], "11"],
      ["For the same box plot, find the range.", ["40 − 12"], "28"],
    ],
    mis: [
      ["Reading the median as the middle of the box.", "The median line can be anywhere inside the box.", "Read where the line is drawn."],
    ],
    check: ["I can read values from a box plot", "I can find the IQR and range"],
  }),

  "y10-u11-l4": L({
    intro: ["To compare two sets of data you need TWO comparisons: an average and a measure of spread, each linked to the context."],
    obj: ["Compare distributions using averages and spread"],
    prior: ["Median, range and IQR"],
    vocab: [["Consistent", "Having a small spread."]],
    teach: [
      ["What to write", ["Compare the medians (which is higher on average) and the IQRs or ranges (which is more consistent: a SMALLER spread). Always refer to the context."], "Group A's median time was lower, so they were quicker on average; A's IQR was smaller, so their times were more consistent."],
    ],
    ex: [
      ["A: median 54, IQR 12. B: median 61, IQR 20. Compare.", ["B higher on average", "A more consistent"], "B scored higher on average; A's scores were more consistent"],
      ["Find the median of 12, 7, 20, 15, 9.", ["Order: 7, 9, 12, 15, 20"], "12"],
    ],
    mis: [
      ["Saying a larger IQR is more consistent.", "Larger spread means more variation.", "Smaller IQR = more consistent."],
      ["Only comparing averages.", "GCSE questions expect both average and spread.", "Make one comment on each."],
    ],
    check: ["I can compare averages in context", "I can compare spread in context"],
  }),

  "y10-u11-l5": L({
    intro: ["Histograms show grouped data with unequal class widths. The area of each bar, not its height, shows the frequency."],
    obj: ["Calculate frequency density", "Find frequencies from a histogram"],
    prior: ["Grouped data", "Area of a rectangle"],
    vocab: [["Frequency density", "Frequency ÷ class width: the height of a histogram bar."]],
    teach: [
      ["Drawing", ["Bar height = frequency density = frequency ÷ class width."], "Class 10 < x ≤ 30 with frequency 16: FD = 16 ÷ 20 = 0.8."],
      ["Reading", ["Frequency = frequency density × class width (the area of the bar)."]],
    ],
    ex: [
      ["A class of width 5 has frequency 12. Find the frequency density.", ["12 ÷ 5"], "2.4"],
      ["A bar has height 1.5 and covers 20 < x ≤ 40. Find the frequency.", ["1.5 × 20"], "30"],
    ],
    mis: [
      ["Reading the height as the frequency.", "The y-axis is frequency density.", "Multiply by the class width."],
    ],
    check: ["I can calculate frequency density", "I can find frequencies from a histogram"],
  }),

  /* ======================= Unit 12: Probability at GCSE ======================= */
  "y10-u12-l1": L({
    intro: ["Tree diagrams organise two or more events. For independent events, one outcome doesn't affect the other."],
    obj: ["Use tree diagrams for independent events", "Find P(at least one)"],
    prior: ["Multiplying fractions", "Probabilities sum to 1"],
    vocab: [["Independent", "The outcome of one event doesn't change the other's probability."]],
    teach: [
      ["Multiply along, add between", ["Multiply probabilities along branches for “and”. Add the results of different routes for “or”."], "P(both) = P(A) × P(B)."],
      ["At least one", ["P(at least one) = 1 − P(neither). This is usually quicker than adding all the routes."]],
    ],
    ex: [
      ["P(A) = ⅓, P(B) = ¼, independent. Find P(A and B).", ["⅓ × ¼"], "1/12"],
      ["For the same events, find P(at least one).", ["P(neither) = ⅔ × ¾ = ½", "1 − ½"], "1/2"],
    ],
    mis: [
      ["Adding probabilities for “and”.", "Both happening is less likely than either alone.", "Multiply along the branches."],
    ],
    check: ["I can multiply along branches", "I can find P(at least one)"],
  }),

  "y10-u12-l2": L({
    intro: ["When items aren't replaced, the second probability changes: there's one fewer item in total, and maybe one fewer of a colour."],
    obj: ["Calculate probabilities for dependent events"],
    prior: ["Tree diagrams"],
    vocab: [["Dependent events", "The first outcome changes the probabilities for the second."], ["Without replacement", "The first item is not put back."]],
    teach: [
      ["Changing branches", ["On the second set of branches, reduce the total by 1, and reduce the count of whatever was taken."], "5 red, 3 blue: P(red, red) = 5/8 × 4/7 = 20/56 = 5/14."],
    ],
    ex: [
      ["4 green and 6 yellow sweets. Two eaten. P(both green)?", ["4/10 × 3/9 = 12/90"], "2/15"],
      ["Same bag: P(one of each)?", ["GY: 4/10 × 6/9 = 24/90, YG: 6/10 × 4/9 = 24/90", "48/90"], "8/15"],
    ],
    mis: [
      ["Keeping the same denominator for the second pick.", "There's one fewer item.", "Reduce the total by 1."],
      ["Only counting one order for “one of each”.", "It could be either colour first.", "Add both routes."],
    ],
    check: ["I can find probabilities without replacement", "I can include every route"],
  }),

  "y10-u12-l3": L({
    intro: ["Venn diagrams show how events overlap. Set notation is a compact way to describe the regions."],
    obj: ["Use set notation", "Find probabilities from Venn diagrams"],
    prior: ["Venn diagrams", "Fractions"],
    vocab: [["A ∩ B", "A and B (the overlap)."], ["A ∪ B", "A or B or both."], ["A′", "Not A."], ["ξ", "The universal set: everything."]],
    teach: [
      ["Reading regions", ["Add the numbers in the region you need, then divide by the total in the whole rectangle."], "A only 8, both 4, B only 6, outside 2 (total 20): P(A ∪ B) = 18/20 = 9/10."],
    ],
    ex: [
      ["Using the numbers above, find P(A ∩ B).", ["4 ÷ 20"], "1/5"],
      ["Find P(A′).", ["Not in A: 6 + 2 = 8"], "2/5"],
    ],
    mis: [
      ["Forgetting the number outside the circles in the total.", "The total includes everyone.", "Add all four regions for the denominator."],
    ],
    check: ["I understand ∩, ∪ and ′", "I can find probabilities from a Venn diagram"],
  }),

  "y10-u12-l4": L({
    intro: ["Conditional probability is the probability of something GIVEN that something else has happened. It restricts which outcomes you count."],
    obj: ["Find conditional probabilities from tables and Venn diagrams"],
    prior: ["Two-way tables", "Venn diagrams"],
    vocab: [["P(A | B)", "The probability of A given B."]],
    teach: [
      ["Restrict the total", ["“Given B” means only look at the B group. P(A | B) = number in A and B ÷ number in B."], "From the Venn diagram above, P(A | B) = 4 ÷ (4 + 6) = 2/5."],
    ],
    ex: [
      ["In a class, 12 of the 20 girls and 9 of the 15 boys walk to school. A girl is chosen. P(walks)?", ["Only girls: 12 out of 20"], "3/5"],
      ["Both 5, B only 15. Find P(A | B).", ["5 ÷ 20"], "1/4"],
    ],
    mis: [
      ["Dividing by the overall total.", "“Given” changes the total.", "Divide by the number in the given group."],
    ],
    check: ["I can find conditional probabilities from a table", "I can find them from a Venn diagram"],
  }),
};
