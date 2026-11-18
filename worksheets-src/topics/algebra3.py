"""Indices (4), inequalities (7), limits of accuracy (2) and linear graphs (13).
Answers are worked out with exact fractions."""
from fractions import Fraction as Fr
from engine.algebra import solve_linear, parse, num
from engine.draw import axes
from engine.geo import scene


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def FQ(ws, prompt, answer, fig, w=200, h=200, pos="right", space=10):
    ws.question(prompt, answer, figure=fig, fig_w=w, fig_h=h, fig_pos=pos, space=space)


# ==========================================================================
# Indices
# ==========================================================================
def ind_num(ws):
    ws.section("Practice")
    P(ws, "Work out", [(f"{b}^{e}" if e < 10 else f"{b}^{{{e}}}", str(b ** e)) for b, e in
                       [(2, 3), (5, 2), (10, 4), (3, 4), (2, 5), (4, 3), (1, 9), (7, 0), (6, 2), (2, 10)]], cols=5)
    P(ws, "Work out", [("(−3)^2", "9"), ("(−2)^3", "−8"), ("−4^2", "−16"), ("2^3 × 3^2", "72"), ("5^2 − 2^4", "9"),
                       ("[[10^3//10^2]]", "10")], cols=3)
    P(ws, "Write in index form", [("2 × 2 × 2 × 2", "2^4"), ("5 × 5 × 5", "5^3"), ("7 × 7 × 7 × 7 × 7 × 7", "7^6"),
                                  ("3 × 3 × 4 × 4 × 4", "3^2 × 4^3")], cols=2)
    ws.section("Problem solving")
    ws.question("Which is bigger: 2^5 or 5^2? Show how you know.", "2^5 = 32, 5^2 = 25, so 2^5", space=35)
    ws.question("Find the value of n: 3^n = 243.", "n = 5", space=30)


