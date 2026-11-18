"""Number (23), money (1), multiplication (7), negatives (5), parallel and
perpendicular lines (2) and percentages (9). Answers are calculated."""
import math
from decimal import Decimal as D, ROUND_HALF_UP
from fractions import Fraction as Fr
from engine.draw import column_calc, axes
from engine.geo import table, scene
from topics.number_decimals import fmt


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def m(x):
    """Money: £12.50"""
    v = D(str(x)).quantize(D("0.01"), ROUND_HALF_UP)
    return f"£{v:,.2f}"


def primes_of(n):
    out, p = [], 2
    while n > 1:
        while n % p == 0:
            out.append(p)
            n //= p
        p += 1
    return out


def index_form(fs):
    parts = []
    for p in sorted(set(fs)):
        k = fs.count(p)
        parts.append(f"{p}^{k}" if k > 1 else str(p))
    return " × ".join(parts)


def neg(x):
    return str(x).replace("-", "−")


# ==========================================================================
# Money, multiplication
# ==========================================================================
def money_mixed(ws):
    ws.section("Practice")
    P(ws, "Work out", [("£3.45 + £2.80", "£6.25"), ("£10 − £4.65", "£5.35"), ("6 × £1.25", "£7.50"), ("£18 ÷ 4", "£4.50"),
                       ("£2.99 + £5.49 + £1.20", "£9.68"), ("£50 − £37.85", "£12.15")], cols=3)
    P(ws, "Change into pence or pounds.", [("£4.30 in pence", "430p"), ("85p in pounds", "£0.85"), ("£12 in pence", "1200p"),
                                           ("5p in pounds", "£0.05")], cols=4)
    ws.section("Problem solving")
    ws.question("Amy buys 3 books at £4.99 each. She pays with a £20 note. How much change does she get?", "£5.03", space=40)
    ws.question("Cinema tickets cost £8.50 for adults and £5.25 for children. Find the cost for 2 adults and 3 children.",
                "£32.75", space=40)
    ws.question("Is £1 enough to buy 3 pens at 35p each? Explain.", "No: 3 × 35p = £1.05", space=35)


def grid_method(ws):
    ws.section("Practice")
    ws.question("Example: 23 × 4. Split 23 into 20 + 3 and multiply each part by 4, then add: 80 + 12 = 92.",
                "92", figure=table([["×", "20", "3"], ["4", "80", "12"]], col_w=[50, 50, 50]), fig_w=150, fig_h=44, space=5)
    pairs = [(34, 6), (57, 3), (126, 4), (45, 23), (38, 17), (64, 52)]
    P(ws, "Use the grid method to work out", [(f"{a} × {b}", str(a * b)) for a, b in pairs], cols=3, row_h=80)
    ws.section("Problem solving")
    ws.question("A school buys 24 boxes of 36 pencils. How many pencils is that?", "864", space=55)


def column_method(ws):
    ws.section("Practice")
    pairs = [(43, 6), (78, 4), (235, 7), (406, 8)]
    ws.figures("Use the column method to work out", [column_calc([a, b], "×") for a, b in pairs],
               [str(a * b) for a, b in pairs], cols=4, fig_h=66, answer_line=False)
    pairs2 = [(34, 23), (57, 46), (128, 35), (243, 61)]
    ws.figures("Use long multiplication to work out", [column_calc([a, b], "×", answer_rows=3) for a, b in pairs2],
               [str(a * b) for a, b in pairs2], cols=4, fig_h=105, answer_line=False)
    ws.section("Problem solving")
    ws.question("A plane has 38 rows of 6 seats. It flies 14 full flights. How many passengers is that?", "38 × 6 × 14 = 3192",
                space=60)


def end_number(ws):
    ws.section("Practice")
    pairs = [(23, 47), (36, 18), (125, 9), (44, 66), (91, 73), (58, 25)]
    P(ws, "Without working out the whole answer, write down the last digit of", [(f"{a} × {b}", str(a * b % 10)) for a, b in pairs],
      cols=3)
    ws.section("Problem solving")
    ws.question("Jo says 37 × 24 = 885. Use the last digit to show she must be wrong.", "7 × 4 = 28, so the answer must end in 8",
                space=40)
    ws.question("What is the last digit of 3^{10}? (Look for a pattern.)", "3, 9, 7, 1 repeats every 4: 3^{10} ends in 9", space=45)


def by_10(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{a} × {b}", fmt(D(str(a)) * b)) for a, b in [(45, 10), (36, 100), (7, 1000), (4.5, 10), (0.38, 100),
                                                                     (2.07, 1000), (520, 10), (0.6, 100), (13.5, 1000)]], cols=3)
    ws.section("Problem solving")
    ws.question("Explain what happens to the digits when you multiply by 100.", "Each digit moves two places to the left.",
                space=35)
    ws.question("A pen costs £1.35. How much do 100 pens cost?", "£135", space=30)


