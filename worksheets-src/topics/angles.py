"""Angles: 17 worksheets (see SHEETS at the bottom).
Diagrams are drawn accurately from the angle sizes, so labels always match."""
import math
from engine.geo import scene
from engine.draw import shape2d, polygon_pts, square_grid


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def pt(deg, r=1.0, o=(0, 0)):
    """The point r units from o in direction deg (0° = east, anticlockwise)."""
    return (o[0] + r * math.cos(math.radians(deg)), o[1] + r * math.sin(math.radians(deg)))


O = (0, 0)


def rays_fig(dirs, marks, line=False, r=1.0, square=True):
    """Rays from O in the directions `dirs`. marks = [(d1, d2, label), ...]
    marks the angle between directions d1 and d2 (anticlockwise from d1).
    An unlabelled 90° angle gets a right-angle square unless square=False
    (when the question is whether it IS a right angle)."""
    items = []
    for d in dirs:
        items.append(("seg", O, pt(d, r)))
    for d1, d2, label in marks:
        sweep = (d2 - d1) % 360
        if abs(sweep - 90) < 0.01 and label == "" and square:
            items.append(("right", O, pt(d1), pt(d2)))
            continue
        extra = ("reflex",) if sweep > 180 else ()
        items.append(("angle", O, pt(d1), pt(d2), label, *extra))
    items.append(("dot", O))
    return scene(items, pad=16)


def deg(v):
    return f"{v:g}°"


# ==========================================================================
def straight_line(ws):
    ws.section("Practice")
    figs, ans = [], []
    for known, side in [(50, "R"), (72, "L"), (115, "R"), (143, "L"), (28, "R"), (96, "L")]:
        theta = known if side == "R" else 180 - known
        lab_r, lab_l = (deg(known), "x") if side == "R" else ("x", deg(known))
        figs.append(rays_fig([0, 180, theta], [(0, theta, lab_r), (theta, 180, lab_l)]))
        ans.append(deg(180 - known))
    ws.figures("Work out the size of each angle marked x.", figs, ans, cols=3, fig_h=80)

    figs, ans = [], []
    for a, b in [(40, 70), (55, 90), (30, 45), (62, 81)]:
        figs.append(rays_fig([0, 180, a, a + b], [(0, a, deg(a)), (a, a + b, deg(b)), (a + b, 180, "x")]))
        ans.append(deg(180 - a - b))
    ws.figures("Work out the size of each angle marked x.", figs, ans, cols=4, fig_h=80)

    algebra = [
        ([0, 180, 72], [(0, 72, "2x"), (72, 180, "3x")], "x = 36°"),
        ([0, 180, 70], [(0, 70, "x"), (70, 180, "x + 40")], "x = 70°"),
        ([0, 180, 120], [(0, 120, "3x"), (120, 180, "60°")], "x = 40°"),
        ([0, 180, 80, 140], [(0, 80, "2x"), (80, 140, "x + 20"), (140, 180, "x")], "x = 40°"),
    ]
    ws.figures("Form an equation and solve it to find x.", [rays_fig(d, m) for d, m, _ in algebra],
               [a for *_, a in algebra], cols=4, fig_h=85)

    ws.section("Problem solving")
    ws.question("Two angles are 85° and 105°. Explain why they cannot be next to each other on a straight line.",
                "Angles on a straight line add up to 180°, but 85° + 105° = 190°.", space=40)
    ws.question("Three angles on a straight line are in the ratio 1 : 2 : 3.\nFind the size of the largest angle.",
                "1 + 2 + 3 = 6 parts, 180 ÷ 6 = 30°, so the largest is 3 × 30° = 90°", space=50)
    ws.question("Angles a and b lie on a straight line. Angle a is twice the size of angle b.\nFind a and b.",
                "a + b = 180 and a = 2b, so 3b = 180: b = 60°, a = 120°", space=50)


# ==========================================================================
def at_a_point(ws):
    ws.section("Practice")
    sets = [([120, 140], "x"), ([90, 150], "x"), ([75, 95, 110], "x"), ([130, 85, 60], "x"),
            ([100, 100, 100], "x"), ([45, 135, 90], "x")]
    figs, ans = [], []
    for known, _ in sets:
        dirs, marks, d = [], [], 20
        for k in known:
            dirs.append(d)
            marks.append((d, d + k, "" if k == 90 else deg(k)))
            d += k
        dirs.append(d)
        marks.append((d, 380, "x"))
        figs.append(rays_fig(dirs, marks))
        ans.append(deg(360 - sum(known)))
    ws.figures("Work out the size of each angle marked x.", figs, ans, cols=3, fig_h=95)

    alg = [([120, 150, 90], ["4x", "5x", "3x"], "x = 30°"),
           ([90, 120, 150], ["x + 30", "2x", "150°"], "x = 60°"),
           ([72, 72, 108, 108], ["2x", "2x", "3x", "3x"], "x = 36°")]
    figs = []
    for sizes, labs, _ in alg:
        dirs, marks, d = [], [], 10
        for k, lab in zip(sizes, labs):
            dirs.append(d)
            marks.append((d, d + k, lab))
            d += k
        figs.append(rays_fig(dirs, marks))
    ws.figures("Form an equation and solve it to find x.", figs, [a for *_, a in alg], cols=3, fig_h=95)

    ws.section("Problem solving")
    ws.question("Four equal angles meet at a point. What size is each angle?", "360 ÷ 4 = 90°", space=35)
    ws.question("Five angles meet at a point. Four of them are 70°. Find the fifth angle.",
                "360 − 4 × 70 = 80°", space=40)
    ws.question("Explain why three angles of 100° cannot meet at a point.",
                "Angles at a point add up to 360°, but 3 × 100° = 300°.", space=40)
    ws.question("Angles of 2y, 3y, 4y and 90° meet at a point. Find the largest angle.",
                "9y + 90 = 360, so y = 30 and the largest angle is 4y = 120°", space=50)


