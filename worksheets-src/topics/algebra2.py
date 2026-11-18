"""Equations (10 worksheets) and factorisation (6 worksheets).
Linear equation answers are solved by engine/algebra.py; factorising questions
are made by EXPANDING the answer, so question and answer always match."""
import math
from engine.algebra import solve_linear, num, expand
from engine.geo import scene
from engine.draw import shape2d
from topics.area import labelled_poly


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def E(disp, parse=None, var="x"):
    """(question, answer) for a linear equation. parse is a version the
    computer can read when the display uses stacked fractions."""
    return disp, f"{var} = {num(solve_linear(parse or disp, var))}"


# ==========================================================================
def solving(ws):
    ws.section("Practice")
    P(ws, "Solve", [E(q) for q in ["x + 7 = 12", "x − 4 = 9", "3x = 21", "5x = 45", "x + 12 = 5", "4x = −28",
                                   "x − 8 = −3", "6x = 15"]], cols=4)
    P(ws, "Solve", [E(q) for q in ["2x + 5 = 17", "3x − 4 = 11", "5x + 8 = 3", "4x − 7 = 13", "7 + 2x = 19",
                                   "10x − 6 = 24", "3x + 11 = 2", "8 − x = 3", "20 − 3x = 5"]], cols=3)
    P(ws, "Solve", [E(q) for q in ["2(x + 3) = 14", "5(x − 2) = 30", "3(2x + 1) = 27", "4(x − 5) = −8",
                                   "6(3 − x) = 12", "2(5x + 4) = 13"]], cols=3)
    ws.section("Problem solving")
    ws.question("Ali solves 3x + 5 = 20 and gets x = 8.3. Explain his mistake.",
                "He divided before subtracting. 3x = 15, so x = 5.", space=45)
    ws.question("The perimeter of a square is 4(x + 3) cm. The perimeter is 36 cm. Find x.", "x + 3 = 9, x = 6", space=40)
    ws.question("Write an equation with the solution x = 4 that needs two steps to solve.", "e.g. 3x + 2 = 14", space=35)


def fractions_eq(ws):
    ws.section("Practice")
    P(ws, "Solve", [E("[[x//3]] = 5", "x/3 = 5"), E("[[x//4]] = 7", "x/4 = 7"), E("[[x//2]] + 3 = 8", "x/2 + 3 = 8"),
                    E("[[x//5]] − 1 = 3", "x/5 - 1 = 3"), E("[[2x//3]] = 8", "2x/3 = 8"), E("[[3x//4]] + 2 = 11", "3x/4 + 2 = 11")],
      cols=3)
    P(ws, "Solve", [E("[[x + 4//2]] = 7", "(x + 4)/2 = 7"), E("[[x − 3//5]] = 2", "(x - 3)/5 = 2"),
                    E("[[2x + 1//3]] = 5", "(2x + 1)/3 = 5"), E("[[3x − 2//4]] = 4", "(3x - 2)/4 = 4"),
                    E("[[x + 6//3]] = −1", "(x + 6)/3 = -1"), E("[[5x + 3//2]] = 9", "(5x + 3)/2 = 9")], cols=3)
    ws.section("Problem solving")
    ws.question("A number is divided by 4, then 6 is added. The answer is 10. Find the number.", "[[n//4]] + 6 = 10, n = 16",
                space=45)
    ws.question("Sam solves [[x + 2//3]] = 5 and writes x + 2 = 5 ÷ 3. Explain his mistake.",
                "He should multiply both sides by 3: x + 2 = 15, so x = 13.", space=45)


