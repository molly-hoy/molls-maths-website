"""Area: 12 worksheets (see SHEETS at the bottom).
Answers are calculated from the same numbers used to draw each shape."""
import math
from engine.geo import scene
from engine.draw import square_grid

PI = math.pi


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def n(x, dp=1):
    """Tidy number: whole numbers stay whole, otherwise round to dp places."""
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    return f"{x:.{dp}f}"


def cm(x):
    return f"{n(x)} cm"


def shoelace(pts):
    return abs(sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1]
                   for i in range(len(pts)))) / 2


def labelled_poly(pts, sides, extra=()):
    """Polygon (anticlockwise) with side labels: sides[i] labels side i
    (from point i to point i+1), None to leave a side unlabelled."""
    items = [("poly", pts)]
    for i, lab in enumerate(sides):
        if lab:
            items.append(("side", pts[i], pts[(i + 1) % len(pts)], lab))
    return scene(items + list(extra), pad=18)


def rect_fig(w, h, lw=None, lh=None):
    pts = [(0, 0), (w, 0), (w, h), (0, h)]
    return labelled_poly(pts, [lw or cm(w), lh or cm(h), None, None],
                         [("right", (0, 0), (1, 0), (0, 1))])


def tri_fig(b, h, offset, lb=None, lh=None):
    """Triangle with base b and apex above x = offset; dashed height line."""
    A, B, C = (0, 0), (b, 0), (offset, h)
    foot = (offset, 0)
    items = [("seg", C, foot, "dashed", "thin")]
    if 0 <= offset <= b:
        items.append(("right", foot, (b + 1, 0) if offset < b else (-1, 0), C))
    else:
        items += [("seg", B if offset > b else A, foot, "dashed", "thin"), ("right", foot, (0, 0) if offset > b else (b, 0), C)]
    # put the height label on the roomier side of the dashed height line
    items.append(("side", foot, C, lh or cm(h), "on"))
    return labelled_poly([A, B, C], [lb or cm(b), None, None], items)


def circle_fig(r, label, show="radius"):
    O = (0, 0)
    items = [("circle", O, r, "fill"), ("dot", O)]
    if show == "radius":
        items += [("seg", O, (r, 0)), ("side", O, (r, 0), label)]
    else:
        items += [("seg", (-r, 0), (r, 0)), ("side", (-r, 0), (r, 0), label)]
    return scene(items, pad=12)


def sector_fig(r, theta, lr, lt, start=None):
    O = (0, 0)
    a0 = 90 - theta / 2 if start is None else start
    A = (r * math.cos(math.radians(a0)), r * math.sin(math.radians(a0)))
    B = (r * math.cos(math.radians(a0 + theta)), r * math.sin(math.radians(a0 + theta)))
    items = [("sector", O, r, a0, a0 + theta), ("side", O, A, lr)]
    if lt:
        items.append(("angle", O, A, B, lt, *(("reflex",) if theta > 180 else ())))
    items += [("text", (r, r), ""), ("text", (-r, -r * 0.2), "")] if theta > 180 else [("text", (0, -0.1), "")]
    return scene(items, pad=14)


def semi_fig(d, label, quarter=False):
    r = d / 2
    if quarter:
        items = [("sector", (0, 0), d, 0, 90), ("side", (0, d), (0, 0), label), ("right", (0, 0), (1, 0), (0, 1))]
    else:
        items = [("sector", (0, 0), r, 0, 180), ("side", (-r, 0), (r, 0), label)]   # label below the diameter
    return scene(items, pad=14)


