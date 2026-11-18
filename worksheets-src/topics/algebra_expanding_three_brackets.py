"""Algebra: expanding three brackets
Answers are worked out by engine/algebra.py."""
from engine.algebra import expand
from engine.draw import solid

META = {"title": "Algebra: expanding three brackets", "slug": "algebra-expanding-three-brackets"}


def auto(ws, prompt, qs, cols=2):
    ws.parts(prompt, qs, [expand(q) for q in qs], cols=cols)


def build(ws):
    ws.section("Practice")

    auto(ws, "Expand and simplify", [
        "(x + 1)(x + 2)(x + 3)", "(x + 2)(x + 4)(x + 1)", "(x − 1)(x + 2)(x + 3)",
        "(x + 5)(x − 2)(x − 1)", "(x − 3)(x − 4)(x + 2)", "(x + 1)^3",
        "(x − 2)^3", "(x + 3)^2(x − 1)",
    ])

    auto(ws, "Expand and simplify", [
        "(2x + 1)(x + 3)(x − 2)", "(3x − 1)(x + 2)(x + 4)", "(2x + 3)(2x − 3)(x + 1)",
        "(x + 1)(2x − 1)(3x + 2)", "(2x − 1)^3", "(x + y)(x − y)(x + 2y)",
    ])

    ws.section("Problem solving")

    ws.question("A cuboid measures x cm by (x + 2) cm by (x + 5) cm.\n"
                "Find an expression for its volume. Give your answer in its simplest form.",
                f"{expand('x(x + 2)(x + 5)')} cm^3",
                figure=solid("cuboid"), fig_w=100, fig_h=65, space=15)

    ws.question("Show that (x + 2)^3 = x^3 + 6x^2 + 12x + 8",
                f"(x + 2)^2 = {expand('(x + 2)^2')}; multiplying by (x + 2) gives {expand('(x + 2)^3')}",
                space=60)

    ws.question("(x + 3)(x − 1)(x + a) = x^3 + 4x^2 + bx − 6\nFind the values of a and b.",
                f"The numbers multiply to −6: 3 × (−1) × a = −3a = −6, so a = 2. "
                f"Then (x + 3)(x − 1)(x + 2) = {expand('(x + 3)(x − 1)(x + 2)')}, so b = 1.", space=65)

    ws.question("A cube of side x is cut out of a cube of side (x + 1).\n"
                "Find a simplified expression for the volume that is left.",
                f"(x + 1)^3 − x^3 = {expand('(x + 1)^3 − x^3')}", space=55)
