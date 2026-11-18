/* ==========================================================================
   THE CURRICULUM MAP: Years 7–11
   --------------------------------------------------------------------------
   This file is the single source of truth for the structure of the course:
   year groups → units → lessons. Every page (year overviews, the visual
   curriculum map, revision checklists, the dashboard) is generated from it,
   so adding a unit here adds it everywhere. No page needs rebuilding.

   KS3 (Years 7–9) follows the English National Curriculum programme of
   study. KS4 (Years 10–11) follows the DfE GCSE Mathematics subject content,
   which AQA, Pearson Edexcel and OCR all implement.

   Design principles used for the allocation:
     • foundations first: each unit lists its prerequisite units
     • topics spiral: they return in later years at greater depth
       (e.g. rounding in Y7 → significant figures in Y9 → bounds in Y11)
     • every year covers all six strands
     • GCSE lessons are tagged F (Foundation and Higher) or H (Higher only),
       with an indicative grade range

   A lesson's `status` is "full" once its teaching content exists in
   src/data/lessons/. All other lessons are planned (title, place in the
   sequence, prerequisites) and are clearly marked as such in the interface.
   ========================================================================== */
import { FULL_LESSON_IDS } from "./lessons/index.js";

// Helper: write units compactly. Lessons are given as titles, or as
// [title, tier, grades] for GCSE lessons.
function unit(id, year, strand, title, intro, objectives, prerequisites, lessons, extra = {}) {
  return {
    id,
    year,
    strand,
    title,
    intro,
    objectives,
    prerequisites,
    ...extra,
    lessons: lessons.map((l, i) => {
      const [lessonTitle, tier, grades] = Array.isArray(l) ? l : [l];
      const lessonId = `${id}-l${i + 1}`;
      return {
        id: lessonId,
        unitId: id,
        number: i + 1,
        title: lessonTitle,
        tier: tier ?? null,       // "F" = Foundation and Higher, "H" = Higher only, null = KS3
        grades: grades ?? null,   // indicative GCSE grades, e.g. "4–5"
        status: FULL_LESSON_IDS.includes(lessonId) ? "full" : "planned",
      };
    }),
  };
}

