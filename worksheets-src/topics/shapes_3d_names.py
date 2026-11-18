"""3D shapes: names"""
from engine.draw import solid

META = {
    "title": "3D shapes: names",
    "slug": "3d-shapes-names",
    "topic": "Geometry",
    "level": "KS3",
}


def build(ws):
    ws.section("Practice")

    names = ["cube", "cuboid", "cylinder", "cone",
             "sphere", "square-based pyramid", "triangular prism", "hemisphere",
             "triangular-based pyramid", "hexagonal prism", "pentagonal prism", "hexagonal-based pyramid"]
    ws.figures("Write down the name of each 3D shape. Dashed lines show edges you cannot see.",
               [solid(n) for n in names], names, cols=4, fig_h=72)

    clues = [
        ("one curved surface, no edges and no vertices", "sphere"),
        ("6 square faces", "cube"),
        ("2 flat circular faces and 1 curved surface", "cylinder"),
        ("a square base and 4 triangular faces that meet at a point", "square-based pyramid"),
        ("2 triangular faces and 3 rectangular faces", "triangular prism"),
        ("a circular base and a curved surface that comes to a point", "cone"),
        ("1 flat circular face and 1 curved surface, like half a ball", "hemisphere"),
        ("6 rectangular faces, not all of them squares", "cuboid"),
    ]
    ws.parts("Name the 3D shape that has:", [q for q, _ in clues], [a for _, a in clues], cols=1)

    ws.parts("Write down an everyday object that has the shape of a:",
             ["cylinder", "sphere", "cuboid", "cone"],
             ["e.g. a tin of beans", "e.g. a football", "e.g. a cereal box", "e.g. an ice cream cone"],
             cols=4)

    ws.section("Problem solving")

    ws.question('Raj says, "A cube is a type of cuboid."\nIs Raj correct? Explain your answer.',
                "Yes. A cuboid has 6 rectangular faces. A square is a special rectangle, so a cube "
                "is a cuboid whose faces are all squares.", space=45)

    ws.question("Name two different 3D shapes that each have exactly 5 faces.",
                "triangular prism and square-based pyramid", space=35)

    ws.question("Ella puts 3 cubes of the same size in a row, touching face to face.\n"
                "What is the name of the new 3D shape she has made?",
                "cuboid", figure=solid("cube"), fig_w=60, fig_h=55, space=20)

    ws.question("A cone and a cylinder are standing on a table.\n"
                "Write down one way they are the same and one way they are different.",
                "Same: e.g. both have a flat circular face and a curved surface. "
                "Different: e.g. the cone comes to a point (it has a vertex); the cylinder has two circular faces.",
                space=50)
