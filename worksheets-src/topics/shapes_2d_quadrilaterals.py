"""2D shapes: quadrilaterals"""
from engine.draw import shape2d

META = {
    "title": "2D shapes: quadrilaterals",
    "slug": "2d-shapes-quadrilaterals",
    "topic": "Geometry",
    "level": "KS3",
}

# Each shape lists its corners in order. Side i joins corner i to corner i+1.
# ticks = equal-side marks, arrows = parallel-side marks.
SQUARE = shape2d([(0, 0), (1, 0), (1, 1), (0, 1)], ticks=[1, 1, 1, 1], right_angles=[0, 1, 2, 3])
RECTANGLE = shape2d([(0, 0), (1.7, 0), (1.7, 0.95), (0, 0.95)], ticks=[1, 2, 1, 2], right_angles=[0, 1, 2, 3])
PARALLELOGRAM = shape2d([(0, 0), (1.5, 0), (1.95, 0.85), (0.45, 0.85)], arrows=[1, 2, 1, 2])
RHOMBUS = shape2d([(0, 0.6), (0.8, 0), (1.6, 0.6), (0.8, 1.2)], ticks=[1, 1, 1, 1])
TRAPEZIUM = shape2d([(0, 0), (1.9, 0), (1.3, 0.85), (0.2, 0.85)], arrows=[1, 0, 1, 0])
KITE = shape2d([(0.6, 0), (1.2, 0.95), (0.6, 1.35), (0, 0.95)], ticks=[2, 1, 1, 2])


def build(ws):
    ws.section("Practice")

    ws.figures("Write down the name of each quadrilateral.\n"
               "Matching dashes show equal sides. Matching arrows show parallel sides.",
               [SQUARE, RECTANGLE, PARALLELOGRAM, RHOMBUS, TRAPEZIUM, KITE],
               ["square", "rectangle", "parallelogram", "rhombus", "trapezium", "kite"],
               cols=3, fig_h=72)

    clues = [
        ("All four sides are equal and all four angles are 90°.", "square"),
        ("It has exactly one pair of parallel sides.", "trapezium"),
        ("It has two pairs of equal sides next to each other, and no parallel sides.", "kite"),
        ("All four sides are equal, but none of its angles are 90°.", "rhombus"),
        ("Opposite sides are equal and parallel. All angles are 90°, but the sides are not all equal.", "rectangle"),
        ("Opposite sides are equal and parallel. None of the angles are 90°, and the sides are not all equal.", "parallelogram"),
    ]
    ws.parts("Which quadrilateral is being described?", [q for q, _ in clues],
             [a for _, a in clues], cols=1)

    tf = [
        ("A square is a special type of rectangle.", "True"),
        ("Every rhombus is a square.", "False"),
        ("A rectangle has 2 lines of symmetry.", "True"),
        ("A parallelogram has 2 pairs of parallel sides.", "True"),
        ("A kite has 2 pairs of parallel sides.", "False"),
        ("The diagonals of a square cross at right angles.", "True"),
        ("All four angles of a rhombus are right angles.", "False"),
        ("The angles inside any quadrilateral add up to 360°.", "True"),
    ]
    ws.parts("Write True or False for each statement.", [q for q, _ in tf],
             [a for _, a in tf], cols=2)

    ws.section("Problem solving")

    ws.question('Ben says, "A square cannot be a rhombus."\nExplain why Ben is wrong.',
                "A rhombus is any quadrilateral with four equal sides. A square has four equal "
                "sides, so a square is a special rhombus (one with right angles).", space=45)

    ws.question("A quadrilateral has exactly one line of symmetry and no parallel sides.\n"
                "What is the name of the quadrilateral?",
                "kite", space=30)

    ws.question("Draw a quadrilateral that has exactly one pair of parallel sides and two right angles.\n"
                "What is the name of your shape?",
                "A trapezium (a right-angled trapezium). Check the drawing has one pair of "
                "parallel sides and two 90° angles.", space=95)

    ws.question("Two identical right-angled triangles are joined along their longest sides.\n"
                "Name two different quadrilaterals that could be made.",
                "rectangle and kite (if the triangles are isosceles, the rectangle is a square)",
                figure=shape2d([(0, 0), (1.6, 0), (0, 1)], right_angles=[0]),
                fig_w=100, fig_h=62, space=30)
