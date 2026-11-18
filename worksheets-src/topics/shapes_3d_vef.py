"""3D shapes: vertices, edges, faces"""
from engine.draw import solid

META = {"title": "3D shapes: vertices, edges, faces", "slug": "3d-shapes-vertices-edges-faces"}

# name: (faces, edges, vertices)
FEV = {
    "cube": (6, 12, 8),
    "cuboid": (6, 12, 8),
    "triangular prism": (5, 9, 6),
    "square-based pyramid": (5, 8, 5),
    "triangular-based pyramid": (4, 6, 4),
    "pentagonal prism": (7, 15, 10),
    "hexagonal prism": (8, 18, 12),
    "hexagonal-based pyramid": (7, 12, 7),
}


def build(ws):
    ws.section("Practice")

    names = list(FEV)
    ws.figures("For each shape, write down the number of faces (F), edges (E) and vertices (V).\n"
               "Dashed lines show edges you cannot see.",
               [solid(n) for n in names],
               [f"F = {f}, E = {e}, V = {v}" for f, e, v in FEV.values()], cols=4, fig_h=70)

    ws.parts("Write down the number of... (count a curved surface as a face)", [
        "faces on a cylinder", "edges on a cylinder", "vertices on a cylinder",
        "faces on a cone", "vertices on a cone", "faces on a sphere",
    ], ["3", "2", "0", "2", "1", "1"], cols=3)

    clues = [
        ("I have 6 faces, 12 edges and 8 vertices. All my faces are squares.", "cube"),
        ("I have 5 faces, 8 edges and 5 vertices.", "square-based pyramid"),
        ("I have 5 faces, 9 edges and 6 vertices.", "triangular prism"),
        ("I have 4 faces, 6 edges and 4 vertices. All my faces are triangles.", "triangular-based pyramid (tetrahedron)"),
        ("I have 8 faces, 18 edges and 12 vertices.", "hexagonal prism"),
        ("I have 2 faces, 1 edge and 1 vertex.", "cone"),
    ]
    ws.parts("Which 3D shape am I?", [q for q, _ in clues], [a for _, a in clues], cols=1)

    ws.section("Problem solving")

    ws.question("For many 3D shapes, F + V − E = 2, where F is the number of faces, V the number of "
                "vertices and E the number of edges.\nShow that this is true for a cube.",
                "6 + 8 − 12 = 2", space=40)

    ws.question("A prism has 8 faces.\n(a) What shape is its cross-section?\n"
                "(b) How many edges and vertices does it have?",
                "(a) a hexagon (6 rectangular faces + 2 ends)   (b) 18 edges, 12 vertices", space=45)

    ws.question("A pyramid has 10 edges.\n(a) What shape is its base?\n(b) How many vertices does it have?",
                "(a) a pentagon (5 edges round the base + 5 up to the top)   (b) 6 vertices", space=45)

    ws.question("Two cubes are glued together, face to face.\n"
                "How many faces, edges and vertices does the new shape have?",
                "It is a cuboid: 6 faces, 12 edges, 8 vertices.",
                figure=solid("cuboid"), fig_w=90, fig_h=55, space=10)

    ws.question("A 3D shape has 7 faces and 10 vertices.\n"
                "(a) Use F + V − E = 2 to find the number of edges.\n(b) Name a shape that fits.",
                "(a) 7 + 10 − E = 2, so E = 15   (b) pentagonal prism", space=45)
