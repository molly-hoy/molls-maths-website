"""Algebra: multiplying terms
Answers are worked out by engine/algebra.py."""
from engine.algebra import simplify
from engine.draw import shape2d, solid

META = {"title": "Algebra: multiplying terms", "slug": "algebra-multiplying-terms"}


def build(ws):
    ws.section("Practice")

    q1 = ["3 × x", "a × b", "4 × 5y", "2a × 3", "6p × q", "3x × 4y", "x × x", "5a × a",
          "2m × 7m", "4ab × 3", "2x × 3y × 4", "a × b × c", "−3 × 2y", "−4p × (−5q)", "3x × x × x", "2ab × 5a"]
    ws.parts("Simplify", q1, [simplify(q) for q in q1], cols=4)

    q2 = ["a × 3", "b × a", "y × 4 × x", "m × m × m", "2 × p × p", "x × y × x"]
    ws.parts("Write each of these without a × sign.", q2, [simplify(q) for q in q2], cols=3)

    ws.section("Problem solving")

    ws.question("Find an expression for the area of this rectangle.",
                simplify("4x × 3y"),
                figure=shape2d([(0, 0), (2.2, 0), (2.2, 1), (0, 1)], right_angles=[0, 1, 2, 3],
                               labels=["4x", "3y", None, None]),
                fig_w=140, fig_h=70, space=10)

    ws.question("A cube has edges of length 2a.\nFind an expression for its volume.",
                simplify("2a × 2a × 2a"), figure=solid("cube"), fig_w=70, fig_h=60, space=10)

    ws.question("Fill in the missing term:        3a × ______ = 15a^2b", "5ab", space=35)

    ws.question("Which two of these terms multiply to give 24x^2y?\n"
                "6x          8y          4xy          3x          2x^2",
                "6x and 4xy", space=40)

    ws.question("Explain why 3x × 4x is not equal to 12x.",
                "x × x = x^2, so 3x × 4x = 12x^2.", space=40)
