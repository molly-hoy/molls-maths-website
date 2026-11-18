"""Algebra: equation of a circle (centre the origin)"""
from engine.draw import axes

META = {"title": "Algebra: equation of a circle", "slug": "algebra-equation-of-a-circle"}


def build(ws):
    ws.section("Practice")

    radii = [("3", "9"), ("5", "25"), ("1", "1"), ("10", "100"), ("√7", "7"), ("[[1//2]]", "[[1//4]]")]
    ws.parts("Write down the equation of the circle with centre (0, 0) and radius:",
             [r for r, _ in radii], [f"x^2 + y^2 = {s}" for _, s in radii], cols=3)

    eqs = [("16", "4"), ("49", "7"), ("81", "9"), ("2", "√2"), ("12", "√12 = 2√3"), ("0.25", "0.5")]
    ws.parts("Write down the radius of each circle.",
             [f"x^2 + y^2 = {e}" for e, _ in eqs], [r for _, r in eqs], cols=3)

    ws.figures("Write down the equation of each circle.",
               [axes(-6, 6, -6, 6, [("circle", 0, 0, r)], label_step=2) for r in (2, 4, 5)],
               ["x^2 + y^2 = 4", "x^2 + y^2 = 16", "x^2 + y^2 = 25"], cols=3, fig_h=140)

    ws.question("Draw the graph of x^2 + y^2 = 9 on the axes.",
                "A circle with centre (0, 0) through (3, 0), (0, 3), (−3, 0) and (0, −3).",
                figure=axes(-5, 5, -5, 5), fig_w=200, fig_h=200, fig_pos="right", space=0)

    ws.section("Problem solving")

    ws.question("Does the point (3, 4) lie on the circle x^2 + y^2 = 25? Show how you decide.",
                "Yes: 3^2 + 4^2 = 9 + 16 = 25", space=45)

    ws.question("The point (k, 5) lies on the circle x^2 + y^2 = 169.\nFind the two possible values of k.",
                "k^2 + 25 = 169, so k^2 = 144, so k = 12 or k = −12", space=50)

    ws.question("A circle has its centre at the origin and passes through the point (6, −8).\n"
                "Find the equation of the circle.",
                "6^2 + (−8)^2 = 36 + 64 = 100, so x^2 + y^2 = 100", space=50)

    ws.question("Find the coordinates of the points where the line y = x crosses the circle x^2 + y^2 = 50.",
                "x^2 + x^2 = 50, so x^2 = 25, so x = ±5: the points are (5, 5) and (−5, −5)", space=55)

    ws.question("Is the point (2, 3) inside, outside or on the circle x^2 + y^2 = 16? Explain how you know.",
                "Inside: 2^2 + 3^2 = 13, which is less than 16 (the point is closer to the centre than 4 units).",
                space=45)