def ind_frac(ws):
    ws.section("Practice")
    P(ws, "Work out", [("9^{1/2}", "3"), ("64^{1/2}", "8"), ("27^{1/3}", "3"), ("125^{1/3}", "5"), ("16^{1/4}", "2"),
                       ("1000^{1/3}", "10")], cols=3)
    P(ws, "Work out", [("8^{2/3}", "4"), ("16^{3/4}", "8"), ("25^{3/2}", "125"), ("32^{2/5}", "4"), ("27^{−1/3}", "[[1//3]]"),
                       ("(4/9)^{1/2}", "[[2//3]]"), ("(8/27)^{2/3}", "[[4//9]]"), ("100^{−3/2}", "[[1//1000]]")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain what 8^{2/3} means and work it out.", "the cube root of 8, squared: 2^2 = 4", space=40)
    ws.question("Write 4^{3/2} × 4^{1/2} as a whole number.", "4^2 = 16", space=30)


def ind_laws(ws):
    ws.section("Practice")
    P(ws, "Simplify. Leave your answers in index form.", [
        ("3^4 × 3^5", "3^9"), ("7^2 × 7^6", "7^8"), ("5^8 ÷ 5^3", "5^5"), ("2^{10} ÷ 2^4", "2^6"), ("(2^3)^4", "2^{12}"),
        ("(6^2)^5", "6^{10}"), ("4^5 × 4 ÷ 4^3", "4^3"), ("[[9^6 × 9^2//9^5]]", "9^3")], cols=4)
    P(ws, "Find the value of n.", [("2^n × 2^3 = 2^8", "5"), ("5^9 ÷ 5^n = 5^2", "7"), ("(3^n)^2 = 3^{10}", "5"),
                                   ("10^n = 10^4 × 10^{−1}", "3")], cols=2)
    ws.section("Problem solving")
    ws.question("Sam says 2^3 × 2^4 = 4^7. Explain his mistake.", "When the bases are the same you keep the base and add "
                "the powers: 2^7.", space=40)
    ws.question("Write 8^3 as a power of 2.", "(2^3)^3 = 2^9", space=30)


def ind_neg(ws):
    ws.section("Practice")
    P(ws, "Write as a fraction", [("2^{−1}", "[[1//2]]"), ("5^{−2}", "[[1//25]]"), ("10^{−3}", "[[1//1000]]"), ("3^{−4}", "[[1//81]]"),
                                  ("4^{−3}", "[[1//64]]"), ("7^{−1}", "[[1//7]]")], cols=3)
    P(ws, "Work out", [("(1/3)^{−2}", "9"), ("(2/5)^{−1}", "[[5//2]]"), ("(3/4)^{−2}", "[[16//9]]"), ("2^{−3} × 2^5", "4"),
                       ("10^{−2} as a decimal", "0.01"), ("4^{−1/2}", "[[1//2]]")], cols=3)
    ws.section("Problem solving")
    ws.question("Explain why 2^{−3} = [[1//8]].", "Each step down in the power divides by 2: 2^0 = 1, 2^{−1} = [[1//2]], "
                "2^{−2} = [[1//4]], 2^{−3} = [[1//8]].", space=45)


# ==========================================================================
# Inequalities
# ==========================================================================
def ineq_sym(ws):
    ws.section("Practice")
    P(ws, "Write < or > between each pair.", [("7 ___ 4", ">"), ("−3 ___ 2", "<"), ("0.5 ___ 0.45", ">"), ("−6 ___ −9", ">"),
                                              ("[[1//4]] ___ [[1//3]]", "<"), ("2^3 ___ 3^2", "<")], cols=3)
    P(ws, "List the integers that satisfy each inequality.", [("−2 < x ≤ 3", "−1, 0, 1, 2, 3"), ("0 ≤ x < 4", "0, 1, 2, 3"),
                                                             ("−5 ≤ x < −1", "−5, −4, −3, −2"), ("1 < x < 2", "none")], cols=2)
    P(ws, "Write an inequality for", [("x is more than 6", "x > 6"), ("x is at most 10", "x ≤ 10"),
                                      ("x is at least −2", "x ≥ −2"), ("x is between 3 and 8, including 3", "3 ≤ x < 8")], cols=2)
    ws.section("Problem solving")
    ws.question("Explain the difference between x < 5 and x ≤ 5.", "x < 5 does not include 5; x ≤ 5 includes 5.", space=35)


def numline(lo, hi, a=None, a_closed=True, b=None, b_closed=True, arrow=None):
    """A number line from lo to hi, with circles at a (and b) and either a
    segment between them or an arrow ("L" or "R") from a."""
    items = [("seg", (lo - 0.5, 0), (hi + 0.5, 0))]
    for k in range(lo, hi + 1):
        items += [("seg", (k, -0.15), (k, 0.15), "thin"), ("text", (k, -0.5), str(k).replace("-", "−"))]
    def circ(x, closed):
        items.append(("circle", (x, 0.6), 0.18, "solid") if closed else ("circle", (x, 0.6), 0.18))
    if a is not None:
        circ(a, a_closed)
        if b is not None:
            circ(b, b_closed)
            items.append(("seg", (a + 0.18, 0.6), (b - 0.18, 0.6)))
        elif arrow:
            end = hi + 0.4 if arrow == "R" else lo - 0.4
            items.append(("ray", (a + (0.18 if arrow == "R" else -0.18), 0.6), (end, 0.6)))
    else:
        items.append(("text", (lo, 0.9), ""))
    return scene(items, pad=8, font_size=8.5)


def ineq_line(ws):
    ws.section("Practice")
    lines = [(numline(-5, 5, 2, False, arrow="R"), "x > 2"), (numline(-5, 5, -1, True, arrow="L"), "x ≤ −1"),
             (numline(-5, 5, -3, True, 1, False), "−3 ≤ x < 1"), (numline(-5, 5, 0, False, 4, True), "0 < x ≤ 4")]
    ws.figures("Write down the inequality shown on each number line.", [f for f, _ in lines], [a for _, a in lines], cols=2,
               fig_h=50)
    blank = numline(-5, 5)
    ws.figures("Show each inequality on the number line.   (a) x ≥ 3   (b) x < −2   (c) −4 < x ≤ 1   (d) −1 ≤ x ≤ 2",
               [blank] * 4, ["closed circle at 3, arrow right", "open circle at −2, arrow left",
                             "open circle at −4, closed circle at 1, joined", "closed circles at −1 and 2, joined"],
               cols=2, fig_h=45, answer_line=False)
    ws.section("Problem solving")
    ws.question("Why do some number lines use an open circle and some a closed circle?",
                "Open means the number is not included (< or >); closed means it is included (≤ or ≥).", space=40)


def ineq(lhs, sym, rhs):
    p = parse(lhs)
    q = parse(rhs)
    a = p.get((("x", 1),), 0) - q.get((("x", 1),), 0)
    x0 = solve_linear(f"{lhs} = {rhs}")
    flip = {">": "<", "<": ">", "≥": "≤", "≤": "≥"}
    s = flip[sym] if a < 0 else sym
    return f"{lhs} {sym} {rhs}", f"x {s} {num(x0)}"


def ineq_one(ws):
    ws.section("Practice")
    P(ws, "Solve", [ineq("x + 5", ">", "12"), ineq("x − 3", "≤", "4"), ineq("3x", "<", "18"), ineq("2x + 1", "≥", "9"),
                    ineq("5x − 4", ">", "11"), ineq("4x + 7", "<", "3"), ineq("3(x − 2)", "≥", "12"), ineq("7x + 2", "≤", "5x + 10")],
      cols=4)
    P(ws, "Solve. Be careful when you multiply or divide by a negative number.",
      [ineq("−2x", "<", "8"), ineq("5 − x", ">", "2"), ineq("10 − 3x", "≤", "1"), ineq("4 − 2x", "≥", "x + 13")], cols=4)
    ws.section("Problem solving")
    ws.question("Find the largest integer that satisfies 3x + 4 < 19.", "3x < 15, x < 5, so 4", space=40)
    ws.question("Explain why −2x > 6 gives x < −3, not x > −3.", "Dividing by a negative number reverses the inequality sign.",
                space=40)


def ineq_two(ws):
    ws.section("Practice")
    cases = [("−3 < 2x + 1 ≤ 9", "−2 < x ≤ 4", "−1, 0, 1, 2, 3, 4"), ("5 ≤ 3x − 1 < 14", "2 ≤ x < 5", "2, 3, 4"),
             ("−6 < x − 4 < 1", "−2 < x < 5", "−1, 0, 1, 2, 3, 4"), ("−10 ≤ 5x < 15", "−2 ≤ x < 3", "−2, −1, 0, 1, 2"),
             ("1 < [[x//2]] ≤ 3", "2 < x ≤ 6", "3, 4, 5, 6"), ("−7 ≤ 4x + 1 ≤ 9", "−2 ≤ x ≤ 2", "−2, −1, 0, 1, 2")]
    P(ws, "Solve each inequality, then list the integers that satisfy it.", [(q, f"{s};  integers {i}") for q, s, i in cases],
      cols=2)
    ws.section("Problem solving")
    ws.question("n is an integer with −4 < 2n ≤ 6. Write down all possible values of n.", "−1, 0, 1, 2, 3", space=40)


def region_fig(lines, shade, rng=(-5, 5, -5, 5)):
    return axes(*rng, [("polygon", shade, "shade")] + lines)


def ineq_graph_a(ws):
    ws.section("Practice")
    cases = [([("line", [(2, -5), (2, 5)])], [(2, -5), (5, -5), (5, 5), (2, 5)], "x ≥ 2"),
             ([("line", [(-5, -1), (5, -1)], "dashed")], [(-5, -5), (5, -5), (5, -1), (-5, -1)], "y < −1"),
             ([("line", [(-3, -5), (-3, 5)], "dashed")], [(-5, -5), (-3, -5), (-3, 5), (-5, 5)], "x < −3"),
             ([("line", [(-5, 3), (5, 3)])], [(-5, 3), (5, 3), (5, 5), (-5, 5)], "y ≥ 3")]
    ws.figures("Write down the inequality for each shaded region. (A dashed line means the line is not included.)",
               [region_fig(l, s) for l, s, _ in cases], [a for *_, a in cases], cols=2, fig_h=140)
    ws.question("Shade the region where x > 1 and y ≤ 2. Label it R.",
                "draw x = 1 dashed and y = 2 solid; R is to the right of x = 1 and below y = 2",
                figure=axes(-5, 5, -5, 5), fig_w=180, fig_h=180, space=10)
    ws.section("Problem solving")
    ws.question("Is the point (1, 3) in the region x ≥ 1, y < 3? Explain.", "No: y = 3 is not less than 3.", space=35)


def ineq_graph_b(ws):
    ws.section("Practice")
    cases = [([("line", [(-5, -3), (3, 5)])], [(-5, -3), (3, 5), (-5, 5)], "y ≥ x + 2"),
             ([("line", [(-4, -5), (5, 4)], "dashed")], [(-4, -5), (5, -5), (5, 4)], "y < x − 1"),
             ([("line", [(-5, 5), (5, -5)])], [(-5, -5), (5, -5), (-5, 5)], "y ≤ −x"),
             ([("line", [(-0.5, -5), (4.5, 5)], "dashed")], [(-0.5, -5), (4.5, 5), (-5, 5), (-5, -5)], "y > 2x − 4")]
    ws.figures("Write down the inequality for each shaded region.", [region_fig(l, s) for l, s, _ in cases],
               [a for *_, a in cases], cols=2, fig_h=140)
    ws.question("Draw y = x + 1 and shade the region y < x + 1.", "dashed line through (0, 1) and (2, 3); shade below it",
                figure=axes(-5, 5, -5, 5), fig_w=180, fig_h=180, space=10)
    ws.section("Problem solving")
    ws.question("How can you check which side of a line to shade?", "Test a point, e.g. (0, 0): if it makes the inequality "
                "true, it's in the region.", space=40)


def ineq_regions(ws):
    ws.section("Practice")
    ws.question("On the grid, draw the lines x = 1, y = x and x + y = 6.\nShade the region R where x ≥ 1, y ≥ x and "
                "x + y ≤ 6.\nList the points with integer coordinates in R.",
                "R is the triangle with corners (1, 1), (3, 3) and (1, 5). Integer points: (1,1), (1,2), (1,3), (1,4), "
                "(1,5), (2,2), (2,3), (2,4), (3,3)", figure=axes(-1, 7, -1, 7), fig_w=200, fig_h=200, space=10)
    shade = [(0, 0), (4, 0), (0, 4)]
    fig = axes(-1, 6, -1, 6, [("polygon", shade, "shade"), ("line", [(-1, 5), (5, -1)]), ("line", [(0, -1), (0, 6)]),
                              ("line", [(-1, 0), (6, 0)])])
    ws.question("Write down the three inequalities that describe the shaded region.", "x ≥ 0, y ≥ 0, x + y ≤ 4",
                figure=fig, fig_w=180, fig_h=180, space=10)
    ws.section("Problem solving")
    ws.question("A region satisfies y > 1, x > 1 and x + y < 5. Find all the points with integer coordinates in the region.",
                "(2, 2) only: (2, 3) and (3, 2) give x + y = 5, which is not less than 5", space=45)


def limits(ws):
    ws.section("Practice")
    P(ws, "Write down the error interval for each measurement.", [
        ("7 cm, to the nearest cm", "6.5 ≤ x < 7.5"), ("40 kg, to the nearest 10 kg", "35 ≤ x < 45"),
        ("3.4 m, to 1 decimal place", "3.35 ≤ x < 3.45"), ("400, to the nearest 100", "350 ≤ x < 450"),
        ("2.75 l, to 2 decimal places", "2.745 ≤ x < 2.755"), ("60 s, to 1 significant figure", "55 ≤ x < 65")], cols=2)
    P(ws, "These numbers were truncated. Write the error interval.", [("5.6, truncated to 1 d.p.", "5.6 ≤ x < 5.7"),
                                                                      ("12, truncated to a whole number", "12 ≤ x < 13")], cols=2)
    ws.section("Problem solving")
    ws.question("A rope is 25 m long to the nearest metre. Can it be 25.5 m long? Explain.",
                "No: the upper bound 25.5 is not included (it would round to 26).", space=40)


def limits_apply(ws):
    ws.section("Practice")
    P(ws, "Work out the upper and lower bounds.", [
        ("A square has sides of 6 cm to the nearest cm. Find the bounds of its perimeter.", "lower 22 cm, upper 26 cm"),
        ("A rectangle is 8 cm by 5 cm, both to the nearest cm. Find the bounds of its area.",
         "lower 7.5 × 4.5 = 33.75 cm^2, upper 8.5 × 5.5 = 46.75 cm^2"),
        ("A car travels 100 km (nearest 10 km) in 2 hours (nearest 0.1 h). Find the upper bound of its speed.",
         "105 ÷ 1.95 = 53.8 km/h (1 d.p.)"),
        ("a = 12 and b = 4, both to the nearest whole number. Find the lower bound of a ÷ b.", "11.5 ÷ 4.5 = 2.56 (2 d.p.)")],
      cols=1, row_h=36)
    ws.section("Problem solving")
    ws.question("To find the upper bound of a − b, which bounds of a and b should you use? Explain.",
                "upper bound of a and lower bound of b: subtracting the smallest possible b from the biggest possible a",
                space=45)


# ==========================================================================
# Linear graphs
# ==========================================================================
def line_pts(m, c, lo=-5, hi=5):
    """End points of y = mx + c clipped to the box lo..hi."""
    pts = []
    for x in [lo + k * 0.01 for k in range(int((hi - lo) / 0.01) + 1)]:
        y = m * x + c
        if lo <= y <= hi:
            pts.append((x, y))
    return [pts[0], pts[-1]]


def eq(m, c):
    m, c = Fr(m), Fr(c)
    ms = "" if m == 1 else "−" if m == -1 else num(m)
    out = f"y = {ms}x" if m else "y = "
    if c or not m:
        out += (f" {'+' if c > 0 else '−'} {num(abs(c))}" if m else num(c))
    return out


def lg_table(ws):
    ws.section("Practice")
    for m, c in ((2, 1), (-1, 3)):
        xs = list(range(-2, 4))
        ws.question(f"(a) Complete the table of values for {eq(m, c)}.\n(b) Draw the graph of {eq(m, c)}.",
                    "(a) " + ", ".join(num(m * x + c) for x in xs) + "   (b) a straight line through these points",
                    figure=None, space=5)
        from engine.geo import table
        ws.figure_only(table([["x"] + [str(x).replace("-", "−") for x in xs], ["y"] + [""] * len(xs)]), 300, 44)
        ws.figure_only(axes(-3, 4, -6, 8, label_step=2), 200, 200)
    ws.section("Problem solving")
    ws.question("Does the point (4, 9) lie on y = 2x + 1? Explain.", "Yes: 2 × 4 + 1 = 9", space=30)


def lg_mxc_draw(ws, across=False):
    ws.section("Practice")
    eqs = [(2, 1), (3, -2), (-1, 4), (Fr(1, 2), 1), (-2, -1), (1, -3)]
    method = ("Start at the y-intercept (0, c), then go 1 across and m up (or down if m is negative). Repeat."
              if across else "Plot the y-intercept, then use the gradient to find more points.")
    for k in range(0, 6, 2):
        a, b = eqs[k], eqs[k + 1]
        ws.question(f"{method}\nDraw the graphs of {eq(*a)} and {eq(*b)}.".lstrip("\n"), f"{eq(*a)}: through (0, {num(a[1])}), gradient "
                    f"{num(a[0])};   {eq(*b)}: through (0, {num(b[1])}), gradient {num(b[0])}",
                    figure=axes(-5, 5, -5, 5), fig_w=190, fig_h=190, space=5)
        method = ""
    ws.section("Problem solving")
    ws.question("Explain how you can draw y = 3x − 2 without making a table of values.",
                "Plot (0, −2), then go 1 across and 3 up again and again, and join the points.", space=40)


def lg_gradient(ws):
    ws.section("Practice")
    lines = [(2, 1), (-1, 2), (Fr(1, 2), -1), (3, -2), (-2, 0), (Fr(-1, 3), 1)]
    ws.figures("Work out the gradient of each line.", [axes(-5, 5, -5, 5, [("line", line_pts(m, c))], label_step=2)
                                                      for m, c in lines], [num(m) for m, _ in lines], cols=3, fig_h=120)
    ws.section("Problem solving")
    ws.question("A line goes down 6 squares as it goes across 2 squares. What is its gradient?", "−3", space=35)
    ws.question("Explain what a gradient of 0 means.", "the line is horizontal (flat)", space=30)


def lg_grad_pts(ws):
    ws.section("Practice")
    pairs = [((1, 2), (3, 8)), ((0, 5), (2, 1)), ((-1, 4), (3, 6)), ((2, -3), (6, 5)), ((-4, 1), (2, -2)),
             ((0, 0), (5, 3))]
    def f(p):
        return f"({p[0]}, {p[1]})".replace("-", "−")
    P(ws, "Work out the gradient of the line through each pair of points.",
      [(f"{f(a)} and {f(b)}", num(Fr(b[1] - a[1], b[0] - a[0]))) for a, b in pairs], cols=2)
    ws.section("Problem solving")
    ws.question("A line through (2, k) and (5, 10) has gradient 2. Find k.", "(10 − k) ÷ 3 = 2, so k = 4", space=40)


def lg_mxc(ws):
    ws.section("Practice")
    P(ws, "Write down the gradient and y-intercept of each line.", [
        ("y = 3x + 2", "gradient 3, intercept 2"), ("y = −2x + 5", "gradient −2, intercept 5"), ("y = x − 7", "1, −7"),
        ("y = [[1//2]]x + 3", "[[1//2]], 3"), ("y = 4 − x", "−1, 4"), ("y = 6x", "6, 0")], cols=2)
    P(ws, "Rearrange into the form y = mx + c, then give the gradient and intercept.", [
        ("2y = 4x + 6", "y = 2x + 3: 2, 3"), ("y − 5x = 1", "y = 5x + 1: 5, 1"), ("3y = 9 − 6x", "y = −2x + 3: −2, 3"),
        ("x + y = 8", "y = −x + 8: −1, 8")], cols=2)
    ws.section("Problem solving")
    ws.question("Which of these lines is steepest?  y = 2x + 9,   y = −5x,   y = 4x − 1", "y = −5x (gradient −5 is steepest)",
                space=40)


def lg_flat(ws, vertical=False):
    ws.section("Practice")
    vals = [3, -2, 4, -4] if vertical else [2, -3, 4, -1]
    items = [("line", [(v, -5), (v, 5)] if vertical else [(-5, v), (5, v)]) for v in vals]
    fig = axes(-5, 5, -5, 5, items + [("label", (v + 0.4) if vertical else 4.2, (4.3 if vertical else v + 0.45), l)
                                      for v, l in zip(vals, "ABCD")])
    ws.question("Write down the equation of each line A to D.", ", ".join(f"{l}: {'x' if vertical else 'y'} = {num(v)}"
                                                                      for v, l in zip(vals, "ABCD")),
                figure=fig, fig_w=200, fig_h=200, space=10)
    ws.question(f"Draw and label these lines:  {'x = 1,  x = −3,  x = 4.5' if vertical else 'y = 1,  y = −4,  y = 3.5'}",
                "check: " + ("vertical lines" if vertical else "horizontal lines") + " through those values",
                figure=axes(-5, 5, -5, 5), fig_w=200, fig_h=200, space=10)
    ws.section("Problem solving")
    ws.question(f"Write down the coordinates where {'x = 2' if vertical else 'y = 2'} crosses y = x.", "(2, 2)", space=30)
    ws.question(f"What is the gradient of a {'vertical' if vertical else 'horizontal'} line?",
                "it is undefined (infinitely steep)" if vertical else "0", space=30)


def lg_find(ws):
    ws.section("Practice")
    lines = [(2, -1), (-1, 3), (Fr(1, 2), 2), (3, 1), (-2, -2), (Fr(-1, 2), -1)]
    ws.figures("Find the equation of each line in the form y = mx + c.",
               [axes(-5, 5, -5, 5, [("line", line_pts(m, c))], label_step=2) for m, c in lines],
               [eq(m, c) for m, c in lines], cols=3, fig_h=120)
    ws.section("Problem solving")
    ws.question("A line has gradient 3 and passes through (2, 5). Find its equation.", "5 = 6 + c, c = −1: y = 3x − 1", space=40)


def lg_two_pts(ws):
    ws.section("Practice")
    pairs = [((0, 1), (2, 5)), ((1, 3), (3, 7)), ((2, 1), (4, -3)), ((-1, -4), (2, 5)), ((0, 4), (6, 1)), ((-2, 3), (2, 1))]
    def f(p):
        return f"({p[0]}, {p[1]})".replace("-", "−")
    out = []
    for a, b in pairs:
        m = Fr(b[1] - a[1], b[0] - a[0])
        out.append((f"{f(a)} and {f(b)}", eq(m, a[1] - m * a[0])))
    P(ws, "Find the equation of the line through each pair of points.", out, cols=2)
    ws.section("Problem solving")
    ws.question("Do the points (0, 2), (2, 6) and (5, 12) lie on the same straight line? Explain.",
                "Yes: the gradients between them are both 2, and the line is y = 2x + 2.", space=45)


def lg_parallel(ws):
    ws.section("Practice")
    P(ws, "Write down the gradient of a line parallel to", [("y = 4x − 1", "4"), ("y = −2x + 7", "−2"), ("2y = 6x + 1", "3"),
                                                           ("x + y = 5", "−1")], cols=4)
    P(ws, "Find the equation of the line parallel to the given line, through the given point.", [
        ("y = 2x + 5, through (0, −3)", "y = 2x − 3"), ("y = 3x − 1, through (2, 4)", "y = 3x − 2"),
        ("y = −x + 6, through (4, 1)", "y = −x + 5"), ("y = [[1//2]]x, through (6, 2)", "y = [[1//2]]x − 1")], cols=2)
    ws.section("Problem solving")
    ws.question("Which two of these lines are parallel?  y = 3x + 1,  2y = 6x − 5,  y = 1 − 3x", "y = 3x + 1 and 2y = 6x − 5 "
                "(both gradient 3)", space=40)


def lg_perp(ws):
    ws.section("Practice")
    P(ws, "Write down the gradient of a line perpendicular to", [("y = 2x + 1", "−[[1//2]]"), ("y = −3x", "[[1//3]]"),
                                                                ("y = [[1//4]]x − 2", "−4"), ("y = −[[2//3]]x + 5", "[[3//2]]")], cols=4)
    P(ws, "Find the equation of the line perpendicular to the given line, through the given point.", [
        ("y = 2x + 3, through (0, 1)", "y = −[[1//2]]x + 1"), ("y = −x + 4, through (2, 5)", "y = x + 3"),
        ("y = 3x − 2, through (3, 1)", "y = −[[1//3]]x + 2"), ("y = [[1//2]]x + 1, through (1, 4)", "y = −2x + 6")], cols=2)
    ws.section("Problem solving")
    ws.question("Show that y = 4x − 3 and 4y + x = 8 are perpendicular.", "gradients 4 and −[[1//4]]; 4 × −[[1//4]] = −1",
                space=45)


def lg_real(ws):
    ws.section("Practice")
    fig = axes(0, 10, 0, 10, [("line", [(0, 2), (8, 10)]), ("line", [(0, 5), (10, 10)], "dashed")], label_step=2)
    ws.question("Two phone plans: Plan A (solid line) and Plan B (dashed). The x-axis shows hundreds of minutes used, the "
                "y-axis shows the cost in £ tens.\n(a) Which plan has the bigger fixed charge?\n(b) Which plan costs more "
                "per minute?\n(c) For how many minutes do the plans cost the same?",
                "(a) Plan B   (b) Plan A (steeper)   (c) where the lines cross: 6 hundred minutes (600)",
                figure=fig, fig_w=190, fig_h=190, space=10)
    P(ws, "A plumber charges using C = 40h + 30, where C is the cost in £ and h is the number of hours.", [
        ("What is the call-out charge?", "£30"), ("How much per hour?", "£40"), ("Find the cost of a 3-hour job.", "£150")], cols=1)
    ws.section("Problem solving")
    ws.question("What does the gradient of a distance–time graph tell you?", "the speed", space=30)


SHEETS = [
    ({"slug": "indices-numerical"}, ind_num), ({"slug": "indices-fractional"}, ind_frac),
    ({"slug": "indices-laws-of"}, ind_laws), ({"slug": "indices-negative"}, ind_neg),
    ({"slug": "inequalities-symbols"}, ineq_sym), ({"slug": "inequalities-on-a-number-line"}, ineq_line),
    ({"slug": "inequalities-solving-one-sign"}, ineq_one), ({"slug": "inequalities-solving-two-signs"}, ineq_two),
    ({"slug": "inequalities-graphical-y-a-or-x-a"}, ineq_graph_a), ({"slug": "inequalities-graphical-y-x-a"}, ineq_graph_b),
    ({"slug": "inequalities-regions"}, ineq_regions), ({"slug": "limits-of-accuracy"}, limits),
    ({"slug": "limits-of-accuracy-applying"}, limits_apply),
    ({"slug": "linear-graphs-drawing-xy-table"}, lg_table), ({"slug": "linear-graphs-drawing-using-y-mx-c"}, lg_mxc_draw),
    ({"slug": "linear-graphs-drawing-across-one-method"}, lambda ws: lg_mxc_draw(ws, True)),
    ({"slug": "linear-graphs-gradient-of-a-line"}, lg_gradient), ({"slug": "linear-graphs-gradient-between-points"}, lg_grad_pts),
    ({"slug": "linear-graphs-y-mx-c"}, lg_mxc), ({"slug": "linear-graphs-y-a-graphs"}, lg_flat),
    ({"slug": "linear-graphs-x-a-graphs"}, lambda ws: lg_flat(ws, True)),
    ({"slug": "linear-graphs-find-equation-of-a-line"}, lg_find), ({"slug": "linear-graphs-equation-through-2-points"}, lg_two_pts),
    ({"slug": "linear-graphs-parallel-lines"}, lg_parallel), ({"slug": "linear-graphs-perpendicular-lines"}, lg_perp),
    ({"slug": "linear-graphs-real-life"}, lg_real),
]
