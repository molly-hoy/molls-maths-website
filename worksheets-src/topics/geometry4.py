"""Geometry and measures: 53 worksheets (see SHEETS at the bottom).
Diagram labels and answers come from the same numbers."""
import math
from engine.geo import scene
from engine.draw import axes, solid, square_grid
from engine.charts import chart
from topics.area import n, cm, labelled_poly, shoelace

PI = math.pi
R = math.radians


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def d1(x):
    return f"{x:.1f}"


def tri(a, b, c_pt):
    return [a, b, c_pt]


# --------------------------------------------------------------------------
# Labelled 3D shapes (oblique projection, like the 3D shape sheets)
# --------------------------------------------------------------------------
K, ANG = 0.5, R(35)


def pj(x, y, z):
    """x across, y up, z depth."""
    return (x + K * z * math.cos(ANG), y + K * z * math.sin(ANG))


def cuboid_fig(l, h, d, labels=None):
    lab = labels or (cm(l), cm(h), cm(d))
    v = {k: pj(*p) for k, p in {"a": (0, 0, 0), "b": (l, 0, 0), "c": (l, h, 0), "e": (0, h, 0), "f": (l, 0, d),
                                "g": (l, h, d), "k": (0, h, d), "o": (0, 0, d)}.items()}
    items = [("poly", [v["a"], v["b"], v["c"], v["e"]]), ("poly", [v["b"], v["f"], v["g"], v["c"]]),
             ("poly", [v["e"], v["c"], v["g"], v["k"]]), ("seg", v["a"], v["o"], "dashed", "thin"),
             ("seg", v["o"], v["f"], "dashed", "thin"), ("seg", v["o"], v["k"], "dashed", "thin"),
             ("side", v["a"], v["b"], lab[0]), ("side", v["b"], v["c"], lab[1]), ("side", v["b"], v["f"], lab[2])]
    return scene(items, pad=18)


def prism_fig(base, length, labels, length_label):
    """Prism with cross-section `base` (anticlockwise points (x, y)) on the
    front face and depth going back. A side face can be seen when it faces
    the viewer; edges touching only hidden faces are drawn dashed."""
    front = [pj(x, y, 0) for x, y in base]
    back = [pj(x, y, length) for x, y in base]
    nb = len(base)
    cx, sx = math.cos(ANG), math.sin(ANG)
    vis = []
    for i in range(nb):
        (x0, y0), (x1, y1) = base[i], base[(i + 1) % nb]
        nx, ny = y1 - y0, -(x1 - x0)                     # outward normal of side i
        vis.append(cx * nx + sx * ny > 1e-9)
    items = [("poly", front)]
    for i in range(nb):
        if vis[i]:
            items.append(("poly", [front[i], front[(i + 1) % nb], back[(i + 1) % nb], back[i]]))
    for i in range(nb):
        style = () if vis[i] else ("dashed", "thin")
        items.append(("seg", back[i], back[(i + 1) % nb], *style))
        lat = () if (vis[i] or vis[i - 1]) else ("dashed", "thin")
        items.append(("seg", front[i], back[i], *lat))
    items.append(("poly", front))                       # front face on top
    for i, lab in enumerate(labels):
        if lab:
            items.append(("side", front[i], front[(i + 1) % nb], lab))
    k = next(i for i in range(nb) if vis[i])            # label the length on a visible edge
    items.append(("side", front[k], back[k], length_label))
    return scene(items, pad=18)


def l_prism_fig(W, H, a, b, depth):
    base = [(0, 0), (W, 0), (W, b), (a, b), (a, H), (0, H)]
    labels = [cm(W), cm(b), None, cm(H - b), cm(a), cm(H)]
    return prism_fig(base, depth, labels, cm(depth))


# ==========================================================================
# Perimeter
# ==========================================================================
def perimeter(ws):
    ws.section("Practice")
    shapes = [([(0, 0), (8, 0), (8, 5), (0, 5)], ["8 cm", "5 cm", None, None]),
              ([(0, 0), (6, 0), (3, 5)], ["6 cm", "5.8 cm", "5.8 cm"]),
              ([(0, 0), (10, 0), (10, 4), (6, 4), (6, 8), (0, 8)], ["10 cm", "4 cm", "4 cm", "4 cm", "6 cm", "8 cm"]),
              ([(0, 0), (9, 0), (7, 4), (2, 4)], ["9 cm", "4.5 cm", "5 cm", "4.5 cm"])]
    def per(labels):
        return n(sum(float(l.split()[0]) for l in labels if l))
    figs = [labelled_poly(p, l) for p, l in shapes]
    ans = ["26 cm", "17.6 cm", "36 cm", "23 cm"]
    ws.figures("Work out the perimeter of each shape.", figs, ans, cols=2, fig_h=100)
    P(ws, "Work out the perimeter of", [("a square with sides of 7 cm", "28 cm"), ("a rectangle 12 m by 4.5 m", "33 m"),
                                        ("a regular hexagon with sides of 5 cm", "30 cm"),
                                        ("an equilateral triangle with sides of 9.5 cm", "28.5 cm")], cols=2)
    ws.section("Problem solving")
    ws.question("A square has a perimeter of 36 cm. Find its area.", "side 9 cm, area 81 cm^2", space=35)
    ws.question("A rectangle has a perimeter of 30 cm and a length of 9 cm. Find its width.", "6 cm", space=35)