def fractional_adv(ws):
    ws.section("Practice")
    P(ws, "Solve", [E("[[x//2]] + [[x//3]] = 10", "x/2 + x/3 = 10"), E("[[x + 1//2]] + [[x − 1//3]] = 6", "(x+1)/2 + (x-1)/3 = 6"),
                    E("[[2x//5]] − [[x//4]] = 3", "2x/5 - x/4 = 3"), E("[[x + 3//4]] − [[x − 2//6]] = 2", "(x+3)/4 - (x-2)/6 = 2"),
                    E("[[3x − 1//2]] = [[x + 5//3]] + 1", "(3x-1)/2 = (x+5)/3 + 1"),
                    E("[[x//3]] + [[x + 2//5]] = 4", "x/3 + (x+2)/5 = 4")], cols=2)
    P(ws, "Solve. (Multiply both sides by the denominators first.)",
      [("[[6//x]] = 2", "x = 3"), ("[[12//x + 1]] = 4", "x = 2"), ("[[3//x]] = [[5//x + 2]]", "3(x + 2) = 5x, x = 3"),
       ("[[4//x − 1]] = [[2//x + 3]]", "4(x + 3) = 2(x − 1), x = −7")], cols=2)
    ws.section("Problem solving")
    ws.question("Solve [[x//x + 2]] = [[3//5]].", "5x = 3x + 6, x = 3", space=50)
    ws.question("Explain why x = 1 cannot be a solution of [[5//x − 1]] = 2.", "It would make the denominator 0, "
                "and you can't divide by 0.", space=40)


def cross_mult(ws):
    ws.section("Practice")
    P(ws, "Solve by cross-multiplying.", [
        E("[[x//4]] = [[3//2]]", "x/4 = 3/2"), E("[[x + 1//3]] = [[x − 1//2]]", "(x+1)/3 = (x-1)/2"),
        E("[[2x//5]] = [[x + 3//2]]", "2x/5 = (x+3)/2"), E("[[x + 4//6]] = [[x − 2//3]]", "(x+4)/6 = (x-2)/3"),
        E("[[3x − 1//4]] = [[x + 5//2]]", "(3x-1)/4 = (x+5)/2"), E("[[5//x]] = [[10//6]]", "6 = 2x")], cols=3)
    ws.section("Problem solving")
    ws.question("Solve [[2x + 1//x − 3]] = 3.", "2x + 1 = 3(x − 3), x = 10", space=50)
    ws.question("Mia cross-multiplies [[x//2]] = [[5//3]] and gets 2x = 15. Explain her mistake.",
                "She multiplied the wrong pairs. Cross-multiplying gives 3x = 10, so x = [[10//3]].", space=50)


def both_sides(ws):
    ws.section("Practice")
    P(ws, "Solve", [E(q) for q in ["5x + 2 = 3x + 10", "7x − 4 = 2x + 11", "4x + 9 = x + 3", "6x − 5 = 2x − 1",
                                   "3x + 8 = 5x − 2", "9 − 2x = x + 3", "2x − 7 = 5x + 8", "10x + 1 = 4x + 4"]], cols=2)
    P(ws, "Solve", [E(q) for q in ["3(x + 2) = x + 14", "4(x − 1) = 2(x + 5)", "5(2x − 3) = 3(x + 2)",
                                   "2(x + 7) = 6(x − 1)"]], cols=2)
    ws.section("Problem solving")
    ws.question("Two rectangles have equal perimeters. One has sides x + 3 and 4. The other has sides x and 2x − 1.\n"
                "Find x.", "2(x + 7) = 2(3x − 1), so x + 7 = 3x − 1, x = 4", space=55)
    ws.question("I think of a number, multiply it by 5 and subtract 3. I get the same answer as when I double it and "
                "add 9. Find the number.", "5n − 3 = 2n + 9, n = 4", space=50)


def angles_perimeter(ws):
    ws.section("Practice")
    tri = [("x", "2x", "x + 20", "x = 40°"), ("3x", "x + 10", "2x + 20", "x = 25°"), ("5x", "4x", "3x", "x = 15°")]
    P(ws, "The angles of a triangle are given. Form and solve an equation to find x.",
      [(", ".join(t[:3]), t[3]) for t in tri], cols=3)
    P(ws, "Angles on a straight line are given. Find x.", [("3x and x + 40", "x = 35°"), ("2x + 10 and 4x − 10", "x = 30°")],
      cols=2)
    rect = labelled_poly([(0, 0), (3, 0), (3, 1.5), (0, 1.5)], ["2x + 1", "x", None, None], [("right", (0, 0), (1, 0), (0, 1))])
    ws.question("The perimeter of this rectangle is 32 cm. Find x.", "2(2x + 1) + 2x = 32, 6x + 2 = 32, x = 5",
                figure=rect, fig_w=150, fig_h=80, space=10)
    tri_fig = labelled_poly([(0, 0), (3, 0), (1.2, 2)], ["2x + 3", "x + 5", "x"])
    ws.question("The perimeter of this triangle is 28 cm. Find the length of each side.",
                "4x + 8 = 28, x = 5: sides 13 cm, 10 cm and 5 cm", figure=tri_fig, fig_w=150, fig_h=100, space=10)
    ws.section("Problem solving")
    ws.question("The angles of a quadrilateral are x, 2x, 3x and 90°. Find the largest angle.",
                "6x + 90 = 360, x = 45, largest = 135°", space=45)
    ws.question("An isosceles triangle has angles 2x, 2x and x + 30. Find all three angles.",
                "5x + 30 = 180, x = 30: 60°, 60° and 60° (it is equilateral)", space=45)


