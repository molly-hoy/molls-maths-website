"""Quadratic graphs (4), quadratics (7), sequences (6), simultaneous equations (4),
transformations of graphs (2) and types of graph (4). Answers are calculated."""
import math
from fractions import Fraction as Fr
from engine.algebra import expand, num, complete_square
from engine.draw import axes
from engine.geo import table, scene
from topics.algebra3 import eq as line_eq


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def quad_str(a, b, c, v="x"):
    out = ("" if a == 1 else "−" if a == -1 else str(a)) + f"{v}^2"
    if b:
        out += f" {'+' if b > 0 else '−'} {'' if abs(b) == 1 else abs(b)}{v}"
    if c:
        out += f" {'+' if c > 0 else '−'} {abs(c)}"
    return out.replace("-", "−")


def roots(a, b, c):
    d = b * b - 4 * a * c
    if d < 0:
        return []
    r = sorted({(-b - math.sqrt(d)) / (2 * a), (-b + math.sqrt(d)) / (2 * a)})
    return r


def fmt_r(x):
    return num(Fr(x).limit_denominator(100)) if abs(x * 100 - round(x * 100)) < 1e-9 else f"{x:.2f}"


# ==========================================================================
# Quadratic graphs
# ==========================================================================
def qg_draw(ws):
    ws.section("Practice")
    for a, b, c, lo, hi, ylo, yhi in ((1, -2, -3, -2, 4, -5, 6), (1, 1, -6, -4, 3, -7, 7)):
        xs = list(range(lo, hi + 1))
        ws.question(f"(a) Complete the table of values for y = {quad_str(a, b, c)}.\n(b) Draw the graph.\n"
                    "(c) Use your graph to find the solutions of " + f"{quad_str(a, b, c)} = 0.",
                    "(a) " + ", ".join(str(a * x * x + b * x + c).replace("-", "−") for x in xs) +
                    f"   (b) a U-shaped curve   (c) x = {', '.join(fmt_r(r) for r in roots(a, b, c))}", space=0)
        ws.figure_only(table([["x"] + [str(x).replace("-", "−") for x in xs], ["y"] + [""] * len(xs)]), 330, 44)
        ws.figure_only(axes(lo, hi, ylo, yhi, ystep=1), 240, 210)
    ws.section("Problem solving")
    ws.question("Why is the graph of y = x^2 symmetrical about the y-axis?", "(−x)^2 = x^2, so x and −x give the same y.", space=35)


def qg_sketch(ws):
    ws.section("Practice")
    qs = [(1, -4, 3), (1, 2, -8), (1, -6, 9), (-1, 4, 5), (1, 0, -9), (2, -4, -6)]
    def info(a, b, c):
        r = roots(a, b, c)
        tp = (-b / (2 * a), c - b * b / (4 * a))
        return (f"y-intercept (0, {num(c)}); roots " + (", ".join(fmt_r(x) for x in r) if r else "none") +
                f"; turning point ({fmt_r(tp[0])}, {fmt_r(tp[1])}); " + ("U-shaped" if a > 0 else "∩-shaped"))
    P(ws, "For each graph write down the y-intercept, the roots and the turning point, then sketch it.",
      [(f"y = {quad_str(a, b, c)}", info(a, b, c)) for a, b, c in qs], cols=2, row_h=40)
    ws.section("Problem solving")
    ws.question("Sketch y = (x − 2)(x + 3). Label where it crosses the axes.", "crosses the x-axis at 2 and −3, the y-axis at −6",
                space=90)


def qg_turning(ws):
    ws.section("Practice")
    qs = [(1, 6, 5), (1, -4, 7), (1, 2, -3), (1, -10, 21), (1, 3, 1), (2, 8, 3)]
    P(ws, "Complete the square to find the coordinates of the turning point.",
      [(f"y = {quad_str(a, b, c)}", f"{complete_square(a, b, c)}; turning point ({fmt_r(-b / (2 * a))}, {fmt_r(c - b * b / (4 * a))})")
       for a, b, c in qs], cols=2, row_h=34)
    ws.section("Problem solving")
    ws.question("y = (x − p)^2 + q has a turning point at (3, −5). Write down p and q, and expand the expression.",
                f"p = 3, q = −5; y = {expand('(x - 3)^2 - 5')}", space=45)
    ws.question("Explain how you know whether a turning point is a maximum or a minimum.", "If the x^2 term is positive it's a "
                "minimum (U-shape); if negative it's a maximum.", space=40)


