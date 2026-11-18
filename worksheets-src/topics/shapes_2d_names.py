"""2D shapes: names"""
from engine.draw import shape2d, polygon_pts, circle_fig

META = {
    "title": "2D shapes: names",
    "slug": "2d-shapes-names",
    "topic": "Geometry",
    "level": "KS3",
}


def build(ws):
    ws.section("Practice")

    named = [
        ("circle", circle_fig("circle")),
        ("triangle", shape2d(polygon_pts(3))),
        ("square", shape2d([(0, 0), (1, 0), (1, 1), (0, 1)], right_angles=[0, 1, 2, 3], ticks=[1, 1, 1, 1])),
        ("rectangle", shape2d([(0, 0), (1.7, 0), (1.7, 0.9), (0, 0.9)], right_angles=[0, 1, 2, 3])),
        ("pentagon", shape2d(polygon_pts(5))),
        ("hexagon", shape2d(polygon_pts(6))),
        ("heptagon", shape2d(polygon_pts(7))),
        ("octagon", shape2d(polygon_pts(8))),
        ("semicircle", circle_fig("semicircle")),
        ("nonagon", shape2d(polygon_pts(9))),
        ("oval", circle_fig("oval")),
        ("decagon", shape2d(polygon_pts(10))),
    ]
    ws.figures("Write down the name of each shape.",
               [f for _, f in named], [n for n, _ in named], cols=4, fig_h=66)

    sides = [("pentagon", "5"), ("octagon", "8"), ("triangle", "3"), ("hexagon", "6"),
             ("decagon", "10"), ("heptagon", "7"), ("quadrilateral", "4"), ("nonagon", "9")]
    ws.parts("How many sides does each shape have?",
             [s for s, _ in sides], [a for _, a in sides], cols=4)

    described = [
        ("3 equal sides and 3 equal angles", "equilateral triangle"),
        ("4 equal sides and 4 right angles", "square"),
        ("4 right angles, with opposite sides equal but not all sides equal", "rectangle"),
        ("6 equal sides and 6 equal angles", "regular hexagon"),
        ("8 equal sides and 8 equal angles", "regular octagon"),
        ("one straight side and one curved side, made by cutting a circle in half", "semicircle"),
    ]
    ws.parts("Name the shape described.", [d for d, _ in described],
             [a for _, a in described], cols=1)

    ws.section("Problem solving")

    ws.question('Sam says, "A shape with 6 sides is called an octagon."\nIs Sam correct? Explain your answer.',
                "No. A shape with 6 sides is a hexagon. An octagon has 8 sides.", space=50)

    irregular_hex = [(0, 0), (2.2, 0), (2.6, 0.9), (1.6, 1.6), (0.3, 1.4), (-0.4, 0.6)]
    ws.question('Mia says, "This shape is not a hexagon, because its sides are all different lengths."\n'
                "Explain why Mia is wrong.",
                "It has 6 straight sides, so it is a hexagon. A hexagon does not need equal sides "
                "(only a regular hexagon has equal sides).",
                figure=shape2d(irregular_hex), fig_w=130, fig_h=80, space=40)

    house = [(0, 0), (1.4, 0), (1.4, 1.4), (0.7, 2.2), (0, 1.4)]
    ws.question("A square and a triangle are joined to make this shape.\n"
                "(a) How many sides does the new shape have?\n(b) What is the name of the new shape?",
                "(a) 5   (b) pentagon",
                figure=shape2d(house), fig_w=110, fig_h=95, space=30)

    ws.question("Lucy draws 4 pentagons. How many sides has she drawn altogether?",
                "20", space=40)

    ws.question("Which of these is **not** a polygon? Give a reason for your answer.\n"
                "square        circle        hexagon        triangle",
                "Circle. A polygon is made only of straight sides, and a circle has a curved side.",
                space=45)