def perimeter_grid(ws):
    ws.section("Practice")
    shapes = [[(1, 1), (5, 1), (5, 4), (1, 4)], [(1, 1), (3, 1), (3, 3), (5, 3), (5, 5), (1, 5)],
              [(1, 1), (6, 1), (6, 2), (2, 2), (2, 4), (1, 4)], [(2, 1), (4, 1), (4, 2), (5, 2), (5, 4), (1, 4), (1, 2), (2, 2)]]
    def per(p):
        return sum(abs(p[i][0] - p[(i + 1) % len(p)][0]) + abs(p[i][1] - p[(i + 1) % len(p)][1]) for i in range(len(p)))
    ws.figures("Each square is 1 cm by 1 cm. Find the perimeter of each shape.",
               [square_grid(7, 6, shapes=[s]) for s in shapes], [f"{per(s)} cm" for s in shapes], cols=4, fig_h=95)
    ws.question("Draw two different rectangles with a perimeter of 12 cm.", "e.g. 1 × 5, 2 × 4 (or 3 × 3)",
                figure=square_grid(16, 7), fig_w=330, fig_h=145, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("Can two shapes have the same area but different perimeters? Give an example.",
                "Yes: 1 × 4 and 2 × 2 both have area 4 cm^2 but perimeters 10 cm and 8 cm.", space=45)


# ==========================================================================
# Pythagoras
# ==========================================================================
def rt_fig(a, b, la, lb, lc):
    """Right-angled triangle with legs a (across) and b (up)."""
    A, B, C = (0, 0), (a, 0), (0, b)
    return scene([("poly", [A, B, C]), ("right", A, B, C), ("side", A, B, la), ("side", B, C, lc), ("side", C, A, lb)], pad=18)


def pyth_sides(ws):
    ws.section("Practice")
    hyp = [(3, 4), (6, 8), (5, 12), (7, 9), (4.5, 6), (10, 3)]
    ws.figures("Find the length of the hypotenuse, x. Give answers to 1 d.p. where needed.",
               [rt_fig(a, b, cm(a), cm(b), "x") for a, b in hyp], [f"{n(math.hypot(a, b), 1)} cm" for a, b in hyp], cols=3,
               fig_h=85)
    short = [(10, 6), (13, 5), (15, 9), (12, 7)]
    ws.figures("Find the length of the shorter side, x, to 1 d.p. where needed.",
               [rt_fig(math.sqrt(c * c - a * a), a, "x", cm(a), cm(c)) for c, a in short],
               [f"{n(math.sqrt(c * c - a * a), 1)} cm" for c, a in short], cols=4, fig_h=85)
    ws.section("Problem solving")
    ws.question("A ladder 5 m long leans against a wall. Its foot is 1.5 m from the wall. How high up the wall does it reach?",
                f"√(25 − 2.25) = {math.sqrt(22.75):.2f} m", space=50)
    ws.question("A TV screen is 80 cm wide and 45 cm high. Find the length of its diagonal.", f"{math.hypot(80, 45):.1f} cm",
                space=40)


def pyth_graph(ws):
    ws.section("Practice")
    pairs = [((1, 1), (4, 5)), ((-2, 1), (4, 9)), ((0, 3), (5, -2)), ((-3, -4), (2, 8))]
    def f(p):
        return f"({p[0]}, {p[1]})".replace("-", "−")
    ws.question("Find the length of AB.", "√(6^2 + 8^2) = 10",
                figure=axes(-1, 8, -1, 9, [("point", 1, 1, "A"), ("point", 7, 9, "B"), ("line", [(1, 1), (7, 9)])], label_step=2),
                fig_w=170, fig_h=180, space=10)
    P(ws, "Find the distance between the points. Give answers to 1 d.p. where needed.",
      [(f"{f(a)} and {f(b)}", n(math.hypot(b[0] - a[0], b[1] - a[1]), 1)) for a, b in pairs], cols=2)
    ws.section("Problem solving")
    ws.question("Show that A (0, 0), B (3, 4) and C (6, 0) make an isosceles triangle.", "AB = BC = 5", space=40)


def pyth_3d(ws):
    ws.section("Practice")
    boxes = [(4, 3, 12), (6, 2, 3), (5, 5, 5), (10, 4, 8)]
    ws.figures("Find the length of the longest diagonal of each cuboid (to 1 d.p.).", [cuboid_fig(l, h, d) for l, h, d in boxes],
               [f"√({l}^2 + {h}^2 + {d}^2) = {math.sqrt(l * l + h * h + d * d):.1f} cm" for l, h, d in boxes], cols=2, fig_h=100)
    ws.section("Problem solving")
    ws.question("Will a 30 cm pencil fit in a box 20 cm by 15 cm by 12 cm? Explain.",
                f"The longest diagonal is {math.sqrt(400 + 225 + 144):.1f} cm, which is less than 30 cm: no.", space=45)
    ws.question("A square-based pyramid has base 8 cm by 8 cm and its apex is 6 cm above the centre of the base. Find the "
                "length of a sloping edge.", f"half-diagonal = √32; edge = √(32 + 36) = {math.sqrt(68):.1f} cm", space=50)


def pyth_rect(ws):
    ws.section("Practice")
    rects = [(8, 6), (12, 5), (7, 4), (10, 10)]
    ws.figures("Find the length of the diagonal of each rectangle (to 1 d.p.).",
               [labelled_poly([(0, 0), (w, 0), (w, h), (0, h)], [cm(w), cm(h), None, None], [("seg", (0, 0), (w, h), "dashed")])
                for w, h in rects], [f"{n(math.hypot(w, h), 1)} cm" for w, h in rects], cols=4, fig_h=75)
    isos = [(10, 13), (6, 5), (16, 10)]
    ws.figures("Find the perpendicular height of each isosceles triangle (to 1 d.p.).",
               [labelled_poly([(0, 0), (b, 0), (b / 2, math.sqrt(s * s - b * b / 4))], [cm(b), cm(s), cm(s)],
                              [("seg", (b / 2, 0), (b / 2, math.sqrt(s * s - b * b / 4)), "dashed", "thin")]) for b, s in isos],
               [f"{n(math.sqrt(s * s - b * b / 4), 1)} cm" for b, s in isos], cols=3, fig_h=90)
    ws.section("Problem solving")
    ws.question("Find the area of an equilateral triangle with sides of 10 cm.", f"height √75 = 8.66 cm; area {25 * math.sqrt(3):.1f} cm^2",
                space=45)


def pyth_show(ws):
    ws.section("Practice")
    sets = [(3, 4, 5), (5, 12, 13), (6, 7, 9), (8, 15, 17), (7, 10, 12), (9, 40, 41)]
    P(ws, "Is a triangle with these sides right-angled? Show your working.",
      [(f"{a} cm, {b} cm, {c} cm", f"{a}^2 + {b}^2 = {a * a + b * b}, {c}^2 = {c * c}: " + ("yes" if a * a + b * b == c * c else "no"))
       for a, b, c in sets], cols=2)
    ws.section("Problem solving")
    ws.question("A builder checks a corner: the sides are 60 cm and 80 cm and the diagonal is 1 m. Is it a right angle?",
                "60^2 + 80^2 = 10 000 = 100^2: yes", space=40)


# ==========================================================================
# Transformations
# ==========================================================================
def poly_lab(pts, lab):
    return ("label", sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts), lab)


def reflect(pts, line):
    kind, v = line
    if kind == "x":
        return [(2 * v - x, y) for x, y in pts]
    if kind == "y":
        return [(x, 2 * v - y) for x, y in pts]
    if kind == "y=x":
        return [(y, x) for x, y in pts]
    return [(-y, -x) for x, y in pts]


def line_items(line):
    kind, v = line
    if kind == "x":
        return [("line", [(v, -6), (v, 6)], "dashed")]
    if kind == "y":
        return [("line", [(-6, v), (6, v)], "dashed")]
    if kind == "y=x":
        return [("line", [(-6, -6), (6, 6)], "dashed")]
    return [("line", [(-6, 6), (6, -6)], "dashed")]


def line_name(line):
    kind, v = line
    return {"x": f"x = {v}", "y": f"y = {v}", "y=x": "y = x", "y=-x": "y = −x"}[kind].replace("-", "−")


def pts_s(ps):
    return ", ".join(f"({n(x)}, {n(y)})" for x, y in ps).replace("-", "−")


SHAPE = [(1, 1), (3, 1), (3, 2), (2, 3), (1, 3)]


def reflections(ws):
    ws.section("Practice")
    for line, shape in ((("x", 0), [(1, 1), (4, 1), (4, 3)]), (("y", 0), [(-4, 1), (-1, 1), (-1, 4), (-3, 3)]),
                        (("x", -1), [(1, -2), (3, -2), (3, 2)]), (("y=x", 0), [(1, 3), (2, 3), (2, 5)])):
        ws.question(f"Reflect the shape in the line {line_name(line)}.", f"image corners {pts_s(reflect(shape, line))}",
                    figure=axes(-6, 6, -6, 6, [("polygon", shape)] + line_items(line), label_step=2), fig_w=190, fig_h=190,
                    space=5)
    ws.section("Problem solving")
    ws.question("A point (a, b) is reflected in the x-axis. What are the coordinates of its image?", "(a, −b)", space=30)


def reflections_desc(ws):
    ws.section("Practice")
    for line, shape in ((("y", 0), [(1, 1), (4, 1), (4, 3)]), (("x", 1), [(2, 1), (4, 1), (4, 4)]),
                        (("y=x", 0), [(1, 2), (1, 5), (3, 5)])):
        img = reflect(shape, line)
        ws.question("Describe fully the single transformation that maps A onto B.", f"reflection in the line {line_name(line)}",
                    figure=axes(-6, 6, -6, 6, [("polygon", shape), ("polygon", img), poly_lab(shape, "A"), poly_lab(img, "B")],
                                label_step=2), fig_w=190, fig_h=190, space=5)
    ws.section("Problem solving")
    ws.question("What must you include when describing a reflection?", "the word reflection and the equation of the mirror line",
                space=35)


