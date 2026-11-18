"""Ratio (9), proportion (6), scales (2), sensible estimates, speed/distance/time
and kinematics formulae. Every answer is worked out with Fraction so it is exact."""
import math
from fractions import Fraction as F
from engine.charts import chart
from engine.draw import axes, INK



def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def nm(x):
    """Tidy a Fraction or float: whole numbers lose the .0, others get up to 2 d.p."""
    x = F(x).limit_denominator(1000)
    if x.denominator == 1:
        return str(x.numerator)
    return f"{float(x):.2f}".rstrip("0").rstrip(".")


def simp(*parts):
    g = 0
    for p in parts:
        g = math.gcd(g, p)
    return " : ".join(str(p // g) for p in parts)


# ==========================================================================
# Ratio
# ==========================================================================
def r_simplify(ws):
    ws.section("Practice")
    pairs = [(6, 9), (10, 25), (12, 18), (14, 21), (40, 16), (35, 50), (24, 36), (45, 60), (100, 75)]
    P(ws, "Write each ratio in its simplest form.", [(f"{a} : {b}", simp(a, b)) for a, b in pairs], cols=3)
    P(ws, "Simplify", [("6 : 12 : 18", "1 : 2 : 3"), ("20 : 30 : 45", "4 : 6 : 9"), ("50 cm : 2 m", "1 : 4"),
                       ("300 g : 1.2 kg", "1 : 4"), ("45 min : 2 hours", "3 : 8"), ("0.5 : 2", "1 : 4")], cols=3)
    ws.section("Problem solving")
    ws.question("A class has 12 boys and 18 girls. Write the ratio of boys to girls in its simplest form.", "2 : 3", space=35)
    ws.question("Mia says 20 : 30 simplifies to 4 : 6. Explain why her answer is not fully simplified.",
                "4 and 6 still share a factor of 2, so the simplest form is 2 : 3.", space=40)


def r_fraction(ws):
    ws.section("Practice")
    rs = [(1, 3), (2, 3), (3, 5), (1, 4), (7, 3), (9, 11)]
    P(ws, "In each ratio a : b, what fraction is a of the total?",
      [(f"{a} : {b}", f"[[{F(a, a + b).numerator}//{F(a, a + b).denominator}]]") for a, b in rs], cols=3)
    rs2 = [(1, 4), (3, 2), (1, 1), (7, 13), (3, 17), (11, 9)]
    P(ws, "In each ratio a : b, what percentage is a of the total?", [(f"{a} : {b}", nm(F(100 * a, a + b)) + "%") for a, b in rs2],
      cols=3)
    ws.section("Problem solving")
    ws.question("Red and blue counters are in the ratio 3 : 5. What fraction of the counters are blue?", "[[5//8]]", space=35)
    ws.question("In a club, adults : children = 2 : 3. What percentage are adults?", "40%", space=35)


def r_share(ws):
    ws.section("Practice")
    qs = [(40, (3, 5)), (60, (1, 2)), (72, (5, 3)), (150, (2, 3)), (90, (4, 5)), (240, (7, 5)), (120, (1, 2, 3)), (200, (3, 3, 4))]
    P(ws, "Share each amount in the given ratio.",
      [(f"£{t} in the ratio {' : '.join(map(str, r))}", " and ".join(f"£{nm(F(t * p, sum(r)))}" for p in r)) for t, r in qs], cols=2)
    ws.section("Problem solving")
    ws.question("Ali and Ben share £84 in the ratio 3 : 4. How much more does Ben get than Ali?", "£36 and £48, so £12 more", space=40)
    ws.question("The angles in a triangle are in the ratio 2 : 3 : 4. Find the largest angle.", "80°", space=40)


def r_one(ws):
    ws.section("Practice")
    qs = [((2, 3), "first", 10), ((5, 2), "first", 35), ((3, 7), "second", 28), ((4, 9), "second", 36), ((1, 6), "first", 8),
          ((5, 8), "second", 64)]
    out = []
    for (a, b), which, v in qs:
        other = F(v * b, a) if which == "first" else F(v * a, b)
        out.append((f"a : b = {a} : {b} and {'a' if which == 'first' else 'b'} = {v}. Find {'b' if which == 'first' else 'a'}.",
                    nm(other)))
    P(ws, "Work out the missing value.", out, cols=2)
    ws.section("Problem solving")
    ws.question("Squash and water are mixed in the ratio 1 : 6. Sam uses 50 ml of squash. How much water does he use?", "300 ml",
                space=40)
    ws.question("Boys and girls in a club are in the ratio 4 : 5. There are 20 girls. How many children are in the club?", "16 + 20 = 36",
                space=40)


def r_two(ws):
    ws.section("Practice")
    P(ws, "Combine the ratios to write a : b : c.", [("a : b = 2 : 3 and b : c = 3 : 5", "2 : 3 : 5"),
                                                     ("a : b = 1 : 2 and b : c = 4 : 3", "2 : 4 : 3"),
                                                     ("a : b = 3 : 4 and b : c = 2 : 5", "3 : 4 : 10"),
                                                     ("a : b = 5 : 2 and b : c = 3 : 7", "15 : 6 : 14")], cols=2)
    ws.section("Problem solving")
    ws.question("Cats : dogs = 3 : 2 and dogs : rabbits = 5 : 4. Find cats : rabbits.", "15 : 8", space=45)
    ws.question("Using the ratios above, there are 30 cats. How many rabbits are there?", "16", space=40)


def r_diff(ws):
    ws.section("Practice")
    qs = [((3, 5), 12), ((2, 7), 25), ((4, 1), 21), ((5, 8), 9), ((7, 4), 15), ((3, 10), 35)]
    P(ws, "Two amounts are in the given ratio. The difference between them is shown. Find both amounts.",
      [(f"{a} : {b}, difference {d}", f"{nm(F(d * a, abs(a - b)))} and {nm(F(d * b, abs(a - b)))}") for (a, b), d in qs], cols=2)
    ws.section("Problem solving")
    ws.question("Jo and Kim share some sweets in the ratio 2 : 5. Kim gets 18 more than Jo. How many sweets are there?", "42",
                space=40)


def r_1n(ws):
    ws.section("Practice")
    P(ws, "Write each ratio in the form 1 : n.", [("2 : 6", "1 : 3"), ("5 : 20", "1 : 4"), ("4 : 10", "1 : 2.5"), ("8 : 2", "1 : 0.25"),
                                                 ("3 : 4", "1 : [[4//3]]"), ("20 cm : 3 m", "1 : 15")], cols=3)
    P(ws, "Write each ratio in the form n : 1.", [("12 : 4", "3 : 1"), ("9 : 2", "4.5 : 1"), ("3 : 5", "0.6 : 1")], cols=3)
    ws.section("Problem solving")
    ws.question("A map scale is 2 cm : 1 km. Write it in the form 1 : n.", "1 : 50 000", space=40)
    ws.question("Class A has 12 boys and 15 girls; Class B has 10 boys and 14 girls. Use 1 : n to decide which class has the "
                "greater proportion of girls.", "A: 1 : 1.25, B: 1 : 1.4, so Class B", space=50)


def r_equations(ws):
    ws.section("Practice")
    P(ws, "Find x.", [("x : 4 = 3 : 2", "x = 6"), ("5 : x = 2 : 6", "x = 15"), ("(x + 1) : 3 = 4 : 1", "x = 11"),
                      ("x : (x + 6) = 1 : 3", "x = 3"), ("(2x − 1) : 5 = 3 : 1", "x = 8"), ("(x + 2) : (x − 1) = 5 : 2", "x = 3")], cols=2)
    ws.section("Problem solving")
    ws.question("Amy is x years old and her mum is 4x years old. In 6 years their ages will be in the ratio 1 : 3. Find x.",
                "3(x + 6) = 4x + 6, so x = 12", space=50)


def r_problems(ws):
    ws.section("Problem solving")
    ws.question("A recipe uses flour and sugar in the ratio 5 : 2. Kat has 400 g of flour and 150 g of sugar. What is the most "
                "flour she can use?", "150 g sugar needs 375 g flour, so 375 g", space=55)
    ws.question("Paint is mixed blue : yellow = 2 : 3. How much of each is needed for 4 litres of green paint?", "1.6 l blue, 2.4 l yellow",
                space=45)
    ws.question("Tom and Jen share money in the ratio 3 : 4. Jen gives Tom £10, and now they have the same. How much did they share?",
                "One part = £20, so £140", space=55)
    ws.question("In a bag, red : blue = 3 : 7. Four more red are added and the ratio becomes 1 : 2. How many blue are there?",
                "(3k + 4) : 7k = 1 : 2, k = 8, so 56 blue", space=55)


# ==========================================================================
# Proportion
# ==========================================================================
def p_direct(ws):
    ws.section("Practice")
    P(ws, "Work out", [("3 pens cost £1.80. Find the cost of 5 pens.", "£3"), ("6 eggs cost £1.50. Find the cost of 10 eggs.", "£2.50"),
                       ("4 tickets cost £26. Find the cost of 7.", "£45.50"), ("5 kg of apples cost £6. Find the cost of 2 kg.", "£2.40")],
      cols=1)
    P(ws, "y is directly proportional to x. Find the formula and the missing value.",
      [("y = 12 when x = 3. Find y when x = 5.", "y = 4x, 20"), ("y = 35 when x = 7. Find x when y = 60.", "y = 5x, 12"),
       ("y = 18 when x = 2, y ∝ x^2. Find y when x = 3.", "y = 4.5x^2, 40.5"),
       ("y = 24 when x = 4, y ∝ √x. Find y when x = 9.", "y = 12√x, 36")], cols=1)
    ws.section("Problem solving")
    ws.question("A car uses 8 litres of fuel for 100 km. How much fuel for 250 km?", "20 litres", space=35)


def p_inverse(ws):
    ws.section("Practice")
    P(ws, "Work out", [("4 builders take 6 days. How long for 3 builders?", "8 days"),
                       ("5 pumps empty a tank in 12 h. How long with 6 pumps?", "10 hours"),
                       ("A journey takes 3 h at 40 mph. How long at 60 mph?", "2 hours")], cols=1)
    P(ws, "y is inversely proportional to x. Find the formula and the missing value.",
      [("y = 6 when x = 4. Find y when x = 8.", "y = [[24//x]], 3"), ("y = 10 when x = 3. Find x when y = 5.", "y = [[30//x]], 6"),
       ("y = 2 when x = 3, y ∝ [[1//x^2]]. Find y when x = 6.", "y = [[18//x^2]], 0.5")], cols=1)
    ws.section("Problem solving")
    ws.question("Explain why the number of people sharing a pizza and the size of each slice are in inverse proportion.",
                "More people means smaller slices; people × slice size stays the same.", space=40)


def p_unitary(ws):
    ws.section("Practice")
    P(ws, "Use the unitary method (find one first).", [("7 books cost £35. Find the cost of 3.", "£15"),
                                                       ("8 m of cloth cost £20. Find the cost of 5 m.", "£12.50"),
                                                       ("12 cans weigh 4.2 kg. Find the mass of 5.", "1.75 kg"),
                                                       ("A worker earns £66 for 6 hours. Find the pay for 15 hours.", "£165")], cols=1)
    ws.section("Problem solving")
    ws.question("Which is better value: 6 rolls for £2.40 or 10 rolls for £3.80?", "40p vs 38p each, so 10 for £3.80", space=45)
    ws.question("500 g of cereal costs £2.25 and 750 g costs £3.30. Which is better value?", "45p vs 44p per 100 g, so 750 g",
                space=45)


def p_graphs(ws):
    ws.section("Practice")
    shapes = [("y ∝ x", lambda x: 2 * x, "A straight line through the origin"),
              ("y ∝ [[1//x]]", lambda x: 4 / x if x > 0.3 else None, "A curve that gets closer to the axes (reciprocal)"),
              ("y ∝ x^2", lambda x: 0.5 * x * x, "A curve through the origin getting steeper (half a parabola)")]
    figs = []
    for name, f, ans in shapes:
        pts = [(x / 10, f(x / 10)) for x in range(1, 61) if f(x / 10) is not None and f(x / 10) <= 12]
        figs.append(chart(0, 6, 0, 12, 1, 2, [("line", pts)], xlabel="x", ylabel="y"))
    ws.figures("Which type of proportion does each graph show?", figs, ["y ∝ x", "y ∝ [[1//x]]", "y ∝ x^2"], cols=3, fig_h=140)
    ws.section("Problem solving")
    ws.question("The graph of y against x is a straight line through (0, 0) and (4, 10). Write a formula for y in terms of x.",
                "y = 2.5x", space=40)
    ws.question("Explain why the line y = 2x + 3 does not show direct proportion.", "It does not pass through the origin.", space=35)


def p_time(ws):
    ws.section("Practice")
    P(ws, "Work out", [("3 people paint a fence in 4 hours. How long would 6 people take?", "2 hours"),
                       ("2 printers print a job in 30 min. How long would 5 printers take?", "12 minutes"),
                       ("A tap fills a bath in 12 min. How long would 3 taps take?", "4 minutes"),
                       ("5 people take 8 days. How many people to finish in 4 days?", "10 people")], cols=1)
    ws.section("Problem solving")
    ws.question("6 machines make 600 bottles in 4 hours. How many bottles would 9 machines make in 2 hours?", "450", space=45)


def p_recipes(ws):
    ws.section("Practice")
    recipe = [("Flour", 300, "g"), ("Butter", 150, "g"), ("Sugar", 120, "g"), ("Eggs", 2, "")]
    info = "A recipe for 6 biscuits uses " + ", ".join(f"{a.lower()} {b}{(' ' + u) if u else ''}" for a, b, u in recipe) + "."
    P(ws, info + " Work out the amount of each ingredient for 12 biscuits.",
      [(a, f"{nm(F(b * 12, 6))}{(' ' + u) if u else ''}") for a, b, u in recipe], cols=4)
    for k in (3, 9):
        P(ws, f"Using the same recipe, work out the amounts for {k} biscuits.",
          [(a, f"{nm(F(b * k, 6))}{(' ' + u) if u else ''}") for a, b, u in recipe], cols=4)
    ws.section("Problem solving")
    ws.question("Lily has 450 g of flour and plenty of everything else. What is the greatest number of biscuits she can make?",
                "9", space=40)


# ==========================================================================
# Scales, estimates
# ==========================================================================
def scale_fig(lo, hi, major, minor, value, unit=""):
    """A horizontal measuring scale with an arrow pointing at value."""
    def fig(c, x, y, w, h):
        L, R = x + 14, x + w - 14
        Y0 = y + h / 2 - 6
        X = lambda v: L + (v - lo) / (hi - lo) * (R - L)
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.line(L, Y0, R, Y0)
        n = round((hi - lo) / minor)
        c.setFont("Body", 8)
        c.setFillColor(INK)
        for i in range(n + 1):
            v = lo + i * minor
            big = abs((v - lo) / major - round((v - lo) / major)) < 1e-9
            c.line(X(v), Y0, X(v), Y0 + (10 if big else 5))
            if big:
                c.drawCentredString(X(v), Y0 - 11, f"{v:g}")
        c.drawString(R + 3, Y0 - 3, unit)
        ax = X(value)
        c.setLineWidth(1.3)
        c.line(ax, Y0 + 26, ax, Y0 + 12)
        p = c.beginPath()
        p.moveTo(ax, Y0 + 11)
        p.lineTo(ax - 3.5, Y0 + 17)
        p.lineTo(ax + 3.5, Y0 + 17)
        p.close()
        c.drawPath(p, fill=1, stroke=0)
    return fig


def scales_reading(ws):
    ws.section("Practice")
    sc = [(0, 10, 5, 1, 7), (0, 100, 50, 10, 30), (0, 20, 10, 2, 14), (0, 1, 0.5, 0.1, 0.7),
          (100, 200, 50, 10, 170), (0, 50, 10, 5, 35), (0, 4, 1, 0.25, 2.75), (0, 1000, 500, 100, 800)]
    ws.figures("Write down the value each arrow points to.", [scale_fig(*s) for s in sc], [f"{s[4]:g}" for s in sc], cols=2, fig_h=55)
    ws.section("Problem solving")
    ws.question("On a scale from 0 to 1 kg there are 10 small marks between 0 and 1. What is each small mark worth?",
                "0.1 kg (100 g)", space=35)


def scales_maps(ws):
    ws.section("Practice")
    P(ws, "A map has a scale of 1 cm : 5 km. Find the real distance for", [(f"{d} cm", nm(d * 5) + " km") for d in (3, 7, 2.5, 12)],
      cols=4)
    P(ws, "A map has a scale of 1 : 50 000. Find the real distance in km for", [(f"{d} cm", nm(F(str(d)) * F(1, 2)) + " km")
                                                                                for d in (4, 10, 7, 3.6)], cols=4)
    P(ws, "A plan has a scale of 1 : 200. Find the length on the plan for", [(f"{d} m", nm(F(str(d)) * 100 / 200) + " cm")
                                                                            for d in (10, 6, 15, 3)], cols=4)
    ws.section("Problem solving")
    ws.question("Two towns are 24 km apart. On a map they are 8 cm apart. Write the scale in the form 1 : n.", "1 : 300 000", space=45)


def estimates(ws):
    ws.section("Practice")
    P(ws, "Choose the most sensible estimate.", [("Height of a door: 2 m, 20 m or 20 cm", "2 m"),
                                                 ("Mass of a bag of sugar: 1 g, 1 kg or 10 kg", "1 kg"),
                                                 ("Height of a classroom: 3 m, 30 m or 30 cm", "3 m"),
                                                 ("Water in a mug: 3 ml, 300 ml or 3 l", "300 ml"),
                                                 ("Length of a bus: 1 m, 12 m or 120 m", "12 m"), ("Mass of an adult: 7 kg, 70 kg or 700 kg",
                                                                                                   "70 kg")], cols=2)
    P(ws, "Estimate by rounding each number to 1 significant figure.", [("48 × 21", "50 × 20 = 1000"), ("612 ÷ 29", "600 ÷ 30 = 20"),
                                                                        ("[[7.8 × 3.1//0.48]]", "[[8 × 3//0.5]] = 48"),
                                                                        ("√(97 + 4.2)", "√100 = 10")], cols=2)
    ws.section("Problem solving")
    ws.question("A man is standing next to a lamp post that is about 3 times his height. Estimate the height of the lamp post.",
                "About 5 m to 6 m (a man is about 1.8 m)", space=40)


# ==========================================================================
# Speed, distance, time and kinematics
# ==========================================================================
def sdt(ws):
    ws.section("Practice")
    P(ws, "Work out", [("Speed for 120 miles in 3 hours", "40 mph"), ("Distance at 50 km/h for 4 hours", "200 km"),
                       ("Time to go 210 km at 70 km/h", "3 hours"), ("Speed for 45 km in 30 minutes", "90 km/h"),
                       ("Distance at 64 mph for 15 minutes", "16 miles"), ("Time to go 100 m at 8 m/s", "12.5 s")], cols=2)
    fig = chart(0, 5, 0, 120, 1, 20, [("line", [(0, 0), (2, 80), (3, 80), (5, 0)], "dots")], xlabel="Time (hours)",
                ylabel="Distance from home (km)")
    ws.question("The graph shows a car journey.\n(a) How fast was the car going for the first 2 hours?\n(b) How long did it stop for?\n"
                "(c) What was its speed on the way home?", "(a) 40 km/h  (b) 1 hour  (c) 40 km/h", figure=fig, fig_w=260, fig_h=170,
                fig_pos="right", space=10)
    ws.section("Problem solving")
    ws.question("Convert 72 km/h into m/s.", "72 000 ÷ 3600 = 20 m/s", space=35)
    ws.question("Sam cycles 12 km at 16 km/h, then 18 km at 24 km/h. Find his average speed for the whole trip.",
                "Time = 0.75 + 0.75 = 1.5 h, speed = 30 ÷ 1.5 = 20 km/h", space=50)


def kinematics(ws):
    ws.section("Practice")
    P(ws, "Use  v = u + at,   s = ut + [[1//2]]at^2,   v^2 = u^2 + 2as,   s = [[(u + v)t//2]]  to work out", [("u = 3, a = 2, t = 5. Find v.", "13 m/s"), ("u = 0, a = 4, t = 3. Find s.", "18 m"),
                       ("u = 2, a = 3, s = 10. Find v.", "8 m/s"), ("u = 5, v = 15, t = 4. Find s.", "40 m"),
                       ("v = 20, u = 4, t = 8. Find a.", "2 m/s^2"), ("u = 10, v = 0, s = 25. Find a.", "−2 m/s^2")], cols=2)
    ws.section("Problem solving")
    ws.question("A car starts from rest and accelerates at 2.5 m/s^2 for 6 seconds. How far does it travel?", "45 m", space=40)
    ws.question("A ball is thrown up at 14 m/s and slows at 9.8 m/s^2. How high does it go?", "0 = 196 − 19.6s, s = 10 m", space=45)


SHEETS = [
    ({"slug": "ratio-simplifying"}, r_simplify), ({"slug": "ratio-express-as-fractions-or-percent"}, r_fraction),
    ({"slug": "ratio-sharing-the-total"}, r_share), ({"slug": "ratio-given-one-value"}, r_one),
    ({"slug": "ratio-given-two-ratios"}, r_two), ({"slug": "ratio-difference-between"}, r_diff),
    ({"slug": "ratio-expressing-as-1-n"}, r_1n), ({"slug": "ratio-equations-ratios"}, r_equations),
    ({"slug": "ratio-problem-solving"}, r_problems),
    ({"slug": "proportion-direct"}, p_direct), ({"slug": "proportion-inverse"}, p_inverse),
    ({"slug": "proportion-unitary-method"}, p_unitary), ({"slug": "proportion-graphs"}, p_graphs),
    ({"slug": "proportion-time"}, p_time), ({"slug": "proportion-recipes"}, p_recipes),
    ({"slug": "scales-reading"}, scales_reading), ({"slug": "scales-and-maps"}, scales_maps),
    ({"slug": "sensible-estimates"}, estimates), ({"slug": "speed-distance-and-time"}, sdt), ({"slug": "kinematics-formulae"}, kinematics),
]