# ==========================================================================
def vertically_opposite(ws):
    ws.section("Practice")
    figs, ans = [], []
    for t in (40, 65, 110, 130):
        figs.append(rays_fig([0, t, 180, 180 + t],
                             [(0, t, deg(t)), (t, 180, "a"), (180, 180 + t, "b"), (180 + t, 360, "c")]))
        ans.append(f"a = {deg(180 - t)}, b = {deg(t)}, c = {deg(180 - t)}")
    ws.figures("Two straight lines cross. Find the angles marked a, b and c.", figs, ans, cols=4, fig_h=95)

    alg = [(105, "3x", "105°", "x = 35°"), (70, "2x + 10", "70°", "x = 30°"), (130, "5x − 20", "3x + 40", "x = 30°")]
    figs = [rays_fig([0, t, 180, 180 + t], [(0, t, l1), (180, 180 + t, l2)]) for t, l1, l2, _ in alg]
    ws.figures("Form an equation and solve it to find x.", figs, [a for *_, a in alg], cols=3, fig_h=95)

    P(ws, "Two straight lines cross. One of the angles is given. Write down the other three angles.",
      [("25°", "155°, 25°, 155°"), ("90°", "90°, 90°, 90°"), ("142°", "38°, 142°, 38°")], cols=3)

    ws.section("Problem solving")
    ws.question("Two straight lines cross. One angle is four times the size of the angle next to it.\n"
                "Find all four angles.", "x + 4x = 180, so x = 36: the angles are 36°, 144°, 36°, 144°", space=55)
    ws.question("Explain why vertically opposite angles are always equal.",
                "Each of them makes 180° with the same angle between them (angles on a straight line), "
                "so they must be the same size.", space=50)


# ==========================================================================
def types_of(ws):
    ws.section("Practice")
    sizes = [35, 120, 90, 250, 180, 75, 160, 300]
    names = {35: "acute", 120: "obtuse", 90: "right angle", 250: "reflex", 180: "straight",
             75: "acute", 160: "obtuse", 300: "reflex"}
    figs = []
    for s in sizes:
        start = 0 if s != 180 else 0
        figs.append(rays_fig([start, start + s], [(start, start + s, "")], square=False))
    ws.figures("Is each angle acute, right, obtuse, straight or reflex?", figs, [names[s] for s in sizes],
               cols=4, fig_h=70)
    P(ws, "Write acute, right, obtuse, straight or reflex for each angle.",
      [("45°", "acute"), ("91°", "obtuse"), ("180°", "straight"), ("270°", "reflex"),
       ("89°", "acute"), ("359°", "reflex"), ("90°", "right angle"), ("179°", "obtuse")], cols=4)
    P(ws, "Write down an angle that is", [("acute and more than 60°", "any angle from 61° to 89°"),
                                          ("obtuse and less than 100°", "any angle from 91° to 99°"),
                                          ("reflex and less than 200°", "any angle from 181° to 199°")], cols=1)

    ws.section("Problem solving")
    ws.question("Can a triangle have two obtuse angles? Explain your answer.",
                "No. Two obtuse angles add up to more than 180°, but all three angles of a triangle add up to 180°.",
                space=45)
    ws.question("What type of angle do the hands of a clock make at\n(a) 3 o'clock   (b) 5 o'clock   (c) 1 o'clock?",
                "(a) right angle   (b) obtuse (150°)   (c) acute (30°)", space=40)
    ws.question('Sam says, "An angle of 200° is obtuse." Is Sam correct? Explain your answer.',
                "No. Obtuse angles are between 90° and 180°. 200° is more than 180°, so it is reflex.", space=40)


# ==========================================================================
def right_angle(ws):
    ws.section("Practice")
    sizes = [90, 60, 120, 90, 30, 150]
    figs = [rays_fig([0, s], [(0, s, "")], square=False) for s in sizes]
    ans = ["right angle" if s == 90 else ("less than a right angle" if s < 90 else "more than a right angle")
           for s in sizes]
    ws.figures("Is each angle a right angle, less than a right angle, or more than a right angle?",
               figs, ans, cols=3, fig_h=70)

    L = [(0, 0), (2, 0), (2, 1), (1, 1), (1, 2), (0, 2)]
    shapes = [shape2d([(0, 0), (1, 0), (1, 1), (0, 1)]), shape2d([(0, 0), (1.8, 0), (1.8, 1), (0, 1)]),
              shape2d([(0, 0), (1.4, 0), (0, 1)]), shape2d(polygon_pts(6)), shape2d(L),
              shape2d([(0, 0), (1.8, 0), (1.2, 1), (0, 1)])]
    ws.figures("How many right angles are inside each shape?", shapes, ["4", "4", "1", "0", "5", "2"],
               cols=3, fig_h=70)
    P(ws, "How many right angles make", [("a quarter turn?", "1"), ("a half turn?", "2"),
                                         ("a three-quarter turn?", "3"), ("a full turn?", "4")], cols=2)

    ws.section("Problem solving")
    ws.question("Draw a shape with exactly two right angles.",
                "For example a trapezium with two right angles (check the drawing).", space=80)
    ws.question("Write down two times when the hands of a clock make a right angle.",
                "For example 3 o'clock and 9 o'clock", space=35)
    ws.question("Mo faces north. He turns clockwise through 3 right angles. Which way is he facing now?",
                "west", space=35)