/* =============================== YEAR 7 =============================== */
const YEAR_7 = [
  unit("y7-u1", 7, "number", "Place value and number",
    "Every part of maths depends on understanding what digits are worth. This unit builds secure foundations: place value, ordering, rounding, estimating, negative numbers and the order of operations.",
    ["I can state the value of any digit in a whole number or decimal", "I can compare and order integers and decimals", "I can round to the nearest 10, 100 or 1,000 and to a given number of decimal places", "I can estimate answers by rounding", "I can order and calculate with negative numbers in context", "I can use BIDMAS to evaluate calculations correctly"],
    [],
    ["Understanding place value", "Comparing and ordering numbers", "Rounding to the nearest 10, 100 and 1,000", "Rounding to decimal places", "Estimation", "Negative numbers", "Ordering negative numbers", "Introduction to BIDMAS"]),

  unit("y7-u2", 7, "number", "The four operations",
    "Fluent, accurate calculation saves time in every topic. This unit develops written and mental methods for addition, subtraction, multiplication and division, and applies them to word problems.",
    ["I can add and subtract using column methods, including decimals", "I can multiply using short and long multiplication", "I can divide using short and long division", "I can choose an efficient mental method", "I can solve multi-step word problems"],
    ["y7-u1"],
    ["Addition", "Subtraction", "Multiplication", "Division", "Written methods", "Mental arithmetic", "Applying the four operations to word problems"]),

  unit("y7-u3", 7, "number", "Factors, multiples and primes",
    "The building blocks of whole numbers. Understanding factors and primes now makes fractions, algebra and GCSE number work much easier later.",
    ["I can find factors and multiples", "I can identify prime numbers up to 100", "I can recognise square and cube numbers", "I can find the HCF and LCM of two numbers by listing"],
    ["y7-u2"],
    ["Factors", "Multiples", "Prime numbers", "Square and cube numbers", "Highest common factor by listing", "Lowest common multiple by listing"]),

  unit("y7-u4", 7, "algebra", "Introduction to algebra",
    "Algebra uses letters to describe patterns and relationships. This unit introduces the notation and the rules for writing, simplifying and using expressions.",
    ["I can use algebraic notation correctly", "I can collect like terms", "I can substitute values into expressions", "I can form expressions from words", "I can expand a single bracket"],
    ["y7-u1"],
    ["What is algebra?", "Algebraic notation", "Collecting like terms", "Simplifying expressions", "Substitution", "Forming expressions", "Expanding single brackets"]),

  unit("y7-u5", 7, "number", "Fractions",
    "Fractions appear in ratio, probability, algebra and measurement. This unit makes equivalent fractions, simplifying and adding fractions secure.",
    ["I can find equivalent fractions and simplify fractions", "I can compare and order fractions", "I can convert between mixed numbers and improper fractions", "I can add and subtract fractions", "I can find a fraction of an amount"],
    ["y7-u3"],
    ["Understanding fractions", "Equivalent fractions", "Simplifying fractions", "Comparing and ordering fractions", "Mixed numbers and improper fractions", "Adding and subtracting fractions", "Fractions of amounts"]),

  unit("y7-u6", 7, "number", "Decimals and percentages",
    "Decimals and percentages are everywhere in real life, from money to statistics. This unit connects them to fractions.",
    ["I can calculate with decimals", "I can convert between fractions, decimals and percentages", "I can find a percentage of an amount without a calculator"],
    ["y7-u1", "y7-u5"],
    ["Decimal place value", "Adding and subtracting decimals", "Multiplying and dividing by 10, 100 and 1,000", "Introducing percentages", "Converting between fractions, decimals and percentages", "Percentage of an amount (non-calculator)"]),

  unit("y7-u7", 7, "algebra", "Sequences",
    "Spotting and describing patterns is at the heart of algebra. This unit moves from term-to-term rules to the idea of a position-to-term rule.",
    ["I can continue a sequence and describe the term-to-term rule", "I can generate a sequence from a rule", "I can recognise arithmetic sequences", "I can use a simple position-to-term rule"],
    ["y7-u4"],
    ["Introduction to sequences", "Term-to-term rules", "Generating sequences", "Arithmetic sequences", "Position-to-term rules", "Sequences in patterns and diagrams"]),

  unit("y7-u8", 7, "geometry", "Angles and lines",
    "Geometry starts with angles. This unit develops accurate measuring and the basic angle facts used throughout GCSE geometry.",
    ["I can name and estimate types of angle", "I can measure and draw angles with a protractor", "I can use angles on a straight line, around a point and vertically opposite", "I can use the angle sums of triangles and quadrilaterals"],
    [],
    ["Types of angles", "Measuring and drawing angles", "Angles on a straight line", "Angles around a point", "Vertically opposite angles", "Angles in triangles", "Angles in quadrilaterals"]),

  unit("y7-u9", 7, "geometry", "Perimeter and area",
    "Measuring the space around and inside shapes, using the correct units.",
    ["I can find the perimeter of 2D shapes", "I can find the area of rectangles, triangles and parallelograms", "I can find the area of compound shapes", "I can use and convert metric units of length and area"],
    ["y7-u2"],
    ["Perimeter", "Area of rectangles", "Area of triangles", "Area of parallelograms", "Compound shapes", "Units of length and area"]),

  unit("y7-u10", 7, "ratio", "Introduction to ratio",
    "Ratio compares quantities. It is used in recipes, maps, mixing and sharing, and it underpins proportion work at GCSE.",
    ["I can write and simplify ratios", "I can share an amount in a given ratio", "I can link ratios and fractions", "I can scale recipes"],
    ["y7-u3", "y7-u5"],
    ["Understanding ratio", "Simplifying ratios", "Sharing amounts in a ratio", "Ratio and fractions", "Recipes and scaling"]),

  unit("y7-u11", 7, "statistics", "Data and averages",
    "Collecting, organising and summarising data so that it tells a story.",
    ["I can classify types of data", "I can use tally charts and frequency tables", "I can draw and interpret bar charts", "I can find the mean, median, mode and range"],
    [],
    ["Types of data", "Collecting data", "Tally charts and frequency tables", "Bar charts", "Mode, median and range", "The mean"]),

  unit("y7-u12", 7, "probability", "Introduction to probability",
    "How likely is something to happen? This unit introduces the probability scale and calculating simple probabilities.",
    ["I can use the language of probability", "I can place events on a probability scale from 0 to 1", "I can calculate the probability of an event", "I can use the fact that probabilities sum to 1", "I can list outcomes systematically"],
    ["y7-u5"],
    ["The language of probability", "Probability scales", "Probability of an event", "Complementary events", "Listing outcomes"]),
];

