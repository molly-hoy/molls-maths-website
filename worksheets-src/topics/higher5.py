"""The last mixed set: identities, circle theorems with chords and secants, functions,
iteration, sequences, sets and Venn diagrams, inequalities, compound measures,
rates of change, sampling and more. Answers are calculated, not typed in by hand,
wherever a calculation is involved."""
import math
from fractions import Fraction as F
from engine.geo import scene, table
from engine.charts import chart
from engine.draw import axes


def P(ws, prompt, qa, cols=2, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def fr(x):
    x = F(x)
    s = "−" if x < 0 else ""
    x = abs(x)
    return s + (str(x.numerator) if x.denominator == 1 else f"[[{x.numerator}//{x.denominator}]]")


def sgn(k):
    """+ 3, − 2 for writing expressions."""
    return f"+ {k}" if k >= 0 else f"− {-k}"


# ==========================================================================
# Identities
# ==========================================================================
def ident_coeff(ws):
    ws.section("Practice")
    P(ws, "Find the values of a and b.", [("3(x + a) ≡ 3x + 12", "a = 4"), ("a(2x − 5) ≡ 8x − b", "a = 4, b = 20"),
                                          ("2(ax + 3) + b ≡ 10x + 11", "a = 5, b = 5"), ("(x + a)^2 ≡ x^2 + 6x + b", "a = 3, b = 9"),
                                          ("(x + a)(x + b) ≡ x^2 + 7x + 12", "a = 3, b = 4 (either way round)"),
                                          ("(x − a)^2 + b ≡ x^2 − 10x + 32", "a = 5, b = 7")], cols=2)
    ws.section("Problem solving")
    ws.question("Show that (n + 3)^2 − (n − 3)^2 ≡ 12n.", "n^2 + 6n + 9 − (n^2 − 6n + 9) = 12n", space=50)
    ws.question("Prove that the sum of three consecutive integers is always a multiple of 3.", "n + (n + 1) + (n + 2) = 3n + 3 = "
                "3(n + 1)", space=50)


def ident_types(ws):
    ws.section("Practice")
    P(ws, "Is each one an expression, an equation, a formula or an identity?", [
        ("3x + 4", "expression"), ("3x + 4 = 19", "equation"), ("A = πr^2", "formula"), ("2(x + 1) ≡ 2x + 2", "identity"),
        ("5a − 2b", "expression"), ("v = u + at", "formula"), ("x^2 = 49", "equation"), ("x + x + x ≡ 3x", "identity")], cols=2)
    ws.section("Problem solving")
    ws.question("Explain the difference between an equation and an identity.", "An equation is true for particular values; an "
                "identity is true for every value.", space=40)
    ws.question("Is (x + 2)^2 = x^2 + 4 an identity? Explain.", "No: (x + 2)^2 = x^2 + 4x + 4 (try x = 1: 9 ≠ 5)", space=40)


# ==========================================================================
# Chords and secants
# ==========================================================================
def chord_fig(a, b, c, d):
    """Two chords crossing inside a circle; a, b on one chord and c, d on the other."""
    R = 3
    items = [("circle", (0, 0), R)]
    p = (0.6, 0.4)
    for ang, l1, l2 in ((20, a, b), (115, c, d)):
        t = math.radians(ang)
        dx, dy = math.cos(t), math.sin(t)
        bb = p[0] * dx + p[1] * dy
        cc = p[0] ** 2 + p[1] ** 2 - R * R
        s1, s2 = -bb + math.sqrt(bb * bb - cc), -bb - math.sqrt(bb * bb - cc)
        A = (p[0] + s1 * dx, p[1] + s1 * dy)
        B = (p[0] + s2 * dx, p[1] + s2 * dy)
        items += [("seg", A, B), ("dot", A), ("dot", B)]
        nx, ny = -dy * 0.35, dx * 0.35
        items += [("text", ((A[0] + p[0]) / 2 + nx, (A[1] + p[1]) / 2 + ny), l1), ("text", ((B[0] + p[0]) / 2 + nx, (B[1] + p[1]) / 2 + ny), l2)]
    return scene(items, font_size=9.5)


def chords(ws):
    ws.section("Practice")
    qs = [("4", "6", "3", "x"), ("5", "x", "2", "10"), ("x", "9", "6", "6"), ("2.5", "8", "x", "4")]
    vals = [(4, 6, 3), (5, None, 2, 10), (None, 9, 6, 6), (2.5, 8, None, 4)]
    ans = ["x = 8", "x = 4", "x = 4", "x = 5"]
    ws.figures("Use the intersecting chord theorem (AP × PB = CP × PD) to find x. Lengths are in cm; not drawn accurately.",
               [chord_fig(*q) for q in qs], ans, cols=2, fig_h=130)
    ws.section("Problem solving")
    ws.question("Two chords cross. One is cut into 3 cm and 12 cm. The other is cut into two equal parts. How long is the second chord?",
                "x^2 = 36, x = 6, chord = 12 cm", space=45)


def secant_fig(a, b, c, d):
    """Two secants from an outside point P: outside part a, inside part b; outside c, inside d."""
    R = 2.5
    P0 = (-6, 0)
    items = [("circle", (0, 0), R), ("dot", P0), ("label", P0, "P", "W")]
    for ang, lo, li in ((14, a, b), (-20, c, d)):
        t = math.radians(ang)
        dx, dy = math.cos(t), math.sin(t)
        bb = P0[0] * dx + P0[1] * dy
        cc = P0[0] ** 2 + P0[1] ** 2 - R * R
        s1, s2 = -bb - math.sqrt(bb * bb - cc), -bb + math.sqrt(bb * bb - cc)
        A = (P0[0] + s1 * dx, P0[1] + s1 * dy)
        B = (P0[0] + s2 * dx, P0[1] + s2 * dy)
        items += [("seg", P0, B), ("dot", A), ("dot", B)]
        off = 0.45 if ang > 0 else -0.45
        items += [("text", ((P0[0] + A[0]) / 2, (P0[1] + A[1]) / 2 + off), lo), ("text", ((A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + off), li)]
    return scene(items, font_size=9.5)


def secants(ws):
    ws.section("Practice")
    qs = [("4", "5", "3", "x"), ("2", "x", "4", "5"), ("6", "10", "8", "x"), ("x", "7", "3", "9")]
    # outside × whole = outside × whole
    ans = ["4 × 9 = 3(3 + x), x = 9", "2(2 + x) = 4 × 9, x = 16", "6 × 16 = 8(8 + x), x = 4", "x(x + 7) = 3 × 12, x = 3"]
    ws.figures("Use the intersecting secant theorem (outside part × whole secant is the same for both) to find x. Not drawn accurately.",
               [secant_fig(*q) for q in qs], ans, cols=2, fig_h=120)
    ws.section("Problem solving")
    ws.question("A tangent from P touches a circle at T. A secant from P has outside part 4 cm and inside part 5 cm. Find PT.",
                "PT^2 = 4 × 9 = 36, PT = 6 cm", space=45)


# ==========================================================================
# Functions
# ==========================================================================
def inverse_fn(ws):
    ws.section("Practice")
    P(ws, "Find f^{−1}(x).", [("f(x) = x + 7", "x − 7"), ("f(x) = 4x", "[[x//4]]"), ("f(x) = 3x − 2", "[[x + 2//3]]"),
                              ("f(x) = [[x + 5//2]]", "2x − 5"), ("f(x) = 10 − x", "10 − x"), ("f(x) = [[1//x − 3]]", "[[1//x]] + 3"),
                              ("f(x) = x^3 + 1", "∛(x − 1)"), ("f(x) = [[2x//x − 1]]", "[[x//x − 2]]")], cols=2)
    ws.section("Problem solving")
    ws.question("f(x) = 5x + 3. Find f^{−1}(18).", "3", space=30)
    ws.question("Show that f(x) = 6 − x is its own inverse.", "y = 6 − x gives x = 6 − y, so f^{−1}(x) = 6 − x", space=40)


def composite_fn(ws):
    ws.section("Practice")
    f = lambda x: 2 * x + 1
    g = lambda x: x * x
    P(ws, "f(x) = 2x + 1 and g(x) = x^2. Find", [("fg(3)", str(f(g(3)))), ("gf(3)", str(g(f(3)))), ("ff(2)", str(f(f(2)))),
                                                 ("gg(−2)", str(g(g(-2)))), ("fg(x)", "2x^2 + 1"), ("gf(x)", "4x^2 + 4x + 1"),
                                                 ("ff(x)", "4x + 3"), ("fg(−1)", str(f(g(-1))))], cols=4)
    ws.section("Problem solving")
    ws.question("f(x) = x − 4 and g(x) = 3x. Solve fg(x) = gf(x).", "3x − 4 = 3x − 12 has no solution", space=40)
    ws.question("f(x) = 2x + 1 and g(x) = x^2. Solve gf(x) = 49.", "(2x + 1)^2 = 49, x = 3 or x = −4", space=40)


def fn_machines(ws):
    ws.section("Practice")
    machines = [(["× 3", "+ 4"], lambda x: 3 * x + 4, [2, 5, 10]), (["− 6", "× 2"], lambda x: (x - 6) * 2, [10, 6, 3]),
                (["÷ 4", "+ 7"], lambda x: F(x, 4) + 7, [8, 20, 2])]
    for ops, f, ins in machines:
        P(ws, f"Input → {ops[0]} → {ops[1]} → Output. Find the output for each input.", [(str(i), fr(f(i))) for i in ins], cols=3)
    P(ws, "Input → × 5 → − 3 → Output. Find the input for each output.", [("32", "7"), ("2", "1"), ("−8", "−1")], cols=3)
    ws.section("Problem solving")
    ws.question("Input x → × 4 → + 1 → Output. Write an expression for the output.", "4x + 1", space=30)


# ==========================================================================
# Circle tangent, shortest distance, invariant points
# ==========================================================================
def tangent_circle(ws):
    ws.section("Practice")
    pts = [(3, 4), (5, 12), (-6, 8), (8, -6), (1, 7)]
    out = []
    for x, y in pts:
        r2 = x * x + y * y
        m, c = F(-x, y), F(r2, y)          # tangent is perpendicular to the radius
        mx = {1: "x", -1: "−x"}.get(m, f"{fr(m)}x")
        out.append((f"x^2 + y^2 = {r2} at ({x}, {y})".replace("-", "−"), f"y = {mx} {'+' if c > 0 else '−'} {fr(abs(c))}"))
    P(ws, "Find the equation of the tangent to the circle at the given point.", out, cols=1)
    ws.section("Problem solving")
    ws.question("Explain why the tangent's gradient is −[[x//y]] at the point (x, y) on a circle centred at the origin.",
                "The radius has gradient [[y//x]], and the tangent is perpendicular to the radius.", space=45)


def shortest(ws):
    ws.section("Practice")
    lines = [(3, 4, 0, (5, 5)), (1, 1, -2, (4, 4)), (4, -3, 10, (2, 1)), (5, 12, 0, (0, 13))]
    out = []
    for a, b, c, (px, py) in lines:
        d = abs(a * px + b * py + c) / math.hypot(a, b)
        eq = f"{a}x {sgn(b)}y {sgn(c)} = 0".replace("1x", "x").replace("+ 1y", "+ y").replace("− 1y", "− y").replace(" + 0 = 0", " = 0")
        out.append((f"from ({px}, {py}) to {eq}", f"{d:.2f}".rstrip("0").rstrip(".")))
    P(ws, "Find the shortest distance, to 2 d.p. where needed.", out, cols=1)
    ws.question("Find the shortest distance from (7, 1) to the line y = 2x. Find the point on the line that is closest.",
                f"Perpendicular y − 1 = −[[1//2]](x − 7) meets y = 2x at (1.8, 3.6); distance √(5.2^2 + 2.6^2) = {math.hypot(5.2, 2.6):.2f}",
                space=70)
    ws.section("Problem solving")
    ws.question("Why is the shortest distance from a point to a line always measured at right angles to the line?",
                "Any other path is the hypotenuse of a right-angled triangle, so it is longer.", space=40)


def invariant(ws):
    ws.section("Practice")
    P(ws, "Which of the points (0, 0), (2, 2), (3, 0), (0, −1) and (−1, −1) are invariant under", [
        ("a reflection in y = x", "(0, 0), (2, 2), (−1, −1)"), ("a reflection in the x-axis", "(0, 0), (3, 0)"),
        ("a rotation of 180° about (0, 0)", "(0, 0)"), ("an enlargement scale factor 2, centre (0, 0)", "(0, 0)"),
        ("a reflection in the y-axis", "(0, 0), (0, −1)"), ("a translation by {{3;0}}", "none")], cols=1)
    ws.section("Problem solving")
    ws.question("Describe the invariant points when y = x^2 − 4 is reflected in the x-axis.", "Where it crosses the x-axis: (2, 0) and "
                "(−2, 0)", space=45)


# ==========================================================================
# Numerical methods
# ==========================================================================
def iteration(ws):
    ws.section("Practice")
    f = lambda x: (2 * x + 5) ** (1 / 3)
    xs = [2.0]
    for _ in range(4):
        xs.append(f(xs[-1]))
    ws.question("Use x_{n + 1} = ∛(2x_{n} + 5) with x_{0} = 2 to find x_{1}, x_{2}, x_{3} and x_{4}, to 4 d.p.",
                ", ".join(f"{v:.4f}" for v in xs[1:]), space=60)
    g = lambda x: 3 - 1 / x
    ys = [2.0]
    for _ in range(4):
        ys.append(g(ys[-1]))
    ws.question("Use x_{n + 1} = 3 − [[1//x_{n}]] with x_{0} = 2 to find x_{4}, to 4 d.p.", f"{ys[4]:.4f}", space=50)
    ws.question("Show that x^3 − 2x − 5 = 0 can be rearranged to give x = ∛(2x + 5).", "x^3 = 2x + 5, then cube root both sides",
                space=40)
    ws.section("Problem solving")
    ws.question("Explain what the values from your first iteration are getting closer to.", f"A solution of x^3 − 2x − 5 = 0, "
                f"about {xs[4]:.3f}", space=40)


def change_sign(ws):
    ws.section("Practice")
    qs = [("x^3 − 3x − 1 = 0", lambda x: x ** 3 - 3 * x - 1, 1, 2), ("x^3 + x − 5 = 0", lambda x: x ** 3 + x - 5, 1, 2),
          ("x^2 − 7 = 0", lambda x: x * x - 7, 2, 3), ("x^3 − 6x + 2 = 0", lambda x: x ** 3 - 6 * x + 2, 2, 3)]
    out = []
    for eq, f, a, b in qs:
        out.append((f"Show {eq} has a solution between {a} and {b}.",
                    f"f({a}) = {f(a):g}, f({b}) = {f(b):g}; sign changes".replace("-", "−")))
    P(ws, "Use a change of sign.", out, cols=1)
    ws.section("Problem solving")
    f = lambda x: x * x - 7
    ws.question("Show that the solution of x^2 − 7 = 0 between 2 and 3 is 2.6 to 1 d.p.",
                f"f(2.55) = {f(2.55):.4f} < 0, f(2.65) = {f(2.65):.4f} > 0".replace("-", "−"), space=45)


# ==========================================================================
# Sequences
# ==========================================================================
def ap(ws):
    ws.section("Practice")
    seqs = [(3, 4), (10, -3), (0.5, 1.5), (-7, 5)]
    out = []
    for a, d in seqs:
        terms = ", ".join(f"{a + i * d:g}" for i in range(4)).replace("-", "−")
        out.append((f"{terms}, …   Find the 20th term.", f"{a + 19 * d:g}".replace("-", "−")))
    P(ws, "Arithmetic progressions:", out, cols=1)
    P(ws, "Find the sum of", [("1 + 2 + 3 + … + 100", "5050"), ("the first 20 terms of 3, 7, 11, …", str(20 * (2 * 3 + 19 * 4) // 2)),
                              ("the first 10 terms of 50, 45, 40, …", str(10 * (100 - 45) // 2))], cols=1)
    ws.section("Problem solving")
    ws.question("The 3rd term of an arithmetic sequence is 11 and the 7th term is 27. Find the first term and the difference.",
                "d = 4, a = 3", space=45)


def gp(ws):
    ws.section("Practice")
    seqs = [(2, 3), (5, 2), (64, F(1, 2)), (1, -2)]
    out = []
    for a, r in seqs:
        terms = ", ".join(fr(a * r ** i) for i in range(4))
        out.append((f"{terms}, …", f"r = {fr(r)}, 8th term = {fr(a * r ** 7)}"))
    P(ws, "Find the common ratio and the 8th term of each geometric progression.", out, cols=1)
    ws.section("Problem solving")
    ws.question("A geometric sequence has 2nd term 6 and 5th term 162. Find the first term and the common ratio.", "r = 3, a = 2",
                space=45)
    ws.question("£1000 is invested at 4% compound interest. Explain why the yearly values form a geometric progression.",
                "Each value is 1.04 times the one before.", space=40)


def quad_nth(ws):
    ws.section("Practice")
    coef = [(1, 2, 3), (2, 0, -1), (1, -3, 5), (3, 1, 0), (-1, 10, 2), (2, -5, 4)]
    out = []
    for a, b, c in coef:
        terms = ", ".join(str(a * n * n + b * n + c) for n in range(1, 6)).replace("-", "−")
        t = f"{a}n^2".replace("1n", "n") if abs(a) != 1 else ("n^2" if a == 1 else "−n^2")
        if b:
            t += f" {sgn(b)}n".replace(" 1n", " n")
        if c:
            t += f" {sgn(c)}"
        out.append((terms, t))
    P(ws, "Find the nth term of each quadratic sequence.", out, cols=2)
    ws.section("Problem solving")
    ws.question("Is 200 a term in the sequence with nth term n^2 + 4? Explain.", "n^2 = 196, n = 14: yes", space=35)


# ==========================================================================
# Sets, Venn diagrams, product rule, inequalities, error intervals
# ==========================================================================
def venn_fig(a_only, both, b_only, out, la="A", lb="B"):
    items = [("poly", [(-4.5, -3), (4.5, -3), (4.5, 3), (-4.5, 3)], "nofill"), ("circle", (-1.2, 0), 2.3), ("circle", (1.2, 0), 2.3),
             ("text", (-2.3, 0), a_only), ("text", (0, 0), both), ("text", (2.3, 0), b_only), ("text", (3.8, -2.4), out),
             ("text", (-3.3, 2.2), la), ("text", (3.3, 2.2), lb), ("text", (-4.1, 2.6), "ξ")]
    return scene(items, font_size=10)


def venn(ws):
    ws.section("Practice")
    ws.question("In a class of 30, 18 like football (F), 12 like tennis (T) and 5 like both.\n(a) Copy and complete the Venn diagram.\n"
                "(b) How many like neither?\n(c) A student is picked at random. Find P(likes exactly one).",
                "(a) 13, 5, 7, 5  (b) 5  (c) [[20//30]] = [[2//3]]", figure=venn_fig("", "5", "", "", "F", "T"), fig_w=230, fig_h=150,
                space=10)
    ws.question("ξ = {1, 2, …, 12}, A = multiples of 3, B = even numbers. Draw a Venn diagram and list A ∩ B.",
                "A ∩ B = {6, 12}", space=110)
    ws.section("Problem solving")
    ws.question("Use your diagram from Question 2 to find P(A ∪ B).", "[[8//12]] = [[2//3]]", space=35)


def sets(ws):
    ws.section("Practice")
    A, B, U = {2, 4, 6, 8, 10}, {1, 2, 3, 4, 5}, set(range(1, 11))
    show = lambda s: "{" + ", ".join(map(str, sorted(s))) + "}" if s else "∅"
    ws.figure_only(venn_fig(show(A - B)[1:-1], show(A & B)[1:-1], show(B - A)[1:-1], show(U - A - B)[1:-1]), 260, 160)
    P(ws, "ξ = {1, …, 10}, A = {2, 4, 6, 8, 10}, B = {1, 2, 3, 4, 5}. List", [("A ∩ B", show(A & B)), ("A ∪ B", show(A | B)),
                                                                            ("A′", show(U - A)), ("A ∩ B′", show(A - B)),
                                                                            ("(A ∪ B)′", show(U - (A | B))), ("A′ ∩ B", show(B - A))],
      cols=3)
    ws.section("Problem solving")
    ws.question("Write n(A ∪ B) and explain why it is not n(A) + n(B).", "8; the 2 and 4 are in both, so would be counted twice.",
                space=40)


def product_rule(ws):
    ws.section("Practice")
    P(ws, "Work out how many different", [("meals from 4 starters, 6 mains and 3 desserts", "72"),
                                          ("outfits from 5 tops and 3 pairs of jeans", "15"), ("4-digit PIN codes (0–9 each digit)", "10 000"),
                                          ("ways to arrange the letters of MATHS", "120"),
                                          ("3-letter codes using A–Z with no letter repeated", "15 600")], cols=1)
    ws.section("Problem solving")
    ws.question("A number plate has 2 letters then 3 digits. How many plates are possible?", "26 × 26 × 10^3 = 676 000", space=40)
    ws.question("How many 3-digit even numbers can be made from 1, 2, 3, 4, 5 if digits can't repeat?", "2 × 4 × 3 = 24", space=40)


def error_int(ws):
    ws.section("Practice")
    P(ws, "Write the error interval for x.", [("x = 7, to the nearest whole number", "6.5 ≤ x < 7.5"),
                                              ("x = 40, to the nearest 10", "35 ≤ x < 45"), ("x = 3.6, to 1 d.p.", "3.55 ≤ x < 3.65"),
                                              ("x = 600, to 1 s.f.", "550 ≤ x < 650"), ("x = 2.48, to 2 d.p.", "2.475 ≤ x < 2.485"),
                                              ("x = 8.2, truncated to 1 d.p.", "8.2 ≤ x < 8.3")], cols=2)
    ws.section("Problem solving")
    ws.question("A rectangle is 12 cm by 5 cm, both to the nearest cm. Find the upper bound of its area.", "12.5 × 5.5 = 68.75 cm^2",
                space=40)


def roots(a, b, c):
    d = b * b - 4 * a * c
    return sorted([(-b - math.isqrt(d)) / (2 * a), (-b + math.isqrt(d)) / (2 * a)])


def g(v):
    return f"{v:g}".replace("-", "−")


def quad_ineq(ws):
    ws.section("Practice")
    qs = [((1, -5, 6), "<"), ((1, -1, -12), ">"), ((1, 0, -16), "≤"), ((1, 2, -8), "≥"), ((2, -7, 3), "<"), ((-1, 0, 9), ">")]
    out = []
    for (a, b, c), s in qs:
        lo, hi = roots(a, b, c)
        expr = (f"{a}x^2".replace("1x", "x").replace("−1x", "−x") if a not in (1, -1) else ("x^2" if a == 1 else "−x^2"))
        if b:
            expr += f" {sgn(b)}x".replace(" 1x", " x")
        if c:
            expr += f" {sgn(c)}"
        inside = (s in "<≤") == (a > 0)
        eq = "≤" if s in "≤≥" else "<"
        if inside:
            ans = f"{g(lo)} {eq} x {eq} {g(hi)}"
        else:
            st = "≤" if s in "≤≥" else "<"
            gt = "≥" if s in "≤≥" else ">"
            ans = f"x {st} {g(lo)} or x {gt} {g(hi)}"
        out.append((f"{expr} {s} 0", ans))
    P(ws, "Solve", out, cols=2)
    ws.section("Problem solving")
    ws.question("Find the integers that satisfy x^2 − 3x − 10 < 0.", "−2 < x < 5: −1, 0, 1, 2, 3, 4", space=40)


def form_quad_ineq(ws):
    ws.section("Practice")
    ws.question("A rectangle has width x cm and length (x + 4) cm. Its area is less than 45 cm^2. Form and solve an inequality for x.",
                "x(x + 4) < 45, (x + 9)(x − 5) < 0, so 0 < x < 5", space=60)
    ws.question("The square of a number, n, is more than 3 times the number plus 10. Find the possible values of n.",
                "n^2 − 3n − 10 > 0, n < −2 or n > 5", space=55)
    ws.question("A ball's height is h = 20t − 5t^2 metres. For what times is the ball higher than 15 m?", "5t^2 − 20t + 15 < 0, "
                "1 < t < 3 seconds", space=55)
    ws.section("Problem solving")
    ws.question("Write a quadratic inequality whose solution is x ≤ −1 or x ≥ 6.", "e.g. (x + 1)(x − 6) ≥ 0", space=40)


def freq_tree(ws):
    ws.section("Practice")
    def box(cx, cy, t):
        return [("poly", [(cx - 0.9, cy - 0.35), (cx + 0.9, cy - 0.35), (cx + 0.9, cy + 0.35), (cx - 0.9, cy + 0.35)], "nofill"),
                ("text", (cx, cy), t)]
    items = box(0, 0, "120")
    for y, t, kids in ((2, "Walk", ("", "18")), (-2, "", ("30", ""))):
        items += [("seg", (0.9, 0), (3.1, y))] + box(4, y, "") + [("text", (4, y + 0.6 if y > 0 else y - 0.6),
                                                                                "Walk" if y > 0 else "Not walk")]
        for dy, kt, lab in ((1, kids[0], "Late"), (-1, kids[1], "On time")):
            items += [("seg", (4.9, y), (7.1, y + dy))] + box(8, y + dy, kt) + [("text", (10.1, y + dy), lab)]
    ws.question("120 students were asked how they travel to school. 50 walk. 18 of the walkers were on time. 30 of those who don't "
                "walk were late.\n(a) Complete the frequency tree.\n(b) How many were on time altogether?\n(c) A student who was late "
                "is picked at random. Find P(they walked).", "(a) 50, 70; walkers: 32 late, 18 on time; others: 30 late, 40 on time  "
                "(b) 58  (c) [[32//62]] = [[16//31]]", figure=scene(items, font_size=9), fig_w=300, fig_h=170, fig_pos="below", space=10)
    ws.section("Problem solving")
    ws.question("Of 200 people, 120 are adults. 45 adults and 50 children wear glasses. Draw a frequency tree and find how many "
                "people do not wear glasses.", "75 + 30 = 105", space=110)


# ==========================================================================
# Compound measures, time series, rates of change, capture–recapture
# ==========================================================================
def density(ws):
    ws.section("Practice")
    P(ws, "Use density = [[mass//volume]] to work out", [("density: 600 g, 75 cm^3", "8 g/cm^3"),
                                                        ("mass: 2.7 g/cm^3, 40 cm^3", "108 g"), ("volume: 19.3 g/cm^3, 965 g", "50 cm^3"),
                                                        ("density: 1.5 kg, 500 cm^3 (in g/cm^3)", "3 g/cm^3")], cols=1)
    ws.section("Problem solving")
    ws.question("A gold bar is a cuboid 10 cm × 4 cm × 2 cm. Gold has density 19.3 g/cm^3. Find its mass in kg.", "80 × 19.3 = 1544 g "
                "= 1.544 kg", space=45)
    ws.question("100 g of metal A (density 8 g/cm^3) is melted with 60 g of metal B (density 4 g/cm^3). Find the density of the mix.",
                "volume 12.5 + 15 = 27.5, density 160 ÷ 27.5 = 5.82 g/cm^3", space=50)


def pop_density(ws):
    ws.section("Practice")
    P(ws, "Population density = [[population//area]]. Work out", [("density: 45 000 people, 15 km^2", "3000 people per km^2"),
                                                                 ("population: 250 people per km^2, 80 km^2", "20 000"),
                                                                 ("area: 1200 people per km^2, 30 000 people", "25 km^2")], cols=1)
    ws.section("Problem solving")
    ws.question("Town A: 84 000 people in 28 km^2. Town B: 62 000 people in 20 km^2. Which is more densely populated?",
                "A 3000/km^2, B 3100/km^2: Town B", space=45)
    ws.question("A circular village has radius 1.2 km and 3500 people. Find its population density to the nearest whole number.",
                f"{3500 / (math.pi * 1.44):.0f} people per km^2", space=45)


def pressure(ws):
    ws.section("Practice")
    P(ws, "Use pressure = [[force//area]] to work out", [("pressure: 120 N on 4 m^2", "30 N/m^2"), ("force: 15 N/m^2 on 6 m^2", "90 N"),
                                                         ("area: 400 N at 50 N/m^2", "8 m^2"), ("pressure: 72 N on 0.5 m^2", "144 N/m^2")],
      cols=1)
    ws.section("Problem solving")
    ws.question("A box weighs 240 N. It has faces of 2 m × 1.5 m, 2 m × 0.8 m and 1.5 m × 0.8 m. Find the greatest pressure it can "
                "put on the floor.", "smallest face 1.2 m^2: 200 N/m^2", space=50)
    ws.question("Explain why snowshoes stop you sinking into snow.", "Bigger area, so less pressure for the same force.", space=35)


def time_series(ws):
    ws.section("Practice")
    sales = [42, 55, 61, 38, 45, 59, 66, 40, 50, 62, 70, 44]
    pts = [(i + 1, v) for i, v in enumerate(sales)]
    fig = chart(0, 13, 30, 80, 1, 10, [("line", pts, "dots")], xlabel="Quarter (Q1 2024 to Q4 2026)", ylabel="Sales (£1000s)")
    ws.question("The graph shows a shop's sales each quarter.\n(a) Which quarter is usually the best?\n(b) Describe the trend.\n"
                "(c) Find the first 4-point moving average.", "(a) Q3  (b) Sales are slowly rising.  (c) (42 + 55 + 61 + 38) ÷ 4 = 49",
                figure=fig, fig_w=330, fig_h=170, fig_pos="below", space=10)
    ma = [sum(sales[i:i + 4]) / 4 for i in range(len(sales) - 3)]
    ws.question("Work out the next two moving averages.", f"{ma[1]:g}, {ma[2]:g}", space=40)
    ws.section("Problem solving")
    ws.question("Why are 4-point moving averages used for quarterly data?", "They average over a full year, removing the seasonal "
                "pattern.", space=40)


def area_under(ws):
    ws.section("Practice")
    shapes = [[(0, 0), (4, 12), (10, 12), (14, 0)], [(0, 4), (5, 14), (12, 14), (16, 0)], [(0, 0), (6, 18), (10, 6), (16, 6)]]

    def area(p):
        return sum((p[i + 1][0] - p[i][0]) * (p[i][1] + p[i + 1][1]) / 2 for i in range(len(p) - 1))
    figs = [chart(0, 16, 0, 20, 2, 4, [("line", p, "dots")], xlabel="Time (s)", ylabel="Speed (m/s)") for p in shapes]
    ws.figures("Each speed–time graph is made of straight lines. Find the distance travelled.", figs,
               [f"{area(p):g} m" for p in shapes], cols=3, fig_h=140)
    ws.section("Problem solving")
    xs = [0, 1, 2, 3, 4]
    f = lambda t: t * t
    est = sum((f(xs[i]) + f(xs[i + 1])) / 2 for i in range(4))
    ws.question("Speed v = t^2 m/s. Use 4 strips of width 1 second to estimate the distance travelled in the first 4 seconds. Is this "
                "an over- or under-estimate?", f"{est:g} m; over-estimate (the curve bends below the straight lines)", space=55)


def inst_rate(ws):
    ws.section("Practice")
    f = lambda t: t * t / 2
    pts = [(t / 10, f(t / 10)) for t in range(0, 81)]
    tan = [(3, f(4) - 4 * 1), (6, f(4) + 4 * 2)]
    figs = [chart(0, 8, 0, 32, 1, 4, [("line", pts)], xlabel="Time (s)", ylabel="Distance (m)"),
            chart(0, 8, 0, 32, 1, 4, [("line", pts), ("seg", tan[0], tan[1])], xlabel="Time (s)", ylabel="Distance (m)")]
    ws.figures("(a) Draw a tangent to estimate the speed at t = 6.  (b) The tangent at t = 4 is drawn. Find the speed at t = 4.",
               figs, ["about 6 m/s (exact value 6)", "gradient = [[8//2]] = 4 m/s"], cols=2, fig_h=160)
    ws.section("Problem solving")
    ws.question("Explain the difference between average speed from 0 to 6 s and the instantaneous speed at 6 s.",
                "Average uses the chord from 0 to 6 (gradient 3 m/s); instantaneous uses the tangent at 6 (about 6 m/s).", space=45)


def avg_rate(ws):
    ws.section("Practice")
    ws.figure_only(table([["Time (min)", "0", "5", "10", "15", "20"], ["Temperature (°C)", "90", "71", "58", "49", "43"]]), 360, 44)
    P(ws, "The table shows a cup of tea cooling. Find the average rate of change of temperature", [
        ("from 0 to 5 minutes", "−3.8 °C per min"), ("from 0 to 20 minutes", "−2.35 °C per min"),
        ("from 10 to 20 minutes", "−1.5 °C per min"), ("from 5 to 15 minutes", "−2.2 °C per min")], cols=2)
    ws.section("Problem solving")
    ws.question("What does the change in your answers tell you about how the tea cools?", "It cools more slowly as time goes on.",
                space=35)
    ws.question("f(x) = x^2 + 1. Find the average rate of change from x = 1 to x = 3.", "(10 − 2) ÷ 2 = 4", space=35)


def capture(ws):
    ws.section("Practice")
    qs = [(40, 50, 10), (60, 80, 12), (25, 40, 5), (100, 90, 15)]
    P(ws, "Estimate the size of each population using [[first sample × second sample//number marked in second]].",
      [(f"{a} marked; later {b} caught, {m} marked", str(a * b // m)) for a, b, m in qs], cols=1)
    ws.section("Problem solving")
    ws.question("Write down two assumptions made in capture–recapture.", "The population doesn't change between samples; marked "
                "animals mix fully and are just as likely to be caught.", space=45)


def sim3(ws):
    ws.section("Practice")
    sols = [(1, 2, 3), (2, -1, 4), (3, 1, -2), (-1, 4, 2)]
    coefs = [((1, 1, 1), (2, -1, 1), (1, 2, -1)), ((1, 2, 1), (3, -1, 2), (2, 1, -1)), ((2, 1, 1), (1, -1, 2), (3, 2, -1)),
             ((1, 1, 2), (2, 1, -1), (1, -2, 3))]
    out = []
    for (x, y, z), rows in zip(sols, coefs):
        eqs = []
        for a, b, c in rows:
            t = f"{a}x {sgn(b)}y {sgn(c)}z = {a * x + b * y + c * z}"
            t = t.replace("1x", "x").replace(" 1y", " y").replace(" 1z", " z").replace("-", "−")
            t = t.replace("2x", "2x").replace("3x", "3x")
            eqs.append(t if not t.startswith("1x") else t[1:])
        out.append((";     ".join(eqs), f"x = {x}, y = {y}, z = {z}".replace("-", "−")))
    P(ws, "Solve each set of simultaneous equations.", out, cols=1)
    ws.section("Problem solving")
    ws.question("Adult, child and senior tickets cost £a, £c and £s. 2 adults + 1 child = £31; 1 adult + 2 seniors = £26; "
                "1 child + 1 senior = £15. Find each price.", "a = 12, c = 7, s = 8", space=60)


SHEETS = [
    ({"slug": "identities-equating-coefficients"}, ident_coeff), ({"slug": "identities-formula-equations-etc"}, ident_types),
    ({"slug": "intersecting-chord-theorem"}, chords), ({"slug": "intersecting-secant-theorem"}, secants),
    ({"slug": "inverse-functions"}, inverse_fn), ({"slug": "composite-functions"}, composite_fn),
    ({"slug": "equation-of-a-tangent-to-a-circle"}, tangent_circle), ({"slug": "iteration"}, iteration),
    ({"slug": "change-of-sign"}, change_sign), ({"slug": "arithmetic-progressions"}, ap), ({"slug": "geometric-progressions"}, gp),
    ({"slug": "frequency-trees"}, freq_tree), ({"slug": "error-intervals"}, error_int), ({"slug": "inequalities-quadratic"}, quad_ineq),
    ({"slug": "forming-quadratic-inequalities"}, form_quad_ineq), ({"slug": "set-notation"}, sets), ({"slug": "venn-diagrams"}, venn),
    ({"slug": "shortest-distance-from-point-to-a-line"}, shortest), ({"slug": "time-series"}, time_series),
    ({"slug": "product-rule-for-counting"}, product_rule), ({"slug": "density"}, density),
    ({"slug": "population-density"}, pop_density), ({"slug": "pressure"}, pressure), ({"slug": "function-machines"}, fn_machines),
    ({"slug": "sequences-quadratic-nth-term"}, quad_nth), ({"slug": "area-under-a-graph"}, area_under),
    ({"slug": "instantaneous-rate-of-change"}, inst_rate), ({"slug": "average-rate-of-change"}, avg_rate),
    ({"slug": "capture-recapture"}, capture), ({"slug": "invariant-points"}, invariant),
    ({"slug": "simultaneous-equations-3-unknowns"}, sim3),
]
