"""Algebra: completing the square
Answers are worked out by engine/algebra.py (complete_square)."""
from engine.algebra import complete_square

META = {"title": "Algebra: completing the square", "slug": "algebra-completing-the-square"}


def quad(a, b, c):
    """Write ax^2 + bx + c as a question, e.g. quad(1, -6, 4) -> 'x^2 − 6x + 4'."""
    out = ("" if a == 1 else "−" if a == -1 else str(a)) + "x^2"
    if b:
        out += f" {'+' if b > 0 else '−'} {'' if abs(b) == 1 else abs(b)}x"
    if c:
        out += f" {'+' if c > 0 else '−'} {abs(c)}"
    return out


def cs_parts(ws, prompt, coeffs, cols=3):
    ws.parts(prompt, [quad(*k) for k in coeffs], [complete_square(*k) for k in coeffs], cols=cols)


def build(ws):
    ws.section("Practice")

    cs_parts(ws, "Write each expression in the form (x + p)^2 + q.", [
        (1, 6, 10), (1, 4, 1), (1, 8, 20), (1, -2, 5), (1, -10, 30), (1, 12, 0),
        (1, -6, -4), (1, 2, -8), (1, -14, 50), (1, 20, 99), (1, -4, 4), (1, 16, -1),
    ])

    cs_parts(ws, "Write each expression in the form (x + p)^2 + q. The answers involve fractions.", [
        (1, 3, 1), (1, 5, -2), (1, -7, 10), (1, -1, 1), (1, 9, 0), (1, 1, -3),
    ])

    cs_parts(ws, "Write each expression in the form a(x + p)^2 + q.", [
        (2, 8, 3), (3, -12, 5), (2, 6, -1), (5, 20, 0), (-1, 4, 1), (4, -8, 7),
    ])

    ws.section("Problem solving")

    ws.question("(a) Write x^2 − 6x + 11 in the form (x + p)^2 + q.\n"
                "(b) Write down the coordinates of the turning point of y = x^2 − 6x + 11\n"
                "(c) Explain why x^2 − 6x + 11 is always positive.",
                f"(a) {complete_square(1, -6, 11)}   (b) (3, 2)   (c) (x − 3)^2 is never negative, "
                "so the expression is always at least 2.", space=75)

    ws.question("Solve x^2 + 8x + 3 = 0 by completing the square. Give your answers in surd form.",
                f"{complete_square(1, 8, 3)} = 0, so x + 4 = ±√13, so x = −4 ± √13", space=70)

    ws.question("x^2 + bx + 7 = (x + 5)^2 + c\nFind the values of b and c.",
                "(x + 5)^2 + c = x^2 + 10x + 25 + c, so b = 10 and c = −18", space=60)

    ws.question("Find the minimum value of x^2 − 10x + 32, and the value of x at which it happens.",
                f"{complete_square(1, -10, 32)}, so the minimum value is 7, when x = 5", space=60)