/* =============================== YEAR 8 =============================== */
const YEAR_8 = [
  unit("y8-u1", 8, "number", "Negative numbers and powers",
    "Extending calculation to negative numbers, powers and roots.",
    ["I can add, subtract, multiply and divide negative numbers", "I can use powers, square roots and cube roots", "I can apply BIDMAS including powers"],
    ["y7-u1", "y7-u3"],
    ["Adding and subtracting negative numbers", "Multiplying and dividing negative numbers", "Squares, cubes and roots", "Powers and index notation", "BIDMAS with powers and roots"]),

  unit("y8-u2", 8, "number", "Calculating with fractions",
    "Completing the four operations with fractions, including mixed numbers.",
    ["I can multiply and divide fractions", "I can calculate with mixed numbers", "I can solve problems involving fractions"],
    ["y7-u5"],
    ["Multiplying fractions", "Dividing fractions", "Adding and subtracting mixed numbers", "Multiplying and dividing mixed numbers", "Fraction problem solving"]),

  unit("y8-u3", 8, "number", "Percentages",
    "Using percentages to describe change, with and without a calculator.",
    ["I can convert between fractions, decimals and percentages", "I can increase and decrease by a percentage", "I can use decimal multipliers", "I can calculate a percentage change"],
    ["y7-u6"],
    ["Fractions, decimals and percentages", "Percentage of an amount with a calculator", "Percentage increase and decrease", "Percentage multipliers", "Expressing one number as a percentage of another", "Percentage change"]),

  unit("y8-u4", 8, "algebra", "Expressions and equations",
    "Solving equations: finding the unknown value that makes a statement true.",
    ["I can expand and factorise single brackets", "I can form equations from a context", "I can solve one-step and two-step equations", "I can solve equations with brackets", "I can solve equations with unknowns on both sides"],
    ["y7-u4"],
    ["Expanding and factorising single brackets", "Forming equations", "Solving one-step equations", "Solving two-step equations", "Solving equations with brackets", "Solving equations with unknowns on both sides"]),

  unit("y8-u5", 8, "algebra", "Coordinates and straight-line graphs",
    "Connecting algebra to pictures: plotting points and drawing lines from their equations.",
    ["I can plot coordinates in all four quadrants", "I can recognise horizontal, vertical and diagonal lines", "I can complete a table of values and plot a straight line", "I can describe the gradient of a line"],
    ["y8-u1", "y7-u4"],
    ["Coordinates in four quadrants", "Horizontal and vertical lines", "Tables of values", "Plotting straight-line graphs", "Introducing gradient"]),

  unit("y8-u6", 8, "ratio", "Ratio and proportion",
    "Developing ratio into proportional reasoning and value-for-money comparisons.",
    ["I can divide into unequal parts using ratio", "I can solve ratio problems given one part", "I can use the unitary method for direct proportion", "I can compare best buys"],
    ["y7-u10"],
    ["Dividing into unequal parts", "Ratio problems given one part", "Direct proportion", "The unitary method", "Best buys and value for money"]),

  unit("y8-u7", 8, "geometry", "Circles and area",
    "Finding the area of more shapes, and introducing π for circles.",
    ["I can find the area of a trapezium", "I can name the parts of a circle", "I can calculate the circumference and area of a circle", "I can find the area of compound shapes involving circles"],
    ["y7-u9"],
    ["Area of trapezia", "Parts of a circle", "Circumference", "Area of circles", "Compound shapes with circles"]),

  unit("y8-u8", 8, "geometry", "Angles in parallel lines and polygons",
    "Using angle rules to find unknown angles and explain reasoning.",
    ["I can use corresponding, alternate and co-interior angles", "I can find interior and exterior angles of polygons", "I can use properties of triangles and quadrilaterals", "I can give reasons for angle facts"],
    ["y7-u8"],
    ["Corresponding angles", "Alternate angles", "Co-interior angles", "Properties of triangles", "Properties of quadrilaterals", "Interior angles of polygons", "Exterior angles of polygons"]),

  unit("y8-u9", 8, "geometry", "3D shapes",
    "Visualising and measuring solid shapes.",
    ["I can describe 3D shapes by faces, edges and vertices", "I can draw nets", "I can find the surface area and volume of cuboids", "I can draw plans and elevations"],
    ["y7-u9"],
    ["Properties of 3D shapes", "Nets", "Surface area of cuboids", "Volume of cuboids", "Plans and elevations"]),

  unit("y8-u10", 8, "geometry", "Transformations",
    "Moving and resizing shapes precisely, and describing those movements fully.",
    ["I can reflect a shape in a mirror line", "I can rotate a shape about a centre", "I can translate a shape using a column vector", "I can enlarge a shape by a positive scale factor", "I can recognise congruent shapes"],
    ["y8-u5"],
    ["Reflection", "Rotation", "Translation", "Enlargement", "Describing transformations", "Congruence"]),

  unit("y8-u11", 8, "statistics", "Charts and graphs",
    "Choosing and reading the right chart for the data.",
    ["I can draw and interpret pie charts", "I can draw dual and composite bar charts", "I can draw line graphs and time series", "I can use grouped frequency tables", "I can describe correlation on a scatter graph"],
    ["y7-u11"],
    ["Pie charts", "Dual bar charts", "Line graphs and time series", "Grouped frequency tables", "Scatter graphs", "Correlation"]),

  unit("y8-u12", 8, "probability", "Probability: outcomes and experiments",
    "Organising outcomes and comparing theory with experiment.",
    ["I can use sample space diagrams", "I can use two-way tables", "I can calculate relative frequency", "I can calculate expected frequency"],
    ["y7-u12"],
    ["Sample spaces", "Two-way tables", "Relative frequency", "Experimental probability", "Expected frequency"]),
];

