"""Fractions, decimals and percentages (11) and fractions (16).
All answers are worked out with Python's exact Fraction type."""
import math
from fractions import Fraction as Fr
from decimal import Decimal as D
from engine.geo import scene, table


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def f(x, mixed=True):
    """A fraction in worksheet markup: [[3//4]], or a mixed number 2[[1//3]]."""
    x = Fr(x)
    sign = "−" if x < 0 else ""
    x = abs(x)
    if x.denominator == 1:
        return sign + str(x.numerator)
    if mixed and x > 1:
        w, r = divmod(x.numerator, x.denominator)
        return f"{sign}{w}[[{r}//{x.denominator}]]"
    return f"{sign}[[{x.numerator}//{x.denominator}]]"


def fr(s):
    """Read '3/4', '2 1/3' or '5' into a Fraction."""
    s = s.strip()
    if " " in s:
        w, p = s.split()
        return int(w) + Fr(p)
    return Fr(s)


def show(s):
    """'2 1/3' -> 2[[1//3]], '3/4' -> [[3//4]] (for questions)."""
    s = s.strip()
    if " " in s:
        w, p = s.split()
        a, b = p.split("/")
        return f"{w}[[{a}//{b}]]"
    if "/" in s:
        a, b = s.split("/")
        return f"[[{a}//{b}]]"
    return s


def dec(x):
    s = format(D(x.numerator) / D(x.denominator), "f") if isinstance(x, Fr) else format(D(str(x)).normalize(), "f")
    return s


def pct(x):
    v = D(str(x)) * 100 if not isinstance(x, Fr) else D(x.numerator) * 100 / D(x.denominator)
    return format(v.normalize(), "f") + "%"


# ==========================================================================
# FDP
# ==========================================================================
def p2d(ws):
    ws.section("Practice")
    ps = ["35", "70", "7", "4", "120", "12.5", "0.5", "99", "250", "3.5", "100", "62"]
    P(ws, "Write each percentage as a decimal.", [(p + "%", format((D(p) / 100).normalize(), "f")) for p in ps], cols=4)
    ws.section("Problem solving")
    ws.question("Sam says 5% = 0.5. Explain his mistake.", "5% = 5 ÷ 100 = 0.05. 0.5 is 50%.", space=40)
    ws.question("Which is bigger: 0.4 or 4%? Explain.", "0.4 = 40%, which is bigger than 4%.", space=35)
    ws.question("A shop adds 17.5% to a price. Write 17.5% as a decimal multiplier for the increase, and for the new price.",
                "0.175 for the increase; 1.175 for the new price", space=45)


def p2f(ws):
    ws.section("Practice")
    ps = ["50", "25", "75", "10", "40", "15", "64", "35", "12.5", "150", "2", "37.5"]
    P(ws, "Write each percentage as a fraction in its simplest form.",
      [(p + "%", f(Fr(D(p)) / 100)) for p in ps], cols=4)
    ws.section("Problem solving")
    ws.question("Explain how to write 45% as a fraction in its simplest form.", "45% = [[45//100]]; divide top and bottom "
                "by 5 to get [[9//20]].", space=40)
    ws.question("Order these: [[3//10]], 35%, [[1//4]].", "[[1//4]] (25%), [[3//10]] (30%), 35%", space=35)