# ==========================================================================
def estimation(ws):
    ws.section("Practice")
    sizes = [30, 80, 135, 60, 110, 170, 15, 225]
    figs = [rays_fig([10, 10 + s], [(10, 10 + s, "")]) for s in sizes]
    ws.figures("Estimate the size of each angle.", figs,
               [f"about {s}° (accept {s - 10}° to {s + 10}°)" for s in sizes], cols=4, fig_h=72)
    sizes2 = [(45, ["20°", "45°", "100°"]), (100, ["60°", "100°", "160°"]), (160, ["90°", "130°", "160°"]),
              (20, ["5°", "20°", "60°"])]
    figs = [rays_fig([0, s], [(0, s, "")]) for s, _ in sizes2]
    ws.figures("Choose the best estimate for each angle from the options given.\n"
               "(a) 20°, 45°, 100°     (b) 60°, 100°, 160°     (c) 90°, 130°, 160°     (d) 5°, 20°, 60°",
               figs, [f"{s}°" for s, _ in sizes2], cols=4, fig_h=72)
    P(ws, "Sketch an angle of about", [("45°", "check the sketch"), ("100°", "check the sketch"),
                                      ("160°", "check the sketch"), ("300°", "check the sketch")],
      cols=4, row_h=80)

    ws.section("Problem solving")
    ws.question("Explain how knowing what a right angle looks like helps you estimate an angle.",
                "You can compare the angle with 90°: smaller means acute, half a right angle is 45°, "
                "a right angle and a half is 135°, and so on.", space=45)
    ws.question("Abi estimates this angle as 40°. Is her estimate sensible? Explain.",
                "No. It is more than a right angle (obtuse), so it must be more than 90°. It is about 125°.",
                figure=rays_fig([0, 125], [(0, 125, "")]), fig_w=110, fig_h=70, space=10)


# ==========================================================================
def measuring(ws):
    ws.section("Practice")
    sizes = [40, 75, 125, 160, 20, 105, 58, 142]
    starts = [0, 15, 0, 10, 30, 0, 20, 5]
    figs = [rays_fig([s0, s0 + s], [(s0, s0 + s, "")], r=1) for s0, s in zip(starts, sizes)]
    ws.figures("Use a protractor to measure each angle.", figs, [f"{s}° (±2°)" for s in sizes], cols=4, fig_h=82)

    tri = [(0, 0), (6, 0), (6 - 5.0 * math.cos(math.radians(60)) * 1.0, 0)]
    A, B = (0, 0), (6, 0)
    # apex for angles 50° at A and 60° at B
    a, b = math.radians(50), math.radians(60)
    t = 6 * math.sin(b) / math.sin(math.pi - a - b)
    C = (t * math.cos(a), t * math.sin(a))
    ws.question("(a) Measure the three angles of this triangle.\n(b) Add your three answers together. What do you notice?",
                "(a) 50°, 60° and 70° (±2°)   (b) they add up to 180°",
                figure=scene([("poly", [A, B, C]), ("label", A, "A", "SW"), ("label", B, "B", "SE"),
                              ("label", C, "C", "N")]),
                fig_w=200, fig_h=110, space=10)

    figs = [rays_fig([0, s], [(0, s, "")]) for s in (210, 295)]
    ws.figures("Measure each reflex angle. (Hint: measure the smaller angle and take it away from 360°.)",
               figs, ["210° (±2°)", "295° (±2°)"], cols=2, fig_h=90)

    ws.section("Problem solving")
    sizes = [100, 85, 175]
    dirs, marks, d = [], [], 0
    for s in sizes:
        dirs.append(d)
        marks.append((d, d + s, ""))
        d += s
    ws.question("(a) Measure the three angles around this point.\n(b) Check that your answers add up to 360°.",
                "100°, 85° and 175° (±2°), total 360°",
                figure=rays_fig(dirs, marks), fig_w=140, fig_h=110, space=10)
    ws.question("Jo measures an angle and gets 140°. The angle is acute. What mistake has Jo made?",
                "Jo has read the wrong scale on the protractor: the angle is 180° − 140° = 40°.", space=40)


# ==========================================================================
def drawing(ws):
    ws.section("Practice")
    P(ws, "Use a protractor and ruler to draw an angle of", [(f"{s}°", "check with a protractor (±2°)")
                                                            for s in (30, 65, 90, 112, 145, 170)],
      cols=3, row_h=95)
    P(ws, "Draw these reflex angles.", [(f"{s}°", "check: the smaller angle is " + f"{360 - s}°")
                                        for s in (200, 245, 310)], cols=3, row_h=110)

    ws.section("Problem solving")
    ws.question("(a) Draw a line AB 7 cm long.\n(b) At A, draw an angle of 40°. At B, draw an angle of 60°, "
                "so that the lines meet at C above AB.\n(c) Measure angle ACB.",
                "angle ACB = 80° (±2°), because 180 − 40 − 60 = 80", space=150)
    ws.question("Draw an angle of 135° without using the 135 mark on your protractor. Explain your method.",
                "For example: draw a right angle (90°) and add 45°, or draw 45° and use the straight line "
                "(180 − 45 = 135).", space=100)