/* =============================== YEAR 9 =============================== */
const YEAR_9 = [
  unit("y9-u1", 9, "number", "Rounding, estimation and accuracy",
    "Knowing how accurate an answer is, and how to sense-check it.",
    ["I can round to significant figures", "I can estimate calculations by rounding to 1 significant figure", "I can write error intervals for rounded values"],
    ["y7-u1"],
    ["Significant figures", "Estimating calculations", "Error intervals", "Introducing upper and lower bounds"]),

  unit("y9-u2", 9, "number", "Indices and standard form",
    "Working efficiently with very large and very small numbers.",
    ["I can use the laws of indices", "I can use zero and negative indices", "I can write numbers in standard form", "I can calculate with standard form"],
    ["y8-u1"],
    ["Index laws: multiplying and dividing", "Index laws: powers of powers", "Zero and negative indices", "Standard form: large numbers", "Standard form: small numbers", "Calculating with standard form"]),

  unit("y9-u3", 9, "number", "Prime factorisation",
    "Every whole number is built from primes. This unit uses that idea to find HCF and LCM efficiently.",
    ["I can write a number as a product of prime factors", "I can use index notation for prime factorisation", "I can find the HCF and LCM using prime factors and Venn diagrams"],
    ["y7-u3"],
    ["Prime factor trees", "Product of prime factors in index form", "HCF using prime factors", "LCM using prime factors", "HCF and LCM problems"]),

  unit("y9-u4", 9, "algebra", "Brackets and factorising",
    "Moving to two brackets and the first steps with quadratic expressions.",
    ["I can expand double brackets", "I can factorise quadratic expressions of the form x² + bx + c", "I can factorise the difference of two squares", "I can solve problems by forming and solving equations"],
    ["y8-u4"],
    ["Expanding double brackets", "Squaring brackets", "Quadratic expressions", "Factorising quadratics", "Difference of two squares", "Forming and solving equations in context"]),

  unit("y9-u5", 9, "algebra", "Inequalities and formulae",
    "Working with ranges of values and changing the subject of a formula.",
    ["I can show inequalities on a number line", "I can solve linear inequalities", "I can substitute into formulae", "I can rearrange formulae"],
    ["y8-u4"],
    ["Inequalities", "Representing inequalities on number lines", "Solving linear inequalities", "Substituting into formulae", "Rearranging formulae"]),

  unit("y9-u6", 9, "algebra", "Linear graphs",
    "Understanding the equation y = mx + c and using graphs to model real situations.",
    ["I can find the gradient of a line", "I can identify the y-intercept", "I can find the equation of a straight line", "I can recognise parallel lines", "I can interpret real-life graphs"],
    ["y8-u5"],
    ["Gradient", "Y-intercept", "Equation of a straight line", "Parallel lines", "Real-life graphs", "Distance-time graphs"]),

  unit("y9-u7", 9, "algebra", "Sequences and the nth term",
    "Describing any term of a sequence with a formula.",
    ["I can find the nth term of an arithmetic sequence", "I can use the nth term to test whether a number is in a sequence", "I can recognise geometric sequences", "I can recognise special sequences"],
    ["y7-u7"],
    ["Finding the nth term", "Using the nth term", "Geometric sequences", "Special sequences"]),

  unit("y9-u8", 9, "ratio", "Proportion and compound measures",
    "Rates that combine two measures, such as speed and density.",
    ["I can convert metric units", "I can use speed, distance and time", "I can use density, mass and volume", "I can recognise inverse proportion", "I can use scale drawings and maps"],
    ["y8-u6"],
    ["Converting units", "Speed, distance and time", "Density, mass and volume", "Compound measures", "Inverse proportion", "Scale drawings and maps"]),

  unit("y9-u9", 9, "geometry", "Pythagoras' theorem",
    "A 2,500-year-old rule connecting the sides of every right-angled triangle.",
    ["I can identify the hypotenuse", "I can find the length of the hypotenuse", "I can find the length of a shorter side", "I can apply Pythagoras' theorem in problems"],
    ["y8-u1", "y7-u9"],
    ["Introducing Pythagoras' theorem", "Finding the hypotenuse", "Finding a shorter side", "Pythagoras in problems", "Distance between two points"]),

  unit("y9-u10", 9, "geometry", "Introduction to trigonometry",
    "Using ratios of sides to find missing sides and angles in right-angled triangles.",
    ["I can label the opposite, adjacent and hypotenuse", "I can use sine, cosine and tangent to find a missing side", "I can find a missing angle using inverse trigonometric functions"],
    ["y9-u9", "y7-u10"],
    ["Labelling right-angled triangles", "The tangent ratio", "Sine and cosine ratios", "Finding missing sides", "Finding missing angles"]),

  unit("y9-u11", 9, "geometry", "Constructions, loci and bearings",
    "Accurate drawing with a ruler and compasses, and describing direction.",
    ["I can construct perpendicular and angle bisectors", "I can construct triangles accurately", "I can draw loci", "I can measure and use three-figure bearings"],
    ["y8-u8"],
    ["Constructing triangles", "Perpendicular bisectors", "Angle bisectors", "Loci", "Bearings", "Scale drawings with bearings"]),

  unit("y9-u12", 9, "statistics", "Analysing data",
    "Going beyond single averages to compare groups and judge data quality.",
    ["I can find averages from frequency tables", "I can estimate the mean from grouped data", "I can compare distributions using an average and the range", "I can describe sampling methods and bias"],
    ["y8-u11"],
    ["Averages from frequency tables", "Estimated mean from grouped data", "Comparing distributions", "Sampling and bias", "Time series"]),

  unit("y9-u13", 9, "probability", "Combined events",
    "Probability for two or more events happening together.",
    ["I can use Venn diagrams for probability", "I can draw and use tree diagrams", "I can identify independent events", "I can use the multiplication rule for independent events"],
    ["y8-u12", "y8-u2"],
    ["Combined events", "Venn diagrams", "Tree diagrams", "Independent events"]),
];

