"""Algebra: expanding two brackets
Answers are worked out by engine/algebra.py."""
from engine.algebra import expand
from engine.draw import shape2d

META = {"title": "Algebra: expanding two brackets", "slug": "algebra-expanding-two-brackets"}


def auto(ws, prompt, qs, cols=3):
    ws.parts(prompt, qs, [expand(q) for q in qs], cols=cols)


def build(ws):
    ws.section("Practice")

    auto(ws, "Expand and simplify", [
        "(x + 2)(x + 3)", "(x + 5)(x + 1)", "(x + 7)(x + 2)", "(x + 3)(x − 4)",
        "(x − 6)(x + 2)", "(x − 5)(x − 3)", "(x − 1)(x − 8)", "(y + 9)(y − 9)",
        "(a + 10)(a − 3)", "(p − 2)(p + 11)", "(m − 7)(m − 7)", "(x + 1)(x + 1)",
    ], cols=4)

    auto(ws, "Expand and simplify", [
        "(2x + 1)(x + 3)", "(3x + 2)(x − 4)", "(x − 5)(2x + 7)", "(2x + 3)(3x + 1)",
        "(4x − 1)(2x − 5)", "(5x + 2)(5x − 2)", "(3y − 4)(2y + 3)", "(2a + b)(a − 3b)",
        "(7 − x)(2 + x)",
    ])

    auto(ws, "Expand and simplify", [
        "(x + 4)^2", "(x − 3)^2", "(2x + 5)^2", "(3x − 1)^2", "(x + y)^2", "(2a − 3b)^2",
    ])

    ws.section("Problem solving")

    ws.question("Find an expression for the area of this rectangle.\nGive your answer in its simplest form.",
                expand("(x + 5)(x + 2)"),
                figure=shape2d([(0, 0), (2.4, 0), (2.4, 1.2), (0, 1.2)], right_angles=[0, 1, 2, 3],
                               labels=["x + 5", "x + 2", None, None]),
                fig_w=150, fig_h=85, space=10)

    ws.question("Show that (x + 3)^2 − (x − 3)^2 = 12x",
                f"(x + 3)^2 = {expand('(x + 3)^2')} and (x − 3)^2 = {expand('(x − 3)^2')}; "
                "subtracting leaves 6x − (−6x) = 12x", space=60)

    ws.question("Ravi says, \"(x + 5)^2 = x^2 + 25\"\nExplain why Ravi is wrong.",
                f"(x + 5)^2 means (x + 5)(x + 5), which has two middle terms of 5x: "
                f"(x + 5)^2 = {expand('(x + 5)^2')}", space=50)

    ws.question("(x + a)(x + 4) = x^2 + 9x + b\nFind the values of a and b.",
                "a + 4 = 9, so a = 5; b = 4a = 20", space=50)

    ws.question("A square of side x is cut out of a square of side x + 3.\n"
                "Show that the area that is left is 6x + 9.",
                f"(x + 3)^2 − x^2 = {expand('(x + 3)^2')} − x^2 = {expand('(x + 3)^2 − x^2')}",
                figure=shape2d([(0, 0), (1.5, 0), (1.5, 1.5), (0, 1.5)], labels=["x + 3", None, None, None]),
                fig_w=100, fig_h=90, space=10)
