"""Rounding (6), standard form (4), subtraction, surds (4), time, units (12) and
use of a calculator. Answers are calculated with Decimal arithmetic."""
import math
from decimal import Decimal as D, ROUND_HALF_UP, ROUND_FLOOR, ROUND_CEILING
from engine.draw import column_calc
from topics.number_decimals import fmt


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def rnd(x, places):
    return fmt(D(str(x)).quantize(D(1).scaleb(-places), ROUND_HALF_UP))


def to_nearest(x, k):
    return fmt((D(str(x)) / k).quantize(D(1), ROUND_HALF_UP) * k)


def sig(x, s):
    x = D(str(x))
    if x == 0:
        return "0"
    e = x.adjusted()
    q = D(1).scaleb(e - s + 1)
    v = x.quantize(q, ROUND_HALF_UP) if e - s + 1 <= 0 else (x / q).quantize(D(1), ROUND_HALF_UP) * q
    return fmt(v)


def sf(x):
    """Standard form markup, e.g. 4.5 × 10^{6}."""
    x = D(str(x))
    e = x.adjusted()
    m = fmt(x.scaleb(-e))
    return f"{m} × 10^{{{e}}}".replace("-", "−")


# ==========================================================================
# Rounding
# ==========================================================================
def round_whole(ws):
    ws.section("Practice")
    xs = [4.7, 12.3, 8.5, 19.62, 103.49, 0.8, 56.5, 299.7]
    P(ws, "Round to the nearest whole number.", [(fmt(D(str(x))), to_nearest(x, 1)) for x in xs], cols=4)
    ws.section("Problem solving")
    ws.question("Write down a number with one decimal place that rounds to 7.", "e.g. 6.5 to 7.4", space=30)
    ws.question("A plank is 2.6 m long. Sam says it is 3 m to the nearest metre. Is he right?", "Yes: 2.6 rounds up to 3.", space=35)


def round_10(ws, k=10):
    ws.section("Practice")
    xs = [43, 87, 125, 352, 1006, 4995, 75, 68.2] if k == 10 else [340, 782, 1250, 2049, 3961, 950, 12345, 49]
    P(ws, f"Round to the nearest {k}.", [(fmt(D(str(x))), to_nearest(x, k)) for x in xs], cols=4)
    ws.section("Problem solving")
    lo, hi = (25, 34) if k == 10 else (250, 349)
    ws.question(f"A whole number rounds to {30 if k == 10 else 300} to the nearest {k}. Write down the smallest and largest it could be.",
                f"{lo} and {hi}", space=35)
    ws.question(f"A stadium holds 48 562 people. Round this to the nearest {k}.", to_nearest(48562, k), space=30)


def round_dp(ws):
    ws.section("Practice")
    P(ws, "Round to 1 decimal place.", [(x, rnd(x, 1)) for x in ["3.47", "12.82", "0.65", "9.96", "4.049", "27.351"]], cols=3)
    P(ws, "Round to 2 decimal places.", [(x, rnd(x, 2)) for x in ["3.476", "0.0849", "12.995", "6.4049", "1.1111", "8.705"]], cols=3)
    ws.section("Problem solving")
    ws.question("Why should 9.96 rounded to 1 d.p. be written as 10.0, not 10?", "The final zero shows it is correct to 1 d.p.",
                space=35)
    ws.question("Use a calculator to work out √50 and give your answer to 2 d.p.", f"{math.sqrt(50):.2f}", space=30)


def round_sf(ws):
    ws.section("Practice")
    P(ws, "Round to 1 significant figure.", [(x, sig(x, 1)) for x in ["47", "382", "0.068", "6512", "0.0049", "95"]], cols=3)
    P(ws, "Round to 2 significant figures.", [(x, sig(x, 2)) for x in ["347", "0.04826", "12 650".replace(" ", ""), "7.849", "0.0835",
                                                                      "183 400".replace(" ", "")]], cols=3)
    P(ws, "Round to 3 significant figures.", [(x, sig(x, 3)) for x in ["3.14159", "0.0052786", "45 678".replace(" ", "")]], cols=3)
    ws.section("Problem solving")
    ws.question("Explain why the zeros in 0.0049 are not significant figures.", "They only show the place value; the first "
                "significant figure is the 4.", space=40)


