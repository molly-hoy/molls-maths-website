"""Decimals (7), division (5), dimensional analysis and the data handling cycle.
Arithmetic answers use Python's Decimal type, so there are no rounding slips."""
from decimal import Decimal as D
from fractions import Fraction
from engine.draw import bus_stop, column_calc


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def fmt(x):
    """Write a Decimal without trailing zeros: 4.50 -> 4.5, 3.0 -> 3."""
    x = (D(str(x)) if isinstance(x, float) else D(x)).normalize()   # str() avoids float noise like 1.19999
    s = format(x, "f")
    return s.replace("-", "−")


def calc(a, op, b):
    a, b = D(a), D(b)
    return fmt({"+": a + b, "−": a - b, "×": a * b, "÷": a / b}[op])


def qs(pairs, op):
    return [(f"{a} {op} {b}", calc(a, op, b)) for a, b in pairs]


# ==========================================================================
def dec_add(ws):
    ws.section("Practice")
    P(ws, "Work out", qs([("2.4", "3.5"), ("6.7", "1.2"), ("4.8", "3.6"), ("12.5", "7.9"), ("0.35", "0.42"), ("3.07", "4.85")], "+"))
    P(ws, "Work out. Line up the decimal points first.", qs([("5.6", "2.45"), ("13.8", "0.27"), ("7", "3.85"), ("0.9", "0.123"),
                                                              ("24.06", "8.7"), ("100.5", "9.75")], "+"))
    ws.section("Problem solving")
    ws.question("Sam buys a book for £6.75 and a pen for £1.48. How much does he spend?", "£8.23", space=40)
    ws.question("Ali works out 3.5 + 1.25 and gets 1.60. Explain his mistake and find the right answer.",
                "He lined up the digits on the right instead of lining up the decimal points. 3.5 + 1.25 = 4.75", space=45)
    ws.question("Find two decimals with one decimal place each that add up to 10.", "e.g. 6.3 + 3.7", space=35)


def dec_sub(ws):
    ws.section("Practice")
    P(ws, "Work out", qs([("5.8", "2.3"), ("9.6", "4.9"), ("12.4", "7.8"), ("6.25", "3.14"), ("8.03", "2.57"), ("15.2", "6.75")], "−"))
    P(ws, "Work out", qs([("7", "2.6"), ("10", "4.35"), ("3.4", "0.08"), ("20", "0.75"), ("1", "0.236"), ("50.1", "9.99")], "−"))
    ws.section("Problem solving")
    ws.question("Mia pays for £3.68 of shopping with a £10 note. How much change does she get?", "£6.32", space=40)
    ws.question("A plank is 2.4 m long. 0.85 m is cut off. How long is the piece that is left?", "1.55 m", space=40)
    ws.question("Jo says 5 − 1.3 = 4.3. Explain her mistake.", "She took 1 from 5 but forgot the 0.3: 5 − 1.3 = 3.7", space=40)


def dec_mult(ws):
    ws.section("Practice")
    P(ws, "Work out", qs([("0.3", "4"), ("2.5", "3"), ("1.2", "6"), ("0.07", "8"), ("4.6", "5"), ("12.3", "7")], "×"))
    P(ws, "Work out", qs([("0.4", "0.2"), ("0.6", "0.5"), ("1.5", "0.3"), ("2.4", "1.2"), ("0.08", "0.9"), ("3.25", "0.4")], "×"))
    ws.section("Problem solving")
    ws.question("Apples cost £0.35 each. How much do 12 apples cost?", "£4.20", space=40)
    ws.question("Given that 46 × 23 = 1058, work out (a) 4.6 × 2.3   (b) 0.46 × 23   (c) 4.6 × 0.023",
                "(a) 10.58   (b) 10.58   (c) 0.1058", space=50)
    ws.question("Explain why 0.5 × 0.5 is smaller than 0.5.", "Multiplying by a number less than 1 makes it smaller: "
                "half of 0.5 is 0.25.", space=40)


