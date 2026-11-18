"""Algebra: changing the subject"""
from engine.draw import shape2d

META = {"title": "Algebra: changing the subject", "slug": "algebra-changing-the-subject"}


def build(ws):
    ws.section("Practice")

    q1 = [("y = x + 5", "x = y − 5"), ("y = x − 7", "x = y + 7"), ("a = x + b", "x = a − b"),
          ("y = 4x", "x = [[y//4]]"), ("p = [[x//3]]", "x = 3p"), ("y = mx", "x = [[y//m]]"),
          ("y = x − c", "x = y + c"), ("t = [[x//k]]", "x = kt")]
    ws.parts("Make x the subject of each formula.", [q for q, _ in q1], [a for _, a in q1], cols=4)

    q2 = [("y = 2x + 3", "x = [[y − 3//2]]"), ("y = 5x − 1", "x = [[y + 1//5]]"),
          ("y = mx + c", "x = [[y − c//m]]"), ("p = 3x − q", "x = [[p + q//3]]"),
          ("y = [[x//2]] + 4", "x = 2(y − 4)"), ("y = [[x + 1//3]]", "x = 3y − 1"),
          ("a = [[x − b//c]]", "x = ac + b"), ("y = 7 − x", "x = 7 − y"),
          ("y = 10 − 2x", "x = [[10 − y//2]]")]
    ws.parts("Make x the subject of each formula.", [q for q, _ in q2], [a for _, a in q2], cols=3)

    q3 = [("y = x^2", "x = ±√y"), ("A = x^2 + 4", "x = ±√(A − 4)"), ("y = 3x^2", "x = ±√([[y//3]])"),
          ("y = √x", "x = y^2"), ("p = √(x + 1)", "x = p^2 − 1"), ("V = x^3", "x = ^{3}√V")]
    ws.parts("Make x the subject of each formula.", [q for q, _ in q3], [a for _, a in q3], cols=3)

    q4 = [("A = lw          [w]", "w = [[A//l]]"),
          ("P = 2l + 2w          [l]", "l = [[P − 2w//2]]"),
          ("v = u + at          [t]", "t = [[v − u//a]]"),
          ("C = 2πr          [r]", "r = [[C//2π]]"),
          ("A = πr^2          [r]", "r = √([[A//π]])"),
          ("E = [[1//2]]mv^2          [v]", "v = √([[2E//m]])"),
          ("s = [[(u + v)t//2]]          [t]", "t = [[2s//u + v]]"),
          ("F = [[9C//5]] + 32          [C]", "C = [[5(F − 32)//9]]")]
    ws.parts("Rearrange each formula to make the letter in square brackets the subject.",
             [q for q, _ in q4], [a for _, a in q4], cols=2)

    ws.section("Problem solving")

    ws.question("This formula changes a temperature in °C to °F:     F = 1.8C + 32\n"
                "(a) Make C the subject of the formula.\n(b) Use your answer to change 77 °F into °C.",
                "(a) C = [[F − 32//1.8]]   (b) 25 °C", space=55)

    ws.question("The perimeter of this rectangle is P = 2(a + 3).\nMake a the subject of the formula.",
                "a = [[P//2]] − 3   (or a = [[P − 6//2]])",
                figure=shape2d([(0, 0), (2.2, 0), (2.2, 1), (0, 1)], right_angles=[0, 1, 2, 3],
                               labels=["a", "3", None, None]),
                fig_w=130, fig_h=70, space=10)

    ws.question("Kai makes x the subject of y = 4x − 9 and writes x = [[y//4]] + 9.\n"
                "Explain Kai's mistake, and write the correct answer.",
                "Kai divided by 4 before adding 9, but did not divide the 9 as well. Add 9 first, "
                "then divide everything by 4: x = [[y + 9//4]].", space=55)

    ws.question("The area of a circle is A = πr^2.\n"
                "A circle has an area of 50 cm^2. Find its radius, correct to 1 decimal place.",
                "r = √([[A//π]]) = √([[50//π]]) = 4.0 cm (1 d.p.)", space=55)
