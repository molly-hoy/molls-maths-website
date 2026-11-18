"""Algebra: dividing terms
Answers are worked out by engine/algebra.py (divide)."""
from engine.algebra import divide
from engine.draw import shape2d

META = {"title": "Algebra: dividing terms", "slug": "algebra-dividing-terms"}


def build(ws):
    ws.section("Practice")

    pairs = [("10x", "2"), ("12y", "4"), ("15a", "3"), ("8p", "8"),
             ("6x", "x"), ("12ab", "3a"), ("20xy", "5y"), ("9mn", "3mn"),
             ("x^2", "x"), ("8a^2", "2a"), ("14y^3", "7y"), ("18p^2q", "6pq"),
             ("24a^3b^2", "8ab"), ("−15x^2", "5x"), ("12k^5", "(−4k^2)"), ("30m^4n^3", "10m^2n")]
    ws.parts("Simplify", [f"{t} ÷ {b}" for t, b in pairs], [divide(t, b) for t, b in pairs], cols=4)

    fracs = [("6x", "3"), ("20y", "4y"), ("9a^2", "3a"), ("16x^3y", "4xy"),
             ("5x", "10"), ("3a", "9a^2"), ("14p^2q", "21pq^2"), ("−8x^4", "2x^4")]
    ws.parts("Simplify fully. Some answers will still be fractions.",
             [f"[[{t}//{b}]]" for t, b in fracs], [divide(t, b) for t, b in fracs], cols=4)

    ws.section("Problem solving")

    ws.question("The area of this rectangle is 24x^2. Its width is 4x.\nFind an expression for its length.",
                divide("24x^2", "4x"),
                figure=shape2d([(0, 0), (2.4, 0), (2.4, 1), (0, 1)], right_angles=[0, 1, 2, 3],
                               labels=["?", "4x", None, None]),
                fig_w=140, fig_h=75, space=10)

    ws.question("Fill in the missing term:        36a^3b^2 ÷ ______ = 4ab", divide("36a^3b^2", "4ab"), space=40)

    ws.question("Sam says, \"12x^6 ÷ 3x^2 = 4x^3\"\nIs Sam correct? Explain your answer.",
                f"No. When you divide, you subtract the powers (6 − 2 = 4), not divide them. "
                f"The answer is {divide('12x^6', '3x^2')}.", space=50)

    ws.question("A cuboid has a volume of 60x^3. Its base measures 5x by 3x.\nFind an expression for its height.",
                f"area of base = 15x^2, height = 60x^3 ÷ 15x^2 = {divide('60x^3', '15x^2')}", space=55)