# ==========================================================================
def compass_directions(ws):
    ws.section("Practice")
    P(ws, "Which direction is opposite", [
        ("north?", "south"), ("east?", "west"), ("north-east?", "south-west"),
        ("south-east?", "north-west"), ("west?", "east"), ("south-west?", "north-east")], cols=3)

    places = {"School": (2, 4), "Park": (2, 1), "Shop": (5, 1), "Pond": (5, 4), "Church": (0, 4),
              "Café": (0, 1)}
    items = [("grid", -1, 6, 0, 5)] + [x for n, p in places.items() for x in (("dot", p), ("label", p, n, "N"))]
    items += [("north", (6.5, 3.2), 1.5)]
    ws.question("Use the map to answer the questions.\n"
                "(a) Which place is north of the Park?\n(b) Which place is east of the Park?\n"
                "(c) Which place is west of the School?\n(d) Which place is north-east of the Park?\n"
                "(e) Which place is north-west of the Shop?\n(f) Which direction is the Café from the Shop?",
                "(a) School  (b) Shop  (c) Church  (d) Pond  (e) School  (f) west",
                figure=scene(items, pad=10), fig_w=220, fig_h=170, space=0)

    P(ws, "Which direction will you face after each turn?", [
        ("Face north. Turn 90° clockwise.", "east"), ("Face east. Turn 180°.", "west"),
        ("Face south. Turn 90° anticlockwise.", "east"), ("Face north-west. Turn 90° clockwise.", "north-east"),
        ("Face west. Turn 270° clockwise.", "south"), ("Face north-east. Turn 45° anticlockwise.", "north")], cols=2)

    ws.section("Problem solving")
    ws.question("What is the angle, turning clockwise, from north to south-east?", "135°", space=35)
    ws.question("Ben faces south. He turns clockwise until he faces west. How many degrees has he turned?",
                "90°", space=35)
    ws.question("Lucy faces east. She turns 45° clockwise, then 180°. Which direction is she facing now?",
                "north-west", space=40)


# ==========================================================================
def bearing_line(b, length=1.0, o=(0, 0)):
    """End point of a line on bearing b (clockwise from north)."""
    return (o[0] + length * math.sin(math.radians(b)), o[1] + length * math.cos(math.radians(b)))


def bearing_fig(b, label=None, mark="cw", show_angle=True):
    """North line at A and a line to B on bearing b. mark: "cw" marks the
    angle clockwise from north; "acw" the angle anticlockwise from north;
    "south-e"/"south-w" the angle from south."""
    A = (0, 0)
    B = bearing_line(b, 1.0)
    N = (0, 1.0)
    east = 0 < b < 180
    items = [("north", A, 1.15), ("seg", A, B), ("dot", A),
             ("label", A, "A", "W" if east else "E"), ("label", B, "B", "E" if east else "W")]
    if show_angle:
        if mark == "cw":
            items.append(("angle", A, N, B, label, *(("reflex",) if b > 180 else ())))
        elif mark == "acw":
            items.append(("angle", A, B, N, label))
        else:
            items += [("seg", A, (0, -1.0), "dashed", "thin"), ("angle", A, (0, -1), B, label, 24)]
    return scene(items, pad=14)


def bearings(ws):
    ws.section("Practice")
    cases = [(70, "70°", "cw", "070°"), (320, "40°", "acw", "320°"), (150, "30°", "south", "150°"),
             (205, "25°", "south", "205°")]
    ws.figures("Write down the bearing of B from A.", [bearing_fig(b, l, m) for b, l, m, _ in cases],
               [a for *_, a in cases], cols=4, fig_h=100)
    meas = [48, 125, 237, 302]
    ws.figures("Use a protractor to measure the bearing of B from A.",
               [bearing_fig(b, show_angle=False) for b in meas], [f"{b:03d}° (±2°)" for b in meas],
               cols=4, fig_h=100)
    P(ws, "Write each direction as a three-figure bearing.", [
        ("east", "090°"), ("south", "180°"), ("west", "270°"), ("north-east", "045°"),
        ("south-west", "225°"), ("north-west", "315°")], cols=3)
    starts = [scene([("north", (0, 0), 1.2), ("dot", (0, 0)), ("label", (0, 0), "P", "SW"),
                     ("seg", (-1, -1), (1, 1), "thin", "dashed")][:3], pad=40) for _ in range(4)]
    ws.figures("Draw a line from P on each bearing.  (a) 075°   (b) 160°   (c) 250°   (d) 330°",
               starts, ["check: 075° (±2°)", "check: 160° (±2°)", "check: 250° (±2°)", "check: 330° (±2°)"],
               cols=4, fig_h=95, answer_line=False)

    ws.section("Problem solving")
    ws.question("A boat sails 8 km from a port on a bearing of 060°.\n"
                "Make a scale drawing using 1 cm to 1 km.",
                "Check: a line 8 cm long at 60° clockwise from a north line.", space=150)
    ws.question("Explain why a bearing of 400° does not make sense.",
                "Bearings go from 000° to 360°. A full turn is 360°, so 400° is the same as 040°.", space=40)