def dec_div_int(ws):
    ws.section("Practice")
    P(ws, "Work out", qs([("8.4", "2"), ("9.6", "3"), ("12.5", "5"), ("7.2", "4"), ("0.56", "7"), ("15.3", "9")], "÷"))
    P(ws, "Work out", qs([("3.5", "2"), ("4.2", "8"), ("0.9", "6"), ("10.5", "4"), ("27.3", "6"), ("1.8", "5")], "÷"))
    ws.section("Problem solving")
    ws.question("A bill of £47.40 is shared equally between 6 friends. How much does each pay?", "£7.90", space=40)
    ws.question("A 2.75 m ribbon is cut into 5 equal pieces. How long is each piece?", "0.55 m", space=40)
    ws.question("Ella says 4.8 ÷ 4 = 1.02. Explain her mistake.", "4.8 ÷ 4 = 1.2 (4 ÷ 4 = 1 and 0.8 ÷ 4 = 0.2). She "
                "put the 2 in the hundredths column.", space=40)


def dec_div_dec(ws):
    ws.section("Practice")
    P(ws, "Work out", qs([("6", "0.2"), ("4.8", "0.4"), ("1.5", "0.3"), ("7.2", "0.08"), ("12", "0.5"), ("0.36", "0.9")], "÷"))
    P(ws, "Work out", qs([("8.4", "1.2"), ("2.25", "1.5"), ("9.6", "0.32"), ("0.65", "0.05"), ("14.4", "2.4"), ("3", "0.06")], "÷"))
    ws.section("Problem solving")
    ws.question("Explain why 4.5 ÷ 0.5 gives the same answer as 45 ÷ 5.",
                "Multiplying both numbers by 10 doesn't change the answer: 4.5 ÷ 0.5 = 45 ÷ 5 = 9.", space=45)
    ws.question("How many 0.25 litre glasses can be filled from a 3 litre bottle?", "12", space=35)
    ws.question("Given that 72 ÷ 8 = 9, work out (a) 7.2 ÷ 0.8   (b) 0.72 ÷ 0.08   (c) 72 ÷ 0.8",
                "(a) 9   (b) 9   (c) 90", space=45)


def dec_order(ws):
    ws.section("Practice")
    sets = [["0.5", "0.35", "0.6", "0.42"], ["2.07", "2.7", "2.17", "2.071"], ["0.09", "0.9", "0.099", "0.19"],
            ["5.5", "5.05", "5.505", "5.55"], ["−0.3", "0.2", "−1.5", "0.15"]]
    def order(s):
        return ",  ".join(sorted(s, key=lambda v: D(v.replace("−", "-"))))
    P(ws, "Write each list in order, smallest first.", [(",  ".join(s), order(s)) for s in sets], cols=1)
    P(ws, "Write < or > between each pair.", [("0.4 ___ 0.38", ">"), ("1.09 ___ 1.1", "<"), ("3.5 ___ 3.49", ">"),
                                              ("0.007 ___ 0.07", "<"), ("−0.2 ___ −0.5", ">"), ("2.30 ___ 2.3", "= (they are equal)")])
    ws.section("Problem solving")
    ws.question("Tom says 0.45 is bigger than 0.5 because 45 is bigger than 5. Explain why he is wrong.",
                "Compare tenths first: 0.5 has 5 tenths, 0.45 has only 4 tenths, so 0.5 is bigger.", space=45)
    ws.question("Write down a decimal between 0.3 and 0.31.", "e.g. 0.305", space=30)
    ws.question("Four runners' times are 12.08 s, 12.8 s, 12.18 s and 12.081 s. Who came first?",
                "12.08 s (the smallest time)", space=35)


def recurring(ws):
    ws.section("Practice")
    P(ws, "Write each fraction as a recurring decimal, using dot notation.", [
        ("[[1//3]]", "0.{.3}"), ("[[2//3]]", "0.{.6}"), ("[[1//9]]", "0.{.1}"), ("[[5//11]]", "0.{.4}{.5}"),
        ("[[1//6]]", "0.1{.6}"), ("[[2//7]]", "0.{.2}8571{.4}")], cols=3)
    P(ws, "Write each recurring decimal as a fraction in its simplest form.", [
        ("0.{.4}", "[[4//9]]"), ("0.{.2}{.7}", "[[27//99]] = [[3//11]]"), ("0.{.1}2{.3}", "[[123//999]] = [[41//333]]"),
        ("0.1{.6}", "[[1//6]]"), ("0.4{.5}", "[[41//90]]"), ("2.{.3}", "[[7//3]]")], cols=3)
    ws.section("Problem solving")
    ws.question("Use algebra to prove that 0.{.3}{.6} = [[4//11]].",
                "Let x = 0.3636..., so 100x = 36.3636...; subtracting, 99x = 36, so x = [[36//99]] = [[4//11]]", space=60)
    ws.question("Explain how you can tell, without dividing, that [[7//20]] is a terminating decimal but [[7//30]] is not.",
                "20 = 2^2 × 5 has only 2s and 5s as prime factors, so it terminates. 30 = 2 × 3 × 5 has a factor of 3, "
                "so it recurs.", space=55)


