/* ==========================================================================
   Teaching content: Year 7, Unit 1 (Place value and number)
   --------------------------------------------------------------------------
   Content is kept here, separate from the page that displays it, so a
   teacher could edit the maths without touching any interface code.

   Each lesson follows the platform's lesson structure:
     A introduction · B objectives · C prior knowledge · D vocabulary
     E teaching steps · F worked examples · G common mistakes
     H guided practice · I independent practice · J worked solutions
     K checklist · L quiz · M completion
   Sections H, I, J and L are produced by the question generators in
   engine/generators/y7u1.js, so students can always ask for new questions.

   Small "visuals" can be attached to teaching steps:
     { kind: "placevalue", number: "3,407.25" }  a place value table
     { kind: "numberline", min, max, ticks, points: [{ value, label }] }
   ========================================================================== */

export const Y7U1_LESSONS = {
  /* ------------------------------------------------------------------ */
  "y7-u1-l1": {
    introduction: [
      "Our number system uses just ten digits, 0 to 9, to write every number there is. The trick is that a digit's value depends on where it sits. The 4 in 40 is worth ten times the 4 in 4.",
      "This idea, place value, is behind almost everything else in maths: written calculations, decimals, rounding, standard form and algebra all rely on it.",
    ],
    objectives: [
      "State the value of any digit in a whole number or a decimal",
      "Use zero as a placeholder",
      "Partition numbers into thousands, hundreds, tens, ones, tenths and hundredths",
      "Multiply and divide by 10, 100 and 1,000",
    ],
    priorKnowledge: [
      "Reading and writing whole numbers up to 1,000,000 (KS2)",
      "Knowing your times tables up to 10 × 10",
    ],
    vocabulary: [
      { term: "Digit", definition: "One of the ten symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 used to write numbers." },
      { term: "Place value", definition: "The value a digit has because of its position (column) in a number." },
      { term: "Placeholder", definition: "A zero used to show that a column is empty, e.g. the 0 in 305 shows there are no tens." },
      { term: "Partition", definition: "To split a number into parts, e.g. 4,672 = 4,000 + 600 + 70 + 2." },
      { term: "Decimal point", definition: "The dot that separates the whole-number part from the parts smaller than one." },
      { term: "Tenth, hundredth, thousandth", definition: "The values of the first three columns after the decimal point: 1/10, 1/100 and 1/1,000." },
    ],
    teaching: [
      {
        heading: "Step 1: Columns grow ten times bigger to the left",
        paragraphs: [
          "Each column is worth ten times the column to its right. Starting from the ones column and moving left we have tens, hundreds, thousands, ten thousands and so on.",
          "To find the value of a digit, multiply the digit by the value of its column.",
        ],
        visual: { kind: "placevalue", number: "34,072" },
        keyPoint: "In 34,072 the 4 is in the thousands column, so its value is 4 × 1,000 = 4,000.",
      },
      {
        heading: "Step 2: Zero is a placeholder",
        paragraphs: [
          "In 34,072 there are no hundreds. We can't just leave a gap, because 3472 would mean something completely different. The 0 holds the hundreds place open.",
        ],
        keyPoint: "Every column must have a digit, even if that digit is 0.",
      },
      {
        heading: "Step 3: Columns after the decimal point",
        paragraphs: [
          "The pattern carries on to the right of the decimal point. Each column is worth one tenth of the column to its left: tenths, then hundredths, then thousandths.",
          "So in 5.836 the 8 is worth 8 tenths (0.8), the 3 is worth 3 hundredths (0.03) and the 6 is worth 6 thousandths (0.006).",
        ],
        visual: { kind: "placevalue", number: "5.836" },
      },
      {
        heading: "Step 4: Multiplying and dividing by 10, 100 and 1,000",
        paragraphs: [
          "Multiplying by 10 makes every digit worth ten times as much, so each digit moves one column to the LEFT. Multiplying by 100 moves digits two columns, and by 1,000 three columns.",
          "Dividing moves the digits to the RIGHT. The decimal point never moves: the digits move past it. Empty columns before the decimal point are filled with zeros.",
        ],
        keyPoint: "3.7 × 100 = 370 (digits move 2 places left). 45 ÷ 1,000 = 0.045 (digits move 3 places right).",
      },
    ],
    examples: [
      { question: "What is the value of the 6 in 268,415?", steps: ["Count the columns from the right: ones (5), tens (1), hundreds (4), thousands (8), ten thousands (6).", "The 6 is in the ten thousands column.", "Its value is 6 × 10,000 = 60,000."], answer: "60,000" },
      { question: "Write 50,000 + 300 + 8 as a single number.", steps: ["Put each part in a column: 5 ten thousands, 3 hundreds, 8 ones.", "The thousands and tens columns are empty, so they need zeros.", "5 | 0 | 3 | 0 | 8"], answer: "50,308" },
      { question: "Work out 0.62 × 100 and 7.4 ÷ 1,000.", steps: ["× 100: every digit moves 2 places left. 0.62 → 62.", "÷ 1,000: every digit moves 3 places right. 7.4 → 0.0074.", "Check: the first answer is bigger, the second is smaller, as expected."], answer: "62 and 0.0074" },
    ],
    mistakes: [
      { mistake: "Saying the value of the 7 in 4,723 is 7.", why: "7 is the digit; its value depends on its column.", fix: "Say the column name: 7 hundreds = 700." },
      { mistake: "Writing 4,000 + 50 + 3 as 453.", why: "The empty hundreds column has been left out.", fix: "Use a place value table and put 0 in every empty column: 4,053." },
      { mistake: "Thinking 2.5 × 10 = 2.50.", why: "Adding a zero to the end of a decimal doesn't change its value.", fix: "Move the digits one place left: 2.5 × 10 = 25." },
    ],
    checklist: [
      "I can state the value of a digit in a whole number",
      "I can state the value of a digit after the decimal point",
      "I can use zero as a placeholder",
      "I can multiply and divide by 10, 100 and 1,000",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l2": {
    introduction: [
      "Which is more: 0.5 kg or 0.45 kg? Is 34,099 bigger than 34,190? Comparing numbers quickly and correctly is a skill you'll use in measurement, money, statistics and probability.",
      "The secret is to compare column by column from the left, using place value.",
    ],
    objectives: [
      "Compare two numbers using <, > and =",
      "Order whole numbers and decimals",
      "Avoid the trap of thinking a longer decimal is bigger",
    ],
    priorKnowledge: ["Place value of whole numbers and decimals (Lesson 1)"],
    vocabulary: [
      { term: "<", definition: "“Is less than”. 3 < 8 means 3 is less than 8." },
      { term: ">", definition: "“Is greater than”. 8 > 3 means 8 is greater than 3." },
      { term: "Ascending", definition: "In order from smallest to largest." },
      { term: "Descending", definition: "In order from largest to smallest." },
      { term: "Inequality", definition: "A statement comparing two values that are not equal, using < or >." },
    ],
    teaching: [
      {
        heading: "Step 1: Comparing whole numbers",
        paragraphs: [
          "If two whole numbers have a different number of digits, the one with more digits is bigger (as long as neither starts with 0).",
          "If they have the same number of digits, compare from the left. The first column where the digits differ decides which is bigger.",
        ],
        keyPoint: "34,190 > 34,099 because in the hundreds column 1 > 0.",
      },
      {
        heading: "Step 2: Reading the symbols",
        paragraphs: [
          "The open end of < and > always faces the larger number. Read from left to right: 5 < 9 is read “5 is less than 9”.",
        ],
      },
      {
        heading: "Step 3: Comparing decimals",
        paragraphs: [
          "Line the numbers up by the decimal point. Compare the whole-number parts first, then tenths, then hundredths.",
          "A helpful trick is to write the numbers with the same number of decimal places by adding zeros at the end: 0.5 becomes 0.50, which is clearly bigger than 0.45.",
        ],
        keyPoint: "More digits does NOT mean bigger for decimals: 0.5 > 0.45.",
      },
      {
        heading: "Step 4: Ordering a list",
        paragraphs: [
          "To order several numbers, write them all with the same number of decimal places, then compare them like whole numbers. Tick each one off as you place it.",
        ],
      },
    ],
    examples: [
      { question: "Write < or > between 56,382 and 56,328.", steps: ["Both have 5 digits, so compare from the left.", "Ten thousands: 5 and 5. Thousands: 6 and 6. Hundreds: 3 and 3. Tens: 8 and 2.", "8 > 2, so the first number is bigger."], answer: "56,382 > 56,328" },
      { question: "Which is larger, 0.7 or 0.68?", steps: ["Write both with 2 decimal places: 0.70 and 0.68.", "Compare tenths: 7 > 6."], answer: "0.7 is larger" },
      { question: "Write in ascending order: 2.3, 2.03, 2.33, 2.303", steps: ["Write each with 3 decimal places: 2.300, 2.030, 2.330, 2.303.", "Compare like whole numbers: 2030 < 2300 < 2303 < 2330."], answer: "2.03, 2.3, 2.303, 2.33" },
    ],
    mistakes: [
      { mistake: "Thinking 0.45 > 0.5 because 45 > 5.", why: "The digits are in different columns: 0.5 has 5 tenths, 0.45 has only 4 tenths.", fix: "Write both with the same number of decimal places: 0.50 and 0.45." },
      { mistake: "Mixing up < and >.", why: "The symbols look similar.", fix: "Remember the open “mouth” faces the bigger number." },
      { mistake: "Ordering largest to smallest when asked for ascending order.", why: "Ascending and descending are easy to confuse.", fix: "Ascending is like climbing stairs: going up from smallest." },
    ],
    checklist: [
      "I can use < and > correctly",
      "I can compare whole numbers",
      "I can compare decimals with different numbers of decimal places",
      "I can put a list of numbers in order",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l3": {
    introduction: [
      "A newspaper says “2,000 fans attended” when the true figure was 1,987. That is rounding: replacing a number with a simpler one that is close to it.",
      "Rounding helps us estimate, describe large amounts and check answers. In this lesson you'll round to the nearest 10, 100 and 1,000.",
    ],
    objectives: [
      "Round whole numbers to the nearest 10, 100 or 1,000",
      "Use the deciding digit and the halfway rule",
      "Work out which numbers round to a given value",
    ],
    priorKnowledge: ["Place value (Lesson 1)", "Comparing numbers (Lesson 2)"],
    vocabulary: [
      { term: "Round", definition: "To replace a number with a nearby, simpler number." },
      { term: "Multiple", definition: "A number in a times table, e.g. multiples of 100 are 100, 200, 300…" },
      { term: "Deciding digit", definition: "The digit just to the right of the column you're rounding to. It decides whether to round up or down." },
      { term: "Halfway", definition: "The point exactly in the middle of two multiples, e.g. 350 is halfway between 300 and 400." },
      { term: "Approximately equal to (≈)", definition: "Shows that two values are close but not exactly equal." },
    ],
    teaching: [
      {
        heading: "Step 1: Find the two multiples either side",
        paragraphs: ["To round 3,742 to the nearest 100, ask: which two multiples of 100 is it between? It's between 3,700 and 3,800."],
        visual: { kind: "numberline", min: 3700, max: 3800, ticks: 10, points: [{ value: 3742, label: "3,742" }] },
      },
      {
        heading: "Step 2: Decide which is closer",
        paragraphs: [
          "Look at the deciding digit, the digit one column to the right of the one you are rounding to. For the nearest 100 that is the tens digit. In 3,742 it is 4.",
          "If the deciding digit is 5 or more, round up. If it is 4 or less, round down.",
        ],
        keyPoint: "3,742 ≈ 3,700 (to the nearest 100), because the deciding digit 4 is less than 5.",
      },
      {
        heading: "Step 3: Exactly halfway rounds up",
        paragraphs: ["3,750 is exactly halfway between 3,700 and 3,800. The convention is that halfway rounds up, so 3,750 ≈ 3,800."],
      },
      {
        heading: "Step 4: Carrying over",
        paragraphs: ["Sometimes rounding up changes more than one digit. 9,640 to the nearest 1,000 rounds up from 9,000 to 10,000. Always write the full multiple."],
      },
    ],
    examples: [
      { question: "Round 467 to the nearest 10.", steps: ["467 is between 460 and 470.", "The deciding digit (ones) is 7, which is 5 or more, so round up."], answer: "470" },
      { question: "Round 28,519 to the nearest 1,000.", steps: ["28,519 is between 28,000 and 29,000.", "The deciding digit (hundreds) is 5, so round up."], answer: "29,000" },
      { question: "A whole number rounds to 600 to the nearest 100. What is the largest it could be?", steps: ["Numbers from 550 upwards round to 600.", "650 is halfway, so it rounds up to 700.", "The largest whole number below 650 is 649."], answer: "649" },
    ],
    mistakes: [
      { mistake: "Rounding 4,682 to the nearest 100 as 47.", why: "Rounding keeps a number roughly the same size; it doesn't remove digits.", fix: "Fill the columns to the right with zeros: 4,700." },
      { mistake: "Looking at the wrong digit to decide.", why: "Students sometimes look at the last digit instead of the deciding digit.", fix: "Underline the column you're rounding to, then look one place to its right." },
      { mistake: "Rounding 650 down to 600.", why: "Exactly halfway always rounds up.", fix: "5 or more: round up." },
    ],
    checklist: [
      "I can round to the nearest 10",
      "I can round to the nearest 100 and 1,000",
      "I can explain the halfway rule",
      "I can find the smallest and largest numbers that round to a value",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l4": {
    introduction: [
      "A calculator says 10 ÷ 3 = 3.333333333. That's far more accuracy than we usually need. Rounding to decimal places gives a sensible answer, such as £3.33.",
      "This skill appears constantly at GCSE, where questions often say “give your answer to 1 decimal place”.",
    ],
    objectives: [
      "Round numbers to 1, 2 or 3 decimal places",
      "Keep trailing zeros that show accuracy (e.g. 3.50)",
      "Round money to the nearest penny",
    ],
    priorKnowledge: ["Decimal place value (Lesson 1)", "Rounding whole numbers (Lesson 3)"],
    vocabulary: [
      { term: "Decimal place (d.p.)", definition: "A column after the decimal point. 3.47 has 2 decimal places." },
      { term: "Degree of accuracy", definition: "How precisely a value is given, e.g. to 2 decimal places." },
      { term: "Trailing zero", definition: "A zero at the end of a decimal. In a rounded answer it shows the accuracy: 3.50 is given to 2 d.p." },
      { term: "Truncate", definition: "To cut a number off without rounding. 3.48 truncated to 1 d.p. is 3.4, but rounded it is 3.5." },
    ],
    teaching: [
      {
        heading: "Step 1: Count the decimal places and draw a line",
        paragraphs: ["To round 6.2847 to 2 decimal places, count two digits after the point and draw a line: 6.28 | 47."],
      },
      {
        heading: "Step 2: Look at the deciding digit",
        paragraphs: ["The digit just after the line decides. Here it is 4, so we round down: the 8 stays as it is. 6.2847 ≈ 6.28 (2 d.p.)."],
        keyPoint: "5 or more: round up. 4 or less: round down. Then remove everything after the line.",
      },
      {
        heading: "Step 3: Rounding up can ripple",
        paragraphs: [
          "Round 4.396 to 2 d.p. The deciding digit is 6, so the 9 hundredths must go up to 10 hundredths, which is 1 tenth. 4.396 ≈ 4.40.",
          "You must write 4.40, not 4.4. The final zero shows that the answer is accurate to 2 decimal places.",
        ],
        keyPoint: "Always give exactly the number of decimal places asked for.",
      },
      {
        heading: "Step 4: Money",
        paragraphs: ["There are 100 pennies in a pound, so “to the nearest penny” means 2 decimal places of a pound. £12.4583 ≈ £12.46."],
      },
    ],
    examples: [
      { question: "Round 7.362 to 1 decimal place.", steps: ["Line after 1 d.p.: 7.3 | 62.", "Deciding digit: 6, which is 5 or more, so round up."], answer: "7.4" },
      { question: "Round 0.8049 to 2 decimal places.", steps: ["Line after 2 d.p.: 0.80 | 49.", "Deciding digit: 4, so round down. Keep the 0."], answer: "0.80" },
      { question: "£20 is shared between 3 people. How much does each get, to the nearest penny?", steps: ["£20 ÷ 3 = 6.6666…", "To the nearest penny is 2 d.p.: 6.66 | 66…", "Deciding digit 6: round up."], answer: "£6.67" },
    ],
    mistakes: [
      { mistake: "Writing 4.4 instead of 4.40 when asked for 2 d.p.", why: "The trailing zero is part of the required accuracy.", fix: "Count your decimal places before you finish." },
      { mistake: "Truncating: 3.78 → 3.7 (1 d.p.).", why: "Chopping off digits ignores the deciding digit.", fix: "Look at the next digit: 8 means round up to 3.8." },
      { mistake: "Rounding in stages: 2.346 → 2.35 → 2.4.", why: "Rounding twice can push a number the wrong way. 2.346 is actually 2.3 to 1 d.p.", fix: "Always round the original number in one step." },
    ],
    checklist: [
      "I can round to 1 decimal place",
      "I can round to 2 and 3 decimal places",
      "I keep trailing zeros when they're needed",
      "I can round money to the nearest penny",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l5": {
    introduction: [
      "Estimating means working out a rough answer quickly. It helps you check a calculator answer, plan a budget and spot mistakes in the exam.",
      "The standard method is to round each number to 1 significant figure and then calculate.",
    ],
    objectives: [
      "Round numbers to 1 significant figure",
      "Estimate the answer to a calculation",
      "Decide whether an estimate is an overestimate or an underestimate",
    ],
    priorKnowledge: ["Rounding to 10, 100 and 1,000 (Lesson 3)", "Multiplying by multiples of 10"],
    vocabulary: [
      { term: "Estimate", definition: "An approximate answer found using rounded numbers." },
      { term: "Significant figure", definition: "The first significant figure is the first non-zero digit. Rounding to 1 s.f. keeps just that digit's place: 382 ≈ 400." },
      { term: "Overestimate", definition: "An estimate that is bigger than the exact answer." },
      { term: "Underestimate", definition: "An estimate that is smaller than the exact answer." },
    ],
    teaching: [
      {
        heading: "Step 1: Rounding to 1 significant figure",
        paragraphs: [
          "Find the first non-zero digit and round to that column. 382 → 400 (nearest 100). 47 → 50 (nearest 10). 6.8 → 7 (nearest 1). 0.32 → 0.3 (nearest tenth).",
        ],
        keyPoint: "The rounded number has only one non-zero digit.",
      },
      {
        heading: "Step 2: Calculate with the rounded numbers",
        paragraphs: ["Estimate 382 × 47: round to 400 × 50. Then 4 × 5 = 20, and there are three zeros in total, so 400 × 50 = 20,000."],
        keyPoint: "382 × 47 ≈ 20,000. (The exact answer is 17,954, so the estimate is sensible.)",
      },
      {
        heading: "Step 3: Over or under?",
        paragraphs: [
          "If both numbers in a multiplication are rounded up, the estimate is too big: an overestimate. If both are rounded down, it is an underestimate.",
          "If one is rounded up and one down, you can't be sure without more working.",
        ],
      },
    ],
    examples: [
      { question: "Estimate 71 × 6.", steps: ["Round 71 to the nearest 10: 70.", "70 × 6 = 420."], answer: "≈ 420" },
      { question: "Estimate 589 ÷ 31.", steps: ["589 ≈ 600 and 31 ≈ 30 (1 s.f.).", "600 ÷ 30 = 60 ÷ 3 = 20."], answer: "≈ 20" },
      { question: "Estimate 4.8 × 7.2 and say whether it is an overestimate or underestimate.", steps: ["4.8 ≈ 5 (rounded up) and 7.2 ≈ 7 (rounded down).", "5 × 7 = 35.", "One number went up and one went down, so we can't tell without working it out. (Exact: 34.56, so here it's an overestimate.)"], answer: "≈ 35" },
    ],
    mistakes: [
      { mistake: "Working out the exact answer and then rounding it.", why: "That isn't estimating: the point is to make the calculation easy.", fix: "Round FIRST, then calculate." },
      { mistake: "Rounding 382 to 380 for a 1 s.f. estimate.", why: "380 has two significant figures.", fix: "Keep only the first non-zero digit: 400." },
      { mistake: "Losing zeros: 400 × 50 = 2,000.", why: "Not counting the zeros carefully.", fix: "4 × 5 = 20, then add all three zeros: 20,000." },
    ],
    checklist: [
      "I can round to 1 significant figure",
      "I can estimate products, quotients, sums and differences",
      "I can tell whether an estimate is too big or too small",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l6": {
    introduction: [
      "Negative numbers are numbers less than zero. You meet them in temperatures (−4 °C), bank balances (−£20 means you owe money) and heights below sea level.",
      "A number line is the best tool for understanding them.",
    ],
    objectives: [
      "Use a number line to add and subtract with negative numbers",
      "Solve problems about temperature change",
      "Understand that subtracting a negative is the same as adding",
    ],
    priorKnowledge: ["Ordering whole numbers (Lesson 2)", "Number bonds and mental addition"],
    vocabulary: [
      { term: "Negative number", definition: "A number less than zero, written with a minus sign, e.g. −6." },
      { term: "Positive number", definition: "A number greater than zero." },
      { term: "Integer", definition: "A whole number: positive, negative or zero." },
      { term: "Difference", definition: "How far apart two numbers are; found by subtracting the smaller from the larger." },
    ],
    teaching: [
      {
        heading: "Step 1: The number line",
        paragraphs: ["Zero is in the middle. Positive numbers are to the right, negative numbers to the left. Moving right means going up; moving left means going down."],
        visual: { kind: "numberline", min: -10, max: 10, ticks: 20, points: [{ value: -4, label: "−4" }, { value: 3, label: "3" }] },
      },
      {
        heading: "Step 2: Adding and subtracting a positive number",
        paragraphs: [
          "Adding a positive number means moving right. Subtracting a positive number means moving left.",
          "−4 + 7: start at −4 and move 7 right. You pass through 0 after 4 steps, then 3 more: the answer is 3.",
        ],
        keyPoint: "−4 + 7 = 3 and 2 − 9 = −7.",
      },
      {
        heading: "Step 3: Finding a difference",
        paragraphs: ["The difference between −5 and 6 is the number of steps between them: 5 steps to zero, then 6 more, so 11."],
      },
      {
        heading: "Step 4: Two signs together",
        paragraphs: [
          "Subtracting a negative is the same as adding: 5 − (−3) = 5 + 3 = 8. Taking away a debt makes you better off.",
          "Adding a negative is the same as subtracting: 5 + (−3) = 5 − 3 = 2.",
        ],
        keyPoint: "Same signs together (− − or + +) → add. Different signs (+ − or − +) → subtract.",
      },
    ],
    examples: [
      { question: "The temperature is −6 °C and rises by 9 degrees. What is the new temperature?", steps: ["Start at −6 and move 9 right.", "6 steps take you to 0, then 3 more to 3."], answer: "3 °C" },
      { question: "Work out −3 − 5.", steps: ["Start at −3.", "Subtracting 5 means moving 5 left: −4, −5, −6, −7, −8."], answer: "−8" },
      { question: "Work out −2 − (−7).", steps: ["Subtracting a negative is adding: −2 + 7.", "Start at −2 and move 7 right."], answer: "5" },
    ],
    mistakes: [
      { mistake: "Saying −3 − 5 = 2 or −2.", why: "Treating the minus signs as if they cancel, or subtracting the smaller from the larger.", fix: "Use the number line: from −3, go 5 to the left." },
      { mistake: "Giving the difference between −4 and 6 as 2.", why: "Ignoring the sign of −4 (6 − 4 = 2).", fix: "Count the steps through zero: 4 + 6 = 10." },
      { mistake: "Thinking 5 − (−3) = 2.", why: "Ignoring the second negative sign.", fix: "− − becomes +: 5 + 3 = 8." },
    ],
    checklist: [
      "I can use a number line with negative numbers",
      "I can add and subtract positive numbers to and from negatives",
      "I can find the difference between a negative and a positive number",
      "I can subtract a negative number",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l7": {
    introduction: [
      "Is −8 bigger or smaller than −3? It's tempting to say bigger because 8 > 3, but −8 °C is colder than −3 °C. With negative numbers, the further from zero, the smaller the number.",
    ],
    objectives: [
      "Compare negative numbers using < and >",
      "Order lists of positive and negative numbers, including decimals",
      "Find the number halfway between two numbers",
    ],
    priorKnowledge: ["Comparing and ordering numbers (Lesson 2)", "Negative numbers on a number line (Lesson 6)"],
    vocabulary: [
      { term: "Number line", definition: "A line with numbers placed at equal intervals; numbers increase from left to right." },
      { term: "Ascending order", definition: "From smallest to largest." },
      { term: "Midpoint", definition: "The number exactly halfway between two numbers." },
    ],
    teaching: [
      {
        heading: "Step 1: Left is smaller",
        paragraphs: ["On a number line, any number to the left of another is smaller. −8 is to the left of −3, so −8 < −3."],
        visual: { kind: "numberline", min: -10, max: 2, ticks: 12, points: [{ value: -8, label: "−8" }, { value: -3, label: "−3" }] },
        keyPoint: "For negative numbers: the bigger the number after the minus sign, the smaller the value.",
      },
      {
        heading: "Step 2: Ordering a mixed list",
        paragraphs: ["Split the list into negatives and positives. Order the negatives first (furthest from zero first), then zero, then the positives."],
      },
      {
        heading: "Step 3: Negative decimals",
        paragraphs: ["The same rule works: −1.2 is further from zero than −0.5, so −1.2 < −0.5. Writing numbers with the same number of decimal places helps."],
      },
      {
        heading: "Step 4: Halfway between two numbers",
        paragraphs: ["Find the distance between them, halve it, and move that far from the smaller number. Or add the two numbers and divide by 2."],
        keyPoint: "Halfway between −6 and 4: distance 10, half is 5, −6 + 5 = −1.",
      },
    ],
    examples: [
      { question: "Write < or > between −7 and −2.", steps: ["−7 is further left on the number line."], answer: "−7 < −2" },
      { question: "Write in ascending order: 3, −5, 0, −12, 8", steps: ["Negatives first, furthest from zero first: −12, −5.", "Then 0, then 3, 8."], answer: "−12, −5, 0, 3, 8" },
      { question: "What is halfway between −9 and 3?", steps: ["Distance = 9 + 3 = 12.", "Half = 6.", "−9 + 6 = −3. Check: (−9 + 3) ÷ 2 = −6 ÷ 2 = −3."], answer: "−3" },
    ],
    mistakes: [
      { mistake: "Thinking −8 > −3.", why: "Comparing 8 and 3 and ignoring the signs.", fix: "Picture the number line or the temperature: −8 °C is colder." },
      { mistake: "Putting −0.5 before −1.2 in ascending order.", why: "Forgetting that −1.2 is further from zero.", fix: "Mark both on a number line." },
      { mistake: "Saying halfway between −6 and 4 is 5.", why: "5 is half the distance, not the midpoint.", fix: "Move 5 from one end: −6 + 5 = −1." },
    ],
    checklist: [
      "I can compare two negative numbers",
      "I can order a list including negatives",
      "I can order negative decimals",
      "I can find the number halfway between two numbers",
    ],
  },

  /* ------------------------------------------------------------------ */
  "y7-u1-l8": {
    introduction: [
      "What is 2 + 3 × 4? If you work left to right you get 20, but the correct answer is 14. Mathematicians around the world agree an order of operations so that every calculation has only one answer.",
      "In the UK we remember the order with BIDMAS.",
    ],
    objectives: [
      "Use BIDMAS to carry out calculations in the correct order",
      "Use brackets and indices (squares) in calculations",
      "Insert brackets to make a calculation correct",
    ],
    priorKnowledge: ["The four operations (written and mental methods)", "Square numbers up to 12 × 12"],
    vocabulary: [
      { term: "BIDMAS", definition: "Brackets, Indices, Division and Multiplication, Addition and Subtraction: the order of operations." },
      { term: "Operation", definition: "Something done to numbers: add, subtract, multiply, divide, square…" },
      { term: "Index (plural indices)", definition: "A small raised number showing a power, e.g. the 2 in 5² (5 × 5 = 25)." },
      { term: "Brackets", definition: "( ) show which part of a calculation to do first." },
    ],
    teaching: [
      {
        heading: "Step 1: The order",
        paragraphs: [
          "B: Brackets first. I: Indices (powers and roots) next. D and M: Division and Multiplication, working left to right. A and S: Addition and Subtraction, working left to right.",
        ],
        keyPoint: "Division and multiplication have EQUAL priority, as do addition and subtraction. Within each pair, work from left to right.",
      },
      {
        heading: "Step 2: Multiplication before addition",
        paragraphs: ["2 + 3 × 4: multiplication first, 3 × 4 = 12, then 2 + 12 = 14."],
      },
      {
        heading: "Step 3: Brackets change the order",
        paragraphs: ["(2 + 3) × 4: brackets first, 2 + 3 = 5, then 5 × 4 = 20. Brackets let us override the usual order."],
      },
      {
        heading: "Step 4: Indices",
        paragraphs: ["In 10 − 3², the square belongs only to the 3. Work out 3² = 9 first, then 10 − 9 = 1."],
        keyPoint: "Same-priority operations go left to right: 20 ÷ 4 × 5 = 5 × 5 = 25, not 20 ÷ 20 = 1.",
      },
    ],
    examples: [
      { question: "Work out 18 − 12 ÷ 3.", steps: ["Division first: 12 ÷ 3 = 4.", "Then 18 − 4 = 14."], answer: "14" },
      { question: "Work out (7 − 2)² + 4.", steps: ["Brackets: 7 − 2 = 5.", "Indices: 5² = 25.", "Then 25 + 4 = 29."], answer: "29" },
      { question: "Add brackets to make 6 + 4 × 3 − 1 = 20 true.", steps: ["Try (6 + 4) × 3 − 1 = 30 − 1 = 29. No.", "Try 6 + 4 × (3 − 1) = 6 + 8 = 14. No.", "Try (6 + 4) × (3 − 1) = 10 × 2 = 20. Yes."], answer: "(6 + 4) × (3 − 1) = 20" },
    ],
    mistakes: [
      { mistake: "Working left to right: 5 + 2 × 3 = 21.", why: "Multiplication must come before addition.", fix: "5 + 6 = 11." },
      { mistake: "Thinking M comes before D because it is earlier in BIDMAS.", why: "They have equal priority.", fix: "Do division and multiplication from left to right." },
      { mistake: "Working out 4² as 8.", why: "Confusing squaring with doubling.", fix: "4² = 4 × 4 = 16." },
    ],
    checklist: [
      "I know the order of operations",
      "I can calculate with brackets",
      "I can calculate with squares",
      "I can place brackets to make a calculation true",
    ],
  },
};
