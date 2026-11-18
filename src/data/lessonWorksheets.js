/* ==========================================================================
   WHICH WORKSHEETS GO WITH WHICH LESSON
   --------------------------------------------------------------------------
   Each lesson id (from curriculum.js, e.g. "y7-u1-l3" = Year 7, unit 1,
   lesson 3) is paired with the worksheets that practise it. The words in
   the lists are worksheet "slugs": the PDF file names without ".pdf", the
   same ones listed in worksheets.js.

   The lesson page shows these worksheets in a "Practise on paper" box, and
   the unit page gathers up all of its lessons' worksheets.

   To add or change a link: find the lesson id, then add or remove a slug.
   The order of a list is the order the worksheets appear on the page, so
   put the most useful one first. A lesson that isn't listed simply shows
   no worksheet box. If you type a slug that doesn't exist, the page skips
   it rather than breaking.
   ========================================================================== */
import { WORKSHEETS } from "./worksheets.js";

export const LESSON_WORKSHEETS = {
  /* ------------------------------- YEAR 7 ------------------------------- */
  // Place value and number
  "y7-u1-l1": ["number-place-value", "number-writing-figures-in-words", "number-writing-words-in-figures", "binary"],
  "y7-u1-l2": ["number-ordering-numbers", "decimals-ordering", "number-midpoint-of-two-numbers", "money-midpoint"],
  "y7-u1-l3": ["rounding-to-nearest-10", "rounding-to-nearest-100", "rounding-to-whole-numbers"],
  "y7-u1-l4": ["rounding-to-decimal-places"],
  "y7-u1-l5": ["number-estimation", "sensible-estimates", "money-estimation"],
  "y7-u1-l6": ["negatives-real-life", "negatives-addition-subtractions"],
  "y7-u1-l7": ["negatives-ordering"],
  "y7-u1-l8": ["number-bodmas-order-of-operations"],
  // The four operations
  "y7-u2-l1": ["addition-column-method"],
  "y7-u2-l2": ["subtraction"],
  "y7-u2-l3": ["multiplication-grid-method", "multiplication-column-method", "multiplication-times-tables"],
  "y7-u2-l4": ["division-short-division", "division-long-division", "division-remainders"],
  "y7-u2-l5": ["multiplication-column-method", "division-long-division", "addition-column-method", "subtraction", "multiplication-decimals", "decimals-dividing-decimals-by-integers"],
  "y7-u2-l6": ["multiplication-times-tables", "multiplication-end-number", "number-using-calculations"],
  "y7-u2-l7": ["division-remainders", "money-mixed", "time-calculations", "money-coins", "money-change", "money-buying", "money-greatest-maximum", "money-reading-meters"],
  // Factors, multiples and primes
  "y7-u3-l1": ["number-factors"],
  "y7-u3-l2": ["number-multiples", "number-odd-and-even-numbers"],
  "y7-u3-l3": ["number-prime-numbers"],
  "y7-u3-l4": ["number-square-numbers-and-squaring", "number-cube-numbers-and-cubing", "number-triangular-numbers"],
  "y7-u3-l5": ["number-common-factors-hcf"],
  "y7-u3-l6": ["number-common-multiples-lcm"],
  // Introduction to algebra
  "y7-u4-l1": ["algebra-notation", "function-machines", "flow-charts"],
  "y7-u4-l2": ["algebra-notation", "algebra-multiplying-terms", "algebra-dividing-terms"],
  "y7-u4-l3": ["algebra-collecting-like-terms"],
  "y7-u4-l4": ["algebra-collecting-like-terms", "algebra-multiplying-terms", "algebra-dividing-terms"],
  "y7-u4-l5": ["algebra-substitution"],
  "y7-u4-l6": ["algebra-expressions-forming"],
  "y7-u4-l7": ["algebra-expanding-brackets"],
  // Fractions
  "y7-u5-l1": ["fractions-of-shapes"],
  "y7-u5-l2": ["fractions-equivalent"],
  "y7-u5-l3": ["fractions-simplifying"],
  "y7-u5-l4": ["fractions-ordering"],
  "y7-u5-l5": ["fractions-improper-to-mixed-number", "fractions-mixed-number-to-improper"],
  "y7-u5-l6": ["fractions-addition-same-denominator", "fractions-addition-diff-denominators"],
  "y7-u5-l7": ["fractions-fraction-of-an-amount"],
  // Decimals and percentages
  "y7-u6-l1": ["number-place-value", "decimals-ordering"],
  "y7-u6-l2": ["decimals-addition", "decimals-subtraction"],
  "y7-u6-l3": ["multiplication-by-10-100-etc", "division-by-10-100-1000", "multiplication-powers-of-10", "division-by-powers-of-10"],
  "y7-u6-l4": ["fdp-key-equivalents", "fdp-percentages-to-fractions"],
  "y7-u6-l5": ["fdp-key-equivalents", "fdp-fractions-to-decimals", "fdp-decimals-to-percentages", "fdp-fractions-to-percentages",
    "fdp-percentages-to-decimals", "fdp-decimals-to-fractions"],
  "y7-u6-l6": ["percentages-of-an-amount-non-calc"],
  // Sequences
  "y7-u7-l1": ["sequences-describing-rules"],
  "y7-u7-l2": ["sequences-describing-rules", "sequences-missing-terms"],
  "y7-u7-l3": ["sequences-missing-terms", "sequences-fibonacci"],
  "y7-u7-l4": ["arithmetic-progressions", "sequences-describing-rules"],
  "y7-u7-l5": ["sequences-nth-term"],
  "y7-u7-l6": ["sequences-patterns"],
  // Angles and lines
  "y7-u8-l1": ["angles-types-of", "angles-right-angle", "angles-estimation", "perpendicular-lines"],
  "y7-u8-l2": ["angles-measuring", "angles-drawing"],
  "y7-u8-l3": ["angles-straight-line"],
  "y7-u8-l4": ["angles-full-circle-at-a-point"],
  "y7-u8-l5": ["angles-vertically-opposites"],
  "y7-u8-l6": ["angles-triangle"],
  "y7-u8-l7": ["angles-quadrilaterals"],
  // Perimeter and area
  "y7-u9-l1": ["perimeter", "perimeter-on-a-grid"],
  "y7-u9-l2": ["area-rectangle", "area-on-a-grid"],
  "y7-u9-l3": ["area-triangle"],
  "y7-u9-l4": ["area-parallelogram"],
  "y7-u9-l5": ["area-compound-shapes", "area-l-shape", "area-regular-hexagon"],
  "y7-u9-l6": ["units-metric-units-length", "units-converting-areas", "measuring-lines", "drawing-lines", "scales-reading"],
  // Introduction to ratio
  "y7-u10-l1": ["ratio-simplifying"],
  "y7-u10-l2": ["ratio-simplifying"],
  "y7-u10-l3": ["ratio-sharing-the-total"],
  "y7-u10-l4": ["ratio-express-as-fractions-or-percent"],
  "y7-u10-l5": ["proportion-recipes"],
  // Data and averages
  "y7-u11-l1": ["types-of-data-qualitative-and-quantitative", "types-of-data-discrete-and-continuous"],
  "y7-u11-l2": ["types-of-data-primary-and-secondary", "questionnaires", "data-handling-cycle"],
  "y7-u11-l3": ["tally-charts", "reading-tables", "tables-timetables", "tables-distance-charts"],
  "y7-u11-l4": ["graphs-bar-charts-draw", "graphs-bar-charts-reading", "graphs-pictograms-interpret", "graphs-pictograms-draw", "graphs-vertical-line-charts"],
  "y7-u11-l5": ["averages-mode", "averages-median", "averages-range"],
  "y7-u11-l6": ["averages-mean"],
  // Introduction to probability
  "y7-u12-l1": ["probability-scale"],
  "y7-u12-l2": ["probability-scale"],
  "y7-u12-l3": ["probability-basic"],
  "y7-u12-l4": ["probability-not-happening"],
  "y7-u12-l5": ["probability-listing-outcomes"],

  /* ------------------------------- YEAR 8 ------------------------------- */
  // Negative numbers and powers
  "y8-u1-l1": ["negatives-addition-subtractions", "money-bank-statements"],
  "y8-u1-l2": ["negatives-multiplication", "negatives-division"],
  "y8-u1-l3": ["number-square-root", "number-cube-root", "number-square-numbers-and-squaring", "number-cube-numbers-and-cubing"],
  "y8-u1-l4": ["indices-numerical"],
  "y8-u1-l5": ["number-bodmas-order-of-operations"],
  // Calculating with fractions
  "y8-u2-l1": ["fractions-multiplication"],
  "y8-u2-l2": ["fractions-division", "fractions-reciprocal"],
  "y8-u2-l3": ["fractions-addition-diff-denominators", "fractions-improper-to-mixed-number"],
  "y8-u2-l4": ["fractions-multiplication", "fractions-division", "fractions-mixed-number-to-improper"],
  "y8-u2-l5": ["fractions-finding-the-original", "fractions-increasing-by-a-fraction", "fractions-expressing-as", "fractions-finding-the-midpoint"],
  // Percentages
  "y8-u3-l1": ["fdp-mixture", "fdp-ordering", "fdp-decimals-to-fractions-calc"],
  "y8-u3-l2": ["percentages-of-an-amount-calc"],
  "y8-u3-l3": ["percentages-increasing-and-decreasing", "money-discounts", "money-vat"],
  "y8-u3-l4": ["percentages-multipliers"],
  "y8-u3-l5": ["percentages-expressing-as"],
  "y8-u3-l6": ["percentages-change", "money-profit"],
  // Expressions and equations
  "y8-u4-l1": ["algebra-expanding-brackets", "factorisation-single-brackets", "factorisation-brackets"],
  "y8-u4-l2": ["equations-forming", "equations-think-of-a-number"],
  "y8-u4-l3": ["equations-solving"],
  "y8-u4-l4": ["equations-solving"],
  "y8-u4-l5": ["equations-solving", "equations-angles-and-perimeter"],
  "y8-u4-l6": ["equations-letters-both-sides"],
  // Coordinates and straight-line graphs
  "y8-u5-l1": ["coordinates-reading-and-plotting", "coordinates-shapes-on-a-grid", "coordinates-3d"],
  "y8-u5-l2": ["linear-graphs-x-a-graphs", "linear-graphs-y-a-graphs"],
  "y8-u5-l3": ["linear-graphs-drawing-xy-table"],
  "y8-u5-l4": ["linear-graphs-drawing-xy-table", "linear-graphs-drawing-across-one-method"],
  "y8-u5-l5": ["linear-graphs-gradient-of-a-line"],
  // Ratio and proportion
  "y8-u6-l1": ["ratio-sharing-the-total", "ratio-difference-between"],
  "y8-u6-l2": ["ratio-given-one-value"],
  "y8-u6-l3": ["proportion-direct", "number-currency"],
  "y8-u6-l4": ["proportion-unitary-method"],
  "y8-u6-l5": ["number-best-buys", "money-cost-per-kg-cost-per-litre-cost-per-metre", "money-proportion"],
  // Circles and area
  "y8-u7-l1": ["area-trapezium"],
  "y8-u7-l2": ["circles-parts"],
  "y8-u7-l3": ["circles-circumference"],
  "y8-u7-l4": ["circles-area"],
  "y8-u7-l5": ["area-semi-circle", "area-quarter-circle", "circles-perimeter-semi-circle", "circles-perimeter-quarter-circle"],
  // Angles in parallel lines and polygons
  "y8-u8-l1": ["angles-parallel-lines", "parallel-lines"],
  "y8-u8-l2": ["angles-parallel-lines"],
  "y8-u8-l3": ["angles-parallel-lines"],
  "y8-u8-l4": ["triangles-types-of", "triangles-lengths-of-sides", "angles-triangle"],
  "y8-u8-l5": ["2d-shapes-quadrilaterals", "angles-quadrilaterals", "2d-shapes-names"],
  "y8-u8-l6": ["angles-polygons"],
  "y8-u8-l7": ["angles-polygons", "angles-tessellations"],
  // 3D shapes
  "y8-u9-l1": ["3d-shapes-names", "3d-shapes-vertices-edges-faces"],
  "y8-u9-l2": ["3d-shapes-nets"],
  "y8-u9-l3": ["surface-area-cuboid"],
  "y8-u9-l4": ["volume-cube-cuboid"],
  "y8-u9-l5": ["views-front-side-elevation-and-plan-view"],
  // Transformations
  "y8-u10-l1": ["reflections", "symmetry-line", "reflections-finding-mirror-line"],
  "y8-u10-l2": ["rotations", "symmetry-rotational"],
  "y8-u10-l3": ["translations-vector"],
  "y8-u10-l4": ["enlargements", "enlargements-ray-method", "enlargements-from-a-centre"],
  "y8-u10-l5": ["reflections-describing", "translations-describing", "enlargements-describing", "transformations-mixture"],
  "y8-u10-l6": ["congruent-shapes"],
  // Charts and graphs
  "y8-u11-l1": ["graphs-pie-charts-draw", "graphs-pie-charts-interpret"],
  "y8-u11-l2": ["graphs-dual-bar-charts", "graphs-composite-bar-charts"],
  "y8-u11-l3": ["graphs-line-graphs", "time-series"],
  "y8-u11-l4": ["averages-median-class-grouped-data", "graphs-frequency-polygons-draw"],
  "y8-u11-l5": ["graphs-scatter-graphs-draw", "graphs-scatter-graphs-interpret"],
  "y8-u11-l6": ["graphs-scatter-graphs-correlation", "graphs-scatter-graphs-line-of-best-fit"],
  // Probability: outcomes and experiments
  "y8-u12-l1": ["probability-sample-space", "product-rule-for-counting"],
  "y8-u12-l2": ["tables-two-way-tables"],
  "y8-u12-l3": ["probability-relative-frequency"],
  "y8-u12-l4": ["probability-relative-frequency"],
  "y8-u12-l5": ["probability-relative-frequency", "probability-or-rule"],

  /* ------------------------------- YEAR 9 ------------------------------- */
  // Rounding, estimation and accuracy
  "y9-u1-l1": ["rounding-significant-figures"],
  "y9-u1-l2": ["number-estimation"],
  "y9-u1-l3": ["error-intervals"],
  "y9-u1-l4": ["rounding-highest-lowest", "limits-of-accuracy"],
  // Indices and standard form
  "y9-u2-l1": ["indices-laws-of", "algebra-indices"],
  "y9-u2-l2": ["indices-laws-of"],
  "y9-u2-l3": ["indices-negative"],
  "y9-u2-l4": ["standard-form"],
  "y9-u2-l5": ["standard-form"],
  "y9-u2-l6": ["standard-form-multiplication", "standard-form-division", "standard-form-addition"],
  // Prime factorisation
  "y9-u3-l1": ["number-product-of-primes"],
  "y9-u3-l2": ["number-product-of-primes", "number-product-of-primes-squares-cubes"],
  "y9-u3-l3": ["number-product-of-primes-lcm-hcf"],
  "y9-u3-l4": ["number-product-of-primes-lcm-hcf"],
  "y9-u3-l5": ["number-product-of-primes-lcm-hcf", "number-common-factors-hcf", "number-common-multiples-lcm"],
  // Brackets and factorising
  "y9-u4-l1": ["algebra-expanding-two-brackets"],
  "y9-u4-l2": ["algebra-expanding-two-brackets"],
  "y9-u4-l3": ["algebra-expanding-two-brackets", "factorisation-quadratics"],
  "y9-u4-l4": ["factorisation-quadratics"],
  "y9-u4-l5": ["factorisation-difference-of-2-squares"],
  "y9-u4-l6": ["equations-forming", "equations-angles-and-perimeter"],
  // Inequalities and formulae
  "y9-u5-l1": ["inequalities-symbols"],
  "y9-u5-l2": ["inequalities-on-a-number-line"],
  "y9-u5-l3": ["inequalities-solving-one-sign", "inequalities-solving-two-signs"],
  "y9-u5-l4": ["algebra-substitution", "identities-formula-equations-etc"],
  "y9-u5-l5": ["algebra-changing-the-subject", "algebra-changing-the-subject-advanced"],
  // Linear graphs
  "y9-u6-l1": ["linear-graphs-gradient-of-a-line", "linear-graphs-gradient-between-points"],
  "y9-u6-l2": ["linear-graphs-y-mx-c"],
  "y9-u6-l3": ["linear-graphs-y-mx-c", "linear-graphs-drawing-using-y-mx-c", "linear-graphs-find-equation-of-a-line"],
  "y9-u6-l4": ["linear-graphs-parallel-lines"],
  "y9-u6-l5": ["linear-graphs-real-life", "graphs-real-life-linear-graphs", "graphs-conversion-graphs-interpret",
    "graphs-filling-containers", "graphs-conversion-graphs-draw"],
  "y9-u6-l6": ["graphs-distance-time-graphs"],
  // Sequences and the nth term
  "y9-u7-l1": ["sequences-nth-term"],
  "y9-u7-l2": ["sequences-nth-term", "sequences-nth-term-for-fractional-sequences"],
  "y9-u7-l3": ["geometric-progressions"],
  "y9-u7-l4": ["sequences-fibonacci", "number-triangular-numbers", "sequences-quadratic-nth-term"],
  // Proportion and compound measures
  "y9-u8-l1": ["units-metric-units-length", "units-metric-units-mass", "units-metric-units-capacity", "units-metric-to-imperial-length",
    "units-converting-areas", "units-converting-volumes", "units-types-of-metric-and-imperial-unit", "units-converting-imperial-units-for-length", "units-converting-imperial-units-for-mass", "units-converting-imperial-units-for-capacity", "units-metric-to-imperial-mass", "units-metric-to-imperial-capacity"],
  "y9-u8-l2": ["speed-distance-and-time"],
  "y9-u8-l3": ["density"],
  "y9-u8-l4": ["pressure", "population-density", "density"],
  "y9-u8-l5": ["proportion-inverse", "proportion-time"],
  "y9-u8-l6": ["scales-and-maps"],
  // Pythagoras' theorem
  "y9-u9-l1": ["pythagoras-show-triangle-is-right-angle"],
  "y9-u9-l2": ["pythagoras-finding-sides"],
  "y9-u9-l3": ["pythagoras-finding-sides"],
  "y9-u9-l4": ["pythagoras-rectangles-isosceles-tri"],
  "y9-u9-l5": ["pythagoras-on-a-graph", "coordinates-distance-between-two-points"],
  // Introduction to trigonometry
  "y9-u10-l1": ["trigonometry-introduction"],
  "y9-u10-l2": ["trigonometry-missing-sides"],
  "y9-u10-l3": ["trigonometry-missing-sides"],
  "y9-u10-l4": ["trigonometry-missing-sides"],
  "y9-u10-l5": ["trigonometry-missing-angles"],
  // Constructions, loci and bearings
  "y9-u11-l1": ["constructions-triangles-sss", "constructions-triangles-sas", "constructions-triangles-asa",
    "constructions-equilateral-triangles"],
  "y9-u11-l2": ["constructions-perpendicular-bisector", "constructions-perpendicular-to-point", "constructions-perpendicular-point-on-line"],
  "y9-u11-l3": ["constructions-angle-bisector", "constructions-60-degree-angle", "constructions-90-degree-angle", "constructions-30-degree-angle", "constructions-45-degree-angle", "constructions-hexagon"],
  "y9-u11-l4": ["constructions-loci-part-1", "constructions-loci-part-2", "constructions-loci-part-3"],
  "y9-u11-l5": ["angles-bearings", "angles-compass-directions", "angles-back-bearings"],
  "y9-u11-l6": ["angles-given-bearings-from-two-points", "scales-and-maps"],
  // Analysing data
  "y9-u12-l1": ["averages-mean-frequency-table", "averages-median-frequency-table", "averages-mode-frequency-table",
    "averages-range-frequency-tables"],
  "y9-u12-l2": ["averages-mean-estimated", "averages-median-class-grouped-data"],
  "y9-u12-l3": ["averages-distributions", "graphs-stem-and-leaf-interpret"],
  "y9-u12-l4": ["sampling-random", "sampling-using-samples", "questionnaires"],
  "y9-u12-l5": ["time-series"],
  // Combined events
  "y9-u13-l1": ["probability-sample-space", "probability-listing-outcomes"],
  "y9-u13-l2": ["venn-diagrams"],
  "y9-u13-l3": ["probability-tree-diagrams", "frequency-trees"],
  "y9-u13-l4": ["probability-independent-events"],

  /* ------------------------------- YEAR 10 ------------------------------ */
  // Number skills for GCSE
  "y10-u1-l1": ["fdp-mixture", "fdp-fractions-to-decimals-calc"],
  "y10-u1-l2": ["decimals-recurring-decimals"],
  "y10-u1-l3": ["decimals-recurring-decimals"],
  "y10-u1-l4": ["surds-intro-rules-simplifying"],
  "y10-u1-l5": ["surds-addition-subtraction", "surds-expanding-brackets"],
  "y10-u1-l6": ["surds-rationalising-denominators"],
  "y10-u1-l7": ["indices-fractional"],
  // Percentages and financial maths
  "y10-u2-l1": ["percentages-multipliers"],
  "y10-u2-l2": ["percentages-compound-interest", "percentages-multipliers"],
  "y10-u2-l3": ["percentages-simple-interest", "percentages-compound-interest", "money-regular-payments"],
  "y10-u2-l4": ["percentages-reverse"],
  "y10-u2-l5": ["percentages-compound-interest", "types-of-graph-exponential"],
  // Algebraic manipulation
  "y10-u3-l1": ["algebra-expanding-two-brackets"],
  "y10-u3-l2": ["algebra-expanding-three-brackets"],
  "y10-u3-l3": ["factorisation-quadratics-harder", "factorisation-splitting-the-middle"],
  "y10-u3-l4": ["algebraic-fractions-simplifying"],
  "y10-u3-l5": ["algebraic-fractions-addition", "algebraic-fractions-multiplication", "algebraic-fractions-division"],
  "y10-u3-l6": ["identities-equating-coefficients", "identities-formula-equations-etc"],
  // Quadratic equations and graphs
  "y10-u4-l1": ["quadratics-solving-factorising", "quadratics-solving-foundation"],
  "y10-u4-l2": ["quadratic-graphs-drawing", "quadratics-solving-graphically"],
  "y10-u4-l3": ["quadratic-graphs-sketching-using-key-points", "quadratic-graphs-finding-turning-point", "quadratic-graphs-line-of-symmetry"],
  "y10-u4-l4": ["quadratics-the-quadratic-formula"],
  "y10-u4-l5": ["algebra-completing-the-square"],
  "y10-u4-l6": ["quadratics-solving-completing-the-square"],
  // Simultaneous equations
  "y10-u5-l1": ["simultaneous-equations-elimination"],
  "y10-u5-l2": ["simultaneous-equations-substitution-both-linear"],
  "y10-u5-l3": ["simultaneous-equations-graphical"],
  "y10-u5-l4": ["simultaneous-equations-elimination", "simultaneous-equations-3-unknowns"],
  "y10-u5-l5": ["simultaneous-equations-advanced", "quadratics-solving-graphically-advanced"],
  // Straight lines and inequalities
  "y10-u6-l1": ["linear-graphs-equation-through-2-points"],
  "y10-u6-l2": ["coordinates-midpoint-of-a-line", "coordinates-distance-between-two-points"],
  "y10-u6-l3": ["linear-graphs-parallel-lines", "linear-graphs-perpendicular-lines", "shortest-distance-from-point-to-a-line"],
  "y10-u6-l4": ["inequalities-solving-one-sign", "inequalities-solving-two-signs"],
  "y10-u6-l5": ["inequalities-graphical-y-a-or-x-a", "inequalities-graphical-y-x-a", "inequalities-regions"],
  // Proportion and ratio problems
  "y10-u7-l1": ["ratio-given-two-ratios"],
  "y10-u7-l2": ["ratio-problem-solving", "ratio-equations-ratios", "ratio-expressing-as-1-n"],
  "y10-u7-l3": ["proportion-direct"],
  "y10-u7-l4": ["proportion-inverse"],
  "y10-u7-l5": ["proportion-graphs"],
  "y10-u7-l6": ["proportion-direct", "proportion-inverse"],
  // Congruence and similarity
  "y10-u8-l1": ["congruent-triangles"],
  "y10-u8-l2": ["similar-shapes-definition", "similar-shapes-finding-sides"],
  "y10-u8-l3": ["similar-shapes-finding-sides", "similar-shapes-further"],
  "y10-u8-l4": ["similar-shapes-area", "similar-shapes-volume"],
  // Further trigonometry
  "y10-u9-l1": ["trigonometry-missing-sides", "trigonometry-missing-angles"],
  "y10-u9-l2": ["trigonometry-exact-values", "trigonometry-sine-graph", "trigonometry-cosine-graph", "trigonometry-tangent-graph"],
  "y10-u9-l3": ["trigonometry-sine-rule-sides", "trigonometry-sine-rule-angles", "trigonometry-sine-rule-ambiguous-case"],
  "y10-u9-l4": ["trigonometry-cosine-rule-sides", "trigonometry-cosine-rule-angles"],
  "y10-u9-l5": ["trigonometry-area-of-a-triangle"],
  "y10-u9-l6": ["pythagoras-3d", "trigonometry-3d"],
  // Circles, surface area and volume
  "y10-u10-l1": ["circles-arc-length", "area-sector", "circles-segment-area"],
  "y10-u10-l2": ["volume-prism", "volume-cylinder", "volume-l-shape-prism"],
  "y10-u10-l3": ["surface-area-other-prisms", "surface-area-cylinders", "surface-area-l-shape-prism"],
  "y10-u10-l4": ["volume-cone", "volume-sphere", "surface-area-cone", "surface-area-sphere"],
  "y10-u10-l5": ["volume-pyramid", "volume-frustum", "surface-area-frustum"],
  // Cumulative frequency, box plots and histograms
  "y10-u11-l1": ["graphs-cumulative-frequency-draw", "graphs-cumulative-frequency-reading"],
  "y10-u11-l2": ["averages-quartiles", "graphs-cumulative-frequency-reading"],
  "y10-u11-l3": ["graphs-box-plots-draw-and-interpret"],
  "y10-u11-l4": ["graphs-box-plots-compare", "averages-distributions"],
  "y10-u11-l5": ["graphs-histograms-draw", "graphs-histograms-interpret", "graphs-histograms-harder"],
  // Probability at GCSE
  "y10-u12-l1": ["probability-tree-diagrams"],
  "y10-u12-l2": ["probability-conditional"],
  "y10-u12-l3": ["set-notation", "venn-diagrams"],
  "y10-u12-l4": ["probability-conditional"],

  /* ------------------------------- YEAR 11 ------------------------------ */
  // Vectors
  "y11-u1-l1": ["vectors-column"],
  "y11-u1-l2": ["vectors-column"],
  "y11-u1-l3": ["vectors"],
  "y11-u1-l4": ["vectors"],
  // Functions and graphs
  "y11-u2-l1": ["types-of-graph-cubics", "types-of-graph-reciprocal", "types-of-graph-mixture"],
  "y11-u2-l2": ["types-of-graph-exponential"],
  "y11-u2-l3": ["function-machines", "composite-functions"],
  "y11-u2-l4": ["composite-functions", "inverse-functions"],
  "y11-u2-l5": ["transformations-of-graphs", "transformations-of-trigonometric-graphs"],
  "y11-u2-l6": ["iteration", "change-of-sign", "equations-trial-and-improvement"],
  // Bounds and accuracy
  "y11-u3-l1": ["error-intervals"],
  "y11-u3-l2": ["limits-of-accuracy"],
  "y11-u3-l3": ["limits-of-accuracy-applying"],
  "y11-u3-l4": ["error-intervals"],
  // Rates of change and graphs
  "y11-u4-l1": ["graphs-distance-time-graphs", "speed-distance-and-time"],
  "y11-u4-l2": ["area-under-a-graph", "kinematics-formulae"],
  "y11-u4-l3": ["area-under-a-graph"],
  "y11-u4-l4": ["instantaneous-rate-of-change", "average-rate-of-change"],
  // Further algebra
  "y11-u5-l1": ["inequalities-quadratic", "forming-quadratic-inequalities"],
  "y11-u5-l2": ["algebra-equation-of-a-circle"],
  "y11-u5-l3": ["equation-of-a-tangent-to-a-circle"],
  "y11-u5-l4": ["equations-involving-fractions", "equations-fractional-advanced", "equations-cross-multiplication"],
  // Circle theorems
  "y11-u6-l1": ["circle-theorems-angle-at-the-centre"],
  "y11-u6-l2": ["circle-theorems-angles-in-the-same-segment", "circle-theorems-right-angle-in-a-semi-circle"],
  "y11-u6-l3": ["circle-theorems-cyclic-quadrilaterals"],
  "y11-u6-l4": ["circle-theorems-radius-and-tangent", "intersecting-chord-theorem", "intersecting-secant-theorem"],
  "y11-u6-l5": ["circle-theorems-alternate-segment-theorem"],
  "y11-u6-l6": ["circle-theorems-mixed"],
  // Transformations and enlargement
  "y11-u7-l1": ["enlargements-from-a-centre", "enlargements-finding-the-centre", "enlargements-describing"],
  "y11-u7-l2": ["enlargements-fractional-scale-factor"],
  "y11-u7-l3": ["enlargements-negative-scale-factor"],
  "y11-u7-l4": ["transformations-mixture", "invariant-points"],
  // Statistics and probability review
  "y11-u8-l1": ["graphs-misleading-graphs", "graphs-frequency-polygons-reading", "graphs-stem-and-leaf-draw"],
  "y11-u8-l2": ["graphs-misleading-graphs", "averages-combined-mean"],
  "y11-u8-l3": ["probability-tree-diagrams", "probability-conditional", "probability-or-rule"],
  "y11-u8-l4": ["sampling-stratified", "capture-recapture", "graphs-histograms-harder"],
  // Exam preparation
  "y11-u9-l1": ["equations-x-squared", "dimensional-analysis"],
  "y11-u9-l2": ["number-using-calculations", "decimals-multiplying", "decimals-division-by-decimals"],
  "y11-u9-l3": ["use-of-a-calculator", "number-rational-irrational"],
  "y11-u9-l4": ["ratio-problem-solving", "quadratics-forming-and-solving", "money-mixed", "money-bills", "money-wages", "money-tax"],
  "y11-u9-l5": ["fdp-mixture", "surface-area-mixture", "transformations-mixture"],
  "y11-u9-l6": ["circle-theorems-mixed", "types-of-graph-mixture", "similar-shapes-further"],
};

// Look up worksheets quickly by slug.
const BY_SLUG = Object.fromEntries(WORKSHEETS.map((w) => [w.slug, w]));

/** The worksheet entries for one lesson (unknown slugs are skipped). */
export function worksheetsForLesson(lessonId) {
  return (LESSON_WORKSHEETS[lessonId] ?? []).map((slug) => BY_SLUG[slug]).filter(Boolean);
}

/** Every worksheet for a list of lessons, without repeats, in lesson order. */
export function worksheetsForLessons(lessonIds) {
  const seen = new Set();
  const out = [];
  for (const id of lessonIds) {
    for (const w of worksheetsForLesson(id)) {
      if (!seen.has(w.slug)) {
        seen.add(w.slug);
        out.push(w);
      }
    }
  }
  return out;
}