def qg_symmetry(ws):
    ws.section("Practice")
    qs = [(1, -6, 2), (1, 4, -1), (1, -2, -8), (-1, 6, 0), (2, 8, 1), (1, 0, -4)]
    P(ws, "Write down the equation of the line of symmetry of each graph.", [(f"y = {quad_str(a, b, c)}", f"x = {fmt_r(-b / (2 * a))}")
                                                                           for a, b, c in qs], cols=3)
    figs = [axes(-2, 6, -5, 6, [("curve", lambda x: x * x - 4 * x + 1, -2, 6)], label_step=2),
            axes(-5, 3, -6, 5, [("curve", lambda x: x * x + 2 * x - 3, -5, 3)], label_step=2)]
    ws.figures("Write down the line of symmetry of each curve.", figs, ["x = 2", "x = −1"], cols=2, fig_h=150)
    ws.section("Problem solving")
    ws.question("A quadratic graph crosses the x-axis at x = −1 and x = 7. Find its line of symmetry.", "x = 3 (halfway)", space=35)


# ==========================================================================
# Quadratic equations
# ==========================================================================
def q_factorising(ws):
    ws.section("Practice")
    roots_list = [(2, 3), (-1, -5), (4, -2), (-3, 6), (7, -7), (0, 5), (-4, -4), (1, -8)]
    P(ws, "Solve by factorising.", [(f"{expand(f'(x - ({p}))(x - ({q}))')} = 0",
                                     f"x = {num(p)} or x = {num(q)}" if p != q else f"x = {num(p)}") for p, q in roots_list], cols=2)
    P(ws, "Solve", [(f"{expand(f'(2x - ({p}))(x - ({q}))')} = 0", f"x = {num(Fr(p, 2))} or x = {num(q)}")
                    for p, q in ((1, 3), (3, -2), (-5, 1))], cols=3)
    ws.section("Problem solving")
    ws.question("Explain why if (x − 3)(x + 4) = 0, then x = 3 or x = −4.", "If two numbers multiply to 0, one of them must be 0.",
                space=40)


def q_foundation(ws):
    ws.section("Practice")
    P(ws, "Solve", [("x^2 = 36", "x = ±6"), ("x^2 − 49 = 0", "x = ±7"), ("x^2 + 3x = 0", "x = 0 or x = −3"),
                    ("x^2 − 5x = 0", "x = 0 or x = 5"), ("x^2 + 5x + 6 = 0", "x = −2 or x = −3"),
                    ("x^2 − 7x + 10 = 0", "x = 2 or x = 5"), ("x^2 + x − 12 = 0", "x = 3 or x = −4"), ("x^2 − 9x + 20 = 0", "x = 4 or x = 5")],
      cols=2)
    ws.section("Problem solving")
    ws.question("A square has area 64 cm^2. Write an equation and solve it to find its side.", "x^2 = 64, x = 8 cm", space=35)


def q_formula(ws):
    ws.section("Practice")
    qs = [(1, 3, -5), (1, -4, 1), (2, 5, -1), (3, -2, -4), (1, 6, 4), (5, 1, -2)]
    def ans(a, b, c):
        r = roots(a, b, c)
        return "x = " + " or x = ".join(f"{x:.2f}" for x in r)
    P(ws, "Use the quadratic formula. Give answers to 2 d.p.", [(f"{quad_str(a, b, c)} = 0", ans(a, b, c)) for a, b, c in qs], cols=2)
    ws.question("Write down the quadratic formula.", "x = [[−b ± √(b^2 − 4ac)//2a]]", space=40)
    ws.section("Problem solving")
    ws.question("Show that x^2 + 2x + 5 = 0 has no real solutions.", "b^2 − 4ac = 4 − 20 = −16 < 0", space=40)