def forming(ws):
    ws.section("Practice")
    P(ws, "Write an equation and solve it.", [
        ("I think of a number, add 7 and get 19.", "n + 7 = 19, n = 12"),
        ("I think of a number, multiply by 4 and get 52.", "4n = 52, n = 13"),
        ("I think of a number, multiply by 3 and subtract 5. I get 22.", "3n − 5 = 22, n = 9"),
        ("Pens cost p pence. 6 pens cost 270p.", "6p = 270, p = 45"),
        ("Tom is t years old. His mum is 3 times his age and 26 years older than him.", "3t = t + 26, t = 13"),
        ("A taxi charges £3 plus £2 a mile. A journey costs £19. How many miles?", "2m + 3 = 19, m = 8")], cols=1)
    ws.section("Problem solving")
    ws.question("Amy has x sweets. Ben has 4 more than Amy. Cara has twice as many as Ben. They have 52 sweets in total.\n"
                "How many does each have?", "x + (x + 4) + 2(x + 4) = 52, 4x + 12 = 52, x = 10: Amy 10, Ben 14, Cara 28",
                space=60)
    ws.question("Three consecutive whole numbers add up to 96. Find them.", "n + n + 1 + n + 2 = 96, n = 31: 31, 32, 33",
                space=45)
    ws.question("A rectangle is 3 cm longer than it is wide. Its perimeter is 46 cm. Find its area.",
                "2(w + w + 3) = 46, w = 10: 10 × 13 = 130 cm^2", space=50)


def trial(ws):
    def root(f, lo, hi):
        for _ in range(60):
            mid = (lo + hi) / 2
            if f(lo) * f(mid) <= 0:
                hi = mid
            else:
                lo = mid
        return (lo + hi) / 2
    ws.section("Practice")
    eqs = [("x^3 + x = 20", lambda x: x ** 3 + x - 20, 2, 3), ("x^3 − x = 50", lambda x: x ** 3 - x - 50, 3, 4),
           ("x^2 + 3x = 30", lambda x: x * x + 3 * x - 30, 4, 5), ("x^3 + 2x = 100", lambda x: x ** 3 + 2 * x - 100, 4, 5)]
    for disp, f, lo, hi in eqs:
        r = root(f, lo, hi)
        ws.question(f"{disp} has a solution between {lo} and {hi}. Use trial and improvement to find it to 1 decimal place. "
                    "Show your trials in a table.", f"x = {r:.1f} (the solution is {r:.4f}...)", space=95)
    ws.section("Problem solving")
    ws.question("Explain why you need to test the value halfway between your two closest trials.",
                "To decide which 1 d.p. value the solution rounds to: the halfway value shows which side it is on.",
                space=45)


def x_squared(ws):
    ws.section("Practice")
    P(ws, "Solve. Give both answers.", [("x^2 = 49", "x = 7 or x = −7"), ("x^2 = 144", "x = ±12"), ("x^2 = 0.25", "x = ±0.5"),
                                        ("2x^2 = 50", "x = ±5"), ("x^2 + 7 = 32", "x = ±5"), ("3x^2 − 1 = 74", "x = ±5"),
                                        ("[[x^2//4]] = 9", "x = ±6"), ("x^2 − 10 = 39", "x = ±7"), ("5x^2 = 80", "x = ±4")], cols=3)
    P(ws, "Solve", [("(x − 3)^2 = 16", "x = 7 or x = −1"), ("(x + 2)^2 = 25", "x = 3 or x = −7"),
                    ("(2x − 1)^2 = 9", "x = 2 or x = −1")], cols=3)
    ws.section("Problem solving")
    ws.question("A square has an area of 81 cm^2. Find the length of its side. Why is only one answer sensible?",
                "x^2 = 81 gives x = ±9, but a length can't be negative, so 9 cm.", space=45)
    ws.question("Explain why x^2 = −4 has no solutions (using ordinary numbers).",
                "Squaring any number gives zero or a positive answer, never a negative.", space=40)