# ==========================================================================
def two_points_fig(A, B, ba, bb):
    """A and B with north lines, plus empty room where C will be drawn."""
    C, _ = intersect(A, ba, B, bb)
    items = [("north", A, 1.4), ("north", B, 1.4), ("dot", A), ("dot", B),
             ("label", A, "A", "SW"), ("label", B, "B", "SE"), ("seg", A, B, "thin", "dashed"),
             ("text", (C[0], C[1] + (1 if C[1] > 0 else -1)), ""), ("text", (C[0], C[1]), "")]
    return scene(items, pad=12)


def intersect(A, ba, B, bb):
    da = (math.sin(math.radians(ba)), math.cos(math.radians(ba)))
    db = (math.sin(math.radians(bb)), math.cos(math.radians(bb)))
    det = da[0] * (-db[1]) - da[1] * (-db[0])
    t = ((B[0] - A[0]) * (-db[1]) - (B[1] - A[1]) * (-db[0])) / det
    return (A[0] + t * da[0], A[1] + t * da[1]), t


def given_bearings(ws):
    ws.section("Practice")
    cases = [((0, 0), (8, 0), 50, 310), ((0, 0), (7, 0), 30, 335), ((0, 0), (8, 0), 120, 230)]
    for A, B, ba, bb in cases:
        C, t = intersect(A, ba, B, bb)
        ws.question(f"C is on a bearing of {ba:03d}° from A and on a bearing of {bb:03d}° from B.\n"
                    "Mark the position of C on the diagram.",
                    f"C is where the two lines cross. Check: angle CAB = {abs(90 - ba)}° and "
                    f"angle CBA = {abs(270 - bb)}°.",
                    figure=two_points_fig(A, B, ba, bb), fig_w=300, fig_h=150 if ba < 90 else 150,
                    fig_pos="below", space=0)

    ws.section("Problem solving")
    ws.question("Town B is due east of town A. Town C is on a bearing of 040° from A and 320° from B.\n"
                "(a) Find angle CAB and angle CBA.\n(b) What type of triangle is ABC?\n(c) Find angle ACB.",
                "(a) CAB = 90 − 40 = 50°; CBA = 320 − 270 = 50°   (b) isosceles   (c) 180 − 100 = 80°",
                space=80)
    ws.question("A lighthouse L is due north of a ship S. A buoy is on a bearing of 060° from S and on a bearing "
                "of 120° from L. Sketch a diagram and find the angle at the buoy.",
                "The angle at S is 60°, the angle at L is 180 − 120 = 60°, so the angle at the buoy is 60° "
                "(the triangle is equilateral).", space=80)


# ==========================================================================
def back_bearings(ws):
    ws.section("Practice")
    bs = [40, 115, 200, 310, 90, 180, 67, 253, 345, 5]
    ws.parts("The bearing of B from A is given. Work out the bearing of A from B.",
             [f"{b:03d}°" for b in bs], [f"{(b + 180) % 360:03d}°".replace("000°", "360° (or 000°)") for b in bs],
             cols=5)

    A, B = (0, 0), bearing_line(70, 3)
    fig = scene([("north", A, 1.5), ("north", B, 1.5), ("seg", A, B), ("dot", A), ("dot", B),
                 ("label", A, "A", "SW"), ("label", B, "B", "SE"), ("angle", A, (0, 1), B, "70°"),
                 ("arrows", A, (0, 1.5), 1), ("arrows", B, (B[0], B[1] + 1.5), 1)])
    ws.question("The bearing of B from A is 070°.\n(a) Explain why the angle between the north line at B "
                "and the line BA is 110°.\n(b) Work out the bearing of A from B.",
                "(a) The north lines are parallel, so the angles are co-interior and add up to 180°: "
                "180 − 70 = 110°   (b) 360 − 110 = 250°",
                figure=fig, fig_w=170, fig_h=110, space=10)

    ws.section("Problem solving")
    ws.question("The bearing of a lighthouse from a boat is 285°.\nWhat is the bearing of the boat from the lighthouse?",
                "285 − 180 = 105°", space=40)
    ws.question('Sam says, "To find a back bearing you always add 180°."\nExplain why Sam is not quite right.',
                "If the bearing is 180° or more, adding 180° gives more than 360°, so you subtract 180° instead "
                "(e.g. 250° → 070°).", space=45)
    ws.question("The bearing of Q from P is x°, where x is less than 180.\nWrite an expression for the bearing of P from Q.",
                "x + 180", space=35)


# ==========================================================================
def par_fig(theta, labels):
    """Two horizontal parallel lines cut by a transversal at angle theta.
    labels: {(where, pos): text}, where = "P" (bottom) or "Q" (top),
    pos = "ur", "ul", "ll", "lr" (upper-right... between line and transversal)."""
    H = 1.7                                     # gap between the parallel lines
    P_, Q_ = (0, 0), (H / math.tan(math.radians(theta)), H)
    up, dn = (math.cos(math.radians(theta)), math.sin(math.radians(theta))), None
    items = [("seg", (-1.6, 0), (2.0, 0)), ("seg", (-1.6 + Q_[0] * 0.3, H), (2.0 + Q_[0] * 0.3, H)),
             ("arrows", (-1.6, 0), (2.0, 0), 1), ("arrows", (-1.6 + Q_[0] * 0.3, H), (2.0 + Q_[0] * 0.3, H), 1)]
    a, b = (P_[0] - up[0] * 0.8, P_[1] - up[1] * 0.8), (Q_[0] + up[0] * 0.8, Q_[1] + up[1] * 0.8)
    items.append(("seg", a, b))
    for (where, pos), text in labels.items():
        v = P_ if where == "P" else Q_
        east, west = (v[0] + 1, v[1]), (v[0] - 1, v[1])
        upt, dnt = (v[0] + up[0], v[1] + up[1]), (v[0] - up[0], v[1] - up[1])
        pair = {"ur": (east, upt), "ul": (upt, west), "ll": (west, dnt), "lr": (dnt, east)}[pos]
        items.append(("angle", v, pair[0], pair[1], text))
    return scene(items, pad=12)