def q_cts(ws):
    ws.section("Practice")
    qs = [(1, 6, 4), (1, -4, -1), (1, 2, -7), (1, -8, 11), (1, 10, 18)]
    def ans(a, b, c):
        p = Fr(b, 2)
        q = Fr(c) - p * p
        return f"{complete_square(a, b, c)} = 0, x = {num(-p)} ± √{num(-q)}"
    P(ws, "Solve by completing the square. Give answers in surd form.", [(f"{quad_str(a, b, c)} = 0", ans(a, b, c)) for a, b, c in qs],
      cols=1)
    ws.section("Problem solving")
    ws.question("Solve x^2 + 3x − 1 = 0 by completing the square, to 2 d.p.", "(x + 1.5)^2 = 3.25, x = 0.30 or x = −3.30", space=50)


def q_graphical(ws, advanced=False):
    ws.section("Practice")
    fig = axes(-3, 5, -5, 6, [("curve", lambda x: x * x - 2 * x - 3, -2.5, 4.5)])
    if not advanced:
        ws.question("The graph of y = x^2 − 2x − 3 is drawn.\n(a) Solve x^2 − 2x − 3 = 0.\n(b) Solve x^2 − 2x − 3 = 2 (to 1 d.p.).\n"
                    "(c) Write down the turning point.", f"(a) x = −1 or 3   (b) x ≈ {roots(1, -2, -5)[0]:.1f} or {roots(1, -2, -5)[1]:.1f}   "
                    "(c) (1, −4)", figure=fig, fig_w=200, fig_h=200, space=10)
    else:
        ws.question("The graph of y = x^2 − 2x − 3 is drawn.\n(a) Draw a suitable line to solve x^2 − 3x − 4 = 0.\n"
                    "(b) Draw a line to solve x^2 − 4x = 0.",
                    "(a) draw y = x + 1: x = −1 or 4   (b) draw y = 2x − 3: x = 0 or 4", figure=fig, fig_w=200, fig_h=200, space=10)
    ws.section("Problem solving")
    ws.question("Why might you only get approximate solutions from a graph?", "You can only read the scale to a certain accuracy.",
                space=35)


def q_forming(ws):
    ws.section("Practice")
    P(ws, "Form a quadratic equation and solve it.", [
        ("A rectangle is 3 cm longer than it is wide. Its area is 40 cm^2. Find its width.", "x(x + 3) = 40, x = 5 cm"),
        ("Two consecutive whole numbers multiply to 156. Find them.", "n(n + 1) = 156: 12 and 13"),
        ("A number squared, minus 4 times the number, equals 21. Find the positive number.", "x^2 − 4x − 21 = 0, x = 7"),
        ("A right-angled triangle has sides x, x + 7 and 13. Find x.", "x^2 + (x + 7)^2 = 169, x = 5")], cols=1, row_h=36)
    ws.section("Problem solving")
    ws.question("Why do we usually reject one of the solutions in area problems?", "A length can't be negative.", space=30)


# ==========================================================================
# Sequences
# ==========================================================================
def seq_rules(ws):
    ws.section("Practice")
    seqs = [[3, 7, 11, 15], [40, 35, 30, 25], [2, 4, 8, 16], [1, 4, 9, 16], [81, 27, 9, 3], [-5, -2, 1, 4]]
    def rule(s):
        d = s[1] - s[0]
        if all(s[i + 1] - s[i] == d for i in range(3)):
            return f"{'add' if d > 0 else 'subtract'} {abs(d)}; next {s[-1] + d}".replace("-", "−")
        r = Fr(s[1], s[0])
        if all(Fr(s[i + 1], s[i]) == r for i in range(3)):
            return f"{'multiply by ' + num(r) if r > 1 else 'divide by ' + num(1 / r)}; next {num(s[-1] * r)}"
        return "square numbers; next 25"
    P(ws, "Describe the rule for each sequence and write down the next term.", [(", ".join(map(str, s)).replace("-", "−") + ", ...", rule(s))
                                                                              for s in seqs], cols=2)
    ws.section("Problem solving")
    ws.question("Is the sequence 2, 4, 8, ... arithmetic or geometric? Explain.", "geometric: you multiply by 2 each time", space=35)