def think_number(ws):
    ws.section("Practice")
    P(ws, "I think of a number. Find it.", [
        ("I add 9 and get 25.", "16"), ("I multiply by 6 and get 54.", "9"), ("I subtract 4, then multiply by 3. I get 27.", "13"),
        ("I double it and add 5. I get 31.", "13"), ("I divide by 2, then add 10. I get 17.", "14"),
        ("I multiply by 4, then subtract 7. I get 33.", "10"), ("I add 3, then divide by 5. I get 6.", "27"),
        ("I square it and add 1. I get 50 (my number is positive).", "7")], cols=2)
    ws.section("Problem solving")
    ws.question("Ella thinks of a number. She multiplies it by 5 and subtracts 8. Her answer is the same as when she "
                "multiplies it by 3 and adds 6. What is her number?", "5n − 8 = 3n + 6, n = 7", space=50)
    ws.question("Think of a number, double it, add 10, halve it, then take away the number you started with. "
                "Show that the answer is always 5.", "[[2n + 10//2]] − n = n + 5 − n = 5", space=55)


# ==========================================================================
# Factorisation: each question is the expansion of its answer
# ==========================================================================
def F(answers, order="degree"):
    return [(expand(a, order=order), a) for a in answers]


def fact_single(ws):
    ws.section("Practice")
    P(ws, "Factorise", F(["3(x + 2)", "5(y − 3)", "4(2a + 3)", "7(m − 2n)", "6(2x + 3y)", "2(4p − 1)",
                          "9(t + 2)", "4(3 − 2k)"], order="keep"), cols=4)
    P(ws, "Factorise fully", F(["x(x + 5)", "y(y − 7)", "3x(x + 2)", "4a(2a − 3)", "5p(q + 2)", "2xy(3x + 4)",
                                "6m(2m + 3n)", "x^2(x + 1)"], order="keep"), cols=4)
    ws.section("Problem solving")
    ws.question("Jo factorises 12x + 18 as 3(4x + 6). Explain why this isn't fully factorised.",
                "4x + 6 still has a common factor of 2. Fully factorised: 6(2x + 3).", space=45)
    ws.question("The area of a rectangle is 8x^2 + 12x. Its width is 4x. Find its length.", "2x + 3", space=40)


def fact_quad(ws):
    ws.section("Practice")
    P(ws, "Factorise", F(["(x + 2)(x + 3)", "(x + 1)(x + 5)", "(x + 4)(x + 6)", "(x + 3)(x + 7)", "(x − 2)(x − 5)",
                          "(x − 3)(x − 4)", "(x + 5)(x − 2)", "(x − 6)(x + 3)", "(x + 8)(x − 1)", "(x − 7)(x + 2)",
                          "(x − 9)(x − 1)", "(x + 10)(x − 3)"]), cols=4)
    ws.section("Problem solving")
    ws.question("Factorise x^2 + 10x + 25. What do you notice?", "(x + 5)(x + 5) = (x + 5)^2, a perfect square", space=40)
    ws.question("x^2 + bx + 12 factorises into two brackets with whole numbers. Find all the possible positive values of b.",
                "12 = 1 × 12, 2 × 6, 3 × 4, so b = 13, 8 or 7", space=50)


def fact_harder(ws):
    ws.section("Practice")
    P(ws, "Factorise", F(["(2x + 1)(x + 3)", "(3x + 2)(x + 1)", "(2x − 1)(x + 4)", "(3x − 2)(x − 3)", "(5x + 1)(x − 2)",
                          "(2x + 3)(2x + 1)", "(3x + 1)(2x − 5)", "(4x − 3)(x + 2)", "(2x − 5)(3x − 2)"]), cols=3)
    ws.section("Problem solving")
    ws.question("Show that 6x^2 + 13x + 6 = (2x + 3)(3x + 2).", f"(2x + 3)(3x + 2) = {expand('(2x + 3)(3x + 2)')}", space=45)
    ws.question("Factorise 4x^2 − 2x − 6 fully.", "2(2x − 3)(x + 1)", space=45)