def par_value(theta, pos):
    return theta if pos in ("ur", "ll") else 180 - theta


def par_reason(g, u):
    (gw, gp), (uw, up_) = g, u
    if gw == uw:
        return "vertically opposite angles" if {gp, up_} in ({"ur", "ll"}, {"ul", "lr"}) else "angles on a straight line"
    if gp == up_:
        return "corresponding angles"
    bottom, top = (g, u) if gw == "P" else (u, g)
    pair = {bottom[1], top[1]}
    if bottom[1] in ("ur", "ul") and top[1] in ("lr", "ll"):
        if pair in ({"ur", "ll"}, {"ul", "lr"}):
            return "alternate angles"
        return "co-interior angles add up to 180°"
    return "corresponding angles" if par_value(1, gp) == par_value(1, up_) else "angles on a straight line"


def parallel_lines(ws):
    ws.section("Practice")
    cases = [(65, ("P", "ur"), ("Q", "ur")), (110, ("P", "ur"), ("Q", "ll")), (70, ("P", "ur"), ("Q", "lr")),
             (55, ("P", "ul"), ("Q", "lr")), (120, ("Q", "ll"), ("P", "ll")), (48, ("Q", "lr"), ("P", "ur"))]
    figs, ans = [], []
    for t, g, u in cases:
        figs.append(par_fig(t, {g: deg(par_value(t, g[1])), u: "x"}))
        ans.append(f"x = {deg(par_value(t, u[1]))} ({par_reason(g, u)})")
    ws.figures("Find the size of each angle marked x. Give a reason for each answer.", figs, ans,
               cols=3, fig_h=95)

    alg = [(105, {("P", "ur"): "3x", ("Q", "ll"): "105°"}, "3x = 105, x = 35° (alternate angles)"),
           (70, {("P", "ur"): "2x + 10", ("Q", "ur"): "70°"}, "2x + 10 = 70, x = 30° (corresponding angles)"),
           (60, {("P", "ul"): "4x", ("Q", "ll"): "60°"}, "4x + 60 = 180, x = 30° (co-interior angles)")]
    ws.figures("Form an equation and solve it to find x.", [par_fig(t, l) for t, l, _ in alg],
               [a for *_, a in alg], cols=3, fig_h=95)

    ws.section("Problem solving")
    ws.question("Two co-interior angles are 3x and 2x. Find the size of each angle.",
                "5x = 180, x = 36: the angles are 108° and 72°", space=45)
    ws.question("Two lines are crossed by a third line. A pair of corresponding angles are 72° and 74°.\n"
                "Are the two lines parallel? Explain.",
                "No. If the lines were parallel, corresponding angles would be equal.", space=45)
    ws.question("Explain why alternate angles on parallel lines are equal.",
                "Each one is equal to the same corresponding angle (one by corresponding angles, the other by "
                "vertically opposite angles), so they are equal to each other.", space=45)


# ==========================================================================
def triangle_pts(a, b, base=1.0):
    """Triangle with base angles a (left) and b (right)."""
    A, B = (0, 0), (base, 0)
    ra, rb = math.radians(a), math.radians(b)
    t = base * math.sin(rb) / math.sin(math.pi - ra - rb)
    return A, B, (t * math.cos(ra), t * math.sin(ra))


def tri_fig(a, b, la, lb, lc, ticks=None):
    A, B, C = triangle_pts(a, b)
    items = [("poly", [A, B, C]), ("angle", A, B, C, la), ("angle", B, C, A, lb), ("angle", C, A, B, lc)]
    if ticks:
        for p, q in ticks:
            items.append(("ticks", {"A": A, "B": B, "C": C}[p], {"A": A, "B": B, "C": C}[q], 1))
    return scene(items, pad=10)