def seq_missing(ws):
    ws.section("Practice")
    P(ws, "Find the missing terms.", [("5, 9, ___, 17, ___", "13, 21"), ("___, 12, 20, 28, ___", "4, 36"), ("50, ___, 38, 32, ___", "44, 26"),
                                      ("3, 6, 12, ___, ___", "24, 48"), ("___, −1, 2, 5, ___", "−4, 8"), ("1, 1, 2, 3, ___, 8, ___", "5, 13")],
      cols=2)
    ws.section("Problem solving")
    ws.question("The 2nd term of an arithmetic sequence is 11 and the 4th term is 19. Find the 1st term.", "difference 4, first term 7",
                space=40)


def seq_fib(ws):
    ws.section("Practice")
    P(ws, "Each term is the sum of the two before it. Find the next three terms.", [
        ("1, 1, 2, 3, 5, ...", "8, 13, 21"), ("2, 2, 4, 6, 10, ...", "16, 26, 42"), ("3, 4, 7, 11, ...", "18, 29, 47"),
        ("1, 3, 4, 7, ...", "11, 18, 29")], cols=2)
    P(ws, "Find the missing terms.", [("1, ___, 5, 8, 13", "3"), ("___, 6, 10, 16", "4"), ("2, 5, ___, ___, 19", "7, 12")], cols=3)
    ws.section("Problem solving")
    ws.question("A Fibonacci-type sequence starts a, b. Write the next three terms in terms of a and b.", "a + b, a + 2b, 2a + 3b",
                space=40)


def seq_nth(ws):
    ws.section("Practice")
    seqs = [(3, 2), (4, -1), (5, 3), (-2, 20), (7, -4), (6, 0)]
    def nth(d, c):
        return f"{num(d)}n {'+' if c > 0 else '−'} {abs(c)}" if c else f"{num(d)}n"
    P(ws, "Find the nth term of each sequence.", [(", ".join(str(d * k + c) for k in range(1, 5)).replace("-", "−") + ", ...",
                                                   nth(d, c).replace("-", "−")) for d, c in seqs], cols=2)
    P(ws, "Find the 20th term of", [("4n + 3", "83"), ("7n − 5", "135"), ("50 − 2n", "10")], cols=3)
    ws.section("Problem solving")
    ws.question("Is 100 a term in the sequence 3n + 2? Explain.", "3n + 2 = 100 gives n = 32.67, not a whole number: no", space=40)


def seq_frac(ws):
    ws.section("Practice")
    P(ws, "Find the nth term of each sequence.", [
        ("[[1//3]], [[2//5]], [[3//7]], [[4//9]], ...", "[[n//2n + 1]]"), ("[[3//4]], [[5//8]], [[7//12]], [[9//16]], ...", "[[2n + 1//4n]]"),
        ("[[2//1]], [[3//4]], [[4//7]], [[5//10]], ...", "[[n + 1//3n − 2]]"), ("[[1//2]], [[1//4]], [[1//8]], [[1//16]], ...", "[[1//2^n]]")],
      cols=2)
    ws.section("Problem solving")
    ws.question("What happens to the terms of [[n//2n + 1]] as n gets very large?", "they get closer and closer to [[1//2]]", space=40)