def mirror_line(ws):
    ws.section("Practice")
    for line, shape in ((("x", 2), [(3, 1), (5, 1), (5, 4)]), (("y", -1), [(-3, 1), (0, 1), (-1, 3)]),
                        (("y=-x", 0), [(1, 2), (3, 2), (3, 4)])):
        img = reflect(shape, line)
        ws.question("Shape B is a reflection of shape A. Draw the mirror line and write down its equation.", line_name(line),
                    figure=axes(-6, 6, -6, 6, [("polygon", shape), ("polygon", img), poly_lab(shape, "A"), poly_lab(img, "B")],
                                label_step=2), fig_w=190, fig_h=190, space=5)
    ws.section("Problem solving")
    ws.question("How can you check that a mirror line is in the right place?", "Each point and its image are the same distance "
                "from the line, and the line joining them is perpendicular to it.", space=40)


def rotate(pts, c, ang):
    out = []
    for x, y in pts:
        dx, dy = x - c[0], y - c[1]
        for _ in range((ang // 90) % 4):
            dx, dy = -dy, dx
        out.append((c[0] + dx, c[1] + dy))
    return out


def rotations(ws):
    ws.section("Practice")
    cases = [([(1, 1), (3, 1), (3, 2)], (0, 0), 90, "90° anticlockwise"), ([(1, 1), (4, 1), (4, 3)], (0, 0), 180, "180°"),
             ([(1, 2), (3, 2), (3, 4)], (1, 1), 270, "90° clockwise"), ([(-3, 1), (-1, 1), (-1, 3)], (-1, 0), 90, "90° anticlockwise")]
    for shape, c, ang, desc in cases:
        img = rotate(shape, c, ang)
        ws.question(f"Rotate the shape {desc} about ({c[0]}, {c[1]}).".replace("-", "−"), f"image corners {pts_s(img)}",
                    figure=axes(-6, 6, -6, 6, [("polygon", shape), ("point", c[0], c[1], "")], label_step=2), fig_w=190,
                    fig_h=190, space=5)
    ws.section("Problem solving")
    ws.question("What three things must you give to describe a rotation fully?", "the centre, the angle and the direction",
                space=30)


def translate(pts, v):
    return [(x + v[0], y + v[1]) for x, y in pts]


def vec(v):
    return f"{{{{{v[0]};{v[1]}}}}}".replace("-", "−")


def translations_vec(ws):
    ws.section("Practice")
    cases = [([(1, 1), (3, 1), (3, 3)], (3, 2)), ([(-4, 1), (-2, 1), (-2, 4)], (5, -3)), ([(0, -2), (2, -2), (2, -4), (0, -4)],
                                                                                       (-4, 5))]
    for shape, v in cases:
        ws.question(f"Translate the shape by the vector {vec(v)}.", f"image corners {pts_s(translate(shape, v))}",
                    figure=axes(-6, 6, -6, 6, [("polygon", shape)], label_step=2), fig_w=180, fig_h=180, space=5)
    ws.section("Problem solving")
    ws.question("A point moves by the vector {{3;−2}} and then by {{−1;5}}. Write the single vector for both moves.",
                "{{2;3}}", space=40)


def translations_desc(ws):
    ws.section("Practice")
    cases = [([(1, 1), (3, 1), (3, 3)], (2, 3)), ([(-4, 2), (-2, 2), (-3, 4)], (5, -4)), ([(1, -1), (3, -1), (3, -3)], (-5, 0))]
    for shape, v in cases:
        img = translate(shape, v)
        ws.question("Describe fully the single transformation that maps A onto B.", f"translation by the vector {vec(v)}",
                    figure=axes(-6, 6, -6, 6, [("polygon", shape), ("polygon", img), poly_lab(shape, "A"), poly_lab(img, "B")],
                                label_step=2), fig_w=180, fig_h=180, space=5)
    ws.section("Problem solving")
    ws.question("Explain why the shape stays the same way round after a translation.", "Every point moves the same distance in "
                "the same direction, so nothing turns or flips.", space=40)


def transformations_mix(ws):
    ws.section("Practice")
    A = [(1, 1), (3, 1), (3, 2), (1, 3)]
    cases = [(reflect(A, ("y", 0)), "reflection in y = 0 (the x-axis)"), (rotate(A, (0, 0), 180), "rotation 180° about (0, 0)"),
             (translate(A, (-5, 2)), "translation by the vector {{−5;2}}"),
             ([(2 * x, 2 * y) for x, y in A], "enlargement, scale factor 2, centre (0, 0)")]
    for img, ans in cases:
        ws.question("Describe fully the single transformation that maps A onto B.", ans,
                    figure=axes(-6, 6, -6, 6, [("polygon", A), ("polygon", img), poly_lab(A, "A"), poly_lab(img, "B")],
                                label_step=2), fig_w=180, fig_h=180, space=5)
    ws.section("Problem solving")
    ws.question("Which transformations keep a shape congruent?", "reflections, rotations and translations (not enlargements, "
                "unless the scale factor is 1 or −1)", space=40)


# ==========================================================================
# Symmetry, triangles, views, vectors
# ==========================================================================
def symmetry_line(ws, rotational=False):
    ws.section("Practice")
    shapes = [("square", [(0, 0), (1, 0), (1, 1), (0, 1)], 4, 4), ("rectangle", [(0, 0), (2, 0), (2, 1), (0, 1)], 2, 2),
              ("equilateral triangle", [(0, 0), (1, 0), (0.5, 0.87)], 3, 3),
              ("isosceles triangle", [(0, 0), (1, 0), (0.5, 1.4)], 1, 1),
              ("parallelogram", [(0, 0), (2, 0), (2.5, 1), (0.5, 1)], 0, 2), ("kite", [(0.5, 0), (1, 1), (0.5, 1.4), (0, 1)], 1, 1),
              ("regular hexagon", [(math.cos(R(60 * k)), math.sin(R(60 * k))) for k in range(6)], 6, 6),
              ("trapezium", [(0, 0), (2, 0), (1.5, 1), (0.3, 1)], 0, 1)]
    if not rotational:
        ws.figures("How many lines of symmetry does each shape have?", [scene([("poly", p)], pad=8) for _, p, *_ in shapes],
                   [str(l) for _, _, l, _ in shapes], cols=4, fig_h=60)
        ws.question("Complete the shape so that the dashed line is a line of symmetry.", "check: a mirror image of the shape",
                    figure=scene([("grid", 0, 10, 0, 6), ("poly", [(1, 1), (5, 1), (5, 5), (3, 4), (1, 4)], "nofill"),
                                  ("seg", (5, 0), (5, 6), "dashed")], pad=6), fig_w=220, fig_h=140, fig_pos="below", space=0)
    else:
        ws.figures("Write down the order of rotational symmetry of each shape.",
                   [scene([("poly", p)], pad=8) for _, p, *_ in shapes], [str(max(1, r)) for *_, r in shapes], cols=4, fig_h=60)
        P(ws, "Write down the order of rotational symmetry of", [("the letter S", "2"), ("the letter Z", "2"), ("the letter H", "2"),
                                                                ("the letter A", "1"), ("a regular octagon", "8")], cols=5)
    ws.section("Problem solving")
    ws.question("Draw a shape with " + ("exactly 2 lines of symmetry." if not rotational else
                                        "rotational symmetry of order 4 but no lines of symmetry."),
                "e.g. a rectangle" if not rotational else "e.g. a 'windmill' or pinwheel shape", space=90)


def tri_types(ws):
    ws.section("Practice")
    shapes = [([(0, 0), (1, 0), (0.5, 0.87)], "equilateral"), ([(0, 0), (1.2, 0), (0.6, 1.5)], "isosceles"),
              ([(0, 0), (1.5, 0), (0, 1)], "right-angled (scalene)"), ([(0, 0), (2, 0), (0.6, 0.9)], "scalene"),
              ([(0, 0), (2.4, 0), (-0.6, 0.8)], "obtuse-angled (scalene)"), ([(0, 0), (1.4, 0), (0, 1.4)], "right-angled isosceles")]
    figs = []
    for p, k in shapes:
        items = [("poly", p)]
        if "right" in k:
            items.append(("right", p[0], p[1], p[2]))
        if k in ("equilateral",):
            items += [("ticks", p[0], p[1], 1), ("ticks", p[1], p[2], 1), ("ticks", p[2], p[0], 1)]
        if "isosceles" in k:
            items += [("ticks", p[1], p[2], 1), ("ticks", p[2], p[0], 1)] if k == "isosceles" else [("ticks", p[0], p[1], 1),
                                                                                                    ("ticks", p[2], p[0], 1)]
        figs.append(scene(items, pad=8))
    ws.figures("Name each type of triangle.", figs, [k for _, k in shapes], cols=3, fig_h=70)
    P(ws, "Name the triangle with", [("three equal sides", "equilateral"), ("two equal angles", "isosceles"),
                                     ("no equal sides", "scalene"), ("one angle of 90°", "right-angled")], cols=2)
    ws.section("Problem solving")
    ws.question("Can a triangle be both right-angled and isosceles? Explain.", "Yes: angles 90°, 45°, 45°", space=35)


def tri_sides(ws):
    ws.section("Practice")
    sets = [(3, 4, 5), (2, 3, 6), (5, 5, 9), (1, 2, 3), (7, 8, 14), (4, 4, 8)]
    P(ws, "Can a triangle have these side lengths? Explain.",
      [(f"{a} cm, {b} cm, {c} cm", "yes" if a + b > c else f"no: {a} + {b} is not more than {c}") for a, b, c in sets], cols=2)
    ws.section("Problem solving")
    ws.question("Two sides of a triangle are 5 cm and 8 cm. What range of lengths could the third side have?",
                "more than 3 cm and less than 13 cm", space=40)


def views(ws):
    ws.section("Practice")
    ws.figures("Sketch the plan (from above), front elevation and side elevation of each solid.",
               [solid("cuboid"), solid("triangular prism"), solid("square-based pyramid"), solid("cylinder")],
               ["plan: rectangle; front: rectangle; side: rectangle", "plan: rectangle; front: triangle; side: rectangle",
                "plan: square with diagonals; front and side: triangles", "plan: circle; front and side: rectangles"],
               cols=2, fig_h=80, answer_line=False)
    ws.question("Draw the plan, front elevation and side elevation of this cuboid on the grid. It is 4 cm long, 2 cm wide and "
                "3 cm high.", "plan 4 × 2, front 4 × 3, side 2 × 3", figure=square_grid(18, 7), fig_w=380, fig_h=150,
                fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("A solid has a circle as its plan and triangles as its front and side elevations. Name the solid.", "cone",
                space=30)


def vectors(ws, column=False):
    ws.section("Practice")
    if column:
        P(ws, "a = {{3;1}}, b = {{−2;4}}, c = {{0;−5}}. Work out", [
            ("a + b", "{{1;5}}"), ("a − b", "{{5;−3}}"), ("2a", "{{6;2}}"), ("3b + c", "{{−6;7}}"), ("a + b + c", "{{1;0}}"),
            ("2a − 3c", "{{6;17}}")], cols=3)
        P(ws, "Find the magnitude (length) of each vector, to 1 d.p. where needed.", [("{{3;4}}", "5"), ("{{−5;12}}", "13"),
                                                                                       ("{{2;3}}", f"{math.sqrt(13):.1f}")], cols=3)
    else:
        P(ws, "OA = a and OB = b. Write each vector in terms of a and b.", [
            ("AB", "b − a"), ("BA", "a − b"), ("OM, where M is the midpoint of AB", "[[1//2]](a + b)"),
            ("AM", "[[1//2]](b − a)")], cols=2)
        P(ws, "Simplify", [("2a + 3b − a + b", "a + 4b"), ("3(a − 2b) + 2(a + b)", "5a − 4b")], cols=2)
    ws.section("Problem solving")
    ws.question("Explain what it means if one vector is a multiple of another.", "They are parallel.", space=30)
    ws.question("Show that {{2;6}} and {{−1;−3}} are parallel.", "{{2;6}} = −2 × {{−1;−3}}", space=35)


# ==========================================================================
# Trigonometry
# ==========================================================================
def rt_tri(adj, opp, la, lo, lh, angle_lab):
    A, B, C = (0, 0), (adj, 0), (adj, opp)
    return scene([("poly", [A, B, C]), ("right", B, A, C), ("side", A, B, la), ("side", B, C, lo), ("side", C, A, lh),
                  ("angle", A, B, C, angle_lab, 20)], pad=18)


def trig_intro(ws):
    ws.section("Practice")
    ws.figures("Label the hypotenuse (H), opposite (O) and adjacent (A) sides, for the marked angle θ.",
               [rt_tri(5, 3, "", "", "", "θ"), rt_tri(3, 4, "", "", "", "θ"), rt_tri(4, 2, "", "", "", "θ")],
               ["bottom = A, right = O, slope = H"] * 3, cols=3, fig_h=90)
    P(ws, "Use the triangle with sides 3, 4 and 5 (angle θ opposite the 3). Write as a fraction", [
        ("sin θ", "[[3//5]]"), ("cos θ", "[[4//5]]"), ("tan θ", "[[3//4]]")], cols=3)
    P(ws, "Use a calculator. Give answers to 3 d.p.", [(f"{f} {a}°", f"{getattr(math, f)(R(a)):.3f}") for f, a in
                                                       [("sin", 30), ("cos", 60), ("tan", 45), ("sin", 72), ("cos", 18), ("tan", 63)]],
      cols=3)
    ws.section("Problem solving")
    ws.question("Write down the meaning of SOH CAH TOA.", "sin = O/H, cos = A/H, tan = O/A", space=35)


def trig_sides(ws):
    ws.section("Practice")
    cases = [(35, "opp", 8, "hyp"), (50, "adj", 12, "hyp"), (28, "opp", 10, "adj"), (62, "hyp", 15, "opp"),
             (40, "adj", 7, "opp"), (55, "hyp", 9, "adj")]
    figs, ans = [], []
    for ang, unknown, known, kside in cases:
        a = R(ang)
        # build the triangle from the known side
        if kside == "hyp":
            h = known
        elif kside == "adj":
            h = known / math.cos(a)
        else:
            h = known / math.sin(a)
        adj, opp = h * math.cos(a), h * math.sin(a)
        val = {"adj": adj, "opp": opp, "hyp": h}
        labs = {s: (cm(known) if s == kside else "x" if s == unknown else "") for s in ("adj", "opp", "hyp")}
        figs.append(rt_tri(adj, opp, labs["adj"], labs["opp"], labs["hyp"], f"{ang}°"))
        ans.append(f"{val[unknown]:.1f} cm")
    ws.figures("Find the length of each side marked x, to 1 d.p.", figs, ans, cols=3, fig_h=95)
    ws.section("Problem solving")
    ws.question("A ladder 6 m long makes an angle of 70° with the ground. How high up the wall does it reach?",
                f"6 sin 70° = {6 * math.sin(R(70)):.2f} m", space=45)


def trig_angles(ws):
    ws.section("Practice")
    cases = [(8, 5), (12, 7), (6, 9), (10, 3), (5, 5), (4, 11)]
    ws.figures("Find the angle marked θ, to 1 d.p.", [rt_tri(a, o, cm(a), cm(o), "", "θ") for a, o in cases],
               [f"tan θ = [[{o}//{a}]], θ = {math.degrees(math.atan2(o, a)):.1f}°" for a, o in cases], cols=3, fig_h=90)
    P(ws, "Find θ, to 1 d.p.", [("sin θ = 0.6", f"{math.degrees(math.asin(0.6)):.1f}°"),
                                ("cos θ = [[5//13]]", f"{math.degrees(math.acos(5 / 13)):.1f}°"),
                                ("tan θ = 2.5", f"{math.degrees(math.atan(2.5)):.1f}°")], cols=3)
    ws.section("Problem solving")
    ws.question("A ramp rises 1.2 m over a horizontal distance of 8 m. Find the angle of the ramp.",
                f"{math.degrees(math.atan(1.2 / 8)):.1f}°", space=40)


def trig_3d(ws):
    ws.section("Practice")
    l, h, d = 8, 4, 6
    diag = math.hypot(l, d)
    ws.question(f"The cuboid is {l} cm by {d} cm by {h} cm.\n(a) Find the length of the diagonal of the base.\n(b) Find the angle "
                "between the space diagonal and the base.",
                f"(a) √({l}^2 + {d}^2) = {diag:.1f} cm   (b) tan θ = [[{h}//{diag:.1f}]], θ = {math.degrees(math.atan(h / diag)):.1f}°",
                figure=cuboid_fig(l, h, d), fig_w=180, fig_h=120, space=10)
    ws.question("A square-based pyramid has a base of side 10 cm and vertical height 12 cm. Find the angle between a sloping "
                "edge and the base.", f"half-diagonal = {math.sqrt(50):.2f}; tan θ = [[12//{math.sqrt(50):.2f}]], "
                                      f"θ = {math.degrees(math.atan(12 / math.sqrt(50))):.1f}°", space=60)
    ws.section("Problem solving")
    ws.question("A flagpole 15 m tall stands at the corner of a rectangular field 40 m by 30 m. Find the angle of elevation of "
                "the top of the pole from the opposite corner.", f"diagonal 50 m; θ = {math.degrees(math.atan(15 / 50)):.1f}°", space=55)


def gen_tri(a_len, B, C):
    """Triangle ABC with side a = BC and angles B, C (degrees); returns points and sides."""
    A_ = 180 - B - C
    b = a_len * math.sin(R(B)) / math.sin(R(A_))
    c = a_len * math.sin(R(C)) / math.sin(R(A_))
    Bp, Cp = (0, 0), (a_len, 0)
    Ap = (c * math.cos(R(B)), c * math.sin(R(B)))
    return Ap, Bp, Cp, A_, b, c


def tri_scene(Ap, Bp, Cp, sides, angles):
    """sides: dict 'a','b','c' -> label; angles: dict 'A','B','C' -> label."""
    pts = {"A": Ap, "B": Bp, "C": Cp}
    items = [("poly", [Bp, Cp, Ap]), ("label", Ap, "A", "N"), ("label", Bp, "B", "SW"), ("label", Cp, "C", "SE")]
    side_pts = {"a": (Bp, Cp), "b": (Cp, Ap), "c": (Ap, Bp)}
    for s, lab in sides.items():
        items.append(("side", *side_pts[s], lab))
    nb = {"A": ("B", "C"), "B": ("C", "A"), "C": ("A", "B")}
    for k, lab in angles.items():
        items.append(("angle", pts[k], pts[nb[k][0]], pts[nb[k][1]], lab))
    return scene(items, pad=18)


def sine_rule(ws, find="sides"):
    ws.section("Practice")
    cases = [(9, 50, 70), (12, 40, 65), (7, 35, 80), (10, 110, 30)] if find == "sides" else \
            [(9, 50, 70), (12, 40, 65), (7, 35, 80), (10, 55, 30)]      # acute angles only: no ambiguous case
    figs, ans = [], []
    for a_len, B, C in cases:
        Ap, Bp, Cp, A_, b, c = gen_tri(a_len, B, C)
        if find == "sides":
            figs.append(tri_scene(Ap, Bp, Cp, {"a": cm(a_len), "b": "x"}, {"B": f"{B}°", "C": f"{C}°"}))
            ans.append(f"A = {A_}°; x = [[{a_len} sin {B}°//sin {A_}°]] = {b:.1f} cm")
        else:
            figs.append(tri_scene(Ap, Bp, Cp, {"a": cm(a_len), "b": f"{b:.1f} cm"}, {"B": "θ", "A": f"{A_}°"}))
            ans.append(f"sin θ = [[{b:.1f} sin {A_}°//{a_len}]], θ = {math.degrees(math.asin(b * math.sin(R(A_)) / a_len)):.1f}°")
    ws.figures("Use the sine rule to find " + ("the side marked x (to 1 d.p.)." if find == "sides" else "the angle marked θ (to 1 d.p.)."),
               figs, ans, cols=2, fig_h=115)
    ws.section("Problem solving")
    ws.question("Write down the sine rule. When should you use it?", "[[a//sin A]] = [[b//sin B]] = [[c//sin C]]; when you know "
                "a side and its opposite angle", space=50)


def ambiguous(ws):
    ws.section("Practice")
    ws.question("In triangle ABC, AB = 10 cm, BC = 7 cm and angle A = 40°.\n(a) Find the two possible values of angle C.\n"
                "(b) Sketch both triangles.",
                f"sin C = [[10 sin 40°//7]] = {10 * math.sin(R(40)) / 7:.3f}; C = {math.degrees(math.asin(10 * math.sin(R(40)) / 7)):.1f}° "
                f"or {180 - math.degrees(math.asin(10 * math.sin(R(40)) / 7)):.1f}°", space=120)
    ws.question("In triangle PQR, PQ = 8 cm, QR = 6 cm and angle P = 35°. Find both possible sizes of angle R.",
                f"{math.degrees(math.asin(8 * math.sin(R(35)) / 6)):.1f}° or {180 - math.degrees(math.asin(8 * math.sin(R(35)) / 6)):.1f}°",
                space=90)
    ws.section("Problem solving")
    ws.question("Explain why the sine rule can give two possible angles.", "sin θ = sin(180° − θ), so an acute angle and an "
                "obtuse angle have the same sine.", space=45)


def cosine_rule(ws, find="sides"):
    ws.section("Practice")
    cases = [(7, 9, 60), (10, 6, 45), (5, 8, 110), (12, 15, 30)]
    figs, ans = [], []
    for b, c, A in cases:
        a = math.sqrt(b * b + c * c - 2 * b * c * math.cos(R(A)))
        Ap = (c * math.cos(R(0)), 0)
        # place A at origin with AB along x-axis
        Ap, Bp, Cp = (0, 0), (c, 0), (b * math.cos(R(A)), b * math.sin(R(A)))
        if find == "sides":
            items = [("poly", [Ap, Bp, Cp]), ("side", Ap, Bp, cm(c), "inside"), ("side", Cp, Ap, cm(b)),
                     ("side", Bp, Cp, "x"), ("angle", Ap, Bp, Cp, f"{A}°")]
            ans.append(f"x^2 = {b}^2 + {c}^2 − 2 × {b} × {c} × cos {A}°, x = {a:.1f} cm")
        else:
            items = [("poly", [Ap, Bp, Cp]), ("side", Ap, Bp, cm(c), "inside"), ("side", Cp, Ap, cm(b)),
                     ("side", Bp, Cp, f"{a:.1f} cm"), ("angle", Ap, Bp, Cp, "θ")]
            ans.append(f"cos θ = [[{b}^2 + {c}^2 − {a:.1f}^2//2 × {b} × {c}]], θ ≈ {A}°")
        figs.append(scene(items, pad=18))
    ws.figures("Use the cosine rule to find " + ("the side marked x (to 1 d.p.)." if find == "sides" else "the angle θ (to the nearest degree)."),
               figs, ans, cols=2, fig_h=110)
    ws.section("Problem solving")
    ws.question("Two ships leave a port. One sails 20 km on a bearing of 040°, the other 30 km on a bearing of 120°. How far "
                "apart are they?", f"angle between = 80°; √(400 + 900 − 1200 cos 80°) = {math.sqrt(1300 - 1200 * math.cos(R(80))):.1f} km",
                space=60)


def trig_area(ws):
    ws.section("Practice")
    cases = [(8, 6, 40), (10, 12, 75), (5, 7, 120), (9, 9, 60)]
    figs = []
    for b, c, A in cases:
        Ap, Bp, Cp = (0, 0), (c, 0), (b * math.cos(R(A)), b * math.sin(R(A)))
        figs.append(scene([("poly", [Ap, Bp, Cp]), ("side", Ap, Bp, cm(c), "inside"), ("side", Cp, Ap, cm(b)),
                           ("angle", Ap, Bp, Cp, f"{A}°")], pad=18))
    ws.figures("Use area = [[1//2]]ab sin C to find the area of each triangle, to 1 d.p.", figs,
               [f"{0.5 * b * c * math.sin(R(A)):.1f} cm^2" for b, c, A in cases], cols=2, fig_h=100)
    ws.section("Problem solving")
    ws.question("A triangle has sides 6 cm and 10 cm and an area of 15 cm^2. Find the acute angle between the two sides.",
                "[[1//2]] × 6 × 10 × sin C = 15, sin C = 0.5, C = 30°", space=50)


def trig_graph(ws, fn):
    ws.section("Practice")
    f = {"sin": math.sin, "cos": math.cos, "tan": math.tan}[fn]
    if fn == "tan":
        segs = []
        for lo, hi in ((0, 80), (100, 260), (280, 360)):
            segs.append(("line", [(x, max(-5, min(5, f(R(x))))) for x in range(lo, hi + 1, 2)]))
        fig = chart(0, 360, -5, 5, 90, 1, segs + [("seg", (90, -5), (90, 5), "dashed"), ("seg", (270, -5), (270, 5), "dashed")],
                    xlabel="x (degrees)", ylabel="y")
    else:
        fig = chart(0, 360, -1, 1, 90, 0.5, [("line", [(x, f(R(x))) for x in range(0, 361, 3)])], xlabel="x (degrees)",
                    ylabel="y", minor=0.1)
    ws.figure_only(fig, 330, 170)
    if fn == "sin":
        qa = [("Write down the maximum value of sin x and where it occurs.", "1, at x = 90°"),
              ("Solve sin x = 0.5 for 0° ≤ x ≤ 360°.", "x = 30° or 150°"), ("Solve sin x = −1.", "x = 270°"),
              ("What is the period of y = sin x?", "360°")]
    elif fn == "cos":
        qa = [("Write down the coordinates of the minimum point.", "(180°, −1)"),
              ("Solve cos x = 0.5 for 0° ≤ x ≤ 360°.", "x = 60° or 300°"), ("Solve cos x = 0.", "x = 90° or 270°"),
              ("Which line of symmetry does the graph have in this range?", "x = 180°")]
    else:
        qa = [("Write down the equations of the asymptotes.", "x = 90° and x = 270°"), ("Solve tan x = 1 for 0° ≤ x ≤ 360°.",
                                                                                         "x = 45° or 225°"),
              ("What is the period of y = tan x?", "180°"), ("Solve tan x = −1.", "x = 135° or 315°")]
    P(ws, f"The graph above shows y = {fn} x for 0° ≤ x ≤ 360°. Use it to answer these.", qa, cols=1)
    ws.section("Problem solving")
    ws.question(f"Explain how you can use the graph to find all solutions of {fn} x = k in the range.",
                "Draw the horizontal line y = k and read off every x where it crosses the curve.", space=40)


def exact_values(ws):
    ws.section("Practice")
    P(ws, "Write down the exact value of", [("sin 30°", "[[1//2]]"), ("cos 60°", "[[1//2]]"), ("tan 45°", "1"), ("sin 60°", "[[√3//2]]"),
                                           ("cos 30°", "[[√3//2]]"), ("tan 30°", "[[1//√3]] = [[√3//3]]"), ("sin 45°", "[[√2//2]]"),
                                           ("tan 60°", "√3"), ("cos 90°", "0"), ("sin 0°", "0"), ("cos 0°", "1"), ("sin 90°", "1")],
      cols=4)
    P(ws, "Work out the exact value of", [("sin 30° + cos 60°", "1"), ("2 sin 45° × cos 45°", "1"), ("tan 60° × tan 30°", "1")],
      cols=3)
    ws.section("Problem solving")
    ws.question("Use an equilateral triangle with sides of 2 to show that sin 60° = [[√3//2]].",
                "Halve it: a right-angled triangle with hypotenuse 2, base 1 and height √3; sin 60° = [[√3//2]].", space=55)


# ==========================================================================
# Similar shapes
# ==========================================================================
def similar_def(ws):
    ws.section("Practice")
    pairs = [((4, 2), (8, 4), "yes, scale factor 2"), ((3, 2), (6, 5), "no"), ((5, 3), (7.5, 4.5), "yes, scale factor 1.5"),
             ((6, 4), (9, 7), "no")]
    P(ws, "Are these rectangles similar? If so, give the scale factor.", [(f"{a[0]} × {a[1]} and {b[0]} × {b[1]}", ans)
                                                                          for a, b, ans in pairs], cols=2)
    P(ws, "True or false?", [("All squares are similar.", "true"), ("All rectangles are similar.", "false"),
                             ("All circles are similar.", "true"), ("Congruent shapes are also similar.", "true")], cols=2)
    ws.section("Problem solving")
    ws.question("Explain the difference between similar and congruent.", "Similar: same shape, may be a different size. "
                "Congruent: same shape AND same size.", space=40)


def similar_sides(ws):
    ws.section("Practice")
    cases = [((6, 4), 1.5), ((5, 3), 2), ((8, 6), 0.75)]
    figs, ans = [], []
    for (w, h), k in cases:
        figs.append(scene([("poly", [(0, 0), (w, 0), (w, h), (0, h)]), ("side", (0, 0), (w, 0), cm(w)), ("side", (w, 0), (w, h), cm(h)),
                           ("poly", [(w + 2, 0), (w + 2 + w * k, 0), (w + 2 + w * k, h * k), (w + 2, h * k)]),
                           ("side", (w + 2, 0), (w + 2 + w * k, 0), cm(w * k)), ("side", (w + 2 + w * k, 0), (w + 2 + w * k, h * k), "x")],
                          pad=18))
        ans.append(f"scale factor {n(k)}, x = {n(h * k)} cm")
    ws.figures("The rectangles in each pair are similar. Find x.", figs, ans, cols=3, fig_h=80)
    A, B, C = (0, 0), (8, 0), (3, 5)
    k = 0.5
    ws.question("In the diagram, DE is parallel to BC. AD = 4 cm, AB = 8 cm and BC = 10 cm. Find DE.", "scale factor [[1//2]], DE = 5 cm",
                space=50)
    ws.section("Problem solving")
    ws.question("A photo 10 cm by 15 cm is enlarged so its shorter side is 25 cm. How long is its longer side?", "37.5 cm", space=40)


def similar_area(ws, vol=False):
    ws.section("Practice")
    if not vol:
        P(ws, "Two shapes are similar. Find the missing value.", [
            ("length scale factor 3; small area 5 cm^2. Find the large area.", "45 cm^2"),
            ("length scale factor 2.5; small area 12 cm^2. Find the large area.", "75 cm^2"),
            ("areas 20 cm^2 and 180 cm^2. Find the length scale factor.", "3"),
            ("small side 4 cm, large side 10 cm, large area 150 cm^2. Find the small area.", "24 cm^2")], cols=1)
    else:
        P(ws, "Two solids are similar. Find the missing value.", [
            ("length scale factor 2; small volume 15 cm^3. Find the large volume.", "120 cm^3"),
            ("length scale factor 3; large volume 540 cm^3. Find the small volume.", "20 cm^3"),
            ("volumes 8 cm^3 and 125 cm^3. Find the length scale factor.", "2.5"),
            ("heights 6 cm and 9 cm; small volume 64 cm^3. Find the large volume.", "216 cm^3")], cols=1)
    ws.section("Problem solving")
    if not vol:
        ws.question("A map has a scale factor of 1 : 50 000. A lake on the map has an area of 4 cm^2. Find its real area in km^2.",
                    "4 × 50 000^2 cm^2 = 1 km^2", space=50)
    else:
        ws.question("Two similar bottles hold 500 ml and 4 litres. The small one is 15 cm tall. How tall is the large one?",
                    "volume scale factor 8, length scale factor 2: 30 cm", space=50)


def similar_further(ws):
    ws.section("Practice")
    P(ws, "Two similar cylinders have surface areas of 50 cm^2 and 200 cm^2.", [
        ("Find the length scale factor.", "2"), ("The small one has volume 40 cm^3. Find the large volume.", "320 cm^3")], cols=1)
    P(ws, "Two similar cones have volumes of 27 cm^3 and 64 cm^3.", [
        ("Find the length scale factor.", "[[4//3]]"), ("The small cone has surface area 36 cm^2. Find the large one's.", "64 cm^2")],
      cols=1)
    ws.section("Problem solving")
    ws.question("Two similar statues have heights in the ratio 2 : 5. The small one needs 0.4 litres of paint. How much paint does "
                "the large one need?", "area factor 6.25: 2.5 litres", space=50)


# ==========================================================================
# Surface area and volume
# ==========================================================================
def sa_cuboid(ws):
    ws.section("Practice")
    boxes = [(5, 3, 2), (8, 4, 3), (6, 6, 6), (10, 2, 5)]
    ws.figures("Work out the surface area of each cuboid.", [cuboid_fig(l, h, d) for l, h, d in boxes],
               [f"{2 * (l * h + l * d + h * d)} cm^2" for l, h, d in boxes], cols=2, fig_h=100)
    ws.section("Problem solving")
    ws.question("A cube has a surface area of 150 cm^2. Find the length of its edges.", "each face 25 cm^2, edge 5 cm", space=40)
    ws.question("An open box (no lid) is 20 cm by 15 cm by 10 cm. Find the area of card used.", "300 + 2(200) + 2(150) = 1000 cm^2",
                space=45)


def sa_l(ws):
    ws.section("Practice")
    cases = [(6, 5, 2, 2, 4), (8, 6, 3, 2, 5)]
    for W, H, a, b, dep in cases:
        base = [(0, 0), (W, 0), (W, b), (a, b), (a, H), (0, H)]
        area = shoelace(base)
        per = 2 * (W + H)
        ws.question("Work out the surface area of this L-shaped prism.", f"2 × {n(area)} + {per} × {dep} = {n(2 * area + per * dep)} cm^2",
                    figure=l_prism_fig(W, H, a, b, dep), fig_w=200, fig_h=150, space=10)
    ws.section("Problem solving")
    ws.question("Explain why the surface area of a prism is 2 × cross-section + perimeter × length.",
                "two end faces, plus rectangles round the sides that together are perimeter × length", space=45)


def sa_prisms(ws):
    ws.section("Practice")
    ws.question("Work out the surface area of this triangular prism.", "2 × 6 + (3 + 4 + 5) × 10 = 132 cm^2",
                figure=prism_fig([(0, 0), (4, 0), (0, 3)], 10, ["4 cm", "5 cm", "3 cm"], "10 cm"), fig_w=200, fig_h=130, space=10)
    ws.question("Work out the surface area of this triangular prism.", f"2 × 24 + (8 + 5 + 5) × 12 = {48 + 18 * 12} cm^2",
                figure=prism_fig([(0, 0), (8, 0), (4, 3)], 12, ["8 cm", "5 cm", "5 cm"], "12 cm"), fig_w=220, fig_h=130, space=10)
    ws.section("Problem solving")
    ws.question("A tent is a triangular prism. The triangle has base 2 m, sloping sides 1.7 m and height 0.9 m; the tent is 3 m "
                "long. Find the area of fabric including the floor.", "2 × 0.9 + (2 + 1.7 + 1.7) × 3 = 18 m^2", space=55)


def sa_curved(ws, kind):
    ws.section("Practice")
    if kind == "cyl":
        cases = [(3, 10), (5, 4), (2.5, 8), (7, 7)]
        P(ws, "Work out the total surface area of each cylinder, to 1 d.p.",
          [(f"radius {n(r)} cm, height {h} cm", f"{2 * PI * r * r + 2 * PI * r * h:.1f} cm^2") for r, h in cases], cols=2)
        pic = solid("cylinder")
        ps = ("A tin of beans has radius 4 cm and height 11 cm. Find the area of the label (the curved surface).",
              f"2π × 4 × 11 = {88 * PI:.1f} cm^2")
    elif kind == "sph":
        cases = [3, 5, 10, 2.5]
        P(ws, "Work out the surface area of each sphere (4πr^2), to 1 d.p.", [(f"radius {n(r)} cm", f"{4 * PI * r * r:.1f} cm^2")
                                                                                for r in cases], cols=4)
        P(ws, "Work out the total surface area of each hemisphere (3πr^2), to 1 d.p.", [(f"radius {r} cm", f"{3 * PI * r * r:.1f} cm^2")
                                                                                         for r in (4, 6)], cols=2)
        pic = solid("sphere")
        ps = ("A sphere has a surface area of 100π cm^2. Find its radius.", "4πr^2 = 100π, r = 5 cm")
    elif kind == "cone":
        cases = [(3, 5), (6, 10), (5, 13), (4, 7)]
        P(ws, "Work out the total surface area of each cone (πrl + πr^2), where l is the slant height, to 1 d.p.",
          [(f"radius {r} cm, slant height {l} cm", f"{PI * r * l + PI * r * r:.1f} cm^2") for r, l in cases], cols=2)
        pic = solid("cone")
        ps = ("A cone has radius 6 cm and vertical height 8 cm. Find its curved surface area.", f"l = 10, πrl = 60π = {60 * PI:.1f} cm^2")
    else:   # frustum
        P(ws, "A cone of radius 6 cm and slant height 10 cm has the top cut off: a cone of radius 3 cm and slant height 5 cm.", [
            ("Find the curved surface area of the frustum.", f"π(6)(10) − π(3)(5) = 45π = {45 * PI:.1f} cm^2"),
            ("Find the total surface area of the frustum.", f"45π + 36π + 9π = 90π = {90 * PI:.1f} cm^2")], cols=1)
        pic = solid("cone")
        ps = ("Explain why the small cone that is removed is similar to the original cone.", "It has the same shape: all its lengths "
              "are half of the large cone's.")
    ws.section("Problem solving")
    ws.question(ps[0], ps[1], figure=pic, fig_w=80, fig_h=70, space=30)


def sa_mixture(ws):
    ws.section("Practice")
    P(ws, "Work out the surface area of each solid. Give answers to 1 d.p. where needed.", [
        ("a cube with edges of 4 cm", "96 cm^2"), ("a cuboid 6 cm by 5 cm by 2 cm", "104 cm^2"),
        ("a cylinder with radius 3 cm and height 8 cm", f"{18 * PI + 48 * PI:.1f} cm^2"),
        ("a sphere with radius 6 cm", f"{144 * PI:.1f} cm^2"), ("a cone with radius 5 cm and slant height 12 cm",
                                                                 f"{85 * PI:.1f} cm^2")], cols=1)
    ws.section("Problem solving")
    ws.question("Which has the bigger surface area: a cube with 6 cm edges or a sphere with radius 4 cm?",
                f"cube 216 cm^2, sphere {64 * PI:.1f} cm^2: the sphere", space=45)


def volume(ws, kind):
    ws.section("Practice")
    if kind == "cuboid":
        boxes = [(5, 3, 2), (8, 4, 3), (6, 6, 6), (10, 2.5, 4)]
        ws.figures("Work out the volume of each cuboid.", [cuboid_fig(l, h, d) for l, h, d in boxes],
                   [f"{n(l * h * d)} cm^3" for l, h, d in boxes], cols=2, fig_h=100)
        ps = ("A fish tank 60 cm by 30 cm by 40 cm is filled with water. How many litres does it hold?", "72 000 cm^3 = 72 litres")
    elif kind == "prism":
        ws.question("Work out the volume of this triangular prism.", "[[1//2]] × 4 × 3 × 10 = 60 cm^3",
                    figure=prism_fig([(0, 0), (4, 0), (0, 3)], 10, ["4 cm", None, "3 cm"], "10 cm"), fig_w=200, fig_h=130, space=10)
        P(ws, "Volume = area of cross-section × length.", [("cross-section 15 cm^2, length 8 cm", "120 cm^3"),
                                                           ("cross-section 24 cm^2, length 2.5 cm", "60 cm^3")], cols=2)
        ps = ("A prism has volume 200 cm^3 and length 8 cm. Find the area of its cross-section.", "25 cm^2")
    elif kind == "cyl":
        cases = [(3, 10), (5, 4), (2.5, 8), (10, 1)]
        P(ws, "Work out the volume of each cylinder (πr^2h), to 1 d.p.", [(f"radius {n(r)} cm, height {h} cm", f"{PI * r * r * h:.1f} cm^3")
                                                                          for r, h in cases], cols=2)
        ps = ("A cylindrical glass has radius 3.5 cm and height 12 cm. Does it hold 500 ml?", f"{PI * 12.25 * 12:.0f} cm^3, so no")
    elif kind == "l":
        for W, H, a, b, dep in ((6, 5, 2, 2, 4), (8, 6, 3, 2, 5)):
            base = [(0, 0), (W, 0), (W, b), (a, b), (a, H), (0, H)]
            ws.question("Work out the volume of this L-shaped prism.", f"{n(shoelace(base))} × {dep} = {n(shoelace(base) * dep)} cm^3",
                        figure=l_prism_fig(W, H, a, b, dep), fig_w=200, fig_h=150, space=10)
        ps = ("Explain how to find the volume of any prism.", "area of the cross-section × length")
    else:   # cone
        cases = [(3, 4), (5, 12), (6, 10), (2.5, 9)]
        P(ws, "Work out the volume of each cone ([[1//3]]πr^2h), to 1 d.p.", [(f"radius {n(r)} cm, height {h} cm",
                                                                             f"{PI * r * r * h / 3:.1f} cm^3") for r, h in cases], cols=2)
        ps = ("A cone and a cylinder have the same radius and height. How many cones' worth of water fill the cylinder?", "3")
    ws.section("Problem solving")
    ws.question(ps[0], ps[1], space=50)


SHEETS = [
    ({"slug": "perimeter"}, perimeter), ({"slug": "perimeter-on-a-grid"}, perimeter_grid),
    ({"slug": "pythagoras-finding-sides"}, pyth_sides), ({"slug": "pythagoras-on-a-graph"}, pyth_graph),
    ({"slug": "pythagoras-3d"}, pyth_3d), ({"slug": "pythagoras-rectangles-isosceles-tri"}, pyth_rect),
    ({"slug": "pythagoras-show-triangle-is-right-angle"}, pyth_show),
    ({"slug": "reflections"}, reflections), ({"slug": "reflections-describing"}, reflections_desc),
    ({"slug": "reflections-finding-mirror-line"}, mirror_line), ({"slug": "rotations"}, rotations),
    ({"slug": "translations-vector"}, translations_vec), ({"slug": "translations-describing"}, translations_desc),
    ({"slug": "transformations-mixture"}, transformations_mix),
    ({"slug": "symmetry-line"}, symmetry_line), ({"slug": "symmetry-rotational"}, lambda ws: symmetry_line(ws, True)),
    ({"slug": "triangles-types-of"}, tri_types), ({"slug": "triangles-lengths-of-sides"}, tri_sides),
    ({"slug": "views-front-side-elevation-and-plan-view"}, views),
    ({"slug": "vectors"}, vectors), ({"slug": "vectors-column"}, lambda ws: vectors(ws, True)),
    ({"slug": "trigonometry-introduction"}, trig_intro), ({"slug": "trigonometry-missing-sides"}, trig_sides),
    ({"slug": "trigonometry-missing-angles"}, trig_angles), ({"slug": "trigonometry-3d"}, trig_3d),
    ({"slug": "trigonometry-sine-rule-sides"}, sine_rule), ({"slug": "trigonometry-sine-rule-angles"}, lambda ws: sine_rule(ws, "angles")),
    ({"slug": "trigonometry-sine-rule-ambiguous-case"}, ambiguous),
    ({"slug": "trigonometry-cosine-rule-sides"}, cosine_rule),
    ({"slug": "trigonometry-cosine-rule-angles"}, lambda ws: cosine_rule(ws, "angles")),
    ({"slug": "trigonometry-area-of-a-triangle"}, trig_area),
    ({"slug": "trigonometry-sine-graph"}, lambda ws: trig_graph(ws, "sin")),
    ({"slug": "trigonometry-cosine-graph"}, lambda ws: trig_graph(ws, "cos")),
    ({"slug": "trigonometry-tangent-graph"}, lambda ws: trig_graph(ws, "tan")),
    ({"slug": "trigonometry-exact-values"}, exact_values),
    ({"slug": "similar-shapes-definition"}, similar_def), ({"slug": "similar-shapes-finding-sides"}, similar_sides),
    ({"slug": "similar-shapes-area"}, similar_area), ({"slug": "similar-shapes-volume"}, lambda ws: similar_area(ws, True)),
    ({"slug": "similar-shapes-further"}, similar_further),
    ({"slug": "surface-area-cuboid"}, sa_cuboid), ({"slug": "surface-area-l-shape-prism"}, sa_l),
    ({"slug": "surface-area-other-prisms"}, sa_prisms), ({"slug": "surface-area-cylinders"}, lambda ws: sa_curved(ws, "cyl")),
    ({"slug": "surface-area-sphere"}, lambda ws: sa_curved(ws, "sph")), ({"slug": "surface-area-cone"}, lambda ws: sa_curved(ws, "cone")),
    ({"slug": "surface-area-frustum"}, lambda ws: sa_curved(ws, "frustum")), ({"slug": "surface-area-mixture"}, sa_mixture),
    ({"slug": "volume-cube-cuboid"}, lambda ws: volume(ws, "cuboid")), ({"slug": "volume-prism"}, lambda ws: volume(ws, "prism")),
    ({"slug": "volume-cylinder"}, lambda ws: volume(ws, "cyl")), ({"slug": "volume-l-shape-prism"}, lambda ws: volume(ws, "l")),
    ({"slug": "volume-cone"}, lambda ws: volume(ws, "cone")),
]