def triangle(ws):
    ws.section("Practice")
    cases = [(50, 60, "50°", "60°", "x"), (35, 90, "35°", "", "x"), (110, 40, "110°", "40°", "x"),
             (72, 46, "x", "46°", "62°"), (25, 120, "25°", "x", "35°"), (64, 58, "x", "58°", "58°")]
    figs, ans = [], []
    for a, b, la, lb, lc in cases:
        fig = tri_fig(a, b, la, lb, lc)
        if b == 90:
            A, B, C = triangle_pts(a, b)
            fig = scene([("poly", [A, B, C]), ("angle", A, B, C, la), ("right", B, C, A), ("angle", C, A, B, lc)],
                        pad=10)
        figs.append(fig)
        ans.append(deg({"x": 0, la: 0}.get("x", 0) or [180 - a - b, a, b][[lc, la, lb].index("x")]))
    ws.figures("Work out the size of each angle marked x.", figs, ans, cols=3, fig_h=85)

    iso = [(70, 70, "x", "x", "40°", [("A", "C"), ("B", "C")], "70°"),
           (65, 65, "65°", "", "x", [("A", "C"), ("B", "C")], "50°"),
           (60, 60, "x", "", "", [("A", "B"), ("B", "C"), ("C", "A")], "60°")]
    ws.figures("These triangles are isosceles or equilateral. Find x.",
               [tri_fig(a, b, la, lb, lc, t) for a, b, la, lb, lc, t, _ in iso], [ans for *_, ans in iso],
               cols=3, fig_h=90)
    P(ws, "The angles of a triangle are given. Find x.", [
        ("x, 2x and 3x", "x = 30°"), ("x, x + 20 and x + 40", "x = 40°"), ("2x, 3x and 40°", "x = 28°"),
        ("x, 4x and 4x", "x = 20°")], cols=2)

    ws.section("Problem solving")
    A, B, C = triangle_pts(50, 65, 1)
    ext = scene([("poly", [A, B, C]), ("seg", B, (1.6, 0)), ("angle", A, B, C, "50°"), ("angle", C, A, B, "65°"),
                 ("angle", B, (1.6, 0), C, "x")], pad=10)
    ws.question("The side of this triangle has been extended. Find the angle x.",
                "the third angle is 180 − 50 − 65 = 65°, so x = 180 − 65 = 115° (= 50 + 65)",
                figure=ext, fig_w=150, fig_h=90, space=10)
    ws.question("Can a triangle have angles of 60°, 70° and 60°? Explain.", "No: 60 + 70 + 60 = 190°, not 180°.",
                space=35)
    ws.question("In a right-angled triangle, one acute angle is three times the size of the other.\nFind both angles.",
                "x + 3x = 90, so x = 22.5°: the angles are 22.5° and 67.5°", space=45)


# ==========================================================================
def interior_angles(pts):
    n, out = len(pts), []
    for i in range(n):
        a, v, b = pts[i - 1], pts[i], pts[(i + 1) % n]
        d1 = math.atan2(a[1] - v[1], a[0] - v[0])
        d2 = math.atan2(b[1] - v[1], b[0] - v[0])
        ang = math.degrees((d1 - d2) % (2 * math.pi))      # interior for anticlockwise polygons
        out.append(ang)
    return out


def poly_fig(pts, labels):
    """Polygon (anticlockwise) with angle labels at each corner (None to skip)."""
    angs = interior_angles(pts)
    items = [("poly", pts)]
    n = len(pts)
    for i, lab in enumerate(labels):
        if lab is None:
            continue
        a, v, b = pts[i - 1], pts[i], pts[(i + 1) % n]
        if abs(angs[i] - 90) < 0.5 and lab == "":
            items.append(("right", v, a, b))
        else:
            items.append(("angle", v, b, a, lab, *(("reflex",) if angs[i] > 180 else ())))
    return scene(items, pad=10), angs


def rounded_angles(pts):
    """Whole-number angles that still add up exactly to the right total."""
    angs = interior_angles(pts)
    r = [round(a) for a in angs[:-1]]
    return r + [(len(pts) - 2) * 180 - sum(r)]


def quadrilaterals(ws):
    ws.section("Practice")
    shapes = [[(0, 0), (3, 0), (3.6, 2), (0.4, 2.4)], [(0, 0), (3.4, 0.4), (2.6, 2.2), (0.6, 1.8)],
              [(0, 0), (3, 0), (3, 2), (1, 2.6)], [(0.4, 0), (3.2, 0.3), (2.4, 2), (0, 1.4)],
              [(0, 0), (2.4, -0.6), (3.6, 1.6), (0.8, 2)], [(0, 0), (3.2, 0), (2.2, 1.6), (0.6, 2.6)]]
    figs, ans = [], []
    for k, s in enumerate(shapes):
        r = rounded_angles(s)
        unknown = k % 4
        labs = [("x" if i == unknown else deg(v)) for i, v in enumerate(r)]
        if k == 2:
            labs = [("" if abs(v - 90) < 0.6 and i != unknown else lab) for i, (v, lab) in enumerate(zip(r, labs))]
        fig, _ = poly_fig(s, labs)
        figs.append(fig)
        ans.append(deg(r[unknown]))
    ws.figures("Work out the size of each angle marked x. (Diagrams are close to accurate.)", figs, ans,
               cols=3, fig_h=85)

    special = [
        ("A parallelogram has an angle of 70°. Find its other three angles.", "110°, 70°, 110°"),
        ("A rhombus has an angle of 124°. Find its other three angles.", "56°, 124°, 56°"),
        ("A kite has two equal angles of 115° and a third angle of 50°. Find the fourth angle.", "80°"),
        ("An isosceles trapezium has two angles of 68°. Find its other two angles.", "112° and 112°"),
    ]
    P(ws, "Answer these questions about special quadrilaterals.", special, cols=1)
    P(ws, "The angles of a quadrilateral are given. Find x.", [
        ("x, 2x, 3x and 4x", "x = 36°"), ("x + 10, x + 20, x + 30 and x + 40", "x = 65°"),
        ("2x, 2x, 4x and 120°", "x = 30°"), ("5x, 4x, 100° and 80°", "x = 20°")], cols=2)

    ws.section("Problem solving")
    ws.question("Explain why the angles inside any quadrilateral add up to 360°.",
                "A diagonal splits the quadrilateral into two triangles. Each has angles adding to 180°, "
                "so the total is 2 × 180 = 360°.", space=50)
    ws.question("Can a quadrilateral have angles of 100°, 100°, 100° and 70°? Explain.",
                "No: they add up to 370°, not 360°.", space=35)
    ws.question("A quadrilateral has three equal angles and a fourth angle of 90°. Find the size of each equal angle.",
                "(360 − 90) ÷ 3 = 90°, so all four angles are 90°", space=40)