def seq_patterns(ws):
    ws.section("Practice")
    def pattern(k):
        items = []
        for i in range(k):
            for j in range(2):
                items.append(("poly", [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]))
        items.append(("poly", [(k, 0), (k + 1, 0), (k + 1, 1), (k, 1)]))
        return scene(items, pad=6)
    ws.figures("Here are the first three patterns in a sequence.", [pattern(k) for k in (1, 2, 3)], ["3 squares", "5 squares", "7 squares"],
               cols=3, fig_h=55, answer_line=False)
    P(ws, "Use the patterns above.", [("How many squares in pattern 4?", "9"), ("Find the nth term.", "2n + 1"),
                                      ("How many squares in pattern 50?", "101"), ("Which pattern has 61 squares?", "pattern 30")], cols=2)
    ws.section("Problem solving")
    ws.question("Could a pattern in this sequence have 80 squares? Explain.", "No: 2n + 1 is always odd.", space=35)


# ==========================================================================
# Simultaneous equations
# ==========================================================================
def sim_sys(a, b, c, d, x, y):
    return f"{line(a, b)} = {a * x + b * y}\n{line(c, d)} = {c * x + d * y}", f"x = {num(x)}, y = {num(y)}"


def line(a, b):
    sa = ("" if a == 1 else "−" if a == -1 else str(a)) + "x"
    sb = ("+ " if b > 0 else "− ") + ("" if abs(b) == 1 else str(abs(b))) + "y"
    return f"{sa} {sb}".replace("-", "−")


def sim_elim(ws):
    ws.section("Practice")
    cases = [(1, 1, 1, -1, 5, 2), (2, 1, 1, 1, 3, 4), (3, 2, 1, 2, 2, 1), (2, 3, 4, -3, 3, -1), (5, 2, 3, 4, 2, -3), (4, 3, 3, 2, -1, 5)]
    for a, b, c, d, x, y in cases[:3]:
        pass
    P(ws, "Solve these simultaneous equations.", [(f"{line(a, b)} = {a * x + b * y}  and  {line(c, d)} = {c * x + d * y}".replace("-", "−"),
                                                   f"x = {num(x)}, y = {num(y)}") for a, b, c, d, x, y in cases], cols=1)
    ws.section("Problem solving")
    ws.question("3 pens and 2 rulers cost £3.30. 1 pen and 2 rulers cost £1.70. Find the cost of each.",
                "2 pens = £1.60: pen 80p, ruler 45p", space=50)


def sim_sub(ws):
    ws.section("Practice")
    cases = [("y = 2x", "x + y = 9", 3, 6), ("y = x + 3", "2x + y = 12", 3, 6), ("x = 4y", "x − 2y = 6", 12, 3),
             ("y = 3x − 1", "2x + y = 14", 3, 8), ("y = 5 − x", "3x − y = 7", 3, 2)]
    P(ws, "Solve by substitution.", [(f"{p}  and  {q}", f"x = {x}, y = {y}") for p, q, x, y in cases], cols=1)
    ws.section("Problem solving")
    ws.question("The sum of two numbers is 20 and one is 4 more than the other. Find them.", "x + y = 20, y = x + 4: 8 and 12",
                space=45)


def sim_graph(ws):
    ws.section("Practice")
    fig = axes(-2, 6, -2, 8, [("line", [(-1, -1), (4, 9)]), ("line", [(-2, 8), (6, 0)])])
    ws.question("The graphs of y = 2x + 1 and x + y = 6 are drawn. Use them to solve the simultaneous equations.",
                "where they cross: x = [[5//3]] ≈ 1.7, y ≈ 4.3", figure=fig, fig_w=200, fig_h=210, space=10)
    ws.question("Draw the graphs of y = x + 2 and y = 8 − x on the grid. Use them to solve the equations.", "x = 3, y = 5",
                figure=axes(-2, 8, -2, 10, label_step=2), fig_w=190, fig_h=200, space=10)
    ws.section("Problem solving")
    ws.question("What does it mean if two lines are parallel, for the simultaneous equations?", "There is no solution.", space=30)