def round_hilo(ws):
    ws.section("Practice")
    P(ws, "Write down the smallest and largest values each number could be (the lower and upper bounds).", [
        ("40, to the nearest 10", "35 and 45"), ("7.3, to 1 d.p.", "7.25 and 7.35"), ("600, to the nearest 100", "550 and 650"),
        ("2.48, to 2 d.p.", "2.475 and 2.485"), ("3000, to 1 s.f.", "2500 and 3500"), ("12 kg, to the nearest kg", "11.5 and 12.5 kg")],
      cols=2)
    ws.section("Problem solving")
    ws.question("A crowd is 2400, to the nearest 100. What is the largest whole number of people it could be?", "2449", space=35)


# ==========================================================================
# Standard form
# ==========================================================================
def std_form(ws):
    ws.section("Practice")
    xs = ["45000", "3200000", "0.0067", "800", "0.000052", "0.00031", "123000000", "0.9"]
    P(ws, "Write in standard form.", [(f"{int(D(x)):,}".replace(",", " ") if D(x) >= 1000 else x, sf(x)) for x in xs], cols=4)
    back = [("3.4 × 10^4", "34 000"), ("5 × 10^{−3}", "0.005"), ("7.25 × 10^6", "7 250 000"), ("9.1 × 10^{−5}", "0.000091")]
    P(ws, "Write as an ordinary number.", back, cols=2)
    ws.section("Problem solving")
    ws.question("Explain why 34 × 10^5 is not in standard form.", "The first number must be at least 1 and less than 10: 3.4 × 10^6.",
                space=35)
    ws.question("Order: 3.2 × 10^5, 4.1 × 10^4, 2.9 × 10^5, 1.5 × 10^6", "4.1 × 10^4, 2.9 × 10^5, 3.2 × 10^5, 1.5 × 10^6", space=35)


def std_op(ws, op):
    ws.section("Practice")
    if op == "×":
        pairs = [("3 × 10^4", "2 × 10^5", D(3e4) * D(2e5)), ("4 × 10^3", "6 × 10^2", D(4e3) * D(600)),
                 ("2.5 × 10^{−3}", "4 × 10^6", D("2.5e-3") * D(4e6)), ("7 × 10^{−2}", "3 × 10^{−4}", D("7e-2") * D("3e-4"))]
    elif op == "÷":
        pairs = [("8 × 10^6", "2 × 10^3", D(8e6) / D(2e3)), ("6 × 10^4", "3 × 10^{−2}", D(6e4) / D("3e-2")),
                 ("3 × 10^5", "6 × 10^2", D(3e5) / D(600)), ("9.6 × 10^{−3}", "3.2 × 10^{−5}", D("9.6e-3") / D("3.2e-5"))]
    else:
        pairs = [("3 × 10^4", "2 × 10^3", D(3e4) + D(2e3)), ("5.2 × 10^5", "4.8 × 10^5", D("5.2e5") + D("4.8e5")),
                 ("6 × 10^{−3}", "4 × 10^{−4}", D("6e-3") + D("4e-4")), ("7.5 × 10^6", "2.5 × 10^5", D("7.5e6") - D("2.5e5"))]
    ops = ["+", "+", "+", "−"] if op == "+" else [op] * 4
    P(ws, "Work out. Give your answers in standard form.", [(f"({a}) {o} ({b})", sf(v)) for (a, b, v), o in zip(pairs, ops)], cols=2)
    extra = {"×": [("(5 × 10^3) × (3 × 10^4)", sf(D(15e7))), ("(1.2 × 10^5) × (4 × 10^2)", sf(D("4.8e7"))),
                   ("(6 × 10^{−3}) × (5 × 10^{−2})", sf(D("3e-4"))), ("(9 × 10^7) × (2 × 10^{−3})", sf(D("1.8e5")))],
             "÷": [("(9 × 10^8) ÷ (3 × 10^2)", sf(D(3e6))), ("(4.8 × 10^5) ÷ (1.2 × 10^{−2})", sf(D(4e7))),
                   ("(2 × 10^3) ÷ (8 × 10^5)", sf(D("2.5e-3"))), ("(7.5 × 10^{−4}) ÷ (2.5 × 10^{−6})", sf(D(300)))],
             "+": [("(4 × 10^5) + (3 × 10^4)", sf(D(43e4))), ("(8.1 × 10^3) − (6 × 10^2)", sf(D(7500))),
                   ("(9 × 10^4) + (2 × 10^4)", sf(D(11e4))), ("(3 × 10^{−2}) − (5 × 10^{−3})", sf(D("2.5e-2")))]}[op]
    P(ws, "Work out. Give your answers in standard form.", extra, cols=2)
    ws.section("Problem solving")
    if op == "×":
        ws.question("A grain of sand has a mass of 6 × 10^{−4} g. Find the mass of 5 × 10^6 grains.", "3 × 10^3 g (3 kg)", space=40)
    elif op == "÷":
        ws.question("The Earth is about 1.5 × 10^8 km from the Sun. Light travels 3 × 10^5 km per second. How long does light take?",
                    "500 seconds (5 × 10^2 s)", space=45)
    else:
        ws.question("Explain why you can't just add the front numbers of 3 × 10^4 and 2 × 10^3.", "The powers are different, so the "
                    "digits are worth different amounts. Write them as ordinary numbers (or the same power) first.", space=45)