def fact_split(ws):
    ws.section("Practice")
    ws.question("Example: 2x^2 + 7x + 3. Multiply 2 × 3 = 6. Find two numbers that multiply to 6 and add to 7: 6 and 1.\n"
                "Split the middle: 2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3).",
                "(2x + 1)(x + 3)", space=5)
    P(ws, "Factorise by splitting the middle term.", F(["(2x + 3)(x + 2)", "(3x + 1)(x + 4)", "(2x − 1)(x + 5)",
                                                         "(3x − 4)(x − 1)", "(5x + 2)(x − 3)", "(2x + 5)(3x − 1)",
                                                         "(4x + 1)(x − 2)", "(3x + 2)(3x − 4)", "(6x − 1)(x + 1)"]), cols=3)
    ws.section("Problem solving")
    ws.question("Explain why the two numbers you look for must multiply to a × c (not just c).",
                "When you split bx into two terms and group, each pair must share a factor; this only works when "
                "the two numbers multiply to ac.", space=45)


def fact_dots(ws):
    ws.section("Practice")
    P(ws, "Factorise", F(["(x + 3)(x − 3)", "(x + 7)(x − 7)", "(y + 10)(y − 10)", "(2x + 1)(2x − 1)", "(3x + 4)(3x − 4)",
                          "(x + y)(x − y)", "(5a + 2b)(5a − 2b)", "(4x + 3y)(4x − 3y)"]), cols=4)
    P(ws, "Factorise fully (take out a common factor first).", F(["2(x + 3)(x − 3)", "5(x + 2)(x − 2)", "3(2x + 1)(2x − 1)"]),
      cols=3)
    ws.section("Problem solving")
    ws.question("Use the difference of two squares to work out 101^2 − 99^2 without a calculator.",
                "(101 + 99)(101 − 99) = 200 × 2 = 400", space=45)
    ws.question("Show that (n + 1)^2 − (n − 1)^2 is always a multiple of 4.",
                "= (2n)(2) = 4n, which is a multiple of 4", space=45)


def fact_brackets(ws):
    ws.section("Practice")
    P(ws, "Factorise by taking out the common bracket.", [
        ("x(y + 2) + 3(y + 2)", "(y + 2)(x + 3)"), ("a(b − 5) + 4(b − 5)", "(b − 5)(a + 4)"),
        ("2x(x + 1) − 3(x + 1)", "(x + 1)(2x − 3)"), ("m(n + 4) − (n + 4)", "(n + 4)(m − 1)")], cols=2)
    P(ws, "Factorise by grouping.", [("xy + 2x + 3y + 6", "(x + 3)(y + 2)"), ("ab + 5a + 2b + 10", "(a + 2)(b + 5)"),
                                     ("pq − 3p + 4q − 12", "(p + 4)(q − 3)"), ("x^2 + 3x + xy + 3y", "(x + 3)(x + y)")], cols=2)
    ws.section("Problem solving")
    ws.question("Factorise (x + 3)^2 + 2(x + 3).", "(x + 3)(x + 5)", space=40)
    ws.question("Show that ac + ad + bc + bd = (a + b)(c + d).", "a(c + d) + b(c + d) = (a + b)(c + d)", space=40)


SHEETS = [
    ({"slug": "equations-solving"}, solving),
    ({"slug": "equations-involving-fractions"}, fractions_eq),
    ({"slug": "equations-fractional-advanced"}, fractional_adv),
    ({"slug": "equations-cross-multiplication"}, cross_mult),
    ({"slug": "equations-letters-both-sides"}, both_sides),
    ({"slug": "equations-angles-and-perimeter"}, angles_perimeter),
    ({"slug": "equations-forming"}, forming),
    ({"slug": "equations-trial-and-improvement"}, trial),
    ({"slug": "equations-x-squared"}, x_squared),
    ({"slug": "equations-think-of-a-number"}, think_number),
    ({"slug": "factorisation-single-brackets"}, fact_single),
    ({"slug": "factorisation-quadratics"}, fact_quad),
    ({"slug": "factorisation-quadratics-harder"}, fact_harder),
    ({"slug": "factorisation-splitting-the-middle"}, fact_split),
    ({"slug": "factorisation-difference-of-2-squares"}, fact_dots),
    ({"slug": "factorisation-brackets"}, fact_brackets),
]
