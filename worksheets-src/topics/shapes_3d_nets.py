"""3D shapes: nets"""
import math
from engine.draw import cells_net, net_circles, square_grid

META = {"title": "3D shapes: nets", "slug": "3d-shapes-nets"}

H = math.sqrt(3) / 2   # height of an equilateral triangle with side 1

CROSS = [(1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)]           # valid cube net
LONG_ENDS = [(0, 0), (0, 1), (1, 1), (2, 1), (3, 1), (3, 2)]       # valid
STAIRS = [(0, 0), (1, 0), (1, 1), (2, 1), (2, 2), (3, 2)]          # valid
TWO_THREES = [(0, 0), (1, 0), (2, 0), (2, 1), (3, 1), (4, 1)]      # valid
BLOCK = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)]           # not a net
SAME_SIDE = [(0, 1), (1, 1), (2, 1), (3, 1), (0, 0), (1, 0)]       # not a net (flaps overlap)
FIVE_ROW = [(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 1)]        # not a net


def rect(x0, y0, x1, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


CUBOID_NET = cells_net([], extra=[rect(0, 1, 1, 2), rect(1, 1, 3, 2), rect(3, 1, 4, 2), rect(4, 1, 6, 2),
                                   rect(1, 2, 3, 3), rect(1, 0, 3, 1)])
PRISM_NET = cells_net([], extra=[rect(0, 0, 1, 2.6), rect(1, 0, 2, 2.6), rect(2, 0, 3, 2.6),
                                  [(1, 2.6), (2, 2.6), (1.5, 2.6 + H)], [(1, 0), (2, 0), (1.5, -H)]])
PYRAMID_NET = cells_net([(0, 0)], extra=[[(0, 1), (1, 1), (0.5, 1.9)], [(0, 0), (1, 0), (0.5, -0.9)],
                                          [(0, 0), (0, 1), (-0.9, 0.5)], [(1, 0), (1, 1), (1.9, 0.5)]])
TETRA_NET = cells_net([], extra=[[(0, 0), (1, 0), (0.5, H)], [(1, 0), (2, 0), (1.5, H)],
                                  [(0.5, H), (1.5, H), (1, 2 * H)], [(1, 0), (1.5, H), (0.5, H)]])
CYLINDER_NET = net_circles(rect(0, 0, 3.14, 1.7), [(1.57, 2.2, 0.5), (1.57, -0.5, 0.5)])


def build(ws):
    ws.section("Practice")

    ws.figures("Each diagram is the net of a 3D shape. Write down the name of the 3D shape it makes.",
               [cells_net(CROSS), CUBOID_NET, PRISM_NET, PYRAMID_NET, TETRA_NET, CYLINDER_NET],
               ["cube", "cuboid", "triangular prism", "square-based pyramid",
                "triangular-based pyramid (tetrahedron)", "cylinder"],
               cols=3, fig_h=92)

    nets = [CROSS, BLOCK, LONG_ENDS, SAME_SIDE, STAIRS, FIVE_ROW]
    ws.figures("Will each net fold to make a cube? Write Yes or No.",
               [cells_net(n) for n in nets], ["Yes", "No", "Yes", "No", "Yes", "No"],
               cols=3, fig_h=72)

    ws.question("A cuboid measures 5 cm by 3 cm by 2 cm.\n"
                "Draw a net of the cuboid on the grid. Each square is 1 cm by 1 cm.",
                "Check the net has 6 rectangles: two 5 × 3, two 5 × 2 and two 3 × 2, "
                "joined so that it folds into the cuboid. (There are several correct nets.)",
                figure=square_grid(18, 9), fig_w=380, fig_h=172, fig_pos="below", space=0)

    ws.section("Problem solving")

    ws.question("This net is folded to make a cube.\n"
                "(a) Which face will be opposite face A?\n"
                "(b) Which face will be opposite face E?",
                "(a) D   (b) F",
                figure=cells_net(CROSS, labels={(1, 1): "A", (0, 1): "B", (2, 1): "C", (3, 1): "D",
                                                (1, 2): "E", (1, 0): "F"}),
                fig_w=115, fig_h=84, space=4)

    ws.question("On a dice, the numbers on opposite faces add up to 7.\n"
                "This is the net of a dice. Write the missing numbers 4, 5 and 6 in the right squares.",
                "The 6 goes opposite the 1 (the square at the end of the row), the 5 goes opposite "
                "the 2 (two squares along from it), and the 4 goes opposite the 3 (the square at the bottom).",
                figure=cells_net(CROSS, labels={(1, 1): "1", (0, 1): "2", (1, 2): "3"}),
                fig_w=115, fig_h=84, space=4)

    ws.question('Sanjay says, "This net will fold to make a cube."\nIs Sanjay correct? Explain your answer.',
                "No. When it is folded, the two squares under the row both fold onto the same face, "
                "so they overlap and one face of the cube is left open.",
                figure=cells_net(SAME_SIDE), fig_w=110, fig_h=62, space=30)

    ws.question("This is the net of a square-based pyramid.\n"
                "When it is folded, how many faces, edges and vertices will the pyramid have?",
                "5 faces, 8 edges, 5 vertices",
                figure=PYRAMID_NET, fig_w=90, fig_h=78, space=4)