# ==========================================================================
# Subtraction, time, calculator
# ==========================================================================
def subtraction(ws):
    ws.section("Practice")
    pairs = [(86, 34), (75, 48), (523, 241), (604, 278), (1000, 365), (4382, 1597), (7005, 2648), (850, 199)]
    ws.figures("Use the column method to work out", [column_calc([a, b], "−") for a, b in pairs], [str(a - b) for a, b in pairs],
               cols=4, fig_h=66, answer_line=False)
    ws.section("Problem solving")
    ws.question("A school has 1204 pupils. 387 are in the sixth form. How many are not?", "817", space=40)
    ws.question("Check your answer to 604 − 278 by adding.", "326 + 278 = 604", space=30)


def time_calcs(ws):
    ws.section("Practice")
    P(ws, "Work out", [("How many minutes in 3 hours?", "180"), ("How many seconds in 5 minutes?", "300"),
                       ("2 hours 45 minutes in minutes", "165"), ("150 minutes in hours and minutes", "2 h 30 min"),
                       ("Time from 09:35 to 11:10", "1 h 35 min"), ("Time from 14:50 to 17:25", "2 h 35 min"),
                       ("45 minutes after 10:30", "11:15"), ("1 h 40 min before 13:15", "11:35"), ("20:45 in 12-hour time", "8:45 pm")], cols=2)
    ws.section("Problem solving")
    ws.question("A film starts at 18:40 and lasts 2 hours 15 minutes. When does it finish?", "20:55", space=35)
    ws.question("Write 1.25 hours in hours and minutes.", "1 hour 15 minutes", space=30)


def calculator(ws):
    ws.section("Practice")
    P(ws, "Use a calculator. Give answers to 2 d.p. where needed.", [
        ("[[4.5 + 7.2//3.1]]", f"{11.7 / 3.1:.2f}"), ("√(12.5^2 − 3.5^2)", "12"), ("[[3.2^3//0.8]]", "40.96"),
        ("(2.4 + 1.6)^2 × 3.5", "56"), ("[[15.6 × 2.3//4.1 + 1.9]]", f"{15.6 * 2.3 / 6:.2f}"), ("√[[50//π]]", f"{math.sqrt(50 / math.pi):.2f}")],
      cols=3)
    ws.section("Problem solving")
    ws.question("Ali types 4.5 + 7.2 ÷ 3.1 into his calculator and gets 6.82. Why is this not the answer to [[4.5 + 7.2//3.1]]?",
                "The calculator divides first. He needs brackets: (4.5 + 7.2) ÷ 3.1 = 3.77", space=45)
    ws.question("Use estimation to check your answer to [[15.6 × 2.3//4.1 + 1.9]].", "[[16 × 2//6]] ≈ 5.3", space=35)