/* =============================== YEAR 10 (GCSE) =============================== */
const YEAR_10 = [
  unit("y10-u1", 10, "number", "Number skills for GCSE",
    "Consolidating number work and extending it to GCSE Higher content.",
    ["I can convert between fractions, decimals and percentages", "I can convert recurring decimals to fractions (H)", "I can simplify and calculate with surds (H)", "I can use fractional indices (H)"],
    ["y9-u2", "y9-u3"],
    [["Fractions, decimals and percentages review", "F", "2–4"], ["Recurring decimals", "F", "4–5"], ["Converting recurring decimals to fractions", "H", "6–7"], ["Simplifying surds", "H", "6–7"], ["Calculating with surds", "H", "7–8"], ["Rationalising the denominator", "H", "7–9"], ["Fractional indices", "H", "6–8"]]),

  unit("y10-u2", 10, "ratio", "Percentages and financial maths",
    "The percentage skills tested on every GCSE paper, including reverse percentages and compound interest.",
    ["I can use multipliers for percentage change", "I can find the original amount after a percentage change", "I can calculate simple and compound interest", "I can model growth and decay"],
    ["y8-u3"],
    [["Percentage multipliers", "F", "3–4"], ["Repeated percentage change", "F", "4–5"], ["Simple and compound interest", "F", "4–5"], ["Reverse percentages", "F", "5–6"], ["Growth and decay", "H", "5–7"]]),

  unit("y10-u3", 10, "algebra", "Algebraic manipulation",
    "Fluent algebra: the toolkit needed for all Higher topics.",
    ["I can expand double and triple brackets", "I can factorise quadratics including ax² + bx + c (H)", "I can simplify algebraic fractions (H)", "I can write algebraic proofs (H)"],
    ["y9-u4"],
    [["Expanding double brackets review", "F", "3–5"], ["Expanding triple brackets", "H", "6–7"], ["Factorising quadratics where a > 1", "H", "6–7"], ["Simplifying algebraic fractions", "H", "7–8"], ["Adding and subtracting algebraic fractions", "H", "7–9"], ["Algebraic proof", "H", "7–9"]]),

  unit("y10-u4", 10, "algebra", "Quadratic equations and graphs",
    "Solving quadratics in several ways, and understanding their graphs.",
    ["I can solve quadratics by factorising", "I can draw quadratic graphs and find roots and turning points", "I can use the quadratic formula (H)", "I can complete the square (H)"],
    ["y10-u3", "y9-u6"],
    [["Solving quadratics by factorising", "F", "4–6"], ["Quadratic graphs", "F", "4–5"], ["Roots and turning points", "F", "5–6"], ["The quadratic formula", "H", "6–7"], ["Completing the square", "H", "7–8"], ["Solving quadratics by completing the square", "H", "7–8"]]),

  unit("y10-u5", 10, "algebra", "Simultaneous equations",
    "Finding two unknowns from two equations, algebraically and graphically.",
    ["I can solve linear simultaneous equations by elimination and substitution", "I can solve simultaneous equations graphically", "I can solve linear and quadratic simultaneous equations (H)"],
    ["y8-u4", "y9-u6"],
    [["Simultaneous equations by elimination", "F", "5–6"], ["Simultaneous equations by substitution", "F", "5–6"], ["Solving simultaneous equations graphically", "F", "5–6"], ["Forming simultaneous equations", "F", "5–7"], ["Linear and quadratic simultaneous equations", "H", "7–9"]]),

  unit("y10-u6", 10, "algebra", "Straight lines and inequalities",
    "Equations of lines from different information, and inequalities in two variables.",
    ["I can find the equation of a line through two points", "I can find the equation of a perpendicular line (H)", "I can find a midpoint", "I can solve inequalities and show regions on graphs (H)"],
    ["y9-u6", "y9-u5"],
    [["Equation of a line through two points", "F", "5–6"], ["Midpoints and line segments", "F", "4–5"], ["Parallel and perpendicular lines", "H", "6–7"], ["Solving inequalities review", "F", "4–5"], ["Graphical inequalities", "H", "6–7"]]),

  unit("y10-u7", 10, "ratio", "Proportion and ratio problems",
    "Algebraic proportion and multi-step ratio problems.",
    ["I can combine ratios", "I can solve direct proportion problems", "I can write and use direct and inverse proportion equations (H)", "I can recognise proportion graphs"],
    ["y9-u8"],
    [["Combining ratios", "F", "5–6"], ["Ratio problem solving", "F", "4–6"], ["Direct proportion", "F", "4–5"], ["Inverse proportion", "F", "5–6"], ["Proportion graphs", "F", "5–6"], ["Proportion equations", "H", "6–8"]]),

  unit("y10-u8", 10, "geometry", "Congruence and similarity",
    "When are two shapes the same, or the same shape at different sizes?",
    ["I can prove triangles are congruent (SSS, SAS, ASA, RHS)", "I can find missing lengths in similar shapes", "I can use area and volume scale factors (H)"],
    ["y8-u10"],
    [["Congruent triangles", "F", "5–6"], ["Similar shapes", "F", "4–5"], ["Similar triangles", "F", "5–6"], ["Area and volume of similar shapes", "H", "7–8"]]),

  unit("y10-u9", 10, "geometry", "Further trigonometry",
    "Trigonometry for any triangle, exact values and 3D problems.",
    ["I can recall exact trigonometric values", "I can use the sine and cosine rules (H)", "I can use ½ab sin C for area (H)", "I can solve 3D Pythagoras and trigonometry problems (H)"],
    ["y9-u10"],
    [["Trigonometry review", "F", "4–6"], ["Exact trigonometric values", "F", "5–6"], ["The sine rule", "H", "6–7"], ["The cosine rule", "H", "6–7"], ["Area of a triangle using ½ab sin C", "H", "6–7"], ["3D Pythagoras and trigonometry", "H", "7–8"]]),

  unit("y10-u10", 10, "geometry", "Circles, surface area and volume",
    "Parts of circles and the measurement of curved solids.",
    ["I can find arc lengths and sector areas", "I can find the volume and surface area of prisms and cylinders", "I can find the volume and surface area of cones, spheres and pyramids"],
    ["y8-u7", "y8-u9"],
    [["Arcs and sectors", "F", "5–6"], ["Volume of prisms and cylinders", "F", "3–5"], ["Surface area of prisms and cylinders", "F", "4–5"], ["Cones and spheres", "F", "5–7"], ["Pyramids and frustums", "H", "7–8"]]),

  unit("y10-u11", 10, "statistics", "Cumulative frequency, box plots and histograms",
    "Representing and comparing distributions at GCSE level.",
    ["I can draw cumulative frequency graphs", "I can find the median and interquartile range", "I can draw and interpret box plots", "I can draw and interpret histograms with frequency density (H)"],
    ["y9-u12"],
    [["Cumulative frequency", "H", "5–6"], ["Median and interquartile range", "H", "5–6"], ["Box plots", "H", "5–6"], ["Comparing distributions", "F", "4–6"], ["Histograms and frequency density", "H", "6–8"]]),

  unit("y10-u12", 10, "probability", "Probability at GCSE",
    "Dependent events, set notation and conditional probability.",
    ["I can use tree diagrams for independent and dependent events", "I can use set notation with Venn diagrams (H)", "I can calculate conditional probability (H)"],
    ["y9-u13"],
    [["Tree diagrams review", "F", "4–5"], ["Dependent events", "F", "5–6"], ["Venn diagrams and set notation", "H", "5–7"], ["Conditional probability", "H", "7–8"]]),
];

