/* ==========================================================================
   Teaching content: Year 10, Units 1–4 (light format, see light.js)
   Number skills for GCSE · Percentages and financial maths ·
   Algebraic manipulation · Quadratic equations and graphs
   ========================================================================== */
import { L } from "./light.js";

export const Y10A_LESSONS = {
  /* ======================= Unit 1: Number skills for GCSE ======================= */
  "y10-u1-l1": L({
    intro: ["Fractions, decimals and percentages are three ways of writing the same value. GCSE questions expect you to switch between them quickly, often without a calculator."],
    obj: ["Convert between fractions, decimals and percentages", "Compare values written in different forms"],
    prior: ["Equivalent fractions", "Multiplying and dividing by 10 and 100"],
    vocab: [["Percentage", "A number of parts per hundred: 35% means 35/100."], ["Equivalent", "Equal in value, though written differently."]],
    teach: [
      ["Converting", ["Fraction → decimal: divide the top by the bottom. Decimal → percentage: multiply by 100. Percentage → fraction: write over 100 and simplify."], "3/8 = 3 ÷ 8 = 0.375 = 37.5%."],
      ["Comparing", ["To compare values in different forms, convert them all to the same form. Percentages are usually easiest."], "Is 2/5 bigger than 0.38? 2/5 = 40% and 0.38 = 38%, so yes."],
    ],
    ex: [
      ["Write 7/20 as a percentage.", ["Make the denominator 100: multiply top and bottom by 5.", "7/20 = 35/100"], "35%"],
      ["Which is larger: 5/8 or 0.6?", ["5/8 = 5 ÷ 8 = 0.625", "0.625 > 0.6"], "5/8"],
    ],
    mis: [
      ["Writing 0.6 as 6%.", "0.6 = 0.60 = 60 hundredths.", "Multiply by 100: 0.6 × 100 = 60%."],
      ["Comparing fractions by their denominators only.", "1/4 and 3/8 can't be compared just by looking at 4 and 8.", "Convert to decimals or a common denominator."],
    ],
    check: ["I can convert between all three forms", "I can order values written in different forms"],
  }),

  "y10-u1-l2": L({
    intro: ["Some fractions give decimals that stop (1/8 = 0.125). Others go on forever in a repeating pattern (1/3 = 0.333…). These are recurring decimals."],
    obj: ["Decide whether a fraction terminates or recurs", "Write a single recurring digit as a fraction"],
    prior: ["Prime factors", "Dividing to convert a fraction to a decimal"],
    vocab: [["Terminating decimal", "A decimal that ends, e.g. 0.375."], ["Recurring decimal", "A decimal with a pattern that repeats forever, e.g. 0.272727…"]],
    teach: [
      ["Will it terminate?", ["Write the fraction in its simplest form. If the denominator's only prime factors are 2 and 5, the decimal terminates. Any other prime factor means it recurs."], "7/40: 40 = 2 × 2 × 2 × 5, so it terminates (0.175). 5/12: 12 = 2 × 2 × 3, so it recurs."],
      ["One recurring digit", ["If one digit recurs straight after the point, the fraction is that digit over 9: 0.777… = 7/9."]],
    ],
    ex: [
      ["Does 3/14 terminate or recur?", ["14 = 2 × 7", "7 is not 2 or 5"], "It recurs"],
      ["Write 0.444… as a fraction.", ["Let x = 0.444…, so 10x = 4.444…", "10x − x = 4, so 9x = 4"], "4/9"],
    ],
    mis: [
      ["Checking the denominator before simplifying.", "3/6 = 1/2 terminates even though 6 contains a 3.", "Simplify first, then look at the prime factors."],
      ["Thinking 0.333… = 3/10.", "3/10 = 0.3 exactly; 0.333… never stops.", "One recurring digit goes over 9: 3/9 = 1/3."],
    ],
    check: ["I can tell if a fraction gives a terminating decimal", "I can convert a single recurring digit to a fraction"],
  }),

  "y10-u1-l3": L({
    intro: ["Every recurring decimal can be written as an exact fraction. The trick is to multiply by a power of 10 so that the recurring parts line up, then subtract."],
    obj: ["Convert recurring decimals to fractions using algebra"],
    prior: ["Recurring decimals (previous lesson)", "Simplifying fractions"],
    vocab: [["Dot notation", "Dots above digits show which digits recur, e.g. 0.1̇2̇ = 0.121212…"]],
    teach: [
      ["The method", ["Let x equal the decimal. Multiply by 10 if one digit recurs, 100 if two digits recur, and so on. Subtract to remove the recurring part, then solve."], "x = 0.363636…, 100x = 36.3636…, so 99x = 36 and x = 36/99 = 4/11."],
      ["When the recurring part starts later", ["For 0.4777…, find 100x and 10x so that both end in 777…; subtracting gives 90x."]],
    ],
    ex: [
      ["Write 0.151515… as a fraction.", ["100x = 15.1515…", "99x = 15", "x = 15/99"], "5/33"],
      ["Write 0.2333… as a fraction.", ["100x = 23.333… and 10x = 2.333…", "90x = 21", "x = 21/90"], "7/30"],
    ],
    mis: [
      ["Multiplying by 10 when two digits recur.", "The recurring parts won't line up, so they don't cancel.", "Multiply by 10ⁿ, where n is the number of recurring digits."],
      ["Forgetting to simplify.", "Exam answers must be in their simplest form.", "Divide top and bottom by their HCF."],
    ],
    check: ["I can convert decimals with one or two recurring digits", "I can convert decimals where only some digits recur"],
  }),

  "y10-u1-l4": L({
    intro: ["A surd is a root that can't be written exactly as a decimal, like √2. Leaving answers as surds keeps them exact, which Higher papers often ask for."],
    obj: ["Simplify surds by taking out square factors", "Add and subtract surds"],
    prior: ["Square numbers", "Factors"],
    vocab: [["Surd", "An irrational root, e.g. √3. (√9 = 3 is not a surd.)"], ["Simplest form", "a√b where b has no square factor other than 1."]],
    teach: [
      ["Simplifying", ["Use √(ab) = √a × √b. Split the number into the largest square factor times something else."], "√72 = √36 × √2 = 6√2."],
      ["Adding and subtracting", ["You can only add surds with the same number under the root, like collecting like terms. Simplify each surd first."], "√12 + √27 = 2√3 + 3√3 = 5√3."],
    ],
    ex: [
      ["Simplify √50.", ["50 = 25 × 2", "√50 = √25 × √2"], "5√2"],
      ["Simplify √18 + √8.", ["√18 = 3√2 and √8 = 2√2", "3√2 + 2√2"], "5√2"],
    ],
    mis: [
      ["Writing √a + √b = √(a + b).", "√9 + √16 = 3 + 4 = 7, but √25 = 5.", "Only add surds with the same root, after simplifying."],
      ["Using a square factor that isn't the largest.", "√72 = 2√18 isn't finished: 18 still contains 9.", "Look for the largest square factor."],
    ],
    check: ["I can simplify a surd", "I can add and subtract surds"],
  }),

  "y10-u1-l5": L({
    intro: ["Surds can be multiplied, divided and used in brackets just like algebra. Often the surds disappear and you're left with a whole number."],
    obj: ["Multiply surds", "Expand brackets containing surds"],
    prior: ["Simplifying surds", "Expanding double brackets"],
    vocab: [["√a × √a", "= a, e.g. √5 × √5 = 5."]],
    teach: [
      ["Multiplying", ["√a × √b = √(ab). Then simplify the result."], "√8 × √2 = √16 = 4."],
      ["Brackets", ["Expand as normal, remembering √a × √a = a. In (a + √b)(a − √b) the middle terms cancel, leaving a² − b."], "(3 + √2)(3 − √2) = 9 − 2 = 7."],
    ],
    ex: [
      ["Work out √3 × √12.", ["√3 × √12 = √36"], "6"],
      ["Expand (2 + √5)(1 + √5).", ["2 + 2√5 + √5 + 5"], "7 + 3√5"],
    ],
    mis: [
      ["Writing √5 × √5 = 25.", "Squaring √5 undoes the root.", "√5 × √5 = 5."],
      ["Forgetting the middle terms when expanding.", "Every term multiplies every term.", "Use a grid with four boxes."],
    ],
    check: ["I can multiply surds", "I can expand brackets with surds"],
  }),

  "y10-u1-l6": L({
    intro: ["Rationalising the denominator means rewriting a fraction so there's no surd on the bottom. It makes answers easier to compare and is a standard Higher skill."],
    obj: ["Rationalise denominators of the form √b and c√b"],
    prior: ["Multiplying surds", "Equivalent fractions"],
    vocab: [["Rationalise", "Remove the surd from the denominator."]],
    teach: [
      ["The method", ["Multiply the top and bottom by the surd on the bottom. This doesn't change the value, because you're multiplying by 1."], "6/√3 = 6√3/3 = 2√3."],
      ["With a number in front", ["For a/(c√b), multiply by √b: the denominator becomes c × b."], "10/(2√5) = 10√5/10 = √5."],
    ],
    ex: [
      ["Rationalise 8/√2.", ["8/√2 × √2/√2 = 8√2/2"], "4√2"],
      ["Rationalise 15/(3√5).", ["Multiply by √5/√5: 15√5/(3 × 5)", "15√5/15"], "√5"],
    ],
    mis: [
      ["Multiplying only the denominator by √b.", "That changes the value of the fraction.", "Multiply top AND bottom."],
      ["Writing c√b × √b = c√b².", "√b × √b = b.", "So c√b × √b = cb."],
    ],
    check: ["I can rationalise a/√b", "I can rationalise a/(c√b)"],
  }),

  "y10-u1-l7": L({
    intro: ["Powers can be fractions or negative numbers. A fractional power means a root; a negative power means “one over”. Together they let you evaluate things like 8^(−2/3)."],
    obj: ["Evaluate fractional indices", "Evaluate negative indices"],
    prior: ["Laws of indices", "Square and cube roots"],
    vocab: [["x^(1/n)", "The nth root of x."], ["x^(−n)", "1 ÷ xⁿ."]],
    teach: [
      ["Fractional indices", ["x^(1/2) = √x and x^(1/3) = ∛x. For x^(m/n), take the nth root first, then raise to the power m."], "27^(2/3) = (∛27)² = 3² = 9."],
      ["Negative indices", ["A negative power means the reciprocal: x^(−n) = 1/xⁿ."], "4^(−3/2) = 1/(√4)³ = 1/8."],
    ],
    ex: [
      ["Evaluate 125^(1/3).", ["∛125 = 5"], "5"],
      ["Evaluate 16^(−3/4).", ["⁴√16 = 2", "2³ = 8", "Negative power: 1/8"], "1/8"],
    ],
    mis: [
      ["Writing 25^(1/2) = 12.5.", "A power of ½ is a square root, not halving.", "25^(1/2) = √25 = 5."],
      ["Thinking 2^(−3) is negative.", "Negative powers give reciprocals, which are positive here.", "2^(−3) = 1/8."],
    ],
    check: ["I can evaluate x^(1/n) and x^(m/n)", "I can evaluate negative indices"],
  }),

  /* ======================= Unit 2: Percentages and financial maths ======================= */
  "y10-u2-l1": L({
    intro: ["A multiplier turns any percentage change into a single multiplication. It's the fastest, most reliable method on calculator papers."],
    obj: ["Find the multiplier for a percentage increase or decrease", "Use a multiplier to find a new amount"],
    prior: ["Converting percentages to decimals"],
    vocab: [["Multiplier", "The number you multiply by to apply a percentage change."]],
    teach: [
      ["Finding the multiplier", ["Start from 100%. Add the increase, or subtract the decrease, then divide by 100."], "Increase by 15%: 115% → 1.15. Decrease by 7%: 93% → 0.93."],
      ["Using it", ["New amount = original × multiplier. Round money to the nearest penny at the end."]],
    ],
    ex: [
      ["Increase £240 by 12%.", ["Multiplier = 1.12", "240 × 1.12 = 268.8"], "£268.80"],
      ["Decrease 85 kg by 4%.", ["Multiplier = 0.96", "85 × 0.96"], "81.6 kg"],
    ],
    mis: [
      ["Using 0.15 to increase by 15%.", "× 0.15 finds 15%, not the new total.", "Use 1.15."],
      ["Using 1.07 to decrease by 7%.", "A decrease needs a multiplier below 1.", "Use 0.93."],
    ],
    check: ["I can find multipliers", "I can use a multiplier to increase or decrease"],
  }),

  "y10-u2-l2": L({
    intro: ["When percentages are applied one after another, each change acts on the new amount, not the original. Multipliers make this simple."],
    obj: ["Apply successive percentage changes", "Find an overall percentage change"],
    prior: ["Percentage multipliers"],
    vocab: [["Successive changes", "Percentage changes applied one after another."]],
    teach: [
      ["Chaining multipliers", ["Multiply by each multiplier in turn. Up 10% then down 10% is × 1.1 × 0.9 = × 0.99: a 1% decrease overall, not zero."], "You can't add or subtract the percentages."],
    ],
    ex: [
      ["£500 rises by 20% then falls by 20%. Find the final value.", ["500 × 1.2 = 600", "600 × 0.8 = 480"], "£480"],
      ["Find the overall change for +25% then −10%.", ["1.25 × 0.9 = 1.125"], "A 12.5% increase"],
    ],
    mis: [
      ["Saying +20% then −20% leaves the value unchanged.", "The 20% decrease is of a larger amount.", "Multiply: 1.2 × 0.8 = 0.96."],
    ],
    check: ["I can apply two percentage changes", "I can find the overall percentage change"],
  }),

  "y10-u2-l3": L({
    intro: ["Banks pay interest on savings. Simple interest is the same every year; compound interest is added to the balance, so you earn interest on your interest."],
    obj: ["Calculate simple interest", "Calculate compound interest with a multiplier"],
    prior: ["Percentage multipliers", "Powers"],
    vocab: [["Principal", "The amount first invested."], ["Compound interest", "Interest added each year, then included when calculating the next year's interest."]],
    teach: [
      ["Simple interest", ["Interest each year = r% of the principal. Multiply by the number of years."], "£2,000 at 3% for 4 years: 60 × 4 = £240."],
      ["Compound interest", ["Value after n years = principal × (multiplier)ⁿ."], "£2,000 at 3% for 4 years: 2000 × 1.03⁴ = £2,251.02."],
    ],
    ex: [
      ["Simple interest on £800 at 2.5% for 3 years.", ["2.5% of 800 = 20", "20 × 3"], "£60"],
      ["£1,500 at 4% compound interest for 3 years.", ["1500 × 1.04³ = 1687.296"], "£1,687.30"],
    ],
    mis: [
      ["Using simple interest when it says compound.", "Compound interest grows faster.", "Use principal × multiplierⁿ."],
      ["Giving only the interest when asked for the total value.", "Read the question carefully.", "Value = principal + interest."],
    ],
    check: ["I can calculate simple interest", "I can calculate compound interest"],
  }),

  "y10-u2-l4": L({
    intro: ["Reverse percentage questions give you the amount AFTER a change and ask for the original. They're a common GCSE trap."],
    obj: ["Find an original amount after a percentage increase or decrease"],
    prior: ["Percentage multipliers"],
    vocab: [["Original amount", "The value before the change (100%)."]],
    teach: [
      ["Divide by the multiplier", ["The new amount = original × multiplier, so original = new amount ÷ multiplier."], "After a 20% rise, a price is £84. Original = 84 ÷ 1.2 = £70."],
    ],
    ex: [
      ["After a 15% discount a TV costs £340. Find the original price.", ["85% of the original is £340", "340 ÷ 0.85"], "£400"],
      ["A population grew by 8% to 5,400. Find the original population.", ["5400 ÷ 1.08"], "5,000"],
    ],
    mis: [
      ["Finding 20% of the new amount and taking it away.", "The 20% was of the original, not the new amount.", "Divide by the multiplier."],
    ],
    check: ["I can reverse a percentage increase", "I can reverse a percentage decrease"],
  }),

  "y10-u2-l5": L({
    intro: ["Growth and decay describe quantities that change by the same percentage repeatedly: populations, bacteria, the value of a car."],
    obj: ["Use multipliers for repeated growth and decay", "Find how many periods it takes to reach a value"],
    prior: ["Compound interest"],
    vocab: [["Depreciation", "A fall in value over time."], ["Exponential growth/decay", "Repeated multiplication by the same multiplier."]],
    teach: [
      ["The formula", ["Amount after n periods = starting amount × multiplierⁿ. Growth: multiplier > 1. Decay: multiplier < 1."], "A £20,000 car losing 15% a year: 20000 × 0.85ⁿ."],
      ["How long?", ["To find when a value passes a target, multiply repeatedly (or try values of n) until it does."]],
    ],
    ex: [
      ["A colony of 400 bacteria grows by 10% an hour. How many after 3 hours?", ["400 × 1.1³ = 532.4"], "532 bacteria"],
      ["£12,000 depreciates by 20% a year. After how many years is it worth less than £6,000?", ["12000 × 0.8 = 9600, × 0.8 = 7680, × 0.8 = 6144, × 0.8 = 4915.2"], "4 years"],
    ],
    mis: [
      ["Subtracting the same amount each year.", "The percentage is taken from the current value, which keeps changing.", "Multiply by the multiplier each year."],
    ],
    check: ["I can model growth and decay", "I can find how many years until a target"],
  }),

  /* ======================= Unit 3: Algebraic manipulation ======================= */
  "y10-u3-l1": L({
    intro: ["Expanding double brackets turns a product like (x + 3)(x − 5) into a quadratic expression. You'll use this in every quadratic topic."],
    obj: ["Expand and simplify two brackets, including with coefficients and negatives"],
    prior: ["Expanding single brackets", "Multiplying negative numbers"],
    vocab: [["Expand", "Multiply out the brackets."], ["Quadratic", "An expression whose highest power is x²."]],
    teach: [
      ["Every term by every term", ["Each term in the first bracket multiplies each term in the second: four products. A grid keeps track. Then collect like terms."], "(x + 3)(x − 5) = x² − 5x + 3x − 15 = x² − 2x − 15."],
    ],
    ex: [
      ["Expand (x − 4)(x − 6).", ["x² − 6x − 4x + 24"], "x² − 10x + 24"],
      ["Expand (2x + 1)(3x − 4).", ["6x² − 8x + 3x − 4"], "6x² − 5x − 4"],
    ],
    mis: [
      ["Writing (x + 3)² = x² + 9.", "The square means two brackets: there are middle terms.", "(x + 3)(x + 3) = x² + 6x + 9."],
      ["Sign errors: −4 × −6 = −24.", "Negative × negative is positive.", "−4 × −6 = +24."],
    ],
    check: ["I can expand (x + a)(x + b)", "I can expand brackets with coefficients"],
  }),

  "y10-u3-l2": L({
    intro: ["Three brackets multiply out to give a cubic. The method is just double brackets twice."],
    obj: ["Expand the product of three binomials"],
    prior: ["Expanding double brackets"],
    vocab: [["Cubic", "An expression whose highest power is x³."]],
    teach: [
      ["Two steps", ["Expand any two brackets first. Then multiply every term of that answer by each term of the third bracket, and collect like terms."], "(x + 1)(x + 2)(x + 3) = (x² + 3x + 2)(x + 3) = x³ + 6x² + 11x + 6."],
    ],
    ex: [
      ["Expand (x + 2)(x − 1)(x + 4).", ["(x + 2)(x − 1) = x² + x − 2", "(x² + x − 2)(x + 4) = x³ + 4x² + x² + 4x − 2x − 8"], "x³ + 5x² + 2x − 8"],
      ["Expand (x − 3)³.", ["(x − 3)² = x² − 6x + 9", "(x² − 6x + 9)(x − 3)"], "x³ − 9x² + 27x − 27"],
    ],
    mis: [
      ["Losing terms in the second step.", "A trinomial × binomial gives six terms.", "Write all six before collecting."],
    ],
    check: ["I can expand three brackets"],
  }),

  "y10-u3-l3": L({
    intro: ["Factorising reverses expanding. When the x² term has a coefficient, like 2x² + 7x + 3, you need a systematic method."],
    obj: ["Factorise quadratics of the form ax² + bx + c"],
    prior: ["Factorising x² + bx + c", "Expanding double brackets"],
    vocab: [["Factorise", "Write as a product of brackets."]],
    teach: [
      ["Splitting the middle term", ["Multiply a × c. Find two numbers that multiply to ac and add to b. Split bx using them, then factorise in pairs."], "2x² + 7x + 3: ac = 6, numbers 6 and 1. 2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)."],
      ["Check", ["Always expand your answer to check it."]],
    ],
    ex: [
      ["Factorise 3x² − 10x + 8.", ["ac = 24; −6 and −4", "3x² − 6x − 4x + 8 = 3x(x − 2) − 4(x − 2)"], "(3x − 4)(x − 2)"],
      ["Factorise 6x² + x − 2.", ["ac = −12; 4 and −3", "6x² + 4x − 3x − 2 = 2x(3x + 2) − 1(3x + 2)"], "(2x − 1)(3x + 2)"],
    ],
    mis: [
      ["Looking for numbers that multiply to c instead of ac.", "That only works when a = 1.", "Use a × c."],
    ],
    check: ["I can factorise ax² + bx + c when a is prime", "I can factorise when a is not prime"],
  }),

  "y10-u3-l4": L({
    intro: ["Algebraic fractions simplify just like number fractions: factorise top and bottom, then cancel common factors."],
    obj: ["Simplify algebraic fractions by factorising"],
    prior: ["Factorising quadratics", "Difference of two squares"],
    vocab: [["Cancel", "Divide top and bottom by the same factor."]],
    teach: [
      ["Factorise first", ["You can only cancel whole factors (brackets), never individual terms."], "(x² + 5x + 6)/(x + 2) = (x + 2)(x + 3)/(x + 2) = x + 3."],
      ["Difference of two squares", ["x² − a² = (x + a)(x − a). Look out for it on the top or bottom."]],
    ],
    ex: [
      ["Simplify (x² − 9)/(x² + x − 6).", ["(x + 3)(x − 3) / (x + 3)(x − 2)"], "(x − 3)/(x − 2)"],
      ["Simplify (2x + 6)/(x² + 3x).", ["2(x + 3) / x(x + 3)"], "2/x"],
    ],
    mis: [
      ["Cancelling the x² terms in (x² + 3)/(x² + 5).", "x² is a term, not a factor of the whole top.", "Only cancel complete brackets."],
    ],
    check: ["I can simplify by cancelling a common bracket"],
  }),

  "y10-u3-l5": L({
    intro: ["To add or subtract algebraic fractions, you need a common denominator, exactly as with numbers."],
    obj: ["Add and subtract algebraic fractions"],
    prior: ["Adding fractions", "Expanding brackets"],
    vocab: [["Common denominator", "A denominator that both fractions can be written over."]],
    teach: [
      ["Number denominators", ["x/3 + x/4: common denominator 12, so 4x/12 + 3x/12 = 7x/12."]],
      ["Algebraic denominators", ["For 2/(x + 1) + 3/(x − 2), the common denominator is (x + 1)(x − 2). Multiply each numerator by the other denominator."], "= [2(x − 2) + 3(x + 1)] / (x + 1)(x − 2) = (5x − 1)/((x + 1)(x − 2))."],
    ],
    ex: [
      ["Write x/2 − x/5 as a single fraction.", ["5x/10 − 2x/10"], "3x/10"],
      ["Write 1/x + 2/(x + 3) as a single fraction.", ["[(x + 3) + 2x] / x(x + 3)"], "(3x + 3)/(x(x + 3))"],
    ],
    mis: [
      ["Adding denominators: x/2 + x/3 = 2x/5.", "Denominators aren't added.", "Find a common denominator."],
      ["Sign errors when subtracting.", "The minus applies to the whole second numerator.", "Use brackets."],
    ],
    check: ["I can add fractions with number denominators", "I can add fractions with algebraic denominators"],
  }),

  "y10-u3-l6": L({
    intro: ["An algebraic proof shows something is true for EVERY number, not just the examples you try. You use letters to represent any number."],
    obj: ["Write expressions for even, odd and consecutive numbers", "Use algebra to prove a statement"],
    prior: ["Expanding and factorising"],
    vocab: [["Even number", "2n, for any whole number n."], ["Odd number", "2n + 1."], ["Consecutive", "One after another: n, n + 1, n + 2."]],
    teach: [
      ["Showing a multiple", ["To prove something is always a multiple of k, simplify it and factorise to show it equals k × (a whole number)."], "(n + 1)² − (n − 1)² = 4n, which is 4 × n, so always a multiple of 4."],
    ],
    ex: [
      ["Prove that the sum of three consecutive whole numbers is a multiple of 3.", ["n + (n + 1) + (n + 2) = 3n + 3", "= 3(n + 1)"], "3 × a whole number, so always a multiple of 3"],
      ["Prove that the sum of two odd numbers is even.", ["(2m + 1) + (2n + 1) = 2m + 2n + 2", "= 2(m + n + 1)"], "2 × a whole number, so even"],
    ],
    mis: [
      ["Proving with examples.", "Examples show it works sometimes, not always.", "Use algebra for any n."],
      ["Using 2n and 2n + 1 for two DIFFERENT odd numbers.", "2n + 1 and 2n + 1 would be the same number.", "Use different letters: 2m + 1 and 2n + 1."],
    ],
    check: ["I can write expressions for even, odd and consecutive numbers", "I can complete a simple algebraic proof"],
  }),

  /* ======================= Unit 4: Quadratic equations and graphs ======================= */
  "y10-u4-l1": L({
    intro: ["If two things multiply to make zero, one of them must be zero. That's why factorising solves quadratic equations."],
    obj: ["Solve quadratic equations by factorising"],
    prior: ["Factorising quadratics"],
    vocab: [["Root / solution", "A value of x that makes the equation true."]],
    teach: [
      ["The method", ["Rearrange to = 0, factorise, then set each bracket equal to zero."], "x² − x − 12 = 0 → (x − 4)(x + 3) = 0 → x = 4 or x = −3."],
    ],
    ex: [
      ["Solve x² + 7x + 10 = 0.", ["(x + 2)(x + 5) = 0"], "x = −2 or x = −5"],
      ["Solve 2x² − 5x − 3 = 0.", ["(2x + 1)(x − 3) = 0", "2x + 1 = 0 gives x = −½"], "x = −½ or x = 3"],
    ],
    mis: [
      ["(x − 4)(x + 3) = 0 gives x = −4 or 3.", "Set each bracket to zero and solve.", "x − 4 = 0 → x = 4."],
      ["Dividing both sides by x.", "This loses the solution x = 0.", "Factorise: x(x − 5) = 0."],
    ],
    check: ["I can solve x² + bx + c = 0", "I can solve ax² + bx + c = 0 by factorising"],
  }),

  "y10-u4-l2": L({
    intro: ["The graph of a quadratic is a smooth U-shape called a parabola (or an upside-down U if the x² term is negative)."],
    obj: ["Complete a table of values and plot a quadratic", "Recognise quadratic graphs"],
    prior: ["Substituting into expressions", "Plotting coordinates"],
    vocab: [["Parabola", "The U-shaped curve of a quadratic."], ["Line of symmetry", "The vertical line that splits the parabola into two mirror halves."]],
    teach: [
      ["Tables of values", ["Substitute each x-value. Use brackets for negatives: (−3)² = 9."], "y = x² − 2x at x = −3: 9 + 6 = 15."],
      ["The shape", ["y = (x − a)² + b has its lowest point at (a, b). Join plotted points with a smooth curve, not straight lines."]],
    ],
    ex: [
      ["Find y when x = −2 for y = x² + 3x − 1.", ["(−2)² + 3(−2) − 1 = 4 − 6 − 1"], "y = −3"],
      ["Where is the lowest point of y = (x + 1)² − 4?", ["(x + 1)² is smallest (0) when x = −1"], "(−1, −4)"],
    ],
    mis: [
      ["Writing (−3)² = −9.", "A negative times a negative is positive.", "(−3)² = 9."],
      ["Joining points with straight lines.", "The graph is a smooth curve.", "Draw a smooth U-shape."],
    ],
    check: ["I can complete a table of values", "I can identify a quadratic from its graph"],
  }),

  "y10-u4-l3": L({
    intro: ["Key features of a quadratic graph: where it crosses the x-axis (the roots) and its turning point."],
    obj: ["Read roots from a graph", "Find the turning point of a quadratic"],
    prior: ["Quadratic graphs"],
    vocab: [["Roots", "Where the graph crosses the x-axis (y = 0)."], ["Turning point", "The lowest (or highest) point."]],
    teach: [
      ["Roots", ["The solutions of x² + bx + c = 0 are the x-values where y = x² + bx + c crosses the x-axis."]],
      ["Turning point", ["It lies on the line of symmetry, halfway between the roots, at x = −b ÷ 2 (when a = 1). Substitute to find y."], "y = x² − 6x + 5: x = 3, y = 9 − 18 + 5 = −4. Turning point (3, −4)."],
    ],
    ex: [
      ["A quadratic crosses the x-axis at −1 and 5. What is the x-coordinate of its turning point?", ["Halfway: (−1 + 5) ÷ 2"], "x = 2"],
      ["Find the turning point of y = x² + 4x + 1.", ["x = −4 ÷ 2 = −2", "y = 4 − 8 + 1 = −3"], "(−2, −3)"],
    ],
    mis: [
      ["Giving the y-intercept as a root.", "The y-intercept is where x = 0.", "Roots are where y = 0."],
    ],
    check: ["I can read roots from a graph", "I can find a turning point"],
  }),

  "y10-u4-l4": L({
    intro: ["Not every quadratic factorises. The quadratic formula solves any quadratic equation."],
    obj: ["Use the quadratic formula", "Use the discriminant to count solutions"],
    prior: ["Substitution", "Square roots"],
    vocab: [["Quadratic formula", "x = (−b ± √(b² − 4ac)) ÷ 2a"], ["Discriminant", "b² − 4ac."]],
    teach: [
      ["Using the formula", ["Write the equation as ax² + bx + c = 0 and identify a, b and c, including their signs. Calculate b² − 4ac first."], "x² + 3x − 1 = 0: x = (−3 ± √13) ÷ 2, so x = 0.30 or x = −3.30."],
      ["The discriminant", ["b² − 4ac > 0: two solutions. = 0: one. < 0: no real solutions."]],
    ],
    ex: [
      ["Solve 2x² − 5x + 1 = 0 to 2 d.p.", ["b² − 4ac = 25 − 8 = 17", "x = (5 ± √17) ÷ 4"], "x = 2.28 or x = 0.22"],
      ["How many solutions does x² + 2x + 5 = 0 have?", ["b² − 4ac = 4 − 20 = −16"], "None"],
    ],
    mis: [
      ["Using −b = −(−5) = −5.", "If b = −5, then −b = 5.", "Substitute with brackets."],
      ["Dividing only the square root by 2a.", "The whole top is divided by 2a.", "(−b ± √…) ÷ 2a."],
    ],
    check: ["I can use the quadratic formula", "I can use the discriminant"],
  }),

  "y10-u4-l5": L({
    intro: ["Completing the square rewrites x² + bx + c as (x + p)² + q. It shows the turning point and leads to the quadratic formula."],
    obj: ["Write a quadratic in completed-square form"],
    prior: ["Expanding (x + a)²"],
    vocab: [["Completed square form", "(x + p)² + q."]],
    teach: [
      ["The method", ["Halve the coefficient of x to get p. (x + p)² gives an extra p², so subtract it: q = c − p²."], "x² + 6x + 2 = (x + 3)² − 9 + 2 = (x + 3)² − 7."],
      ["Turning point", ["(x + p)² + q has its turning point at (−p, q)."]],
    ],
    ex: [
      ["Write x² − 8x + 3 in the form (x + p)² + q.", ["p = −4", "q = 3 − 16"], "(x − 4)² − 13"],
      ["Write x² + 5x + 1 in completed-square form.", ["p = 2.5, p² = 6.25", "q = 1 − 6.25"], "(x + 2.5)² − 5.25"],
    ],
    mis: [
      ["Adding p² instead of subtracting it.", "Expanding (x + p)² gives p² extra.", "q = c − p²."],
    ],
    check: ["I can complete the square when b is even", "I can complete the square when b is odd"],
  }),

  "y10-u4-l6": L({
    intro: ["Once a quadratic is in completed-square form, you can solve it by rearranging and taking square roots. This gives exact answers in surd form."],
    obj: ["Solve quadratics by completing the square", "Give exact solutions in surd form"],
    prior: ["Completing the square", "Surds"],
    vocab: [["Exact answer", "An answer left in surd form, e.g. 3 ± √5, rather than rounded."]],
    teach: [
      ["The method", ["Complete the square, move the constant to the other side, square root both sides (remember ±), then rearrange."], "x² + 4x − 1 = 0 → (x + 2)² = 5 → x = −2 ± √5."],
    ],
    ex: [
      ["Solve x² − 6x + 4 = 0, leaving surds.", ["(x − 3)² − 5 = 0", "x − 3 = ±√5"], "x = 3 ± √5"],
      ["Solve x² + 2x − 7 = 0 to 2 d.p.", ["(x + 1)² = 8", "x = −1 ± √8"], "x = 1.83 or x = −3.83"],
    ],
    mis: [
      ["Forgetting ±.", "Both (+√5)² and (−√5)² equal 5.", "Write ± when square rooting."],
      ["Getting the sign of the number wrong: (x − 3)² = 5 → x = −3 ± √5.", "Add 3 to both sides.", "x = 3 ± √5."],
    ],
    check: ["I can solve by completing the square", "I can give exact answers in surd form"],
  }),
};