# ==========================================================================
# Surds
# ==========================================================================
def surds_intro(ws):
    ws.section("Practice")
    P(ws, "Simplify", [("√12", "2√3"), ("√18", "3√2"), ("√50", "5√2"), ("√48", "4√3"), ("√75", "5√3"), ("√200", "10√2"),
                       ("√2 × √8", "4"), ("√3 × √12", "6"), ("√5 × √5", "5"), ("[[√50//√2]]", "5"), ("3√2 × 4√2", "24"),
                       ("2√3 × √6", "6√2")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why √9 is not a surd but √10 is.", "√9 = 3 exactly; √10 is irrational.", space=35)


def surds_add(ws):
    ws.section("Practice")
    P(ws, "Simplify", [("3√2 + 5√2", "8√2"), ("7√5 − 2√5", "5√5"), ("√12 + √27", "5√3"), ("√50 − √8", "3√2"),
                       ("2√18 + √32", "10√2"), ("√75 − √12 + √3", "4√3")], cols=3)
    ws.section("Problem solving")
    ws.question("Sam says √2 + √3 = √5. Show he is wrong.", "√2 + √3 ≈ 3.15 but √5 ≈ 2.24", space=35)


def surds_rat(ws):
    ws.section("Practice")
    P(ws, "Rationalise the denominator and simplify.", [("[[1//√2]]", "[[√2//2]]"), ("[[6//√3]]", "2√3"), ("[[10//√5]]", "2√5"),
                                                        ("[[3//2√3]]", "[[√3//2]]"), ("[[1//1 + √2]]", "√2 − 1"),
                                                        ("[[4//3 − √5]]", "3 + √5")], cols=3)
    ws.section("Problem solving")
    ws.question("Why do we multiply [[1//1 + √2]] by [[1 − √2//1 − √2]]?", "(1 + √2)(1 − √2) = 1 − 2 = −1, which has no surd.", space=40)


def surds_expand(ws):
    ws.section("Practice")
    P(ws, "Expand and simplify", [("√2(3 + √2)", "3√2 + 2"), ("√3(√3 − 4)", "3 − 4√3"), ("(2 + √3)(1 + √3)", "5 + 3√3"),
                                  ("(√5 + 2)(√5 − 2)", "1"), ("(3 + √2)^2", "11 + 6√2"), ("(1 − √7)^2", "8 − 2√7")], cols=3)
    ws.section("Problem solving")
    ws.question("A rectangle has sides (3 + √2) cm and (3 − √2) cm. Show its area is a whole number.", "9 − 2 = 7 cm^2", space=40)


# ==========================================================================
# Units
# ==========================================================================
def units_types(ws):
    ws.section("Practice")
    P(ws, "Write down a sensible metric unit to measure", [("the length of a pencil", "cm"), ("the mass of an apple", "g"),
                                                           ("the distance from London to Leeds", "km"), ("water in a bath", "litres"),
                                                           ("medicine in a spoon", "ml"), ("the mass of a car", "kg or tonnes")], cols=2)
    P(ws, "Is each unit metric or imperial?", [("pound", "imperial"), ("kilogram", "metric"), ("mile", "imperial"),
                                               ("millilitre", "metric"), ("foot", "imperial"), ("pint", "imperial")], cols=3)
    ws.section("Problem solving")
    ws.question("Name an imperial unit still often used in the UK and say what it measures.", "e.g. miles (distance), pints (milk/beer)",
                space=35)


def metric(ws, kind):
    ws.section("Practice")
    qs = {"length": [("3 m to cm", "300 cm"), ("45 mm to cm", "4.5 cm"), ("2.5 km to m", "2500 m"), ("650 cm to m", "6.5 m"),
                     ("8 cm to mm", "80 mm"), ("3400 m to km", "3.4 km"), ("0.7 m to mm", "700 mm"), ("12 mm to m", "0.012 m")],
          "mass": [("4 kg to g", "4000 g"), ("2500 g to kg", "2.5 kg"), ("0.6 kg to g", "600 g"), ("3 tonnes to kg", "3000 kg"),
                   ("750 g to kg", "0.75 kg"), ("1500 kg to tonnes", "1.5 tonnes"), ("5000 mg to g", "5 g"), ("0.25 kg to g", "250 g")],
          "capacity": [("2 l to ml", "2000 ml"), ("750 ml to l", "0.75 l"), ("3.5 l to ml", "3500 ml"), ("250 ml to l", "0.25 l"),
                       ("4 l to cl", "400 cl"), ("60 cl to l", "0.6 l"), ("1.2 l to ml", "1200 ml"), ("5 ml to l", "0.005 l")]}[kind]
    P(ws, "Convert", qs, cols=4)
    ws.section("Problem solving")
    ps = {"length": ("A rope is 3.2 m long. 85 cm is cut off. How much is left?", "2.35 m"),
          "mass": ("A bag holds 1.5 kg of flour. A recipe needs 350 g. How much is left?", "1.15 kg"),
          "capacity": ("How many 250 ml glasses can be filled from a 2 l bottle?", "8")}[kind]
    ws.question(ps[0], ps[1], space=40)


def imperial(ws, kind):
    ws.section("Practice")
    qs = {"length": [("3 feet to inches", "36 inches"), ("5 yards to feet", "15 feet"), ("48 inches to feet", "4 feet"),
                     ("2 miles to yards", "3520 yards"), ("9 feet to yards", "3 yards")],
          "mass": [("3 pounds to ounces", "48 ounces"), ("2 stone to pounds", "28 pounds"), ("64 ounces to pounds", "4 pounds"),
                   ("5 stone 3 pounds to pounds", "73 pounds")],
          "capacity": [("4 gallons to pints", "32 pints"), ("20 pints to gallons", "2.5 gallons"), ("3 quarts to pints", "6 pints")]}[kind]
    key = {"length": "12 inches = 1 foot, 3 feet = 1 yard, 1760 yards = 1 mile",
           "mass": "16 ounces = 1 pound, 14 pounds = 1 stone",
           "capacity": "8 pints = 1 gallon, 2 pints = 1 quart"}[kind]
    P(ws, f"Use: {key}. Convert", qs, cols=2)
    ws.section("Problem solving")
    ps = {"length": ("A room is 15 feet long. How many yards is that?", "5 yards"),
          "mass": ("A baby weighs 7 pounds 8 ounces. How many ounces is that?", "120 ounces"),
          "capacity": ("A milkman delivers 3 pints a day. How many gallons in a week?", "21 pints = 2.625 gallons")}[kind]
    ws.question(ps[0], ps[1], space=40)


def m2i(ws, kind):
    ws.section("Practice")
    if kind == "length":
        key, qs = "5 miles ≈ 8 km, 1 inch ≈ 2.5 cm, 1 foot ≈ 30 cm", [("40 km to miles", "25 miles"), ("15 miles to km", "24 km"),
                                                                        ("10 inches to cm", "25 cm"), ("90 cm to feet", "3 feet"),
                                                                        ("100 km to miles", "62.5 miles")]
        ps = ("A sign says the next town is 30 miles away. How far is that in km?", "48 km")
    elif kind == "mass":
        key, qs = "1 kg ≈ 2.2 pounds, 1 ounce ≈ 28 g", [("5 kg to pounds", "11 pounds"), ("44 pounds to kg", "20 kg"),
                                                        ("3 ounces to grams", "84 g"), ("140 g to ounces", "5 ounces")]
        ps = ("Which is heavier: 10 kg of potatoes or 20 pounds of potatoes?", "10 kg ≈ 22 pounds, so 10 kg")
    else:
        key, qs = "1 gallon ≈ 4.5 litres, 1 pint ≈ 0.57 litres", [("4 gallons to litres", "18 litres"), ("27 litres to gallons", "6 gallons"),
                                                                  ("10 pints to litres", "5.7 litres"), ("2.85 litres to pints", "5 pints")]
        ps = ("A car's tank holds 45 litres. About how many gallons is that?", "10 gallons")
    P(ws, f"Use: {key}. Convert (approximately)", qs, cols=2)
    ws.section("Problem solving")
    ws.question(ps[0], ps[1], space=40)


def conv_area(ws, vol=False):
    ws.section("Practice")
    if not vol:
        P(ws, "Convert", [("3 m^2 to cm^2", "30 000 cm^2"), ("5 cm^2 to mm^2", "500 mm^2"), ("45 000 cm^2 to m^2", "4.5 m^2"),
                          ("800 mm^2 to cm^2", "8 cm^2"), ("2 km^2 to m^2", "2 000 000 m^2"), ("0.5 m^2 to cm^2", "5000 cm^2")], cols=3)
        ps = ("Explain why 1 m^2 = 10 000 cm^2, not 100 cm^2.", "A 1 m square is 100 cm by 100 cm = 10 000 cm^2.")
    else:
        P(ws, "Convert", [("2 m^3 to cm^3", "2 000 000 cm^3"), ("3 cm^3 to mm^3", "3000 mm^3"), ("500 000 cm^3 to m^3", "0.5 m^3"),
                          ("4000 mm^3 to cm^3", "4 cm^3"), ("1500 cm^3 to litres", "1.5 litres"), ("0.2 m^3 to litres", "200 litres")],
          cols=3)
        ps = ("A tank is 2 m by 1 m by 0.5 m. How many litres does it hold?", "1 m^3 = 1000 litres")
    ws.section("Problem solving")
    ws.question(ps[0], ps[1], space=40)


SHEETS = [
    ({"slug": "rounding-to-whole-numbers"}, round_whole), ({"slug": "rounding-to-nearest-10"}, round_10),
    ({"slug": "rounding-to-nearest-100"}, lambda ws: round_10(ws, 100)), ({"slug": "rounding-to-decimal-places"}, round_dp),
    ({"slug": "rounding-significant-figures"}, round_sf), ({"slug": "rounding-highest-lowest"}, round_hilo),
    ({"slug": "standard-form"}, std_form), ({"slug": "standard-form-addition"}, lambda ws: std_op(ws, "+")),
    ({"slug": "standard-form-multiplication"}, lambda ws: std_op(ws, "×")),
    ({"slug": "standard-form-division"}, lambda ws: std_op(ws, "÷")),
    ({"slug": "subtraction"}, subtraction), ({"slug": "time-calculations"}, time_calcs), ({"slug": "use-of-a-calculator"}, calculator),
    ({"slug": "surds-intro-rules-simplifying"}, surds_intro), ({"slug": "surds-addition-subtraction"}, surds_add),
    ({"slug": "surds-rationalising-denominators"}, surds_rat), ({"slug": "surds-expanding-brackets"}, surds_expand),
    ({"slug": "units-types-of-metric-and-imperial-unit"}, units_types),
    ({"slug": "units-metric-units-length"}, lambda ws: metric(ws, "length")),
    ({"slug": "units-metric-units-mass"}, lambda ws: metric(ws, "mass")),
    ({"slug": "units-metric-units-capacity"}, lambda ws: metric(ws, "capacity")),
    ({"slug": "units-converting-imperial-units-for-length"}, lambda ws: imperial(ws, "length")),
    ({"slug": "units-converting-imperial-units-for-mass"}, lambda ws: imperial(ws, "mass")),
    ({"slug": "units-converting-imperial-units-for-capacity"}, lambda ws: imperial(ws, "capacity")),
    ({"slug": "units-metric-to-imperial-length"}, lambda ws: m2i(ws, "length")),
    ({"slug": "units-metric-to-imperial-mass"}, lambda ws: m2i(ws, "mass")),
    ({"slug": "units-metric-to-imperial-capacity"}, lambda ws: m2i(ws, "capacity")),
    ({"slug": "units-converting-areas"}, conv_area), ({"slug": "units-converting-volumes"}, lambda ws: conv_area(ws, True)),
]