def powers_10(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{a} × {b}", fmt(D(str(a)) * D(b))) for a, b in [(6, "0.1"), (45, "0.1"), (8, "0.01"), (320, "0.01"),
                                                                        (7.5, "0.1"), (900, "0.001")]], cols=3)
    P(ws, "Work out", [(f"{a} × 10^{p}", fmt(D(str(a)) * 10 ** p)) for a, p in [(3, 3), (4.2, 2), (0.06, 4), (7, 5)]], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why multiplying by 0.1 is the same as dividing by 10.", "0.1 = [[1//10]], so × 0.1 means take a tenth",
                space=40)


def mult_decimals(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{a} × {b}", fmt(D(a) * D(b))) for a, b in [("0.4", "3"), ("1.6", "5"), ("0.3", "0.7"), ("2.5", "0.4"),
                                                                    ("0.12", "6"), ("3.4", "1.5"), ("0.05", "0.8"), ("4.25", "12")]],
      cols=4)
    ws.section("Problem solving")
    ws.question("Given that 34 × 26 = 884, work out (a) 3.4 × 2.6   (b) 0.34 × 26   (c) 340 × 0.26",
                "(a) 8.84   (b) 8.84   (c) 88.4", space=45)
    ws.question("Fabric costs £3.60 per metre. How much do 2.5 m cost?", "£9", space=35)


def times_tables(ws):
    ws.section("Practice")
    import random
    rnd = random.Random(11)
    facts = [(rnd.randint(2, 12), rnd.randint(2, 12)) for _ in range(20)]
    P(ws, "Work out", [(f"{a} × {b}", str(a * b)) for a, b in facts], cols=5)
    P(ws, "Find the missing number.", [("7 × ___ = 56", "8"), ("___ × 6 = 54", "9"), ("12 × ___ = 132", "11"),
                                       ("___ × 8 = 96", "12"), ("9 × ___ = 63", "7")], cols=5)
    ws.section("Problem solving")
    ws.question("Write down all the pairs of numbers from the times tables that multiply to 24.", "1 × 24, 2 × 12, 3 × 8, 4 × 6",
                space=40)


# ==========================================================================
# Negatives
# ==========================================================================
def neg_addsub(ws):
    ws.section("Practice")
    qs = [(-3, "+", 7), (5, "−", 9), (-4, "−", 6), (-8, "+", 3), (2, "−", -5), (-6, "−", -2), (-7, "+", -4), (0, "−", 8),
          (-12, "+", 15), (4, "+", -10), (-1, "−", -1), (-9, "−", 3)]
    P(ws, "Work out", [(f"{neg(a)} {op} {neg(b) if b >= 0 else '(' + neg(b) + ')'}", neg(a + b if op == "+" else a - b))
                       for a, op, b in qs], cols=4)
    ws.section("Problem solving")
    ws.question("The temperature is −4 °C. It rises by 9 degrees. What is the new temperature?", "5 °C", space=35)
    ws.question("Explain why 3 − (−5) = 8.", "Subtracting a negative is the same as adding: 3 + 5 = 8.", space=35)


def neg_mult(ws):
    ws.section("Practice")
    qs = [(-3, 4), (5, -6), (-7, -2), (-8, 9), (-4, -10), (12, -3), (-1, -15), (-6, 0), (-2, -3, -4)]
    def q(t):
        return " × ".join(neg(x) if x >= 0 or i == 0 else f"({neg(x)})" for i, x in enumerate(t))
    P(ws, "Work out", [(q(t), neg(math.prod(t))) for t in qs], cols=3)
    P(ws, "Work out", [("(−3)^2", "9"), ("(−2)^3", "−8"), ("(−1)^{10}", "1")], cols=3)
    ws.section("Problem solving")
    ws.question("Find two numbers that multiply to give −12 and add to give 1.", "4 and −3", space=35)


