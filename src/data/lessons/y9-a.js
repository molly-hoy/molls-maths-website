/* ==========================================================================
   Teaching content: Year 9, Units 1–7 (light format, see light.js)
   ========================================================================== */
import { L } from "./light.js";

export const Y9A_LESSONS = {
  /* ======================= Unit 1: Rounding, estimation and accuracy ======================= */
  "y9-u1-l1": L({
    intro: ["Significant figures describe how accurate a number is, whatever its size. They are used in science, engineering and every GCSE paper."],
    obj: ["Round any number to a given number of significant figures"],
    prior: ["Rounding to decimal places", "Place value"],
    vocab: [["Significant figure (s.f.)", "Each digit from the first non-zero digit onwards."]],
    teach: [
      ["Counting significant figures", ["Start counting at the first non-zero digit. Zeros before it don't count; zeros after it do."], "0.04703 has 4 s.f.: 4, 7, 0, 3."],
      ["Rounding", ["Count the significant figures you need, look at the next digit, and round. Keep the number the same size: fill with zeros if needed."], "48,615 to 2 s.f. = 49,000. 0.004753 to 2 s.f. = 0.0048."],
    ],
    ex: [
      ["Round 7,382 to 1 s.f.", ["The first s.f. is 7 (thousands); the next digit is 3"], "7,000"],
      ["Round 0.06049 to 3 s.f.", ["6, 0, 4 are the first three s.f.; the next digit is 9"], "0.0605"],
    ],
    mis: [
      ["Counting the zeros in 0.006 as significant.", "Leading zeros only show place value.", "Start at the first non-zero digit."],
      ["Writing 48,615 to 2 s.f. as 49.", "Rounding mustn't change the size of the number.", "Fill the remaining places with zeros: 49,000."],
    ],
    check: ["I can round to significant figures", "I keep the number the right size"],
  }),
  "y9-u1-l2": L({
    intro: ["Estimating by rounding to 1 significant figure lets you check calculator answers and solve problems quickly without one."],
    obj: ["Estimate calculations by rounding to 1 significant figure"],
    prior: ["Significant figures", "Multiplying and dividing by multiples of 10"],
    vocab: [["Estimate", "An approximate answer using rounded values."], ["≈", "“Is approximately equal to”."]],
    teach: [
      ["The method", ["Round every number to 1 s.f., then calculate. Show the rounded numbers in your working: that's where the marks are."], "(48.7 × 6.1) ÷ 9.8 ≈ (50 × 6) ÷ 10 = 30."],
      ["Dividing by a decimal", ["Dividing by a number less than 1 makes the answer bigger: ÷ 0.5 is the same as × 2."]],
    ],
    ex: [
      ["Estimate 312 × 0.49.", ["300 × 0.5"], "≈ 150"],
      ["Estimate 61.8 ÷ 0.19.", ["60 ÷ 0.2 = 600 ÷ 2"], "≈ 300"],
    ],
    mis: [
      ["Calculating exactly and then rounding.", "An estimate must be worked out from rounded numbers.", "Round first, then calculate."],
    ],
    check: ["I can estimate calculations", "I can divide by small decimals"],
  }),
  "y9-u1-l3": L({
    intro: ["If a number has been rounded, its true value lies within a range called its error interval."],
    obj: ["Write error intervals for rounded values"],
    prior: ["Rounding", "Inequality symbols"],
    vocab: [["Error interval", "The range of possible true values, written lower ≤ x < upper."], ["Bounds", "The smallest and largest possible values."]],
    teach: [
      ["The method", ["Halve the unit you rounded to. Subtract it for the lower bound and add it for the upper bound. The lower bound is included (≤), the upper isn't (<)."], "x = 40 to the nearest 10: 35 ≤ x < 45."],
    ],
    ex: [
      ["y = 6.3 to 1 d.p. Write the error interval.", ["Half of 0.1 is 0.05"], "6.25 ≤ y < 6.35"],
      ["A mass is 800 g to the nearest 100 g. Write the error interval.", ["Half of 100 is 50"], "750 ≤ m < 850"],
    ],
    mis: [
      ["Writing ≤ for the upper bound.", "45 would round up to 50.", "Use < for the upper bound."],
    ],
    check: ["I can write error intervals"],
  }),
  "y9-u1-l4": L({
    intro: ["When rounded values are used in a calculation, the answer has bounds too. Using the right combination of bounds gives the largest or smallest result."],
    obj: ["Find upper and lower bounds of simple calculations"],
    prior: ["Error intervals", "Perimeter and area"],
    vocab: [["Upper bound", "The largest value it could be."], ["Lower bound", "The smallest value it could be."]],
    teach: [
      ["Adding and multiplying", ["For the largest total or product, use the upper bounds. For the smallest, use the lower bounds."], "A 6 cm by 4 cm rectangle (nearest cm): upper bound of area = 6.5 × 4.5 = 29.25 cm²."],
    ],
    ex: [
      ["A square has side 9 cm to the nearest cm. Find the upper bound of its perimeter.", ["4 × 9.5"], "38 cm"],
      ["A rectangle is 10 m by 3 m (nearest m). Find the lower bound of its area.", ["9.5 × 2.5"], "23.75 m²"],
    ],
    mis: [
      ["Adding 0.5 to the final answer only.", "Each measurement has its own bounds.", "Find each bound first, then calculate."],
    ],
    check: ["I can find the bounds of a perimeter", "I can find the bounds of an area"],
  }),

  /* ======================= Unit 2: Indices and standard form ======================= */
  "y9-u2-l1": L({
    intro: ["Index laws are shortcuts for multiplying and dividing powers of the same number."],
    obj: ["Multiply and divide powers of the same base"],
    prior: ["Powers and index notation"],
    vocab: [["Base", "The number being multiplied, e.g. 5 in 5³."], ["Index (power)", "How many times the base is multiplied by itself."]],
    teach: [
      ["The laws", ["aᵐ × aⁿ = aᵐ⁺ⁿ (add the powers). aᵐ ÷ aⁿ = aᵐ⁻ⁿ (subtract the powers). The base must be the same."], "3⁴ × 3² = 3⁶. 7⁸ ÷ 7³ = 7⁵."],
    ],
    ex: [
      ["Simplify x⁵ × x³.", ["Add the powers"], "x⁸"],
      ["Simplify (y⁷ × y²) ÷ y⁴.", ["y⁹ ÷ y⁴"], "y⁵"],
    ],
    mis: [
      ["Multiplying the powers: 2³ × 2⁴ = 2¹².", "2³ × 2⁴ is 2 × 2 × 2 × 2 × 2 × 2 × 2: seven 2s.", "Add the powers when multiplying."],
    ],
    check: ["I can multiply powers", "I can divide powers"],
  }),
  "y9-u2-l2": L({
    intro: ["When a power is raised to another power, the indices multiply."],
    obj: ["Simplify powers of powers, including terms with coefficients"],
    prior: ["Multiplying powers"],
    vocab: [["Coefficient", "The number in front of a letter, e.g. 3 in 3x²."]],
    teach: [
      ["The law", ["(aᵐ)ⁿ = aᵐⁿ. Every part inside the bracket is raised to the power, including the number."], "(2x³)⁴ = 2⁴ × x¹² = 16x¹²."],
    ],
    ex: [
      ["Simplify (5²)³.", ["2 × 3"], "5⁶"],
      ["Simplify (3y⁴)².", ["3² = 9, (y⁴)² = y⁸"], "9y⁸"],
    ],
    mis: [
      ["(3y⁴)² = 3y⁸.", "The 3 is inside the bracket too.", "Square the 3 as well: 9y⁸."],
    ],
    check: ["I can simplify a power of a power", "I can include the coefficient"],
  }),
  "y9-u2-l3": L({
    intro: ["The index laws give meaning to a power of zero and to negative powers."],
    obj: ["Evaluate zero and negative indices"],
    prior: ["Dividing powers"],
    vocab: [["Reciprocal", "1 divided by a number: the reciprocal of 4 is ¼."]],
    teach: [
      ["Zero index", ["a⁰ = 1, because a³ ÷ a³ = a⁰ and anything divided by itself is 1."]],
      ["Negative indices", ["a⁻ⁿ = 1/aⁿ. For a fraction, a negative power flips it."], "2⁻³ = 1/8. (2/3)⁻¹ = 3/2."],
    ],
    ex: [
      ["Evaluate 9⁰.", ["Any non-zero number to the power 0"], "1"],
      ["Evaluate 5⁻².", ["1/5²"], "1/25"],
    ],
    mis: [
      ["Thinking 4⁻¹ = −4.", "Negative powers give reciprocals.", "4⁻¹ = ¼."],
    ],
    check: ["I know a⁰ = 1", "I can evaluate negative powers"],
  }),
  "y9-u2-l4": L({
    intro: ["Standard form writes very large numbers compactly, such as the distance to the Sun: 1.5 × 10⁸ km."],
    obj: ["Write large numbers in standard form and back again"],
    prior: ["Multiplying by powers of 10"],
    vocab: [["Standard form", "A × 10ⁿ, where 1 ≤ A < 10 and n is an integer."]],
    teach: [
      ["Writing it", ["Put the decimal point after the first non-zero digit to make A. Count how many places it moved: that's n."], "45,000 = 4.5 × 10⁴."],
    ],
    ex: [
      ["Write 360,000,000 in standard form.", ["A = 3.6, the point moves 8 places"], "3.6 × 10⁸"],
      ["Write 7.02 × 10⁵ as an ordinary number.", ["Move the digits 5 places"], "702,000"],
    ],
    mis: [
      ["Writing 45 × 10³.", "A must be less than 10.", "4.5 × 10⁴."],
    ],
    check: ["I can convert to standard form", "I can convert back"],
  }),
  "y9-u2-l5": L({
    intro: ["Very small numbers, such as the size of a cell, use negative powers of 10 in standard form."],
    obj: ["Write small numbers in standard form and back again"],
    prior: ["Standard form for large numbers", "Negative indices"],
    vocab: [["10⁻ⁿ", "Dividing by 10 n times."]],
    teach: [
      ["Writing it", ["Move the point right until the number is between 1 and 10. The number of places is the (negative) power."], "0.00052 = 5.2 × 10⁻⁴."],
    ],
    ex: [
      ["Write 0.0071 in standard form.", ["Move 3 places to get 7.1"], "7.1 × 10⁻³"],
      ["Write 4 × 10⁻⁵ as an ordinary number.", ["Move the digits 5 places right"], "0.00004"],
    ],
    mis: [
      ["Using a positive power for a small number.", "10³ makes numbers bigger.", "Numbers less than 1 have negative powers."],
    ],
    check: ["I can write small numbers in standard form", "I can convert back"],
  }),
  "y9-u2-l6": L({
    intro: ["Calculations in standard form use the index laws: deal with the numbers and the powers of 10 separately."],
    obj: ["Multiply and divide numbers in standard form"],
    prior: ["Index laws", "Standard form"],
    vocab: [["Adjust", "Rewrite so that A is between 1 and 10."]],
    teach: [
      ["The method", ["Multiply (or divide) the A parts. Add (or subtract) the powers. If A is now 10 or more (or below 1), adjust."], "(3 × 10⁴) × (5 × 10³) = 15 × 10⁷ = 1.5 × 10⁸."],
    ],
    ex: [
      ["(2 × 10⁵) × (4 × 10²)", ["8 × 10⁷"], "8 × 10⁷"],
      ["(9 × 10⁸) ÷ (3 × 10⁻²)", ["3 × 10¹⁰"], "3 × 10¹⁰"],
    ],
    mis: [
      ["Leaving 15 × 10⁷.", "That isn't standard form.", "15 = 1.5 × 10, so add 1 to the power."],
    ],
    check: ["I can multiply in standard form", "I can divide in standard form"],
  }),

  /* ======================= Unit 3: Prime factorisation ======================= */
  "y9-u3-l1": L({
    intro: ["Every whole number greater than 1 is either prime or can be written as a product of primes in exactly one way."],
    obj: ["Write a number as a product of prime factors using a factor tree"],
    prior: ["Factors", "Prime numbers"],
    vocab: [["Prime", "A number with exactly two factors: 1 and itself."], ["Product", "The result of multiplying."]],
    teach: [
      ["Factor trees", ["Split the number into any two factors. Keep splitting until every branch ends in a prime. Then multiply the primes together to check."], "60 = 2 × 2 × 3 × 5."],
    ],
    ex: [
      ["Write 84 as a product of primes.", ["84 = 4 × 21 = 2 × 2 × 3 × 7"], "2 × 2 × 3 × 7"],
      ["Which number is 2 × 3 × 3 × 5?", ["2 × 9 × 5"], "90"],
    ],
    mis: [
      ["Stopping at a non-prime, e.g. 4.", "4 = 2 × 2 is not prime.", "Keep splitting until every factor is prime."],
    ],
    check: ["I can draw a factor tree", "I can check by multiplying"],
  }),
  "y9-u3-l2": L({
    intro: ["Index form makes a product of primes shorter and easier to compare."],
    obj: ["Write a product of primes in index form"],
    prior: ["Factor trees", "Powers"],
    vocab: [["Index form", "Using powers for repeated factors, e.g. 2³ × 3²."]],
    teach: [
      ["Writing it", ["Group repeated primes and write them as powers, in order of size."], "72 = 2 × 2 × 2 × 3 × 3 = 2³ × 3²."],
    ],
    ex: [
      ["Write 200 in index form.", ["200 = 2 × 2 × 2 × 5 × 5"], "2³ × 5²"],
      ["Write 252 in index form.", ["252 = 2 × 2 × 3 × 3 × 7"], "2² × 3² × 7"],
    ],
    mis: [
      ["Writing 2³ as 2 × 3.", "2³ = 2 × 2 × 2 = 8.", "The power counts how many times the prime appears."],
    ],
    check: ["I can write numbers in index form"],
  }),
  "y9-u3-l3": L({
    intro: ["Prime factors make finding the highest common factor (HCF) of big numbers quick and reliable."],
    obj: ["Find the HCF using prime factors or a Venn diagram"],
    prior: ["Prime factorisation"],
    vocab: [["HCF", "The largest number that divides into all the given numbers."]],
    teach: [
      ["Shared factors", ["Write both numbers as products of primes. Multiply the primes they share (the overlap of a Venn diagram). In index form, take each prime to its LOWER power."], "60 = 2² × 3 × 5, 84 = 2² × 3 × 7: HCF = 2² × 3 = 12."],
    ],
    ex: [
      ["Find the HCF of 36 and 90.", ["36 = 2² × 3², 90 = 2 × 3² × 5", "Shared: 2 × 3²"], "18"],
      ["Find the HCF of 2³ × 5 and 2 × 5² × 7.", ["Lower powers: 2 × 5"], "10"],
    ],
    mis: [
      ["Multiplying all the primes.", "That gives a multiple, not a factor.", "Only multiply the shared primes."],
    ],
    check: ["I can find the HCF using prime factors"],
  }),
  "y9-u3-l4": L({
    intro: ["The lowest common multiple (LCM) is the smallest number that is in both times tables."],
    obj: ["Find the LCM using prime factors or a Venn diagram"],
    prior: ["Prime factorisation", "Multiples"],
    vocab: [["LCM", "The smallest number that is a multiple of all the given numbers."]],
    teach: [
      ["All the factors", ["Multiply every prime in the Venn diagram. In index form, take each prime to its HIGHER power."], "12 = 2² × 3, 18 = 2 × 3²: LCM = 2² × 3² = 36."],
    ],
    ex: [
      ["Find the LCM of 8 and 20.", ["8 = 2³, 20 = 2² × 5", "2³ × 5"], "40"],
      ["Find the LCM of 2² × 3 and 2 × 3² × 5.", ["Higher powers: 2² × 3² × 5"], "180"],
    ],
    mis: [
      ["Just multiplying the two numbers.", "That's a common multiple, but often not the lowest.", "Use prime factors."],
    ],
    check: ["I can find the LCM using prime factors"],
  }),
  "y9-u3-l5": L({
    intro: ["HCF and LCM solve real problems. The trick is deciding which one the question needs."],
    obj: ["Choose and use HCF or LCM to solve problems"],
    prior: ["HCF and LCM"],
    vocab: [["“Next time together”", "Usually an LCM question."], ["“Greatest number of equal groups”", "Usually an HCF question."]],
    teach: [
      ["Which one?", ["Things that repeat and meet again (buses, lights, alarms): LCM. Splitting things into the biggest equal groups with nothing left over: HCF."]],
    ],
    ex: [
      ["Lights flash every 6 s and 8 s. When do they next flash together?", ["LCM of 6 and 8"], "After 24 seconds"],
      ["24 apples and 36 pears go into identical bags. What is the greatest number of bags?", ["HCF of 24 and 36"], "12 bags"],
    ],
    mis: [
      ["Using the HCF for a “next time together” problem.", "The answer must be a multiple of both times.", "Use the LCM."],
    ],
    check: ["I can decide between HCF and LCM", "I can solve the problem in context"],
  }),

  /* ======================= Unit 4: Brackets and factorising ======================= */
  "y9-u4-l1": L({
    intro: ["Expanding double brackets means multiplying every term in one bracket by every term in the other."],
    obj: ["Expand and simplify (x + a)(x + b)"],
    prior: ["Expanding single brackets", "Collecting like terms"],
    vocab: [["Expand", "Multiply out the brackets."]],
    teach: [
      ["Four products", ["Use a grid or FOIL (First, Outer, Inner, Last), then collect the like terms."], "(x + 2)(x + 5) = x² + 5x + 2x + 10 = x² + 7x + 10."],
    ],
    ex: [
      ["Expand (x + 3)(x − 4).", ["x² − 4x + 3x − 12"], "x² − x − 12"],
      ["Expand (2x + 1)(x + 3).", ["2x² + 6x + x + 3"], "2x² + 7x + 3"],
    ],
    mis: [
      ["Only multiplying the first terms and the last terms.", "There are four products.", "Use a grid with four boxes."],
    ],
    check: ["I can expand double brackets"],
  }),
  "y9-u4-l2": L({
    intro: ["Squaring a bracket is a special case of double brackets, and a very common mistake on exam papers."],
    obj: ["Expand (x + a)² correctly"],
    prior: ["Expanding double brackets"],
    vocab: [["Perfect square", "An expression like x² + 6x + 9 = (x + 3)²."]],
    teach: [
      ["Write it twice", ["(x + a)² = (x + a)(x + a) = x² + 2ax + a²."], "(x − 5)² = x² − 10x + 25."],
    ],
    ex: [
      ["Expand (x + 4)².", ["x² + 4x + 4x + 16"], "x² + 8x + 16"],
      ["Expand (3x − 1)².", ["9x² − 3x − 3x + 1"], "9x² − 6x + 1"],
    ],
    mis: [
      ["(x + 4)² = x² + 16.", "This misses the middle terms.", "Write the bracket out twice."],
    ],
    check: ["I can square a bracket"],
  }),
  "y9-u4-l3": L({
    intro: ["A quadratic expression has x² as its highest power. You'll substitute into them and simplify them."],
    obj: ["Substitute into and simplify quadratic expressions"],
    prior: ["Substitution", "Expanding single brackets"],
    vocab: [["Quadratic expression", "An expression like ax² + bx + c."]],
    teach: [
      ["Substituting", ["Put negative numbers in brackets: (−3)² = 9."], "x² − 2x + 1 at x = −3: 9 + 6 + 1 = 16."],
      ["Simplifying", ["Expand any brackets, then collect like terms: x² terms, x terms and numbers."]],
    ],
    ex: [
      ["Find x² + 4x − 2 when x = −1.", ["1 − 4 − 2"], "−5"],
      ["Simplify x(x + 3) + 2(x − 1).", ["x² + 3x + 2x − 2"], "x² + 5x − 2"],
    ],
    mis: [
      ["−3² on a calculator gives −9.", "The calculator squares 3 first.", "Use brackets: (−3)²."],
    ],
    check: ["I can substitute into a quadratic", "I can simplify quadratic expressions"],
  }),
  "y9-u4-l4": L({
    intro: ["Factorising a quadratic reverses expanding: x² + 7x + 12 becomes (x + 3)(x + 4)."],
    obj: ["Factorise x² + bx + c", "Factorise fully when there is a common factor"],
    prior: ["Expanding double brackets", "Factor pairs"],
    vocab: [["Factorise fully", "Take out every common factor."]],
    teach: [
      ["Find the pair", ["Find two numbers that multiply to c and add to b."], "x² + x − 12: 4 × −3 = −12 and 4 + (−3) = 1, so (x + 4)(x − 3)."],
      ["Common factor first", ["If every term shares a factor, take it out first: 2x² + 10x + 12 = 2(x² + 5x + 6) = 2(x + 2)(x + 3)."]],
    ],
    ex: [
      ["Factorise x² − 8x + 15.", ["−3 × −5 = 15, −3 + −5 = −8"], "(x − 3)(x − 5)"],
      ["Factorise 3x² + 3x − 18.", ["3(x² + x − 6)"], "3(x + 3)(x − 2)"],
    ],
    mis: [
      ["Getting the signs wrong.", "The numbers must ADD to b as well as multiply to c.", "Expand to check."],
    ],
    check: ["I can factorise x² + bx + c", "I can factorise fully"],
  }),
  "y9-u4-l5": L({
    intro: ["x² − a² is called the difference of two squares, and it always factorises to (x + a)(x − a)."],
    obj: ["Factorise the difference of two squares"],
    prior: ["Square numbers", "Factorising quadratics"],
    vocab: [["Difference of two squares", "One square minus another, e.g. x² − 49."]],
    teach: [
      ["The pattern", ["A² − B² = (A + B)(A − B). There's no x term because the middle terms cancel."], "x² − 49 = (x + 7)(x − 7). 9x² − 4 = (3x + 2)(3x − 2)."],
    ],
    ex: [
      ["Factorise x² − 64.", ["64 = 8²"], "(x + 8)(x − 8)"],
      ["Factorise 25x² − 1.", ["(5x)² − 1²"], "(5x + 1)(5x − 1)"],
    ],
    mis: [
      ["Trying to factorise x² + 9 the same way.", "x² + 9 is a SUM of squares: it doesn't factorise.", "Only a difference (minus) factorises like this."],
    ],
    check: ["I can spot and factorise a difference of two squares"],
  }),
  "y9-u4-l6": L({
    intro: ["Many problems about shapes and angles can be solved by forming an equation, then solving it."],
    obj: ["Form and solve equations from shapes and angles"],
    prior: ["Solving linear equations", "Angle facts and perimeter"],
    vocab: [["Form an equation", "Write the information as an equation using a letter for the unknown."]],
    teach: [
      ["Find the fact", ["Find the fact that links the expressions: angles in a triangle add to 180°, perimeter is the total of the sides, and so on. Set the total equal to the fact, then solve."], "x + 2x + 30 = 180 gives x = 50."],
    ],
    ex: [
      ["A rectangle has sides x and x + 4, and perimeter 28. Find x.", ["4x + 8 = 28"], "x = 5"],
      ["Angles on a straight line are 3x and x + 20. Find x.", ["4x + 20 = 180"], "x = 40"],
    ],
    mis: [
      ["Forgetting a rectangle has four sides.", "Perimeter adds all four.", "2 × length + 2 × width."],
    ],
    check: ["I can form an equation", "I can solve it and answer in context"],
  }),

  /* ======================= Unit 5: Inequalities and formulae ======================= */
  "y9-u5-l1": L({
    intro: ["An inequality describes a range of values. Integer questions ask which whole numbers are in that range."],
    obj: ["Understand inequality symbols", "List integers that satisfy an inequality"],
    prior: ["Negative numbers"],
    vocab: [["<", "less than"], ["≤", "less than or equal to"], ["Integer", "A whole number, which can be negative."]],
    teach: [
      ["Reading inequalities", ["−2 < x ≤ 3 means x is greater than −2 and less than or equal to 3. The integers are −1, 0, 1, 2, 3."]],
    ],
    ex: [
      ["List the integers with −3 ≤ n < 2.", ["−3 included, 2 not"], "−3, −2, −1, 0, 1"],
      ["What is the largest integer with 4x < 18?", ["x < 4.5"], "4"],
    ],
    mis: [
      ["Including the endpoint for <.", "< means strictly less than.", "Only ≤ and ≥ include the endpoint."],
    ],
    check: ["I can read inequalities", "I can list integer solutions"],
  }),
  "y9-u5-l2": L({
    intro: ["Number lines show inequalities as pictures, using circles and lines."],
    obj: ["Show and read inequalities on a number line"],
    prior: ["Inequality symbols"],
    vocab: [["Open circle", "The value is not included (< or >)."], ["Filled circle", "The value is included (≤ or ≥)."]],
    teach: [
      ["Drawing", ["Put a circle at each boundary, open or filled, and draw a line over the values that work. Use an arrow if it goes on forever."], "x ≥ 2: filled circle at 2, arrow to the right."],
    ],
    ex: [
      ["Describe: open circle at −1, line to the left.", ["Not included, smaller values"], "x < −1"],
      ["Describe: filled circle at 0, open circle at 4, joined.", ["0 included, 4 not"], "0 ≤ x < 4"],
    ],
    mis: [
      ["Mixing up open and filled circles.", "Open = not included.", "Think: filled means ‘equal to’ is allowed."],
    ],
    check: ["I can draw inequalities", "I can read them from a number line"],
  }),
  "y9-u5-l3": L({
    intro: ["Solve inequalities like equations, with one important difference."],
    obj: ["Solve linear inequalities, including with negative coefficients"],
    prior: ["Solving equations"],
    vocab: [["Reverse the sign", "Change < to > (and ≤ to ≥)."]],
    teach: [
      ["The rule", ["Do the same to both sides. If you multiply or divide by a negative number, reverse the inequality sign."], "10 − 3x > 4 → −3x > −6 → x < 2."],
    ],
    ex: [
      ["Solve 4x + 3 ≤ 23.", ["4x ≤ 20"], "x ≤ 5"],
      ["Solve 5 − 2x < 11.", ["−2x < 6", "Divide by −2, reverse"], "x > −3"],
    ],
    mis: [
      ["Not reversing when dividing by a negative.", "Check with a number: x = 0 should fit 5 − 2x < 11.", "Reverse the sign."],
    ],
    check: ["I can solve inequalities", "I reverse the sign when needed"],
  }),
  "y9-u5-l4": L({
    intro: ["Formulae link quantities in science, finance and geometry. Substituting means replacing letters with numbers."],
    obj: ["Substitute positive and negative values into formulae"],
    prior: ["Order of operations"],
    vocab: [["Formula", "A rule linking quantities, e.g. v = u + at."], ["Substitute", "Replace a letter with a value."]],
    teach: [
      ["Careful substitution", ["Write the formula, replace each letter (using brackets for negatives), then follow BIDMAS."], "v = u + at with u = 5, a = −2, t = 3: v = 5 + (−2)(3) = −1."],
    ],
    ex: [
      ["E = ½mv². Find E when m = 4, v = 3.", ["0.5 × 4 × 9"], "18"],
      ["P = 2(l + w). Find P when l = 7.5, w = 4.", ["2 × 11.5"], "23"],
    ],
    mis: [
      ["Squaring mv instead of v.", "Only v is squared.", "Indices before multiplication."],
    ],
    check: ["I can substitute into formulae"],
  }),
  "y9-u5-l5": L({
    intro: ["Changing the subject rearranges a formula so a different letter is on its own."],
    obj: ["Rearrange formulae to change the subject"],
    prior: ["Solving equations"],
    vocab: [["Subject", "The letter on its own, e.g. v in v = u + at."]],
    teach: [
      ["Undo in reverse", ["Use inverse operations, in reverse order, doing the same to both sides."], "y = 3x + 2 → y − 2 = 3x → x = (y − 2)/3."],
    ],
    ex: [
      ["Make t the subject of v = u + at.", ["v − u = at"], "t = (v − u)/a"],
      ["Make w the subject of P = 2(l + w).", ["P/2 = l + w"], "w = P/2 − l"],
    ],
    mis: [
      ["Dividing only one term by 3.", "(y − 2)/3, not y − 2/3.", "Use brackets."],
    ],
    check: ["I can change the subject of a formula"],
  }),

  /* ======================= Unit 6: Linear graphs ======================= */
  "y9-u6-l1": L({
    intro: ["The gradient measures how steep a line is: how far it goes up for each step across."],
    obj: ["Find the gradient of a line from a graph or two points"],
    prior: ["Coordinates"],
    vocab: [["Gradient", "Change in y ÷ change in x."]],
    teach: [
      ["Reading it", ["Pick two points exactly on grid crossings. Count up (or down) and across. Up is positive, down is negative."], "Up 6 for 3 across: gradient 2."],
    ],
    ex: [
      ["A line goes down 4 for every 2 across. Gradient?", ["−4 ÷ 2"], "−2"],
      ["Find the gradient through (1, 2) and (5, 4).", ["2 ÷ 4"], "½"],
    ],
    mis: [
      ["Doing across ÷ up.", "Gradient is up ÷ across.", "y-change on top."],
    ],
    check: ["I can find a gradient from a graph", "I can find a gradient from two points"],
  }),
  "y9-u6-l2": L({
    intro: ["The y-intercept is where a line crosses the y-axis. In y = mx + c, it's c."],
    obj: ["Find the y-intercept, including from a rearranged equation"],
    prior: ["Gradient", "Rearranging"],
    vocab: [["y-intercept", "The y-value where x = 0."]],
    teach: [
      ["Rearrange first", ["Make y the subject, then read off c."], "2y − 6x = 8 → y = 3x + 4: intercept 4."],
    ],
    ex: [
      ["Find the y-intercept of y + 2x = 5.", ["y = −2x + 5"], "5"],
      ["Find the y-intercept of 3y = 6x − 12.", ["y = 2x − 4"], "−4"],
    ],
    mis: [
      ["Reading the number before rearranging.", "y must be on its own first.", "Divide every term by y's coefficient."],
    ],
    check: ["I can find the y-intercept"],
  }),
  "y9-u6-l3": L({
    intro: ["Every straight line has an equation y = mx + c, where m is the gradient and c is the y-intercept."],
    obj: ["Find the equation of a line from its graph or two points"],
    prior: ["Gradient", "y-intercept"],
    vocab: [["y = mx + c", "The general equation of a straight line."]],
    teach: [
      ["From a graph", ["Read c where the line crosses the y-axis. Work out m from the slope. Write y = mx + c."], "Crosses at 1, goes up 3 for each 1 across: y = 3x + 1."],
    ],
    ex: [
      ["A line crosses the y-axis at −2 and has gradient 4. Equation?", ["m = 4, c = −2"], "y = 4x − 2"],
      ["A line passes through (0, 5) and (2, 1). Equation?", ["m = −4 ÷ 2 = −2, c = 5"], "y = −2x + 5"],
    ],
    mis: [
      ["Swapping m and c.", "m multiplies x; c is on its own.", "y = (gradient)x + (intercept)."],
    ],
    check: ["I can find an equation from a graph", "I can find it from two points"],
  }),
  "y9-u6-l4": L({
    intro: ["Parallel lines never meet because they have exactly the same gradient."],
    obj: ["Identify parallel lines", "Find the equation of a parallel line through a point"],
    prior: ["y = mx + c"],
    vocab: [["Parallel", "Same direction, never meeting: equal gradients."]],
    teach: [
      ["Same m", ["Lines are parallel if their m values are equal. To find a parallel line through a point, keep m and substitute the point to find c."], "Parallel to y = 2x + 3 through (1, 7): 7 = 2 + c, so y = 2x + 5."],
    ],
    ex: [
      ["Is y = 4x − 1 parallel to y = 4x + 6?", ["Both have gradient 4"], "Yes"],
      ["Find the line parallel to y = −x + 2 through (3, 1).", ["1 = −3 + c"], "y = −x + 4"],
    ],
    mis: [
      ["Thinking y = 3x + 1 and y = −3x + 1 are parallel.", "The signs of the gradients differ.", "m must be exactly equal."],
    ],
    check: ["I can spot parallel lines", "I can find a parallel line through a point"],
  }),
  "y9-u6-l5": L({
    intro: ["Real-life graphs show how one quantity depends on another: currency conversions, phone bills, taxi fares."],
    obj: ["Read and interpret real-life graphs"],
    prior: ["Reading scales", "Gradient and intercept"],
    vocab: [["Conversion graph", "A straight line that converts between two units."]],
    teach: [
      ["Meaning", ["The y-intercept is the starting value (e.g. a fixed charge). The gradient is the rate (e.g. cost per mile)."], "Taxi: £3 fixed charge plus £2 per mile."],
    ],
    ex: [
      ["£100 = €120 on a conversion graph. How many euros is £50?", ["Half of €120"], "€60"],
      ["A phone plan's graph starts at £10 and rises £5 per GB. Cost for 3 GB?", ["10 + 3 × 5"], "£25"],
    ],
    mis: [
      ["Misreading the scale.", "Squares don't always represent 1.", "Check what each square is worth."],
    ],
    check: ["I can read values from real-life graphs", "I can explain the intercept and gradient"],
  }),
  "y9-u6-l6": L({
    intro: ["Distance-time graphs show journeys. The steeper the line, the faster the movement."],
    obj: ["Interpret distance-time graphs and find speeds"],
    prior: ["Gradient", "Speed = distance ÷ time"],
    vocab: [["Horizontal section", "Stationary: the distance isn't changing."]],
    teach: [
      ["Reading", ["Gradient = speed. Flat sections are stops. A line going back down means returning towards the start."], "40 km in 2 hours: 20 km/h."],
    ],
    ex: [
      ["A section rises 30 km in 30 minutes. Speed?", ["30 km in 0.5 h"], "60 km/h"],
      ["The graph is flat from 1:00 pm to 1:45 pm. What happened?", ["No distance covered"], "A 45-minute stop"],
    ],
    mis: [
      ["Reading minutes as hours.", "30 minutes = 0.5 hours.", "Convert before dividing."],
    ],
    check: ["I can find speed from a graph", "I can describe a journey"],
  }),

  /* ======================= Unit 7: Sequences and the nth term ======================= */
  "y9-u7-l1": L({
    intro: ["The nth term is a formula that gives any term of a sequence directly from its position."],
    obj: ["Find the nth term of an arithmetic sequence"],
    prior: ["Term-to-term rules", "Times tables"],
    vocab: [["Arithmetic sequence", "Goes up or down by the same amount each time."], ["Common difference", "The amount it changes each time."]],
    teach: [
      ["Two steps", ["The common difference d gives dn. Compare dn with the sequence to find the number to add or subtract."], "5, 8, 11, 14: d = 3. 3n gives 3, 6, 9, so add 2: nth term 3n + 2."],
    ],
    ex: [
      ["Find the nth term of 7, 11, 15, 19.", ["4n gives 4, 8, 12; add 3"], "4n + 3"],
      ["Find the nth term of 20, 17, 14, 11.", ["−3n gives −3, −6, −9; add 23"], "23 − 3n"],
    ],
    mis: [
      ["Writing n + 4 for a sequence going up in 4s.", "n + 4 goes up in 1s.", "The difference goes in front of n: 4n."],
    ],
    check: ["I can find the nth term", "I can do it for decreasing sequences"],
  }),
  "y9-u7-l2": L({
    intro: ["Once you have the nth term, you can find any term, or check whether a number is in the sequence."],
    obj: ["Use the nth term to find terms and positions"],
    prior: ["nth term", "Solving equations"],
    vocab: [["Position", "The term number, n."]],
    teach: [
      ["Finding a term", ["Substitute the position for n."], "3n + 2: the 50th term is 152."],
      ["Is it in the sequence?", ["Set the nth term equal to the number and solve. If n is a positive whole number, it's in the sequence."], "3n + 2 = 100 → n = 32.67: not in the sequence."],
    ],
    ex: [
      ["Find the 30th term of 5n − 4.", ["5 × 30 − 4"], "146"],
      ["Which term of 4n + 1 is 89?", ["4n = 88"], "The 22nd"],
    ],
    mis: [
      ["Giving the value when asked for the position.", "Position is n.", "Solve for n."],
    ],
    check: ["I can find any term", "I can find the position of a term"],
  }),
  "y9-u7-l3": L({
    intro: ["In a geometric sequence, you multiply by the same number each time, so terms grow (or shrink) very quickly."],
    obj: ["Recognise geometric sequences and find later terms"],
    prior: ["Multiplying and dividing", "Powers"],
    vocab: [["Common ratio", "The number each term is multiplied by."]],
    teach: [
      ["Finding the ratio", ["Divide any term by the one before it."], "3, 6, 12, 24: ratio 2. Next: 48."],
      ["Later terms", ["The nth term is first term × ratioⁿ⁻¹."], "5th term of 3, 6, 12…: 3 × 2⁴ = 48."],
    ],
    ex: [
      ["Find the next term of 2, 10, 50.", ["Ratio 5"], "250"],
      ["Find the next term of 64, 32, 16.", ["Ratio ½"], "8"],
    ],
    mis: [
      ["Adding the difference.", "Geometric sequences multiply.", "Check: is it the same amount added, or the same multiplier?"],
    ],
    check: ["I can find the common ratio", "I can find later terms"],
  }),
  "y9-u7-l4": L({
    intro: ["Some sequences are so important they have names: square, cube, triangular numbers and the Fibonacci sequence."],
    obj: ["Recognise special sequences", "Continue Fibonacci-type sequences"],
    prior: ["Squares and cubes"],
    vocab: [["Triangular numbers", "1, 3, 6, 10, 15: dots arranged in triangles."], ["Fibonacci sequence", "1, 1, 2, 3, 5, 8: each term is the sum of the previous two."]],
    teach: [
      ["The sequences", ["Square: 1, 4, 9, 16. Cube: 1, 8, 27, 64. Triangular: add 2, then 3, then 4… Fibonacci-type: add the previous two terms."]],
    ],
    ex: [
      ["Next triangular number after 21?", ["Differences 2, 3, 4, 5, 6, so add 7"], "28"],
      ["A Fibonacci-type sequence starts 2, 5. Find the 5th term.", ["2, 5, 7, 12, 19"], "19"],
    ],
    mis: [
      ["Confusing square and triangular numbers.", "Squares are n²; triangular are n(n + 1)/2.", "Check the differences."],
    ],
    check: ["I can name special sequences", "I can continue a Fibonacci-type sequence"],
  }),
};