# ==========================================================================
def circles_area(ws):
    ws.section("Practice")
    rs = [4, 7, 2.5, 10, 6, 3.2]
    ws.figures("Work out the area of each circle. Give your answers to 1 decimal place.",
               [circle_fig(r, cm(r)) for r in rs], [f"{PI * r * r:.1f} cm^2" for r in rs], cols=3, fig_h=85)
    ds = [8, 12, 5, 20]
    ws.figures("Work out the area of each circle. Give your answers to 1 decimal place.",
               [circle_fig(d / 2, cm(d), "diameter") for d in ds], [f"{PI * d * d / 4:.1f} cm^2" for d in ds],
               cols=4, fig_h=80)
    P(ws, "Work out the area of each circle. Leave your answers in terms of π.", [
        ("radius 3 cm", "9π cm^2"), ("radius 5 cm", "25π cm^2"), ("diameter 14 cm", "49π cm^2"),
        ("radius 6 cm", "36π cm^2"), ("diameter 10 cm", "25π cm^2"), ("radius 1.5 cm", "2.25π cm^2")], cols=3)
    ws.section("Problem solving")
    ws.question("A circle has an area of 50 cm^2. Find its radius, correct to 1 decimal place.",
                f"r = √([[50//π]]) = {math.sqrt(50 / PI):.1f} cm", space=50)
    ws.question("Which has more pizza: one pizza 12 inches across, or two pizzas each 8 inches across?",
                f"one 12-inch: 36π = {36 * PI:.1f} in^2; two 8-inch: 2 × 16π = {32 * PI:.1f} in^2. "
                "The single 12-inch pizza has more.", space=60)
    sq = scene([("poly", [(-5, -5), (5, -5), (5, 5), (-5, 5)]), ("circle", (0, 0), 5), ("side", (-5, -5), (5, -5), "10 cm")],
               pad=14)
    ws.question("A circle fits exactly inside a square of side 10 cm.\nFind the area of the square that is outside the circle.",
                f"100 − 25π = {100 - 25 * PI:.1f} cm^2", figure=sq, fig_w=100, fig_h=95, space=10)


def rectangle(ws):
    ws.section("Practice")
    dims = [(6, 4), (9, 3), (12, 5), (7, 7), (8.5, 4), (15, 2.4)]
    ws.figures("Work out the area of each rectangle.", [rect_fig(w, h) for w, h in dims],
               [f"{n(w * h)} cm^2" for w, h in dims], cols=3, fig_h=75)
    P(ws, "Find the missing length of each rectangle.", [
        ("area 24 cm^2, width 4 cm", "6 cm"), ("area 45 cm^2, width 9 cm", "5 cm"),
        ("area 72 cm^2, width 8 cm", "9 cm"), ("area 3.6 m^2, width 1.2 m", "3 m"),
        ("area 100 cm^2, a square", "10 cm"), ("area 17.5 cm^2, width 2.5 cm", "7 cm")], cols=2)
    P(ws, "Work out the area of each rectangle. Give your answer in the unit shown.", [
        ("2 m by 50 cm, in cm^2", "200 × 50 = 10 000 cm^2"), ("3 cm by 15 mm, in mm^2", "30 × 15 = 450 mm^2"),
        ("4 m by 250 cm, in m^2", "4 × 2.5 = 10 m^2")], cols=1)
    ws.section("Problem solving")
    ws.question("A room is 5 m long and 4 m wide. Carpet costs £12 per m^2.\nHow much does it cost to carpet the room?",
                "area = 20 m^2, cost = 20 × 12 = £240", space=50)
    ws.question("A square has an area of 49 cm^2. Find its perimeter.", "side = 7 cm, perimeter = 28 cm", space=40)
    ws.question("Write down the length and width of every rectangle with whole-number sides and an area of 24 cm^2.",
                "1 × 24, 2 × 12, 3 × 8, 4 × 6", space=45)


def triangle(ws):
    ws.section("Practice")
    tris = [(8, 5, 3), (10, 6, 7), (7, 4, 0), (12, 9, 4), (6.5, 4, 5), (9, 7, 11)]
    ws.figures("Work out the area of each triangle.", [tri_fig(b, h, o) for b, h, o in tris],
               [f"{n(b * h / 2)} cm^2" for b, h, _ in tris], cols=3, fig_h=100)
    P(ws, "Find the missing length.", [
        ("area 30 cm^2, base 10 cm. Find the height.", "6 cm"), ("area 24 cm^2, height 8 cm. Find the base.", "6 cm"),
        ("area 17.5 cm^2, base 5 cm. Find the height.", "7 cm"), ("area 60 cm^2, height 12 cm. Find the base.", "10 cm")],
      cols=2)
    ws.section("Problem solving")
    ws.question("Explain why the area of a triangle is half of base × height.",
                "Two copies of the triangle fit together to make a parallelogram with the same base and height, "
                "whose area is base × height.", space=45)
    ws.question("A right-angled triangle has sides of 6 cm, 8 cm and 10 cm. Find its area.",
                "The two shorter sides are at right angles: [[1//2]] × 6 × 8 = 24 cm^2", space=45)
    ws.question("A triangle and a square have the same area. The square has sides of 6 cm. "
                "The triangle has a base of 9 cm. Find the height of the triangle.",
                "area = 36 cm^2, so [[1//2]] × 9 × h = 36, h = 8 cm", space=50)