def dimensional(ws):
    ws.section("Practice")
    P(ws, "a, b and c are lengths. Does each expression give a length, an area, a volume or none of these?", [
        ("a + b", "length"), ("ab", "area"), ("abc", "volume"), ("3a^2", "area"), ("πa", "length"),
        ("a^2 + bc", "area"), ("a^3 + b", "none (inconsistent)"), ("[[ab//c]]", "length"), ("4πa^2b", "volume"),
        ("2(a + b)", "length"), ("a^2 + b", "none (inconsistent)"), ("[[πa^2b//3]]", "volume")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why a^2 + b cannot be a formula for an area.",
                "a^2 is an area but b is a length; you can't add an area to a length.", space=40)
    ws.question("r and h are lengths. Which of these could be the formula for the volume of a cone?\n"
                "πr^2h          [[1//3]]πr^2h          2πr          πrh",
                "πr^2h and [[1//3]]πr^2h have the dimensions of a volume; numbers like [[1//3]] don't change the "
                "dimensions. (The actual cone formula is [[1//3]]πr^2h.)", space=55)


def short_div(ws):
    ws.section("Practice")
    pairs = [(84, 4), (96, 3), (125, 5), (342, 6), (728, 7), (936, 8), (1458, 9), (2365, 5)]
    ws.figures("Use short division to work out", [bus_stop(d, x) for x, d in pairs], [str(x // d) for x, d in pairs],
               cols=4, fig_h=55, answer_line=False)
    P(ws, "Use short division to work out", [(f"{x} ÷ {d}", str(x // d)) for x, d in [(684, 4), (1792, 7), (4536, 6)]],
      cols=3, row_h=70)
    ws.section("Problem solving")
    ws.question("672 sweets are shared equally between 8 bags. How many sweets are in each bag?", "84", space=55)
    ws.question("A school has 945 pupils in 7 equal year groups. How many pupils are in each year group?", "135",
                space=55)


def long_div(ws):
    ws.section("Practice")
    pairs = [(432, 12), (672, 14), (875, 25), (1288, 23), (3936, 32), (5772, 37)]
    ws.figures("Use long division to work out", [bus_stop(d, x) for x, d in pairs], [str(x // d) for x, d in pairs],
               cols=3, fig_h=115, answer_line=False)
    ws.section("Problem solving")
    ws.question("A ferry can carry 46 cars. How many trips are needed to carry 1150 cars?", "1150 ÷ 46 = 25 trips",
                space=70)
    ws.question("A teacher has £1000 to buy books at £24 each. How many books can she buy, and how much money is left?",
                "41 books, £16 left (1000 ÷ 24 = 41 remainder 16)", space=70)


def div_10s(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{x} ÷ {d}", fmt(D(str(x)) / D(str(d)))) for x, d in [
        (450, 10), (3600, 100), (72000, 1000), (85, 10), (420, 100), (6300, 1000),
        (7, 10), (39, 100), (512, 1000), (4.6, 10), (23.5, 100), (8, 1000)]], cols=4)
    ws.section("Problem solving")
    ws.question("Explain what happens to the digits when you divide a number by 100.",
                "Every digit moves two places to the right (the number gets 100 times smaller).", space=40)
    ws.question("A box of 1000 nails weighs 2.5 kg. How much does one nail weigh, in kg?", "0.0025 kg", space=40)
    ws.question("£4500 is shared equally between 100 people. How much does each person get?", "£45", space=35)


def div_powers(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{x} ÷ {d}", fmt(D(str(x)) / D(str(d)))) for x, d in [
        (6, "0.1"), (45, "0.1"), (8, "0.01"), (3.2, "0.1"), (0.7, "0.01"), (12, "0.001"),
        (5.6, "0.01"), (0.04, "0.1")]], cols=4)
    P(ws, "Work out", [(f"{x} ÷ 10^{p}", fmt(D(str(x)) / (D(10) ** p))) for x, p in [(5000, 3), (73, 2), (6.4, 1), (90000, 4)]],
      cols=4)
    ws.section("Problem solving")
    ws.question("Explain why dividing by 0.1 gives the same answer as multiplying by 10.",
                "0.1 = [[1//10]], and dividing by [[1//10]] is the same as multiplying by 10.", space=45)
    ws.question("Write these in order, smallest first:  8 ÷ 0.1,   8 × 0.1,   8 ÷ 10,   8 ÷ 0.01",
                "8 ÷ 10 = 0.8 and 8 × 0.1 = 0.8 (equal), 8 ÷ 0.1 = 80, 8 ÷ 0.01 = 800", space=45)


def remainders(ws):
    ws.section("Practice")
    pairs = [(17, 5), (29, 4), (45, 7), (83, 9), (100, 8), (131, 6), (250, 9), (473, 5)]
    P(ws, "Work out each division. Give the remainder.", [(f"{x} ÷ {d}", f"{x // d} r {x % d}") for x, d in pairs], cols=4)
    ws.section("Problem solving")
    ws.question("29 children need to go on a trip. Each car can take 4 children. How many cars are needed?",
                "29 ÷ 4 = 7 r 1, so 8 cars (round up)", space=45)
    ws.question("Eggs are packed in boxes of 6. How many full boxes can be made from 75 eggs?",
                "75 ÷ 6 = 12 r 3, so 12 full boxes (round down)", space=45)
    ws.question("A number divided by 5 gives 8 remainder 3. What is the number?", "5 × 8 + 3 = 43", space=40)


def data_cycle(ws):
    ws.section("Practice")
    P(ws, "Put the four stages of the data handling cycle in order.",
      [("Collect the data.   Interpret the results.   Plan the question.   Analyse (process and present) the data.",
        "Plan → Collect → Analyse → Interpret")], cols=1)
    P(ws, "Which stage of the data handling cycle is each of these?", [
        ("Writing a questionnaire", "plan"), ("Drawing a bar chart", "analyse / present"),
        ("Asking 50 people in the street", "collect"), ("Working out the mean", "analyse"),
        ("Deciding if the hypothesis is true", "interpret"), ("Choosing a sample size", "plan")], cols=2)
    ws.section("Problem solving")
    ws.question('Rosa\'s hypothesis is "Year 11 pupils spend more time on homework than Year 7 pupils."\n'
                "Describe how she could test it, using each stage of the data handling cycle.",
                "Plan: decide what to ask and who (e.g. 30 pupils from each year). Collect: ask them / use a survey. "
                "Analyse: work out averages and draw charts. Interpret: compare the averages and decide whether the "
                "hypothesis is supported.", space=110)
    ws.question("Why might the cycle start again after the interpret stage?",
                "The results may lead to a new question, or show that more or better data is needed.", space=40)


SHEETS = [
    ({"slug": "decimals-addition"}, dec_add),
    ({"slug": "decimals-subtraction"}, dec_sub),
    ({"slug": "decimals-multiplying"}, dec_mult),
    ({"slug": "decimals-dividing-decimals-by-integers"}, dec_div_int),
    ({"slug": "decimals-division-by-decimals"}, dec_div_dec),
    ({"slug": "decimals-ordering"}, dec_order),
    ({"slug": "decimals-recurring-decimals"}, recurring),
    ({"slug": "dimensional-analysis"}, dimensional),
    ({"slug": "division-short-division"}, short_div),
    ({"slug": "division-long-division"}, long_div),
    ({"slug": "division-by-10-100-1000"}, div_10s),
    ({"slug": "division-by-powers-of-10"}, div_powers),
    ({"slug": "division-remainders"}, remainders),
    ({"slug": "data-handling-cycle"}, data_cycle),
]
