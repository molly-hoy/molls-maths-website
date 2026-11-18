"""Algebra: substitution
Most answers are worked out by engine/algebra.py (evaluate)."""
from engine.algebra import evaluate, num

META = {"title": "Algebra: substitution", "slug": "algebra-substitution"}


def build(ws):
    ws.section("Practice")

    vals = dict(a=3, b=5, c=-2)
    q1 = ["a + b", "b − a", "4a", "ab", "2a + 3b", "a^2", "c^2", "3c",
          "a − c", "bc", "a^2 + b^2", "5c + 2b", "abc", "2c^3", "(a + c)^2", "b^2 − 4ac"]
    ws.parts("Work out the value of each expression when a = 3, b = 5 and c = −2.",
             q1, [num(evaluate(q, **vals)) for q in q1], cols=4)

    q2 = [("[[b + 1//a]]", "2"), ("[[ab//c]]", "[[−15//2]] or −7.5"), ("[[a + b//c]]", "−4")]
    ws.parts("Work out the value of each expression when a = 3, b = 5 and c = −2.",
             [q for q, _ in q2], [a for _, a in q2], cols=3)

    q3 = [("v = u + at.     Find v when u = 4, a = 3 and t = 6.", num(evaluate("u + at", u=4, a=3, t=6))),
          ("P = 2(l + w).     Find P when l = 7.5 and w = 4.", "23"),
          ("A = [[1//2]]bh.     Find A when b = 9 and h = 6.", "27"),
          ("E = mc^2.     Find E when m = 3 and c = 4.", num(evaluate("mc^2", m=3, c=4))),
          ("s = [[(u + v)t//2]].     Find s when u = 2, v = 8 and t = 5.", "25"),
          ("y = 3x^2 − 2x + 1.     Find y when x = −2.", num(evaluate("3x^2 − 2x + 1", x=-2)))]
    ws.parts("Use each formula to answer the question.", [q for q, _ in q3], [a for _, a in q3], cols=1)

    ws.section("Problem solving")

    ws.question("The time, T minutes, to cook a turkey of mass w kg is T = 40w + 20.\n"
                "How long does it take to cook a 5 kg turkey? Give your answer in hours and minutes.",
                "T = 40 × 5 + 20 = 220 minutes = 3 hours 40 minutes", space=50)

    ws.question("x = 4. Write these expressions in order of size, smallest first.\n"
                "x^2          3x + 5          25 − x          [[48//x]]",
                "[[48//x]] (12),  x^2 (16),  3x + 5 (17),  25 − x (21)", space=45)

    ws.question("Ben says, \"When n = 3, the value of 2n^2 is 36.\"\nExplain Ben's mistake.",
                "Only n is squared: 2n^2 = 2 × 3^2 = 2 × 9 = 18. Ben worked out (2n)^2 = 6^2.", space=45)

    ws.question("F = 1.8C + 32 changes a temperature from °C to °F.\nFind F when C = −10.",
                "F = 1.8 × (−10) + 32 = −18 + 32 = 14", space=40)

    ws.question("When a = 2, find the value of b that makes 5a + b = 3b − 4.",
                "10 + b = 3b − 4, so 14 = 2b, so b = 7", space=45)