def parallelogram(ws):
    ws.section("Practice")
    shapes = [(8, 5, 2), (12, 4, 3), (7, 6, -2), (9.5, 3, 2.5)]
    figs = []
    for b, h, sh in shapes:
        slant = round(math.hypot(sh, h), 1)          # the real slanted side, as a distractor
        pts = [(0, 0), (b, 0), (b + sh, h), (sh, h)]
        foot = (max(sh, 0) + 0.0001 if sh >= 0 else b + sh, 0)
        top = (foot[0], h)
        extra = [("seg", top, foot, "dashed", "thin"),
                 ("side", top, foot, cm(h), "on"),
                 ("right", foot, (b, 0), top)]
        figs.append(labelled_poly(pts, [cm(b), None, None, f"{n(slant)} cm"], extra))
    ws.figures("Work out the area of each parallelogram. (Be careful: not every length is needed.)", figs,
               [f"{n(b * h)} cm^2" for b, h, _ in shapes], cols=2, fig_h=90)
    P(ws, "Find the missing length of each parallelogram.", [
        ("area 48 cm^2, base 8 cm. Find the height.", "6 cm"), ("area 35 cm^2, height 5 cm. Find the base.", "7 cm"),
        ("area 22.5 cm^2, base 9 cm. Find the height.", "2.5 cm")], cols=1)
    ws.section("Problem solving")
    ws.question("A parallelogram and a rectangle both have a base of 10 cm and a height of 4 cm. "
                "Show that they have the same area.", "both are 10 × 4 = 40 cm^2", space=40)
    ws.question("Mia says the area of a parallelogram with sides 6 cm and 9 cm is 54 cm^2.\nExplain her mistake.",
                "She multiplied the sides. You need the base × the perpendicular height, and the slanted side is "
                "not the height (unless the shape is a rectangle).", space=50)


def trapezium(ws):
    ws.section("Practice")
    ts = [(5, 9, 4), (6, 10, 5), (3, 7, 6), (8, 12, 7), (4.5, 7.5, 3), (10, 14, 2.5)]
    figs = []
    for a, b, h in ts:
        off = (b - a) / 2 - 0.4
        pts = [(0, 0), (b, 0), (off + a, h), (off, h)]
        extra = [("seg", (off, h), (off, 0), "dashed", "thin"), ("side", (off, h), (off, 0), cm(h), "on"),
                 ("arrows", (0, 0), (b, 0), 1), ("arrows", (off, h), (off + a, h), 1)]
        figs.append(labelled_poly(pts, [cm(b), None, cm(a), None], extra))
    ws.figures("Work out the area of each trapezium.", figs, [f"{n((a + b) / 2 * h)} cm^2" for a, b, h in ts],
               cols=3, fig_h=85)
    P(ws, "Find the missing length of each trapezium.", [
        ("parallel sides 6 cm and 10 cm, area 40 cm^2. Find the height.", "5 cm"),
        ("parallel sides 4 cm and x cm, height 6 cm, area 39 cm^2. Find x.", "9 cm")], cols=1)
    ws.section("Problem solving")
    ws.question("A garden bed is a trapezium with parallel sides of 3 m and 5 m, 2 m apart. "
                "A bag of compost covers 1.5 m^2. How many bags are needed?",
                "area = 8 m^2, 8 ÷ 1.5 = 5.33..., so 6 bags", space=55)
    ws.question("Show that a trapezium with parallel sides a and b and height h has area [[1//2]](a + b)h.",
                "Two copies, one turned round, make a parallelogram with base (a + b) and height h. "
                "Half of that is [[1//2]](a + b)h.", space=55)


