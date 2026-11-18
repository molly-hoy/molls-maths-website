"""Algebra: expanding brackets (a single bracket)
Answers are worked out by engine/algebra.py."""
from engine.algebra import expand, simplify
from engine.draw import shape2d

META = {"title": "Algebra: expanding brackets", "slug": "algebra-expanding-brackets"}


def build(ws):
    ws.section("Practice")

    q1 = ["3(x + 4)", "5(y − 2)", "2(a + b)", "4(2m + 3)", "6(3 − p)", "7(2x − 5y)",
          "−2(x + 6)", "−3(4 − y)", "8(x + y − 2)", "3(2a − 4b + 1)", "−(x − 7)", "5(3x + 2y)"]
    ws.parts("Expand", q1, [expand(q, order="keep") for q in q1], cols=4)

    q2 = ["x(x + 3)", "a(a − 5)", "y(4 + y)", "2x(x + 7)", "3p(2p − 1)", "m(m + n)",
          "4a(3a + 2b)", "5x(2 − x)", "−x(x + 6)", "−2y(3y − 4)", "x^2(x + 1)", "ab(a + b)"]
    ws.parts("Expand", q2, [expand(q, order="keep") for q in q2], cols=4)

    q3 = ["2(x + 5) + 3(x − 2)", "4(y + 3) − 2(y + 1)", "x(x + 2) + 3(x + 1)",
          "a(a − 4) − 2(a − 3)", "5(2p + 1) − 3(p − 4)", "2x(x + 3) − x(x − 1)"]
    ws.parts("Expand and simplify", q3, [expand(q) for q in q3], cols=3)

    ws.section("Problem solving")

    ws.question("Find an expression for the area of this rectangle. Expand any brackets.",
                expand("5(x + 3)"),
                figure=shape2d([(0, 0), (2.6, 0), (2.6, 1), (0, 1)], right_angles=[0, 1, 2, 3],
                               labels=["x + 3", "5", None, None]),
                fig_w=150, fig_h=75, space=10)

    ws.question("Show that 3(2x + 4) − 2(x − 1) = 2(2x + 7)",
                f"3(2x + 4) − 2(x − 1) = 6x + 12 − 2x + 2 = {simplify('3(2x + 4) − 2(x − 1)')}, "
                f"and 2(2x + 7) = {expand('2(2x + 7)')}", space=55)

    ws.question("Jo expands 4(3x − 2) and gets 12x − 2.\nExplain Jo's mistake and write the correct answer.",
                f"Jo only multiplied the first term by 4. Both terms must be multiplied: {expand('4(3x − 2)')}",
                space=50)

    ws.question("Fill in the gaps:        ____(2x + ____) = 6x + 15", "3(2x + 5)", space=35)

    ws.question("One rectangle measures 3 by (x + 4). Another measures x by (x + 1).\n"
                "Find a simplified expression for their total area.",
                expand("3(x + 4) + x(x + 1)"), space=50)