def sim_adv(ws):
    ws.section("Practice")
    P(ws, "Solve (one equation is quadratic).", [
        ("y = x^2  and  y = x + 6", "x = 3, y = 9 or x = −2, y = 4"),
        ("y = x^2 − 3  and  y = 2x", "x = 3, y = 6 or x = −1, y = −2"),
        ("x^2 + y^2 = 25  and  y = x + 1", "x = 3, y = 4 or x = −4, y = −3"),
        ("y = x^2 + 2x  and  y = 4x + 3", "x = 3, y = 15 or x = −1, y = −1")], cols=1)
    ws.section("Problem solving")
    ws.question("Show that the line y = 2x − 5 does not meet the curve y = x^2.", "x^2 − 2x + 5 = 0 has b^2 − 4ac = −16 < 0", space=45)


# ==========================================================================
# Graph types and transformations
# ==========================================================================
def types_graph(ws, kind):
    ws.section("Practice")
    shapes = {"cubic": lambda x: x ** 3 / 4, "quadratic": lambda x: x * x / 2 - 3, "reciprocal": lambda x: 2 / x if abs(x) > 0.3 else None,
              "exponential": lambda x: 2 ** x, "linear": lambda x: x + 1}
    def fig(f, lo=-4, hi=4):
        items = []
        if f is shapes["reciprocal"]:
            items = [("curve", lambda x: 2 / x, -4, -0.4), ("curve", lambda x: 2 / x, 0.4, 4)]
        else:
            items = [("curve", f, lo, hi)]
        return axes(-4, 4, -5, 5, items, label_step=2)
    if kind == "mixture":
        order = ["quadratic", "cubic", "reciprocal", "exponential", "linear"]
        ws.figures("Name the type of each graph (linear, quadratic, cubic, reciprocal or exponential).",
                   [fig(shapes[k]) for k in order], order, cols=3, fig_h=120)
        P(ws, "Match each equation to a type of graph.", [("y = 3x − 2", "linear"), ("y = x^3 − x", "cubic"), ("y = [[5//x]]", "reciprocal"),
                                                          ("y = 3^x", "exponential"), ("y = 2x^2 + 1", "quadratic")], cols=3)
    else:
        f = {"cubics": lambda x: x ** 3 - 3 * x, "exponential": lambda x: 2 ** x, "reciprocal": None}[kind]
        if kind == "cubics":
            xs = list(range(-3, 4))
            ws.question("Complete the table for y = x^3 − 3x, then draw the graph.", ", ".join(str(x ** 3 - 3 * x).replace("-", "−")
                                                                                         for x in xs), space=0)
            ws.figure_only(table([["x"] + [str(x).replace("-", "−") for x in xs], ["y"] + [""] * 7]), 300, 44)
            ws.figure_only(axes(-3, 3, -18, 18, ystep=2), 220, 230)
        elif kind == "exponential":
            xs = list(range(-2, 5))
            ws.question("Complete the table for y = 2^x, then draw the graph.", ", ".join(num(Fr(2) ** x) for x in xs), space=0)
            ws.figure_only(table([["x"] + [str(x).replace("-", "−") for x in xs], ["y"] + [""] * 7]), 300, 44)
            ws.figure_only(axes(-2, 4, -1, 16, ystep=1), 220, 230)
        else:
            xs = [-4, -2, -1, -0.5, 0.5, 1, 2, 4]
            ws.question("Complete the table for y = [[4//x]], then draw the graph.", ", ".join(num(Fr(4) / Fr(x).limit_denominator()) for x in xs),
                        space=0)
            ws.figure_only(table([["x"] + [str(x).replace("-", "−") for x in xs], ["y"] + [""] * 8]), 330, 44)
            ws.figure_only(axes(-4, 4, -8, 8, ystep=1), 220, 230)
    ws.section("Problem solving")
    extra = {"cubics": ("How many times can a cubic graph cross the x-axis?", "1, 2 or 3 times"),
             "exponential": ("A population of bacteria doubles every hour, starting at 100. Write a formula for the number after t hours.",
                             "N = 100 × 2^t"),
             "reciprocal": ("Explain why y = [[4//x]] has no value when x = 0.", "You can't divide by 0; the graph has an asymptote."),
             "mixture": ("Which type of graph never crosses the x-axis: y = 2^x or y = x^3?", "y = 2^x")}[kind]
    ws.question(extra[0], extra[1], space=40)