def on_a_grid(ws):
    ws.section("Practice")
    shapes = [[(1, 1), (5, 1), (5, 4), (1, 4)], [(1, 1), (5, 1), (1, 5)], [(1, 1), (4, 1), (5, 4), (2, 4)],
              [(1, 1), (6, 1), (4, 4), (2, 4)], [(1, 1), (3, 1), (3, 2), (5, 2), (5, 4), (1, 4)],
              [(2, 1), (5, 3), (2, 5)]]
    ws.figures("Each square on the grid is 1 cm^2. Find the area of each shape.",
               [square_grid(6, 6, shapes=[s]) for s in shapes], [f"{n(shoelace(s))} cm^2" for s in shapes],
               cols=3, fig_h=95)
    ws.question("Draw three different rectangles on the grid that each have an area of 12 cm^2.",
                "1 × 12, 2 × 6 and 3 × 4 (check the drawings)",
                figure=square_grid(18, 8), fig_w=380, fig_h=170, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("Draw a triangle with an area of 6 cm^2 on the grid.", "e.g. base 4 cm, height 3 cm",
                figure=square_grid(10, 6), fig_w=200, fig_h=120, space=0)
    ws.question("Explain how you can find the area of a right-angled triangle on a grid without counting squares.",
                "Draw the rectangle around it: the triangle is exactly half of that rectangle.", space=40)


def l_shape(ws):
    ws.section("Practice")
    shapes = [(10, 8, 4, 3), (12, 9, 5, 4), (7, 6, 3, 2), (15, 10, 6, 4)]
    figs, ans = [], []
    for W, H, a, b in shapes:      # a = width of the upright, b = height of the foot
        pts = [(0, 0), (W, 0), (W, b), (a, b), (a, H), (0, H)]
        figs.append(labelled_poly(pts, [cm(W), cm(b), cm(W - a), cm(H - b), cm(a), cm(H)]))
        ans.append(f"{n(shoelace(pts))} cm^2")
    ws.figures("Work out the area of each shape. All corners are right angles.", figs, ans, cols=2, fig_h=110)
    shapes = [(11, 9, 4, 3), (14, 8, 5, 2)]
    figs, ans = [], []
    for W, H, a, b in shapes:
        pts = [(0, 0), (W, 0), (W, b), (a, b), (a, H), (0, H)]
        figs.append(labelled_poly(pts, [cm(W), cm(b), None, None, cm(a), cm(H)]))
        ans.append(f"missing sides {cm(W - a)} and {cm(H - b)}; area {n(shoelace(pts))} cm^2")
    ws.figures("Find the missing lengths, then the area. All corners are right angles.", figs, ans, cols=2, fig_h=110)
    ws.section("Problem solving")
    ws.question("Sam splits an L-shape into two rectangles one way. Ali splits it the other way.\n"
                "Will they get the same area? Explain.", "Yes: the shape is the same, so the total area is the same.",
                space=40)
    ws.question("An L-shaped room is made from a 6 m by 5 m rectangle with a 2 m by 3 m rectangle removed "
                "from one corner. Flooring costs £25 per m^2. Find the cost of flooring the room.",
                "area = 30 − 6 = 24 m^2, cost = £600", space=55)


def compound(ws):
    ws.section("Practice")
    house = [(0, 0), (8, 0), (8, 5), (4, 8), (0, 5)]
    tshape = [(3, 0), (6, 0), (6, 6), (9, 6), (9, 8), (0, 8), (0, 6), (3, 6)]
    step = [(0, 0), (9, 0), (9, 7), (6, 7), (6, 3), (3, 3), (3, 7), (0, 7)]      # a U shape
    figs = [labelled_poly(house, ["8 cm", "5 cm", None, None, None],
                          [("seg", (0, 5), (8, 5), "dashed", "thin"), ("seg", (4, 8), (4, 5), "dashed", "thin"),
                           ("side", (4, 8), (4, 5), "3 cm", "on")]),
            labelled_poly(tshape, ["3 cm", "6 cm", "3 cm", "2 cm", "9 cm", None, None, None]),
            labelled_poly(step, ["9 cm", "7 cm", "3 cm", "4 cm", "3 cm", None, "3 cm", None])]
    ans = [f"{n(shoelace(house))} cm^2", f"{n(shoelace(tshape))} cm^2", f"{n(shoelace(step))} cm^2"]
    ws.figures("Work out the area of each compound shape.", figs, ans, cols=3, fig_h=115)
    r = 3
    semi = scene([("poly", [(0, 0), (8, 0), (8, 6), (0, 6)]), ("sector", (8, 3), 3, -90, 90),
                  ("side", (0, 0), (8, 0), "8 cm"), ("side", (0, 6), (0, 0), "6 cm")], pad=16)
    trap_tri = labelled_poly([(0, 0), (10, 0), (10, 4), (0, 4)], ["10 cm", "4 cm", None, None],
                             [("poly", [(0, 4), (10, 4), (5, 7)]), ("side", (10, 4), (5, 7), ""),
                              ("seg", (5, 7), (5, 4), "dashed", "thin"), ("side", (5, 7), (5, 4), "3 cm", "on")])
    ws.figures("Work out the area of each shape. Give answers to 1 decimal place where needed.", [semi, trap_tri],
               [f"48 + [[1//2]]π × 3^2 = {48 + PI * 9 / 2:.1f} cm^2", "40 + 15 = 55 cm^2"], cols=2, fig_h=110)
    ws.section("Problem solving")
    ws.question("A rectangular lawn 12 m by 8 m has a square flower bed of side 3 m in the middle.\n"
                "Find the area of the grass.", "96 − 9 = 87 m^2", space=45)
    ws.question("A shape is made from a square of side 6 cm with an isosceles triangle on top. "
                "The total height of the shape is 10 cm. Find the area of the shape.",
                "36 + [[1//2]] × 6 × 4 = 48 cm^2", space=55)


def hexagon(ws):
    ws.section("Practice")
    ss = [4, 6, 10, 2.5]
    figs = []
    for s in ss:
        pts = [(s * math.cos(math.radians(60 * k)), s * math.sin(math.radians(60 * k))) for k in range(6)]
        items = [("poly", pts)] + [("seg", (0, 0), p, "thin") for p in pts] + [("side", pts[4], pts[5], cm(s))]
        figs.append(scene(items, pad=16))
    ws.figures("Each regular hexagon is made of 6 equilateral triangles. Find the area of each hexagon "
               "to 1 decimal place.", figs, [f"{1.5 * math.sqrt(3) * s * s:.1f} cm^2" for s in ss], cols=4, fig_h=85)
    P(ws, "An equilateral triangle has sides of 6 cm.", [
        ("Use Pythagoras to find its height.", "√(36 − 9) = √27 = 5.20 cm (2 d.p.)"),
        ("Find its area.", f"[[1//2]] × 6 × 5.196 = {9 * math.sqrt(3):.2f} cm^2"),
        ("Find the area of a regular hexagon with sides of 6 cm.", f"6 × {9 * math.sqrt(3):.2f} = {54 * math.sqrt(3):.1f} cm^2")],
      cols=1)
    ws.section("Problem solving")
    ws.question("Show that the area of a regular hexagon with side s is [[3√3//2]]s^2.",
                "Each triangle has height [[√3//2]]s, so area [[√3//4]]s^2. Six of them: [[6√3//4]]s^2 = [[3√3//2]]s^2.",
                space=60)
    ws.question("A regular hexagonal tile has sides of 10 cm. How many tiles are needed to cover 1 m^2? "
                "(Assume no gaps.)", f"one tile = {150 * math.sqrt(3):.1f} cm^2; 10 000 ÷ {150 * math.sqrt(3):.1f} "
                f"= {10000 / (150 * math.sqrt(3)):.1f}, so 39 tiles", space=60)


def sector(ws):
    ws.section("Practice")
    ss = [(6, 60), (10, 90), (5, 120), (8, 45), (7, 200), (12, 30)]
    ws.figures("Work out the area of each sector. Give your answers to 1 decimal place.",
               [sector_fig(r, t, cm(r), f"{t}°") for r, t in ss],
               [f"{t / 360 * PI * r * r:.1f} cm^2" for r, t in ss], cols=3, fig_h=95)
    P(ws, "Work out the area of each sector. Leave your answers in terms of π.", [
        ("radius 6 cm, angle 90°", "9π cm^2"), ("radius 4 cm, angle 45°", "2π cm^2"),
        ("radius 9 cm, angle 120°", "27π cm^2"), ("radius 10 cm, angle 36°", "10π cm^2")], cols=2)
    ws.section("Problem solving")
    ws.question("A sector has radius 8 cm and area 32π cm^2. Find the angle of the sector.",
                "[[θ//360]] × 64π = 32π, so θ = 180°", space=50)
    ws.question("A sector has an angle of 72° and an area of 20 cm^2. Find its radius to 1 decimal place.",
                f"[[72//360]]πr^2 = 20, so r^2 = [[100//π]], r = {math.sqrt(100 / PI):.1f} cm", space=55)
    ws.question("A pizza with radius 15 cm is cut into 8 equal slices. Find the area of one slice to 1 d.p.",
                f"{PI * 225 / 8:.1f} cm^2", space=40)


def semi_circle(ws):
    ws.section("Practice")
    ds = [10, 12, 7, 16]
    ws.figures("Work out the area of each semicircle. Give your answers to 1 decimal place.",
               [semi_fig(d, cm(d)) for d in ds], [f"{PI * d * d / 8:.1f} cm^2" for d in ds], cols=4, fig_h=80)
    P(ws, "Work out the area of each semicircle. Leave your answers in terms of π.", [
        ("diameter 8 cm", "8π cm^2"), ("radius 6 cm", "18π cm^2"), ("diameter 20 cm", "50π cm^2"), ("radius 3 cm", "4.5π cm^2")],
      cols=4)
    ws.section("Problem solving")
    fig = scene([("poly", [(0, 0), (10, 0), (10, 6), (0, 6)]), ("sector", (5, 6), 5, 0, 180),
                 ("side", (0, 0), (10, 0), "10 cm"), ("side", (10, 0), (10, 6), "6 cm")], pad=16)
    ws.question("This shape is a rectangle with a semicircle on top. Find its area to 1 decimal place.",
                f"60 + [[1//2]]π × 25 = {60 + 12.5 * PI:.1f} cm^2", figure=fig, fig_w=120, fig_h=105, space=10)
    ws.question("A semicircle has an area of 100 cm^2. Find its diameter to 1 decimal place.",
                f"[[1//2]]πr^2 = 100, r = {math.sqrt(200 / PI):.2f}, d = {2 * math.sqrt(200 / PI):.1f} cm", space=50)


def quarter_circle(ws):
    ws.section("Practice")
    rs = [4, 10, 7, 2.5]
    ws.figures("Work out the area of each quarter circle. Give your answers to 1 decimal place.",
               [semi_fig(r, cm(r), quarter=True) for r in rs], [f"{PI * r * r / 4:.1f} cm^2" for r in rs],
               cols=4, fig_h=95)
    P(ws, "Work out the area of each quarter circle in terms of π.", [
        ("radius 6 cm", "9π cm^2"), ("radius 10 cm", "25π cm^2"), ("radius 2 cm", "π cm^2"), ("radius 12 cm", "36π cm^2")],
      cols=4)
    ws.section("Problem solving")
    fig = scene([("poly", [(0, 0), (8, 0), (8, 8), (0, 8)]), ("sector", (0, 0), 8, 0, 90),
                 ("side", (0, 0), (8, 0), "8 cm")], pad=16)
    ws.question("A quarter circle is drawn inside a square of side 8 cm, as shown.\n"
                "Find the area of the square outside the quarter circle, to 1 d.p.",
                f"64 − 16π = {64 - 16 * PI:.1f} cm^2", figure=fig, fig_w=100, fig_h=95, space=10)
    ws.question("A quarter circle has an area of 4π cm^2. Find its radius.", "[[1//4]]πr^2 = 4π, r^2 = 16, r = 4 cm",
                space=45)


SHEETS = [
    ({"slug": "circles-area"}, circles_area),
    ({"slug": "area-rectangle"}, rectangle),
    ({"slug": "area-triangle"}, triangle),
    ({"slug": "area-parallelogram"}, parallelogram),
    ({"slug": "area-trapezium"}, trapezium),
    ({"slug": "area-on-a-grid"}, on_a_grid),
    ({"slug": "area-l-shape"}, l_shape),
    ({"slug": "area-compound-shapes"}, compound),
    ({"slug": "area-regular-hexagon"}, hexagon),
    ({"slug": "area-sector"}, sector),
    ({"slug": "area-semi-circle"}, semi_circle),
    ({"slug": "area-quarter-circle"}, quarter_circle),
]
