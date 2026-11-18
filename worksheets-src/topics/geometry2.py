"""Congruence (2), constructions and loci (16), coordinates (5), enlargements (4).

Construction diagrams are drawn TRUE SIZE: 1 unit = 1 cm when the PDF is
printed at 100% ("actual size"), so pupils can construct on them directly.
"""
import math
from engine.geo import scene
from engine.draw import axes
from topics.area import n

CM = 28.3465          # points in one centimetre


def P(ws, prompt, qa, cols=1, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def cm_fig(items, w_cm, h_cm, pad=14):
    """A true-size figure and the box size it needs (in points)."""
    return scene(items, pad=pad, max_scale=CM), w_cm * CM + 2 * pad + 20, h_cm * CM + 2 * pad


def room(x0, y0, x1, y1):
    """Invisible corners, so the figure keeps empty space for drawing."""
    return [("text", (x0, y0), ""), ("text", (x1, y1), "")]


def con_q(ws, prompt, answer, items, box, space=10):
    fig, w, h = cm_fig(items, *box)
    ws.question(prompt, answer, figure=fig, fig_w=w, fig_h=h, fig_pos="below", space=space)


TRUE_SIZE = "Use a ruler and compasses only. Leave your construction arcs. (Print at 100% so the diagram is true size.)"


def line_AB(L, y=0, extra=()):
    return [("seg", (0, y), (L, y)), ("dot", (0, y)), ("dot", (L, y)), ("label", (0, y), "A", "W"),
            ("label", (L, y), "B", "E")] + list(extra)


# ==========================================================================
# Constructions
# ==========================================================================
def angle_sheet(deg, method, ps):
    def build(ws):
        ws.section("Practice")
        for L in (7, 6):
            con_q(ws, f"Construct an angle of {deg}° at A, on the line AB. {TRUE_SIZE}",
                  f"Check: the angle at A measures {deg}° (±1°). Method: {method}",
                  line_AB(L, extra=room(-0.5, 0, L, 5)), (L + 1, 5))
        ws.section("Problem solving")
        for prompt, ans in ps:
            ws.question(prompt, ans, space=170)
    return build


def bisector(ws):
    ws.section("Practice")
    for t in (70, 110, 46):
        O, A = (0, 0), (6, 0)
        B = (6 * math.cos(math.radians(t)), 6 * math.sin(math.radians(t)))
        items = [("seg", O, A), ("seg", O, B), ("label", O, "O", "SW"), ("label", A, "A", "E"), ("label", B, "B", "N")]
        con_q(ws, f"Construct the bisector of angle AOB. {TRUE_SIZE}",
              f"Check: the bisector splits the {t}° angle into two angles of {n(t / 2)}°.",
              items + room(min(0, B[0]) - 0.5, -0.5, 6.5, B[1] + 0.3), (6.5 - min(0, B[0]), B[1] + 1))
    ws.section("Problem solving")
    ws.question("Use an angle bisector to construct an angle of 45°. Explain your method.",
                "Construct a 90° angle (perpendicular), then bisect it.", space=150)


def perp_bisector(ws):
    ws.section("Practice")
    for L, ang in ((8, 0), (6, 25)):
        B = (L * math.cos(math.radians(ang)), L * math.sin(math.radians(ang)))
        items = [("seg", (0, 0), B), ("label", (0, 0), "A", "W"), ("label", B, "B", "E"), ("dot", (0, 0)), ("dot", B)]
        con_q(ws, f"Construct the perpendicular bisector of AB. {TRUE_SIZE}",
              f"Check: the line crosses AB at 90°, {n(L / 2)} cm from A and from B.",
              items + room(-0.5, -3, B[0] + 0.5, max(B[1], 0) + 3), (B[0] + 1, max(B[1], 0) + 6))
    ws.section("Problem solving")
    ws.question("Explain why every point on the perpendicular bisector of AB is the same distance from A and from B.",
                "Any point on it makes two congruent triangles with A and B (SAS: shared side, right angle, equal halves), "
                "so its distances to A and B are equal.", space=55)


def perp_from_point(ws):
    ws.section("Practice")
    for L, px, py in ((8, 3, 3), (8, 5.5, 2.5)):
        items = line_AB(L) + [("dot", (px, py)), ("label", (px, py), "P", "N")]
        con_q(ws, f"Construct the perpendicular from P to the line AB. {TRUE_SIZE}",
              f"Check: the line from P meets AB at 90°, {n(px)} cm from A. The shortest distance from P to AB is {n(py)} cm.",
              items + room(-0.5, -2.5, L + 0.5, py + 0.8), (L + 1, py + 3.5))
    ws.section("Problem solving")
    ws.question("Explain why the perpendicular from a point to a line gives the shortest distance to the line.",
                "Any other line from P to AB is the hypotenuse of a right-angled triangle, so it is longer.", space=55)


def perp_on_line(ws):
    ws.section("Practice")
    for L, px in ((8, 3), (8, 5)):
        items = line_AB(L) + [("dot", (px, 0)), ("label", (px, 0), "P", "S")]
        con_q(ws, f"Construct the line through P that is perpendicular to AB. {TRUE_SIZE}",
              "Check: the new line passes through P and makes a 90° angle with AB.",
              items + room(-0.5, -1, L + 0.5, 4.5), (L + 1, 5.5))
    ws.section("Problem solving")
    ws.question("Use this construction to draw a square with sides of 5 cm. Explain your method.",
                "Draw a 5 cm side, construct a 90° angle at each end, mark 5 cm up each line and join the tops.", space=170)


def equilateral(ws):
    ws.section("Practice")
    for L in (6, 5):
        con_q(ws, f"Construct an equilateral triangle on the line AB. {TRUE_SIZE}",
              f"Check: all three sides are {L} cm and all three angles are 60°.",
              line_AB(L, extra=room(-0.5, 0, L, L * 0.87 + 0.5)), (L + 1, L * 0.87 + 1))
    ws.section("Problem solving")
    ws.question("Construct an equilateral triangle with sides of 7 cm. Then construct the bisector of one angle "
                "to make an angle of 30°.", "Check: sides 7 cm, angles 60°; the bisector makes two 30° angles.",
                space=210)


def hexagon(ws):
    ws.section("Practice")
    items = [("dot", (0, 0)), ("label", (0, 0), "O", "SE")] + room(-4.5, -4.5, 4.5, 4.5)
    con_q(ws, "(a) Draw a circle with centre O and radius 4 cm.\n(b) Keep your compasses at 4 cm. Step round the "
              "circle to mark 6 points.\n(c) Join the points to make a regular hexagon.",
          "Check: six sides of 4 cm and six angles of 120°.", items, (9, 9))
    ws.section("Problem solving")
    ws.question("Explain why the side of the hexagon is the same as the radius of the circle.",
                "The hexagon is made of 6 equilateral triangles meeting at the centre, so each side equals the radius.",
                space=50)
    ws.question("How could you use your hexagon to construct an equilateral triangle? Try it.",
                "Join every other point of the hexagon.", space=60)


def loci1(ws):
    ws.section("Practice")
    con_q(ws, f"Draw the locus of points that are exactly 3 cm from the point A. {TRUE_SIZE}",
          "a circle with centre A and radius 3 cm",
          [("dot", (0, 0)), ("label", (0, 0), "A", "SE")] + room(-3.5, -3.5, 3.5, 3.5), (7, 7))
    con_q(ws, f"Draw the locus of points that are exactly 2 cm from the line segment AB. {TRUE_SIZE}",
          "two lines parallel to AB, 2 cm away, joined by semicircles of radius 2 cm at A and B (a 'running track' shape)",
          line_AB(5, extra=room(-2.5, -2.5, 7.5, 2.5)), (10, 5))
    ws.section("Problem solving")
    ws.question("A goat is tied to a post with a rope 4 m long. Describe the region the goat can reach.",
                "every point inside a circle with radius 4 m centred on the post", space=50)


def loci2(ws):
    ws.section("Practice")
    items = [("dot", (0, 0)), ("dot", (7, 0)), ("label", (0, 0), "A", "W"), ("label", (7, 0), "B", "E")]
    con_q(ws, f"Draw the locus of points that are the same distance from A as from B. {TRUE_SIZE}",
          "the perpendicular bisector of AB (it crosses AB 3.5 cm from A)", items + room(-0.5, -3, 7.5, 3), (8, 6))
    B = (6 * math.cos(math.radians(55)), 6 * math.sin(math.radians(55)))
    con_q(ws, f"Draw the locus of points that are the same distance from the lines OA and OB. {TRUE_SIZE}",
          "the bisector of angle AOB (two angles of 27.5°)",
          [("seg", (0, 0), (6, 0)), ("seg", (0, 0), B), ("label", (0, 0), "O", "SW"), ("label", (6, 0), "A", "E"),
           ("label", B, "B", "N")] + room(-0.5, -0.5, 6.5, B[1] + 0.3), (7, B[1] + 1))
    ws.section("Problem solving")
    ws.question("Two towns are 10 km apart. A phone mast must be the same distance from both towns.\n"
                "Describe where the mast could go.", "anywhere on the perpendicular bisector of the line joining the towns",
                space=50)


def loci3(ws):
    ws.section("Practice")
    R = [(0, 0), (8, 0), (8, 5), (0, 5)]
    T = (2, 3)
    items = [("poly", R, "nofill"), ("label", (0, 0), "A", "SW"), ("label", (8, 0), "B", "SE"), ("label", (8, 5), "C", "NE"),
             ("label", (0, 5), "D", "NW"), ("dot", T), ("label", T, "T", "NE")]
    con_q(ws, "ABCD is a scale drawing of a garden. 1 cm represents 1 m. There is a tree at T.\n"
              "A bench must be more than 2 m from the tree and closer to AB than to DC.\nShade the region where the "
              "bench could go.",
          "Draw a circle of radius 2 cm round T and the line halfway between AB and DC (2.5 cm up). Shade the part "
          "below that line and outside the circle.", items + room(-0.5, -0.5, 8.5, 5.5), (9, 6))
    items = [("dot", (0, 0)), ("dot", (6, 0)), ("label", (0, 0), "P", "W"), ("label", (6, 0), "Q", "E")]
    con_q(ws, "Shade the region of points that are less than 4 cm from P and closer to Q than to P.",
          "Draw a circle of radius 4 cm about P and the perpendicular bisector of PQ. Shade inside the circle, on Q's "
          "side of the bisector.", items + room(-4.5, -4.5, 6.5, 4.5), (11, 9))
    ws.section("Problem solving")
    ws.question("Treasure is buried less than 3 m from a well W and the same distance from two trees, A and B. "
                "Describe how to find where it could be.",
                "Draw the perpendicular bisector of AB and a circle of radius 3 m about W. The treasure is on the part "
                "of the bisector inside the circle.", space=55)


def tri_sides(ws, kind):
    """ASA / SAS / SSS: give the information and work out the rest for the answer."""
    cases = {
        "ASA": [(7, 50, 60), (6, 40, 75)],
        "SAS": [(7, 5, 55), (6, 8, 40)],
        "SSS": [(7, 5, 6), (8, 6, 5)],
    }[kind]
    ws.section("Practice")
    for k, case in enumerate(cases):
        if kind == "ASA":
            c, A, B = case
            C = 180 - A - B
            a = c * math.sin(math.radians(A)) / math.sin(math.radians(C))
            b = c * math.sin(math.radians(B)) / math.sin(math.radians(C))
            prompt = f"Construct triangle ABC with AB = {c} cm, angle A = {A}° and angle B = {B}°."
            ans = f"Check: angle C = {C}°, AC ≈ {b:.1f} cm, BC ≈ {a:.1f} cm."
        elif kind == "SAS":
            c, b, A = case
            a = math.sqrt(b * b + c * c - 2 * b * c * math.cos(math.radians(A)))
            prompt = f"Construct triangle ABC with AB = {c} cm, AC = {b} cm and angle A = {A}°."
            ans = f"Check: BC ≈ {a:.1f} cm."
        else:
            c, b, a = case
            A = math.degrees(math.acos((b * b + c * c - a * a) / (2 * b * c)))
            prompt = f"Construct triangle ABC with AB = {c} cm, AC = {b} cm and BC = {a} cm. Use compasses for the sides."
            ans = f"Check: angle A ≈ {A:.0f}°."
        con_q(ws, prompt + " Start with AB on the line below.", ans,
              line_AB(case[0], extra=room(-0.5, 0, case[0], 5.5)), (case[0] + 1, 5.8))
    ws.section("Problem solving")
    other = {"ASA": ("Why do you only need two angles and the side between them to fix a triangle?",
                     "The third angle is fixed (180° − the other two), and the side between fixes the size."),
             "SAS": ("Can you draw two different triangles with AB = 6 cm, AC = 4 cm and angle A = 50°? Explain.",
                     "No. Two sides and the angle between them fix exactly one triangle (SAS)."),
             "SSS": ("Try to construct a triangle with sides 3 cm, 4 cm and 8 cm. What happens? Why?",
                     "It can't be done: 3 + 4 is less than 8, so the arcs never meet.")}[kind]
    ws.question(other[0], other[1], space=80)


# ==========================================================================
# Congruence
# ==========================================================================
def congruent_shapes(ws):
    ws.section("Practice")
    base = [(0, 0), (3, 0), (3, 1), (1, 1), (1, 2), (0, 2)]
    def move(pts, dx, dy, rot=0, flip=False):
        out = []
        for x, y in pts:
            if flip:
                x = -x
            for _ in range(rot):
                x, y = -y, x
            out.append((x + dx, y + dy))
        return out
    shapes = {"A": move(base, 1, 1), "B": move(base, 9, 1, rot=1), "C": move(base, 13, 1, flip=True),
              "D": [(x * 1.5 + 1, y * 1.5 + 5) for x, y in base], "E": move(base, 9, 7, rot=2),
              "F": [(12, 5), (15, 5), (15, 6), (13.5, 6), (13.5, 8), (12, 8)]}
    items = [("grid", 0, 16, 0, 10)]
    for k, pts in shapes.items():
        cx = sum(p[0] for p in pts) / len(pts)
        cy = sum(p[1] for p in pts) / len(pts)
        items += [("poly", pts), ("text", (cx, cy), k)]
    ws.question("Which shapes are congruent to shape A?", "B, C and E (B and E are rotations, C is a reflection). "
                "D is an enlargement and F has different side lengths.",
                figure=scene(items, pad=6), fig_w=400, fig_h=250, fig_pos="below", space=0)
    P(ws, "True or false?", [("Congruent shapes are exactly the same shape and size.", "True"),
                             ("A shape and its reflection are congruent.", "True"),
                             ("A shape and its enlargement (scale factor 2) are congruent.", "False"),
                             ("Congruent shapes have equal areas.", "True")], cols=1)
    ws.section("Problem solving")
    ws.question("Two rectangles both have an area of 12 cm^2. Must they be congruent? Explain.",
                "No: e.g. 3 × 4 and 2 × 6 both have area 12 but are different shapes.", space=50)


def congruent_triangles(ws):
    ws.section("Practice")
    P(ws, "Are the two triangles congruent? If they are, give the reason (SSS, SAS, ASA or RHS).", [
        ("Both have sides 5 cm, 7 cm and 9 cm.", "Yes, SSS"),
        ("Both have sides 6 cm and 8 cm with an angle of 40° between them.", "Yes, SAS"),
        ("Both have angles of 50°, 60° and 70°.", "Not necessarily: equal angles only show they are similar"),
        ("Both have a right angle, a hypotenuse of 10 cm and another side of 6 cm.", "Yes, RHS"),
        ("Both have angles of 45° and 75° with a 5 cm side between them.", "Yes, ASA"),
        ("Both have sides 4 cm and 6 cm and a 30° angle that is NOT between them.",
         "Not necessarily (two different triangles are possible)")], cols=1, row_h=30)
    ws.section("Problem solving")
    ws.question("ABCD is a parallelogram. Prove that triangles ABC and CDA are congruent.",
                "AB = CD and BC = DA (opposite sides of a parallelogram), and AC is shared, so they are congruent (SSS).",
                space=70)
    ws.question("PQRS is a kite with PQ = PS and QR = SR. Prove that triangles PQR and PSR are congruent.",
                "PQ = PS, QR = SR and PR is shared, so they are congruent (SSS).", space=60)


# ==========================================================================
# Coordinates
# ==========================================================================
def coords_read(ws):
    ws.section("Practice")
    pts = {"A": (3, 2), "B": (-2, 4), "C": (-4, -3), "D": (2, -5), "E": (0, 3), "F": (-5, 0), "G": (4, -1), "H": (-1, -2)}
    fig = axes(-6, 6, -6, 6, [("point", x, y, k) for k, (x, y) in pts.items()])
    ws.question("Write down the coordinates of the points A to H.",
                ",  ".join(f"{k} ({x}, {y})".replace("-", "−") for k, (x, y) in pts.items()),
                figure=fig, fig_w=210, fig_h=210, space=10)
    ws.question("Plot and label these points on the grid:\nP (4, 1)   Q (−3, 5)   R (−2, −4)   S (0, −6)   T (5, 5)",
                "Check each point: across first (x), then up or down (y).",
                figure=axes(-6, 6, -6, 6), fig_w=210, fig_h=210, space=10)
    ws.section("Problem solving")
    ws.question("A (1, 1), B (5, 1) and C (5, 4) are three corners of a rectangle. Find the fourth corner.",
                "(1, 4)", space=40)
    ws.question("Ben plots (3, −2) by going 3 down and 2 right. Explain his mistake.",
                "The x-coordinate comes first: go 3 right, then 2 down.", space=40)


def coords_shapes(ws):
    ws.section("Practice")
    P(ws, "Three corners of a shape are given. Find the fourth corner.", [
        ("square: (1, 1), (4, 1), (4, 4)", "(1, 4)"), ("rectangle: (−2, 1), (3, 1), (3, 4)", "(−2, 4)"),
        ("parallelogram: (0, 0), (4, 0), (5, 3), with the fourth corner on the left", "(1, 3)"),
        ("square: (2, 0), (4, 2), (2, 4)", "(0, 2)"), ("kite: (0, 3), (2, 0), (0, −5) — symmetrical about the y-axis", "(−2, 0)")])
    ws.question("Plot the points (−3, −2), (3, −2), (5, 2) and (−1, 2). Join them in order.\n"
                "What shape have you drawn?", "a parallelogram",
                figure=axes(-6, 6, -4, 4), fig_w=220, fig_h=160, space=10)
    ws.section("Problem solving")
    ws.question("(2, 1) and (6, 1) are two corners of a square. Find two possible positions for the other two corners.",
                "(2, 5) and (6, 5), or (2, −3) and (6, −3)", space=50)


def coords_3d(ws):
    ws.section("Practice")
    k, ang = 0.5, math.radians(35)
    pr = lambda x, y, z: (x + k * y * math.cos(ang), z + k * y * math.sin(ang))
    L, W, H = 4, 3, 2
    corners = {"O": (0, 0, 0), "A": (L, 0, 0), "B": (L, W, 0), "C": (0, W, 0), "D": (0, 0, H), "E": (L, 0, H),
               "F": (L, W, H), "G": (0, W, H)}
    edges = ["OA", "AB", "BC", "CO", "DE", "EF", "FG", "GD", "OD", "AE", "BF", "CG"]
    hidden = {"BC", "CO", "CG"}
    items = [("ray", pr(0, 0, 0), pr(6, 0, 0)), ("ray", pr(0, 0, 0), pr(0, 5.5, 0)), ("ray", pr(0, 0, 0), pr(0, 0, 3.5)),
             ("label", pr(6, 0, 0), "x", "E"), ("label", pr(0, 5.5, 0), "y", "NE"), ("label", pr(0, 0, 3.5), "z", "N")]
    for e in edges:
        items.append(("seg", pr(*corners[e[0]]), pr(*corners[e[1]]), *(("dashed", "thin") if e in hidden else ())))
    for name, p3 in corners.items():
        items.append(("label", pr(*p3), name, "SW" if name in "OD" else "SE" if name in "AE" else "NE"))
    ws.question(f"The cuboid is {L} units long (x), {W} units deep (y) and {H} units high (z). O is the origin.\n"
                "Write down the coordinates of A, B, C, D, E, F and G.",
                ", ".join(f"{k} ({x}, {y}, {z})" for k, (x, y, z) in corners.items() if k != "O"),
                figure=scene(items, pad=16), fig_w=220, fig_h=170, space=10)
    P(ws, "Answer these about the cuboid above.", [("Which corner is at (4, 3, 0)?", "B"),
                                                  ("Find the midpoint of OF.", "(2, 1.5, 1)"),
                                                  ("Find the length OB (use Pythagoras).", "√(16 + 9) = 5 units")])
    ws.section("Problem solving")
    ws.question("A cube has one corner at (0, 0, 0) and the opposite corner at (5, 5, 5). Find the coordinates of "
                "the other six corners.", "(5,0,0), (0,5,0), (0,0,5), (5,5,0), (5,0,5), (0,5,5)", space=50)


def midpoint(ws):
    ws.section("Practice")
    pairs = [((2, 4), (8, 10)), ((1, 3), (7, 5)), ((-2, 6), (4, 0)), ((-5, -1), (3, 7)), ((0, 0), (9, 4)), ((-3, -4), (-7, 2))]
    def f(p):
        return f"({n(p[0])}, {n(p[1])})".replace("-", "−")
    P(ws, "Find the midpoint of the line joining each pair of points.",
      [(f"{f(a)} and {f(b)}", f(((a[0] + b[0]) / 2, (a[1] + b[1]) / 2))) for a, b in pairs], cols=2)
    ws.question("Find the midpoint of AB.", "(1, 2.5)",
                figure=axes(-5, 5, -2, 6, [("point", -3, 1, "A"), ("point", 5, 4, "B"), ("line", [(-3, 1), (5, 4)])]),
                fig_w=200, fig_h=160, space=10)
    ws.section("Problem solving")
    ws.question("M (4, 5) is the midpoint of AB. A is (1, 2). Find B.", "B = (7, 8)", space=40)
    ws.question("The midpoint of (a, 3) and (7, b) is (5, 6). Find a and b.", "a = 3, b = 9", space=40)


def distance(ws):
    ws.section("Practice")
    pairs = [((1, 2), (4, 6)), ((0, 0), (5, 12)), ((-2, 1), (4, 9)), ((3, -1), (7, 2)), ((-4, -3), (2, 5)), ((1, 1), (4, 3))]
    def f(p):
        return f"({p[0]}, {p[1]})".replace("-", "−")
    def d(a, b):
        v = math.hypot(b[0] - a[0], b[1] - a[1])
        return n(v) if abs(v - round(v)) < 1e-9 else f"{v:.2f}"
    P(ws, "Find the distance between each pair of points. Give answers to 2 d.p. where needed.",
      [(f"{f(a)} and {f(b)}", d(a, b)) for a, b in pairs], cols=2)
    ws.question("Find the length of AB.", "√(6^2 + 8^2) = 10 units",
                figure=axes(-2, 7, -2, 9, [("point", -1, 0, "A"), ("point", 5, 8, "B"), ("line", [(-1, 0), (5, 8)])],
                            label_step=2), fig_w=170, fig_h=190, space=10)
    ws.section("Problem solving")
    ws.question("Show that the triangle with corners (0, 0), (4, 3) and (8, 0) is isosceles.",
                "Both sloping sides are √(16 + 9) = 5 units long.", space=50)
    ws.question("A point (x, 4) is 5 units from (0, 0). Find the two possible values of x.", "x^2 + 16 = 25, x = 3 or −3",
                space=40)


# ==========================================================================
# Enlargements
# ==========================================================================
def enl_fig(shape, centre=None, image=None, rng=(0, 14, 0, 10), labels=()):
    items = [("polygon", shape)]
    if image:
        items.append(("polygon", image))
    if centre:
        items.append(("point", centre[0], centre[1], "C"))
    items += list(labels)
    return axes(*rng, items, label_step=2)


def image_of(shape, c, k):
    return [(c[0] + k * (x - c[0]), c[1] + k * (y - c[1])) for x, y in shape]


def pts_str(pts):
    return ", ".join(f"({n(x)}, {n(y)})".replace("-", "−") for x, y in pts)


def enlargements(ws):
    ws.section("Practice")
    for shape, k in (([(1, 1), (3, 1), (3, 3), (1, 2)], 2), ([(1, 1), (2, 1), (2, 2)], 3)):
        ws.question(f"Enlarge the shape by scale factor {k}. (You can put the enlargement anywhere on the grid.)",
                    f"Check: every side is {k} times as long; e.g. the base becomes {n((shape[1][0] - shape[0][0]) * k)} squares.",
                    figure=enl_fig(shape, rng=(0, 13, 0, 8)), fig_w=260, fig_h=170, fig_pos="below", space=0)
    P(ws, "A shape is enlarged. Find the scale factor.", [("a side of 4 cm becomes 12 cm", "3"),
                                                         ("a side of 6 cm becomes 3 cm", "[[1//2]]"),
                                                         ("a side of 5 cm becomes 12.5 cm", "2.5")], cols=1)
    ws.section("Problem solving")
    ws.question("A rectangle 3 cm by 5 cm is enlarged by scale factor 4. Find the new perimeter and area.\n"
                "How many times bigger is the area?", "12 cm by 20 cm: perimeter 64 cm, area 240 cm^2, 16 times bigger",
                space=55)


def enl_centre(ws):
    ws.section("Practice")
    cases = [([(2, 2), (4, 2), (4, 3)], (1, 1), 2), ([(3, 3), (5, 3), (5, 5), (3, 5)], (2, 2), 3),
             ([(6, 6), (10, 6), (10, 8)], (2, 2), 0.5)]
    for shape, c, k in cases:
        ws.question(f"Enlarge the shape by scale factor {n(k) if k >= 1 else '[[1//2]]'} with centre C "
                    f"({c[0]}, {c[1]}).", f"image corners: {pts_str(image_of(shape, c, k))}",
                    figure=enl_fig(shape, c, rng=(0, 14, 0, 12)), fig_w=260, fig_h=225, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("A point P (5, 3) is enlarged by scale factor 2, centre (1, 1). Find the image of P.",
                "(1 + 2 × 4, 1 + 2 × 2) = (9, 5)", space=45)


def enl_describe(ws):
    ws.section("Practice")
    cases = [([(1, 1), (3, 1), (3, 2)], (0, 0), 2), ([(2, 2), (3, 2), (3, 3), (2, 3)], (1, 1), 3),
             ([(6, 2), (10, 2), (10, 6)], (0, 10), 0.5)]
    for shape, c, k in cases:
        img = image_of(shape, c, k)
        ws.question("Describe fully the single transformation that maps shape A onto shape B.",
                    f"enlargement, scale factor {n(k) if k >= 1 else '[[1//2]]'}, centre ({c[0]}, {c[1]})",
                    figure=enl_fig(shape, image=img, rng=(0, 12, 0, 10),
                                   labels=[("label", sum(p[0] for p in shape) / len(shape), sum(p[1] for p in shape) / len(shape), "A"),
                                           ("label", sum(p[0] for p in img) / len(img), sum(p[1] for p in img) / len(img), "B")]),
                    fig_w=230, fig_h=195, space=5)
    ws.section("Problem solving")
    ws.question("What three things must you give to describe an enlargement fully?",
                "the word enlargement, the scale factor and the centre of enlargement", space=40)


def enl_find_centre(ws):
    ws.section("Practice")
    cases = [([(2, 3), (4, 3), (4, 4)], (1, 2), 3), ([(6, 2), (7, 2), (7, 3), (6, 3)], (8, 1), 3),
             ([(3, 5), (5, 5), (3, 7)], (1, 9), 2)]
    for shape, c, k in cases:
        img = image_of(shape, c, k)
        ws.question("Shape B is an enlargement of shape A. Draw rays through matching corners to find the centre "
                    "of enlargement, and write down the scale factor.",
                    f"centre ({c[0]}, {c[1]}), scale factor {k}",
                    figure=enl_fig(shape, image=img, rng=(0, 13, 0, 12),
                                   labels=[("label", sum(p[0] for p in shape) / len(shape), sum(p[1] for p in shape) / len(shape), "A"),
                                           ("label", sum(p[0] for p in img) / len(img), sum(p[1] for p in img) / len(img), "B")]),
                    fig_w=240, fig_h=220, space=5)
    ws.section("Problem solving")
    ws.question("Explain why lines through matching corners of a shape and its enlargement all meet at one point.",
                "Every point moves directly away from (or towards) the centre, so each ray from the centre passes "
                "through a corner and its image.", space=50)


SHEETS = [
    ({"slug": "constructions-30-degree-angle"}, angle_sheet(30, "construct a 60° angle (equilateral triangle arcs), then bisect it.",
                                                            [("Construct triangle ABC with AB = 8 cm, angle A = 30° and angle B = 90°.",
                                                              "Check: angle C = 60°, BC ≈ 4.6 cm.")])),
    ({"slug": "constructions-45-degree-angle"}, angle_sheet(45, "construct a perpendicular (90°), then bisect it.",
                                                            [("Construct an isosceles right-angled triangle with the two equal sides 6 cm long. "
                                                              "Check the other angles are 45°.", "Check: hypotenuse ≈ 8.5 cm, angles 45° and 45°.")])),
    ({"slug": "constructions-60-degree-angle"}, angle_sheet(60, "with compasses centred on A draw an arc crossing AB, then with the same "
                                                                "radius centred on that crossing, mark the arc; join A to that point.",
                                                            [("Construct an angle of 120° using only a ruler and compasses. Explain your method.",
                                                              "e.g. construct 60° and step the arc round once more, or construct 60° and use "
                                                              "the straight line (180 − 60).")])),
    ({"slug": "constructions-90-degree-angle"}, angle_sheet(90, "construct the perpendicular to AB at A (arcs from A, then from the crossings).",
                                                            [("Construct a rectangle 7 cm by 4 cm using a ruler and compasses only.",
                                                              "Check: right angles at every corner, sides 7 cm and 4 cm, diagonals ≈ 8.1 cm.")])),
    ({"slug": "constructions-angle-bisector"}, bisector),
    ({"slug": "constructions-equilateral-triangles"}, equilateral),
    ({"slug": "constructions-hexagon"}, hexagon),
    ({"slug": "constructions-loci-part-1"}, loci1),
    ({"slug": "constructions-loci-part-2"}, loci2),
    ({"slug": "constructions-loci-part-3"}, loci3),
    ({"slug": "constructions-perpendicular-bisector"}, perp_bisector),
    ({"slug": "constructions-perpendicular-to-point"}, perp_from_point),
    ({"slug": "constructions-perpendicular-point-on-line"}, perp_on_line),
    ({"slug": "constructions-triangles-asa"}, lambda ws: tri_sides(ws, "ASA")),
    ({"slug": "constructions-triangles-sas"}, lambda ws: tri_sides(ws, "SAS")),
    ({"slug": "constructions-triangles-sss"}, lambda ws: tri_sides(ws, "SSS")),
    ({"slug": "congruent-shapes"}, congruent_shapes),
    ({"slug": "congruent-triangles"}, congruent_triangles),
    ({"slug": "coordinates-reading-and-plotting"}, coords_read),
    ({"slug": "coordinates-shapes-on-a-grid"}, coords_shapes),
    ({"slug": "coordinates-3d"}, coords_3d),
    ({"slug": "coordinates-midpoint-of-a-line"}, midpoint),
    ({"slug": "coordinates-distance-between-two-points"}, distance),
    ({"slug": "enlargements"}, enlargements),
    ({"slug": "enlargements-from-a-centre"}, enl_centre),
    ({"slug": "enlargements-describing"}, enl_describe),
    ({"slug": "enlargements-finding-the-centre"}, enl_find_centre),
]
