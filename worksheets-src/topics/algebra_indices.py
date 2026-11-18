"""Algebra: indices (the laws of indices with letters)
Answers are worked out by engine/algebra.py."""
from engine.algebra import simplify, divide, expand
from engine.draw import shape2d

META = {"title": "Algebra: indices", "slug": "algebra-indices"}


def build(ws):
    ws.section("Practice")

    q1 = ["x^3 × x^4", "a^5 × a^2", "y × y^6", "m^2 × m^3 × m",
          "2x^3 × 5x^2", "3a^4 × 4a", "p^2q × p^3q^4", "6x^2y × 2xy^3"]
    ws.parts("Simplify", q1, [simplify(q) for q in q1], cols=4)

    q2 = [("x^8", "x^3"), ("a^6", "a"), ("12y^7", "4y^2"), ("20m^5", "5m^5"),
          ("10x^9", "2x^4"), ("15a^6b^3", "3a^2b"), ("p^4", "p^6"), ("−18k^7", "6k^3")]
    ws.parts("Simplify", [f"{t} ÷ {b}" for t, b in q2], [divide(t, b) for t, b in q2], cols=4)

    q3 = ["(x^3)^2", "(a^4)^5", "(2y^3)^2", "(3m^2)^3", "(x^2y^3)^4", "(−2a^5)^3"]
    ws.parts("Simplify", q3, [expand(q) for q in q3], cols=3)

    q4 = [("x^0", "1"), ("5y^0", "5"), ("(x^2)^3 × x", "x^7"),
          ("[[x^5 × x^3//x^2]]", "x^6"), ("[[(a^3)^4//a^5]]", "a^7"), ("[[4p^3 × 3p^4//6p^2]]", "2p^5")]
    ws.parts("Simplify", [q for q, _ in q4], [a for _, a in q4], cols=3)

    ws.section("Problem solving")

    ws.parts("Find the value of n in each of these.",
             ["x^n × x^3 = x^{10}", "(x^4)^n = x^{20}", "x^{12} ÷ x^n = x^3"], ["7", "5", "9"], cols=3)

    ws.question("A square has sides of length 3x^4.\nFind an expression for its area.",
                expand("(3x^4)^2"),
                figure=shape2d([(0, 0), (1, 0), (1, 1), (0, 1)], ticks=[1, 1, 1, 1], labels=["3x^4", None, None, None]),
                fig_w=90, fig_h=80, space=10)

    ws.question("Amy says, \"x^3 × x^4 = x^{12}\"\nExplain Amy's mistake.",
                "When you multiply, you add the powers, not multiply them: x^3 × x^4 = x^7.", space=45)

    ws.question("Simplify fully        [[6a^5b^2 × 2ab^3//4a^3b]]",
                "3a^3b^4", space=50)