/* =============================== YEAR 11 (GCSE) =============================== */
const YEAR_11 = [
  unit("y11-u1", 11, "geometry", "Vectors",
    "Describing movement and proving geometric facts with vectors.",
    ["I can add, subtract and multiply vectors", "I can represent vectors as column vectors and diagrams", "I can use vectors to prove geometric results (H)"],
    ["y8-u10"],
    [["Column vectors", "F", "4–5"], ["Adding and subtracting vectors", "F", "5–6"], ["Vector geometry", "H", "7–9"], ["Vector proof", "H", "8–9"]]),

  unit("y11-u2", 11, "algebra", "Functions and graphs",
    "Function notation and the shapes of important graphs.",
    ["I can recognise cubic, reciprocal and exponential graphs", "I can use function notation", "I can find composite and inverse functions (H)", "I can transform graphs (H)", "I can use iteration to find approximate solutions (H)"],
    ["y10-u4"],
    [["Cubic and reciprocal graphs", "F", "4–5"], ["Exponential graphs", "H", "6–7"], ["Function notation", "H", "6–7"], ["Composite and inverse functions", "H", "7–8"], ["Graph transformations", "H", "8–9"], ["Iteration", "H", "7–8"]]),

  unit("y11-u3", 11, "number", "Bounds and accuracy",
    "How rounding affects the results of calculations.",
    ["I can write error intervals", "I can find upper and lower bounds of calculations (H)", "I can decide an appropriate degree of accuracy (H)"],
    ["y9-u1"],
    [["Error intervals", "F", "4–5"], ["Upper and lower bounds", "H", "6–7"], ["Bounds in calculations", "H", "7–8"], ["Truncation", "F", "4–5"]]),

  unit("y11-u4", 11, "ratio", "Rates of change and graphs",
    "Gradients and areas under graphs, and what they mean in context.",
    ["I can interpret distance-time and velocity-time graphs", "I can find the area under a graph (H)", "I can estimate the gradient of a curve (H)", "I can interpret rates of change"],
    ["y9-u6", "y9-u8"],
    [["Distance-time graphs", "F", "3–5"], ["Velocity-time graphs", "H", "6–7"], ["Area under a graph", "H", "7–8"], ["Gradients of curves and rates of change", "H", "7–9"]]),

  unit("y11-u5", 11, "algebra", "Further algebra",
    "The final Higher algebra topics.",
    ["I can solve quadratic inequalities (H)", "I can find the equation of a circle and a tangent to it (H)", "I can solve harder equations involving algebraic fractions (H)"],
    ["y10-u4", "y10-u6"],
    [["Quadratic inequalities", "H", "7–8"], ["Equation of a circle", "H", "7–8"], ["Tangents to circles", "H", "8–9"], ["Equations with algebraic fractions", "H", "7–9"]]),

  unit("y11-u6", 11, "geometry", "Circle theorems",
    "The circle theorems, and how to prove and use them.",
    ["I can use the circle theorems with reasons", "I can prove circle theorems (H)"],
    ["y8-u8", "y10-u10"],
    [["Angles at the centre and circumference", "H", "6–7"], ["Angles in the same segment and semicircles", "H", "6–7"], ["Cyclic quadrilaterals", "H", "6–7"], ["Tangents and chords", "H", "7–8"], ["The alternate segment theorem", "H", "8–9"], ["Proving circle theorems", "H", "8–9"]]),

  unit("y11-u7", 11, "geometry", "Transformations and enlargement",
    "Completing transformations with negative and fractional scale factors.",
    ["I can enlarge by a fractional scale factor", "I can enlarge by a negative scale factor (H)", "I can describe combined transformations and invariant points (H)"],
    ["y8-u10"],
    [["Enlargement review", "F", "3–5"], ["Fractional scale factors", "F", "5–6"], ["Negative scale factors", "H", "7–8"], ["Combined transformations and invariant points", "H", "7–8"]]),

  unit("y11-u8", 11, "statistics", "Statistics and probability review",
    "Bringing the statistics and probability strands together for the exam.",
    ["I can choose and interpret appropriate statistical diagrams", "I can solve multi-step probability problems", "I can critique statistical claims"],
    ["y10-u11", "y10-u12"],
    [["Choosing the right diagram", "F", "3–5"], ["Interpreting statistics critically", "F", "4–6"], ["Mixed probability problems", "F", "4–7"], ["Higher statistics problems", "H", "6–9"]]),

  unit("y11-u9", 11, "number", "Exam preparation",
    "Exam technique and mixed-topic practice for Paper 1 (non-calculator), Paper 2 and Paper 3 (calculator).",
    ["I can interpret command words", "I can show working to earn method marks", "I can manage time in the exam", "I can solve mixed-topic and multi-step problems"],
    [],
    [["Command words and showing working", "F", "1–9"], ["Non-calculator strategies", "F", "1–9"], ["Calculator skills", "F", "1–9"], ["Multi-step problem solving", "F", "4–9"], ["Foundation mixed practice", "F", "1–5"], ["Higher mixed practice", "H", "4–9"]]),
];