# ==========================================================================
def polygons(ws):
    ws.section("Practice")
    names = [("pentagon", 5), ("hexagon", 6), ("octagon", 8), ("decagon", 10), ("12-sided polygon", 12),
             ("20-sided polygon", 20)]
    P(ws, "Work out the sum of the interior angles of a", [(f"{n}", f"{(k - 2) * 180}°") for n, k in names])
    reg = [("equilateral triangle", 3), ("square", 4), ("regular pentagon", 5), ("regular hexagon", 6),
           ("regular octagon", 8), ("regular decagon", 10)]
    P(ws, "Work out the size of each interior angle and each exterior angle of a",
      [(n, f"interior {((k - 2) * 180) / k:g}°, exterior {360 / k:g}°") for n, k in reg], cols=2)
    P(ws, "A regular polygon has the angle given. How many sides does it have?", [
        ("exterior angle 40°", "9"), ("exterior angle 24°", "15"), ("exterior angle 30°", "12"),
        ("interior angle 140°", "9"), ("interior angle 165°", "24"), ("interior angle 162°", "20")], cols=3)
    pent = [(0, 0), (3, 0), (3.8, 1.8), (1.6, 3), (-0.6, 1.6)]
    r = rounded_angles(pent)
    fig, _ = poly_fig(pent, [deg(v) for v in r[:-1]] + ["x"])
    ws.question("Find the size of the angle marked x.", f"total = 540°, x = {deg(r[-1])}",
                figure=fig, fig_w=150, fig_h=120, space=10)

    ws.section("Problem solving")
    ws.question("Can a regular polygon have an exterior angle of 25°? Explain.",
                "No: 360 ÷ 25 = 14.4, which is not a whole number of sides.", space=40)
    ws.question("Each interior angle of a regular polygon is 150°. How many sides does it have?",
                "exterior angle = 30°, so 360 ÷ 30 = 12 sides", space=40)
    ws.question("The interior angles of a polygon add up to 1260°. How many sides does it have?",
                "1260 ÷ 180 = 7, so 7 + 2 = 9 sides", space=40)


# ==========================================================================
def tessellations(ws):
    ws.section("Practice")
    polys = [3, 4, 5, 6, 8, 10]
    ans = ["Yes: 6 × 60° = 360°", "Yes: 4 × 90° = 360°", "No: 108° does not divide into 360°",
           "Yes: 3 × 120° = 360°", "No: 135° does not divide into 360°", "No: 144° does not divide into 360°"]
    ws.figures("Will each regular polygon tessellate on its own? Use angles to explain.",
               [shape2d(polygon_pts(n)) for n in polys], ans, cols=3, fig_h=62)
    shapes = [[(0, 0), (2, 0), (2, 1), (1, 1), (1, 2), (0, 2)]]
    ws.question("Continue the tessellation of this L-shape. Draw at least six more shapes.",
                "Check that the L-shapes fit together with no gaps or overlaps.",
                figure=square_grid(16, 8, shapes=[[(x + 1, y + 1) for x, y in s] for s in shapes] +
                                   [[(x + 3, y + 1) for x, y in s] for s in shapes]),
                fig_w=380, fig_h=190, fig_pos="below", space=0)

    ws.section("Problem solving")
    ws.question("Regular octagons and squares can tessellate together. Use angles to show why.",
                "At each point two octagons and one square meet: 135° + 135° + 90° = 360°.", space=45)
    ws.question("Explain why any triangle will tessellate.",
                "Six copies fit round a point using each angle twice: 2(a + b + c) = 2 × 180° = 360°.", space=45)
    ws.question("Can regular hexagons and equilateral triangles tessellate together? Explain.",
                "Yes, e.g. two hexagons and two triangles at a point: 120 + 120 + 60 + 60 = 360°.", space=45)


SHEETS = [
    ({"slug": "angles-straight-line"}, straight_line),
    ({"slug": "angles-full-circle-at-a-point"}, at_a_point),
    ({"slug": "angles-vertically-opposites"}, vertically_opposite),
    ({"slug": "angles-types-of"}, types_of),
    ({"slug": "angles-right-angle"}, right_angle),
    ({"slug": "angles-estimation"}, estimation),
    ({"slug": "angles-measuring"}, measuring),
    ({"slug": "angles-drawing"}, drawing),
    ({"slug": "angles-compass-directions"}, compass_directions),
    ({"slug": "angles-bearings"}, bearings),
    ({"slug": "angles-given-bearings-from-two-points"}, given_bearings),
    ({"slug": "angles-back-bearings"}, back_bearings),
    ({"slug": "angles-parallel-lines"}, parallel_lines),
    ({"slug": "angles-triangle"}, triangle),
    ({"slug": "angles-quadrilaterals"}, quadrilaterals),
    ({"slug": "angles-polygons"}, polygons),
    ({"slug": "angles-tessellations"}, tessellations),
]