def transform_graph(ws, trig=False):
    ws.section("Practice")
    if not trig:
        P(ws, "y = f(x) has a turning point at (2, 3). Write down the turning point of", [
            ("y = f(x) + 4", "(2, 7)"), ("y = f(x − 1)", "(3, 3)"), ("y = f(x + 5)", "(−3, 3)"), ("y = −f(x)", "(2, −3)"),
            ("y = f(−x)", "(−2, 3)"), ("y = f(x) − 3", "(2, 0)")], cols=3)
        P(ws, "Describe the transformation that maps y = f(x) onto", [("y = f(x) + 2", "translation by {{0;2}}"),
                                                                      ("y = f(x − 3)", "translation by {{3;0}}"),
                                                                      ("y = −f(x)", "reflection in the x-axis")], cols=1)
    else:
        P(ws, "Describe how each graph is related to y = sin x.", [("y = sin x + 1", "translation up 1"),
                                                                    ("y = sin(x − 90°)", "translation 90° to the right"),
                                                                    ("y = 2 sin x", "stretch in the y-direction, scale factor 2"),
                                                                    ("y = −sin x", "reflection in the x-axis")], cols=1)
        P(ws, "Write down the maximum value of", [("y = 3 cos x", "3"), ("y = cos x + 2", "3"), ("y = 2 sin x − 1", "1")], cols=3)
    ws.section("Problem solving")
    ws.question("Explain why y = f(x − 2) moves the graph RIGHT, not left.", "You need x to be 2 bigger to get the same output, so every "
                "point moves 2 to the right.", space=45)


SHEETS = [
    ({"slug": "quadratic-graphs-drawing"}, qg_draw), ({"slug": "quadratic-graphs-sketching-using-key-points"}, qg_sketch),
    ({"slug": "quadratic-graphs-finding-turning-point"}, qg_turning), ({"slug": "quadratic-graphs-line-of-symmetry"}, qg_symmetry),
    ({"slug": "quadratics-solving-factorising"}, q_factorising), ({"slug": "quadratics-solving-foundation"}, q_foundation),
    ({"slug": "quadratics-the-quadratic-formula"}, q_formula), ({"slug": "quadratics-solving-completing-the-square"}, q_cts),
    ({"slug": "quadratics-solving-graphically"}, q_graphical),
    ({"slug": "quadratics-solving-graphically-advanced"}, lambda ws: q_graphical(ws, True)),
    ({"slug": "quadratics-forming-and-solving"}, q_forming),
    ({"slug": "sequences-describing-rules"}, seq_rules), ({"slug": "sequences-missing-terms"}, seq_missing),
    ({"slug": "sequences-fibonacci"}, seq_fib), ({"slug": "sequences-nth-term"}, seq_nth),
    ({"slug": "sequences-nth-term-for-fractional-sequences"}, seq_frac), ({"slug": "sequences-patterns"}, seq_patterns),
    ({"slug": "simultaneous-equations-elimination"}, sim_elim),
    ({"slug": "simultaneous-equations-substitution-both-linear"}, sim_sub),
    ({"slug": "simultaneous-equations-graphical"}, sim_graph), ({"slug": "simultaneous-equations-advanced"}, sim_adv),
    ({"slug": "types-of-graph-cubics"}, lambda ws: types_graph(ws, "cubics")),
    ({"slug": "types-of-graph-exponential"}, lambda ws: types_graph(ws, "exponential")),
    ({"slug": "types-of-graph-reciprocal"}, lambda ws: types_graph(ws, "reciprocal")),
    ({"slug": "types-of-graph-mixture"}, lambda ws: types_graph(ws, "mixture")),
    ({"slug": "transformations-of-graphs"}, transform_graph),
    ({"slug": "transformations-of-trigonometric-graphs"}, lambda ws: transform_graph(ws, True)),
]