def neg_div(ws):
    ws.section("Practice")
    qs = [(-12, 3), (20, -5), (-36, -4), (-45, 9), (56, -8), (-100, -10), (-7, 7), (0, -3)]
    P(ws, "Work out", [(f"{neg(a)} ÷ {neg(b) if b >= 0 else '(' + neg(b) + ')'}", neg(a // b)) for a, b in qs], cols=4)
    P(ws, "Work out", [("[[−18//6]]", "−3"), ("[[−24//−8]]", "3"), ("[[30//−6]]", "−5")], cols=3)
    ws.section("Problem solving")
    ws.question("The mean of four temperatures is −3 °C. Three are −5, 2 and −6. Find the fourth.", "total −12, so −3", space=40)


def neg_order(ws):
    ws.section("Practice")
    sets = [[3, -2, 0, -5, 1], [-8, -3, -10, -1], [-1.5, 2, -0.5, -2.5], [-12, 7, -7, 0, -20]]
    P(ws, "Write in order, smallest first.", [(",  ".join(neg(x) for x in s), ",  ".join(neg(x) for x in sorted(s))) for s in sets],
      cols=2)
    P(ws, "Write < or > between each pair.", [("−3 ___ 2", "<"), ("−7 ___ −4", "<"), ("−1 ___ −10", ">"), ("0 ___ −6", ">")], cols=4)
    ws.section("Problem solving")
    ws.question("Which is colder: −8 °C or −12 °C? By how much?", "−12 °C, by 4 degrees", space=35)


def neg_real(ws):
    ws.section("Practice")
    P(ws, "Answer these questions.", [
        ("The temperature is 3 °C at noon and −5 °C at midnight. By how much has it fallen?", "8 degrees"),
        ("Sam has −£25 in his bank account. He pays in £60. How much does he have now?", "£35"),
        ("A diver is at −18 m. She rises 7 m. What is her new depth?", "−11 m"),
        ("Moscow is −9 °C and London is 6 °C. What is the difference?", "15 degrees"),
        ("A lift starts at floor −2 and goes up 5 floors. Which floor is it on?", "floor 3")], cols=1)
    ws.section("Problem solving")
    ws.question("The temperature fell by 2 °C every hour for 6 hours. It started at 4 °C. What was it at the end?", "−8 °C",
                space=40)


# ==========================================================================
# Number
# ==========================================================================
def best_buys(ws):
    ws.section("Practice")
    P(ws, "Which is the better value? Show your working.", [
        ("400 g for £2.40, or 600 g for £3.30", "600 g (55p per 100 g vs 60p)"),
        ("6 eggs for £1.50, or 12 eggs for £2.76", "12 eggs (23p each vs 25p)"),
        ("1.5 l for £1.20, or 2 l for £1.70", "1.5 l (80p per litre vs 85p)"),
        ("pack of 8 for £3.60, or pack of 5 for £2.40", "pack of 8 (45p each vs 48p)")], cols=1)
    ws.section("Problem solving")
    ws.question("Shop A: 3 for £2. Shop B: 25% off the normal price of 80p each. Which is cheaper for 3 items?",
                "A: £2. B: 3 × 60p = £1.80. Shop B", space=45)
    ws.question("Why might someone buy the smaller pack even if it is worse value?", "e.g. they don't need that much, it "
                "might go off, or they can't afford the bigger one", space=40)


def bodmas(ws):
    ws.section("Practice")
    qs = ["3 + 4 × 2", "20 − 6 ÷ 2", "(5 + 3) × 4", "18 ÷ (2 + 4)", "2 + 3^2", "(2 + 3)^2", "10 − 2 × 3 + 1", "40 ÷ 5 × 2",
          "6 × (7 − 3) ÷ 8", "3^2 + 4^2", "100 − (6 + 4)^2", "2 × 3^2 − 5"]
    def ev(s):
        return str(eval(s.replace("−", "-").replace("×", "*").replace("÷", "/").replace("^", "**"))).replace(".0", "")
    P(ws, "Work out", [(q, ev(q)) for q in qs], cols=3)
    P(ws, "Add brackets to make each calculation correct.", [("3 + 4 × 5 = 35", "(3 + 4) × 5"), ("12 − 4 ÷ 2 = 4", "(12 − 4) ÷ 2"),
                                                            ("2 × 3 + 4 × 5 = 70", "2 × (3 + 4) × 5")], cols=3)
    ws.section("Problem solving")
    ws.question("Mo says 8 − 2 × 3 = 18. Explain his mistake.", "Multiply before subtracting: 8 − 6 = 2.", space=35)


def cubes(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{x}^3", str(x ** 3)) for x in (2, 3, 4, 5, 10, 1)] + [("(−3)^3", "−27"), ("0.2^3", "0.008")], cols=4)
    P(ws, "Which of these are cube numbers?", [("8, 16, 27, 36, 64, 100, 125", "8, 27, 64, 125")], cols=1)
    ws.section("Problem solving")
    ws.question("A cube has edges of 6 cm. Find its volume.", "216 cm^3", space=30)
    ws.question("Find a number that is both a square number and a cube number (not 1).", "64 (8^2 and 4^3)", space=35)


def cube_root(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"^{{3}}√{x ** 3}", str(x)) for x in (2, 3, 4, 5, 10, 6)] + [("^{3}√−8", "−2"), ("^{3}√1000000", "100")],
      cols=4)
    P(ws, "Use a calculator. Give answers to 1 d.p.", [(f"^{{3}}√{x}", f"{x ** (1 / 3):.1f}") for x in (50, 200, 12, 700)], cols=4)
    ws.section("Problem solving")
    ws.question("A cube has a volume of 343 cm^3. How long is each edge?", "7 cm", space=30)
    ws.question("Between which two whole numbers is ^{3}√100?", "4 and 5 (64 < 100 < 125)", space=30)


def currency(ws):
    ws.section("Practice")
    P(ws, "£1 = €1.15. Convert", [("£20 to euros", "€23"), ("£150 to euros", "€172.50"), ("€46 to pounds", "£40"),
                                  ("€230 to pounds", "£200")], cols=2)
    P(ws, "£1 = $1.25. Convert", [("£80 to dollars", "$100"), ("$50 to pounds", "£40"), ("£12.40 to dollars", "$15.50")], cols=3)
    ws.section("Problem solving")
    ws.question("A watch costs £120 in the UK and $145 in the USA. £1 = $1.25. Where is it cheaper?", "$145 = £116, so the USA",
                space=40)


def estimation(ws):
    ws.section("Practice")
    qs = [("48 × 21", "50 × 20 = 1000"), ("397 + 612", "400 + 600 = 1000"), ("8.9 × 3.1", "9 × 3 = 27"),
          ("[[61 × 19//4.1]]", "[[60 × 20//4]] = 300"), ("[[795//38]]", "[[800//40]] = 20"), ("√(99.2)", "√100 = 10"),
          ("0.48 × 62", "0.5 × 60 = 30"), ("[[3.9^2 × 5.1//0.49]]", "[[16 × 5//0.5]] = 160")]
    P(ws, "Estimate by rounding each number to 1 significant figure.", qs, cols=2)
    ws.section("Problem solving")
    ws.question("Is your estimate for 48 × 21 bigger or smaller than the real answer? Explain.",
                "Smaller (1000 vs 1008): 48 was rounded up but 21 was rounded down more in proportion.", space=45)
    ws.question("Ella buys 4 items costing £2.95, £5.10, £1.99 and £7.05. Estimate the total.", "3 + 5 + 2 + 7 = £17", space=35)


def factors(ws):
    ws.section("Practice")
    ns = [12, 18, 20, 24, 36, 45, 50, 100]
    P(ws, "List all the factors of", [(str(x), ", ".join(str(d) for d in range(1, x + 1) if x % d == 0)) for x in ns], cols=2)
    ws.section("Problem solving")
    ws.question("Which number less than 50 has the most factors?", "48 (it has 10 factors)", space=35)
    ws.question("Explain why square numbers have an odd number of factors.", "Factors come in pairs, except the square root "
                "pairs with itself.", space=40)


def midpoint_num(ws):
    ws.section("Practice")
    pairs = [(4, 10), (13, 25), (-7, 3), (2.4, 3.8), (-12, -4), (150, 275), (0.6, 1.1), (-3.5, 6.5)]
    P(ws, "Find the number exactly halfway between", [(f"{neg(a)} and {neg(b)}", neg(fmt(D(str(a)) / 2 + D(str(b)) / 2)))
                                                      for a, b in pairs], cols=4)
    ws.section("Problem solving")
    ws.question("The midpoint of 8 and a number is 15. Find the number.", "22", space=30)


def lcm_q(ws):
    ws.section("Practice")
    pairs = [(4, 6), (3, 5), (6, 8), (10, 15), (9, 12), (12, 18), (8, 20), (7, 21)]
    P(ws, "Find the lowest common multiple (LCM) of", [(f"{a} and {b}", str(math.lcm(a, b))) for a, b in pairs], cols=4)
    ws.section("Problem solving")
    ws.question("Buses leave every 12 minutes and trams every 15 minutes. Both leave at 9:00. When do they next leave "
                "together?", "LCM = 60, so 10:00", space=40)
    ws.question("Burger buns come in packs of 8 and burgers in packs of 6. What is the smallest number of each so there are "
                "none left over?", "24: 3 packs of buns, 4 packs of burgers", space=40)


def hcf_q(ws):
    ws.section("Practice")
    pairs = [(12, 18), (20, 30), (24, 36), (15, 25), (42, 56), (36, 90), (17, 23), (60, 84)]
    P(ws, "Find the highest common factor (HCF) of", [(f"{a} and {b}", str(math.gcd(a, b))) for a, b in pairs], cols=4)
    ws.section("Problem solving")
    ws.question("36 apples and 48 oranges are shared into identical bags with nothing left over. What is the greatest number "
                "of bags?", "HCF = 12 bags", space=40)


def multiples(ws):
    ws.section("Practice")
    P(ws, "Write down the first five multiples of", [(str(x), ", ".join(str(x * k) for k in range(1, 6))) for x in (3, 7, 9, 12,
                                                                                                               15, 25)], cols=3)
    P(ws, "From the list 12, 15, 18, 20, 24, 30, 35, 36, which numbers are multiples of",
      [("3?", "12, 15, 18, 24, 30, 36"), ("4?", "12, 20, 24, 36"), ("5?", "15, 20, 30, 35"), ("6?", "12, 18, 24, 30, 36")], cols=2)
    ws.section("Problem solving")
    ws.question("Find a number between 40 and 50 that is a multiple of both 3 and 4.", "48", space=30)


def ordering_nums(ws):
    ws.section("Practice")
    sets = [[352, 325, 532, 253, 235], [4080, 4800, 4008, 4880], [12099, 12909, 12990, 12009], [999, 1001, 909, 1010]]
    P(ws, "Write in order, smallest first.", [(",  ".join(map(str, s)), ",  ".join(map(str, sorted(s)))) for s in sets], cols=2)
    P(ws, "Write < or > between each pair.", [("456 ___ 465", "<"), ("3009 ___ 3090", "<"), ("7800 ___ 7080", ">")], cols=3)
    ws.section("Problem solving")
    ws.question("Use the digits 3, 8, 1 and 6 once each to make the largest and smallest 4-digit numbers.", "8631 and 1368",
                space=35)


def odd_even(ws):
    ws.section("Practice")
    P(ws, "Is each number odd or even?", [(str(x), "even" if x % 2 == 0 else "odd") for x in (14, 27, 100, 351, 1008, 6789, 42,
                                                                                               95)], cols=4)
    P(ws, "Will the answer be odd or even?", [("odd + odd", "even"), ("odd + even", "odd"), ("even × odd", "even"),
                                              ("odd × odd", "odd")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain how you can tell if a big number like 48 763 is odd or even.", "Look at the last digit: 3 is odd.",
                space=35)


def place_value(ws):
    ws.section("Practice")
    P(ws, "What is the value of the underlined digit? (The digit is in bold.)", [
        ("3**4**52", "400"), ("**7**816", "7000"), ("12 **9**04", "900"), ("**5**3 210", "50 000"), ("8.**6**", "6 tenths (0.6)"),
        ("0.0**4**", "4 hundredths (0.04)")], cols=3)
    P(ws, "Write these numbers in figures.", [("four thousand and twelve", "4012"), ("sixty thousand, five hundred", "60 500"),
                                              ("two hundred and three thousand and seven", "203 007")], cols=1)
    ws.section("Problem solving")
    ws.question("What number is 1000 more than 45 980?", "46 980", space=30)


def using_calcs(ws):
    ws.section("Practice")
    P(ws, "Given that 23 × 47 = 1081, work out", [("2.3 × 47", "108.1"), ("23 × 4.7", "108.1"), ("0.23 × 0.47", "0.1081"),
                                                  ("1081 ÷ 23", "47"), ("108.1 ÷ 4.7", "23"), ("230 × 470", "108 100")], cols=3)
    P(ws, "Given that 156 ÷ 12 = 13, work out", [("15.6 ÷ 12", "1.3"), ("156 ÷ 1.2", "130"), ("13 × 1.2", "15.6")], cols=3)
    ws.section("Problem solving")
    ws.question("Use 36 × 25 = 900 to work out 37 × 25. Explain.", "one more lot of 25: 925", space=35)


def pf(ws):
    ws.section("Practice")
    ns = [12, 18, 30, 36, 60, 84, 100, 126, 220, 360]
    P(ws, "Write each number as a product of prime factors, in index form.", [(str(x), index_form(primes_of(x))) for x in ns],
      cols=3)
    ws.section("Problem solving")
    ws.question("A number is 2^3 × 3 × 5. What is the number?", "120", space=30)
    ws.question("Explain why 2 × 3 × 9 is not written as a product of PRIME factors.", "9 is not prime: it should be 2 × 3^3.",
                space=35)


def pf_squares(ws):
    ws.section("Practice")
    P(ws, "Use prime factors to decide whether each number is a square number.", [
        ("144", "2^4 × 3^2: all powers even, so yes (12^2)"), ("72", "2^3 × 3^2: no"), ("225", "3^2 × 5^2: yes (15^2)"),
        ("196", "2^2 × 7^2: yes (14^2)")], cols=2)
    P(ws, "Find the smallest whole number to multiply by to make", [("72 a square number", "2"), ("50 a square number", "2"),
                                                                   ("18 a cube number", "12"), ("96 a cube number", "18")], cols=2)
    ws.section("Problem solving")
    ws.question("Use prime factors to find √1764.", "1764 = 2^2 × 3^2 × 7^2, so √1764 = 2 × 3 × 7 = 42", space=40)


def pf_lcm_hcf(ws):
    ws.section("Practice")
    pairs = [(24, 36), (30, 45), (48, 60), (84, 90)]
    P(ws, "Use prime factors (or a Venn diagram) to find the HCF and LCM of",
      [(f"{a} and {b}", f"{a} = {index_form(primes_of(a))}, {b} = {index_form(primes_of(b))}; HCF {math.gcd(a, b)}, "
                        f"LCM {math.lcm(a, b)}") for a, b in pairs], cols=1)
    ws.section("Problem solving")
    ws.question("A = 2^3 × 3^2 × 5 and B = 2 × 3^3 × 7. Find the HCF and LCM, in index form.",
                "HCF = 2 × 3^2, LCM = 2^3 × 3^3 × 5 × 7", space=45)


def primes(ws):
    ws.section("Practice")
    P(ws, "Write down", [("all the prime numbers less than 30", "2, 3, 5, 7, 11, 13, 17, 19, 23, 29"),
                         ("the prime numbers between 40 and 60", "41, 43, 47, 53, 59")], cols=1)
    P(ws, "Is each number prime? If not, give a factor.", [(str(x), "prime" if len(primes_of(x)) == 1 else
                                                            f"no ({primes_of(x)[0]} is a factor)") for x in (51, 53, 87, 91, 97, 119)],
      cols=3)
    ws.section("Problem solving")
    ws.question("Explain why 2 is the only even prime number.", "Every other even number has 2 as a factor.", space=35)
    ws.question("Is 1 a prime number? Explain.", "No: a prime has exactly two factors; 1 has only one.", space=35)


def squares(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{x}^2", fmt(D(str(x)) ** 2)) for x in (6, 9, 12, 15, 20, 0.5, 1.1)] + [("(−8)^2", "64")], cols=4)
    P(ws, "Which of these are square numbers?", [("16, 20, 25, 32, 49, 60, 81, 99, 100", "16, 25, 49, 81, 100")], cols=1)
    ws.section("Problem solving")
    ws.question("Find two square numbers that add up to 100.", "36 + 64", space=30)
    ws.question("A square has an area of 144 cm^2. Find its perimeter.", "48 cm", space=30)


def sq_root(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"√{x * x}", str(x)) for x in (5, 8, 11, 13, 20)] + [("√0.25", "0.5"), ("√[[9//16]]", "[[3//4]]"),
                                                                             ("√1.44", "1.2")], cols=4)
    P(ws, "Use a calculator. Give answers to 2 d.p.", [(f"√{x}", f"{math.sqrt(x):.2f}") for x in (2, 30, 75, 140)], cols=4)
    ws.section("Problem solving")
    ws.question("Between which two whole numbers is √50?", "7 and 8", space=30)


def triangular(ws):
    ws.section("Practice")
    tri = [k * (k + 1) // 2 for k in range(1, 13)]
    P(ws, "Answer these.", [("Write down the first 10 triangular numbers.", ", ".join(map(str, tri[:10]))),
                            ("What is the 12th triangular number?", "78"),
                            ("Which of 21, 30, 36, 40, 45 are triangular?", "21, 36, 45")], cols=1)
    ws.question("Draw the next pattern of dots. How many dots does it have?", "10 dots (a triangle with rows 1, 2, 3, 4)",
                figure=scene([("dot", (0, 0)), ("dot", (2, 0)), ("dot", (3, 0)), ("dot", (2.5, 0.8)), ("dot", (5, 0)),
                              ("dot", (6, 0)), ("dot", (7, 0)), ("dot", (5.5, 0.8)), ("dot", (6.5, 0.8)), ("dot", (6, 1.6))],
                             pad=10), fig_w=170, fig_h=60, space=40)
    ws.section("Problem solving")
    ws.question("Show that adding two consecutive triangular numbers gives a square number, for three examples.",
                "1 + 3 = 4, 3 + 6 = 9, 6 + 10 = 16", space=45)


def rational(ws):
    ws.section("Practice")
    P(ws, "Is each number rational or irrational?", [("[[3//4]]", "rational"), ("√2", "irrational"), ("0.{.3}", "rational"),
                                                     ("π", "irrational"), ("√16", "rational (= 4)"), ("−5", "rational"),
                                                     ("√3 × √3", "rational (= 3)"), ("1 + √5", "irrational")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why 0.1{.6} is rational.", "It is a recurring decimal, so it can be written as a fraction: [[1//6]].",
                space=40)
    ws.question("Write down an irrational number between 3 and 4.", "e.g. √10 or π", space=30)


# ==========================================================================
# Lines
# ==========================================================================
def parallel(ws, perp=False):
    ws.section("Practice")
    if not perp:
        lines = {"A": [(0, 0), (3, 3)], "B": [(4, 0), (7, 3)], "C": [(0, 5), (4, 5)], "D": [(5, 7), (9, 7)],
                 "E": [(8, 1), (6, 5)], "F": [(10, 0), (8, 4)]}
        ans = "A and B, C and D, E and F"
        prompt = "Which pairs of lines are parallel?"
    else:
        lines = {"A": [(0, 1), (4, 1)], "B": [(2, 0), (2, 4)], "C": [(5, 0), (7, 2)], "D": [(8, 0), (6, 2)],
                 "E": [(1, 6), (5, 7)], "F": [(9, 4), (10, 8)]}
        ans = "A and B, C and D"
        prompt = "Which pairs of lines are perpendicular (meet or would meet at right angles)?"
    items = [("grid", 0, 11, 0, 9)]
    for k, (p, q) in lines.items():
        items += [("seg", p, q), ("text", ((p[0] + q[0]) / 2 - 0.4, (p[1] + q[1]) / 2 + 0.4), k)]
    ws.question(prompt, ans, figure=scene(items, pad=6), fig_w=300, fig_h=240, fig_pos="below", space=5)
    word = "perpendicular" if perp else "parallel"
    ws.question(f"On the grid, draw a line {word} to the line shown, through the point P.",
                f"check: the new line is {word} to the given line and passes through P",
                figure=scene([("grid", 0, 10, 0, 6), ("seg", (1, 1), (4, 3)), ("dot", (6, 2)), ("label", (6, 2), "P", "S")], pad=6),
                fig_w=260, fig_h=160, fig_pos="below", space=5)
    ws.section("Problem solving")
    ws.question(f"Name two {word} lines you can see in your classroom.", "e.g. " + ("opposite edges of a door" if not perp else
                                                                                   "the edge of a desk and a table leg"),
                space=35)


# ==========================================================================
# Percentages
# ==========================================================================
def pct_change(ws):
    ws.section("Practice")
    cases = [(50, 60), (80, 100), (200, 150), (40, 46), (250, 200), (1.20, 1.50)]
    def ch(a, b):
        p = (D(str(b)) - D(str(a))) / D(str(a)) * 100
        return f"{'increase' if p > 0 else 'decrease'} of {fmt(abs(p))}%"
    P(ws, "Work out the percentage change.", [(f"{fmt(a)} to {fmt(b)}", ch(a, b)) for a, b in cases], cols=2)
    ws.section("Problem solving")
    ws.question("A car bought for £12 000 is sold for £9000. Find the percentage loss.", "25%", space=35)
    ws.question("Ben's wage rises from £8.50 to £9.18 an hour. Find the percentage increase.", "8%", space=35)


def pct_noncalc(ws):
    ws.section("Practice")
    qs = [(10, 70), (50, 36), (25, 80), (5, 60), (75, 120), (20, 45), (1, 300), (15, 40), (30, 90), (12.5, 64), (35, 200), (60, 25)]
    P(ws, "Work out without a calculator", [(f"{fmt(p)}% of {a}", fmt(D(str(p)) * a / 100)) for p, a in qs], cols=4)
    ws.section("Problem solving")
    ws.question("Explain how to find 35% of £60 using 10% and 5%.", "10% = £6, so 30% = £18; 5% = £3; 35% = £21", space=40)


def pct_calc(ws):
    ws.section("Practice")
    qs = [(17, 340), (23, 85), (8.5, 120), (62, 47), (3.2, 750), (115, 64)]
    P(ws, "Use a calculator to work out", [(f"{fmt(p)}% of {a}", fmt(D(str(p)) * a / 100)) for p, a in qs], cols=3)
    ws.section("Problem solving")
    ws.question("VAT of 20% is added to a bill of £347.50. Find the VAT.", "£69.50", space=30)


def compound(ws):
    ws.section("Practice")
    cases = [(1000, 5, 2), (2500, 3, 4), (500, 10, 3), (8000, 2.5, 5)]
    P(ws, "Work out the value after compound interest.", [(f"{m(P_)} at {fmt(r)}% per year for {n} years",
                                                           m(D(P_) * (1 + D(str(r)) / 100) ** n)) for P_, r, n in cases], cols=1)
    P(ws, "Work out the value after depreciation.", [("A car worth £15 000 loses 12% per year for 3 years.",
                                                      m(D(15000) * D("0.88") ** 3))], cols=1)
    ws.section("Problem solving")
    ws.question("Which is better over 3 years: 4% compound interest or 4.2% simple interest on £1000?",
                f"compound: {m(D(1000) * D('1.04') ** 3)}; simple: £1126. Simple interest is better here.", space=45)


def simple(ws):
    ws.section("Practice")
    cases = [(1000, 4, 3), (500, 6, 2), (2400, 2.5, 4), (750, 3, 5)]
    P(ws, "Work out the simple interest earned.", [(f"{m(P_)} at {fmt(r)}% per year for {n} years",
                                                    m(D(P_) * D(str(r)) / 100 * n)) for P_, r, n in cases], cols=2)
    ws.section("Problem solving")
    ws.question("How many years does it take £800 to earn £120 at 3% simple interest?", "£24 per year, so 5 years", space=40)


def expressing(ws):
    ws.section("Practice")
    cases = [(12, 50), (18, 24), (45, 60), (7, 20), (33, 150), (90, 120)]
    P(ws, "Write the first number as a percentage of the second.", [(f"{a} out of {b}", f"{fmt(D(a) * 100 / D(b))}%")
                                                                    for a, b in cases], cols=3)
    ws.section("Problem solving")
    ws.question("In a test, Sam got 34 out of 40 and Mia got 41 out of 50. Who did better?", "Sam 85%, Mia 82%: Sam", space=40)


def inc_dec(ws):
    ws.section("Practice")
    P(ws, "Increase", [(f"{a} by {p}%", fmt(D(a) * (100 + D(p)) / 100)) for a, p in [(60, "10"), (250, "20"), (80, "15"), (45, "4")]],
      cols=2)
    P(ws, "Decrease", [(f"{a} by {p}%", fmt(D(a) * (100 - D(p)) / 100)) for a, p in [(90, "10"), (300, "25"), (64, "5"), (120, "35")]],
      cols=2)
    ws.section("Problem solving")
    ws.question("A price rises by 10% then falls by 10%. Is it back to the original price? Explain.",
                "No: e.g. £100 → £110 → £99. The 10% decrease is of a bigger amount.", space=45)


def multipliers(ws):
    ws.section("Practice")
    P(ws, "Write down the multiplier for", [("an increase of 20%", "1.2"), ("a decrease of 15%", "0.85"), ("an increase of 3%", "1.03"),
                                            ("a decrease of 40%", "0.6"), ("an increase of 120%", "2.2"), ("a decrease of 2.5%", "0.975")],
      cols=3)
    P(ws, "Use a multiplier to work out", [("£450 increased by 18%", "£531"), ("£72 decreased by 35%", "£46.80"),
                                           ("£1200 increased by 7.5%", "£1290")], cols=3)
    ws.section("Problem solving")
    ws.question("What single multiplier gives an increase of 10% followed by a decrease of 20%?", "1.1 × 0.8 = 0.88", space=40)


def reverse(ws):
    ws.section("Practice")
    P(ws, "Find the original price.", [("after a 20% increase it is £60", "£50"), ("after a 25% decrease it is £36", "£48"),
                                       ("after 20% VAT is added it is £84", "£70"), ("after a 15% discount it is £170", "£200"),
                                       ("after a 5% pay rise it is £21 000", "£20 000"), ("after a 40% reduction it is £27", "£45")],
      cols=2)
    ws.section("Problem solving")
    ws.question("A jacket costs £48 in a 20% off sale. Jo says the original price was £57.60. Explain her mistake.",
                "She added 20% of £48. £48 is 80% of the original, so the original is £48 ÷ 0.8 = £60.", space=45)


SHEETS = [
    ({"slug": "money-mixed"}, money_mixed),
    ({"slug": "multiplication-grid-method"}, grid_method), ({"slug": "multiplication-column-method"}, column_method),
    ({"slug": "multiplication-end-number"}, end_number), ({"slug": "multiplication-by-10-100-etc"}, by_10),
    ({"slug": "multiplication-powers-of-10"}, powers_10), ({"slug": "multiplication-decimals"}, mult_decimals),
    ({"slug": "multiplication-times-tables"}, times_tables),
    ({"slug": "negatives-addition-subtractions"}, neg_addsub), ({"slug": "negatives-multiplication"}, neg_mult),
    ({"slug": "negatives-division"}, neg_div), ({"slug": "negatives-ordering"}, neg_order), ({"slug": "negatives-real-life"}, neg_real),
    ({"slug": "number-best-buys"}, best_buys), ({"slug": "number-bodmas-order-of-operations"}, bodmas),
    ({"slug": "number-cube-numbers-and-cubing"}, cubes), ({"slug": "number-cube-root"}, cube_root),
    ({"slug": "number-currency"}, currency), ({"slug": "number-estimation"}, estimation), ({"slug": "number-factors"}, factors),
    ({"slug": "number-midpoint-of-two-numbers"}, midpoint_num), ({"slug": "number-common-multiples-lcm"}, lcm_q),
    ({"slug": "number-common-factors-hcf"}, hcf_q), ({"slug": "number-multiples"}, multiples),
    ({"slug": "number-ordering-numbers"}, ordering_nums), ({"slug": "number-odd-and-even-numbers"}, odd_even),
    ({"slug": "number-place-value"}, place_value), ({"slug": "number-using-calculations"}, using_calcs),
    ({"slug": "number-product-of-primes"}, pf), ({"slug": "number-product-of-primes-squares-cubes"}, pf_squares),
    ({"slug": "number-product-of-primes-lcm-hcf"}, pf_lcm_hcf), ({"slug": "number-prime-numbers"}, primes),
    ({"slug": "number-square-numbers-and-squaring"}, squares), ({"slug": "number-square-root"}, sq_root),
    ({"slug": "number-triangular-numbers"}, triangular), ({"slug": "number-rational-irrational"}, rational),
    ({"slug": "parallel-lines"}, parallel), ({"slug": "perpendicular-lines"}, lambda ws: parallel(ws, True)),
    ({"slug": "percentages-change"}, pct_change), ({"slug": "percentages-of-an-amount-non-calc"}, pct_noncalc),
    ({"slug": "percentages-of-an-amount-calc"}, pct_calc), ({"slug": "percentages-compound-interest"}, compound),
    ({"slug": "percentages-simple-interest"}, simple), ({"slug": "percentages-expressing-as"}, expressing),
    ({"slug": "percentages-increasing-and-decreasing"}, inc_dec), ({"slug": "percentages-multipliers"}, multipliers),
    ({"slug": "percentages-reverse"}, reverse),
]