export const YEARS = [
  { year: 7, keyStage: 3, title: "Year 7", tagline: "Building strong foundations", units: YEAR_7 },
  { year: 8, keyStage: 3, title: "Year 8", tagline: "Extending number and algebra", units: YEAR_8 },
  { year: 9, keyStage: 3, title: "Year 9", tagline: "Getting ready for GCSE", units: YEAR_9 },
  { year: 10, keyStage: 4, title: "Year 10", tagline: "GCSE: the core course", units: YEAR_10 },
  { year: 11, keyStage: 4, title: "Year 11", tagline: "GCSE: completing the course and exam preparation", units: YEAR_11 },
];

/* ----- Lookup helpers ----- */
export const ALL_UNITS = YEARS.flatMap((y) => y.units);
export const ALL_LESSONS = ALL_UNITS.flatMap((u) => u.lessons);

export const getYear = (year) => YEARS.find((y) => y.year === Number(year));
export const getUnit = (id) => ALL_UNITS.find((u) => u.id === id);
export const getLesson = (id) => ALL_LESSONS.find((l) => l.id === id);

// The previous and next lessons in the full course order.
export function neighbours(lessonId) {
  const i = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  return { previous: ALL_LESSONS[i - 1] ?? null, next: ALL_LESSONS[i + 1] ?? null };
}

export const COURSE_STATS = {
  units: ALL_UNITS.length,
  lessons: ALL_LESSONS.length,
  fullLessons: ALL_LESSONS.filter((l) => l.status === "full").length,
};