def d2f(ws, calc=False):
    ws.section("Practice")
    ds = ["0.3", "0.7", "0.25", "0.08", "0.45", "0.125", "0.65", "1.4", "0.04", "2.75", "0.375", "0.9"] if not calc else \
         ["0.4375", "0.16", "2.85", "0.0625", "0.72", "0.875", "3.125", "0.68", "0.3125", "1.05", "0.024", "0.95"]
    P(ws, "Write each decimal as a fraction in its simplest form." + (" You may use a calculator." if calc else ""),
      [(d_, f(Fr(D(d_)))) for d_ in ds], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why 0.36 = [[9//25]].", "0.36 = [[36//100]]; dividing top and bottom by 4 gives [[9//25]].", space=40)
    if calc:
        ws.question("Use your calculator to write 0.3{.3} as a fraction. Explain how you could check without a calculator.",
                    "[[1//3]]; check: 1 ÷ 3 = 0.333...", space=40)


def d2p(ws):
    ws.section("Practice")
    ds = ["0.45", "0.06", "0.8", "1.3", "0.125", "0.003", "2", "0.99", "0.5", "0.075", "1.05", "0.01"]
    P(ws, "Write each decimal as a percentage.", [(d_, pct(d_)) for d_ in ds], cols=4)
    ws.section("Problem solving")
    ws.question("In a survey, 0.35 of people said yes. What percentage said no?", "65%", space=35)
    ws.question("Explain why 1.2 is more than 100%.", "1 whole is 100%, so 1.2 = 120%.", space=35)


def f2p(ws):
    ws.section("Practice")
    fs = ["3/4", "1/2", "7/20", "9/25", "3/8", "4/5", "1/3", "11/5", "17/50", "2/3", "13/40", "1/8"]
    def ans(s):
        x = fr(s)
        v = D(x.numerator) * 100 / D(x.denominator)
        if v == v.quantize(D("0.001")):
            return format(v.normalize(), "f") + "%"
        return f"{v:.1f}% (1 d.p.)"
    P(ws, "Write each fraction as a percentage.", [(show(s), ans(s)) for s in fs], cols=4)
    ws.section("Problem solving")
    ws.question("Sara scored 42 out of 60 in a test. What percentage did she score?", "[[42//60]] = 70%", space=40)
    ws.question("Which is the better score: 17 out of 20 or 21 out of 25?", "17/20 = 85%, 21/25 = 84%: 17 out of 20",
                space=40)


def f2d(ws, calc=False):
    ws.section("Practice")
    fs = ["1/4", "3/5", "7/8", "9/20", "1/3", "5/6", "2/9", "3/50", "11/4", "7/25"] if not calc else \
         ["7/16", "13/32", "5/7", "11/12", "19/40", "4/9", "23/8", "3/11", "17/64", "9/13"]
    def ans(s):
        x = fr(s)
        d_ = D(x.numerator) / D(x.denominator)
        q = d_.quantize(D("0.000001"))
        if q == d_:
            return format(d_.normalize(), "f")
        return f"{d_:.5f}... ({d_:.3f} to 3 d.p.)" if calc else {
            "1/3": "0.{.3}", "5/6": "0.8{.3}", "2/9": "0.{.2}"}.get(s, f"{d_:.3f}")
    P(ws, "Write each fraction as a decimal." + (" Give recurring answers to 3 d.p." if calc else ""),
      [(show(s), ans(s)) for s in fs], cols=5)
    ws.section("Problem solving")
    ws.question("Explain how to change [[3//8]] to a decimal without a calculator.",
                "Divide 3 by 8 (short division): 3.000 ÷ 8 = 0.375", space=45)


def key_eq(ws):
    ws.section("Practice")
    rows = [["Fraction", "Decimal", "Percentage"], ["[[1//2]]", "", ""], ["", "0.25", ""], ["", "", "75%"], ["[[1//10]]", "", ""],
            ["", "0.2", ""], ["", "", "33.3%"], ["[[2//3]]", "", ""], ["", "0.125", ""], ["", "", "1%"]]
    ans = "1/2 = 0.5 = 50%;  1/4 = 0.25 = 25%;  3/4 = 0.75 = 75%;  1/10 = 0.1 = 10%;  1/5 = 0.2 = 20%;  " \
          "1/3 = 0.333... = 33.3%;  2/3 = 0.666... = 66.7%;  1/8 = 0.125 = 12.5%;  1/100 = 0.01 = 1%"
    ws.question("Complete the table of key equivalents. Learn them!", ans,
                figure=table(rows, col_w=[100, 100, 100], row_h=22), fig_w=300, fig_h=230, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("Use the table to work out 25% of 48, [[1//3]] of 60 and 0.1 × 350.", "12, 20, 35", space=40)


def mixture(ws):
    ws.section("Practice")
    rows = [["Fraction", "Decimal", "Percentage"], ["[[3//5]]", "", ""], ["", "0.35", ""], ["", "", "8%"], ["[[7//4]]", "", ""],
            ["", "0.04", ""], ["", "", "62.5%"], ["[[19//20]]", "", ""], ["", "1.6", ""]]
    ws.question("Complete the table. Write fractions in their simplest form.",
                "3/5 = 0.6 = 60%;  7/20 = 0.35 = 35%;  2/25 = 0.08 = 8%;  7/4 = 1.75 = 175%;  1/25 = 0.04 = 4%;  "
                "5/8 = 0.625 = 62.5%;  19/20 = 0.95 = 95%;  8/5 = 1.6 = 160%",
                figure=table(rows, col_w=[100, 100, 100], row_h=22), fig_w=300, fig_h=210, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("Three shops offer discounts: [[1//4]] off, 0.2 off and 30% off. Which is the biggest discount?",
                "30% (the others are 25% and 20%)", space=40)


def ordering(ws):
    ws.section("Practice")
    sets = [["0.4", "45%", "3/10"], ["2/3", "0.6", "65%"], ["0.09", "1/10", "8%", "0.1"], ["1/8", "0.13", "12%"],
            ["3/4", "0.7", "72%", "4/5"], ["1.2", "115%", "11/10"]]
    def val(s):
        if s.endswith("%"):
            return Fr(D(s[:-1])) / 100
        return fr(s) if "/" in s else Fr(D(s))
    def order(s):
        return ",  ".join(show(x) for x in sorted(s, key=val))
    P(ws, "Write in order of size, smallest first.", [(",  ".join(show(x) for x in s), order(s)) for s in sets], cols=2)
    ws.section("Problem solving")
    ws.question("Explain the easiest way to order a list of fractions, decimals and percentages.",
                "Change them all to the same form (e.g. all decimals or all percentages), then compare.", space=40)


# ==========================================================================
# Fractions
# ==========================================================================
def calc_parts(pairs, op):
    out = []
    for a, b in pairs:
        x, y = fr(a), fr(b)
        r = {"+": x + y, "−": x - y, "×": x * y, "÷": x / y}[op]
        out.append((f"{show(a)} {op} {show(b)}", f(r)))
    return out


def add_same(ws):
    ws.section("Practice")
    P(ws, "Work out. Simplify your answers.", calc_parts([("2/7", "3/7"), ("1/5", "2/5"), ("3/8", "1/8"), ("4/9", "2/9"),
                                                         ("5/12", "1/12"), ("3/10", "5/10")], "+"), cols=3)
    P(ws, "Work out. Write improper answers as mixed numbers.", calc_parts([("4/5", "3/5"), ("7/8", "5/8"), ("5/6", "5/6"),
                                                                           ("6/7", "4/7"), ("7/9", "8/9"), ("9/10", "7/10")], "+"), cols=3)
    P(ws, "Work out", calc_parts([("5/7", "2/7"), ("7/9", "4/9"), ("11/12", "5/12")], "−"), cols=3)
    ws.section("Problem solving")
    ws.question("Ali writes [[2//5]] + [[1//5]] = [[3//10]]. Explain his mistake.",
                "He added the denominators. The denominator stays 5: [[3//5]].", space=40)
    ws.question("A pizza is cut into 8 slices. Jo eats [[3//8]] and Kim eats [[2//8]]. What fraction is left?", "[[3//8]]",
                space=40)


def add_diff(ws):
    ws.section("Practice")
    P(ws, "Work out. Simplify your answers.", calc_parts([("1/2", "1/4"), ("1/3", "1/6"), ("2/5", "1/10"), ("1/2", "1/3"),
                                                         ("3/4", "1/5"), ("2/3", "3/4")], "+"), cols=3)
    P(ws, "Work out", calc_parts([("3/4", "1/2"), ("5/6", "1/3"), ("4/5", "1/4"), ("7/8", "2/3")], "−"), cols=4)
    P(ws, "Work out", calc_parts([("1 1/2", "2 1/3"), ("3 3/4", "1 2/5"), ("4 1/6", "2 3/4"), ("2 2/3", "1 5/6")], "+")[:2] +
      calc_parts([("4 1/6", "2 3/4"), ("5 1/3", "1 5/6")], "−"), cols=2)
    ws.section("Problem solving")
    ws.question("A recipe needs [[3//4]] kg of flour for bread and [[2//3]] kg for cake. How much flour is that altogether?",
                "1[[5//12]] kg", space=45)
    ws.question("Find two different fractions that add up to [[5//6]].", "e.g. [[1//2]] + [[1//3]]", space=35)


def division(ws):
    ws.section("Practice")
    P(ws, "Work out. Simplify your answers.", calc_parts([("1/2", "1/4"), ("3/5", "2/3"), ("4/7", "2/7"), ("5/6", "1/3"),
                                                         ("2/9", "4"), ("6", "3/4")], "÷"), cols=3)
    P(ws, "Work out", calc_parts([("2 1/2", "1/4"), ("3 1/3", "2/3"), ("1 3/4", "2 1/2"), ("4 1/2", "1 1/8")], "÷"), cols=2)
    ws.section("Problem solving")
    ws.question("How many [[3//8]] litre glasses can be filled from a 6 litre jug?", "6 ÷ [[3//8]] = 16", space=40)
    ws.question("Explain why dividing by [[1//2]] doubles a number.", "There are two halves in every 1, so you get twice "
                "as many: ÷ [[1//2]] is the same as × 2.", space=40)


def equivalent(ws):
    ws.section("Practice")
    P(ws, "Find the missing number.", [("[[1//2]] = [[?//8]]", "4"), ("[[3//4]] = [[?//12]]", "9"), ("[[2//5]] = [[6//?]]", "15"),
                                       ("[[5//6]] = [[?//24]]", "20"), ("[[4//7]] = [[16//?]]", "28"), ("[[9//12]] = [[?//4]]", "3"),
                                       ("[[10//15]] = [[2//?]]", "3"), ("[[3//8]] = [[?//40]]", "15")], cols=4)
    P(ws, "Write three fractions that are equivalent to", [("[[1//3]]", "e.g. [[2//6]], [[3//9]], [[4//12]]"),
                                                          ("[[2//5]]", "e.g. [[4//10]], [[6//15]], [[8//20]]")], cols=2)
    ws.section("Problem solving")
    ws.question("Are [[6//9]] and [[8//12]] equivalent? Explain.", "Yes: both simplify to [[2//3]].", space=40)


def expressing(ws):
    ws.section("Practice")
    P(ws, "Write the first amount as a fraction of the second, in its simplest form.", [
        ("15 out of 40", "[[3//8]]"), ("12 out of 18", "[[2//3]]"), ("20 minutes of 1 hour", "[[1//3]]"),
        ("45p of £2", "[[9//40]]"), ("250 g of 1 kg", "[[1//4]]"), ("30 cm of 2 m", "[[3//20]]")], cols=2)
    ws.section("Problem solving")
    ws.question("In a class of 30 pupils, 18 are girls. What fraction are boys?", "[[12//30]] = [[2//5]]", space=40)
    ws.question("Explain why you must use the same units when writing one amount as a fraction of another.",
                "Otherwise the numbers don't compare like with like (e.g. 50p of £1 is [[1//2]], not [[50//1]]).", space=45)


def of_amount(ws):
    ws.section("Practice")
    qs = [("1/4", 20), ("1/3", 27), ("2/5", 40), ("3/4", 60), ("5/8", 48), ("2/3", 45), ("7/10", 90), ("3/5", 35), ("5/6", 72)]
    P(ws, "Work out", [(f"{show(a)} of {b}", f(fr(a) * b)) for a, b in qs], cols=3)
    ws.section("Problem solving")
    ws.question("A coat costs £80. In a sale it is [[1//4]] off. What is the sale price?", "£60", space=40)
    ws.question("Which is bigger: [[2//3]] of 60 or [[3//4]] of 52?", "40 and 39, so [[2//3]] of 60", space=40)


def original(ws):
    ws.section("Practice")
    qs = [("1/4", 8), ("1/3", 12), ("2/5", 12), ("3/4", 30), ("5/8", 25), ("2/3", 18)]
    P(ws, "Find the whole amount.", [(f"{show(a)} of a number is {b}", f(b / fr(a))) for a, b in qs], cols=2)
    ws.section("Problem solving")
    ws.question("[[3//5]] of the pupils in a club are girls. There are 24 girls. How many pupils are in the club?", "40",
                space=40)
    ws.question("After spending [[2//7]] of his money, Sam has £35 left. How much did he start with?", "£49", space=40)


def improper_mixed(ws):
    ws.section("Practice")
    fs = ["7/4", "11/3", "9/2", "17/5", "23/6", "15/4", "29/8", "40/7", "13/10", "50/9"]
    P(ws, "Write each improper fraction as a mixed number.", [(show(s), f(fr(s))) for s in fs], cols=5)
    ws.section("Problem solving")
    ws.question("Explain how to change [[19//5]] into a mixed number.", "19 ÷ 5 = 3 remainder 4, so 3[[4//5]]", space=40)


def mixed_improper(ws):
    ws.section("Practice")
    ms = ["1 1/2", "2 1/3", "3 3/4", "4 2/5", "1 5/6", "5 1/4", "2 7/8", "6 2/3", "3 9/10", "7 1/2"]
    P(ws, "Write each mixed number as an improper fraction.", [(show(s), f(fr(s), mixed=False)) for s in ms], cols=5)
    ws.section("Problem solving")
    ws.question("How many quarters are in 3[[3//4]]?", "15", space=35)


def increasing(ws):
    ws.section("Practice")
    P(ws, "Increase", [(f"{b} by {show(a)}", f(b * (1 + fr(a)))) for a, b in [("1/4", 60), ("1/3", 45), ("2/5", 50), ("3/8", 80)]],
      cols=2)
    P(ws, "Decrease", [(f"{b} by {show(a)}", f(b * (1 - fr(a)))) for a, b in [("1/4", 60), ("2/3", 90), ("3/8", 80), ("1/5", 35)]],
      cols=2)
    ws.section("Problem solving")
    ws.question("A rent of £600 a month goes up by [[1//10]]. What is the new rent?", "£660", space=40)
    ws.question("A plant is 24 cm tall. It grows by [[1//3]] of its height. How tall is it now?", "32 cm", space=40)


def midpoint(ws):
    ws.section("Practice")
    pairs = [("1/4", "3/4"), ("1/3", "1/2"), ("2/5", "3/5"), ("1/6", "1/2"), ("3/8", "5/8"), ("1 1/2", "2 1/4")]
    P(ws, "Find the fraction exactly halfway between", [(f"{show(a)} and {show(b)}", f((fr(a) + fr(b)) / 2)) for a, b in pairs],
      cols=3)
    ws.section("Problem solving")
    ws.question("Explain how to find the number halfway between two fractions.", "Add them and divide by 2.", space=35)


def multiplication(ws):
    ws.section("Practice")
    P(ws, "Work out. Simplify your answers.", calc_parts([("1/2", "1/3"), ("2/3", "3/4"), ("4/5", "5/8"), ("3/7", "14"),
                                                         ("5/9", "3/10"), ("2/3", "2/3")], "×"), cols=3)
    P(ws, "Work out", calc_parts([("1 1/2", "2/3"), ("2 1/4", "1 1/3"), ("3 1/2", "2 2/5"), ("1 2/3", "1 4/5")], "×"), cols=2)
    ws.section("Problem solving")
    ws.question("A rectangle is 2[[1//2]] m by 1[[3//5]] m. Find its area.", "4 m^2", space=40)
    ws.question("Explain why [[2//3]] × [[3//4]] is less than [[2//3]].", "Multiplying by a fraction less than 1 makes "
                "the number smaller.", space=40)


def of_shapes(ws):
    ws.section("Practice")
    def grid(cols, rows, shaded):
        items = []
        for i in range(cols):
            for j in range(rows):
                k = j * cols + i
                pts = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
                items.append(("poly", pts, "shade") if k < shaded else ("poly", pts, "nofill"))
        return scene(items, pad=8)
    def pie(parts, shaded):
        items = [("circle", (0, 0), 1)]
        for k in range(parts):
            a = 90 + 360 * k / parts
            if k < shaded:
                items.append(("sector", (0, 0), 1, a, a + 360 / parts, "shade"))
            items.append(("seg", (0, 0), (math.cos(math.radians(a)), math.sin(math.radians(a)))))
        return scene(items, pad=8)
    cases = [(grid(4, 1, 1), Fr(1, 4)), (grid(3, 2, 2), Fr(2, 6)), (pie(8, 3), Fr(3, 8)), (grid(5, 2, 4), Fr(4, 10)),
             (pie(6, 4), Fr(4, 6)), (grid(4, 3, 9), Fr(9, 12)), (pie(5, 2), Fr(2, 5)), (grid(2, 2, 3), Fr(3, 4))]
    ws.figures("What fraction of each shape is shaded? Simplify where you can.", [c for c, _ in cases],
               [f(v) for _, v in cases], cols=4, fig_h=60)
    ws.section("Problem solving")
    ws.question("Shade [[2//3]] of this rectangle.", "8 squares shaded", figure=grid(4, 3, 0), fig_w=110, fig_h=80, space=10)
    ws.question("Explain why a shape cut into 4 pieces of different sizes doesn't show quarters.",
                "Quarters must be 4 EQUAL parts.", space=40)


def ordering_fr(ws):
    ws.section("Practice")
    sets = [["1/2", "1/3", "3/4"], ["2/5", "3/10", "1/2"], ["5/8", "3/4", "2/3"], ["7/12", "1/2", "5/6", "2/3"], ["4/9", "1/3", "5/12"]]
    P(ws, "Write in order, smallest first.", [(",  ".join(show(x) for x in s), ",  ".join(show(x) for x in sorted(s, key=fr)))
                                              for s in sets], cols=2)
    ws.section("Problem solving")
    ws.question("Which is bigger, [[5//7]] or [[7//10]]? Show how you decide.", "[[50//70]] and [[49//70]], so [[5//7]]",
                space=45)


def reciprocal(ws):
    ws.section("Practice")
    xs = [("5", "[[1//5]]"), ("8", "[[1//8]]"), ("[[1//4]]", "4"), ("[[2//3]]", "[[3//2]] or 1[[1//2]]"), ("[[5//7]]", "[[7//5]]"),
          ("0.25", "4"), ("1[[1//2]]", "[[2//3]]"), ("0.2", "5"), ("10", "0.1")]
    P(ws, "Write down the reciprocal of", xs, cols=3)
    ws.section("Problem solving")
    ws.question("What do you get when you multiply a number by its reciprocal?", "1", space=30)
    ws.question("Why does 0 have no reciprocal?", "1 ÷ 0 can't be worked out (nothing times 0 makes 1).", space=35)


def simplifying(ws):
    ws.section("Practice")
    fs = ["6/8", "4/10", "9/12", "15/20", "12/18", "8/24", "21/28", "30/45", "16/40", "36/48", "25/100", "18/27"]
    P(ws, "Write each fraction in its simplest form.", [(show(s), f(fr(s))) for s in fs], cols=4)
    ws.section("Problem solving")
    ws.question("Jo simplifies [[12//16]] to [[6//8]]. Is it in its simplest form? Explain.",
                "No: 6 and 8 still share a factor of 2. Simplest form is [[3//4]].", space=40)


SHEETS = [
    ({"slug": "fdp-percentages-to-decimals"}, p2d), ({"slug": "fdp-percentages-to-fractions"}, p2f),
    ({"slug": "fdp-decimals-to-fractions"}, d2f), ({"slug": "fdp-decimals-to-fractions-calc"}, lambda ws: d2f(ws, True)),
    ({"slug": "fdp-decimals-to-percentages"}, d2p), ({"slug": "fdp-fractions-to-percentages"}, f2p),
    ({"slug": "fdp-fractions-to-decimals"}, f2d), ({"slug": "fdp-fractions-to-decimals-calc"}, lambda ws: f2d(ws, True)),
    ({"slug": "fdp-key-equivalents"}, key_eq), ({"slug": "fdp-mixture"}, mixture), ({"slug": "fdp-ordering"}, ordering),
    ({"slug": "fractions-addition-same-denominator"}, add_same), ({"slug": "fractions-addition-diff-denominators"}, add_diff),
    ({"slug": "fractions-division"}, division), ({"slug": "fractions-equivalent"}, equivalent),
    ({"slug": "fractions-expressing-as"}, expressing), ({"slug": "fractions-fraction-of-an-amount"}, of_amount),
    ({"slug": "fractions-finding-the-original"}, original), ({"slug": "fractions-improper-to-mixed-number"}, improper_mixed),
    ({"slug": "fractions-mixed-number-to-improper"}, mixed_improper), ({"slug": "fractions-increasing-by-a-fraction"}, increasing),
    ({"slug": "fractions-finding-the-midpoint"}, midpoint), ({"slug": "fractions-multiplication"}, multiplication),
    ({"slug": "fractions-of-shapes"}, of_shapes), ({"slug": "fractions-ordering"}, ordering_fr),
    ({"slug": "fractions-reciprocal"}, reciprocal), ({"slug": "fractions-simplifying"}, simplifying),
]
