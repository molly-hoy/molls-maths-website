"""Algebra: collecting like terms
Answers for the Practice section are worked out by engine/algebra.py."""
from engine.algebra import simplify
from engine.draw import shape2d, polygon_pts

META = {
    "title": "Algebra: collecting like terms",
    "slug": "algebra-collecting-like-terms",
    "topic": "Algebra",
    "level": "KS3",
}


def auto(ws, prompt, questions, cols):
    """A parts question whose answers are calculated, not typed."""
    ws.parts(prompt, questions, [simplify(q) for q in questions], cols=cols)


def build(ws):
    ws.section("Practice")

    auto(ws, "Simplify", [
        "m + m + m", "k + k + k + k + k", "b + b", "r + r + r + r",
        "h + h + h − h", "z + z + z + z − z − z", "5a + 4a", "2n + 6n",
        "8p + p", "12d + 9d", "9w − 4w", "11y − 6y",
        "6c + 2c − 3c", "15t − 8t", "10x − 4x − x", "7g − 7g",
        "8b − 3b + 2b", "q^2 + q^2 + q^2", "4m^2 + 5m^2", "9a^2 − 3a^2 + a^2",
    ], cols=4)

    auto(ws, "Simplify. Some answers will be negative.", [
        "3h − 7h", "5k − 12k", "2y + 3y − 10y", "−4x − 5x",
        "−6p + 2p", "−a − 9a", "−3t + 11t", "4c^2 − 9c^2",
        "2xy + 3xy", "5ab − 8ab + ab", "6n − 4n − 5n", "−2m^2 − m^2 + 7m^2",
    ], cols=4)

    auto(ws, "Simplify each expression by collecting like terms.", [
        "4a + 3b + 2a + 5b", "6x + 2y + x + 3y", "5m + 4 + 2m + 7",
        "9 + 3k + 6 + k", "7p + 2q − 3p + q", "8c − 3 + 2c − 4",
        "3x + 5 − x − 9", "2g + 6h − 5g + h", "4y − 2z − 7y + 6z",
        "10 − 3w + 2 − 5w", "6r − 3s − 2r − 3s", "x + 4y − 3x − 2y + 5x",
        "3d − 7e + 2f + 5e − f", "12u − 4v − 9u + 4v", "5a + 2b − 3 + a − 4b + 8",
    ], cols=3)

    auto(ws, "Simplify", [
        "4x^2 + 3x + 2x^2 + 5x", "6a^2 − 2a + a^2 − 7a",
        "3xy + 5x + 2xy − x", "8m^2 − 3mn + 2mn − 5m^2",
        "5ab + 2b^2 − 3ab + 4b^2 − b", "7p^2 − 4p + 2 − 3p^2 + 6p − 5",
    ], cols=2)

    auto(ws, "Expand the brackets and simplify.", [
        "3(a + 2) + 2(a + 4)", "5(x + 1) + 4(x + 3)", "2(y − 3) + 6(y + 1)",
        "4(2m + 1) + 3(m + 5)", "7x + 2 + 3(x + 4)", "6(t + 2) + 2(3t − 5)",
        "3(4p − 1) + 2(p − 6)", "5(n + 3) − 2(n + 4)", "4(2y + 3) − 3(y − 2)",
        "6(c − 2) − 2(2c − 7)", "2(5x − 1) − 4(x + 3)", "3(2a + 5) − 5(a − 1)",
    ], cols=3)

    ws.section("Problem solving")

    rect = shape2d([(0, 0), (2, 0), (2, 1), (0, 1)], right_angles=[0, 1, 2, 3],
                   labels=["4a", "a + 2", None, None])
    tri = shape2d([(0, 0), (1.2, 0), (0.6, 1.25)], ticks=[0, 1, 1], labels=["2y", "3x", "3x"])
    pent = shape2d(polygon_pts(5), ticks=[1, 1, 1, 1, 1], labels=["2m + 1", None, None, None, None])
    ws.figures("Find an expression for the perimeter of each shape. Simplify your answers.",
               [rect, tri, pent], ["10a + 4", "6x + 2y", "10m + 5"], cols=3, fig_h=88)

    ws.question("A regular hexagon has sides of length 2y + 3.\n"
                "Find an expression for the perimeter of the hexagon.",
                simplify("6(2y + 3)"),
                figure=shape2d(polygon_pts(6), ticks=[1] * 6), fig_w=72, fig_h=60, space=10)

    ws.question("Fill in the missing term:      4a + ____ + 3b − a = 3a + 7b",
                "4b", space=16)

    ws.question("The perimeter of this triangle is 12x + 5.\n"
                "Find an expression for the length of the missing side.",
                simplify("12x + 5 − (3x + 2) − (4x + 1)"),
                figure=shape2d([(0, 0), (2.2, 0), (1.5, 1.3)], labels=["4x + 1", "?", "3x + 2"]),
                fig_w=150, fig_h=80, space=10)

    ws.question("Tom simplifies 5x + 3y − 2x − y and writes 3x + 4y.\n"
                "Explain the mistake Tom has made, and write the correct answer.",
                f"Tom added y instead of subtracting it (3y − y = 2y, not 4y). "
                f"Correct answer: {simplify('5x + 3y − 2x − y')}", space=35)
